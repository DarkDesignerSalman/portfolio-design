
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, ShoppingCart, User, 
  Facebook, Linkedin, Dribbble, Github, Mail, Phone,
  ChevronDown, Trash2, Plus, Monitor, PenTool, Edit, Eye, ArrowRight,
  Layout, Grid, CreditCard, CheckCircle, List, Package, Upload, Code,
  LogOut, Lock, Calendar, Home as HomeIcon
} from './components/Icons';

import { 
  USER_PROFILE, INITIAL_PRODUCTS, INITIAL_NEWS, INITIAL_PORTFOLIO,
  PRODUCT_CATEGORIES, NEWS_CATEGORIES, GRAPHIC_SUB_CATEGORIES, WEB_SUB_CATEGORIES 
} from './constants';
import { Product, NewsArticle, PortfolioItem, DataContextType, CartItem, Message, Order } from './types';
import { Widgets } from './components/Widgets';
import { DashboardCharts } from './components/AdminCharts';

// --- Helpers ---
const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

// --- Context ---
const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or fall back to Constants
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dd_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('dd_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('dd_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dd_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('dd_messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dd_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Effects
  useEffect(() => { localStorage.setItem('dd_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('dd_news', JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem('dd_portfolio', JSON.stringify(portfolio)); }, [portfolio]);
  useEffect(() => { localStorage.setItem('dd_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('dd_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('dd_orders', JSON.stringify(orders)); }, [orders]);

  const addProduct = (item: Omit<Product, 'id'>) => setProducts([...products, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  const updateProduct = (id: string, item: Partial<Product>) => setProducts(products.map(p => p.id === id ? { ...p, ...item } : p));
  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

  const addNews = (item: Omit<NewsArticle, 'id'>) => setNews([...news, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  const updateNews = (id: string, item: Partial<NewsArticle>) => setNews(news.map(n => n.id === id ? { ...n, ...item } : n));
  const deleteNews = (id: string) => setNews(news.filter(n => n.id !== id));

  const addPortfolio = (item: Omit<PortfolioItem, 'id'>) => setPortfolio([...portfolio, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  const updatePortfolio = (id: string, item: Partial<PortfolioItem>) => setPortfolio(portfolio.map(p => p.id === id ? { ...p, ...item } : p));
  const deletePortfolio = (id: string) => setPortfolio(portfolio.filter(p => p.id !== id));

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));
  const clearCart = () => setCart([]);
  
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const addMessage = (msg: Omit<Message, 'id' | 'date'>) => {
    setMessages(prev => [...prev, { ...msg, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() }]);
  };

  const deleteMessage = (id: string) => setMessages(prev => prev.filter(m => m.id !== id));

  return (
    <DataContext.Provider value={{ 
      products, news, portfolio, cart, messages, orders,
      addProduct, updateProduct, deleteProduct,
      addNews, updateNews, deleteNews,
      addPortfolio, updatePortfolio, deletePortfolio,
      addToCart, removeFromCart, clearCart, placeOrder,
      addMessage, deleteMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};

// --- Modal Component ---
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; title?: string }> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-paper rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-scale-up border border-white/20">
        <div className="sticky top-0 bg-white/95 dark:bg-paper/95 backdrop-blur p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">{title || 'Details'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Layout Components ---

const Sidebar: React.FC<{ isOpen: boolean; setIsOpen: (v: boolean) => void }> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { cart } = useData();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Home', path: '/', icon: <List size={20} /> },
    { name: 'Apps', path: '/apps', icon: <Grid size={20} /> },
    { name: 'Creative', path: '/creative', icon: <PenTool size={20} /> },
    { name: 'About', path: '/about', icon: <User size={20} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-darker shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-gray-200 dark:border-gray-800 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">D</div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 font-sans tracking-tight">DarkDesigner</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path 
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
              }`}
            >
              <span className={`${location.pathname === item.path ? 'text-white' : 'group-hover:text-primary transition-colors'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}

          <Link
            to="/apps"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mt-4"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart size={20} />
              <span className="font-medium">Cart</span>
            </div>
            {totalCartItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-bounce">
                {totalCartItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Lock size={18} />
            <span className="font-medium text-sm">Admin Panel</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

// --- Pages ---

const Home: React.FC = () => {
  const { portfolio } = useData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>

      {/* Hero Section */}
      <div className="relative z-10 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-bold tracking-wide uppercase">
              Welcome to my world
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Digital</span> <br/>
              Experiences
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              I'm <span className="font-bold text-gray-900 dark:text-white">{USER_PROFILE.name}</span>, a Software Engineer & Graphic Designer bridging the gap between functional code and beautiful design.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => navigate('/creative')} className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                View Portfolio <ArrowRight size={20}/>
              </button>
              <button onClick={() => navigate('/contact')} className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:border-primary hover:text-primary transition-all duration-300">
                Contact Me
              </button>
            </div>
            
            {/* Social Links Mini */}
            <div className="flex gap-4 pt-4">
              {Object.entries(USER_PROFILE.social).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                  {platform === 'facebook' && <Facebook size={24}/>}
                  {platform === 'linkedin' && <Linkedin size={24}/>}
                  {platform === 'github' && <Github size={24}/>}
                  {platform === 'dribbble' && <Dribbble size={24}/>}
                  {platform === 'behance' && <Layout size={24}/>}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2rem] rotate-6 opacity-20 blur-lg"></div>
              <img 
                src="https://placehold.co/600x600/1e293b/ffffff?text=Profile+Image" 
                alt="Profile" 
                className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white dark:border-gray-800 z-10 hover:rotate-2 transition-transform duration-500"
              />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-paper p-4 rounded-xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600"><Code size={24}/></div>
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-bold">{USER_PROFILE.experienceYearsWeb}+ Years</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white dark:bg-paper p-4 rounded-xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><PenTool size={24}/></div>
                  <div>
                    <p className="text-xs text-gray-500">Design</p>
                    <p className="font-bold">Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
        <div onClick={() => navigate('/apps')} className="bg-white dark:bg-paper p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <ShoppingCart size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">E-Commerce</h3>
          <p className="text-gray-500 text-sm">Browse exclusive products & gadgets.</p>
        </div>
        
        <div onClick={() => navigate('/apps')} className="bg-white dark:bg-paper p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
            <List size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">News Portal</h3>
          <p className="text-gray-500 text-sm">Stay updated with latest tech news.</p>
        </div>

        <div onClick={() => navigate('/creative')} className="bg-white dark:bg-paper p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
            <PenTool size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Graphic Design</h3>
          <p className="text-gray-500 text-sm">Logos, banners, flyers & more.</p>
        </div>

        <div onClick={() => navigate('/creative')} className="bg-white dark:bg-paper p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
            <Monitor size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Web Design</h3>
          <p className="text-gray-500 text-sm">UI/UX, Dashboards & Web Apps.</p>
        </div>
      </div>

      {/* Widgets Section */}
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Live Dashboard</h2>
        <Widgets />
      </div>
    </div>
  );
};

const Apps: React.FC = () => {
  const { products, news, addToCart, cart, removeFromCart } = useData();
  const [activeTab, setActiveTab] = useState<'ecommerce' | 'news'>('ecommerce');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Checkout State
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    address: '',
    phone: '',
    payment: 'cod'
  });
  const { placeOrder } = useData();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({
      customerName: orderForm.name,
      address: orderForm.address,
      phone: orderForm.phone,
      paymentMethod: orderForm.payment,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });
    setCheckoutOpen(false);
    setCartOpen(false);
    setOrderForm({ name: '', address: '', phone: '', payment: 'cod' });
    alert("Order Placed Successfully!");
  };

  const productCategories = ['All', ...PRODUCT_CATEGORIES];
  const filteredProducts = categoryFilter === 'All' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  return (
    <div className="min-h-screen">
      {/* Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="bg-white dark:bg-paper rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-800 inline-flex">
          <button 
            onClick={() => setActiveTab('ecommerce')}
            className={`px-8 py-3 rounded-xl transition-all font-bold flex items-center gap-2 ${activeTab === 'ecommerce' ? 'bg-primary text-white shadow-lg' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <ShoppingCart size={18}/> E-commerce
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`px-8 py-3 rounded-xl transition-all font-bold flex items-center gap-2 ${activeTab === 'news' ? 'bg-green-500 text-white shadow-lg' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <List size={18}/> News Portal
          </button>
        </div>
      </div>

      {activeTab === 'ecommerce' ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0 space-y-4">
            <div className="bg-white dark:bg-paper p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold mb-4 flex items-center gap-2"><List size={18}/> Categories</h3>
              <ul className="space-y-1">
                {productCategories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setCategoryFilter(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${categoryFilter === cat ? 'bg-primary text-white font-bold shadow-md' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => setCartOpen(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart /> Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white dark:bg-paper rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col group overflow-hidden">
                  <div className="relative aspect-square overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white border-2 border-white px-6 py-2 rounded-full font-bold">Quick View</span>
                    </div>
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-2">
                       <span className="text-yellow-400 text-sm">★</span>
                       <span className="text-sm font-bold">{product.rating}</span>
                       <span className="text-xs text-gray-400">({product.sold} sold)</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 truncate group-hover:text-primary transition-colors" onClick={() => setSelectedProduct(product)}>{product.title}</h3>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">৳{product.price}</span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-3 rounded-xl transition-all duration-300"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* News Section */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, idx) => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className={`bg-white dark:bg-paper rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden group ${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden ${idx === 0 ? 'h-64 md:h-96' : 'h-48'}`}>
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={14}/>
                  <span>{article.date}</span>
                </div>
                <h3 className={`${idx === 0 ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-3 group-hover:text-primary transition-colors leading-tight`}>{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{article.summary}</p>
                <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm">
                  Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>
            </div>
          ))}
          
          {/* Side Widget for News */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Newsletter</h3>
            <p className="opacity-80 mb-6">Get the latest tech and design news delivered to your inbox.</p>
            <input type="email" placeholder="Your Email" className="w-full bg-white/10 border border-white/20 rounded-xl p-3 mb-4 text-white placeholder-white/50 focus:outline-none focus:border-primary" />
            <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors">Subscribe</button>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.title}>
        {selectedProduct && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full rounded-2xl shadow-lg bg-gray-50" />
            </div>
            <div className="md:w-1/2 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">{selectedProduct.category}</span>
                <div className="flex items-center text-yellow-500 gap-1 text-sm font-bold">★ {selectedProduct.rating}</div>
              </div>
              <h2 className="text-3xl font-bold mb-4">{selectedProduct.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">{selectedProduct.description}</p>
              
              <div className="mt-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Price</p>
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">৳{selectedProduct.price}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }} className="px-6 py-4 rounded-xl font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                    Add to Cart
                  </button>
                  <button onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); setCartOpen(true); }} className="px-6 py-4 rounded-xl font-bold bg-primary text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* News Modal */}
      <Modal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)} title="Article View">
        {selectedArticle && (
           <article>
             <div className="h-64 md:h-80 w-full overflow-hidden rounded-2xl mb-8 relative">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{selectedArticle.title}</h1>
                </div>
             </div>
             <div className="flex items-center gap-6 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
               <span className="flex items-center gap-2 text-primary font-bold"><List size={18}/> {selectedArticle.category}</span>
               <span className="flex items-center gap-2 text-gray-500"><Calendar size={18}/> {selectedArticle.date}</span>
             </div>
             <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-gray-600 dark:text-gray-300">
               {selectedArticle.summary}
               <p className="mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac odio ten.</p>
             </div>
           </article>
        )}
      </Modal>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-paper h-full shadow-2xl flex flex-col animate-slide-in-right border-l border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
              <h2 className="text-2xl font-bold flex items-center gap-2"><ShoppingCart /> Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"><X/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-50 flex flex-col items-center">
                  <Package size={64} className="mb-4" />
                  <p className="text-xl font-bold">Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold line-clamp-1 mb-1">{item.title}</h4>
                      <p className="text-primary font-bold">৳{item.price}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <span className="font-bold text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{item.quantity}</span>
                       <button 
                         onClick={() => removeFromCart(item.id)}
                         className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors"
                         title="Remove Item"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 bg-white dark:bg-paper border-t border-gray-100 dark:border-gray-700 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total</span>
                  <span className="text-primary">৳{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                </div>
                <button 
                  onClick={() => {
                    setCheckoutOpen(true);
                    setCartOpen(false); // Close cart so modal is visible
                  }}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:scale-[1.02] transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <Modal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} title="Secure Checkout">
        <form onSubmit={handleCheckoutSubmit} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2"><User size={18}/> Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <input required type="text" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-500">Phone Number</label>
                 <input required type="tel" value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})} className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Delivery Address</label>
              <textarea required value={orderForm.address} onChange={e => setOrderForm({...orderForm, address: e.target.value})} className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all h-24"></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2"><CreditCard size={18}/> Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${orderForm.payment === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                <input type="radio" name="payment" value="cod" checked={orderForm.payment === 'cod'} onChange={() => setOrderForm({...orderForm, payment: 'cod'})} className="hidden" />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${orderForm.payment === 'cod' ? 'border-primary' : 'border-gray-400'}`}>
                   {orderForm.payment === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                </div>
                <div className="flex-1">
                   <div className="font-bold">Cash on Delivery</div>
                   <div className="text-xs text-gray-500">Pay when you receive</div>
                </div>
                <Package className={orderForm.payment === 'cod' ? 'text-primary' : 'text-gray-400'} />
              </label>
              <label className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${orderForm.payment === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                <input type="radio" name="payment" value="card" checked={orderForm.payment === 'card'} onChange={() => setOrderForm({...orderForm, payment: 'card'})} className="hidden" />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${orderForm.payment === 'card' ? 'border-primary' : 'border-gray-400'}`}>
                   {orderForm.payment === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                </div>
                <div className="flex-1">
                   <div className="font-bold">Card Payment</div>
                   <div className="text-xs text-gray-500">Credit or Debit Card</div>
                </div>
                <CreditCard className={orderForm.payment === 'card' ? 'text-primary' : 'text-gray-400'} />
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.01]">
            Confirm Order - ৳{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </button>
        </form>
      </Modal>
    </div>
  );
};

const Creative: React.FC = () => {
  const { portfolio } = useData();
  const [category, setCategory] = useState<'graphic' | 'web'>('graphic');
  const [subFilter, setSubFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const graphicSub = ['All', ...GRAPHIC_SUB_CATEGORIES];
  const webSub = ['All', ...WEB_SUB_CATEGORIES];

  const currentSubCategories = category === 'graphic' ? graphicSub : webSub;
  
  const filteredItems = portfolio.filter(item => {
    if (item.category !== category) return false;
    if (subFilter !== 'All' && item.subCategory !== subFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black mb-2">My <span className="text-primary">Creative</span> Space</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Explore my latest works in graphic design and web development. Each project represents a unique challenge and solution.</p>
        
        <div className="flex justify-center gap-6 mt-8">
           <button onClick={() => {setCategory('graphic'); setSubFilter('All')}} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border-2 ${category === 'graphic' ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600' : 'border-transparent bg-white dark:bg-paper shadow-md hover:shadow-lg'}`}>
             <PenTool size={22}/> Graphic Design
           </button>
           <button onClick={() => {setCategory('web'); setSubFilter('All')}} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border-2 ${category === 'web' ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'border-transparent bg-white dark:bg-paper shadow-md hover:shadow-lg'}`}>
             <Monitor size={22}/> Web Design
           </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-4xl mx-auto">
          {currentSubCategories.map(sub => (
            <button
              key={sub}
              onClick={() => setSubFilter(sub)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${subFilter === sub ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md transform scale-105' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} onClick={() => setSelectedItem(item)} className="group bg-white dark:bg-paper rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-800">
            <div className="relative overflow-hidden aspect-[4/3]">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                 <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-1">{item.subCategory}</p>
                 <h3 className="text-white text-2xl font-bold">{item.title}</h3>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="font-bold text-gray-700 dark:text-gray-300">{item.title}</span>
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowRight size={16}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.title}>
        {selectedItem && (
          <div className="space-y-8">
            <img src={selectedItem.image} alt={selectedItem.title} className="w-full rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700" />
            <div>
               <div className="flex items-center gap-4 mb-6">
                 <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide text-white ${selectedItem.category === 'graphic' ? 'bg-purple-600' : 'bg-orange-600'}`}>
                   {selectedItem.category === 'graphic' ? 'Graphic Design' : 'Web Design'}
                 </span>
                 <span className="bg-gray-100 dark:bg-gray-700 px-4 py-1.5 rounded-full text-sm font-bold">{selectedItem.subCategory}</span>
               </div>
               <h3 className="text-xl font-bold mb-3">Project Description</h3>
               <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{selectedItem.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto bg-white dark:bg-paper rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="h-80 relative">
           <img 
            src="https://placehold.co/1200x400/1e293b/ffffff?text=Banner+Image" 
            alt="Banner" 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/40"></div>
           <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 p-2 bg-white dark:bg-paper rounded-full shadow-xl z-10">
             <img src="https://placehold.co/300x300/1e293b/ffffff?text=Profile" alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700" />
           </div>
        </div>
        
        <div className="pt-24 px-8 md:px-16 pb-16 text-center">
           <h1 className="text-4xl font-bold mb-2">{USER_PROFILE.name}</h1>
           <p className="text-xl text-primary font-medium mb-8">{USER_PROFILE.title} @ {USER_PROFILE.company}</p>
           
           <div className="prose dark:prose-invert max-w-3xl mx-auto mb-12 text-lg text-gray-600 dark:text-gray-300">
             <p>
               Hello! I am a passionate software engineer and graphic designer with over <span className="font-bold text-gray-900 dark:text-white">{USER_PROFILE.experienceYearsWeb} years</span> of experience in web development and <span className="font-bold text-gray-900 dark:text-white">{USER_PROFILE.experienceYearsGraphic} years</span> in graphic design. 
             </p>
             <p>
               My journey began at <span className="font-bold text-gray-900 dark:text-white">{USER_PROFILE.university}</span>, where I honed my technical skills. Currently, I am delivering high-quality solutions at {USER_PROFILE.company}.
             </p>
           </div>

           {/* Skills Section - Stacked Vertically */}
           <div className="flex flex-col gap-10 text-left">
             <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl">
               <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-blue-700 dark:text-blue-400"><Code size={24}/> Technical Skills</h3>
               <div className="flex flex-wrap gap-2">
                 {USER_PROFILE.skills.map(skill => (
                   <span key={skill} className="px-4 py-2 bg-white dark:bg-paper shadow-sm rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200">{skill}</span>
                 ))}
               </div>
             </div>
             
             <div className="bg-purple-50 dark:bg-purple-900/10 p-8 rounded-2xl">
               <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-purple-700 dark:text-purple-400"><PenTool size={24}/> Design Skills</h3>
               <div className="flex flex-wrap gap-2">
                 {USER_PROFILE.graphicSkills.map(skill => (
                   <span key={skill} className="px-4 py-2 bg-white dark:bg-paper shadow-sm rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200">{skill}</span>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const { addMessage } = useData();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Have a project in mind or just want to say hello? I'd love to hear from you. Fill out the form below.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-paper p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
               <h3 className="font-bold text-xl mb-6">Contact Info</h3>
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary"><Phone size={20}/></div>
                   <div>
                     <p className="text-sm text-gray-500">Phone</p>
                     <p className="font-bold">{USER_PROFILE.phone}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Mail size={20}/></div>
                   <div>
                     <p className="text-sm text-gray-500">Email</p>
                     <p className="font-bold break-all">{USER_PROFILE.email}</p>
                   </div>
                 </div>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                 <h4 className="font-bold mb-4">Social Profiles</h4>
                 <div className="flex gap-3">
                   <a href={USER_PROFILE.social.facebook} target="_blank" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"><Facebook size={18}/></a>
                   <a href={USER_PROFILE.social.linkedin} target="_blank" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"><Linkedin size={18}/></a>
                   <a href={USER_PROFILE.social.dribbble} target="_blank" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"><Dribbble size={18}/></a>
                   <a href={USER_PROFILE.social.github} target="_blank" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"><Github size={18}/></a>
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-paper p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Your Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 ml-1">Subject</label>
                <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors" placeholder="Project Inquiry" />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2 ml-1">Message</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors h-40" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin ---

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      alert('Invalid credentials! (Try: admin / admin123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darker p-4">
      <div className="bg-white dark:bg-paper p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-500">Secure area for management</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 focus:border-primary outline-none" placeholder="admin" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 focus:border-primary outline-none" placeholder="admin123" />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors">Login</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-primary hover:underline font-bold flex items-center justify-center gap-1">
             <ArrowRight size={14} className="rotate-180"/> Back to Home
          </Link>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Demo Credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { 
    products, addProduct, updateProduct, deleteProduct,
    news, addNews, updateNews, deleteNews,
    portfolio, addPortfolio, updatePortfolio, deletePortfolio,
    messages, orders, deleteMessage
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'news' | 'portfolio' | 'messages'>('dashboard');
  const [editItem, setEditItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<'product' | 'news' | 'portfolio'>('product');
  const [formData, setFormData] = useState<any>({});

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;

  const handleOpenAdd = (type: 'product' | 'news' | 'portfolio') => {
    setFormType(type);
    setEditItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (type: 'product' | 'news' | 'portfolio', item: any) => {
    setFormType(type);
    setEditItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertBase64(file);
        setFormData({ ...formData, image: base64 });
      } catch (error) {
        console.error("Error converting file to base64", error);
        alert("Error uploading image");
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'product') {
      const productData = {
        ...formData,
        price: Number(formData.price) || 0,
        rating: formData.rating || 4.5,
        sold: formData.sold || 0,
        category: formData.category || PRODUCT_CATEGORIES[0], 
        image: formData.image || 'https://placehold.co/400x400/1e293b/ffffff?text=Product',
        description: formData.description || 'No description provided.'
      };

      if (editItem) updateProduct(editItem.id, productData);
      else addProduct(productData);
    } else if (formType === 'news') {
      const newsData = {
        ...formData,
        date: formData.date || new Date().toISOString().split('T')[0],
        image: formData.image || 'https://placehold.co/600x400/1e293b/ffffff?text=News',
        category: formData.category || NEWS_CATEGORIES[0]
      };
      if (editItem) updateNews(editItem.id, newsData);
      else addNews(newsData);
    } else if (formType === 'portfolio') {
      // Ensure we have valid defaults if nothing selected
      const cat = formData.category || 'graphic';
      const defaultSub = cat === 'graphic' ? GRAPHIC_SUB_CATEGORIES[0] : WEB_SUB_CATEGORIES[0];
      
      const portfolioData = {
         ...formData,
         category: cat,
         image: formData.image || 'https://placehold.co/600x400/1e293b/ffffff?text=Project',
         subCategory: formData.subCategory || defaultSub
      };
      if (editItem) updatePortfolio(editItem.id, portfolioData);
      else addPortfolio(portfolioData);
    }
    setIsModalOpen(false);
  };

  const RenderTable = ({ columns, data, onDelete, onEdit }: any) => (
    <div className="overflow-x-auto bg-white dark:bg-paper rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((col: any) => <th key={col.key} className="p-4 font-bold text-sm text-gray-600 dark:text-gray-300">{col.label}</th>)}
            <th className="p-4 text-right font-bold text-sm text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              {columns.map((col: any) => (
                 <td key={col.key} className="p-4 text-sm align-middle">
                   {col.render ? col.render(item[col.key], item) : item[col.key]}
                 </td>
              ))}
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(item)} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 p-2 rounded transition-colors"><Edit size={16}/></button>
                  <button onClick={() => onDelete(item.id)} className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 p-2 rounded transition-colors"><Trash2 size={16}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-darker">
      {/* Admin Sidebar */}
      <div className="w-64 bg-white dark:bg-paper border-r border-gray-200 dark:border-gray-700 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Grid },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'products', label: 'E-commerce', icon: ShoppingCart },
            { id: 'news', label: 'News', icon: List },
            { id: 'portfolio', label: 'Portfolio', icon: Upload },
            { id: 'messages', label: 'Messages', icon: Mail },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-blue-500/30' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <HomeIcon size={20} /> Back to Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Admin Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                 <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
                   <h3 className="text-sm font-bold opacity-80 uppercase tracking-wide">Total Revenue</h3>
                   <p className="text-3xl font-bold mt-2">৳{orders.reduce((sum, o) => sum + o.total, 0)}</p>
                 </div>
                 <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                   <h3 className="text-sm font-bold opacity-80 uppercase tracking-wide">Total Orders</h3>
                   <p className="text-3xl font-bold mt-2">{orders.length}</p>
                 </div>
                 <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                   <h3 className="text-sm font-bold opacity-80 uppercase tracking-wide">Products</h3>
                   <p className="text-3xl font-bold mt-2">{products.length}</p>
                 </div>
                 <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
                   <h3 className="text-sm font-bold opacity-80 uppercase tracking-wide">Messages</h3>
                   <p className="text-3xl font-bold mt-2">{messages.length}</p>
                 </div>
              </div>
              <DashboardCharts />
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold mb-8">Order Management</h1>
              <RenderTable 
                 columns={[
                    { key: 'id', label: 'Order ID' },
                    { key: 'customerName', label: 'Customer' },
                    { key: 'total', label: 'Total', render: (val: number) => <span className="font-bold text-green-600">৳{val}</span> },
                    { key: 'paymentMethod', label: 'Payment', render: (val: string) => <span className="uppercase text-xs font-bold px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">{val}</span> },
                    { key: 'status', label: 'Status', render: (val: string) => <span className={`uppercase text-xs font-bold px-2 py-1 rounded ${val === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{val}</span> }
                 ]}
                 data={orders}
                 onDelete={() => {}} // Placeholder for delete order
                 onEdit={() => {}}   // Placeholder for edit order
              />
            </div>
          )}

          {activeTab === 'products' && (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <button onClick={() => handleOpenAdd('product')} className="bg-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all"><Plus size={20}/> Add Product</button>
              </div>
              <RenderTable 
                columns={[
                  { key: 'image', label: 'Image', render: (src: string) => <img src={src} className="w-12 h-12 rounded-lg object-cover border border-gray-200" alt="" /> },
                  { key: 'title', label: 'Title', render: (t: string) => <span className="font-bold">{t}</span> },
                  { key: 'category', label: 'Category' },
                  { key: 'price', label: 'Price (৳)' },
                ]}
                data={products}
                onDelete={deleteProduct}
                onEdit={(item: any) => handleOpenEdit('product', item)}
              />
            </div>
          )}

          {activeTab === 'news' && (
             <div className="animate-fade-in-up">
               <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-bold">Manage News</h1>
                 <button onClick={() => handleOpenAdd('news')} className="bg-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all"><Plus size={20}/> Add Article</button>
               </div>
               <RenderTable 
                 columns={[
                   { key: 'image', label: 'Thumbnail', render: (src: string) => <img src={src} className="w-12 h-12 rounded-lg object-cover border border-gray-200" alt="" /> },
                   { key: 'title', label: 'Headline', render: (t: string) => <span className="font-bold">{t}</span> },
                   { key: 'category', label: 'Category' },
                   { key: 'date', label: 'Date' },
                 ]}
                 data={news}
                 onDelete={deleteNews}
                 onEdit={(item: any) => handleOpenEdit('news', item)}
               />
             </div>
          )}

          {activeTab === 'portfolio' && (
             <div className="animate-fade-in-up">
               <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-bold">Manage Portfolio</h1>
                 <button onClick={() => handleOpenAdd('portfolio')} className="bg-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all"><Plus size={20}/> Add Item</button>
               </div>
               <RenderTable 
                 columns={[
                   { key: 'image', label: 'Preview', render: (src: string) => <img src={src} className="w-12 h-12 rounded-lg object-cover border border-gray-200" alt="" /> },
                   { key: 'title', label: 'Project Name', render: (t: string) => <span className="font-bold">{t}</span> },
                   { key: 'category', label: 'Type', render: (t: string) => <span className="uppercase text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{t}</span> },
                   { key: 'subCategory', label: 'Sub-Category' },
                 ]}
                 data={portfolio}
                 onDelete={deletePortfolio}
                 onEdit={(item: any) => handleOpenEdit('portfolio', item)}
               />
             </div>
          )}
          
          {activeTab === 'messages' && (
             <div className="animate-fade-in-up">
               <h1 className="text-3xl font-bold mb-8">Inbox</h1>
               <div className="grid gap-4">
                 {messages.map(msg => (
                   <div key={msg.id} className="bg-white dark:bg-paper p-6 rounded-xl shadow-sm border border-l-4 border-l-primary hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start mb-2">
                       <div>
                         <span className="font-bold text-lg text-gray-900 dark:text-white">{msg.name}</span>
                         <span className="text-sm text-gray-500 ml-2">&lt;{msg.email}&gt;</span>
                       </div>
                       <span className="text-xs text-gray-400">{new Date(msg.date).toLocaleDateString()}</span>
                     </div>
                     <h4 className="font-bold mb-2 text-primary">{msg.subject}</h4>
                     <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">{msg.message}</p>
                     <div className="mt-4 flex justify-end">
                       <button onClick={() => deleteMessage(msg.id)} className="text-red-500 text-sm hover:underline">Delete Message</button>
                     </div>
                   </div>
                 ))}
                 {messages.length === 0 && <p className="text-gray-500 text-center py-10">No messages found.</p>}
               </div>
             </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${editItem ? 'Edit' : 'Add'} ${formType === 'product' ? 'Product' : formType === 'news' ? 'Article' : 'Project'}`}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative group">
            <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
            <div className="flex flex-col items-center">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="h-40 object-contain mb-2 rounded-lg shadow-sm" />
              ) : (
                <Upload className="w-12 h-12 text-gray-400 mb-2 group-hover:text-primary transition-colors" />
              )}
              <span className="text-sm text-gray-500 font-medium">{formData.image ? 'Click to change image' : 'Click to upload image'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">OR</span>
          </div>
          <input
            type="text"
            placeholder="Paste Image URL (e.g. https://...)"
            value={formData.image || ''}
            onChange={e => setFormData({...formData, image: e.target.value})}
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 mb-4"
          />
          
          <input required type="text" placeholder="Title / Name" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700" />
          
          {formType === 'product' && (
            <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Price" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700" />
                <select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700">
                   <option value="" disabled>Select Category</option>
                   {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
          )}
          
          {formType === 'news' && (
            <>
              <input required type="text" placeholder="Summary" value={formData.summary || ''} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700" />
              <div className="grid grid-cols-2 gap-4">
                 <select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700">
                   <option value="" disabled>Select Category</option>
                   {NEWS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
                 <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700" />
              </div>
            </>
          )}

          {formType === 'portfolio' && (
             <div className="grid grid-cols-2 gap-4">
               <select required value={formData.category || 'graphic'} onChange={e => setFormData({...formData, category: e.target.value, subCategory: ''})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700">
                 <option value="graphic">Graphic Design</option>
                 <option value="web">Web Design</option>
               </select>
               
               <select required value={formData.subCategory || ''} onChange={e => setFormData({...formData, subCategory: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700">
                 <option value="" disabled>Select Sub-Category</option>
                 {(formData.category === 'web' ? WEB_SUB_CATEGORIES : GRAPHIC_SUB_CATEGORIES).map(sub => (
                   <option key={sub} value={sub}>{sub}</option>
                 ))}
               </select>
             </div>
          )}

          <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 h-32"></textarea>
          
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg">
            {editItem ? 'Update Item' : 'Create Item'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

// --- Main Layout ---
const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (isAdminRoute) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
       
       <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
         {/* Top Header for Mobile & Theme Toggle */}
         <header className="sticky top-0 z-30 bg-white/80 dark:bg-darker/80 backdrop-blur-md px-6 py-4 flex justify-between items-center md:justify-end border-b border-gray-100 dark:border-gray-800">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-700 dark:text-gray-200">
               <Menu size={24} />
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200">
               {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
         </header>

         {/* Main Content Area */}
         <main className="flex-1 p-6 lg:p-10 animate-fade-in">
           {children}
         </main>

         {/* Footer */}
         <footer className="bg-white dark:bg-paper border-t border-gray-200 dark:border-gray-800 py-8 px-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 font-medium">© {new Date().getFullYear()} <span className="text-primary font-bold">DarkDesigner</span>. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2">Crafted by MD Salman Islam</p>
         </footer>
       </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/creative" element={<Creative />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </LayoutComponent>
      </Router>
    </DataProvider>
  );
};

export default App;
