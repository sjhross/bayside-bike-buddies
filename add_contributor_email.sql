-- 1. Add the new column to store the email
ALTER TABLE trails ADD COLUMN IF NOT EXISTS contributor_email TEXT;

-- 2. Backfill existing data by joining with the secure auth.users table
-- This works because you are running it in the SQL Editor (Admin privileges)
UPDATE trails
SET contributor_email = users.email
FROM auth.users
WHERE trails.user_id = users.id;

-- 3. (Optional) Make it required for future? 
-- Best not to enforce NOT NULL immediately to avoid breakage, but good to know.
