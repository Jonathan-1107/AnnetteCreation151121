import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Heart, X, ChevronDown, ChevronRight } from 'lucide-react';

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
  const [mobileExpandedNested, setMobileExpandedNested] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
        { 
          name: 'Christmas Festive Lights', 
          page: 'shop', 
          category: 'Christmas Festive Lights',
          children: [
            { name: 'Christmas Advent', page: 'shop', category: 'Christmas Advent' },
            { name: 'Themed Christmas Tin ', page: 'shop', category: 'Christmas Tin' },
            { name: 'Christmas Tree Shape Mold', page: 'shop', category: 'Christmas Tree Shaped Mold' }
          ]
        },
        { 
          name: 'Tealights', 
          page: 'shop', 
          category: 'Tealights',
          children: [
            { name: 'Rose', page: 'shop', category: 'Rose Tealight' },
            { name: 'Small Shaped', page: 'shop', category: 'Shaped Tealight' }
          ]
        },
        { 
          name: 'Handcrafted Fragrance Candles', 
          page: 'shop', 
          category: 'Handcrafted Fragrance Candles',
          children: [
            { name: 'Matkas, Terracotta Diyas & Clay Handicraft', page: 'shop', category: 'Clay Handicraft' },
            { name: 'Lotus Ceramic', page: 'shop', category: 'Lotus Ceramic' }
          ]
        },
        { 
          name: 'Molded Candles (Red, Any Color)', 
          page: 'shop', 
          category: 'Molded Candles',
          children: [
            { name: 'Pillar Candles (Love Embossed, Plain, Zig-Zag, Diamond, Marble)', page: 'shop', category: 'Pillar Candles' },
            { name: 'Gothic Krafted (Artisan Regal, Red Line Pattern)', page: 'shop', category: 'Gothic Krafted' },
            { name: 'Floral Design (Rose, Christmas Tree, Daisy)', page: 'shop', category: 'Floral Design' },
            { name: 'Striped Candles (Rectangular, Circular)', page: 'shop', category: 'Striped Candles' }
          ]
        },
        { 
          name: 'Holistic Candles', 
          page: 'shop', 
          category: 'Holistic Candles',
          children: [
            { name: 'Long Embroidered Candles', page: 'shop', category: 'Long Embroidered Candles' }
          ]
        }
      ]
    },
    { 
      name: 'Fragrance Glass Bottles', 
      page: 'shop', 
      category: 'Fragrance Glass Bottles',
      dropdown: [
        { name: 'Glass Jars (Green & Red, Gold Interior)', page: 'shop', category: 'Glass Jars Gold Interior' },
        { name: 'Brown (Matte and Clear)', page: 'shop', category: 'Brown Glass' },
        { name: 'White Glasses', page: 'shop', category: 'White Glasses' },
        { name: 'Clear Glasses', page: 'shop', category: 'Clear Glasses' }
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
},
    { name: 'Sample Fragrances', page: 'samples' },
    { name: 'Festive Collections', page: 'shop', category: 'Festive' },
    { name: 'Our Story', page: 'story' }
  ];

  const handleNavClick = (page, category = null, tab = null) => {
    if (onNavigate) {
      onNavigate(page, { category, tab });
    }
    setMobileMenuOpen(false);
    setMobileExpandedDropdown(null);
    setMobileExpandedNested(null);
  };

  const toggleMobileDropdown = (name) => {
    setMobileExpandedDropdown((prev) => (prev === name ? null : name));
    setMobileExpandedNested(null);
  };

  const toggleMobileNested = (name) => {
    setMobileExpandedNested((prev) => (prev === name ? null : name));
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
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
                          <li 
                            key={sub.name} 
                            className={`dropdown-item ${sub.children ? 'has-nested' : ''}`}
                          >
                            <button 
                              className="dropdown-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavClick(sub.page, sub.category, sub.tab);
                              }}
                            >
                              <span className="dropdown-link-text">{sub.name}</span>
                              {sub.children ? (
                                <ChevronRight size={14} className="nested-chevron" />
                              ) : sub.badge ? (
                                <span className="dropdown-link-badge">{sub.badge}</span>
                              ) : null}
                            </button>

                            {sub.children && (
                              <ul className="nav-nested-dropdown">
                                {sub.children.map((child) => (
                                  <li key={child.name} className="dropdown-item">
                                    <button
                                      className="dropdown-link"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavClick(child.page, child.category);
                                      }}
                                    >
                                      <span className="dropdown-link-text">{child.name}</span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
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
                        {nav.dropdown.map((sub) => {
                          const isNestedOpen = mobileExpandedNested === sub.name;
                          return (
                            <li key={sub.name} className="mobile-subitem">
                              <div className="mobile-nav-link-row">
                                <button 
                                  className="mobile-sublink"
                                  onClick={() => {
                                    if (sub.children) {
                                      toggleMobileNested(sub.name);
                                    } else {
                                      handleNavClick(sub.page, sub.category, sub.tab);
                                    }
                                  }}
                                >
                                  <span>{sub.name}</span>
                                </button>
                                {sub.children && (
                                  <button
                                    className="mobile-expand-btn"
                                    onClick={() => toggleMobileNested(sub.name)}
                                    aria-label="Expand nested menu"
                                  >
                                    <ChevronDown
                                      size={14}
                                      style={{
                                        transform: isNestedOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.25s ease'
                                      }}
                                    />
                                  </button>
                                )}
                              </div>

                              {sub.children && isNestedOpen && (
                                <ul className="mobile-nested-submenu">
                                  {sub.children.map((child) => (
                                    <li key={child.name} className="mobile-subitem">
                                      <button
                                        className="mobile-sublink mobile-nested-link"
                                        onClick={() => handleNavClick(child.page, child.category)}
                                      >
                                        {child.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
