import React from 'react';
import milestoneImg from '../assets/milestone_banner.png';
import foundersImg from '../assets/founders_collection.png';

export default function MilestoneBanner({ onNavigate }) {
  return (
    <section className="section milestone-section">
      <div className="milestone-container">
        
        <div className="milestone-images-side">
          <div className="milestone-img-card primary">
            <img src={milestoneImg} alt="Two Decades of Handcrafting Candles" className="milestone-img" />
          </div>
          <div className="milestone-img-card secondary">
            <img src={foundersImg} alt="Atelier Workshop Heritage" className="milestone-img" />
            <div className="milestone-pill-badge">2004 &mdash; 2026</div>
          </div>
        </div>

        <div className="milestone-text-side">
          <span className="milestone-eyebrow">Our Atelier Milestone</span>
          <h2 className="milestone-title">Over 20 years of intention, purity & craftsmanship.</h2>
          
          <p className="milestone-body">
            What started in 2004 as an intimate search for clean-burning, non-toxic, headache-free candles has blossomed into a premier Indian botanical fragrance maison.
          </p>
          <p className="milestone-body">
            Over the past two decades, our atelier has remained proudly independent, uncompromising on 100% natural organic soy wax, and dedicated to elevating everyday rituals through pure, evocative scent.
          </p>

          <div className="milestone-stats-row">
            <div className="milestone-stat">
              <span className="stat-num">20+</span>
              <span className="stat-label">Years of Master Pouring</span>
            </div>
            <div className="milestone-stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Pure Botanical Soy Wax</span>
            </div>
            <div className="milestone-stat">
              <span className="stat-num">50k+</span>
              <span className="stat-label">Indian Homes Illuminated</span>
            </div>
          </div>

          <div className="milestone-cta-row">
            <button 
              className="btn-luxury-cta"
              onClick={() => onNavigate && onNavigate('story')}
            >
              Discover Our Story &rarr;
            </button>
            <button 
              className="btn-luxury-outline"
              onClick={() => onNavigate && onNavigate('boutique')}
            >
              Visit Our Atelier
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
