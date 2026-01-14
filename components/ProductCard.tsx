
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const formattedPrice = new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN'
  }).format(product.price);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Destaque
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 h-8">{product.description}</p>
        <div className="mt-auto">
          <p className="text-lg font-extrabold text-black mb-4">{formattedPrice}</p>
          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full py-2 px-4 border border-black text-black text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Adicionar ao Carrinho
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              className="w-full py-2 px-4 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
