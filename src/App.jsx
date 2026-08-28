import React, { useState, useEffect } from 'react';

// Global Layout Components
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartDrawer, SearchDrawer, QuickViewModal } from './components/Drawers';

// Page Views
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PrivateLabelPage from './pages/PrivateLabelPage';
import SamplesPage from './pages/SamplesPage';
import BoutiquePage from './pages/BoutiquePage';
import OurStoryPage from './pages/OurStoryPage';
import MediaPage from './pages/MediaPage';
import EventsPage from './pages/EventsPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import ContactFaqPage from './pages/ContactFaqPage';
import PoliciesPage from './pages/PoliciesPage';

// Default Product Data
import { PRODUCTS } from './data/products';

function App() {
  // Navigation & Routing State
  const [currentPage, setCurrentPage] = useState('home');
  const [navParams, setNavParams] = useState({});

  // Cart State (Persisted)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('annette_pure_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    // Default initial sample item for demonstration
    return [
      {
        id: 1,
        title: "Forest Ave.",
        price: PRODUCTS[0].price,
        image: PRODUCTS[0].image,
        quantity: 1
      }
    ];
  });

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('annette_pure_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return [1, 3];
  });

  // Placed Orders State (Persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('annette_pure_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return [];
  });

  // Drawers & Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('annette_pure_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('annette_pure_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('annette_pure_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Main Page Navigation Handler
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Toggle
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
    );
  };

  // Orders Management
  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Quick View Trigger
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      
      {/* 1. Top Scrolling Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Fixed Luxury Header Navigation (Word Wrapping & Alignment Fixed) */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onCartOpen={() => setIsCartOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* 3. Main Multi-Page Route Render */}
      <main className="main-content-wrapper">
        
        {currentPage === 'home' && (
          <HomePage
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={navParams.category || 'All Candles'}
            initialSearchQuery={navParams.searchQuery || ''}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage
            product={navParams.product || PRODUCTS[0]}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'private-label' && (
          <PrivateLabelPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'samples' && (
          <SamplesPage
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'boutique' && (
          <BoutiquePage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'story' && (
          <OurStoryPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'media' && (
          <MediaPage
            initialTab={navParams.tab || 'blog'}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'events' && (
          <EventsPage
            initialTab={navParams.tab || 'corporate'}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            appliedDiscount={navParams.appliedDiscount || 0}
            initialGiftMessage={navParams.giftMessage || ''}
            onAddOrder={handleAddOrder}
          />
        )}

        {currentPage === 'account' && (
          <AccountPage
            initialTab={navParams.tab || 'overview'}
            orders={orders}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactFaqPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'policies' && (
          <PoliciesPage
            initialTab={navParams.tab || 'returns'}
            onNavigate={handleNavigate}
          />
        )}

      </main>

      {/* 4. Luxury Footer with Direct Page Links */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Slide-Out Scent Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onNavigate={handleNavigate}
      />

      {/* 6. Live Instant Search Drawer */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 7. Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
        onNavigate={handleNavigate}
      />

    </div>
  );
}

export default App;
