
import React from 'react';
import { ICONS } from '../constants';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div 
            className="hidden md:flex items-center cursor-pointer" 
            onClick={() => setView('home')}
          >
            <span className="text-2xl font-extrabold text-white tracking-tighter">
              DROPS<span className="text-emola-green">MOB</span>
            </span>
          </div>

          <div className="flex justify-around w-full md:w-auto md:space-x-8">
            <button 
              onClick={() => setView('home')}
              className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-2 transition-colors ${currentView === 'home' ? 'text-emola-green' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <ICONS.Home />
              <span className="text-xs md:text-sm font-medium">Início</span>
            </button>
            
            <button 
              onClick={() => setView('cart')}
              className={`relative flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-2 transition-colors ${currentView === 'cart' ? 'text-emola-green' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <ICONS.Cart />
              <span className="text-xs md:text-sm font-medium">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 md:static md:ml-1 bg-emola-green text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setView('admin')}
              className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-2 transition-colors ${currentView === 'admin' ? 'text-emola-green' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <ICONS.Settings />
              <span className="text-xs md:text-sm font-medium">Painel</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
