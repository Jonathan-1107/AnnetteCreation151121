import React, { useState, useMemo, useEffect } from 'react';
import { Grid, List, Star, Eye, ShoppingBag, Heart, Search, X, Check } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCollections } from '../hooks/useCollections';
import { COLLECTION_GROUPS } from '../data/collectionGroups';

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const ALL = 'All Candles';

// Price ranges based on your real prices (about Rs 199 - Rs 2,200)
const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', test: () => true },
  { id: 'under300', label: 'Under ₹300', test: (p) => p < 300 },
  { id: '300to600', label: '₹300 – ₹600', test: (p) => p >= 300 && p <= 600 },
  { id: '600to1000', label: '₹600 – ₹1,000', test: (p) => p > 600 && p <= 1000 },
  { id: 'over1000', label: 'Over ₹1,000', test: (p) => p > 1000 },
];

const norm = (v) => String(v ?? '').trim().toLowerCase();

// Exact matching only. A menu item can send any of:
//  - a collection name        (e.g. "Molded Candles")
//  - a group in COLLECTION_GROUPS
//  - a category name          (product.category)
//  - a department name        (product.department, e.g. "Candles")
function matchesCategory(product, selected) {
  if (selected === ALL) return true;
  const group = COLLECTION_GROUPS?.[selected];
  if (group) {
    return group.some((name) => norm(name) === norm(product.collection));
  }
  const sel = norm(selected);
  return (
    norm(product.collection) === sel ||
    norm(product.category) === sel ||
    norm(getDepartment(product)) === sel
  );
}
const getDepartment = (p) =>
  p.department ||
  (norm(p.collection) === 'fragrance glass bottles' ? 'Fragrance Glass Bottles' : 'Candles');

