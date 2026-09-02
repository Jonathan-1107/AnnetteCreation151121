import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleLink = (page, tab = null, category = null) => {
    if (onNavigate) {
      onNavigate(page, { tab, category });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-grid footer-grid-clean">

        {/* HELP */}
        <div className="footer-column">
          <h4 className="footer-title">Help</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleLink('contact')}>Contact Us</button></li>
            <li><button onClick={() => handleLink('policies', 'shipping')}>Shipping + Returns</button></li>
            <li><button onClick={() => handleLink('contact')}>Candle Care</button></li>
            <li><button onClick={() => handleLink('contact')}>FAQs</button></li>
            <li><button onClick={() => handleLink('policies', 'privacy')}>Privacy Policy</button></li>
            <li><button onClick={() => handleLink('policies', 'privacy')}>Terms & Conditions</button></li>
          </ul>
        </div>

        {/* CONNECT */}
        <div className="footer-column">
          <h4 className="footer-title">Connect</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleLink('story')}>Our Story</button></li>
            <li><button onClick={() => handleLink('events')}>Private Events & Gifting</button></li>
            <li><button onClick={() => handleLink('media', 'blog')}>Blog</button></li>
            <li><button onClick={() => handleLink('account')}>Login</button></li>
          </ul>
        </div>

        {/* SHOP */}
        <div className="footer-column">
          <h4 className="footer-title">Shop</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleLink('shop')}>Shop All</button></li>
            <li><button onClick={() => handleLink('shop', null, 'Festive')}>Festive Collections</button></li>
            <li><button onClick={() => handleLink('samples')}>Sample Fragrances</button></li>
            <li><button onClick={() => handleLink('shop', null, 'Fragrance Glass Bottles')}>Fragrance Glass Bottles</button></li>
          </ul>
        </div>

        {/* VISIT US + CONTACT FORM */}
        <div className="footer-column footer-visit-col">
          <h4 className="footer-title">Visit Us</h4>
          <div className="footer-visit-text">
            <p>Bandra West, Mumbai</p>
            <p>Indiranagar, Bengaluru</p>
            <p className="footer-visit-phone">+91 98200 12345</p>
            <p>1800-266-8730</p>
          </div>

          <h4 className="footer-title footer-contact-title">Contact</h4>
          <form onSubmit={handleSubmit} className="footer-contact-form">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Your message..."
              rows="3"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            <button type="submit" className="footer-contact-submit">
              Send Message <ArrowRight size={15} />
            </button>
          </form>

          {sent && (
            <div className="newsletter-success-toast">
              <Check size={14} />
              <span>Thank you. We’ll reply shortly.</span>
            </div>
          )}
        </div>
      </div>

      {/* Social icons – bottom center */}
      <div className="footer-social-center">
        <a href="https://instagram.com" className="social-icon-btn" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="https://facebook.com" className="social-icon-btn" target="_blank" rel="noreferrer" aria-label="Facebook">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://pinterest.com" className="social-icon-btn" target="_blank" rel="noreferrer" aria-label="Pinterest">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/><circle cx="12" cy="12" r="10"/></svg>
        </a>
        <a href="https://youtube.com" className="social-icon-btn" target="_blank" rel="noreferrer" aria-label="YouTube">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9"/></svg>
        </a>
      </div>

      <div className="footer-bottom footer-bottom-center">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} ANNETTE PURE CANDLES. All Rights Reserved. Hand-Poured in India.
        </p>
      </div>
    </footer>
  );
}
