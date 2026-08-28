import React, { useState } from 'react';
import { ShieldCheck, Truck, RefreshCw, Lock, FileText } from 'lucide-react';

export default function PoliciesPage({ initialTab = 'returns', onNavigate }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'returns');

  return (
    <div className="policies-page">
      
      {/* Hero Banner */}
      <section className="policies-hero">
        <div className="policies-hero-overlay" />
        <div className="policies-hero-content">
          <span className="policies-eyebrow">Customer Protection & Standards</span>
          <h1 className="policies-title">Policies & Happiness Guarantee</h1>
          <p className="policies-tagline">
            We are committed to total transparency, non-toxic craftsmanship, and providing a flawless shopping experience across India.
          </p>
        </div>
      </section>

      {/* Policy Tabs */}
      <div className="policies-tabs-bar">
        <div className="policies-tabs-container">
          <button 
            className={`policy-tab-btn ${activeTab === 'returns' ? 'active' : ''}`}
            onClick={() => setActiveTab('returns')}
          >
            <RefreshCw size={16} />
            <span>30-Day Returns & Guarantee</span>
          </button>
          
          <button 
            className={`policy-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            <Truck size={16} />
            <span>Shipping & Delivery Policy</span>
          </button>
          
          <button 
            className={`policy-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Lock size={16} />
            <span>Privacy Policy</span>
          </button>
          
          <button 
            className={`policy-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveTab('terms')}
          >
            <FileText size={16} />
            <span>Terms of Service</span>
          </button>
        </div>
      </div>

      <div className="policies-content-container">
        
        {/* 1. RETURNS & HAPPINESS GUARANTEE */}
        {activeTab === 'returns' && (
          <div className="policy-doc-card">
            <h2>The 100% Happiness Guarantee & Returns Policy</h2>
            <p className="policy-last-updated">Last Updated: August 2026</p>

            <div className="policy-callout-box">
              <ShieldCheck size={24} />
              <div>
                <strong>Our Promise to You:</strong>
                <p>Fragrance is subjective and intimate. If you light an Annette Pure candle and the scent does not resonate with your sanctuary, we will exchange or refund it within 30 days—no hassle, no questions asked.</p>
              </div>
            </div>

            <h3>1. 30-Day Return Window</h3>
            <p>You have 30 calendar days from the date of package delivery to request an exchange or full refund. To be eligible, the candle must have more than 75% of its wax remaining and be in its original presentation vessel.</p>

            <h3>2. Complimentary Reverse Pickup</h3>
            <p>For all domestic Pan-India returns, our concierge will schedule a complimentary doorstep courier pickup via Blue Dart or Delhivery. Simply pack the vessel securely in its original protective packaging.</p>

            <h3>3. Damaged or Broken in Transit</h3>
            <p>While we package our glassware in heavy protective biodegradable packaging, accidents can occasionally happen during freight. If your vessel arrives damaged, please email a photo to concierge@annettepure.in and we will immediately dispatch a replacement with priority express air at zero cost to you.</p>

            <h3>4. How to Initiate a Return</h3>
            <p>Contact our concierge team via our <button onClick={() => onNavigate('contact')} className="text-link">Contact Page</button> or call +91 98200 12345 / 1800-266-8730 with your order number.</p>
          </div>
        )}

        {/* 2. SHIPPING & DELIVERY */}
        {activeTab === 'shipping' && (
          <div className="policy-doc-card">
            <h2>Shipping & Delivery Policy</h2>
            <p className="policy-last-updated">Last Updated: August 2026</p>

            <h3>1. Complimentary Pan-India Shipping</h3>
            <p>We are delighted to offer complimentary Standard Express Shipping on all orders of ₹1,499 or more across all Indian states and pin codes. For orders under ₹1,499, flat-rate standard shipping is ₹99.</p>

            <h3>2. Processing & Curing Time</h3>
            <p>Because all our candles are hand-poured and naturally cured in small batches, orders are prepared and dispatched within 1 to 2 business days from our atelier.</p>

            <h3>3. Express Shipping Options</h3>
            <ul>
              <li><strong>Standard Express (2-4 business days):</strong> ₹99 (Free on ₹1,499+)</li>
              <li><strong>Blue Dart / Delhivery Air Priority (1-2 business days):</strong> ₹199</li>
              <li><strong>White-Glove Luxury Delivery with Keepsake Gift Box & Wax Seal:</strong> ₹399</li>
            </ul>

            <h3>4. Carbon-Neutral Fulfillment</h3>
            <p>Every single Annette Pure shipment is 100% carbon neutral. We utilize biodegradable corrugated boxes, recycled paper tape, and protective paper cushioning.</p>
          </div>
        )}

        {/* 3. PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="policy-doc-card">
            <h2>Privacy Policy</h2>
            <p className="policy-last-updated">Last Updated: August 2026</p>

            <h3>1. Information We Collect</h3>
            <p>When you browse or place an order with Annette Pure, we collect basic contact information (name, email, shipping address, phone number) necessary to process your transaction and deliver your order.</p>

            <h3>2. Payment Security</h3>
            <p>We never store or have access to full credit card numbers or UPI PINs on our servers. All transactions are securely processed through PCI-DSS Level 1 compliant 256-bit encrypted gateways (UPI, RuPay, Visa, MasterCard, NetBanking).</p>

            <h3>3. We Never Sell Your Data</h3>
            <p>Your privacy is sacred. Annette Pure has never sold, rented, or traded customer data to third-party advertisers, and we never will. Your email and phone are strictly used for order updates and tracking.</p>
          </div>
        )}

        {/* 4. TERMS OF SERVICE */}
        {activeTab === 'terms' && (
          <div className="policy-doc-card">
            <h2>Terms of Service</h2>
            <p className="policy-last-updated">Last Updated: August 2026</p>

            <h3>1. Artisan Handcrafted Quality</h3>
            <p>Because our candles are individually hand-poured in micro-batches and cast in artisan glass, subtle variations in vessel color, wax finish, and surface texture are natural hallmarks of authentic soy craftsmanship.</p>

            <h3>2. Candle Safety & User Responsibility</h3>
            <p>Always burn candles within sight on heat-resistant surfaces. Keep away from drafts, flammable objects, children, and pets. Do not burn for more than 4 consecutive hours per lighting session. Trim wicks to 1/4 inch before every burn.</p>

            <h3>3. Intellectual Property</h3>
            <p>All brand names, custom fragrance formulas, logos, product imagery, and copy are the proprietary intellectual property of Annette Pure Atelier.</p>
          </div>
        )}

      </div>

    </div>
  );
}
