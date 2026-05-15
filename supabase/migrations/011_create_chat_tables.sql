-- Migration: Create chat_messages table for unified messaging
-- Both Telegram and web chat will store messages here

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Telegram chat_id or web session id
  platform TEXT NOT NULL CHECK (platform IN ('telegram', 'web')),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast retrieval
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Enable RLS for security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can only see their own messages
CREATE POLICY "Users see own messages" ON chat_messages
  FOR ALL USING (user_id = auth.uid());

-- Function to get chat history
CREATE OR REPLACE FUNCTION get_chat_history(p_user_id TEXT, p_limit INTEGER DEFAULT 50)
RETURNS TABLE (
  id UUID,
  platform TEXT,
  role TEXT,
  content TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cm.id,
    cm.platform,
    cm.role,
    cm.content,
    cm.created_at
  FROM chat_messages cm
  WHERE cm.user_id = p_user_id
  ORDER BY cm.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to save a message
CREATE OR REPLACE FUNCTION save_chat_message(
  p_user_id TEXT,
  p_platform TEXT,
  p_role TEXT,
  p_content TEXT,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO chat_messages (user_id, platform, role, content, metadata)
  VALUES (p_user_id, p_platform, p_role, p_content, p_metadata)
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Table for user sessions (links Telegram to web)
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id TEXT UNIQUE,
  web_session_id TEXT UNIQUE,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_telegram ON user_sessions(telegram_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_web ON user_sessions(web_session_id);