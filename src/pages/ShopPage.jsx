import React, { useState, useMemo } from 'react';
import { Grid, List, Star, Eye, ShoppingBag, Heart, Search, X, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES, SCENT_FAMILIES } from '../data/products';

export default function ShopPage({ 
  initialCategory = 'All Candles',
  initialSearchQuery = '',
  onQuickView, 
  onAddToCart, 
  onNavigate,
  wishlist = [],
  onToggleWishlist 
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All Candles');
  const [selectedScent, setSelectedScent] = useState('All Scents');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under1400', '1400to1800', 'over1800'

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All Candles') {
        const matchesCat = product.category === selectedCategory || 
                           product.collection?.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!matchesCat) return false;
      }

      // Scent family filter
      if (selectedScent !== 'All Scents') {
        if (!product.scentFamily.toLowerCase().includes(selectedScent.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      if (priceFilter === 'under1400' && product.price >= 1400) return false;
      if (priceFilter === '1400to1800' && (product.price < 1400 || product.price > 1800)) return false;
      if (priceFilter === 'over1800' && product.price <= 1800) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesNotes = product.scentPyramid && Object.values(product.scentPyramid).flat().some(n => n.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesNotes) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestsellers') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // 'featured'
    });
  }, [selectedCategory, selectedScent, priceFilter, searchQuery, sortBy]);

  const handleProductClick = (product) => {
    if (onNavigate) {
      onNavigate('product', { product });
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('All Candles');
    setSelectedScent('All Scents');
    setPriceFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All Candles' || selectedScent !== 'All Scents' || priceFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="shop-page">
      
      {/* Header Banner */}
      <section className="shop-banner">
        <div className="shop-banner-overlay" />
        <div className="shop-banner-content">
          <span className="shop-banner-eyebrow">The Complete Collection</span>
          <h1 className="shop-banner-title">Hand-Poured Soy Candles</h1>
          <p className="shop-banner-tagline">
            100% organic soy wax, unbleached cotton wicks, and pure botanical essences. Handcrafted in small batches in India.
          </p>
        </div>
      </section>

      <div className="shop-container">
        
        {/* Top Control Bar: Search & Active Filters */}
        <div className="shop-controls-bar">
          
          <div className="shop-search-box">
            <Search size={16} className="shop-search-icon" />
            <input
              type="text"
              placeholder="Search by scent note, title, mood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shop-search-input"
            />
            {searchQuery && (
              <button className="shop-search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="shop-controls-right">
            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
              >
                <Grid size={16} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
              >
                <List size={16} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="shop-sort-wrapper">
              <label htmlFor="shop-sort" className="sort-label">Sort:</label>
              <select 
                id="shop-sort"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="shop-sort-select"
              >
                <option value="featured">Featured & Curated</option>
                <option value="bestsellers">Bestselling First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="shop-main-layout">
          
          {/* Sidebar Filter Panel */}
          <aside className="shop-sidebar">
            <div className="sidebar-header">
              <h3 className="sidebar-title">Filters</h3>
              {hasActiveFilters && (
                <button className="sidebar-reset-btn" onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Collections</h4>
              <ul className="filter-options-list">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button 
                      className={`filter-option-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scent Family Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Fragrance Family</h4>
              <ul className="filter-options-list">
                {SCENT_FAMILIES.map((scent) => (
                  <li key={scent}>
                    <button 
                      className={`filter-option-btn ${selectedScent === scent ? 'active' : ''}`}
                      onClick={() => setSelectedScent(scent)}
                    >
                      <span>{scent}</span>
                      {selectedScent === scent && <Check size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Price Range</h4>
              <ul className="filter-options-list">
                <li>
                  <button 
                    className={`filter-option-btn ${priceFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('all')}
                  >
                    <span>All Prices</span>
                    {priceFilter === 'all' && <Check size={14} />}
                  </button>
                </li>
                <li>
                  <button 
                    className={`filter-option-btn ${priceFilter === 'under1400' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('under1400')}
                  >
                    <span>Under ₹1,400</span>
                    {priceFilter === 'under1400' && <Check size={14} />}
                  </button>
                </li>
                <li>
                  <button 
                    className={`filter-option-btn ${priceFilter === '1400to1800' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('1400to1800')}
                  >
                    <span>₹1,400 &mdash; ₹1,800</span>
                    {priceFilter === '1400to1800' && <Check size={14} />}
                  </button>
                </li>
                <li>
                  <button 
                    className={`filter-option-btn ${priceFilter === 'over1800' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('over1800')}
                  >
                    <span>₹1,800+ (Luxury & Collector)</span>
                    {priceFilter === 'over1800' && <Check size={14} />}
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Scent Sampler Callout */}
            <div className="sidebar-promo-card">
              <span className="sidebar-promo-badge">Try First</span>
              <h4 className="sidebar-promo-title">Discovery Scent Flight</h4>
              <p className="sidebar-promo-text">Sample 4 luxury scents at home for ₹899 and receive a ₹500 credit voucher towards your full-size candle.</p>
              <button 
                className="btn-luxe btn-solid sidebar-promo-btn"
                onClick={() => onNavigate && onNavigate('samples')}
              >
                Build Sample Box &rarr;
              </button>
            </div>

          </aside>

          {/* Products Grid / List */}
          <div className="shop-products-container">
            
            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <div className="active-filters-row">
                <span className="active-filters-label">Active Filters:</span>
                {selectedCategory !== 'All Candles' && (
                  <span className="filter-pill">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All Candles')}><X size={12} /></button>
                  </span>
                )}
                {selectedScent !== 'All Scents' && (
                  <span className="filter-pill">
                    {selectedScent}
                    <button onClick={() => setSelectedScent('All Scents')}><X size={12} /></button>
                  </span>
                )}
                {priceFilter !== 'all' && (
                  <span className="filter-pill">
                    Price Filter
                    <button onClick={() => setPriceFilter('all')}><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="filter-pill">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                  </span>
                )}
                <button className="clear-all-pill" onClick={clearAllFilters}>Reset All</button>
              </div>
            )}

            <div className="results-count-banner">
              <span>Showing <strong>{filteredProducts.length}</strong> handcrafted candles</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <Search size={48} strokeWidth={1} />
                <h3>No Candles Match Your Criteria</h3>
                <p>Try clearing filters or searching for another fragrance note.</p>
                <button className="btn-luxury-cta" onClick={clearAllFilters}>
                  View All Candles
                </button>
              </div>
            ) : (
              <div className={`products-display-grid ${viewMode === 'list' ? 'list-layout' : 'grid-layout'}`}>
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div className="product-card catalog-card" key={product.id}>
                      
                      <div className="product-img-wrapper" onClick={() => handleProductClick(product)}>
                        {product.tag && <span className="product-badge">{product.tag}</span>}
                        
                        <button 
                          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleWishlist) onToggleWishlist(product.id);
                          }}
                          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          aria-label="Wishlist toggle"
                        >
                          <Heart size={16} fill={isWishlisted ? "#B8925A" : "none"} stroke={isWishlisted ? "#B8925A" : "#2D2A26"} />
                        </button>

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
                          >
                            <ShoppingBag size={15} />
                            <span>Quick Add</span>
                          </button>
                        </div>
                      </div>

                      <div className="product-info">
                        <span className="product-collection-label">{product.collection || product.category}</span>
                        <h3 className="product-title" onClick={() => handleProductClick(product)}>{product.title}</h3>
                        
                        <div className="product-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill={i < Math.floor(product.rating) ? "#B8925A" : "none"} stroke="#B8925A" />
                          ))}
                          <span className="product-rating-count">({product.reviewCount || 24})</span>
                        </div>

                        <p className="product-card-tagline">{product.tagline}</p>

                        <div className="product-price-row">
                          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.comparePrice && (
                            <span className="product-price-compare">₹{product.comparePrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>

                        <div className="product-card-footer-specs">
                          <span>{product.scentFamily}</span>
                          <span>&bull;</span>
                          <span>{product.burnTime || '65 Hours'}</span>
                        </div>

                        {viewMode === 'list' && (
                          <div className="list-mode-actions">
                            <button 
                              className="btn-luxe btn-solid"
                              onClick={() => onAddToCart(product, 1)}
                            >
                              Add to Bag &bull; ₹{product.price.toLocaleString('en-IN')}
                            </button>
                            <button 
                              className="btn-luxe"
                              onClick={() => handleProductClick(product)}
                            >
                              Full Scent Profile &rarr;
                            </button>
                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
