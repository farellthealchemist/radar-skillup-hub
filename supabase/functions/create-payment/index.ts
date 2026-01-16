import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 payment attempts per minute per user
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up expired rate limit entries periodically
const cleanupRateLimits = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
};

// Check rate limit for a user
const checkRateLimit = (userId: string): { allowed: boolean; retryAfter?: number } => {
  cleanupRateLimits();
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    // First request or window expired - reset counter
    rateLimitMap.set(userId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((userLimit.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Increment counter
  userLimit.count++;
  return { allowed: true };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false
        }
      }
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Apply rate limiting
    const rateLimitResult = checkRateLimit(user.id);
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for user ${user.id}`);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Terlalu banyak permintaan. Coba lagi dalam ${rateLimitResult.retryAfter} detik.`,
          retryAfter: rateLimitResult.retryAfter,
        }),
        {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfter),
          },
          status: 429,
        }
      );
    }

    console.log(`Processing payment request for user: ${user.id}`);
    const requestSchema = z.object({
      courseId: z.string().uuid('Invalid course ID format'),
    });

    const body = await req.json();
    const validationResult = requestSchema.safeParse(body);

    if (!validationResult.success) {
      throw new Error(`Validation error: ${validationResult.error.errors[0].message}`);
    }

    const { courseId } = validationResult.data;

    // Fetch course details
    const { data: course, error: courseError } = await supabaseClient
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (courseError || !course) {
      throw new Error('Course not found');
    }

    // Check if course is free
    if (course.is_free) {
      throw new Error('This course is free, no payment required');
    }

    // Check if user already enrolled
    const { data: existingEnrollment } = await supabaseClient
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (existingEnrollment) {
      throw new Error('Already enrolled in this course');
    }

    // Fetch user profile
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('full_name, phone')
      .eq('id', user.id)
      .single();

    // Calculate final price (check for discount)
    const now = new Date();
    let finalPrice = Number(course.price);
    
    if (course.discount_price && course.discount_end_date) {
      const discountEndDate = new Date(course.discount_end_date);
      if (now < discountEndDate) {
        finalPrice = Number(course.discount_price);
      }
    }

    // Validate final price
    if (isNaN(finalPrice) || finalPrice < 0 || finalPrice > 100000000) {
      throw new Error('Invalid payment amount');
    }

    // Create order record
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
    
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user.id,
        course_id: courseId,
        amount: finalPrice,
        status: 'pending',
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (orderError || !order) {
      throw new Error('Failed to create order');
    }

    // Prepare Midtrans transaction
    const midtransServerKey = Deno.env.get('MIDTRANS_SERVER_KEY');
    const midtransClientKey = Deno.env.get('MIDTRANS_CLIENT_KEY');
    
    if (!midtransServerKey) {
      throw new Error('Midtrans server key not configured');
    }

    if (!midtransClientKey) {
      throw new Error('Midtrans client key not configured');
    }

    const authString = btoa(midtransServerKey + ':');
    
    const transactionDetails = {
      transaction_details: {
        order_id: order.order_id,
        gross_amount: finalPrice,
      },
      customer_details: {
        first_name: profile?.full_name || 'User',
        email: user.email,
        phone: profile?.phone || '',
      },
      item_details: [
        {
          id: course.id,
          price: finalPrice,
          quantity: 1,
          name: course.title,
        },
      ],
      callbacks: {
        finish: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
      },
    };

    const midtransResponse = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${authString}`,
      },
      body: JSON.stringify(transactionDetails),
    });

    if (!midtransResponse.ok) {
      const errorText = await midtransResponse.text();
      throw new Error(`Midtrans API error: ${errorText}`);
    }

    const midtransData = await midtransResponse.json();

    // Update order with snap token
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        snap_token: midtransData.token,
        midtrans_order_id: order.order_id,
      })
      .eq('id', order.id);

    if (updateError) {
      throw new Error('Failed to update order with snap token');
    }

    // Return snap token, order ID, AND client key from server
    return new Response(
      JSON.stringify({
        success: true,
        snapToken: midtransData.token,
        orderId: order.order_id,
        clientKey: midtransClientKey,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
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