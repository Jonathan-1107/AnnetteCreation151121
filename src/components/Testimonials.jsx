import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const scrollRef = useRef(null);

  const reviews = [
    {
      name: "Verified Patron • South Mumbai",
      stars: 5,
      quote: "Forest Ave. fills my large living room with a rich Himalayan woodsy scent without being overwhelming. Best soy candle I've ever owned in India."
    },
    {
      name: "Aromatherapy Collector • Bengaluru",
      stars: 5,
      quote: "The Wellness Collection is a staple in my bedtime ritual. Purity and calm in a beautiful frosted ceramic jar. I reorder monthly without fail."
    },
    {
      name: "Luxury Hospitality Director • Goa",
      stars: 5,
      quote: "Ordered custom bespoke gifts through their Private Label atelier. The client feedback was extraordinary. Exceptional quality, natural wax, and packaging."
    },
    {
      name: "Verified Buyer • New Delhi",
      stars: 5,
      quote: "Cleanest burning candle ever. I have sensitive allergies, and ANNETTE PURE candles never trigger them. Pure botanical essential oils make all the difference."
    },
    {
      name: "Interior Stylist • Hyderabad",
      stars: 5,
      quote: "Layne is the most uplifting coastal fragrance. The jasmine and white tea notes smell incredibly natural, never synthetic."
    },
    {
      name: "Verified Collector • Pune",
      stars: 5,
      quote: "Stunning aesthetics! The amber jars look beautiful on my bookshelves, and the scent lingers gently in the room long after extinguishing."
    },
    {
      name: "Verified Patron • Chennai",
      stars: 5,
      quote: "Incredible craftsmanship. The wooden accents and natural soy wicks show their attention to detail. Worth every single rupee."
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 350 : scrollLeft + 350;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="carousel-header">
        <h2 className="section-title">Love From Our Customers</h2>
        <div className="carousel-controls">
          <button className="carousel-nav-btn" onClick={() => scroll('left')} aria-label="Previous reviews">
            <ChevronLeft size={20} />
          </button>
          <button className="carousel-nav-btn" onClick={() => scroll('right')} aria-label="Next reviews">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-wrapper" style={{ marginTop: '30px' }}>
        <div className="carousel-track" ref={scrollRef} style={{ gap: '20px' }}>
          {reviews.map((rev, i) => (
            <div className="testimonial-card" key={i}>
              <div>
                <div className="testimonial-stars">
                  {[...Array(rev.stars)].map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">"{rev.quote}"</p>
              </div>
              <span className="testimonial-author">{rev.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
