
import React, { useState } from 'react';
import { CartItem } from '../types';
import { EMOLA_NAME, EMOLA_NUMBER, STORE_PHONE } from '../constants';

interface CheckoutProps {
  items: CartItem[];
  onConfirm: (customerData: { name: string; phone: string; reference: string; address: string }) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reference: '',
    address: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(total);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.reference) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    onConfirm(formData);
  };

  return (
    <div className="px-4 pb-24 text-white">
      <h1 className="text-2xl font-black mb-6">Finalizar Compra</h1>
      
      <div className="bg-emola-green/10 border border-emola-green/30 rounded-3xl p-6 mb-8">
        <h2 className="font-black text-emola-green mb-4 flex items-center uppercase tracking-widest text-xs">
          <span className="mr-2 text-base">📲</span> Pagamento e-Mola
        </h2>
        <ol className="text-sm space-y-4 text-gray-300">
          <li>1. No telemóvel disque <strong>*898#</strong></li>
          <li>2. Selecione <strong>Transferir Dinheiro</strong></li>
          <li>3. Valor: <strong className="text-white">{formattedTotal}</strong></li>
          <div className="bg-black/50 p-5 rounded-2xl border border-emola-green/20 mt-2 text-center">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Número Destino</p>
            <p className="text-2xl font-black text-emola-green tracking-tighter">{EMOLA_NUMBER}</p>
            <p className="text-xs text-gray-400 font-medium mt-1">Titular: {EMOLA_NAME}</p>
          </div>
          <li className="text-xs italic">4. Insira a Referência gerada no formulário abaixo</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-[#111] p-6 rounded-3xl border border-gray-900 shadow-xl">
        <h3 className="font-black text-sm uppercase tracking-widest text-gray-500 mb-2">Dados do Cliente</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-600 uppercase mb-2 ml-1">Seu Nome</label>
            <input 
              type="text" 
              required
              className="w-full p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-emola-green outline-none transition-all placeholder-gray-800"
              placeholder="Ex: Pedro Matola"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-600 uppercase mb-2 ml-1">Seu e-Mola</label>
            <input 
              type="tel" 
              required
              className="w-full p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-emola-green outline-none transition-all placeholder-gray-800"
              placeholder="Ex: 86xxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-600 uppercase mb-2 ml-1">Referência e-Mola</label>
            <input 
              type="text" 
              required
              className="w-full p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-emola-green outline-none transition-all placeholder-gray-800"
              placeholder="Código do SMS de confirmação"
              value={formData.reference}
              onChange={(e) => setFormData({...formData, reference: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-600 uppercase mb-2 ml-1">Endereço</label>
            <textarea 
              className="w-full p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-emola-green outline-none transition-all placeholder-gray-800"
              placeholder="Onde entregar?"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-emola-green text-black py-5 rounded-2xl font-black text-lg mt-4 shadow-xl shadow-emola-green/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>Confirmar no WhatsApp</span>
        </button>
      </form>
    </div>
  );
};

export default Checkout;
