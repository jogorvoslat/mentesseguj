import React from 'react';
import { StripeProduct, formatPrice } from '../../stripe-config';
import { CheckoutButton } from './CheckoutButton';
import { Check } from 'lucide-react';

interface ProductCardProps {
  product: StripeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-indigo-600">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.mode === 'subscription' && (
            <span className="text-gray-500 ml-2">/hó</span>
          )}
        </div>
        <p className="text-gray-600 mb-8">{product.description}</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Teljes körű mentességi szolgáltatás</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Szakértői támogatás</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Dokumentum készítés</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Jogi tanácsadás</span>
          </div>
        </div>

        <CheckoutButton
          priceId={product.priceId}
          mode={product.mode}
          className="w-full"
        >
          {product.mode === 'payment' ? 'Megvásárlás' : 'Előfizetés'}
        </CheckoutButton>
      </div>
    </div>
  );
}