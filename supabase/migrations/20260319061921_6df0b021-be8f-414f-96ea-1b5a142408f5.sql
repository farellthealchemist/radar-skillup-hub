
-- 1. Remove the permissive INSERT policy on enrollments (users should NOT insert directly)
DROP POLICY IF EXISTS "Users can create their own enrollments" ON public.enrollments;

-- 2. Remove the UPDATE policy on orders (only webhook service_role should update orders)
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
