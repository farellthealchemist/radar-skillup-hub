-- Drop the public read policy on lessons
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON public.lessons;

-- Add enrollment-restricted policy for lessons (protects video URLs)
CREATE POLICY "Enrolled users can view lessons"
  ON public.lessons FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      JOIN public.course_modules cm ON cm.course_id = e.course_id
      WHERE cm.id = lessons.module_id
      AND e.user_id = auth.uid()
      AND e.status = 'active'
    )
  );