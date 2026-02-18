
-- Drop the overly permissive orders UPDATE policy and replace with owner-scoped one
DROP POLICY IF EXISTS "Service role can update any order" ON public.orders;

-- Users can only update their own orders (status changes done by service_role bypass RLS)
CREATE POLICY "Users can update their own orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
