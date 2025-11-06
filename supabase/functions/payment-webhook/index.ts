import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    console.log('Webhook received:', JSON.stringify(payload, null, 2));

    const {
      order_id,
      transaction_status,
      fraud_status,
      signature_key,
      gross_amount,
      transaction_id,
      payment_type,
      transaction_time,
    } = payload;

    if (!order_id) {
      throw new Error('Missing order_id in webhook payload');
    }

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
      console.error('Invalid signature. Expected:', calculatedSignature, 'Received:', signature_key);
      throw new Error('Invalid signature');
    }

    console.log('Signature verified for order:', order_id);

    // Fetch order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*, courses(*)')
      .eq('order_id', order_id)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', order_id, orderError);
      throw new Error('Order not found');
    }

    console.log('Order found:', order.id, 'Current status:', order.status);

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

    console.log('New status:', newStatus, 'Should enroll:', shouldEnroll);

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

    console.log('Order updated successfully');

    // Create enrollment if payment is successful
    if (shouldEnroll && order.status !== 'paid') {
      console.log('Creating enrollment for user:', order.user_id, 'course:', order.course_id);

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
          // Don't throw error, just log it
        } else {
          console.log('Enrollment created successfully');
        }
      } else {
        console.log('Enrollment already exists, skipping creation');
      }
    }

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
    console.error('Error in payment-webhook:', error);
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
