-- Add missing DELETE RLS policies to registrations and lesson_progress tables

-- Allow users to delete their own registrations
CREATE POLICY "Users can delete their own registrations" 
ON public.registrations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Allow users to delete their own lesson progress
CREATE POLICY "Users can delete their own lesson progress" 
ON public.lesson_progress 
FOR DELETE 
USING (auth.uid() = user_id);