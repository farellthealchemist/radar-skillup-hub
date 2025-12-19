-- Create table to track processed webhook transactions (replay protection)
CREATE TABLE public.processed_webhooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT NOT NULL UNIQUE,
  order_id TEXT NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster lookups
CREATE INDEX idx_processed_webhooks_transaction_id ON public.processed_webhooks(transaction_id);
CREATE INDEX idx_processed_webhooks_processed_at ON public.processed_webhooks(processed_at);

-- Enable RLS (only service role should access this)
ALTER TABLE public.processed_webhooks ENABLE ROW LEVEL SECURITY;

-- No public policies - only service role key can access

-- Add storage policy to restrict avatar file extensions
CREATE POLICY "Only image extensions allowed for avatar uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text AND
  (
    lower(right(name, 4)) = '.jpg' OR
    lower(right(name, 4)) = '.png' OR
    lower(right(name, 5)) = '.jpeg' OR
    lower(right(name, 5)) = '.webp'
  )
);