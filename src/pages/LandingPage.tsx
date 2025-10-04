import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageCircle, ClipboardList, Shield, Clock, Database, ChevronRight, Check, Award, Lock, Zap, Target, Users, AlertCircle } from 'lucide-react';

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
            Vegye át az irányítást
            <span className="block text-blue-600 mt-2">a papírháborúban</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generáljon azonnal használható, jogi érveléssel alátámasztott hatósági beadványokat
            percek alatt. Az első lépésekhez nem kell ügyvéd. 50+ valós csata tapasztalatára építve.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Kezdjük el most</span>
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
              A papírháború első számú fegyvere
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Három szolgáltatás, egy cél: magabiztos válaszok a hatósági megkeresésekre
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
                Lépésről lépésre tanácsadás több tucat sikeresen megvívott ügy tapasztalata alapján.
                Nem kell egyedül harcolnia.
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
                BCG Levéltervezet
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Hivatalos formátumú hatósági beadvány generálása a BCG oltás visszautasításához
                vagy elhalasztásához.
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
                Részletes, jogi érveléssel alátámasztott beadvány készítése személyre szabott
                indoklással és stratégiával.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>~15-20 perc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - New */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Miért válasszon minket?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Fordítsa a rendszer szabályait a rendszer ellen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    50+ Csata Tapasztalata
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nem a nulláról kezdi. Mások már megvívták ezeket a harcokat,
                    mi a győztes stratégiákat adjuk a kezébe. Egy egész közösség tudása
                    egyetlen kattintással.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Teljes Diszkréció
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    A harc a tiéd, a titkaid biztonságban. A rendszert úgy építettük,
                    hogy megvédjen. Adatai titkosítva vannak és soha nem kerülnek harmadik félhez.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ügyvédi Költségek Nélkül
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Spórolja meg az első körös ügyvédi díjakat. Az első, legfontosabb
                    lépéseket tegye meg magabiztosan, drága jogi díjak nélkül.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tökéletesen Megfogalmazott Válaszok
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    A hatóságok a félelemre és a bizonytalanságra építenek.
                    Mi a tudásra és a stratégiára. Minden válasz, amit küldesz, egy ellentámadás.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-slate-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Közösségi Tudás
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nem kell egyedül harcolnia. Egy egész közösség tudása és több tucat
                    sikeresen megvívott ügy tapasztalata áll mögötte.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Azonnal Használható
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Minden levél, amit küldenek, egy támadás. Percek alatt válaszoljon
                    olyan dokumentummal, ami valóban számít.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Hogyan működik?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Három egyszerű lépés a magabiztos válaszhoz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ingyenes Regisztráció
              </h3>
              <p className="text-gray-600">
                Hozzon létre egy fiókot email címmel és jelszóval. Néhány másodperc az egész.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Válasszon Szolgáltatást
              </h3>
              <p className="text-gray-600">
                Töltse ki az űrlapot vagy beszéljen az AI asszisztenssel a személyre szabott stratégiáért.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Generálás és Letöltés
              </h3>
              <p className="text-gray-600">
                Kapjon hatósági formátumú beadványt, amit azonnal használhat és küldhet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Database className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <p className="text-gray-600 font-medium">Valós Csata Tapasztalata</p>
              <p className="text-sm text-gray-500 mt-2">
                Győztes stratégiák valós esetekből
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600 font-medium">Biztonságos és Diszkrét</p>
              <p className="text-sm text-gray-500 mt-2">
                Adatai teljes védelemben
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Check className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">0 Ft</div>
              <p className="text-gray-600 font-medium">Ügyvédi Díj az Első Lépéseknél</p>
              <p className="text-sm text-gray-500 mt-2">
                Spóroljon az első körben
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Quote Section - New */}
      <section className="bg-blue-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="text-center">
            <p className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed">
              "A te gyermeked. A te döntésed. A mi stratégiánk."
            </p>
            <p className="mt-6 text-lg text-gray-600">
              Ne hagyd, hogy a bürokrácia győzzön. Az ő legerősebb fegyverük a megfélemlítés.
              A miénk a tökéletesen megfogalmazott, tértivevényes levél.
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Kezdje el most azonnal
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A regisztráció ingyenes és csak néhány másodpercet vesz igénybe.
            Nincs rejtett költség, nincs kötelezettség.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Ingyenes Regisztráció</span>
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
