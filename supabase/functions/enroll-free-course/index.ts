import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://radar-skillup-hub.lovable.app',
  'https://id-preview--544b7f39-0bce-45f6-9a72-b012e91e5bcc.lovable.app',
];

const getCorsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[2],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
});

serve(async (req) => {
  const origin = req.headers.get('Origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth client to verify user
    const anonClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: userError } = await anonClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Validate input
    const body = await req.json();
    const schema = z.object({ courseId: z.string().uuid() });
    const { courseId } = schema.parse(body);

    // Service role client for privileged operations
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    // Verify course exists and is free
    const { data: course, error: courseError } = await serviceClient
      .from('courses')
      .select('id, is_free, title')
      .eq('id', courseId)
      .single();

    if (courseError || !course) {
      throw new Error('Course not found');
    }

    if (!course.is_free) {
      throw new Error('This course is not free. Please use the payment flow.');
    }

    // Check existing enrollment
    const { data: existing } = await serviceClient
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ success: true, message: 'Already enrolled', alreadyEnrolled: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Create enrollment via service role (bypasses RLS)
    const { error: enrollError } = await serviceClient
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        progress: 0,
        status: 'active',
      });

    if (enrollError) {
      console.error('Enrollment error:', enrollError);
      throw new Error('Failed to create enrollment');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Enrolled successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
