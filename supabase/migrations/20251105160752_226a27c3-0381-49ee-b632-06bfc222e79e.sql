-- Fix security warnings: Set search_path for functions

-- Update generate_order_id function with proper search_path
CREATE OR REPLACE FUNCTION public.generate_order_id()
RETURNS TEXT
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  date_part TEXT;
  random_part TEXT;
  new_order_id TEXT;
  counter INTEGER := 0;
BEGIN
  date_part := TO_CHAR(NOW(), 'YYYYMMDD');
  
  LOOP
    -- Generate 4 random digits
    random_part := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    new_order_id := 'ORD-' || date_part || '-' || random_part;
    
    -- Check if this order_id already exists
    IF NOT EXISTS (SELECT 1 FROM public.orders WHERE order_id = new_order_id) THEN
      RETURN new_order_id;
    END IF;
    
    counter := counter + 1;
    IF counter > 100 THEN
      RAISE EXCEPTION 'Could not generate unique order_id after 100 attempts';
    END IF;
  END LOOP;
END;
$$;

-- Update set_order_id function with proper search_path
CREATE OR REPLACE FUNCTION public.set_order_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_id IS NULL OR NEW.order_id = '' THEN
    NEW.order_id := public.generate_order_id();
  END IF;
  RETURN NEW;
END;
$$;