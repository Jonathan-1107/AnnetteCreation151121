import React, { useState, useEffect } from 'react';
import { 
  User, Package, Heart, RefreshCw, MapPin, LogOut, 
  ShoppingBag, Truck, CheckCircle, Clock, Sparkles 
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useProducts } from '../hooks/useProducts';

export default function AccountPage({ 
  initialTab = 'overview',
  wishlist = [],
  onAddToCart,
  onToggleWishlist,
  onNavigate,
  user,
  signOut
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'overview');
  const { products: allProducts } = useProducts();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
        setOrdersLoading(false);
        return;
      }

      const shaped = data.map((ord) => ({
        orderNumber: ord.order_number,
        date: new Date(ord.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: ord.status,
        total: ord.total,
        shippingCost: ord.shipping_cost,
        shippingMethodTitle: ord.shipping_method,
        shippingAddress: {
          name: ord.shipping_name,
          address: ord.shipping_address,
          city: ord.shipping_city,
          state: ord.shipping_state,
          zip: ord.shipping_zip,
          country: ord.shipping_country
        },
        items: (ord.order_items || []).map((it) => ({
          id: it.product_id,
          title: it.product_title,
          sku: it.sku,
          price: it.price_at_purchase,
          quantity: it.quantity,
          image: allProducts.find((p) => p.id === it.product_id)?.image || ''
        }))
      }));

      setOrders(shaped);
      setOrdersLoading(false);
    }

    fetchOrders();
  }, [user, allProducts]);

  // Wishlist products, pulled from real Supabase catalog
  const wishlistedProducts = allProducts.filter(p => wishlist.includes(p.id));

  const handleSignOut = async () => {
    if (signOut) await signOut();
    if (onNavigate) onNavigate('home');
  };

  // If somehow reached without a logged-in user, send to login instead of showing a fake form
  if (!user) {
    return (
      <div className="account-auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <span className="auth-script-accent">A</span>
          <h2 className="auth-title">Please Sign In</h2>
          <p className="auth-subtext">You need to be signed in to view your account.</p>
          <button className="btn-luxury-cta auth-submit-btn" onClick={() => onNavigate('login')}>
            Go to Sign In &rarr;
          </button>
        </div>
      </div>
    );
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Patron';
  const avatarInitials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="account-page">
      
      {/* Account Header Card */}
      <div className="account-header-banner">
        <div className="account-header-container">
          <div className="account-user-info">
            <div className="user-avatar-circle">
              <span>{avatarInitials}</span>
            </div>
            <div>
              <span className="user-greeting">Welcome back,</span>
              <h1 className="user-name">{displayName}</h1>
              <div className="user-badge-row">
                <span className="loyalty-pill"><Sparkles size={12} /> {user.email}</span>
              </div>
            </div>
          </div>

          <button className="logout-btn" onClick={handleSignOut}>
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
            <span>Order History & Tracking ({orders.length})</span>
          </button>

          <button 
            className={`account-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={16} />
            <span>Saved Wishlist ({wishlist.length})</span>
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
                  <span className="summary-card-val">{orders.length}</span>
                  <button onClick={() => setActiveTab('orders')} className="summary-card-link">View orders &rarr;</button>
                </div>
                <div className="overview-summary-card">
                  <span className="summary-card-label">Wishlisted Scents</span>
                  <span className="summary-card-val">{wishlist.length}</span>
                  <button onClick={() => setActiveTab('wishlist')} className="summary-card-link">View wishlist &rarr;</button>
                </div>
              </div>

              {/* Recent Order Preview */}
              {ordersLoading ? (
                <p style={{ color: '#8A8478' }}>Loading your orders...</p>
              ) : orders.length === 0 ? (
                <div className="empty-wishlist-box">
                  <Package size={44} strokeWidth={1} />
                  <h3>No Orders Yet</h3>
                  <p>Once you place an order, it will show up here.</p>
                  <button className="btn-luxury-cta" onClick={() => onNavigate('shop')}>
                    Browse Candles &rarr;
                  </button>
                </div>
              ) : (
                <div className="recent-order-section">
                  <h3 className="section-subheading">Latest Order</h3>
                  <div className="order-item-card">
                    <div className="order-card-header">
                      <div>
                        <strong>Order #{orders[0].orderNumber}</strong>
                        <span className="order-date-tag">Placed on {orders[0].date}</span>
                      </div>
                      <span className="order-status-badge delivered">{orders[0].status}</span>
                    </div>

                    <div className="order-items-row">
                      {orders[0].items.map((item, i) => (
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
                      <span>Total: <strong>₹{Math.round(orders[0].total).toLocaleString('en-IN')}</strong></span>
                      <button 
                        className="btn-luxe"
                        onClick={() => setActiveTab('orders')}
                      >
                        View Full Details & Track &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. ORDER HISTORY TAB */}
          {activeTab === 'orders' && (
            <div className="orders-tab-content">
              <h2 className="tab-heading">Order History & Shipment Tracking</h2>

              {ordersLoading ? (
                <p style={{ color: '#8A8478' }}>Loading your orders...</p>
              ) : orders.length === 0 ? (
                <div className="empty-wishlist-box">
                  <Package size={44} strokeWidth={1} />
                  <h3>No Orders Yet</h3>
                  <p>Once you place an order, it will show up here.</p>
                  <button className="btn-luxury-cta" onClick={() => onNavigate('shop')}>
                    Browse Candles &rarr;
                  </button>
                </div>
              ) : (
                orders.map((ord, idx) => (
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
                      <div className={`tracking-step ${ord.status !== 'processing' ? 'done' : 'in-progress'}`}>
                        <Truck size={14} />
                        <span>Hand-Poured & Cured</span>
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
                            {item.sku && <span style={{ fontSize: '0.75rem', color: '#8A8478' }}>SKU: {item.sku}</span>}
                            <span>Quantity: {item.quantity} &bull; 100% Organic Soy</span>
                            <span className="order-item-unit-price">₹{item.price.toLocaleString('en-IN')} each</span>
                          </div>
                          <button 
                            className="btn-luxe order-reorder-btn"
                            onClick={() => {
                              onAddToCart(item, 1);
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
                ))
              )}
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

          {/* 4. SAVED ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="addresses-tab-content">
              <h2 className="tab-heading">Saved Addresses</h2>
              <p style={{ color: '#8A8478', marginBottom: '16px' }}>
                Your most recent shipping address will appear here after your first order.
              </p>

              {orders.length > 0 ? (
                <div className="address-card default">
                  <div className="address-badge">Most Recent Shipping Destination</div>
                  <h3>{orders[0].shippingAddress?.name}</h3>
                  <p>{orders[0].shippingAddress?.address}</p>
                  <p>{orders[0].shippingAddress?.city}, {orders[0].shippingAddress?.state} - {orders[0].shippingAddress?.zip}, {orders[0].shippingAddress?.country}</p>
                </div>
              ) : (
                <p style={{ color: '#8A8478' }}>No saved addresses yet.</p>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
