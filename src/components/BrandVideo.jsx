import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import carousel1Img from '../assets/carousel_1.png';
import carousel2Img from '../assets/carousel_2.png';
import carousel3Img from '../assets/carousel_3.png';
import foundersImg from '../assets/founders_collection.png';

export default function BrandVideo({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: carousel1Img,
      eyebrow: "A Heritage of Botanical Scent",
      title: "Cozy Scents, Crafted with Care.",
      description: "From our early morning hand-pours in the atelier to the warm golden glow illuminating Indian homes, discover the human touch behind every flame.",
      primaryCta: { text: "Explore Our Story →", page: "story" },
      secondaryCta: { text: "Book a Workshop", page: "events" }
    },
    {
      id: 2,
      image: carousel2Img,
      eyebrow: "100% Organic Soy & Botanicals",
      title: "Pure Essential Oils & Clean Burning Luxury.",
      description: "Infused with authentic Indian Mysore sandalwood, Kashmiri lavender, and wild mogra jasmine. 100% natural, soot-free, and non-toxic.",
      primaryCta: { text: "Shop All Candles →", page: "shop" },
      secondaryCta: { text: "Discovery Scent Flight", page: "samples" }
    },
    {
      id: 3,
      image: carousel3Img,
      eyebrow: "Bespoke Atelier Creations",
      title: "Curated for Signature Spaces & Celebrations.",
      description: "Tailored olfactory identities for luxury hotels, private residences, festive gifting, and bespoke Indian wedding celebrations.",
      primaryCta: { text: "Private Label Inquiries →", page: "private-label" },
      secondaryCta: { text: "Corporate Gifting", page: "events" }
    },
    {
      id: 4,
      image: foundersImg,
      eyebrow: "The Master Chandler Process",
      title: "Slow-Cured to Olfactory Perfection.",
      description: "Each small batch is cured for 14 days in our atelier to guarantee an exquisite, even hot throw and lasting sensory warmth.",
      primaryCta: { text: "View Atelier Reserve →", page: "shop" },
      secondaryCta: { text: "Scent Journal", page: "media" }
    }
  ];

  // Auto-play carousel timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSlideSelect = (idx) => {
    setCurrentSlide(idx);
  };

  return (
    <section 
      className="brand-story-carousel-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Brand Story Carousel"
    >
      <div className="carousel-viewport">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div 
              key={slide.id} 
              className={`carousel-slide-item ${isActive ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
            >
              <div className="carousel-slide-overlay" />
              
              <div className="carousel-slide-content">
                <span className="carousel-slide-eyebrow">
                  <Sparkles size={13} className="carousel-sparkle-icon" />
                  {slide.eyebrow}
                </span>
                
                <h2 className="carousel-slide-title">{slide.title}</h2>
                
                <p className="carousel-slide-description">
                  {slide.description}
                </p>
                
                <div className="carousel-cta-group">
                  <button 
                    className="btn-luxury-cta" 
                    onClick={() => onNavigate && onNavigate(slide.primaryCta.page)}
                  >
                    {slide.primaryCta.text}
                  </button>
                  <button 
                    className="btn-luxury-outline carousel-btn-outline"
                    onClick={() => onNavigate && onNavigate(slide.secondaryCta.page)}
                  >
                    {slide.secondaryCta.text}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button 
          className="carousel-arrow carousel-arrow-prev" 
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          className="carousel-arrow carousel-arrow-next" 
          onClick={handleNext}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Indicator Dots with Active Progress */}
        <div className="carousel-dots-wrapper">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot-btn ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => handleSlideSelect(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="carousel-dot-fill" />
            </button>
          ))}
        </div>

        {/* Slide Counter Indicator */}
        <div className="carousel-counter-badge">
          <span>0{currentSlide + 1}</span>
          <span className="counter-divider">/</span>
          <span>0{slides.length}</span>
        </div>
      </div>
    </section>
  );
}
