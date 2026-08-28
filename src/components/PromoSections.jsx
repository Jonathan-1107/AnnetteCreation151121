import React from 'react';
import fallWinterImg from '../assets/fall_winter_collection.png';
import boutiqueImg from '../assets/boutique_collection.png';
import wellnessImg from '../assets/wellness_collection.png';

export default function PromoSections({ onNavigate }) {
  return (
    <section className="section promo-sections">
      
      {/* 5.3 Promo Seasonal Full Banner */}
      <div 
        className="seasonal-banner" 
        style={{ backgroundImage: `url(${fallWinterImg})` }}
      >
        <div className="seasonal-overlay" />
        <div className="seasonal-content">
          <span className="seasonal-eyebrow">Festive & Winter Vault</span>
          <h2 className="seasonal-title">Fireside Moments & Spiced Amber</h2>
          <p className="seasonal-desc">
            Wrap your home in rich warmth. Featuring rare Madagascar vanilla, Kerala cinnamon bark, smoky cedarwood, and roasted festive apples.
          </p>
          <button 
            className="btn-luxury-cta"
            onClick={() => onNavigate && onNavigate('shop', { category: 'Heirloom Artisan' })}
          >
            Shop Festive Candles &rarr;
          </button>
        </div>
      </div>

      {/* 5.4 & 5.5 Two Grid Promo Tiles */}
      <div className="promo-tiles-grid" id="tiles">
        
        {/* Tile 1: Boutique */}
        <div className="promo-tile" onClick={() => onNavigate && onNavigate('boutique')}>
          <img src={boutiqueImg} alt="The Flagship Atelier" className="promo-tile-bg" />
          <div className="promo-tile-overlay" />
          <div className="promo-tile-content">
            <span className="promo-tile-tag">Flagship Experience</span>
            <h3 className="promo-tile-title">The Atelier Experience</h3>
            <p className="promo-tile-text">
              Visit our experiential studios in Mumbai & Bengaluru. Experience custom scent pairing consultations and our sustainable vessel refill bar.
            </p>
            <button 
              className="btn-luxury-outline promo-tile-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigate) onNavigate('boutique');
              }}
            >
              Plan Your Visit &rarr;
            </button>
          </div>
        </div>

        {/* Tile 2: Wellness */}
        <div className="promo-tile" onClick={() => onNavigate && onNavigate('shop', { category: 'Wellness' })}>
          <img src={wellnessImg} alt="Wellness Rituals and Aromatherapy" className="promo-tile-bg" />
          <div className="promo-tile-overlay" />
          <div className="promo-tile-content">
            <span className="promo-tile-tag">Mindful Living</span>
            <h3 className="promo-tile-title">Embrace Calm, Embrace Ritual</h3>
            <p className="promo-tile-text">
              Transform your evening routine. Formulated with soothing Kashmiri lavender, chamomile, and non-toxic botanical essences.
            </p>
            <button 
              className="btn-luxury-outline promo-tile-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigate) onNavigate('shop', { category: 'Wellness' });
              }}
            >
              Explore Wellness Scents &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* 11. Section Divider Tagline */}
      <div className="clean-burn-divider">
        <span className="divider-icon">&#10022;</span>
        <blockquote className="divider-quote">
          "Clean burn, full aroma, and a long-lasting sensory experience that honors the sacred space of your home."
        </blockquote>
        <span className="divider-author">&mdash; Master Chandler, Annette Pure Atelier</span>
      </div>

    </section>
  );
}
