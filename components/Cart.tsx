import React from 'react';
import { CartItem, Product } from '../types';
import { ICONS } from '../constants';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formattedValue = (val: number) => new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN'
  }).format(val);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-white">
        <div className="bg-[#111] border border-gray-800 p-8 rounded-full mb-6 text-emola-green">
          <ICONS.Cart />
        </div>
        <h2 className="text-2xl font-black mb-2">Carrinho Vazio</h2>
        <p className="text-gray-500 text-center mb-8 max-w-xs">Escolha os melhores produtos em Moçambique no DropsMob.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-emola-green text-black px-10 py-4 rounded-2xl font-black shadow-lg shadow-emola-green/20 hover:scale-105 active:scale-95 transition-all"
        >
          Explorar Loja
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 text-white">
      <h1 className="text-2xl font-black mb-6 px-4">Meu Carrinho</h1>
      <div className="space-y-4 px-4">
        {items.map((item) => (
          <div key={item.id} className="flex bg-[#0a0a0a] p-3 rounded-2xl border border-gray-900 shadow-sm gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-black border border-gray-900">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                <button onClick={() => onRemove(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                  <ICONS.Trash />
                </button>
              </div>
              <p className="text-emola-green font-black text-sm mt-1">{formattedValue(item.price)}</p>
              <div className="flex items-center space-x-4 mt-3">
                <button 
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-lg border border-gray-800 bg-black flex items-center justify-center text-white active:bg-gray-900"
                >
                  <ICONS.Minus />
                </button>
                <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-lg border border-gray-800 bg-black flex items-center justify-center text-white active:bg-gray-900"
                >
                  <ICONS.Plus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 px-4 bg-[#0a0a0a] p-6 rounded-t-[2.5rem] border-t border-gray-900 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Subtotal</span>
          <span className="font-bold text-white">{formattedValue(total)}</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500 font-medium">Entrega</span>
          <span className="text-emola-green font-black text-[10px] uppercase tracking-widest bg-emola-green/10 px-2 py-1 rounded">Grátis</span>
        </div>
        <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-800">
          <span className="text-xl font-black">Total</span>
          <span className="text-2xl font-black text-emola-green">{formattedValue(total)}</span>
        </div>
        <button 
          onClick={onCheckout}
          className="w-full bg-emola-green text-black py-5 rounded-2xl font-black text-lg shadow-xl shadow-emola-green/30 hover:brightness-110 transition-all active:scale-95"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default Cart;