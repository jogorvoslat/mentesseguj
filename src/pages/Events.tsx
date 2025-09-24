import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Search, Copy, Send, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Navbar } from '../components/Navbar';

interface Event {
  id: string;
  esemeny: string;
  kategoria: string;
  teendo: string;
  created_at: string;
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatResponse, setChatResponse] = useState<string>('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, searchTerm]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEvents(data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set((data || []).map(event => event.kategoria))];
      setCategories(uniqueCategories);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Hiba történt az adatok betöltésekor');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(event => event.kategoria === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.esemeny.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.teendo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCopyEvent = async (eventText: string, eventId: string) => {
    try {
      await navigator.clipboard.writeText(eventText);
      setCopiedId(eventId);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Másolási hiba:', error);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isSendingMessage) return;

    try {
      setIsSendingMessage(true);
      setChatError(null);
      setChatResponse('');

      const response = await fetch('https://n8n-1-nasm.onrender.com/webhook/mentchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: chatMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      
      // Extract text from JSON response if it contains {"output":"..."}
      let responseText = data;
      try {
        const jsonMatch = data.match(/\{"output":"(.+)"\}/);
        if (jsonMatch && jsonMatch[1]) {
          responseText = jsonMatch[1];
        }
      } catch (error) {
        // If parsing fails, use the original response
        responseText = data;
      }
      
      // Replace \n\n with actual line breaks
      responseText = responseText.replace(/\\n\\n/g, '\n\n').replace(/\\n/g, '\n');
      
      setChatResponse(responseText);
      setChatMessage('');
    } catch (error) {
      setChatError(error instanceof Error ? error.message : 'Hiba történt az üzenet küldésekor');
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Események betöltése...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="rounded-md bg-red-50 p-4 max-w-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Események</h1>
            </div>
            <p className="text-gray-600">
              Fontos események és teendők áttekintése
            </p>
          </div>

          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Chat Asszisztens</h2>
            </div>
            
            <form onSubmit={handleSendMessage} className="mb-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Írja be üzenetét..."
                  disabled={isSendingMessage}
                  className="flex-1 block rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!chatMessage.trim() || isSendingMessage}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingMessage ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>

            {/* Chat Response */}
            {chatResponse && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-6 mb-4">
                <h3 className="text-base font-semibold text-blue-900 mb-3">Válasz:</h3>
                <div className="text-base text-blue-800 whitespace-pre-wrap leading-relaxed font-medium">
                  {chatResponse}
                </div>
              </div>
            )}

            {/* Chat Error */}
            {chatError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-700">{chatError}</p>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Keresés
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Keresés esemény vagy teendő alapján..."
                    className="pl-10 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="sm:w-64">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Kategória
                </label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="pl-10 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Összes kategória</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory || searchTerm) && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Szűrők törlése
                  </button>
                </div>
              )}
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              {filteredEvents.length} esemény megjelenítve
              {(selectedCategory || searchTerm) && ` (${events.length} összesen)`}
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nincsenek események</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedCategory || searchTerm
                    ? 'Próbálja meg módosítani a szűrőket.'
                    : 'Jelenleg nincsenek elérhető események.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Esemény
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategória
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teendő
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              {event.esemeny}
                            </div>
                            <button
                              onClick={() => handleCopyEvent(event.esemeny, event.id)}
                              className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Esemény szövegének másolása"
                            >
                              <Copy className={`h-4 w-4 ${copiedId === event.id ? 'text-green-600' : ''}`} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            event.kategoria === 'Egészségügy'
                              ? 'bg-green-100 text-green-800'
                              : event.kategoria === 'Jogi'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {event.kategoria}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {event.teendo}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}