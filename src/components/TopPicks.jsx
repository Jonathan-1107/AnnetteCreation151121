import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import wellnessImg from '../assets/wellness_collection.png';
import foundersImg from '../assets/founders_collection.png';
import boutiqueImg from '../assets/boutique_collection.png';
import fallWinterImg from '../assets/fall_winter_collection.png';

export default function TopPicks({ onNavigate, onQuickView, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const seasonalScents = [
    {
      id: 101,
      title: "Pineapple Coconut & Amber",
      category: "Seasonal Limited",
      description: "Sun-drenched golden pineapple, creamy coconut water, and a warm base of amber resin. Captures lingering coastal summer afternoons.",
      image: boutiqueImg,
      hoverImage: wellnessImg,
      price: 1499.00,
      season: "Monsoon & Festive Reserve"
    },
    {
      id: 102,
      title: "Fresh Cut Herbs & Kashmiri Lavender",
      category: "Aromatherapy Reserve",
      description: "Crisp rosemary sprigs, crushed garden thyme, and blooming Kashmiri lavender. Hand-poured to purify your home ambiance.",
      image: wellnessImg,
      hoverImage: foundersImg,
      price: 1399.00,
      season: "All-Year Wellness"
    },
    {
      id: 103,
      title: "Blueberry Cobbler & Vanilla",
      category: "Gourmand Heritage",
      description: "Simmering wild mountain blueberries, baked biscuit crust, and rich Madagascar bourbon vanilla bean.",
      image: fallWinterImg,
      hoverImage: boutiqueImg,
      price: 1599.00,
      season: "Winter Reserve"
    },
    {
      id: 104,
      title: "Sun-Kissed Citrus & Sea Pine",
      category: "Coastal Botanicals",
      description: "Zesty Indian blood orange, salty ocean spray, and sun-warmed coastal pine needles. Bright, energetic, and clean.",
      image: foundersImg,
      hoverImage: fallWinterImg,
      price: 1499.00,
      season: "Spring & Summer"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % seasonalScents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + seasonalScents.length) % seasonalScents.length);
  };

  const current = seasonalScents[currentIndex];

  return (
    <section className="section top-picks-section">
      <div className="top-picks-header">
        <div>
          <span className="section-eyebrow">Seasonal Olfactory Edit</span>
          <h2 className="section-title text-left">Top Picks for the Season</h2>
        </div>
        <div className="top-picks-indicator-group">
          <span className="carousel-counter">0{currentIndex + 1} / 0{seasonalScents.length}</span>
          <div className="carousel-controls">
            <button className="carousel-nav-btn" onClick={handlePrev} aria-label="Previous scent pick">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-nav-btn" onClick={handleNext} aria-label="Next scent pick">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="top-picks-card">
        <div className="top-picks-img-col">
          <div className="top-picks-img-wrapper">
            <img src={current.image} alt={current.title} className="top-picks-main-img" />
            <span className="top-picks-season-tag">{current.season}</span>
          </div>
        </div>

        <div className="top-picks-info-col">
          <span className="top-picks-category">{current.category}</span>
          <h3 className="top-picks-title">{current.title}</h3>
          <p className="top-picks-desc">{current.description}</p>
          
          <div className="top-picks-details">
            <span className="top-picks-price">₹{current.price.toLocaleString('en-IN')}</span>
            <span className="top-picks-spec">100% Pure Soy &bull; 65 Hr Burn</span>
          </div>

          <div className="top-picks-cta-row">
            <button 
              className="btn-luxury-cta"
              onClick={() => onNavigate && onNavigate('shop')}
            >
              Shop This Season &rarr;
            </button>
            <button 
              className="btn-luxury-outline"
              onClick={() => onNavigate && onNavigate('samples')}
            >
              Order Scent Sampler
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
