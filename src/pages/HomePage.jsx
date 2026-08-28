import React from 'react';
import heroLuxuryImg from '../assets/hero_luxury.png';
import CategoryGrid from '../components/CategoryGrid';
import USPStrip from '../components/USPStrip';
import Bestsellers from '../components/Bestsellers';
import TopPicks from '../components/TopPicks';
import FeatureBlocks from '../components/FeatureBlocks';
import PromoSections from '../components/PromoSections';
import BrandStories from '../components/BrandStories';
import Testimonials from '../components/Testimonials';
import MilestoneBanner from '../components/MilestoneBanner';
import SupportStrip from '../components/SupportStrip';

export default function HomePage({ 
  onQuickView, 
  onAddToCart, 
  onNavigate 
}) {
  return (
    <div className="home-page-view">
      
      {/* 3. Luxury Hero Banner */}
      <section 
        className="hero-section" 
        style={{ backgroundImage: `url(${heroLuxuryImg})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-eyebrow">Handcrafted in India Atelier &bull; 100% Organic Soy</span>
          <h1 className="hero-title">Annette Pure</h1>
          <p className="hero-tagline">
            Elegance translated through pure botanical scent. Hand-poured candles crafted with intention.
          </p>
          <div className="hero-cta-group">
            <button 
              onClick={() => onNavigate('shop')} 
              className="btn-luxury-cta hero-btn-primary"
            >
              Shop All Candles
            </button>
            <button 
              onClick={() => onNavigate('private-label')} 
              className="btn-luxury-outline hero-btn-secondary"
            >
              Start a Private Label Project
            </button>
          </div>
        </div>
      </section>

      {/* 4. Shop by Category (3-column grid) */}
      <CategoryGrid onNavigate={onNavigate} />

      {/* 6. USP icon strip row (4 columns) */}
      <USPStrip />

      {/* 5. Bestsellers carousel (8 products with quick view) */}
      <Bestsellers 
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onNavigate={onNavigate}
      />

      {/* 5 (PARENT). Top Picks for the Season showcase carousel */}
      <TopPicks onNavigate={onNavigate} onQuickView={onQuickView} onAddToCart={onAddToCart} />

      {/* 5.1 & 5.2. Split informational features (Founder's & Private Label) */}
      <FeatureBlocks onNavigate={onNavigate} />

      {/* 5.3 & 5.4 & 5.5. Promo seasonal banner & Boutique/Wellness grid tiles */}
      <PromoSections onNavigate={onNavigate} />

      {/* 13 & 14. Brand Stories (Craftsmanship & Philosophy split columns) */}
      <BrandStories onNavigate={onNavigate} />

      {/* 15. Customer reviews carousel (7 cards) */}
      <Testimonials />

      {/* 16. Anniversary milestone banner (stacked split columns) */}
      <MilestoneBanner onNavigate={onNavigate} />

      {/* 18. Support & trust payment method icons strip */}
      <SupportStrip />

    </div>
  );
}
