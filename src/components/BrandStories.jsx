import React from 'react';
import foundersImg from '../assets/founders_collection.png';
import wellnessImg from '../assets/wellness_collection.png';

export default function BrandStories({ onNavigate }) {
  return (
    <section className="section brand-stories-section" id="story">
      <div className="section-intro">
        <span className="section-eyebrow">The Annette Pure Standard</span>
        <h2 className="section-title">Our Craft & Philosophy</h2>
      </div>

      <div className="stories-grid">
        
        {/* 13. Craftsmanship */}
        <div className="story-card">
          <div className="story-img-wrap">
            <img src={foundersImg} alt="Small-Batch Artisan Craftsmanship" className="story-img" />
            <span className="story-badge">Artisan Poured</span>
          </div>
          <div className="story-content">
            <span className="story-eyebrow">Small-Batch Dedication</span>
            <h3 className="story-title">Crafted with Intention, Not Mass Produced.</h3>
            <p className="story-body">
              Every single Annette Pure candle is hand-poured in micro-batches of twelve. We meticulously monitor pour temperatures, hand-set each braided cotton wick, and allow every candle to cure naturally for two weeks before packaging.
            </p>
            <button 
              className="btn-luxe" 
              onClick={() => onNavigate && onNavigate('story')}
            >
              Read Our Story &rarr;
            </button>
          </div>
        </div>

        {/* 14. Philosophy */}
        <div className="story-card">
          <div className="story-img-wrap">
            <img src={wellnessImg} alt="The Art of Mindful Ambiance" className="story-img" />
            <span className="story-badge">Botanical Science</span>
          </div>
          <div className="story-content">
            <span className="story-eyebrow">The Art of Intention</span>
            <h3 className="story-title">Purity You Can Breathe In Peace.</h3>
            <p className="story-body">
              We reject cheap paraffin fillers, synthetic dyes, and harsh chemical stabilizers. Our clean promise guarantees 100% biodegradable natural botanical soy wax, lead-free cotton wicks, and pure essential oil fragrance blends.
            </p>
            <button 
              className="btn-luxe"
              onClick={() => onNavigate && onNavigate('shop', { category: 'Wellness' })}
            >
              Shop Clean Scents &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
