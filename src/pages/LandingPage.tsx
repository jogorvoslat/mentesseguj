import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageCircle, ClipboardList, Shield, Clock, Database, ChevronRight, Check } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login?mode=register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Oltási Mentesség</span>
          </div>
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Bejelentkezés
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Hivatalos oltási dokumentumok
            <span className="block text-blue-600 mt-2">ügyvéd nélkül</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            50+ összegyűjtött eset alapján kiképzett AI segítségével generálhat hivatalos leveleket
            és mentességi kérelmeket percek alatt.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Regisztráció</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-4 bg-white text-gray-700 text-lg font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
            >
              Már van fiókom
            </button>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Három egyszerű szolgáltatás
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Válassza ki az Önnek megfelelő megoldást
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Chat */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Chat Asszisztens
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Lépésről lépésre tanácsadás 50+ valós eset alapján kiképzett mesterséges intelligenciával.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>Azonnali válaszok</span>
              </div>
            </div>

            {/* BCG Letter */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                BCG Visszautasító Levél
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Hivatalos levél generálása a BCG oltás visszautasításához vagy elhalasztásához.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>~5 perc</span>
              </div>
            </div>

            {/* Exemption Request */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <ClipboardList className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mentességi Kérelem
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Részletes oltási mentességi kérelem készítése személyre szabott indoklással.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>~15-20 perc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Hogyan működik?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Regisztráció
              </h3>
              <p className="text-gray-600">
                Hozzon létre egy ingyenes fiókot email címmel és jelszóval
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Válasszon szolgáltatást
              </h3>
              <p className="text-gray-600">
                Töltse ki az űrlapot vagy beszéljen az AI asszisztenssel
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Generálás és letöltés
              </h3>
              <p className="text-gray-600">
                Kapjon hivatalos levelet, amit azonnal használhat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Database className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <p className="text-gray-600">Valós eset az adatbázisban</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Biztonságos</div>
              <p className="text-gray-600">Adatai védve vannak</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Check className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Ügyvéd nélkül</div>
              <p className="text-gray-600">Nincs szükség jogi díjakra</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Kezdje el még ma
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A regisztráció ingyenes és csak néhány másodpercet vesz igénybe
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Ingyenes regisztráció</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <a
              href="/privacy-policy"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              Adatvédelmi Nyilatkozat
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
