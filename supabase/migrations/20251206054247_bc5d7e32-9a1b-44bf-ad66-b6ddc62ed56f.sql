-- Remove the UPDATE policy that allows users to modify their own orders
-- This is a security vulnerability as users could change order status to 'paid' without payment
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;

-- Note: Order updates should only happen via the payment-webhook edge function 
-- which uses the service role key (bypassing RLS)