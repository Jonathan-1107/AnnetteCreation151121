import React, { useState } from 'react';
import { 
  Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, 
  ChevronDown, ChevronUp, Plus, Minus, Check, Sparkles, MessageSquare 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductDetailPage({ 
  product, 
  onAddToCart, 
  onNavigate,
  wishlist = [],
  onToggleWishlist 
}) {
  // If no product is passed, fallback to the first bestseller
  const currentProduct = product || PRODUCTS[0];

  const images = currentProduct.images && currentProduct.images.length > 0 
    ? currentProduct.images 
    : [currentProduct.image, currentProduct.hoverImage || currentProduct.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState('onetime'); // 'onetime' | 'subscription'
  const [subFrequency, setSubFrequency] = useState('60'); // days
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('notes'); // 'notes' | 'care' | 'ingredients' | 'shipping'
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(currentProduct.reviews || []);

  const isWishlisted = wishlist.includes(currentProduct.id);

  const discountPrice = purchaseType === 'subscription' 
    ? (currentProduct.price * 0.9) 
    : currentProduct.price;

  const handleAddToCart = () => {
    const itemToAdd = {
      ...currentProduct,
      price: discountPrice,
      purchaseType,
      subFrequency: purchaseType === 'subscription' ? subFrequency : null
    };
    onAddToCart(itemToAdd, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 4000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (onNavigate) {
      onNavigate('checkout');
    }
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (newReviewAuthor && newReviewTitle && newReviewComment) {
      const newReview = {
        id: Date.now(),
        author: newReviewAuthor,
        rating: newReviewRating,
        date: 'Just now',
        verified: true,
        title: newReviewTitle,
        comment: newReviewComment
      };
      setReviewsList([newReview, ...reviewsList]);
      setShowReviewModal(false);
      setNewReviewAuthor('');
      setNewReviewTitle('');
      setNewReviewComment('');
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 4);

  return (
    <div className="pdp-page">
      
      {/* Breadcrumb Bar */}
      <div className="pdp-breadcrumb-bar">
        <div className="pdp-breadcrumb-container">
          <button onClick={() => onNavigate('home')} className="breadcrumb-link">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="breadcrumb-link">Candles</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop', { category: currentProduct.category })} className="breadcrumb-link">
            {currentProduct.collection || currentProduct.category}
          </button>
          <span>/</span>
          <span className="breadcrumb-current">{currentProduct.title}</span>
        </div>
      </div>

      {/* Main PDP Grid (Gallery + Details) */}
      <div className="pdp-main-container">
        
        {/* Left Column: Image Gallery */}
        <div className="pdp-gallery-col">
          <div className="pdp-main-image-wrap">
            <img 
              src={images[activeImageIndex] || currentProduct.image} 
              alt={currentProduct.title} 
              className="pdp-main-image" 
            />
            {currentProduct.tag && (
              <span className="pdp-badge">{currentProduct.tag}</span>
            )}
            <button 
              className={`pdp-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => onToggleWishlist && onToggleWishlist(currentProduct.id)}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={isWishlisted ? "#B8925A" : "none"} stroke={isWishlisted ? "#B8925A" : "#2D2A26"} />
            </button>
          </div>

          {images.length > 1 && (
            <div className="pdp-thumbnail-row">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`pdp-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`View ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}

          {/* Value Props Strip */}
          <div className="pdp-perks-box">
            <div className="pdp-perk">
              <Truck size={16} />
              <span>Complimentary Pan-India Shipping on Orders ₹1,499+</span>
            </div>
            <div className="pdp-perk">
              <ShieldCheck size={16} />
              <span>100% Organic Soy & Non-Toxic Guarantee</span>
            </div>
            <div className="pdp-perk">
              <RefreshCw size={16} />
              <span>Happiness Guarantee & Complimentary Exchanges</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Form */}
        <div className="pdp-info-col">
          
          <span className="pdp-collection-eyebrow">{currentProduct.collection || currentProduct.category}</span>
          <h1 className="pdp-title">{currentProduct.title}</h1>

          {/* Rating Summary */}
          <div className="pdp-rating-row">
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(currentProduct.rating || 5) ? "#B8925A" : "none"} stroke="#B8925A" />
              ))}
            </div>
            <span className="pdp-review-link" onClick={() => setActiveAccordion('reviews')}>
              {currentProduct.rating.toFixed(1)} &bull; ({reviewsList.length} reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="pdp-price-row">
            <span className="pdp-price">₹{discountPrice.toLocaleString('en-IN')}</span>
            {currentProduct.comparePrice && purchaseType === 'onetime' && (
              <span className="pdp-compare-price">₹{currentProduct.comparePrice.toLocaleString('en-IN')}</span>
            )}
            {purchaseType === 'subscription' && (
              <span className="pdp-sub-savings-badge">Save 10% with Auto-Delivery</span>
            )}
          </div>

          {/* Tagline */}
          <p className="pdp-tagline"><em>"{currentProduct.tagline}"</em></p>

          {/* Description */}
          <p className="pdp-description">{currentProduct.description}</p>

          {/* Scent Pyramid Visual Card */}
          {currentProduct.scentPyramid && (
            <div className="pdp-pyramid-card">
              <div className="pyramid-header">
                <Sparkles size={15} />
                <span>Olfactory Scent Pyramid</span>
              </div>
              <div className="pyramid-tiers">
                <div className="pyramid-tier top-tier">
                  <span className="tier-label">Top Notes (Initial 15 mins):</span>
                  <span className="tier-notes">{currentProduct.scentPyramid.top.join(' &bull; ')}</span>
                </div>
                <div className="pyramid-tier heart-tier">
                  <span className="tier-label">Heart Notes (Full Bloom):</span>
                  <span className="tier-notes">{currentProduct.scentPyramid.heart.join(' &bull; ')}</span>
                </div>
                <div className="pyramid-tier base-tier">
                  <span className="tier-label">Base Notes (Lingering Warmth):</span>
                  <span className="tier-notes">{currentProduct.scentPyramid.base.join(' &bull; ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Purchase Options Selector (One-Time vs Subscribe & Save) */}
          <div className="pdp-purchase-options">
            
            {/* Option 1: One-Time Purchase */}
            <div 
              className={`pdp-purchase-card ${purchaseType === 'onetime' ? 'selected' : ''}`}
              onClick={() => setPurchaseType('onetime')}
            >
              <div className="purchase-radio">
                <div className={`radio-dot ${purchaseType === 'onetime' ? 'active' : ''}`} />
              </div>
              <div className="purchase-label">
                <strong>One-Time Purchase</strong>
                <span>Single hand-poured vessel</span>
              </div>
              <div className="purchase-card-price">
                ₹{currentProduct.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Option 2: Subscribe & Save */}
            <div 
              className={`pdp-purchase-card ${purchaseType === 'subscription' ? 'selected' : ''}`}
              onClick={() => setPurchaseType('subscription')}
            >
              <div className="purchase-radio">
                <div className={`radio-dot ${purchaseType === 'subscription' ? 'active' : ''}`} />
              </div>
              <div className="purchase-label">
                <div className="sub-tag-group">
                  <strong>Subscribe & Save 10%</strong>
                  <span className="sub-save-tag">Best Value</span>
                </div>
                <span>Free shipping &bull; Pause or cancel anytime</span>
                
                {purchaseType === 'subscription' && (
                  <div className="sub-frequency-picker" onClick={(e) => e.stopPropagation()}>
                    <span>Deliver every:</span>
                    <select 
                      value={subFrequency} 
                      onChange={(e) => setSubFrequency(e.target.value)}
                      className="sub-select"
                    >
                      <option value="30">30 Days (Monthly Ritual)</option>
                      <option value="60">60 Days (Recommended)</option>
                      <option value="90">90 Days (Quarterly)</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="purchase-card-price">
                ₹{Math.round(currentProduct.price * 0.9).toLocaleString('en-IN')}
              </div>
            </div>

          </div>

          {/* Quantity & Add to Cart Action Row */}
          <div className="pdp-action-row">
            <div className="qty-selector pdp-qty">
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="qty-val">{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>

            <button 
              className="btn-luxe btn-solid pdp-add-cart-btn"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              <span>Add to Scent Bag &bull; ₹{Math.round(discountPrice * quantity).toLocaleString('en-IN')}</span>
            </button>
          </div>

          {/* Instant Buy Now Button */}
          <button 
            className="pdp-buynow-btn"
            onClick={handleBuyNow}
          >
            Buy Now with Instant Checkout &rarr;
          </button>

          {/* Added to Cart Feedback Toast */}
          {addedToast && (
            <div className="pdp-toast-feedback">
              <Check size={16} />
              <span>Added {quantity} &times; {currentProduct.title} to your bag!</span>
            </div>
          )}

          {/* Candle Specifications Table */}
          <div className="pdp-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Wax Composition</span>
              <span className="spec-value">{currentProduct.waxType || '100% Organic Soy'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Burn Time</span>
              <span className="spec-value">{currentProduct.burnTime || '60-70 Hours'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Wick Type</span>
              <span className="spec-value">{currentProduct.wick || 'Lead-Free Braided Cotton'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Net Weight</span>
              <span className="spec-value">{currentProduct.netWeight || '11 oz / 312g'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Vessel Material</span>
              <span className="spec-value">{currentProduct.vessel || 'Matte Amber Heavy Glass'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Origin</span>
              <span className="spec-value">Hand-Poured in India Atelier</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="pdp-accordions-group">
            
            {/* Accordion 1: Scent Profile */}
            <div className="pdp-accordion-item">
              <button 
                className="accordion-header-btn"
                onClick={() => toggleAccordion('notes')}
              >
                <span>Fragrance Profile & Story</span>
                {activeAccordion === 'notes' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {activeAccordion === 'notes' && (
                <div className="accordion-body-content">
                  <p>{currentProduct.description}</p>
                  <p><strong>Fragrance Family:</strong> {currentProduct.scentFamily}</p>
                  <p><strong>Recommended Placement:</strong> {currentProduct.specs?.roomPlacement || 'Living Room, Study, Bedroom'}</p>
                  <p><strong>Atmospheric Mood:</strong> {currentProduct.specs?.mood || 'Calming, Grounding, Luxurious'}</p>
                </div>
              )}
            </div>

            {/* Accordion 2: Candle Care Guide */}
            <div className="pdp-accordion-item">
              <button 
                className="accordion-header-btn"
                onClick={() => toggleAccordion('care')}
              >
                <span>Candle Care & Clean Burn Guide</span>
                {activeAccordion === 'care' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {activeAccordion === 'care' && (
                <div className="accordion-body-content">
                  <ul className="care-guide-list">
                    <li><strong>First Memory Burn:</strong> On first lighting, allow wax to melt fully to all vessel edges (approx. 3-4 hours) to prevent tunneling.</li>
                    <li><strong>Wick Maintenance:</strong> Trim wick to 1/4 inch before each burn to maintain a calm, smokeless flame.</li>
                    <li><strong>Safety:</strong> Burn within sight on heat-resistant surfaces. Keep away from drafts, pets, and children.</li>
                    <li><strong>Vessel Upcycling:</strong> Once 1/2 inch of wax remains, gently clean out vessel and repurpose as a cocktail tumbler or planter.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 3: Clean Ingredients Standard */}
            <div className="pdp-accordion-item">
              <button 
                className="accordion-header-btn"
                onClick={() => toggleAccordion('ingredients')}
              >
                <span>100% Non-Toxic Promise & Ingredients</span>
                {activeAccordion === 'ingredients' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {activeAccordion === 'ingredients' && (
                <div className="accordion-body-content">
                  <p>At Annette Pure, your health and indoor air quality are sacred. We strictly formulate without:</p>
                  <ul className="clean-standards-list">
                    <li>&bull; Zero Paraffin Petroleum Wax</li>
                    <li>&bull; Zero Phthalates or Synthetic Parabens</li>
                    <li>&bull; Zero Lead or Metal Core Wicks</li>
                    <li>&bull; 100% Cruelty-Free & Vegan Ingredients</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 4: Shipping & Returns */}
            <div className="pdp-accordion-item">
              <button 
                className="accordion-header-btn"
                onClick={() => toggleAccordion('shipping')}
              >
                <span>Complimentary Shipping & Returns</span>
                {activeAccordion === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {activeAccordion === 'shipping' && (
                <div className="accordion-body-content">
                  <p><strong>Pan-India Shipping:</strong> Complimentary express shipping on all orders ₹1,499+. Standard shipping (₹99) arrives in 2-4 business days via Blue Dart / Delhivery.</p>
                  <p><strong>Happiness Guarantee:</strong> If a scent doesn't resonate with you, contact our concierge within 30 days for a complimentary exchange or full refund.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Customer Reviews Section */}
      <section className="pdp-reviews-section" id="reviews">
        <div className="pdp-reviews-container">
          
          <div className="reviews-header-block">
            <div>
              <span className="section-eyebrow">Customer Testimonials</span>
              <h2 className="section-title text-left">Verified Scent Reviews</h2>
            </div>
            
            <button 
              className="btn-luxury-cta write-review-btn"
              onClick={() => setShowReviewModal(true)}
            >
              <MessageSquare size={16} />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="reviews-summary-card">
            <div className="reviews-score-col">
              <span className="overall-score">{currentProduct.rating.toFixed(1)}</span>
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#B8925A" stroke="#B8925A" />
                ))}
              </div>
              <span className="total-reviews-count">Based on {reviewsList.length} verified purchases</span>
            </div>

            <div className="reviews-breakdown-col">
              <div className="rating-bar-row">
                <span>5 Stars</span>
                <div className="rating-progress-track"><div className="rating-progress-bar" style={{ width: '92%' }} /></div>
                <span>92%</span>
              </div>
              <div className="rating-bar-row">
                <span>4 Stars</span>
                <div className="rating-progress-track"><div className="rating-progress-bar" style={{ width: '8%' }} /></div>
                <span>8%</span>
              </div>
              <div className="rating-bar-row">
                <span>3 Stars</span>
                <div className="rating-progress-track"><div className="rating-progress-bar" style={{ width: '0%' }} /></div>
                <span>0%</span>
              </div>
              <div className="rating-bar-row">
                <span>2 Stars</span>
                <div className="rating-progress-track"><div className="rating-progress-bar" style={{ width: '0%' }} /></div>
                <span>0%</span>
              </div>
              <div className="rating-bar-row">
                <span>1 Star</span>
                <div className="rating-progress-track"><div className="rating-progress-bar" style={{ width: '0%' }} /></div>
                <span>0%</span>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-cards-list">
            {reviewsList.map((rev) => (
              <div className="review-card" key={rev.id}>
                <div className="review-card-top">
                  <div className="review-author-group">
                    <span className="review-author-name">{rev.author}</span>
                    {rev.verified && (
                      <span className="verified-badge">
                        <Check size={11} /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="review-date">{rev.date}</span>
                </div>

                <div className="review-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < rev.rating ? "#B8925A" : "none"} stroke="#B8925A" />
                  ))}
                </div>

                <h4 className="review-title">{rev.title}</h4>
                <p className="review-comment">{rev.comment}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Recommended Related Candles */}
      <section className="section pdp-related-section">
        <div className="section-intro">
          <span className="section-eyebrow">Harmonious Pairings</span>
          <h2 className="section-title">Complete Your Olfactory Ritual</h2>
        </div>
        
        <div className="related-products-grid">
          {relatedProducts.map((p) => (
            <div 
              key={p.id} 
              className="product-card"
              onClick={() => onNavigate('product', { product: p })}
            >
              <div className="product-img-wrapper">
                {p.tag && <span className="product-badge">{p.tag}</span>}
                <img src={p.image} alt={p.title} className="product-img" />
              </div>
              <div className="product-info">
                <span className="product-collection-label">{p.category}</span>
                <h3 className="product-title">{p.title}</h3>
                <span className="product-price">₹{p.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="modal-wrapper active">
          <div className="modal-content review-modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Write a Review for {currentProduct.title}</h3>
              <button className="qv-close-btn" onClick={() => setShowReviewModal(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddReviewSubmit} className="review-form">
              <div className="form-group">
                <label>Overall Rating</label>
                <div className="star-select-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="star-btn"
                      onClick={() => setNewReviewRating(star)}
                    >
                      <Star size={24} fill={star <= newReviewRating ? "#B8925A" : "none"} stroke="#B8925A" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Patron Title & Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Verified Patron • Mumbai"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unbelievably rich scent throw"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Your Experience</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the scent throw, burn quality, and ambiance..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-luxury-outline" onClick={() => setShowReviewModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-luxury-cta">
                  Submit Review &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
