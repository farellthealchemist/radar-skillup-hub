import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Maximum age for webhook notifications (15 minutes)
const MAX_WEBHOOK_AGE_MS = 15 * 60 * 1000;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );

    const payload = await req.json();

    // Validate webhook payload
    const webhookSchema = z.object({
      order_id: z.string().min(1, 'order_id is required'),
      transaction_status: z.enum(['capture', 'settlement', 'pending', 'deny', 'expire', 'cancel'], {
        errorMap: () => ({ message: 'Invalid transaction_status' })
      }),
      fraud_status: z.string().optional(),
      signature_key: z.string().min(1, 'signature_key is required'),
      gross_amount: z.union([z.string(), z.number()]).transform(val => {
        const num = typeof val === 'string' ? parseFloat(val) : val;
        if (isNaN(num) || num < 0 || num > 100000000) {
          throw new Error('Invalid gross_amount');
        }
        return num;
      }),
      transaction_id: z.string().min(1, 'transaction_id is required'),
      payment_type: z.string().max(100).optional(),
      transaction_time: z.string().min(1, 'transaction_time is required'),
    });

    const validationResult = webhookSchema.safeParse(payload);

    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.errors[0].message);
      throw new Error(`Validation error: ${validationResult.error.errors[0].message}`);
    }

    const {
      order_id,
      transaction_status,
      fraud_status,
      signature_key,
      gross_amount,
      transaction_id,
      payment_type,
      transaction_time,
    } = validationResult.data;

    console.log(`Processing webhook for order: ${order_id}, transaction: ${transaction_id}`);

    // Verify signature
    const serverKey = Deno.env.get('MIDTRANS_SERVER_KEY');
    if (!serverKey) {
      throw new Error('Midtrans server key not configured');
    }

    const signatureString = `${order_id}${transaction_status}${gross_amount}${serverKey}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const calculatedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (calculatedSignature !== signature_key) {
      console.error('Invalid signature for order:', order_id);
      throw new Error('Invalid signature');
    }

    // REPLAY PROTECTION: Check if transaction was already processed
    const { data: existingWebhook, error: webhookCheckError } = await supabaseClient
      .from('processed_webhooks')
      .select('id')
      .eq('transaction_id', transaction_id)
      .single();

    if (existingWebhook) {
      console.log(`Transaction ${transaction_id} already processed, skipping`);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Transaction already processed',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // TIMESTAMP VALIDATION: Reject old notifications
    const transactionDate = new Date(transaction_time);
    const now = new Date();
    const ageMs = now.getTime() - transactionDate.getTime();

    if (ageMs > MAX_WEBHOOK_AGE_MS) {
      console.error(`Webhook too old: ${ageMs}ms for transaction ${transaction_id}`);
      throw new Error('Webhook notification too old');
    }

    // Fetch order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*, courses(*)')
      .eq('order_id', order_id)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', order_id);
      throw new Error('Order not found');
    }

    // Determine new status based on transaction status
    let newStatus = order.status;
    let shouldEnroll = false;

    if (transaction_status === 'capture') {
      if (fraud_status === 'accept') {
        newStatus = 'paid';
        shouldEnroll = true;
      } else if (fraud_status === 'challenge') {
        newStatus = 'pending';
      }
    } else if (transaction_status === 'settlement') {
      newStatus = 'paid';
      shouldEnroll = true;
    } else if (transaction_status === 'pending') {
      newStatus = 'pending';
    } else if (transaction_status === 'deny' || transaction_status === 'expire' || transaction_status === 'cancel') {
      newStatus = 'failed';
    }

    // Update order
    const updateData: any = {
      status: newStatus,
      midtrans_transaction_id: transaction_id,
      payment_method: payment_type,
      updated_at: new Date().toISOString(),
    };

    if (shouldEnroll) {
      updateData.paid_at = transaction_time || new Date().toISOString();
    }

    const { error: updateError } = await supabaseClient
      .from('orders')
      .update(updateData)
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      throw new Error('Failed to update order');
    }

    // Create enrollment if payment is successful
    if (shouldEnroll && order.status !== 'paid') {
      // Check if enrollment already exists
      const { data: existingEnrollment } = await supabaseClient
        .from('enrollments')
        .select('id')
        .eq('user_id', order.user_id)
        .eq('course_id', order.course_id)
        .single();

      if (!existingEnrollment) {
        const { error: enrollError } = await supabaseClient
          .from('enrollments')
          .insert({
            user_id: order.user_id,
            course_id: order.course_id,
            order_id: order.id,
            status: 'active',
            progress: 0,
          });

        if (enrollError) {
          console.error('Failed to create enrollment:', enrollError);
          // Don't throw error, continue processing
        } else {
          console.log(`Enrollment created for user ${order.user_id} in course ${order.course_id}`);
        }
      }
    }

    // RECORD PROCESSED TRANSACTION: Prevent replay attacks
    const { error: recordError } = await supabaseClient
      .from('processed_webhooks')
      .insert({
        transaction_id: transaction_id,
        order_id: order_id,
      });

    if (recordError) {
      console.error('Failed to record processed webhook:', recordError);
      // Don't throw - the transaction was already processed successfully
    }

    console.log(`Webhook processed successfully for order: ${order_id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Webhook processed successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Webhook processing error:', error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});