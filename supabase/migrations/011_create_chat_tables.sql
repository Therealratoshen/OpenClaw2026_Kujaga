-- =====================================================
-- KUJAGA: Create chat_messages table for unified messaging
-- =====================================================

-- Drop existing table if exists (for clean setup)
DROP TABLE IF EXISTS chat_messages CASCADE;

-- Create chat_messages table
-- Both Telegram and web chat will store messages here
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('telegram', 'web')),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast retrieval
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX idx_chat_messages_platform ON chat_messages(platform);

-- Enable RLS (Row Level Security)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated inserts (for API)
CREATE POLICY "Allow inserts for authenticated users" ON chat_messages
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Policy: Allow reads for anyone (for demo)
-- In production, restrict to user's own messages
CREATE POLICY "Allow reads for all" ON chat_messages
  FOR SELECT TO authenticated
  USING (true);

-- Function to get chat history
CREATE OR REPLACE FUNCTION get_chat_history(
  p_user_id TEXT,
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  user_id TEXT,
  platform TEXT,
  role TEXT,
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cm.id,
    cm.user_id,
    cm.platform,
    cm.role,
    cm.content,
    cm.metadata,
    cm.created_at
  FROM chat_messages cm
  WHERE cm.user_id = p_user_id
  ORDER BY cm.created_at ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- KUJAGA: Create user_sessions table
-- =====================================================

DROP TABLE IF EXISTS user_sessions CASCADE;

CREATE TABLE user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id TEXT UNIQUE,
  web_session_id TEXT UNIQUE,
  email TEXT UNIQUE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_sessions_telegram ON user_sessions(telegram_id);
CREATE INDEX idx_user_sessions_web ON user_sessions(web_session_id);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON user_sessions
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- KUJAGA: Create monitoring_entries table
-- =====================================================

DROP TABLE IF EXISTS monitoring_entries CASCADE;

CREATE TABLE monitoring_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('email', 'domain', 'name', 'company')),
  entry_value TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_checked TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_monitoring_entries_user ON monitoring_entries(user_id);
CREATE INDEX idx_monitoring_entries_active ON monitoring_entries(user_id, is_active);

-- Enable RLS
ALTER TABLE monitoring_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON monitoring_entries
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- KUJAGA: Create alerts table
-- =====================================================

DROP TABLE IF EXISTS alerts CASCADE;

CREATE TABLE alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('breach', 'phishing', 'news', 'info')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'resolved')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_alerts_user ON alerts(user_id);
CREATE INDEX idx_alerts_status ON alerts(status);

-- Enable RLS
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON alerts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- VERIFICATION: Check tables were created
-- =====================================================

SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = ct.table_name) as column_count
FROM information_schema.tables ct
WHERE table_schema = 'public'
  AND table_name IN ('chat_messages', 'user_sessions', 'monitoring_entries', 'alerts')
ORDER BY table_name;