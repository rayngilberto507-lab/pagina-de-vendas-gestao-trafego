
import React, { useState, useEffect, useMemo } from 'react';
import { AppView, Category, Product, CartItem, Order } from './types';
import { INITIAL_PRODUCTS, ICONS, STORE_PHONE } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Persist cart to localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('dropsmob_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedOrders = localStorage.getItem('dropsmob_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('dropsmob_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dropsmob_orders', JSON.stringify(orders));
  }, [orders]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleBuyNow = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (!existing) {
      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
    setView('cart');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleFinalizeOrder = (customerData: { name: string; phone: string; reference: string; address: string }) => {
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderItemsString = cart.map(i => `${i.quantity}x ${i.name}`).join(' + ');
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      items: [...cart],
      total,
      customerName: customerData.name,
      emolaNumber: customerData.phone,
      reference: customerData.reference,
      status: 'Pendente',
      date: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Construct WhatsApp message
    const message = `Olá DropsMob 👋%0A%0A` +
      `Já efectuei o pagamento via e-Mola.%0A%0A` +
      `👤 *Nome:* ${customerData.name}%0A` +
      `📱 *Número e-Mola:* ${customerData.phone}%0A` +
      `💰 *Valor:* ${new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(total)}%0A` +
      `📋 *Pedido:* ${orderItemsString}%0A` +
      `🔑 *Referência:* ${customerData.reference}%0A` +
      `📍 *Endereço:* ${customerData.address || 'Não informado'}%0A%0A` +
      `Aguardando confirmação!`;

    setCart([]); // Clear cart
    window.open(`https://wa.me/${STORE_PHONE}?text=${message}`, '_blank');
    setView('home');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="pb-24">
            {/* Hero Section */}
            <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-8 mx-4">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
                alt="DropsMob Promo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8">
                <span className="text-emola-green font-extrabold text-xs uppercase tracking-widest mb-2">Moda & Tecnologia</span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-none mb-4">
                  O MELHOR DE <br/>MOÇAMBIQUE 🇲🇿
                </h2>
                <div className="flex space-x-2">
                   <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold">ENTREGA RÁPIDA</div>
                   <div className="bg-emola-green px-3 py-1 rounded-full text-white text-[10px] font-bold">PAGAMENTO E-MOLA</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="px-4 mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                  <ICONS.Search />
                </div>
                <input 
                  type="text" 
                  placeholder="Pesquisar camisetas, iPhones..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:border-emola-green transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex space-x-2 px-4 mb-8 overflow-x-auto no-scrollbar">
              {['Todos', ...Object.values(Category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-black text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-500 border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  Nenhum produto encontrado.
                </div>
              )}
            </div>
          </div>
        );
      case 'cart':
        return (
          <Cart 
            items={cart} 
            onUpdateQuantity={updateCartQuantity} 
            onRemove={removeFromCart}
            onCheckout={() => setView('checkout')}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            items={cart} 
            onConfirm={handleFinalizeOrder}
          />
        );
      case 'admin':
        return (
          <AdminPanel 
            products={products}
            orders={orders}
            onAddProduct={(p) => setProducts([...products, p])}
            onUpdateStatus={updateOrderStatus}
          />
        );
      default:
        return <div>View não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-20">
      <header className="bg-white md:fixed top-0 left-0 right-0 z-40 px-4 h-16 flex items-center justify-between md:shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-emola-green font-black">DM</div>
          <span className="text-xl font-black tracking-tighter">DROPS<span className="text-emola-green">MOB</span></span>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 p-2.5 rounded-full relative">
            <ICONS.Cart />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pt-6">
        {renderContent()}
      </main>

      <Navbar currentView={view} setView={setView} cartCount={cart.length} />

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${STORE_PHONE}?text=Olá DropsMob, gostaria de tirar uma dúvida.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-40"
      >
        <ICONS.WhatsApp />
      </a>
    </div>
  );
};

export default App;
