import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Clock, Award, PackageCheck, Send } from 'lucide-react';
import privateLabelImg from '../assets/private_label_services.png';
import boutiqueImg from '../assets/boutique_collection.png';
import foundersImg from '../assets/founders_collection.png';

export default function PrivateLabelPage({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brandName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: 'Boutique Retail',
    quantity: '250 - 500 units',
    scentVibe: 'Woody & Warm Amber',
    vesselType: 'Matte Amber Heavy Glass',
    packagingType: 'Custom Embossed Linen Box',
    timeline: 'Within 2-3 Months',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="private-label-page">
      
      {/* Hero Section */}
      <section 
        className="pl-hero"
        style={{ backgroundImage: `url(${privateLabelImg})` }}
      >
        <div className="pl-hero-overlay" />
        <div className="pl-hero-content">
          <span className="pl-eyebrow">Bespoke Olfactory Branding & Manufacturing</span>
          <h1 className="pl-title">Your Scent. Your Vessel. Your Brand.</h1>
          <p className="pl-tagline">
            Partner with our master chandler atelier in India to formulate signature fragrances and luxury custom candles for hotels, boutiques, luxury real estate, and corporate gifting.
          </p>
          <a href="#inquiry-form" className="btn-luxury-cta">
            Start Your Custom Project &rarr;
          </a>
        </div>
      </section>

      {/* Trust & Capability Metrics */}
      <div className="pl-metrics-strip">
        <div className="pl-metric-item">
          <Award size={24} className="pl-metric-icon" />
          <span className="pl-metric-number">20+</span>
          <span className="pl-metric-label">Years of Master Formulating</span>
        </div>
        <div className="pl-metric-item">
          <PackageCheck size={24} className="pl-metric-icon" />
          <span className="pl-metric-number">100</span>
          <span className="pl-metric-label">Accessible Minimum Order Quantity (Units)</span>
        </div>
        <div className="pl-metric-item">
          <Clock size={24} className="pl-metric-icon" />
          <span className="pl-metric-number">3-4</span>
          <span className="pl-metric-label">Weeks Fast Turnaround Time</span>
        </div>
        <div className="pl-metric-item">
          <ShieldCheck size={24} className="pl-metric-icon" />
          <span className="pl-metric-number">100%</span>
          <span className="pl-metric-label">Non-Toxic Soy & Botanical Extracts</span>
        </div>
      </div>

      {/* 4-Step Bespoke Process */}
      <section className="section pl-process-section">
        <div className="section-intro">
          <span className="section-eyebrow">Our Master Atelier Methodology</span>
          <h2 className="section-title">The 4-Step Bespoke Journey</h2>
        </div>

        <div className="pl-process-grid">
          
          <div className="pl-step-card">
            <span className="step-num">01</span>
            <h3 className="step-title">Olfactory Identity & Scent Formulation</h3>
            <p className="step-desc">
              We collaborate closely with your creative team to compose a bespoke fragrance profile that encapsulates your brand's heritage, interior ambiance, and emotional tone.
            </p>
            <ul className="step-features">
              <li>&bull; Custom fragrance compounding</li>
              <li>&bull; 3 rounds of sample adjustments</li>
              <li>&bull; IFRA certified non-toxic oils</li>
            </ul>
          </div>

          <div className="pl-step-card">
            <span className="step-num">02</span>
            <h3 className="step-title">Vessel Curation & Custom Screen Printing</h3>
            <p className="step-desc">
              Choose from our curated collection of glassware, matte ceramic tumblers, and brass vessels, customized with gold foil embossing or ceramic screen printing.
            </p>
            <ul className="step-features">
              <li>&bull; Custom Pantone vessel color matching</li>
              <li>&bull; Metallic foil stamping & engraved lids</li>
              <li>&bull; FSC-certified luxury packaging</li>
            </ul>
          </div>

          <div className="pl-step-card">
            <span className="step-num">03</span>
            <h3 className="step-title">Clean Soy Wax & Burn Lab Testing</h3>
            <p className="step-desc">
              Every custom candle formula undergoes rigorous safety and melt pool testing in our burn laboratory to ensure a clean, smokeless burn and optimal cold/hot scent throw.
            </p>
            <ul className="step-features">
              <li>&bull; 100% natural organic soy wax</li>
              <li>&bull; Custom wick sizing per vessel diameter</li>
              <li>&bull; 60+ hour burn efficiency test</li>
            </ul>
          </div>

          <div className="pl-step-card">
            <span className="step-num">04</span>
            <h3 className="step-title">Hand-Poured Production & Pan-India Delivery</h3>
            <p className="step-desc">
              Once approved, our team hand-pours, hand-wicks, and hand-labels your production run in our atelier with full quality control and white-glove palletized freight.
            </p>
            <ul className="step-features">
              <li>&bull; Hand-poured in micro-batches</li>
              <li>&bull; 14-day natural cure cycle</li>
              <li>&bull; Pan-India & international freight</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Interactive Inquiry & Quote Calculator Form */}
      <section className="section pl-inquiry-section" id="inquiry-form">
        <div className="pl-form-container">
          
          <div className="pl-form-header">
            <span className="section-eyebrow">Start Your Collaboration</span>
            <h2 className="section-title">Request a Private Label Consultation & Sample Kit</h2>
            <p className="pl-form-subtext">
              Tell us about your brand vision. Our master olfactory team will prepare a bespoke proposal and scent discovery kit tailored to your aesthetic.
            </p>
          </div>

          {submitted ? (
            <div className="pl-success-card">
              <div className="success-icon-wrap">
                <Check size={36} />
              </div>
              <h3>Thank You, {formData.contactName || 'Valued Partner'}!</h3>
              <p>Your private label inquiry for <strong>{formData.brandName || 'your brand'}</strong> has been received by our master atelier team.</p>
              <p>We will review your project specs ({formData.quantity}, {formData.vesselType}) and contact you within 24 business hours with your sample proposal.</p>
              <button 
                className="btn-luxury-cta"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pl-inquiry-form">
              
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Brand / Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luxury Hospitality Group"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Designation / Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Design Director"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="partner@luxuryhotel.in"
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
                  <label>Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Boutique Retail">Boutique Retail / Brand Merchandising</option>
                    <option value="Luxury Hospitality">Luxury Hotel / Resort Scent</option>
                    <option value="Corporate Gifting">Corporate VIP Gifting</option>
                    <option value="Interior Design">Interior Design Client Gifts</option>
                    <option value="Wedding / Event">VIP Wedding / Gala Favors</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Estimated Quantity</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="form-select"
                  >
                    <option value="100 - 250 units">100 &mdash; 250 units (Sample / Pilot)</option>
                    <option value="250 - 500 units">250 &mdash; 500 units (Standard Run)</option>
                    <option value="500 - 1,000 units">500 &mdash; 1,000 units</option>
                    <option value="1,000+ units">1,000+ units (Volume Enterprise)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Target Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="form-select"
                  >
                    <option value="Rush (3-4 weeks)">Rush (3-4 Weeks)</option>
                    <option value="Within 2-3 Months">Within 2-3 Months</option>
                    <option value="Festive Season 2026">Festive Season 2026</option>
                    <option value="Exploratory / Budgeting">Exploratory Planning</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Desired Scent Atmosphere</label>
                  <select
                    value={formData.scentVibe}
                    onChange={(e) => setFormData({ ...formData, scentVibe: e.target.value })}
                    className="form-select"
                  >
                    <option value="Woody & Warm Amber">Woody & Warm Amber (Cedar, Sandalwood, Vetiver)</option>
                    <option value="Coastal & Oceanic Fresh">Coastal & Oceanic Fresh (Sea Salt, Sage, Citrus)</option>
                    <option value="Calming Botanical Floral">Calming Botanical (Jasmine, Kashmiri Lavender, White Tea)</option>
                    <option value="Smoky Luxury Leather">Smoky Luxury (Tobacco Leaf, Bourbon, Vanilla)</option>
                    <option value="Custom Scent Compounding">Custom Scent Matching (Formulate from scratch)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Vessel Aesthetic</label>
                  <select
                    value={formData.vesselType}
                    onChange={(e) => setFormData({ ...formData, vesselType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Matte Amber Heavy Glass">Matte Amber Heavy Glass Tumbler</option>
                    <option value="Bisque White Ceramic">Handcrafted Bisque White Ceramic with Cork</option>
                    <option value="Frosted Black Matte Glass">Frosted Black Matte Glass with Wooden Lid</option>
                    <option value="Hand-Blown Luxury Vessel">Hand-Blown Luxury Collector Glass</option>
                    <option value="Client Supplied Vessels">Client Will Supply Own Vessels</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tell Us More About Your Brand Vision</label>
                <textarea
                  rows={4}
                  placeholder="Share details regarding your target audience, event date, custom logo artwork, or specific notes you love..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn-luxury-cta pl-submit-btn">
                <span>Submit Private Label Inquiry</span>
                <Send size={16} />
              </button>

            </form>
          )}

        </div>
      </section>

      {/* Case Studies / Client Portfolios */}
      <section className="section pl-portfolio-section">
        <div className="section-intro">
          <span className="section-eyebrow">Client Case Studies</span>
          <h2 className="section-title">Trusted by Discerning Brands</h2>
        </div>

        <div className="portfolio-cards-grid">
          <div className="portfolio-card">
            <img src={foundersImg} alt="The Luxury Resort custom candle" className="portfolio-img" />
            <div className="portfolio-content">
              <span className="portfolio-tag">Luxury Hospitality</span>
              <h3 className="portfolio-title">The Heritage Palace & Spa</h3>
              <p className="portfolio-desc">
                Custom Mysore sandalwood, wild jasmine, and mountain cedarwood bespoke candle poured for royal guest suites and luxury spa boutiques.
              </p>
            </div>
          </div>

          <div className="portfolio-card">
            <img src={boutiqueImg} alt="Atelier VIP bespoke candle" className="portfolio-img" />
            <div className="portfolio-content">
              <span className="portfolio-tag">Haute Horlogerie / VIP</span>
              <h3 className="portfolio-title">Atelier V. Luxury</h3>
              <p className="portfolio-desc">
                Smoked amber, dark bourbon vanilla, and aged cedarwood candle in solid cast brass vessels for annual VIP patron galas.
              </p>
            </div>
          </div>

          <div className="portfolio-card">
            <img src={privateLabelImg} alt="Wellness Sanctuary candle" className="portfolio-img" />
            <div className="portfolio-content">
              <span className="portfolio-tag">Wellness Sanctuary</span>
              <h3 className="portfolio-title">Ayur & Sound Sanctuaries</h3>
              <p className="portfolio-desc">
                Restorative Kashmiri lavender and coconut cream organic soy candles in handmade bisque ceramic vessels.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
