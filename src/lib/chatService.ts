import { supabase } from './supabase';

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const chatService = {
  async createSession(title: string = 'New Chat'): Promise<ChatSession | null> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([{ title, is_active: true }])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating chat session:', error);
      return null;
    }

    return data;
  },

  async getActiveSession(): Promise<ChatSession | null> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .maybeSingle();

    if (error) {
      console.error('Error fetching active session:', error);
      return null;
    }

    return data;
  },

  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching session messages:', error);
      return [];
    }

    return data || [];
  },

  async saveMessage(
    sessionId: string,
    role: 'user' | 'assistant',
    content: string
  ): Promise<ChatMessage | null> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          session_id: sessionId,
          role,
          content,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error saving message:', error);
      return null;
    }

    return data;
  },

  async closeSession(sessionId: string): Promise<boolean> {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ is_active: false })
      .eq('id', sessionId);

    if (error) {
      console.error('Error closing session:', error);
      return false;
    }

    return true;
  },

  async getUserSessions(): Promise<ChatSession[]> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching user sessions:', error);
      return [];
    }

    return data || [];
  },

  async deleteSession(sessionId: string): Promise<boolean> {
    const { error } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) {
      console.error('Error deleting session:', error);
      return false;
    }

    return true;
  },
};
