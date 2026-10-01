import React, { useState } from 'react';
import { Users, Gift, Sparkles, Check, Send, Compass, Palette, Package, Truck } from 'lucide-react';
import { useRandomProductImages } from '../hooks/useRandomProductImages';

const PLACEHOLDER_IMAGE = '/placeholder.svg';

export default function EventsPage({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    eventType: 'Corporate Gifting',
    guestCount: '10 - 25 Guests',
    date: '',
    location: '',
    budget: '',
    notes: ''
  });

  // Pull 5 random product photos from Supabase for hero + gifting cards + highlight strip
  const { randomImages } = useRandomProductImages(5);
  const heroImage = randomImages[0] || PLACEHOLDER_IMAGE;
  const cardImage1 = randomImages[1] || PLACEHOLDER_IMAGE;
  const cardImage2 = randomImages[2] || PLACEHOLDER_IMAGE;
  const cardImage3 = randomImages[3] || PLACEHOLDER_IMAGE;
  const highlightImage = randomImages[4] || PLACEHOLDER_IMAGE;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="events-page">
      
      {/* Hero Section */}
      <section 
        className="events-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="events-hero-overlay" />
        <div className="events-hero-content">
          <span className="events-eyebrow">Corporate Events</span>
          <h1 className="events-title">Not Just a Candle. An Impression That Lasts.</h1>
          <p className="events-tagline">
            Gather your team, delight your clients, and celebrate milestones with hand-poured soy candles crafted for every corporate occasion.
          </p>
          <a href="#event-booking" className="btn-luxury-cta">
            Inquire About Your Event &rarr;
          </a>
        </div>
      </section>

      {/* Why Candles Work */}
      <section className="section events-why-section">
        <div className="section-intro">
          <span className="section-eyebrow">Why Candles Work</span>
          <h2 className="section-title">The Gift Everyone Remembers</h2>
        </div>

        <div className="events-grid-3">
          <div className="event-offering-card">
            <div className="event-icon-circle">
              <Sparkles size={24} />
            </div>
            <h3 className="event-card-title">Scent Creates Memory</h3>
            <p className="event-card-desc">
              The fragrance of a hand-poured soy candle lingers long after it's opened, keeping your brand and your gesture top of mind.
            </p>
          </div>

          <div className="event-offering-card">
            <div className="event-icon-circle">
              <Gift size={24} />
            </div>
            <h3 className="event-card-title">Universally Loved</h3>
            <p className="event-card-desc">
              Elegant, thoughtful, and never one-size-fits-all — a candle suits every recipient, from clients to colleagues.
            </p>
          </div>

          <div className="event-offering-card">
            <div className="event-icon-circle">
              <Users size={24} />
            </div>
            <h3 className="event-card-title">Sustainable Luxury</h3>
            <p className="event-card-desc">
              Hand-poured in small batches with 100% organic soy wax and non-toxic ingredients — premium that's also responsible.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section events-process-section">
        <div className="section-intro">
          <span className="section-eyebrow">Our Process</span>
          <h2 className="section-title">From Idea to Gift in Four Steps</h2>
        </div>

        <div className="events-grid-4">
          <div className="event-process-step">
            <span className="event-process-num">01</span>
            <div className="event-icon-circle"><Compass size={22} /></div>
            <h3 className="event-card-title">Vision</h3>
            <p className="event-card-desc">Share your goals, audience, and occasion with our events concierge.</p>
          </div>
          <div className="event-process-step">
            <span className="event-process-num">02</span>
            <div className="event-icon-circle"><Palette size={22} /></div>
            <h3 className="event-card-title">Design</h3>
            <p className="event-card-desc">Choose a fragrance and vessel, or let our chandlers create something new.</p>
          </div>
          <div className="event-process-step">
            <span className="event-process-num">03</span>
            <div className="event-icon-circle"><Package size={22} /></div>
            <h3 className="event-card-title">Packaging</h3>
            <p className="event-card-desc">Select custom labels, boxes, and embossed finishes for your gifts.</p>
          </div>
          <div className="event-process-step">
            <span className="event-process-num">04</span>
            <div className="event-icon-circle"><Truck size={22} /></div>
            <h3 className="event-card-title">Delivery</h3>
            <p className="event-card-desc">Ready-to-gift, delivered pan-India on your schedule.</p>
          </div>
        </div>
      </section>

      {/* Tailored to You - Three Signature Formats */}
      <section className="section events-offerings-section" id="workshops">
        <div className="section-intro">
          <span className="section-eyebrow">Tailored to You</span>
          <h2 className="section-title">Our Three Signature Formats</h2>
        </div>

        <div className="events-grid-3">
          
          <div className="event-offering-card">
            <img
              src={cardImage1}
              alt="Corporate Scent Workshops"
              className="event-card-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <span className="event-card-tag">Team Building & Retreats</span>
            <h3 className="event-card-title">Corporate Scent Workshops</h3>
            <p className="event-card-desc">
              A 2-hour guided fragrance formulation and hand-pouring session led by our master chandlers, hosted at our atelier or on-site.
            </p>
          </div>

          <div className="event-offering-card">
            <img
              src={cardImage2}
              alt="Corporate Gifting Concierge"
              className="event-card-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <span className="event-card-tag">VIP & Client Appreciation</span>
            <h3 className="event-card-title">Corporate Gifting Concierge</h3>
            <p className="event-card-desc">
              Bespoke candles with custom lids and wax-sealed notes, with tiered pricing from 25 to 5,000+ units and pan-India fulfillment.
            </p>
          </div>

          <div className="event-offering-card">
            <img
              src={cardImage3}
              alt="Private Celebrations & Bridal"
              className="event-card-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <span className="event-card-tag">Celebrations & Gatherings</span>
            <h3 className="event-card-title">Private Celebrations & Bridal</h3>
            <p className="event-card-desc">
              Custom scent-naming and candle-making for milestone birthdays, bridal celebrations, and private dinner parties.
            </p>
          </div>

        </div>
      </section>

      {/* Workshop Highlight Strip */}
      <section className="events-highlight-strip">
        <div className="events-highlight-container">
          <div className="events-highlight-img">
            <img
              src={highlightImage}
              alt="Master chandler workshop experience"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
          </div>
          <div className="events-highlight-text">
            <span className="section-eyebrow">What's Included</span>
            <h2 className="events-highlight-heading">The Master Chandler Workshop Experience</h2>
            
            <div className="workshop-feature-item">
              <strong>1. The Olfactory Scent Bar:</strong>
              <p>Explore pure botanical oils and raw aroma isolates, learning how top, heart, and base notes harmonize.</p>
            </div>
            <div className="workshop-feature-item">
              <strong>2. Artisan Hand-Pouring:</strong>
              <p>Hand-wick your chosen vessel and pour 100% natural organic soy wax at precision temperatures.</p>
            </div>
            <div className="workshop-feature-item">
              <strong>3. Custom Naming & Packaging:</strong>
              <p>Name your candle, hand-label your piece, and receive an embossed keepsake box.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Close */}
      <section className="events-emotional-close">
        <div className="events-emotional-content">
          <h2 className="events-emotional-title">
            Let's create gifts that last longer than flowers<br />and mean more than a logoed pen.
          </h2>
          <a href="#event-booking" className="btn-luxury-cta">
            Let's Connect &rarr;
          </a>
        </div>
      </section>

      {/* Interactive Event & Gifting Inquiry Form */}
          {/* Interactive Event & Gifting Inquiry Form */}
      <section className="section event-form-section" id="event-booking">
        <div className="event-form-container">
          
          <div className="event-form-header">
            <span className="section-eyebrow">Reserve the Gifting</span>
            <h2 className="section-title">Request for Corporate Event and Gifting</h2>
            <p className="event-form-subtext">
              Share details about your event gifting. Our representative will respond within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="pl-success-card">
              <div className="success-icon-wrap">
                <Check size={36} />
              </div>
              <h3>Event Proposal Requested, {formData.name}!</h3>
              <p>We are thrilled about the opportunity to host your <strong>{formData.eventType}</strong> ({formData.guestCount}).</p>
              <p>Our events concierge will email your proposal and date confirmation to <strong>{formData.email}</strong> shortly.</p>
              <button 
                className="btn-luxury-cta"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="event-inquiry-form">
              
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Event Coordinator"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Company / Organization (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise / Private Host"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="events@company.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Corporate Gifting">Corporate Gifting</option>
                    <option value="Private Celebration">Private Celebration</option>
                    <option value="VIP Event">VIP Event</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>No. of Units</label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="form-select"
                  >
                    <option value="6 - 12 Guests">6 &mdash; 12 Guests (Intimate Table)</option>
                    <option value="12 - 25 Guests">12 &mdash; 25 Guests (Standard Workshop)</option>
                    <option value="25 - 50 Guests">25 &mdash; 50 Guests (Large Group)</option>
                    <option value="50+ Guests / Units">50+ Units / Large Scale</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Preferred Location</label>
                  <textarea
                    rows={3}
                    placeholder="Enter the full address for your event or gifting delivery..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label>Estimated Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 - ₹1,50,000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tell Us About Your Event or Gifting Vision</label>
                <textarea
                  rows={4}
                  placeholder="Share details regarding the occasion, special scent preferences, catering needs, or custom logo lid requests..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn-luxury-cta event-submit-btn">
                <span>Submit Event Inquiry</span>
                <Send size={16} />
              </button>

            </form>
          )}

        </div>
      </section>

    </div>
  );
}