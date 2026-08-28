import React, { useState } from 'react';
import { 
  HelpCircle, Mail, Phone, MapPin, ChevronDown, ChevronUp, 
  Send, Check, MessageSquare, Clock, ShieldCheck 
} from 'lucide-react';

export default function ContactFaqPage({ onNavigate }) {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    topic: 'Order & Shipping Status',
    orderNumber: '',
    message: ''
  });

  const faqs = [
    {
      id: 0,
      category: "shipping",
      question: "What are your shipping rates and delivery times across India?",
      answer: "We offer complimentary standard express shipping on all Pan-India orders of ₹1,499 or more. For orders under ₹1,499, standard shipping is a flat rate of ₹99 (2-4 business days). We also provide Express Air Priority (₹199 via Blue Dart / Delhivery) and White-Glove Luxury Delivery (₹399)."
    },
    {
      id: 1,
      category: "care",
      question: "How do I prevent my candle from tunneling?",
      answer: "Wax has memory! On the very first burn, allow your candle to burn for 3 to 4 hours, or until the liquid melt pool extends all the way to the edges of the glass vessel. This ensures an even, flat burn for the entire life of the candle."
    },
    {
      id: 2,
      category: "ingredients",
      question: "What kind of wax and wicks do you use?",
      answer: "We strictly use 100% natural, sustainably farmed organic soy wax. Our wicks are braided from pure unbleached cotton and paper filaments—never lead or zinc. Our fragrance oils are IFRA-compliant, vegan, cruelty-free, and certified 100% free of phthalates, parabens, and petroleum."
    },
    {
      id: 3,
      category: "returns",
      question: "What is your 30-Day Happiness Guarantee?",
      answer: "We want you to love your home scent. If a fragrance doesn't resonate with you, contact our concierge within 30 days of delivery. We will gladly arrange a complimentary exchange or full refund to your original payment method."
    },
    {
      id: 4,
      category: "custom",
      question: "Can I order custom candles for my business, hotel, or wedding?",
      answer: "Yes! Our bespoke Private Label and Corporate Gifting programs start at accessible minimum order quantities of 100 units. We formulate custom scents, screen-print vessels, and laser-engrave brass lids with turnarounds in 3-4 weeks across India."
    },
    {
      id: 5,
      category: "care",
      question: "How should I clean and repurpose my empty glass vessel?",
      answer: "When approximately 1/2 inch of wax remains, safely extinguish the candle. Pour hot water into the vessel to float remaining wax to the top. Once cooled, discard wax, wash with warm soapy water, and bring it to our atelier for a refill or repurpose it as a planter or desk organizer!"
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="contact-faq-page">
      
      {/* Hero Banner */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <span className="contact-eyebrow">Customer Care & Olfactory Advice</span>
          <h1 className="contact-title">Frequently Asked Questions & Concierge</h1>
          <p className="contact-tagline">
            Our atelier concierge team in India is here to assist with order tracking, custom gifting inquiries, and scent recommendations.
          </p>
        </div>
      </section>

      <div className="contact-faq-container">
        
        {/* Contact Info Cards */}
        <div className="contact-cards-strip">
          <div className="contact-info-card">
            <Phone size={22} className="info-card-icon" />
            <h3>Concierge Helpline</h3>
            <p>+91 98200 12345 / 1800-266-8730</p>
            <span>Mon &ndash; Sat, 10am &ndash; 7pm IST</span>
          </div>

          <div className="contact-info-card">
            <Mail size={22} className="info-card-icon" />
            <h3>Email Support</h3>
            <p>concierge@annettepure.in</p>
            <span>Average response: Under 2 hours</span>
          </div>

          <div className="contact-info-card">
            <MapPin size={22} className="info-card-icon" />
            <h3>Flagship Ateliers</h3>
            <p>South Mumbai & Indiranagar, Bengaluru</p>
            <span>Open daily for scent consultations</span>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="section faq-main-section">
          <div className="section-intro">
            <span className="section-eyebrow">Instant Answers</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="faq-category-pills">
            <button 
              className={`faq-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Topics
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveCategory('shipping')}
            >
              Shipping & Delivery
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'care' ? 'active' : ''}`}
              onClick={() => setActiveCategory('care')}
            >
              Candle Care & Safety
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveCategory('ingredients')}
            >
              Clean Soy Ingredients
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'returns' ? 'active' : ''}`}
              onClick={() => setActiveCategory('returns')}
            >
              Returns & Guarantee
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveCategory('custom')}
            >
              Private Label & Events
            </button>
          </div>

          {/* Accordion FAQ List */}
          <div className="faq-accordion-list">
            {filteredFaqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.id}>
                  <button 
                    className="faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Direct Contact Form Section */}
        <section className="section direct-contact-section">
          <div className="contact-form-card">
            <div className="contact-form-header">
              <span className="section-eyebrow">Direct Message</span>
              <h2 className="section-title">Send a Message to Our Atelier</h2>
              <p>Have a question regarding your order, custom scent recommendation, or private label collaboration?</p>
            </div>

            {contactSubmitted ? (
              <div className="pl-success-card">
                <div className="success-icon-wrap">
                  <Check size={36} />
                </div>
                <h3>Message Sent, {contactData.name}!</h3>
                <p>Thank you for reaching out. Our concierge team in India will review your inquiry and get back to <strong>{contactData.email}</strong> promptly.</p>
                <button 
                  className="btn-luxury-cta"
                  onClick={() => setContactSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="direct-contact-form">
                
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Verified Patron"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="patron@example.in"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Inquiry Topic</label>
                    <select
                      value={contactData.topic}
                      onChange={(e) => setContactData({ ...contactData, topic: e.target.value })}
                      className="form-select"
                    >
                      <option value="Order & Shipping Status">Order Status & Tracking</option>
                      <option value="Scent Recommendation Advice">Personal Scent Consultation</option>
                      <option value="Returns & Exchanges">Returns & Exchanges</option>
                      <option value="Bespoke Private Label Inquiry">Private Label & Wholesale</option>
                      <option value="Workshop & Event Booking">Workshop & Event Booking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Order Number (If Applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. AP-IN-892410"
                      value={contactData.orderNumber}
                      onChange={(e) => setContactData({ ...contactData, orderNumber: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we assist you today?"
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn-luxury-cta contact-send-btn">
                  <span>Send Message to Atelier</span>
                  <Send size={16} />
                </button>

              </form>
            )}

          </div>
        </section>

      </div>

    </div>
  );
}
