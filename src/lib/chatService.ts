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
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        return null;
      }

      // Close any existing active sessions for this user (enforce 1 active session per user)
      await supabase
        .from('chat_sessions')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);

      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{ title, is_active: true, user_id: user.id }])
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error creating chat session:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception creating chat session:', error);
      return null;
    }
  },

  async getActiveSession(): Promise<ChatSession | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        return null;
      }

      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .maybeSingle();

      if (error) {
        console.error('Error fetching active session:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception fetching active session:', error);
      return null;
    }
  },

  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        return [];
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching session messages:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching session messages:', error);
      return [];
    }
  },

  async saveMessage(
    sessionId: string,
    role: 'user' | 'assistant',
    content: string
  ): Promise<ChatMessage | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        return null;
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            session_id: sessionId,
            user_id: user.id,
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
    } catch (error) {
      console.error('Exception saving message:', error);
      return null;
    }
  },

  async closeSession(sessionId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        return false;
      }

      const { error } = await supabase
        .from('chat_sessions')
        .update({ is_active: false })
        .eq('id', sessionId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error closing session:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception closing session:', error);
      return false;
    }
  },

  async getUserSessions(): Promise<ChatSession[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        return [];
      }

      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching user sessions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching user sessions:', error);
      return [];
    }
  },

  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        return false;
      }

      const { error } = await supabase
        .from('chat_sessions')
        .delete()
        .eq('id', sessionId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting session:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception deleting session:', error);
      return false;
    }
  },
};
