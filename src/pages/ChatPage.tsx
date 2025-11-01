import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { PromptBox } from '../components/ui/chatgpt-prompt-input';
import { supabase } from '../lib/supabase';
import { chatService, ChatSession } from '../lib/chatService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize authentication and session
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          navigate('/login');
          return;
        }

        setUserId(user.id);

        const activeSession = await chatService.getActiveSession();

        if (activeSession) {
          setSessionId(activeSession.id);
          const sessionMessages = await chatService.getSessionMessages(activeSession.id);

          setMessages(sessionMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.created_at),
          })));
        } else {
          const newSession = await chatService.createSession();
          if (newSession) {
            setSessionId(newSession.id);
          }
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
        setChatError('Hiba történt a chat inicializálása közben');
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [navigate]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isSendingMessage || !sessionId || !userId) return;

    const userMessage: Message = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsSendingMessage(true);
    setChatError(null);

    try {
      await chatService.saveMessage(sessionId, 'user', message.trim());

      const requestBody = {
        message: message.trim(),
        userId,
        sessionId,
      };

      console.log('Sending webhook request:', {
        url: 'https://n8n-1-nasm.onrender.com/webhook/mentchat',
        body: requestBody,
      });

      const response = await fetch('https://n8n-1-nasm.onrender.com/webhook/mentchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      console.log('Webhook response:', data);

      let responseText = data;
      try {
        const jsonMatch = data.match(/\{"output":"(.+)"\}/);
        if (jsonMatch && jsonMatch[1]) {
          responseText = jsonMatch[1];
        }
      } catch (error) {
        responseText = data;
      }

      responseText = responseText.replace(/\\n\\n/g, '\n\n').replace(/\\n/g, '\n');

      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      await chatService.saveMessage(sessionId, 'assistant', responseText);

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Hiba történt az üzenet küldésekor';
      console.error('Error sending message:', error);
      setChatError(errorMessage);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const clearConversation = async () => {
    if (sessionId) {
      await chatService.closeSession(sessionId);
      const newSession = await chatService.createSession();
      if (newSession) {
        setSessionId(newSession.id);
      }
    }
    setMessages([]);
    setChatError(null);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
            <p>Chat betöltése...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Chat Asszisztens</h1>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Új beszélgetés
              </button>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="h-16 w-16 text-gray-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-400 mb-2">
                  Kezdjen el beszélgetni
                </h2>
                <p className="text-gray-500">
                  Írjon be egy üzenetet a chat asszisztens használatához
                </p>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white ml-auto'
                          : 'bg-gray-700 text-gray-100 mr-auto'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-100 prose-strong:text-gray-100 prose-code:text-gray-100 prose-pre:bg-gray-800 prose-pre:text-gray-100">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                      )}
                      <div
                        className={`text-xs mt-2 opacity-70 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('hu-HU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isSendingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 rounded-2xl px-4 py-3 mr-auto">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Válasz generálása...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Error Display */}
          {chatError && (
            <div className="mx-6 mb-4">
              <div className="bg-red-900/50 border border-red-700 rounded-md p-4">
                <p className="text-sm text-red-200">{chatError}</p>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-gray-700">
            <PromptBox
              onSubmit={handleSendMessage}
              isLoading={isSendingMessage}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Írja be üzenetét..."
            />
          </div>
        </div>
      </div>
    </>
  );
}