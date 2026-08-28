import React, { useState, useMemo } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Star, ArrowRight, Gift, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/products';

// 1. LUXURY CART DRAWER WITH FREE SHIPPING METER & CHECKOUT LINK
export function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem,
  onNavigate 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [giftNoteOpen, setGiftNoteOpen] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const FREE_SHIPPING_THRESHOLD = 1499.00;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage('10% Welcome Discount Applied!');
    } else if (cleanCode === 'LUXURY20') {
      setDiscountPercent(20);
      setPromoMessage('20% VIP Scent Vault Discount Applied!');
    } else if (cleanCode === 'FREESHIP') {
      setPromoMessage('Free Shipping Activated!');
    } else {
      setPromoMessage('Invalid coupon code. Try WELCOME10 or LUXURY20');
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    if (onNavigate) {
      onNavigate('checkout', { 
        appliedDiscount: discountPercent, 
        giftMessage: giftNote 
      });
    }
  };

  const handleViewProduct = (productTitle) => {
    const found = PRODUCTS.find(p => p.title.toLowerCase() === productTitle.toLowerCase());
    if (found && onNavigate) {
      onClose();
      onNavigate('product', { product: found });
    }
  };

  return (
    <>
      <div className={`overlay-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`drawer-panel drawer-right ${isOpen ? 'active' : ''}`}>
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3 className="drawer-title">Your Scent Bag</h3>
            <span className="drawer-count">({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart drawer">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="cart-shipping-meter">
          <div className="shipping-meter-text">
            <Truck size={14} className="shipping-meter-icon" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="shipping-success"><strong>You have unlocked FREE Pan-India Shipping!</strong></span>
            ) : (
              <span>Add <strong>₹{Math.round(amountNeededForFreeShipping).toLocaleString('en-IN')}</strong> more for <strong>FREE Pan-India Shipping</strong></span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div 
              className="shipping-progress-bar" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={52} strokeWidth={1} className="empty-cart-icon" />
              <h4 className="cart-empty-title">Your Bag is Empty</h4>
              <p className="cart-empty-text">Indulge your sanctuary with our hand-poured artisan soy candles.</p>
              <button 
                className="btn-luxe btn-solid cart-empty-shop-btn"
                onClick={() => {
                  onClose();
                  if (onNavigate) onNavigate('shop');
                }}
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div 
                    className="cart-item-img-wrap"
                    onClick={() => handleViewProduct(item.title)}
                  >
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h4 
                        className="cart-item-title"
                        onClick={() => handleViewProduct(item.title)}
                      >
                        {item.title}
                      </h4>
                      <p className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                    
                    <span className="cart-item-unit">100% Organic Soy &bull; 11 oz</span>

                    <div className="cart-item-qty-row">
                      <div className="qty-selector">
                        <button 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      
                      <button 
                        className="cart-item-remove" 
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area with Subtotals, Promo, and Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            
            {/* Gift Note Toggle */}
            <div className="cart-gift-option">
              <button 
                type="button" 
                className="cart-gift-btn"
                onClick={() => setGiftNoteOpen(!giftNoteOpen)}
              >
                <Gift size={14} />
                <span>{giftNoteOpen ? 'Hide complimentary gift message' : 'Add complimentary handwritten gift note'}</span>
              </button>
              {giftNoteOpen && (
                <textarea
                  className="gift-note-textarea"
                  placeholder="Write your gift message here (max 200 characters)..."
                  maxLength={200}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                />
              )}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="cart-promo-form">
              <input
                type="text"
                placeholder="Promo code (e.g. WELCOME10)"
                className="cart-promo-input"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button type="submit" className="cart-promo-btn">
                Apply
              </button>
            </form>
            {promoMessage && (
              <p className={`cart-promo-feedback ${discountPercent > 0 ? 'success' : 'error'}`}>
                {promoMessage}
              </p>
            )}

            {/* Totals Breakdown */}
            <div className="cart-totals-section">
              <div className="cart-totals-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountPercent > 0 && (
                <div className="cart-totals-row discount-row">
                  <span>VIP Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="cart-totals-row final-total-row">
                <span>Estimated Total</span>
                <span className="final-total-amount">₹{Math.round(finalTotal).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="cart-totals-desc">Taxes and final Pan-India shipping calculated at checkout.</p>
            
            <button 
              className="btn-luxe btn-solid cart-checkout-btn" 
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to Checkout &bull; ₹{Math.round(finalTotal).toLocaleString('en-IN')}</span>
              <ArrowRight size={16} />
            </button>

            <button 
              className="cart-continue-btn"
              onClick={() => {
                onClose();
                if (onNavigate) onNavigate('shop');
              }}
            >
              Continue Browsing Candles
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// 2. LIVE INSTANT SEARCH DRAWER
export function SearchDrawer({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const quickTags = ["Signature Atelier", "Wellness", "Kashmiri Lavender", "Mysore Sandalwood", "Collector Glass", "Samples", "Festive"];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.scentFamily.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      (p.scentPyramid && Object.values(p.scentPyramid).flat().some(n => n.toLowerCase().includes(q)))
    );
  }, [query]);

  const handleSelectProduct = (product) => {
    onClose();
    if (onNavigate) {
      onNavigate('product', { product });
    }
  };

  const handleViewAllResults = () => {
    onClose();
    if (onNavigate) {
      onNavigate('shop', { searchQuery: query });
    }
  };

  return (
    <>
      <div className={`overlay-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`drawer-panel drawer-top ${isOpen ? 'active' : ''}`}>
        <div className="search-drawer-content">
          
          <div className="search-input-header">
            <form onSubmit={(e) => { e.preventDefault(); handleViewAllResults(); }} className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search scents, notes (e.g. lavender, cedarwood, citrus), collections..."
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus={isOpen}
              />
              <button type="button" className="icon-btn search-drawer-close" onClick={onClose} aria-label="Close search">
                <X size={24} />
              </button>
            </form>
          </div>

          <div className="search-quick-links">
            <span className="search-quick-title">Popular Searches:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="search-quick-tag"
                onClick={() => setQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Live Dynamic Results Preview */}
          {query.trim() && (
            <div className="search-live-results">
              <div className="search-results-header">
                <span>{searchResults.length} {searchResults.length === 1 ? 'candle' : 'candles'} found for "{query}"</span>
                {searchResults.length > 0 && (
                  <button className="search-see-all-link" onClick={handleViewAllResults}>
                    View All in Shop &rarr;
                  </button>
                )}
              </div>

              {searchResults.length === 0 ? (
                <div className="search-no-results">
                  <p>No matching scents found. Try searching for "Lavender", "Amber", or "Woody".</p>
                </div>
              ) : (
                <div className="search-results-grid">
                  {searchResults.slice(0, 4).map((p) => (
                    <div 
                      key={p.id} 
                      className="search-result-card"
                      onClick={() => handleSelectProduct(p)}
                    >
                      <img src={p.image} alt={p.title} className="search-result-img" />
                      <div className="search-result-info">
                        <span className="search-result-category">{p.category}</span>
                        <h4 className="search-result-title">{p.title}</h4>
                        <span className="search-result-scent">{p.scentFamily}</span>
                        <span className="search-result-price">₹{p.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// 3. CENTRED QUICK VIEW MODAL
export function QuickViewModal({ product, isOpen, onClose, onAddToCart, onNavigate }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image, product.hoverImage || product.image];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  const handleFullDetails = () => {
    onClose();
    if (onNavigate) {
      onNavigate('product', { product });
    }
  };

  return (
    <>
      <div className={`overlay-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`modal-wrapper ${isOpen ? 'active' : ''}`}>
        <div className="modal-content luxury-modal">
          <button className="qv-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
          
          <div className="qv-modal-content-grid">
            {/* Image Gallery */}
            <div className="qv-image-side">
              <div className="qv-main-img-wrap">
                <img src={images[activeImageIndex] || product.image} alt={product.title} className="qv-main-img" />
                {product.tag && <span className="qv-badge">{product.tag}</span>}
              </div>
              {images.length > 1 && (
                <div className="qv-thumbnails-row">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`qv-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Info details */}
            <div className="qv-info-side">
              <span className="qv-collection-eyebrow">{product.collection || product.category}</span>
              <h3 className="qv-title">{product.title}</h3>
              
              <div className="qv-rating-row">
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill={i < Math.floor(product.rating || 5) ? "#B8925A" : "none"} stroke="#B8925A" />
                  ))}
                </div>
                <span className="qv-reviews">({product.reviewCount || 24} verified reviews)</span>
              </div>

              <div className="qv-price-row">
                <span className="qv-price">₹{product.price.toLocaleString('en-IN')}</span>
                {product.comparePrice && (
                  <span className="qv-price-compare">₹{product.comparePrice.toLocaleString('en-IN')}</span>
                )}
                <span className="qv-in-stock-badge">In Stock &bull; Hand-Poured in India</span>
              </div>

              <p className="qv-tagline"><em>"{product.tagline || 'Elegance translated through scent.'}"</em></p>

              <p className="qv-description">
                {product.description}
              </p>

              {/* Scent Notes preview */}
              {product.scentPyramid && (
                <div className="qv-scent-notes-box">
                  <div className="qv-scent-note-item">
                    <span className="qv-note-label">Top:</span>
                    <span>{product.scentPyramid.top.join(', ')}</span>
                  </div>
                  <div className="qv-scent-note-item">
                    <span className="qv-note-label">Heart:</span>
                    <span>{product.scentPyramid.heart.join(', ')}</span>
                  </div>
                  <div className="qv-scent-note-item">
                    <span className="qv-note-label">Base:</span>
                    <span>{product.scentPyramid.base.join(', ')}</span>
                  </div>
                </div>
              )}

              <div className="qv-meta-row">
                <div className="qv-meta-item">
                  <span className="qv-meta-label">Wax: </span>{product.waxType || '100% Organic Soy'}
                </div>
                <div className="qv-meta-item">
                  <span className="qv-meta-label">Burn Time: </span>{product.burnTime || '60-70 Hours'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="qv-actions-row">
                <div className="qty-selector qv-qty">
                  <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus size={11} />
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>
                    <Plus size={11} />
                  </button>
                </div>
                
                <button className="btn-luxe btn-solid qv-add-btn" onClick={handleAdd}>
                  Add to Scent Bag &bull; ₹{(product.price * quantity).toLocaleString('en-IN')}
                </button>
              </div>

              <button className="qv-full-details-btn" onClick={handleFullDetails}>
                View Complete Scent Pyramid & Full Details &rarr;
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
