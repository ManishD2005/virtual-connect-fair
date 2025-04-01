
-- Create a storage bucket for user documents (like resumes)
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-documents', 'User Documents', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the bucket
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (auth.uid() = owner);

CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (auth.uid() = owner);

CREATE POLICY "Users can update their own documents"
ON storage.objects FOR UPDATE
USING (auth.uid() = owner);

CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (auth.uid() = owner);
