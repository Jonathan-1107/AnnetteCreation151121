import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const AUTO_ADVANCE_MS = 5000;

export default function TopPicks({ onNavigate, onQuickView, onAddToCart }) {
  const [picks, setPicks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchTopPicks() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, name, description, base_price, image_url,
          categories ( name, collections ( name ) )
        `)
        .eq('is_top_pick', true)
        .limit(4);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const shaped = data.map((p) => ({
        id: p.id,
        title: p.name,
        category: p.categories?.name || '',
        season: p.categories?.collections?.name || '',
        description: p.description || '',
        image: p.image_url || PLACEHOLDER_IMAGE,
        price: p.base_price || 0
      }));

      setPicks(shaped);
      setLoading(false);
    }
    fetchTopPicks();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (picks.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % picks.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [picks.length]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (picks.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % picks.length);
      }, AUTO_ADVANCE_MS);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % picks.length);
    resetTimer();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + picks.length) % picks.length);
    resetTimer();
  };

  if (loading || picks.length === 0) return null;

  const current = picks[currentIndex];

  return (
    <section className="section top-picks-section">
      <div className="top-picks-header">
        <div>
          <span className="section-eyebrow">Seasonal Olfactory Edit</span>
          <h2 className="section-title text-left">Top Picks for the Season</h2>
        </div>
        <div className="top-picks-indicator-group">
          <span className="carousel-counter">0{currentIndex + 1} / 0{picks.length}</span>
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
            <img
              src={current.image}
              alt={current.title}
              className="top-picks-main-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            {current.season && <span className="top-picks-season-tag">{current.season}</span>}
          </div>
        </div>

        <div className="top-picks-info-col">
          <span className="top-picks-category">{current.category}</span>
          <h3 className="top-picks-title">{current.title}</h3>
          <p className="top-picks-desc">{current.description}</p>

          <div className="top-picks-details">
            <span className="top-picks-price">₹{current.price.toLocaleString('en-IN')}</span>
            <span className="top-picks-spec">100% Pure Soy</span>
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