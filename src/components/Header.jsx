import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown } from 'lucide-react';

export default function Header({ 
  cartCount = 0, 
  wishlistCount = 0,
  onCartOpen, 
  onSearchOpen,
  currentPage = 'home',
  onNavigate 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to trigger transparent-to-solid transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Candles', 
      page: 'shop',
      category: 'All Candles',
      dropdown: [
        { name: "Signature Atelier Reserve", page: 'shop', category: "Signature Atelier", badge: "Signature" },
        { name: "Luxury Collection", page: 'shop', category: "Luxury" },
        { name: "For Him Collection", page: 'shop', category: "For Him" },
        { name: "Wellness & Calm", page: 'shop', category: "Wellness" },
        { name: "Heirloom Artisan", page: 'shop', category: "Heirloom Artisan" },
        { name: "Heirloom Collector Glass", page: 'shop', category: "Heirloom Collector Glass", badge: "Exclusive" },
        { name: "Heirloom Botanical", page: 'shop', category: "Heirloom Botanical" },
        { name: "Discovery Samples", page: 'samples', category: "Samples" },
        { name: "Artisan Accessories", page: 'shop', category: "Accessories" },
        { name: "View All Candles", page: 'shop', category: "All Candles" }
      ]
    },
    { name: 'Private Label', page: 'private-label' },
    { name: 'Sample Fragrances', page: 'samples' },
    { name: 'Boutique', page: 'boutique' },
    { name: 'Our Story', page: 'story' },
    { 
      name: 'Media', 
      page: 'media',
      dropdown: [
        { name: 'Scent Journal (Blog)', page: 'media', tab: 'blog' },
        { name: 'Podcast & Audio', page: 'media', tab: 'podcast' },
        { name: 'Press & Accolades', page: 'media', tab: 'press' }
      ]
    },
    { 
      name: 'Private Events & Gifting', 
      page: 'events',
      dropdown: [
        { name: 'Corporate Workshops', page: 'events', tab: 'corporate' },
        { name: 'Corporate Gifting Concierge', page: 'events', tab: 'gifting' },
        { name: 'Private Candle Workshops', page: 'events', tab: 'private' }
      ]
    }
  ];

  const handleNavClick = (page, category = null, tab = null) => {
    if (onNavigate) {
      onNavigate(page, { category, tab });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (name) => {
    setMobileExpandedDropdown(prev => prev === name ? null : name);
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
        {/* Left Side: Burger Menu + Brand Divider + Logo */}
        <div className="header-logo-group">
          <button 
            className="icon-btn header-burger-btn mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            title="Menu"
          >
            {mobileMenuOpen ? (
              <X size={20} />
            ) : (
              <span className="burger-icon-lines" aria-hidden="true">
                <span className="burger-line line-1"></span>
                <span className="burger-line line-2"></span>
                <span className="burger-line line-3"></span>
              </span>
            )}
          </button>

          <div className="header-brand-divider" aria-hidden="true" />
          
          <button 
            onClick={() => handleNavClick('home')} 
            className="header-logo-container"
            aria-label="Annette Pure Home"
          >
            <div className="logo-monogram-mark" aria-hidden="true">
              <span className="logo-script-accent">A</span>
            </div>
            <div className="logo-text-group">
              <span className="logo-wordmark">ANNETTE PURE</span>
              <span className="logo-submark">HANDMADE SOY CANDLES</span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar with Smooth Chevrons & Glassmorphic Dropdowns */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-menu">
            {navLinks.map((nav) => {
              const isActive = currentPage === nav.page;
              return (
                <li 
                  className={`nav-item ${isActive ? 'active' : ''} ${nav.dropdown ? 'has-dropdown' : ''}`} 
                  key={nav.name}
                >
                  <button 
                    className="nav-link-btn"
                    onClick={() => handleNavClick(nav.page, nav.category)}
                  >
                    <span>{nav.name}</span>
                    {nav.dropdown && (
                      <ChevronDown size={11} className="nav-dropdown-chevron" />
                    )}
                  </button>
                  
                  {nav.dropdown && (
                    <div className="nav-dropdown-wrapper">
                      <ul className="nav-dropdown">
                        {nav.dropdown.map((sub) => (
                          <li key={sub.name} className="dropdown-item">
                            <button 
                              className="dropdown-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavClick(sub.page, sub.category, sub.tab);
                              }}
                            >
                              <span className="dropdown-link-text">{sub.name}</span>
                              {sub.badge && (
                                <span className="dropdown-link-badge">{sub.badge}</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Side Actions: Search, Wishlist, Account, Cart + Luxury Shop Now CTA */}
        <div className="header-actions">
          <div className="header-icons">
            <button 
              className="icon-btn" 
              onClick={onSearchOpen} 
              aria-label="Search collection"
              title="Search collection"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            
            <button 
              className="icon-btn" 
              onClick={() => handleNavClick('account', null, 'wishlist')} 
              aria-label="Your wishlist"
              title="Wishlist"
            >
              <Heart size={19} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="icon-badge wishlist-badge">{wishlistCount}</span>
              )}
            </button>

            <button 
              className="icon-btn" 
              onClick={() => handleNavClick('account')} 
              aria-label="Customer account portal"
              title="My Account"
            >
              <User size={19} strokeWidth={1.5} />
            </button>

            <button 
              className="icon-btn cart-btn-trigger" 
              onClick={onCartOpen} 
              aria-label="Shopping bag"
              title="Shopping Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="icon-badge cart-count-badge">{cartCount}</span>
              )}
            </button>
          </div>

          <button 
            onClick={() => handleNavClick('shop')} 
            className="btn-luxury-cta header-shop-btn"
          >
            Shop Now
          </button>
        </div>

      </div>

      {/* Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-menu" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-inner" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-tagline">Handcrafted Luxury Scents</span>
              <button 
                className="icon-btn" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <button 
                  className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </button>
              </li>

              {navLinks.map((nav) => {
                const isExpanded = mobileExpandedDropdown === nav.name;
                return (
                  <li key={nav.name} className="mobile-nav-item">
                    <div className="mobile-nav-link-row">
                      <button 
                        className={`mobile-nav-link ${currentPage === nav.page ? 'active' : ''}`}
                        onClick={() => {
                          if (!nav.dropdown) {
                            handleNavClick(nav.page, nav.category);
                          } else {
                            toggleMobileDropdown(nav.name);
                          }
                        }}
                      >
                        {nav.name}
                      </button>
                      {nav.dropdown && (
                        <button 
                          className="mobile-expand-btn"
                          onClick={() => toggleMobileDropdown(nav.name)}
                          aria-label="Expand submenu"
                        >
                          <ChevronDown 
                            size={16} 
                            style={{ 
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.25s ease' 
                            }} 
                          />
                        </button>
                      )}
                    </div>

                    {nav.dropdown && isExpanded && (
                      <ul className="mobile-submenu">
                        {nav.dropdown.map((sub) => (
                          <li key={sub.name} className="mobile-subitem">
                            <button 
                              className="mobile-sublink"
                              onClick={() => handleNavClick(sub.page, sub.category, sub.tab)}
                            >
                              <span>{sub.name}</span>
                              {sub.badge && <span className="mobile-badge">{sub.badge}</span>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mobile-drawer-footer">
              <button 
                className="btn-luxe btn-solid mobile-shop-all-btn"
                onClick={() => handleNavClick('shop')}
              >
                Explore Full Collection
              </button>
              
              <div className="mobile-footer-links">
                <button onClick={() => handleNavClick('account')}>My Account</button>
                <span>&bull;</span>
                <button onClick={() => handleNavClick('contact')}>Help & FAQ</button>
                <span>&bull;</span>
                <button onClick={() => handleNavClick('boutique')}>Store Hours</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
