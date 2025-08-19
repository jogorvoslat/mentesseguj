import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ClipboardList, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navigateToForm = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ClipboardList className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Oltási Dokumentum Generátor
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Kijelentkezés
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-600">
            Válassza ki, milyen típusú dokumentumot szeretne generálni:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BCG Letter Generator Card */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer border border-gray-200">
            <div 
              className="p-6 h-full flex flex-col"
              onClick={() => navigateToForm('/bcg-letter-generator')}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    BCG Oltás Visszautasító Levél
                  </h2>
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-600 mb-4">
                  Hivatalos levél generálása a BCG oltás visszautasításához vagy elhalasztásához újszülöttek számára.
                </p>
                
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kórházi címzés és hivatalos formátum
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Választható hangvétel és indoklás
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Azonnali letöltés és másolás
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    Gyors generálás →
                  </span>
                  <span className="text-xs text-gray-400">
                    ~5 perc
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vaccination Exemption Form Card */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer border border-gray-200">
            <div 
              className="p-6 h-full flex flex-col"
              onClick={() => navigateToForm('/form')}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <ClipboardList className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Mentességi Kérelem Generátor
                  </h2>
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-600 mb-4">
                  Részletes oltási mentességi kérelem készítése egészségügyi és személyes adatok alapján.
                </p>
                
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Részletes egészségügyi felmérés
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Családi kórtörténet elemzése
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Személyre szabott indoklás
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    Részletes űrlap →
                  </span>
                  <span className="text-xs text-gray-400">
                    ~15-20 perc
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ClipboardList className="h-5 w-5 text-blue-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-900">
                Fontos tudnivalók
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Mindkét generátor hivatalos, jogi szempontból megalapozott dokumentumokat hoz létre. 
                  A generált levelek és kérelmek azonnal használhatók hivatalos eljárásokban.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}