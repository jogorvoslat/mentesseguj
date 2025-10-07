import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function HomePage() {
  const { user } = useAuth();

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Oltási Mentességi Szolgáltatások
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Szakértő csapatunk segít az oltási mentesség megszerzésében. 
          Teljes körű jogi és adminisztratív támogatást nyújtunk.
        </p>
        
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Regisztráció
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Szolgáltatások megtekintése
            </Link>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Jogi Védelem</h3>
          <p className="text-gray-600">
            Tapasztalt jogászok segítségével biztosítjuk az oltási mentességhez való jogát.
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Dokumentum Készítés</h3>
          <p className="text-gray-600">
            Minden szükséges dokumentumot elkészítünk és benyújtunk az illetékes hatóságokhoz.
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Személyes Támogatás</h3>
          <p className="text-gray-600">
            Végig támogatjuk Önt a mentességi folyamat során, minden lépésben.
          </p>
        </div>
      </div>

      {/* Events Section */}
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mentességi Folyamat Lépései
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Az oltási mentesség megszerzése több lépésből áll.
            Csapatunk végigkíséri Önt a teljes folyamaton.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 rounded-lg p-8 text-center mt-12 mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Készen áll a mentességi folyamat megkezdésére?
        </h2>
        <p className="text-gray-600 mb-6">
          Válassza ki az Önnek megfelelő szolgáltatást és kezdje el még ma!
        </p>
        <Link
          to="/pricing"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Szolgáltatások megtekintése
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}