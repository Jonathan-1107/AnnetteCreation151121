import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function Bestsellers({ onQuickView, onAddToCart, onNavigate }) {
  const scrollRef = useRef(null);

  // Take the first 8 products as bestsellers / signature candles
  const bestsellers = PRODUCTS.slice(0, 8);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 340 : scrollLeft + 340;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleProductClick = (product) => {
    if (onNavigate) {
      onNavigate('product', { product });
    }
  };

  return (
    <section className="section bestsellers-section" id="bestsellers">
      <div className="carousel-header">
        <div>
          <span className="section-eyebrow">Customer Favorites</span>
          <h2 className="section-title text-left">Bestselling Candles</h2>
        </div>
        <div className="carousel-controls">
          <button className="carousel-nav-btn" onClick={() => scroll('left')} aria-label="Previous bestsellers">
            <ChevronLeft size={20} />
          </button>
          <button className="carousel-nav-btn" onClick={() => scroll('right')} aria-label="Next bestsellers">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel-track" ref={scrollRef}>
          {bestsellers.map((product) => (
            <div className="product-card" key={product.id}>
              
              <div className="product-img-wrapper" onClick={() => handleProductClick(product)}>
                {product.tag && <span className="product-badge">{product.tag}</span>}
                <img src={product.image} alt={product.title} className="product-img" />
                {product.hoverImage && (
                  <img src={product.hoverImage} alt={`${product.title} alternate`} className="product-img-secondary" />
                )}
                
                <div className="product-card-hover-actions">
                  <button 
                    className="card-action-btn quickview-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    title="Quick View"
                  >
                    <Eye size={15} />
                    <span>Quick View</span>
                  </button>
                  <button 
                    className="card-action-btn quickadd-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, 1);
                    }}
                    title="Add to Cart"
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>

              <div className="product-info">
                <span className="product-collection-label">{product.collection || product.category}</span>
                <h3 className="product-title" onClick={() => handleProductClick(product)}>{product.title}</h3>
                
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#B8925A" : "none"} stroke="#B8925A" />
                  ))}
                  <span className="product-rating-count">({product.reviewCount || 24})</span>
                </div>

                <div className="product-price-row">
                  <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.comparePrice && (
                    <span className="product-price-compare">₹{product.comparePrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                
                <span className="product-unit-price">100% Soy &bull; {product.netWeight || '11 oz'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bestsellers-footer-cta">
        <button 
          className="btn-luxe"
          onClick={() => onNavigate && onNavigate('shop')}
        >
          View All Candles ({PRODUCTS.length}) &rarr;
        </button>
      </div>
    </section>
  );
}
