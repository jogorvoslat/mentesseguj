import React from 'react';
import { stripeProducts } from '../stripe-config';
import { ProductCard } from '../components/stripe/ProductCard';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export function PricingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mentességi Szolgáltatások
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Válassza ki az Önnek megfelelő mentességi szolgáltatást. 
            Szakértő csapatunk segít az oltási mentesség megszerzésében.
          </p>
        </div>

        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800 text-center">
              A vásárláshoz{' '}
              <Link to="/login" className="font-medium underline hover:text-blue-600">
                jelentkezzen be
              </Link>
              {' '}vagy{' '}
              <Link to="/signup" className="font-medium underline hover:text-blue-600">
                regisztráljon
              </Link>
              .
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <ProductCard key={product.priceId} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Miért válasszon minket?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Jogi Szakértelem</h3>
              <p className="text-gray-600">
                Tapasztalt jogászok és egészségügyi szakértők segítségével.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teljes Körű Szolgáltatás</h3>
              <p className="text-gray-600">
                A dokumentumok elkészítésétől a benyújtásig mindent elvégzünk.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Személyes Támogatás</h3>
              <p className="text-gray-600">
                Végig támogatjuk Önt a mentességi folyamat során.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}