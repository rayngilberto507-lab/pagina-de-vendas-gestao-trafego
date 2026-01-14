
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
    <div className="px-4 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold">Painel Admin</h1>
        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            Pedidos
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'products' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            Produtos
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed">
              <p className="text-gray-400">Nenhum pedido registrado ainda.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">#{order.id}</span>
                    <h3 className="font-bold">{order.customerName}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    order.status === 'Pago' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Em entrega' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Concluído' ? 'bg-gray-100 text-gray-600' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Itens: {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                  <p className="font-bold text-black mt-1">Total: {new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(order.total)}</p>
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {['Pendente', 'Pago', 'Em entrega', 'Concluído'].map((status) => (
                    <button
                      key={status}
                      onClick={() => onUpdateStatus(order.id, status as Order['status'])}
                      className="whitespace-nowrap bg-gray-50 hover:bg-gray-100 text-[10px] font-bold py-2 px-3 rounded-lg transition-colors border border-gray-200"
                    >
                      Mudar para {status}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4">Novo Produto (Rápido)</h3>
            <div className="grid grid-cols-1 gap-4">
               <input type="text" placeholder="Nome do Produto" className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm" />
               <input type="number" placeholder="Preço (MZN)" className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm" />
               <button className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm">Adicionar Produto</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {products.map(p => (
              <div key={p.id} className="flex items-center space-x-4 bg-white p-3 rounded-xl border border-gray-100">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h4 className="font-bold text-sm">{p.name}</h4>
                  <p className="text-xs text-gray-500">{new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(p.price)}</p>
                </div>
                <button className="text-gray-400 hover:text-red-500">
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
