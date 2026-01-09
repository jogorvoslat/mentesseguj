/*
  # Create System Prompts Table

  1. New Tables
    - `system_prompts`
      - `id` (uuid, primary key) - Unique prompt identifier
      - `user_id` (uuid, references auth.users) - User who owns the prompt
      - `name` (text) - Display name for the prompt
      - `content` (text) - The actual system prompt content
      - `is_active` (boolean) - Whether this prompt is the default/active prompt
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Indexes
    - Index on `user_id` for fast user prompt lookups
    - Index on `user_id, is_active` for finding active prompts

  3. Security
    - Enable RLS on the table
    - Users can only view, create, update, and delete their own prompts
    - Enforce user_id ownership in all operations
*/

CREATE TABLE IF NOT EXISTS system_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  content text NOT NULL,
  is_active boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_system_prompts_user_id ON system_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_system_prompts_user_active ON system_prompts(user_id, is_active);

ALTER TABLE system_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own system prompts"
  ON system_prompts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own system prompts"
  ON system_prompts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own system prompts"
  ON system_prompts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own system prompts"
  ON system_prompts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
