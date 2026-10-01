import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PLACEHOLDER_IMAGE = '/placeholder.svg';

export default function BrandStories({ onNavigate }) {
  const [images, setImages] = useState([]);

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

      const matches = data
        .filter((p) => p.categories?.collections?.name === 'Fragrance Glass Bottles')
        .map((p) => p.image_url);

      setImages(matches);
    }
    fetchImages();
  }, []);

  const img1 = images[0] || PLACEHOLDER_IMAGE;
  const img2 = images[1] || images[0] || PLACEHOLDER_IMAGE;

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
            <img
              src={img1}
              alt="Small-Batch Artisan Craftsmanship"
              className="story-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
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
            <img
              src={img2}
              alt="The Art of Mindful Ambiance"
              className="story-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
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
              onClick={() => onNavigate && onNavigate('shop', { category: 'Fragrance Glass Bottles' })}
            >
              Shop Clean Scents &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}