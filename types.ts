
export enum Category {
  CAMISETAS = 'Camisetas',
  ELETRODOMESTICOS = 'Eletrodomésticos'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  emolaNumber: string;
  reference: string;
  status: 'Pendente' | 'Pago' | 'Em entrega' | 'Concluído';
  date: string;
}

export type AppView = 'home' | 'cart' | 'checkout' | 'admin' | 'account';
