import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, RefreshCw, Truck, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  const handleLink = (page, tab = null, category = null) => {
    if (onNavigate) {
      onNavigate(page, { tab, category });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="main-footer">
      
      {/* Footer Value Highlights Row */}
      <div className="footer-perks-strip">
        <div className="footer-perk-item">
          <Truck size={18} className="footer-perk-icon" />
          <div>
            <strong>Complimentary Pan-India Shipping</strong>
            <span>On all qualifying orders over ₹1,499</span>
          </div>
        </div>
        <div className="footer-perk-item">
          <ShieldCheck size={18} className="footer-perk-icon" />
          <div>
            <strong>100% Non-Toxic Promise</strong>
            <span>Pure organic soy, paraben & phthalate free</span>
          </div>
        </div>
        <div className="footer-perk-item">
          <RefreshCw size={18} className="footer-perk-icon" />
          <div>
            <strong>Happiness Guarantee</strong>
            <span>Hassle-free returns & complimentary exchanges</span>
          </div>
        </div>
        <div className="footer-perk-item">
          <Heart size={18} className="footer-perk-icon" />
          <div>
            <strong>20+ Years of Craftsmanship</strong>
            <span>Hand-poured with intention in India</span>
          </div>
        </div>
      </div>

      <div className="footer-grid">
        
        {/* Brand Column */}
        <div className="footer-column brand-col">
          <div className="footer-brand-header">
            <span className="footer-script-a">A</span>
            <div>
              <h3 className="footer-brand-title">ANNETTE PURE</h3>
              <span className="footer-brand-sub">HANDMADE SOY CANDLES</span>
            </div>
          </div>
          <p className="footer-newsletter-text">
            Crafting small-batch, sustainably sourced scented candles designed with intention and poured by hand in our Indian atelier. Elegance translated through pure botanical scent.
          </p>
          <div className="footer-contact-snippet">
            <p>Flagship Atelier: Bandra West, Mumbai & Indiranagar, Bengaluru</p>
            <p>Concierge: +91 98200 12345 / 1800-266-8730</p>
            <p>Inquiries: concierge@annettepure.in</p>
          </div>
        </div>

        {/* Column 1: Collections & Shop */}
        <div className="footer-column">
          <h4 className="footer-title">Collections</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleLink('shop', null, 'Signature Atelier')}>Signature Atelier Reserve</button></li>
            <li><button onClick={() => handleLink('shop', null, 'Luxury')}>Luxury Scent Reserve</button></li>
            <li><button onClick={() => handleLink('shop', null, 'Wellness')}>Wellness & Calm</button></li>
            <li><button onClick={() => handleLink('shop', null, 'For Him')}>For Him Collection</button></li>
            <li><button onClick={() => handleLink('samples')}>Discovery Scent Flight</button></li>
            <li><button onClick={() => handleLink('shop', null, 'Accessories')}>Artisan Accessories</button></li>
            <li><button onClick={() => handleLink('shop')}>View All Candles</button></li>
          </ul>
        </div>

        {/* Column 2: Atelier & Services */}
        <div className="footer-column">
          <h4 className="footer-title">Atelier & Services</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleLink('private-label')}>Bespoke Private Label</button></li>
            <li><button onClick={() => handleLink('events', 'corporate')}>Corporate Workshops</button></li>
            <li><button onClick={() => handleLink('events', 'gifting')}>Corporate & Wedding Gifting</button></li>
            <li><button onClick={() => handleLink('boutique')}>Atelier Boutiques & Refills</button></li>
            <li><button onClick={() => handleLink('story')}>Our Atelier Heritage</button></li>
            <li><button onClick={() => handleLink('media', 'blog')}>Scent Journal (Blog)</button></li>
            <li><button onClick={() => handleLink('media', 'podcast')}>"Behind The Flame" Audio</button></li>
          </ul>
        </div>

        {/* Column 3: Customer Care & Legal */}
        <div className="footer-column">
          <h4 className="footer-title">Customer Care</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleLink('contact')}>Contact & Scent Advice</button></li>
            <li><button onClick={() => handleLink('contact')}>Frequently Asked Questions</button></li>
            <li><button onClick={() => handleLink('account', 'tracking')}>Track Your Order</button></li>
            <li><button onClick={() => handleLink('account', 'subscriptions')}>Manage Subscription</button></li>
            <li><button onClick={() => handleLink('policies', 'returns')}>Returns & Exchanges</button></li>
            <li><button onClick={() => handleLink('policies', 'shipping')}>Shipping & Delivery Policy</button></li>
            <li><button onClick={() => handleLink('policies', 'privacy')}>Privacy & Terms</button></li>
          </ul>
        </div>

        {/* Column 4: VIP Circle & Newsletter */}
        <div className="footer-column newsletter-col">
          <h4 className="footer-title">The Annette Pure Circle</h4>
          <p className="footer-newsletter-text">
            Subscribe to receive private vault allocations, seasonal festive releases, and invitations to masterclass candle workshops.
          </p>
          
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address..."
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-submit" aria-label="Subscribe to newsletter">
              <ArrowRight size={17} />
            </button>
          </form>

          {subscribed && (
            <div className="newsletter-success-toast">
              <Check size={14} />
              <span>Welcome to the Inner Circle. Check your inbox for your 10% welcome code.</span>
            </div>
          )}

          {/* Social Icons */}
          <div className="social-icons-row">
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
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"><polygon points="10 15 15 12 10 9"/></path></svg>
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar with Currency Selector & Copyright */}
      <div className="footer-bottom">
        <div className="footer-currency-wrapper">
          <span className="currency-label">Region & Currency:</span>
          <select className="currency-selector" defaultValue="INR" aria-label="Select Currency">
            <option value="INR">INR (₹) &bull; India</option>
            <option value="USD">USD ($) &bull; United States</option>
            <option value="EUR">EUR (€) &bull; European Union</option>
            <option value="GBP">GBP (£) &bull; United Kingdom</option>
            <option value="AED">AED (د.إ) &bull; UAE</option>
            <option value="SGD">SGD ($) &bull; Singapore</option>
          </select>
        </div>
        
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} ANNETTE PURE CANDLES. All Rights Reserved. Master Hand-Poured in India.
        </p>
      </div>

    </footer>
  );
}
