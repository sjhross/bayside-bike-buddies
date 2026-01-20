-- Enable RLS on the table if not already enabled (good practice)
ALTER TABLE trails ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anyone to view trails (public read access)
CREATE POLICY "Allow public read access"
ON trails FOR SELECT
USING (true);

-- Policy 2: Allow authenticated users to insert new trails
CREATE POLICY "Allow authenticated upload"
ON trails FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy 3: Allow users to delete their own trails (Optional, standard practice)
CREATE POLICY "Allow users to delete own trails"
ON trails FOR DELETE
USING (auth.uid() = user_id);

-- CRITICAL FIX FOR ADMIN:
-- Policy 4: Allow SPECIFIC admin email to delete ANY trail
-- Note: Replace 'seanjhross@gmail.com' with your exact email if different.
CREATE POLICY "Allow admin to delete any trail"
ON trails FOR DELETE
USING ((auth.jwt() ->> 'email') = 'seanjhross@gmail.com');

-- Policy 5: Allow admin to update visibility (for the Hide/Show toggle)
CREATE POLICY "Allow admin to update visibility"
ON trails FOR UPDATE
USING ((auth.jwt() ->> 'email') = 'seanjhross@gmail.com');
