-- RUN THIS SCRIPT IN YOUR SUPABASE SQL EDITOR --

-- 1. Create the bucket if it doesn't exist and make it public
INSERT INTO storage.buckets (id, name, public)
VALUES ('equipment-images', 'equipment-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing policies to prevent "already exists" errors
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;

-- 3. Allow public read access to the bucket
-- This ensures that anyone (including non-logged-in users) can see the images
CREATE POLICY "Public Access" 
ON storage.objects 
FOR SELECT
USING ( bucket_id = 'equipment-images' );

-- 4. Allow authenticated users to upload images
-- This ensures that only logged-in users can upload photos
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'equipment-images' 
  AND auth.role() = 'authenticated'
);

-- 5. Allow users to update their own images (optional but recommended)
CREATE POLICY "Users can update their own images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'equipment-images' 
  AND auth.uid() = owner
);

-- 6. Allow users to delete their own images (optional but recommended)
CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'equipment-images' 
  AND auth.uid() = owner
);
