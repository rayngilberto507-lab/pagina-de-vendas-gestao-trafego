
import React, { useState } from 'react';
import { Product, Order, Category } from '../types';
import { ICONS } from '../constants';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, orders, onAddProduct, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('orders');
  
  return (
    <div className="px-4 pb-24 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">Admin</h1>
        <div className="bg-[#111] p-1.5 rounded-2xl flex border border-gray-900">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'orders' ? 'bg-emola-green text-black shadow-lg' : 'text-gray-500'}`}
          >
            Pedidos
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'products' ? 'bg-emola-green text-black shadow-lg' : 'text-gray-500'}`}
          >
            Produtos
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-[#111] rounded-3xl border border-dashed border-gray-800">
              <p className="text-gray-600 font-bold">Nenhum pedido ainda.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-[#111] p-5 rounded-3xl border border-gray-900 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-black text-emola-green uppercase tracking-widest">#{order.id}</span>
                    <h3 className="font-black text-white">{order.customerName}</h3>
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase ${
                    order.status === 'Pago' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                    order.status === 'Em entrega' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                    order.status === 'Concluído' ? 'bg-gray-800 text-gray-400 border border-gray-700' :
                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-6 space-y-1">
                  <p className="line-clamp-2">📦 {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                  <p className="font-black text-emola-green mt-2 text-sm">Total: {new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(order.total)}</p>
                </div>
                <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
                  {['Pendente', 'Pago', 'Em entrega', 'Concluído'].map((status) => (
                    <button
                      key={status}
                      onClick={() => onUpdateStatus(order.id, status as Order['status'])}
                      className="whitespace-nowrap bg-black hover:border-emola-green text-[9px] font-black py-2.5 px-4 rounded-xl transition-all border border-gray-800 text-gray-500 hover:text-white"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#111] p-6 rounded-3xl border border-gray-900 shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-widest text-gray-500 mb-4">Novo Produto</h3>
            <div className="grid grid-cols-1 gap-4">
               <input type="text" placeholder="Nome" className="w-full p-4 rounded-xl border border-gray-800 bg-black text-sm outline-none focus:border-emola-green" />
               <input type="number" placeholder="Preço" className="w-full p-4 rounded-xl border border-gray-800 bg-black text-sm outline-none focus:border-emola-green" />
               <button className="w-full bg-emola-green text-black py-4 rounded-xl font-black text-sm shadow-lg shadow-emola-green/10">Adicionar</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center space-x-4 bg-[#111] p-3 rounded-2xl border border-gray-900">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-gray-800" />
                <div className="flex-grow">
                  <h4 className="font-black text-xs text-white">{p.name}</h4>
                  <p className="text-[10px] text-emola-green font-bold">{new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(p.price)}</p>
                </div>
                <button className="text-gray-700 hover:text-red-500 p-2 transition-colors">
                  <ICONS.Trash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
