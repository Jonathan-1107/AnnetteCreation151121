import React, { useState } from 'react';
import { MapPin, Clock, Phone, Sparkles, Check, RefreshCw, Gift, Calendar, Send } from 'lucide-react';
import boutiqueImg from '../assets/boutique_collection.png';
import foundersImg from '../assets/founders_collection.png';

export default function BoutiquePage({ onNavigate }) {
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Private Scent Consultation (45 mins)',
    date: '',
    time: '2:00 PM',
    guests: '1 - 2 Guests',
    notes: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const stockists = [
    { city: "Mumbai, Maharashtra", name: "Annette Pure Flagship Atelier", address: "14 Altamount Road & Bandra Studio", phone: "+91 98200 12345", type: "Flagship Atelier" },
    { city: "Bengaluru, Karnataka", name: "Annette Pure Experiential Studio", address: "100ft Road, Indiranagar", phone: "+91 80 4123 4567", type: "Flagship Studio" },
    { city: "New Delhi, NCR", name: "Maison Lux Living", address: "The Kila, Seven Style Mile, Mehrauli", phone: "+91 11 4987 6543", type: "Stockist" },
    { city: "Hyderabad, Telangana", name: "Sanctuary Botanica", address: "Road No. 36, Jubilee Hills", phone: "+91 40 2345 6789", type: "Stockist" },
    { city: "Goa", name: "The Coastal Heritage Pavilion", address: "Badem Junction, Assagao", phone: "+91 832 245 6789", type: "Stockist" },
    { city: "Chennai, Tamil Nadu", name: "Apothecary Guild", address: "TTK Road, Alwarpet", phone: "+91 44 2499 1234", type: "Stockist" }
  ];

  return (
    <div className="boutique-page">
      
      {/* Hero Section */}
      <section 
        className="boutique-hero"
        style={{ backgroundImage: `url(${boutiqueImg})` }}
      >
        <div className="boutique-hero-overlay" />
        <div className="boutique-hero-content">
          <span className="boutique-eyebrow">Flagship Experiential Studios</span>
          <h1 className="boutique-title">The Atelier Experience</h1>
          <p className="boutique-tagline">
            Step into our sunlit experiential studios in Mumbai and Bengaluru. Discover rare fragrance accords, explore our sustainable vessel refill bar, and book a personalized scent consultation.
          </p>
          <a href="#book-appointment" className="btn-luxury-cta">
            Book Scent Consultation &rarr;
          </a>
        </div>
      </section>

      {/* Flagship Info Strip */}
      <div className="boutique-info-strip">
        <div className="info-strip-card">
          <MapPin size={22} className="strip-icon" />
          <div className="strip-content">
            <h4>Flagship Atelier</h4>
            <p>14 Altamount Road, South Mumbai &bull; Indiranagar, Bengaluru</p>
            <span className="strip-sub">Walk-ins welcome &bull; Private appointments available</span>
          </div>
        </div>

        <div className="info-strip-card">
          <Clock size={22} className="strip-icon" />
          <div className="strip-content">
            <h4>Atelier Hours</h4>
            <p>Mon &mdash; Sat: 11:00 AM &ndash; 8:00 PM</p>
            <span className="strip-sub">Sunday: 12:00 PM &ndash; 6:00 PM</span>
          </div>
        </div>

        <div className="info-strip-card">
          <Phone size={22} className="strip-icon" />
          <div className="strip-content">
            <h4>Atelier Concierge</h4>
            <p>+91 98200 12345 / 1800-266-8730</p>
            <span className="strip-sub">concierge@annettepure.in</span>
          </div>
        </div>
      </div>

      {/* In-Store Services Showcase */}
      <section className="section boutique-services-section">
        <div className="section-intro">
          <span className="section-eyebrow">Atelier Offerings</span>
          <h2 className="section-title">Signature In-Store Experiences</h2>
        </div>

        <div className="boutique-services-grid">
          
          <div className="service-card">
            <div className="service-icon-wrap">
              <Sparkles size={24} />
            </div>
            <h3 className="service-title">1-on-1 Scent Consultations</h3>
            <p className="service-desc">
              Sit down with our master olfactory team to discover the fragrance profiles that harmonize with your home architecture, lighting, and daily rituals.
            </p>
            <span className="service-meta">Complimentary with reservation &bull; 45 Mins</span>
          </div>

          <div className="service-card">
            <div className="service-icon-wrap">
              <RefreshCw size={24} />
            </div>
            <h3 className="service-title">The Sustainable Refill Bar</h3>
            <p className="service-desc">
              Bring in your empty Annette Pure vessels (or any luxury glass/ceramic vessel) to be refilled with our organic soy wax for 50% off retail value.
            </p>
            <span className="service-meta">Zero waste &bull; Same day or next day pickup</span>
          </div>

          <div className="service-card">
            <div className="service-icon-wrap">
              <Gift size={24} />
            </div>
            <h3 className="service-title">Bespoke Gift Packaging & Wax Seals</h3>
            <p className="service-desc">
              Every in-store purchase includes complimentary gift wrapping with heavy embossed linen paper, custom wax seals, and personalized calligraphed notes.
            </p>
            <span className="service-meta">Complimentary with every purchase</span>
          </div>

        </div>
      </section>

      {/* Appointment Booking Scheduler Form */}
      <section className="section appointment-section" id="book-appointment">
        <div className="appointment-card-container">
          
          <div className="appointment-header">
            <span className="section-eyebrow">Personalized Attention</span>
            <h2 className="section-title">Schedule an Atelier Visit</h2>
            <p className="appointment-subtext">
              Reserve a private table with our master chandlers to explore customized fragrances, vessel refills, or bridal/corporate gift planning.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="pl-success-card">
              <div className="success-icon-wrap">
                <Check size={36} />
              </div>
              <h3>Appointment Reserved, {bookingData.name}!</h3>
              <p>We look forward to welcoming you to our studio on <strong>{bookingData.date || 'your selected date'}</strong> at <strong>{bookingData.time}</strong> for <strong>{bookingData.service}</strong>.</p>
              <p>A confirmation email and directions have been dispatched to <strong>{bookingData.email}</strong>.</p>
              <button 
                className="btn-luxury-cta"
                onClick={() => setBookingSubmitted(false)}
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="appointment-form">
              
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Desired Service</label>
                  <select
                    value={bookingData.service}
                    onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                    className="form-select"
                  >
                    <option value="Private Scent Consultation (45 mins)">Private Scent Consultation (45 mins &bull; Free)</option>
                    <option value="Vessel Refill Drop-off & Scent Selection">Vessel Refill Drop-off & Scent Selection</option>
                    <option value="Bridal & Wedding Favor Consultation">Bridal & Wedding Favor Consultation</option>
                    <option value="Corporate Gifting Consultation">Corporate Gifting & Custom Lids Consultation</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time</label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="form-select"
                  >
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:30 PM">2:30 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:30 PM">5:30 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Guests</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                    className="form-select"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3-4 Guests">3-4 Guests</option>
                    <option value="Private Group (5+)">Private Group (5+)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests or Favorite Fragrance Notes</label>
                <textarea
                  rows={3}
                  placeholder="Let us know what scents you currently enjoy or if you are bringing empty vessels for refill..."
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn-luxury-cta appointment-submit-btn">
                <span>Confirm Atelier Appointment</span>
                <Send size={16} />
              </button>

            </form>
          )}

        </div>
      </section>

      {/* Stockists & Retail Partners Directory */}
      <section className="section stockists-section">
        <div className="section-intro">
          <span className="section-eyebrow">Retail Partners</span>
          <h2 className="section-title">Where to Find Annette Pure in India</h2>
        </div>

        <div className="stockists-grid">
          {stockists.map((st, idx) => (
            <div className="stockist-card" key={idx}>
              <span className="stockist-type">{st.type}</span>
              <h3 className="stockist-name">{st.name}</h3>
              <p className="stockist-addr">{st.address}, {st.city}</p>
              <p className="stockist-phone">{st.phone}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
