/*
  # Chat Messages Schema

  1. New Tables
    - `chat_sessions`: Stores chat conversation sessions
      - `id` (uuid, primary key) - Unique session identifier
      - `user_id` (uuid, references auth.users) - User who owns the session
      - `title` (text) - Optional session title/description
      - `is_active` (boolean) - Whether the session is currently active
      - `created_at` (timestamptz) - Session creation timestamp
      - `updated_at` (timestamptz) - Last activity timestamp
      - `deleted_at` (timestamptz) - Soft delete timestamp

    - `chat_messages`: Stores individual chat messages
      - `id` (uuid, primary key) - Unique message identifier
      - `session_id` (uuid, references chat_sessions) - Session this message belongs to
      - `user_id` (uuid, references auth.users) - User who owns the message
      - `role` (text) - Message role: 'user' or 'assistant'
      - `content` (text) - Message content
      - `created_at` (timestamptz) - Message timestamp
      - `deleted_at` (timestamptz) - Soft delete timestamp

  2. Indexes
    - Index on `chat_sessions.user_id` for fast user session lookups
    - Index on `chat_sessions.is_active` for finding active sessions
    - Index on `chat_messages.session_id` for fast message retrieval by session
    - Index on `chat_messages.user_id` for user message lookups
    - Index on `chat_messages.created_at` for chronological ordering

  3. Security
    - Enable RLS on both tables
    - Users can only view their own sessions
    - Users can only view their own messages
    - Users can insert their own sessions
    - Users can insert their own messages
    - Users can update their own sessions
    - Users can soft delete their own sessions and messages

  4. Automatic Cleanup
    - Function to automatically soft delete messages older than 30 days
    - This can be triggered manually or via a scheduled job
*/

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text DEFAULT 'New Chat',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  deleted_at timestamptz DEFAULT NULL
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  deleted_at timestamptz DEFAULT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_chat_sessions_is_active ON chat_sessions(is_active) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC) WHERE deleted_at IS NULL;

-- Enable Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_sessions
CREATE POLICY "Users can view their own sessions"
  ON chat_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL);

CREATE POLICY "Users can insert their own sessions"
  ON chat_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own sessions"
  ON chat_sessions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL)
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own sessions"
  ON chat_sessions
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for chat_messages
CREATE POLICY "Users can view their own messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL);

CREATE POLICY "Users can insert their own messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own messages"
  ON chat_messages
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL)
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own messages"
  ON chat_messages
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Function to update the updated_at timestamp on chat_sessions
CREATE OR REPLACE FUNCTION update_chat_session_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chat_sessions
  SET updated_at = now()
  WHERE id = NEW.session_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update session timestamp when new message is added
CREATE TRIGGER trigger_update_chat_session_timestamp
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_session_timestamp();

-- Function to soft delete old messages (older than 30 days)
CREATE OR REPLACE FUNCTION soft_delete_old_chat_messages()
RETURNS void AS $$
BEGIN
  UPDATE chat_messages
  SET deleted_at = now()
  WHERE created_at < now() - INTERVAL '30 days'
    AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to soft delete inactive sessions (no activity for 30 days)
CREATE OR REPLACE FUNCTION soft_delete_inactive_sessions()
RETURNS void AS $$
BEGIN
  UPDATE chat_sessions
  SET deleted_at = now(), is_active = false
  WHERE updated_at < now() - INTERVAL '30 days'
    AND deleted_at IS NULL
    AND is_active = true;
END;
$$ LANGUAGE plpgsql;