import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Calendar, LogOut, Home, ClipboardList, FileCheck, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <span>Mentességi Kérelem</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Főoldal</span>
              </Link>
              
              <Link
                to="/bcg-letter-generator"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/bcg-letter-generator')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FileCheck className="h-4 w-4" />
                <span>BCG Levél</span>
              </Link>
              
              <Link
                to="/form"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/form')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ClipboardList className="h-4 w-4" />
                <span>Mentességi Kérelem</span>
              </Link>
              
              <Link
                to="/chat"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/chat')
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </Link>
              
              <Link
                to="/events"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/events')
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Események</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Kijelentkezés</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}