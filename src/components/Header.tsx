@@ .. @@
 import React from 'react';
-import { Shield } from 'lucide-react';
+import { Shield, LogOut, User } from 'lucide-react';
+import { Link } from 'react-router-dom';
+import { useAuth } from '../hooks/useAuth';
 
 export function Header() {
+  const { user, signOut } = useAuth();
+
   return (
     <header className="bg-white shadow-sm border-b border-gray-200">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16">
-          <div className="flex items-center">
+          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
             <Shield className="h-8 w-8 text-indigo-600" />
             <span className="ml-2 text-xl font-bold text-gray-900">Mentességi Alkalmazás</span>
-          </div>
+          </Link>
           
           <nav className="flex items-center space-x-8">
-            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Főoldal</a>
-            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Szolgáltatások</a>
-            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Kapcsolat</a>
+            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Főoldal</Link>
+            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium">Szolgáltatások</Link>
+            
+            {user ? (
+              <div className="flex items-center space-x-4">
+                <div className="flex items-center text-gray-700">
+                  <User className="h-4 w-4 mr-1" />
+                  <span className="text-sm">{user.email}</span>
+                </div>
+                <button
+                  onClick={signOut}
+                  className="flex items-center text-gray-700 hover:text-indigo-600 font-medium"
+                >
+                  <LogOut className="h-4 w-4 mr-1" />
+                  Kijelentkezés
+                </button>
+              </div>
+            ) : (
+              <div className="flex items-center space-x-4">
+                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
+                  Bejelentkezés
+                </Link>
+                <Link
+                  to="/signup"
+                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium"
+                >
+                  Regisztráció
+                </Link>
+              </div>
+            )}
           </nav>
         </div>
       </div>