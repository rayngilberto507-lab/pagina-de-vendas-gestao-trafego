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
    <div className="bg-[#0a0a0a] rounded-2xl shadow-xl border border-gray-900 overflow-hidden hover:border-emola-green/30 transition-all flex flex-col h-full group">
      <div className="relative aspect-square overflow-hidden bg-black">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-emola-green text-black text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-lg shadow-emola-green/20">
            Destaque
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-white text-base mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 h-8 leading-relaxed">{product.description}</p>
        <div className="mt-auto">
          <p className="text-xl font-black text-emola-green mb-4">{formattedPrice}</p>
          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full py-2.5 px-4 border border-gray-800 text-gray-400 text-xs font-bold rounded-xl hover:bg-[#111] hover:text-white transition-all active:scale-95"
            >
              Adicionar ao Carrinho
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              className="w-full py-2.5 px-4 bg-emola-green text-black text-xs font-black rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emola-green/20"
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