import React, { useState } from 'react';
import { Calendar, Users, Gift, Sparkles, Check, Send, Award, Clock } from 'lucide-react';
import foundersImg from '../assets/founders_collection.png';
import boutiqueImg from '../assets/boutique_collection.png';
import privateLabelImg from '../assets/private_label_services.png';

export default function EventsPage({ initialTab = 'corporate', onNavigate }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'corporate');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    eventType: 'Corporate Team Workshop',
    guestCount: '10 - 25 Guests',
    date: '',
    location: 'Mumbai Flagship Atelier',
    customLids: true,
    budget: '₹50,000 - ₹1,50,000',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="events-page">
      
      {/* Hero Section */}
      <section 
        className="events-hero"
        style={{ backgroundImage: `url(${foundersImg})` }}
      >
        <div className="events-hero-overlay" />
        <div className="events-hero-content">
          <span className="events-eyebrow">Atelier Experiences & Custom Gifting</span>
          <h1 className="events-title">Private Events & Candle Workshops</h1>
          <p className="events-tagline">
            Gather your team, celebrate life's milestones, or delight VIP clients with bespoke hands-on candle-making workshops and luxury gifting concierge.
          </p>
          <a href="#event-booking" className="btn-luxury-cta">
            Inquire About Your Event &rarr;
          </a>
        </div>
      </section>

      {/* Services Tabs / Category Cards */}
      <section className="section events-offerings-section" id="workshops">
        <div className="section-intro">
          <span className="section-eyebrow">Our Three Signature Formats</span>
          <h2 className="section-title">Experiences & Gifting</h2>
        </div>

        <div className="events-grid-3">
          
          {/* Card 1: Corporate Workshops */}
          <div className={`event-offering-card ${activeTab === 'corporate' ? 'highlighted' : ''}`} onClick={() => setActiveTab('corporate')}>
            <div className="event-icon-circle">
              <Users size={24} />
            </div>
            <span className="event-card-tag">Team Building & Retreats</span>
            <h3 className="event-card-title">Corporate Scent Workshops</h3>
            <p className="event-card-desc">
              Foster team creativity and wellness with a 2-hour guided fragrance formulation and pouring session led by our master chandlers.
            </p>
            <ul className="event-perks-list">
              <li>&bull; Each guest pours a custom 11 oz soy candle</li>
              <li>&bull; Custom company branded labels & lids</li>
              <li>&bull; Hosted at our Mumbai/Bengaluru atelier or on-site at your venue</li>
            </ul>
          </div>

          {/* Card 2: Corporate Gifting */}
          <div className={`event-offering-card ${activeTab === 'gifting' ? 'highlighted' : ''}`} onClick={() => setActiveTab('gifting')}>
            <div className="event-icon-circle">
              <Gift size={24} />
            </div>
            <span className="event-card-tag">VIP & Client Appreciation</span>
            <h3 className="event-card-title">Corporate Gifting Concierge</h3>
            <p className="event-card-desc">
              Elevate executive gifting with bespoke candles featuring custom laser-engraved brass lids, handwritten wax-sealed notes, and multi-address Pan-India fulfillment.
            </p>
            <ul className="event-perks-list">
              <li>&bull; Volume tiered pricing (25 to 5,000+ units)</li>
              <li>&bull; White-glove direct doorstep shipping across India</li>
              <li>&bull; Dedicated gifting concierge project manager</li>
            </ul>
          </div>

          {/* Card 3: Private Celebrations */}
          <div className={`event-offering-card ${activeTab === 'private' ? 'highlighted' : ''}`} onClick={() => setActiveTab('private')}>
            <div className="event-icon-circle">
              <Sparkles size={24} />
            </div>
            <span className="event-card-tag">Celebrations & Gatherings</span>
            <h3 className="event-card-title">Private Celebrations & Bridal</h3>
            <p className="event-card-desc">
              Create unforgettable memories for bridal celebrations, milestone birthdays, and private dinner parties with custom candle-making and sensory pairing.
            </p>
            <ul className="event-perks-list">
              <li>&bull; Intimate private atelier buyout options</li>
              <li>&bull; Custom scent naming for wedding favors</li>
              <li>&bull; Complimentary welcome toast included</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Workshop Gallery & Details Strip */}
      <section className="events-highlight-strip">
        <div className="events-highlight-container">
          <div className="events-highlight-img">
            <img src={boutiqueImg} alt="Workshop table in experiential atelier" />
          </div>
          <div className="events-highlight-text">
            <span className="section-eyebrow">What's Included</span>
            <h2 className="events-highlight-heading">The Master Chandler Workshop Experience</h2>
            
            <div className="workshop-feature-item">
              <strong>1. The Olfactory Scent Bar:</strong>
              <p>Explore over 30 pure botanical oils and raw aroma isolates, learning how top, heart, and base notes harmonize.</p>
            </div>
            <div className="workshop-feature-item">
              <strong>2. Artisan Hand-Pouring:</strong>
              <p>Hand-wick your chosen vessel and pour 100% natural organic soy wax at precision temperatures.</p>
            </div>
            <div className="workshop-feature-item">
              <strong>3. Custom Naming & Packaging:</strong>
              <p>Create a bespoke name for your candle, hand-label your piece, and receive an embossed keepsake box.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Event & Gifting Inquiry Form */}
      <section className="section event-form-section" id="event-booking">
        <div className="event-form-container">
          
          <div className="event-form-header">
            <span className="section-eyebrow">Reserve Your Date</span>
            <h2 className="section-title">Request Event Proposal & Date Availability</h2>
            <p className="event-form-subtext">
              Share details about your gathering or gifting project. Our events director will respond with a tailored itinerary and quote within 24 hours.
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
                  <label>Experience Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Corporate Team Workshop">Corporate Team Workshop</option>
                    <option value="Corporate Gifting Project">Corporate Gifting Concierge</option>
                    <option value="Bridal Shower / Celebration">Private Bridal / Celebration</option>
                    <option value="Private Atelier Buyout">Full Atelier Buyout (VIP Event)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Guest / Unit Count</label>
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
                  <label>Target Date</label>
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
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-select"
                  >
                    <option value="Mumbai Flagship Atelier (Altamount Road)">Mumbai Flagship Atelier (Altamount Road)</option>
                    <option value="Bengaluru Experiential Studio (Indiranagar)">Bengaluru Experiential Studio (Indiranagar)</option>
                    <option value="Client Venue / Office (Pan-India Travel)">Client Venue / Office (Pan-India Travel)</option>
                    <option value="Virtual Workshop with Shipped Kits">Virtual Workshop with Shipped DIY Kits</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Estimated Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="form-select"
                  >
                    <option value="₹25,000 - ₹75,000">₹25,000 &mdash; ₹75,000</option>
                    <option value="₹75,000 - ₹2,00,000">₹75,000 &mdash; ₹2,00,000</option>
                    <option value="₹2,00,000+">₹2,00,000+ (Custom Luxury Program)</option>
                  </select>
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
