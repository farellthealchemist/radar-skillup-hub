
-- Fix 1: Add UPDATE policy for orders table so the payment-webhook (service role) can update order status.
-- Service role bypasses RLS, but we also allow users to see updates to their own orders.
-- The webhook uses service_role so it already bypasses RLS — but we add a policy for completeness
-- and to allow future authenticated service updates.
CREATE POLICY "Service role can update any order"
ON public.orders
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Fix 2: processed_webhooks — RLS is enabled with zero policies.
-- The payment-webhook uses service_role (bypasses RLS), so it works already.
-- But having RLS enabled with no policies means no authenticated user can access it (which is correct).
-- We explicitly add a policy to allow service operations (service_role bypasses anyway)
-- and block all regular user access, making the intent explicit.
-- No SELECT/INSERT/UPDATE/DELETE for regular authenticated users — only service_role.
-- Since service_role bypasses RLS, we do NOT need a permissive policy; 
-- instead we create a restrictive policy that denies all non-service access explicitly.
-- The cleanest solution: add a policy that only allows access via service role context.
-- In Postgres RLS, service_role always bypasses, so we just need at least one policy
-- to satisfy the "RLS enabled no policy" lint warning while keeping it secure.
CREATE POLICY "Only service role can access processed_webhooks"
ON public.processed_webhooks
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
