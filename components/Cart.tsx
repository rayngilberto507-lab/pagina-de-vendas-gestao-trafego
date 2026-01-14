
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
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ICONS.Cart />
        </div>
        <h2 className="text-xl font-bold mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 text-center mb-8">Parece que você ainda não adicionou nenhum produto incrível.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-black text-white px-8 py-3 rounded-xl font-bold"
        >
          Explorar Loja
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <h1 className="text-2xl font-extrabold mb-6 px-4">Meu Carrinho</h1>
      <div className="space-y-4 px-4">
        {items.map((item) => (
          <div key={item.id} className="flex bg-white p-3 rounded-xl border border-gray-100 shadow-sm gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                  <ICONS.Trash />
                </button>
              </div>
              <p className="text-emola-green font-bold text-sm mt-1">{formattedValue(item.price)}</p>
              <div className="flex items-center space-x-3 mt-2">
                <button 
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
                >
                  <ICONS.Minus />
                </button>
                <span className="font-bold text-sm">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
                >
                  <ICONS.Plus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 px-4 bg-white p-6 rounded-t-3xl border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Subtotal</span>
          <span className="font-bold">{formattedValue(total)}</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500 font-medium">Entrega (Maputo)</span>
          <span className="text-emola-green font-bold text-xs uppercase">Grátis</span>
        </div>
        <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-100">
          <span className="text-xl font-extrabold">Total</span>
          <span className="text-xl font-extrabold text-black">{formattedValue(total)}</span>
        </div>
        <button 
          onClick={onCheckout}
          className="w-full bg-black text-white py-4 rounded-2xl font-extrabold text-lg shadow-lg hover:bg-gray-900 transition-transform active:scale-95"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default Cart;
