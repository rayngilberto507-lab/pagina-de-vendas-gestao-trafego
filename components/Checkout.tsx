
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
    <div className="px-4 pb-24">
      <h1 className="text-2xl font-extrabold mb-6">Pagamento e-Mola</h1>
      
      <div className="bg-emola-green/10 border-2 border-emola-green rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-emola-green mb-4 flex items-center">
          <span className="mr-2">📲</span> Instruções de Pagamento
        </h2>
        <ol className="text-sm space-y-4 text-gray-700">
          <li>1. Abra o seu menu e-Mola (<strong>*898#</strong>).</li>
          <li>2. Escolha a opção de <strong>Transferir Dinheiro</strong>.</li>
          <li>3. Envie o valor de <strong>{formattedTotal}</strong> para o número abaixo:</li>
          <div className="bg-white p-4 rounded-xl border border-emola-green/30 mt-2 text-center">
            <p className="text-xs text-gray-400 uppercase font-bold">Número e-Mola</p>
            <p className="text-xl font-extrabold tracking-widest">{EMOLA_NUMBER}</p>
            <p className="text-sm text-gray-600 font-medium mt-1">Nome: {EMOLA_NAME}</p>
          </div>
          <li>4. Guarde o número da <strong>Referência da Transação</strong>.</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4">Confirmação do Cliente</h3>
        
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Seu Nome Completo</label>
          <input 
            type="text" 
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors"
            placeholder="Ex: Alice Zavala"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Seu Número e-Mola</label>
          <input 
            type="tel" 
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors"
            placeholder="Ex: 86xxxxxxx"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Referência do Pagamento</label>
          <input 
            type="text" 
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors"
            placeholder="Código de confirmação do e-Mola"
            value={formData.reference}
            onChange={(e) => setFormData({...formData, reference: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Endereço de Entrega</label>
          <textarea 
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors"
            placeholder="Bairro, Rua, Casa nº, etc."
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-black text-white py-4 rounded-xl font-extrabold text-lg mt-4 shadow-lg active:scale-95 transition-all"
        >
          Confirmar no WhatsApp
        </button>
      </form>

      <div className="mt-8 bg-gray-100 p-4 rounded-xl">
        <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Prazos de Entrega</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-bold">Maputo & Matola</p>
            <p>Até 24 horas úteis</p>
          </div>
          <div>
            <p className="font-bold">Outras Províncias</p>
            <p>2 a 4 dias úteis via transportadora</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