export default function ShopPage({
  initialCategory = ALL,
  initialSearchQuery = '',
  onQuickView,
  onAddToCart,
  onNavigate,
  wishlist = [],
  onToggleWishlist,
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || ALL);
  const [selectedScent, setSelectedScent] = useState('All Scents');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [viewMode, setViewMode] = useState('grid');
  const [priceFilter, setPriceFilter] = useState('all');
  const { products, loading } = useProducts();
  const { collections } = useCollections();

  // Sidebar options. If we arrived from a menu item that is not a collection
  // (e.g. a department), still show it as the active option.
  const categoryOptions = useMemo(() => {
    const base = [ALL, ...collections.map((c) => c.name)];
    return base.includes(selectedCategory) ? base : [...base, selectedCategory];
  }, [collections, selectedCategory]);

  // Scent list built from the real products (not the old static file)
  const scentOptions = useMemo(() => {
    const set = new Set(
      products.map((p) => p.scentFamily).filter((s) => s && s !== 'Not specified')
    );
    return ['All Scents', ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const priceRange = PRICE_RANGES.find((r) => r.id === priceFilter) || PRICE_RANGES[0];
    const q = norm(searchQuery);

    return products
      .filter((product) => {
        if (!matchesCategory(product, selectedCategory)) return false;

        if (selectedScent !== 'All Scents') {
          if (!norm(product.scentFamily).includes(norm(selectedScent))) return false;
        }

        if (!priceRange.test(product.price)) return false;

        if (q) {
          const haystack = [
            product.title,
            product.description,
            product.scentFamily,
            product.collection,
            product.category,
          ]
            .map(norm)
            .join(' ');
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'bestsellers') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        return 0; // featured = original order
      });
  }, [products, selectedCategory, selectedScent, priceFilter, searchQuery, sortBy]);

  // Helps you spot a menu item that sends a name no product uses
  useEffect(() => {
    if (!loading && products.length > 0 && selectedCategory !== ALL && filteredProducts.length === 0) {
      console.warn('[Shop] No products matched category:', JSON.stringify(selectedCategory));
    }
  }, [loading, products.length, selectedCategory, filteredProducts.length]);

  const handleProductClick = (product) => {
    if (onNavigate) onNavigate('product', { product });
  };

  const clearAllFilters = () => {
    setSelectedCategory(ALL);
    setSelectedScent('All Scents');
    setPriceFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== ALL ||
    selectedScent !== 'All Scents' ||
    priceFilter !== 'all' ||
    searchQuery.trim() !== '';

  if (loading) {
    return (
      <div className="shop-page">
        <div className="shop-container">
          <p className="results-count-banner">Loading products…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      {/* Header Banner */}
      <section className="shop-banner">
        <div className="shop-banner-overlay" />
        <div className="shop-banner-content">
          <h1 className="shop-banner-title">
            {selectedCategory === ALL ? 'Shop All' : selectedCategory}
          </h1>
          <p className="shop-banner-tagline">Handcrafted soy wax candles.</p>
        </div>
      </section>

      <div className="shop-container">
        {/* Top Control Bar */}
        <div className="shop-controls-bar">
          <div className="shop-search-box">
            <Search size={16} className="shop-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
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

            <div className="shop-sort-wrapper">
              <label htmlFor="shop-sort" className="sort-label">Sort:</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="shop-sort-select"
              >
                <option value="featured">Featured</option>
                <option value="bestsellers">Best selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="shop-main-layout">
          {/* Sidebar */}
          <aside className="shop-sidebar">
            <div className="sidebar-header">
              <h3 className="sidebar-title">Filters</h3>
              {hasActiveFilters && (
                <button className="sidebar-reset-btn" onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>

            <div className="filter-group">
              <h4 className="filter-group-title">Collections</h4>
              <ul className="filter-options-list">
                {categoryOptions.map((cat) => (
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

            <div className="filter-group">
              <h4 className="filter-group-title">Fragrance</h4>
              <ul className="filter-options-list">
                {scentOptions.map((scent) => (
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

            <div className="filter-group">
              <h4 className="filter-group-title">Price</h4>
              <ul className="filter-options-list">
                {PRICE_RANGES.map((range) => (
                  <li key={range.id}>
                    <button
                      className={`filter-option-btn ${priceFilter === range.id ? 'active' : ''}`}
                      onClick={() => setPriceFilter(range.id)}
                    >
                      <span>{range.label}</span>
                      {priceFilter === range.id && <Check size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products */}
          <div className="shop-products-container">
            {hasActiveFilters && (
              <div className="active-filters-row">
                <span className="active-filters-label">Active Filters:</span>
                {selectedCategory !== ALL && (
                  <span className="filter-pill">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(ALL)}><X size={12} /></button>
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
                    {PRICE_RANGES.find((r) => r.id === priceFilter)?.label}
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
              <span>Showing <strong>{filteredProducts.length}</strong> of {products.length} products</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <Search size={48} strokeWidth={1} />
                <h3>No products found</h3>
                <p>Try clearing the filters or searching for something else.</p>
                <button className="btn-luxury-cta" onClick={clearAllFilters}>
                  View all products
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
                          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                          aria-label="Wishlist toggle"
                        >
                          <Heart
                            size={16}
                            fill={isWishlisted ? '#0B1C36' : 'none'}
                            stroke={isWishlisted ? '#0B1C36' : '#121212'}
                          />
                        </button>

                        <img
                          src={product.image || PLACEHOLDER_IMAGE}
                          alt={product.title}
                          className="product-img"
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                        />
                        {product.hoverImage && product.hoverImage !== product.image && (
                          <img
                            src={product.hoverImage}
                            alt={`${product.title} alternate`}
                            className="product-img-secondary"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                          />
                        )}

                        <div className="product-card-hover-actions">
                          <button
                            className="card-action-btn quickview-btn"
                            onClick={(e) => { e.stopPropagation(); onQuickView && onQuickView(product); }}
                          >
                            <Eye size={15} />
                            <span>Quick View</span>
                          </button>
                          <button
                            className="card-action-btn quickadd-btn"
                            onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(product, 1); }}
                          >
                            <ShoppingBag size={15} />
                            <span>Quick Add</span>
                          </button>
                        </div>
                      </div>

                      <div className="product-info">
                        <span className="product-collection-label">{product.collection || product.category}</span>
                        <h3 className="product-title" onClick={() => handleProductClick(product)}>
                          {product.title}
                        </h3>

                        {/* Stars only when there are real reviews */}
                        {product.reviewCount > 0 && (
                          <div className="product-rating">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                fill={i < Math.floor(product.rating) ? '#0B1C36' : 'none'}
                                stroke="#0B1C36"
                              />
                            ))}
                            <span className="product-rating-count">({product.reviewCount})</span>
                          </div>
                        )}

                        {product.tagline && <p className="product-card-tagline">{product.tagline}</p>}

                        <div className="product-price-row">
                          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.comparePrice && (
                            <span className="product-price-compare">
                              ₹{product.comparePrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {viewMode === 'list' && (
                          <div className="list-mode-actions">
                            <button className="btn-luxe btn-solid" onClick={() => onAddToCart && onAddToCart(product, 1)}>
                              Add to Bag &bull; ₹{product.price.toLocaleString('en-IN')}
                            </button>
                            <button className="btn-luxe" onClick={() => handleProductClick(product)}>
                              View details &rarr;
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
