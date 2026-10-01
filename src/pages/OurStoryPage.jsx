import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PLACEHOLDER_IMAGE = '/placeholder.svg';

// Pick n random, distinct images from an array
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function OurStoryPage({ onNavigate }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase
        .from('products')
        .select('image_url')
        .not('image_url', 'is', null);

      if (error) {
        console.error(error);
        return;
      }
      const urls = data.map((p) => p.image_url).filter(Boolean);
      setImages(pickRandom(urls, 5));
    }
    fetchImages();
  }, []);

  const heroImg = images[0] || PLACEHOLDER_IMAGE;
  const founderImg = images[1] || images[0] || PLACEHOLDER_IMAGE;
  const galleryImgs = [
    images[2] || images[0] || PLACEHOLDER_IMAGE,
    images[3] || images[1] || PLACEHOLDER_IMAGE,
    images[4] || images[0] || PLACEHOLDER_IMAGE
  ];

  return (
    <div className="story-page">

      {/* Hero Section — static wide image */}
      <section
        className="story-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="story-hero-overlay" />
        <div className="story-hero-content">
          <span className="story-hero-eyebrow">The Annette Pure Story</span>
          <h1 className="story-hero-title">Responsible Indulgence, Beautifully Poured</h1>
          <p className="story-hero-tagline">
            An eco-friendly candle brand merging sustainability with sophistication, offering a guilt-free escape into luxury.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section founder-letter-section">
        <div className="founder-letter-container">

          <div className="founder-img-col">
            <div className="founder-img-frame">
              <img
                src={founderImg}
                alt="Annette Pure Handcrafted Candle"
                className="founder-portrait"
                onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
              />
              <div className="founder-frame-badge">Hand-Poured, Always</div>
            </div>
          </div>

          <div className="founder-text-col">
            <span className="section-eyebrow">Our Philosophy</span>
            <h2 className="founder-heading">"True luxury need not compromise conscience."</h2>

            <p className="founder-p">
              In a world increasingly conscious of environmental impact, Annette Pure emerges as a beacon of responsible indulgence. This eco-friendly candle brand transcends the ordinary by merging sustainability with sophistication, offering consumers a guilt-free escape into luxury.
            </p>
            <p className="founder-p">
              At Annette Pure's core lies an unwavering commitment to purity. Each candle is meticulously crafted from <strong>100% soy wax</strong>—a renewable, plant-based alternative that burns cleaner and longer than traditional paraffin. Paired with premium essential oil fragrances, every product delivers an authentic olfactory experience untainted by synthetic additives or harmful parabens.
            </p>
            <p className="founder-p">
              The brand's dedication to safety extends throughout its design. Cotton wicks ensure a steady, non-toxic burn, while the carefully curated color palette reflects both aesthetic appeal and natural pigmentation.
            </p>
            <p className="founder-p">
              Annette Pure's collection caters to diverse preferences—from elegantly housed glass jar candles that serve as décor pieces, to festive limited editions and intricately moulded designs. There's an Annette Pure creation for every occasion and mood.
            </p>
            <p className="founder-p">
              Yet sustainability isn't sacrificed for presentation. Luxurious, thoughtfully designed packaging protects products while minimizing environmental footprint—every element deliberate, every choice conscious.
            </p>

            <div className="founder-signature-block">
              <span className="founder-signature-text">Annette Pure</span>
              <span className="founder-title-text">Responsible Luxury, Hand-Poured in India</span>
            </div>
          </div>

        </div>
      </section>

      {/* The 4 Core Pillars of Purity */}
      <section className="section story-pillars-section">
        <div className="section-intro">
          <span className="section-eyebrow">Our Uncompromising Standards</span>
          <h2 className="section-title">The Four Pillars of Annette Pure</h2>
        </div>

        <div className="story-pillars-grid">

          <div className="pillar-card">
            <div className="pillar-num">01</div>
            <h3 className="pillar-title">100% Soy Wax</h3>
            <p className="pillar-desc">
              A renewable, plant-based alternative that burns cleaner and longer than traditional paraffin.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-num">02</div>
            <h3 className="pillar-title">Pure Cotton Wicks</h3>
            <p className="pillar-desc">
              Ensures a steady, non-toxic burn with zero synthetic soot or harmful residue.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-num">03</div>
            <h3 className="pillar-title">Premium Essential Oils</h3>
            <p className="pillar-desc">
              An authentic olfactory experience, free from synthetic additives and harmful parabens.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-num">04</div>
            <h3 className="pillar-title">Conscious Packaging</h3>
            <p className="pillar-desc">
              Thoughtfully designed to protect every product while minimizing environmental footprint.
            </p>
          </div>

        </div>
      </section>

      {/* Gallery */}
      <section className="section story-gallery-section">
        <div className="section-intro">
          <span className="section-eyebrow">Behind the Scenes</span>
          <h2 className="section-title">Crafted with Intention</h2>
        </div>

        <div className="story-gallery-grid">
          <div className="gallery-item large">
            <img
              src={galleryImgs[0]}
              alt="Hand-Poured Soy Wax Candle"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <div className="gallery-caption">100% Soy Wax, Hand-Poured</div>
          </div>
          <div className="gallery-item">
            <img
              src={galleryImgs[1]}
              alt="Pure Botanical Fragrance"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <div className="gallery-caption">Pure Botanical Fragrance</div>
          </div>
          <div className="gallery-item">
            <img
              src={galleryImgs[2]}
              alt="Finished Heirloom Vessels"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <div className="gallery-caption">Thoughtfully Packaged</div>
          </div>
        </div>

        <div className="story-cta-box">
          <h3>Experience the Craft in Your Home</h3>
          <p>Explore our full collection of hand-poured, eco-conscious soy candles.</p>
          <button
            className="btn-luxury-cta"
            onClick={() => onNavigate && onNavigate('shop')}
          >
            Explore The Collection &rarr;
          </button>
        </div>
      </section>

    </div>
  );
}