import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PLACEHOLDER_IMAGE = '/placeholder.svg';

// Each card maps to one or more real collection names from your Supabase `collections` table
const GROUP_CARDS = [
  {
    name: 'Scented Festive lights',
    tagline: 'Advent sets, tealights & handcrafted fragrance pieces for the season',
    collectionNames: ['Christmas Festive Lights', 'Tealights', 'Handcrafted Fragrance Candles', 'Holistic Candles']
  },
  {
    name: 'Fragrance Premium Glass Jars',
    tagline: 'Hand-finished glass vessels in every tone',
    collectionNames: ['Fragrance Glass Bottles']
  },
  {
    name: 'Molded Fragrance Candles',
    tagline: 'Pillar, gothic, floral, striped & embroidered designs in soy wax',
    collectionNames: ['Molded Candles']
  }
];

export default function CategoryGrid({ onNavigate }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          image_url,
          categories ( collections ( name ) )
        `)
        .not('image_url', 'is', null);

      if (error) {
        console.error(error);
        return;
      }

      const picked = {};
      for (const card of GROUP_CARDS) {
        const match = data.find((p) =>
          card.collectionNames.includes(p.categories?.collections?.name)
        );
        if (match) picked[card.name] = match.image_url;
      }
      setImages(picked);
    }
    fetchImages();
  }, []);

  return (
    <section className="section category-section">
      <div className="section-intro">
        <span className="section-eyebrow">Curated Olfactory Realms</span>
        <h2 className="section-title">Shop by Collection</h2>
      </div>

      <div className="category-grid">
        {GROUP_CARDS.map((cat) => (
          <div
            className="category-card"
            key={cat.name}
            onClick={() => onNavigate && onNavigate('shop', { category: cat.name })}
          >
            <img
              src={images[cat.name] || PLACEHOLDER_IMAGE}
              alt={cat.name}
              className="category-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <div className="category-overlay">
              <span className="category-tagline">{cat.tagline}</span>
              <h3 className="category-name">{cat.name}</h3>
              <button
                className="btn-luxe category-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigate) onNavigate('shop', { category: cat.name });
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