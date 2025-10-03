import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Shield, AlertTriangle, Trash2, LogOut, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { supabase } from '../lib/supabase';

interface UserProfile {
  email: string;
  created_at: string;
  id: string;
}

export function Settings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) throw error;

      if (user) {
        setProfile({
          email: user.email || '',
          created_at: user.created_at,
          id: user.id
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hiba történt a profil betöltése során');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.toLowerCase() !== 'törlés') {
      setError('Kérjük, írja be a "törlés" szót a megerősítéshez');
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Nincs aktív munkamenet');
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'A fiók törlése sikertelen');
      }

      await supabase.auth.signOut();
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hiba történt a fiók törlésekor');
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Betöltés...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Vissza
          </button>

          <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Beállítások és Profil</h1>
                <p className="mt-1 text-blue-100">Fiók információk és beállítások kezelése</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">Hiba</h3>
                  <p className="text-sm text-red-800 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-6">
                <div className="rounded-lg bg-blue-50 p-2">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Profil Információk</h2>
                  <p className="mt-1 text-sm text-gray-600">Az Ön fiókjának alapvető adatai</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Email cím</p>
                    <p className="text-base text-gray-900 mt-1">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Regisztráció dátuma</p>
                    <p className="text-base text-gray-900 mt-1">
                      {profile?.created_at ? formatDate(profile.created_at) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">Adatvédelem</p>
                    <p className="text-sm text-green-800 mt-1">
                      Csak az email címét és regisztrációs időpontját tároljuk. Chat előzményeket,
                      generált dokumentumokat vagy érzékeny adatokat nem őrzünk meg.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-6">
                <div className="rounded-lg bg-gray-50 p-2">
                  <LogOut className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Munkamenet</h2>
                  <p className="mt-1 text-sm text-gray-600">Jelentkezzen ki a fiókjából</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Kijelentkezés
              </button>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-red-200">
              <div className="flex items-start gap-3 mb-6">
                <div className="rounded-lg bg-red-50 p-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-red-900">Veszélyes Zóna</h2>
                  <p className="mt-1 text-sm text-red-700">Fiók végleges törlése</p>
                </div>
              </div>

              {!showDeleteConfirm ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <h3 className="font-semibold text-red-900 mb-2">Mit jelent a fiók törlése?</h3>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Az email címe és minden fiók adata véglegesen törlődik</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Ez a művelet nem vonható vissza</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Nem lesz lehetősége újra bejelentkezni ezzel az email címmel</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Fiók Törlése
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <h3 className="font-semibold text-red-900 mb-2">
                      Biztosan törölni szeretné a fiókját?
                    </h3>
                    <p className="text-sm text-red-800 mb-4">
                      Ez a művelet nem vonható vissza. Minden adata véglegesen törlődik a rendszerünkből.
                    </p>
                    <p className="text-sm text-red-900 font-medium">
                      Írja be a "törlés" szót a megerősítéshez:
                    </p>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="törlés"
                      className="mt-2 w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleting || deleteConfirmText.toLowerCase() !== 'törlés'}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting ? (
                        <>
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Törlés folyamatban...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Fiók Végleges Törlése
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText('');
                        setError(null);
                      }}
                      disabled={deleting}
                      className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Mégse
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Kérdése van?{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 hover:underline">
                Adatvédelmi Nyilatkozat
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
