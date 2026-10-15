USE salon;

-- Check table structure
DESCRIBE users;

-- Add name column (only if not exists)
ALTER TABLE users ADD name VARCHAR(100);

-- Make email unique (recommended)
ALTER TABLE users ADD UNIQUE(email);