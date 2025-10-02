import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, Database, UserCheck, Mail, Calendar } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export function PrivacyPolicy() {
  const navigate = useNavigate();

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
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Adatvédelmi Nyilatkozat</h1>
                <p className="mt-1 text-blue-100">Utolsó frissítés: 2025. október 2.</p>
              </div>
            </div>
            <p className="text-blue-50 leading-relaxed">
              Az Ön adatainak védelme kiemelten fontos számunkra. Ez a nyilatkozat részletesen ismerteti,
              hogyan kezeljük és védjük az Ön személyes adatait szolgáltatásunk használata során.
            </p>
          </div>

          <div className="space-y-6">
            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-lg bg-blue-50 p-2">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">1. Gyűjtött Adatok</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Milyen adatokat gyűjtünk és tárolunk
                  </p>
                </div>
              </div>
              <div className="ml-11 space-y-4">
                <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Regisztrációs adatok</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>E-mail cím (a fiók létrehozásához és azonosításához)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Jelszó (titkosított formában tárolva)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Regisztráció időpontja</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Mit NEM gyűjtünk
                  </h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Chat előzmények nem kerülnek mentésre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Generált dokumentumok tartalmát nem tároljuk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Egészségügyi vagy személyes érzékeny adatokat nem őrzünk meg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Nincs követés vagy profilalkotás</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-lg bg-purple-50 p-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">2. Adatkezelés Célja</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Miért és hogyan használjuk az adatokat
                  </p>
                </div>
              </div>
              <div className="ml-11 space-y-3">
                <p className="text-gray-700">
                  Az Ön regisztrációs adatait kizárólag a következő célokra használjuk:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">1.</span>
                    <span><strong>Hitelesítés:</strong> Az Ön fiókjának azonosítása és biztonságos bejelentkezés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">2.</span>
                    <span><strong>Szolgáltatás nyújtása:</strong> A dokumentumgeneráló szolgáltatáshoz való hozzáférés biztosítása</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">3.</span>
                    <span><strong>Kommunikáció:</strong> Fontos értesítések küldése a szolgáltatással kapcsolatban</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-lg bg-red-50 p-2">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">3. Adatbiztonság</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Hogyan védjük az Ön adatait
                  </p>
                </div>
              </div>
              <div className="ml-11 space-y-3">
                <p className="text-gray-700">
                  Komoly technikai és szervezési intézkedéseket alkalmazunk az Ön adatainak védelme érdekében:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">🔒</span>
                    <span>Jelszavak egyirányú titkosítással (hash) tárolva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">🔒</span>
                    <span>HTTPS titkosított kapcsolat minden adatátvitelhez</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">🔒</span>
                    <span>Supabase biztonságos adatbázis infrastruktúra</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">🔒</span>
                    <span>Rendszeres biztonsági frissítések és ellenőrzések</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-lg bg-orange-50 p-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">4. Adatmegőrzés</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Meddig őrizzük meg az adatokat
                  </p>
                </div>
              </div>
              <div className="ml-11 space-y-3">
                <p className="text-gray-700">
                  A regisztrációs adatokat addig őrizzük meg, amíg az Ön fiókja aktív. Bármikor kérheti
                  fiókja törlését, amely esetén minden személyes adatát véglegesen töröljük rendszerünkből.
                </p>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-lg bg-teal-50 p-2">
                  <UserCheck className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">5. Az Ön Jogai</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Milyen jogokkal rendelkezik
                  </p>
                </div>
              </div>
              <div className="ml-11 space-y-3">
                <p className="text-gray-700 mb-3">
                  A GDPR szerint Ön jogosult:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-teal-50 p-3 border border-teal-200">
                    <h4 className="font-semibold text-teal-900 text-sm mb-1">Hozzáférés joga</h4>
                    <p className="text-xs text-teal-800">Tájékoztatást kérhet az adatairól</p>
                  </div>
                  <div className="rounded-lg bg-teal-50 p-3 border border-teal-200">
                    <h4 className="font-semibold text-teal-900 text-sm mb-1">Helyesbítés joga</h4>
                    <p className="text-xs text-teal-800">Pontatlan adatok módosítása</p>
                  </div>
                  <div className="rounded-lg bg-teal-50 p-3 border border-teal-200">
                    <h4 className="font-semibold text-teal-900 text-sm mb-1">Törlés joga</h4>
                    <p className="text-xs text-teal-800">Fiók és adatok törlése</p>
                  </div>
                  <div className="rounded-lg bg-teal-50 p-3 border border-teal-200">
                    <h4 className="font-semibold text-teal-900 text-sm mb-1">Adathordozás joga</h4>
                    <p className="text-xs text-teal-800">Adatok másolatának kérése</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-lg bg-indigo-50 p-2">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">6. Kapcsolat</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Kérdése van az adatvédelemmel kapcsolatban?
                  </p>
                </div>
              </div>
              <div className="ml-11 space-y-3">
                <p className="text-gray-700">
                  Ha bármilyen kérdése vagy kérése van az adatvédelemmel kapcsolatban, kérjük, vegye fel
                  velünk a kapcsolatot az alábbi e-mail címen:
                </p>
                <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-200">
                  <p className="text-indigo-900 font-semibold">privacy@example.com</p>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-lg bg-gray-50 p-2">
                  <Shield className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">7. Módosítások</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Az adatvédelmi nyilatkozat változásai
                  </p>
                </div>
              </div>
              <div className="ml-11 space-y-3">
                <p className="text-gray-700">
                  Fenntartjuk a jogot, hogy ezt az adatvédelmi nyilatkozatot bármikor módosítsuk.
                  A jelentős változásokról e-mailben értesítjük felhasználóinkat. A szolgáltatás
                  folyamatos használata az új adatvédelmi nyilatkozat elfogadását jelenti.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Az Ön adatainak védelme az első számú prioritásunk
                </h3>
                <p className="text-sm text-blue-800">
                  Elkötelezettek vagyunk amellett, hogy az Ön személyes adatait a lehető legnagyobb
                  gondossággal és átláthatósággal kezeljük. Minimális adatgyűjtés, maximális biztonság.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© 2025 Oltási Dokumentum Generátor. Minden jog fenntartva.</p>
          </div>
        </div>
      </div>
    </>
  );
}
