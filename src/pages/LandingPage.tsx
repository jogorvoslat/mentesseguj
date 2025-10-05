import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageCircle, ClipboardList, Shield, Clock, Database, ChevronRight, Check, Award, Lock, Zap, Target, Users, AlertCircle, Moon, Sun } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleGetStarted = () => {
    navigate('/login?mode=register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Oltási Mentesség</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Bejelentkezés
            </button>
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Regisztráció
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Vegye át az irányítást
            <span className="block text-blue-600 dark:text-blue-400 mt-2">a papírháborúban</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Generáljon azonnal használható, jogi érveléssel alátámasztott hatósági beadványokat
            percek alatt. Az első lépésekhez nem kell ügyvéd. 50+ valós csata tapasztalatára építve.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="group px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Kezdjük el most</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-lg font-medium rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              Már van fiókom
            </button>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              A papírháború első számú fegyvere
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Három szolgáltatás, egy cél: magabiztos válaszok a hatósági megkeresésekre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Chat */}
            <div className="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                AI Chat Asszisztens
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Lépésről lépésre tanácsadás több tucat sikeresen megvívott ügy tapasztalata alapján.
                Nem kell egyedül harcolnia.
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>Azonnali válaszok</span>
              </div>
            </div>

            {/* BCG Letter */}
            <div className="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                BCG Levéltervezet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Hivatalos formátumú hatósági beadvány generálása a BCG oltás visszautasításához
                vagy elhalasztásához.
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>~5 perc</span>
              </div>
            </div>

            {/* Exemption Request */}
            <div className="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ClipboardList className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Mentességi Kérelem
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Részletes, jogi érveléssel alátámasztott beadvány készítése személyre szabott
                indoklással és stratégiával.
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Miért válasszon minket?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Fordítsa a rendszer szabályait a rendszer ellen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    50+ Csata Tapasztalata
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Nem a nulláról kezdi. Mások már megvívták ezeket a harcokat,
                    mi a győztes stratégiákat adjuk a kezébe. Egy egész közösség tudása
                    egyetlen kattintással.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Teljes Diszkréció
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A harc a tiéd, a titkaid biztonságban. A rendszert úgy építettük,
                    hogy megvédjen. Adatai titkosítva vannak és soha nem kerülnek harmadik félhez.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ügyvédi Költségek Nélkül
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Spórolja meg az első körös ügyvédi díjakat. Az első, legfontosabb
                    lépéseket tegye meg magabiztosan, drága jogi díjak nélkül.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Tökéletesen Megfogalmazott Válaszok
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A hatóságok a félelemre és a bizonytalanságra építenek.
                    Mi a tudásra és a stratégiára. Minden válasz, amit küldesz, egy ellentámadás.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Közösségi Tudás
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Nem kell egyedül harcolnia. Egy egész közösség tudása és több tucat
                    sikeresen megvívott ügy tapasztalata áll mögötte.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Azonnal Használható
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
      <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Hogyan működik?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Három egyszerű lépés a magabiztos válaszhoz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Ingyenes Regisztráció
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hozzon létre egy fiókot email címmel és jelszóval. Néhány másodperc az egész.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Válasszon Szolgáltatást
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Töltse ki az űrlapot vagy beszéljen az AI asszisztenssel a személyre szabott stratégiáért.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Generálás és Letöltés
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
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
                <Database className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Valós Csata Tapasztalata</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Győztes stratégiák valós esetekből
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Biztonságos és Diszkrét</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Adatai teljes védelemben
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Check className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">0 Ft</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Ügyvédi Díj az Első Lépéseknél</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Spóroljon az első körben
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Quote Section - New */}
      <section className="bg-blue-50 dark:bg-blue-900/20 py-16 sm:py-20 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="text-center">
            <p className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed">
              "A te gyermeked. A te döntésed. A mi stratégiánk."
            </p>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Ne hagyd, hogy a bürokrácia győzzön. Az ő legerősebb fegyverük a megfélemlítés.
              A miénk a tökéletesen megfogalmazott, tértivevényes levél.
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Kezdje el most azonnal
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            A regisztráció ingyenes és csak néhány másodpercet vesz igénybe.
            Nincs rejtett költség, nincs kötelezettség.
          </p>
          <button
            onClick={handleGetStarted}
            className="group px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Ingyenes Regisztráció</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <a
              href="/privacy-policy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              Adatvédelmi Nyilatkozat
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
