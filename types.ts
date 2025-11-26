export type Category = 'ecommerce' | 'news' | 'graphic' | 'web';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  sold: number;
  description: string;
  category: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'graphic' | 'web';
  subCategory: string; // e.g., 'logo', 'flyer', 'ui/ux'
  image: string;
  description: string;
}

export interface UserProfile {
  name: string;
  title: string;
  company: string;
  experienceYearsWeb: number;
  experienceYearsGraphic: number;
  university: string;
  skills: string[];
  graphicSkills: string[];
  phone: string;
  email: string;
  social: {
    facebook: string;
    linkedin: string;
    behance: string;
    dribbble: string;
    github: string;
  };
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped';
}

export interface DataContextType {
  products: Product[];
  news: NewsArticle[];
  portfolio: PortfolioItem[];
  cart: CartItem[];
  messages: Message[];
  orders: Order[];
  
  addProduct: (item: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, item: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addNews: (item: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, item: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;
  
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolio: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => void;

  addMessage: (msg: Omit<Message, 'id' | 'date'>) => void;
  deleteMessage: (id: string) => void;
}