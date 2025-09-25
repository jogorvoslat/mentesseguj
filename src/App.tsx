import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { FormPage } from './pages/FormPage';
import { BCGLetterGenerator } from './pages/BCGLetterGenerator';
import { Events } from './pages/Events';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await supabase.auth.getSession();
      } catch (error) {
        // Clear stale session if validation fails
        await supabase.auth.signOut();
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // Only redirect to dashboard if user is on login page or root
        if (location.pathname === '/login' || location.pathname === '/') {
          navigate('/dashboard');
        }
        // If user is already on a protected route, stay there
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form"
        element={
          <ProtectedRoute>
            <FormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bcg-letter-generator"
        element={
          <ProtectedRoute>
            <BCGLetterGenerator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        // Clear stale session if user validation fails
        await supabase.auth.signOut();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default App;