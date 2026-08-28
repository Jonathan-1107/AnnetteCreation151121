import React from 'react';
import wellnessImg from '../assets/wellness_collection.png';
import foundersImg from '../assets/founders_collection.png';
import boutiqueImg from '../assets/boutique_collection.png';

export default function CategoryGrid({ onNavigate }) {
  const categories = [
    {
      name: "Wellness Collection",
      tagline: "Calming Kashmiri lavender, coconut & restorative botanicals",
      image: wellnessImg,
      page: "shop",
      category: "Wellness"
    },
    {
      name: "Signature Atelier Reserve",
      tagline: "Himalayan cedarwood, smoked amber & Mysore sandalwood",
      image: foundersImg,
      page: "shop",
      category: "Signature Atelier"
    },
    {
      name: "Boutique Luxury Reserve",
      tagline: "Hand-blown vessels, ocean mist & night-blooming jasmine",
      image: boutiqueImg,
      page: "shop",
      category: "Luxury"
    }
  ];

  return (
    <section className="section category-section">
      <div className="section-intro">
        <span className="section-eyebrow">Curated Olfactory Realms</span>
        <h2 className="section-title">Shop by Collection</h2>
      </div>
      
      <div className="category-grid">
        {categories.map((cat, i) => (
          <div className="category-card" key={i} onClick={() => onNavigate && onNavigate(cat.page, { category: cat.category })}>
            <img src={cat.image} alt={cat.name} className="category-img" />
            <div className="category-overlay">
              <span className="category-tagline">{cat.tagline}</span>
              <h3 className="category-name">{cat.name}</h3>
              <button 
                className="btn-luxe category-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigate) onNavigate(cat.page, { category: cat.category });
                }}
              >
                Explore Collection &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
