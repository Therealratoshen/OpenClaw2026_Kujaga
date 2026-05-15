-- Beta Waitlist Table for Kujaga
CREATE TABLE beta_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telegram_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup
CREATE INDEX idx_beta_waitlist_email ON beta_waitlist(email);
CREATE INDEX idx_beta_waitlist_status ON beta_waitlist(status);

-- Enable RLS
ALTER TABLE beta_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts for anyone (anonymous beta signup)
CREATE POLICY "Allow beta signups" ON beta_waitlist
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow reads for authenticated users (admin)
CREATE POLICY "Allow admin read" ON beta_waitlist
  FOR SELECT TO authenticated
  USING (true);

-- Verify table created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'beta_waitlist';