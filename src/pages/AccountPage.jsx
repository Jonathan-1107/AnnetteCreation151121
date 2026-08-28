import React, { useState } from 'react';
import { 
  User, Package, Heart, RefreshCw, MapPin, LogOut, 
  ShoppingBag, Truck, CheckCircle, Clock, Sparkles 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function AccountPage({ 
  initialTab = 'overview',
  orders = [],
  wishlist = [],
  onAddToCart,
  onToggleWishlist,
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'overview');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  
  // Subscription state
  const [subStatus, setSubStatus] = useState('Active');
  const [subScent, setSubScent] = useState("Forest Ave. 11 oz");
  const [subToast, setSubToast] = useState('');

  // Default mock orders if none placed yet
  const displayOrders = orders.length > 0 ? orders : [
    {
      orderNumber: "AP-IN-784210",
      date: "Aug 02, 2026",
      status: "Delivered",
      total: 2848,
      shippingCost: 0,
      shippingMethodTitle: "Standard Complimentary Pan-India Shipping",
      estimatedDelivery: "Aug 06, 2026",
      shippingAddress: {
        name: "Ananya Verma",
        address: "14 Altamount Road, Apt 8B",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400026",
        country: "India"
      },
      items: [
        { id: 1, title: "Forest Ave.", price: 1499, quantity: 1, image: PRODUCTS[0].image },
        { id: 2, title: "Perloat", price: 1349, quantity: 1, image: PRODUCTS[1].image }
      ]
    }
  ];

  // Wishlist products
  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handlePauseSub = () => {
    setSubStatus(prev => prev === 'Active' ? 'Paused' : 'Active');
    setSubToast(subStatus === 'Active' ? 'Subscription paused successfully.' : 'Subscription resumed!');
    setTimeout(() => setSubToast(''), 4000);
  };

  const handleSwapScent = (newScent) => {
    setSubScent(newScent);
    setSubToast(`Next box updated to: ${newScent}`);
    setTimeout(() => setSubToast(''), 4000);
  };

  if (!isLoggedIn) {
    return (
      <div className="account-auth-page">
        <div className="auth-card">
          <span className="auth-script-accent">A</span>
          <h2 className="auth-title">{authMode === 'login' ? 'Sign In to Your Sanctuary' : 'Join The Annette Pure Circle'}</h2>
          <p className="auth-subtext">
            {authMode === 'login' 
              ? 'Access your orders, track shipments, and manage your candle subscriptions.' 
              : 'Create an account to earn VIP reward points and receive private vault invitations.'}
          </p>

          <form onSubmit={handleAuthSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                placeholder="patron@annettepure.in"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-luxury-cta auth-submit-btn">
              {authMode === 'login' ? 'Sign In &rarr;' : 'Create Account &rarr;'}
            </button>
          </form>

          <div className="auth-toggle-row">
            {authMode === 'login' ? (
              <p>Don't have an account? <button onClick={() => setAuthMode('register')}>Create one here</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setAuthMode('login')}>Sign in here</button></p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      
      {/* Account Header Card */}
      <div className="account-header-banner">
        <div className="account-header-container">
          <div className="account-user-info">
            <div className="user-avatar-circle">
              <span>AP</span>
            </div>
            <div>
              <span className="user-greeting">Welcome back,</span>
              <h1 className="user-name">Patron Member</h1>
              <div className="user-badge-row">
                <span className="loyalty-pill"><Sparkles size={12} /> Gold Circle Member</span>
                <span className="loyalty-points">450 Scent Points (₹450 Reward Voucher)</span>
              </div>
            </div>
          </div>

          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="account-main-layout">
        
        {/* Navigation Tabs Sidebar */}
        <aside className="account-nav-sidebar">
          <button 
            className={`account-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <User size={16} />
            <span>Dashboard Overview</span>
          </button>

          <button 
            className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={16} />
            <span>Order History & Tracking ({displayOrders.length})</span>
          </button>

          <button 
            className={`account-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={16} />
            <span>Saved Wishlist ({wishlist.length})</span>
          </button>

          <button 
            className={`account-nav-btn ${activeTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriptions')}
          >
            <RefreshCw size={16} />
            <span>Candle Subscriptions (1)</span>
          </button>

          <button 
            className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <MapPin size={16} />
            <span>Saved Addresses</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <div className="account-content-panel">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="overview-tab-content">
              <h2 className="tab-heading">Account Overview</h2>
              
              <div className="overview-cards-row">
                <div className="overview-summary-card">
                  <span className="summary-card-label">Total Orders Placed</span>
                  <span className="summary-card-val">{displayOrders.length}</span>
                  <button onClick={() => setActiveTab('orders')} className="summary-card-link">View orders &rarr;</button>
                </div>
                <div className="overview-summary-card">
                  <span className="summary-card-label">Wishlisted Scents</span>
                  <span className="summary-card-val">{wishlist.length}</span>
                  <button onClick={() => setActiveTab('wishlist')} className="summary-card-link">View wishlist &rarr;</button>
                </div>
                <div className="overview-summary-card">
                  <span className="summary-card-label">Active Subscription</span>
                  <span className="summary-card-val">{subStatus}</span>
                  <button onClick={() => setActiveTab('subscriptions')} className="summary-card-link">Manage box &rarr;</button>
                </div>
              </div>

              {/* Recent Order Preview */}
              <div className="recent-order-section">
                <h3 className="section-subheading">Latest Order</h3>
                <div className="order-item-card">
                  <div className="order-card-header">
                    <div>
                      <strong>Order #{displayOrders[0].orderNumber}</strong>
                      <span className="order-date-tag">Placed on {displayOrders[0].date}</span>
                    </div>
                    <span className="order-status-badge delivered">{displayOrders[0].status}</span>
                  </div>

                  <div className="order-items-row">
                    {displayOrders[0].items.map((item, i) => (
                      <div className="order-mini-product" key={i}>
                        <img src={item.image} alt={item.title} />
                        <div>
                          <h4>{item.title}</h4>
                          <span>Qty: {item.quantity} &bull; ₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-footer">
                    <span>Total: <strong>₹{displayOrders[0].total.toLocaleString('en-IN')}</strong></span>
                    <button 
                      className="btn-luxe"
                      onClick={() => setActiveTab('orders')}
                    >
                      View Full Details & Track &rarr;
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 2. ORDER HISTORY TAB */}
          {activeTab === 'orders' && (
            <div className="orders-tab-content">
              <h2 className="tab-heading">Order History & Shipment Tracking</h2>

              {displayOrders.map((ord, idx) => (
                <div className="full-order-card" key={idx}>
                  <div className="full-order-header">
                    <div>
                      <span className="order-id-label">Order Reference: <strong>#{ord.orderNumber}</strong></span>
                      <span className="order-placed-date">Placed: {ord.date}</span>
                    </div>
                    <span className="order-status-badge active">{ord.status}</span>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="order-tracking-strip">
                    <div className="tracking-step done">
                      <CheckCircle size={14} />
                      <span>Order Confirmed</span>
                    </div>
                    <div className="tracking-step done">
                      <CheckCircle size={14} />
                      <span>Hand-Poured & Cured</span>
                    </div>
                    <div className="tracking-step in-progress">
                      <Truck size={14} />
                      <span>In Transit via Blue Dart</span>
                    </div>
                    <div className="tracking-step">
                      <Clock size={14} />
                      <span>Delivered</span>
                    </div>
                  </div>

                  <div className="order-items-grid">
                    {ord.items.map((item, itemIdx) => (
                      <div className="order-item-detail-row" key={itemIdx}>
                        <img src={item.image} alt={item.title} className="order-item-thumb" />
                        <div className="order-item-info">
                          <h4>{item.title}</h4>
                          <span>Quantity: {item.quantity} &bull; 100% Organic Soy</span>
                          <span className="order-item-unit-price">₹{item.price.toLocaleString('en-IN')} each</span>
                        </div>
                        <button 
                          className="btn-luxe order-reorder-btn"
                          onClick={() => {
                            onAddToCart(item, 1);
                            alert(`Added ${item.title} back to your bag!`);
                          }}
                        >
                          Reorder
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="full-order-footer">
                    <div className="order-shipping-summary">
                      <strong>Shipping to:</strong> {ord.shippingAddress?.name}, {ord.shippingAddress?.address}, {ord.shippingAddress?.city}
                    </div>
                    <div className="order-total-amount">
                      <span>Total Paid:</span>
                      <strong>₹{Math.round(ord.total).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div className="wishlist-tab-content">
              <h2 className="tab-heading">Your Saved Wishlist ({wishlistedProducts.length})</h2>

              {wishlistedProducts.length === 0 ? (
                <div className="empty-wishlist-box">
                  <Heart size={44} strokeWidth={1} />
                  <h3>Your Wishlist is Empty</h3>
                  <p>Browse our candle collection and click the heart icon to save your favorite scents.</p>
                  <button className="btn-luxury-cta" onClick={() => onNavigate('shop')}>
                    Explore Candles &rarr;
                  </button>
                </div>
              ) : (
                <div className="wishlist-grid">
                  {wishlistedProducts.map((p) => (
                    <div className="product-card" key={p.id}>
                      <div className="product-img-wrapper" onClick={() => onNavigate('product', { product: p })}>
                        <img src={p.image} alt={p.title} className="product-img" />
                      </div>
                      <div className="product-info">
                        <span className="product-collection-label">{p.category}</span>
                        <h3 className="product-title" onClick={() => onNavigate('product', { product: p })}>{p.title}</h3>
                        <span className="product-price">₹{p.price.toLocaleString('en-IN')}</span>
                        
                        <div className="wishlist-card-actions">
                          <button 
                            className="btn-luxe btn-solid wishlist-add-btn"
                            onClick={() => {
                              onAddToCart(p, 1);
                              onToggleWishlist(p.id);
                            }}
                          >
                            <ShoppingBag size={14} />
                            <span>Move to Bag</span>
                          </button>
                          <button 
                            className="wishlist-remove-link"
                            onClick={() => onToggleWishlist(p.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. SUBSCRIPTIONS TAB */}
          {activeTab === 'subscriptions' && (
            <div className="subscriptions-tab-content">
              <h2 className="tab-heading">Monthly Candle Subscription</h2>
              
              {subToast && (
                <div className="pdp-toast-feedback" style={{ marginBottom: '20px' }}>
                  <Sparkles size={16} />
                  <span>{subToast}</span>
                </div>
              )}

              <div className="subscription-card">
                <div className="sub-card-header">
                  <div>
                    <span className="sub-status-tag">{subStatus}</span>
                    <h3 className="sub-title">The Atelier Scent Club</h3>
                    <p className="sub-meta">10% VIP Discount &bull; Free Pan-India Shipping on Every Box</p>
                  </div>
                  <span className="sub-price">₹1,349 / every 60 days</span>
                </div>

                <div className="sub-current-item">
                  <img src={PRODUCTS[0].image} alt="Subscription Candle" className="sub-candle-img" />
                  <div className="sub-candle-details">
                    <h4>Current Scent Selection: <strong>{subScent}</strong></h4>
                    <p>Next Scheduled Pour & Dispatch: <strong>September 15, 2026</strong></p>
                    <p>Delivery Interval: <strong>Every 60 Days</strong></p>
                  </div>
                </div>

                {/* Scent Swap Selector */}
                <div className="sub-swap-section">
                  <h4>Swap Next Month's Scent:</h4>
                  <div className="sub-scents-row">
                    {PRODUCTS.slice(0, 5).map((prod) => (
                      <button
                        key={prod.id}
                        className={`sub-scent-swap-btn ${subScent.includes(prod.title) ? 'active' : ''}`}
                        onClick={() => handleSwapScent(`${prod.title} 11 oz`)}
                      >
                        <img src={prod.image} alt={prod.title} />
                        <span>{prod.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sub-card-actions">
                  <button 
                    className="btn-luxury-outline"
                    onClick={handlePauseSub}
                  >
                    {subStatus === 'Active' ? 'Pause Subscription' : 'Resume Subscription'}
                  </button>
                  <button 
                    className="btn-luxe"
                    onClick={() => {
                      setSubToast('Next billing date skipped to November 15, 2026.');
                      setTimeout(() => setSubToast(''), 4000);
                    }}
                  >
                    Skip Next Delivery
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* 5. SAVED ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="addresses-tab-content">
              <h2 className="tab-heading">Saved Addresses</h2>

              <div className="address-card default">
                <div className="address-badge">Default Shipping Destination</div>
                <h3>Patron Destination</h3>
                <p>14 Altamount Road, Penthouse 8B</p>
                <p>South Mumbai, Maharashtra - 400026, India</p>
                <p>Phone: +91 98200 12345</p>

                <div className="address-card-actions">
                  <button className="btn-luxe">Edit Address</button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
