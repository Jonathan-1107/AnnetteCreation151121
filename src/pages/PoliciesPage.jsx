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
            <h2>The Annette Pure Happiness Guarantee & Returns Policy</h2>
            <p className="policy-last-updated">Last Updated: September 2026</p>

            <div className="policy-callout-box">
              <ShieldCheck size={24} />
              <div>
                <strong>Our Promise to You:</strong>
                <p>Fragrance is subjective and intimate. If an Annette Pure candle doesn't resonate with you, we'll review an exchange or refund within 30 days of delivery, depending on the situation.</p>
              </div>
            </div>

            <h3>1. 30-Day Return Window</h3>
            <p>You have 30 calendar days from the date of delivery to request an exchange or refund. Due to the nature of candles, we cannot accept returns on used or burned candles — items must be unused and in their original packaging to be eligible.</p>

            <h3>2. How to Initiate a Return</h3>
            <p>Email us at <strong>annettepure.1521@gmail.com</strong> with your order number and reason for return, or reach out via our <button onClick={() => onNavigate('contact')} className="text-link">Contact Page</button>. You can also call us at <strong>+91 65217 55830</strong>. Once approved, we'll share instructions for sending the item back — we recommend a trackable courier service.</p>

            <h3>3. Damaged or Incorrect Items</h3>
            <p>If your order arrives damaged or incorrect, email us photos of the issue within 7 days of delivery at annettepure.1521@gmail.com, and we'll arrange a free replacement or full refund — no return shipping required in this case.</p>

            <h3>4. Refund Timeline</h3>
            <p>Once we receive and inspect your returned item, refunds are processed to your original payment method within 5-7 business days.</p>
          </div>
        )}

        {/* 2. SHIPPING & DELIVERY */}
        {activeTab === 'shipping' && (
          <div className="policy-doc-card">
            <h2>Shipping & Delivery Policy</h2>
            <p className="policy-last-updated">Last Updated: September 2026</p>

            <h3>1. Domestic Shipping (All of India)</h3>
            <ul>
              <li><strong>Standard Delivery:</strong> 4-7 business days</li>
              <li><strong>Express Delivery:</strong> 2-5 business days</li>
              <li><strong>White-Glove Delivery:</strong> Premium presentation packaging with priority handling, available on request</li>
            </ul>

            <h3>2. Processing Time</h3>
            <p>Because all our candles are hand-poured and naturally cured in small batches, orders are prepared and handed to our courier partner within 1-2 business days of order confirmation. You'll receive a tracking update once your order ships.</p>

            <h3>3. International & Bulk / Wholesale Orders</h3>
            <p>We accommodate international shipping for bulk and export-quality wholesale orders. For international or bulk inquiries, please contact us directly at <strong>annettepure.1521@gmail.com</strong> with your requirements, destination, and quantity, and we'll share a custom shipping quote and timeline.</p>

            <h3>4. Contact Us</h3>
            <p>For any shipping questions, reach us at annettepure.1521@gmail.com or +91 65217 55830.</p>
          </div>
        )}

        {/* 3. PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="policy-doc-card">
            <h2>Privacy Policy</h2>
            <p className="policy-last-updated">Last Updated: September 2026</p>

            <h3>1. Who We Are</h3>
            <p>Annette Pure is a handmade soy candle business based in Industrial Area, Vanasthalipuram, Hyderabad, Telangana, India. This policy explains how we collect, use, and protect your personal information when you shop with us.</p>

            <h3>2. Information We Collect</h3>
            <p>When you browse or place an order with Annette Pure, we collect basic contact information (name, email, shipping address, phone number) necessary to process your transaction and deliver your order. We also automatically receive basic technical information, such as your browser type and IP address, to help our site function properly.</p>

            <h3>3. How We Use Your Information</h3>
            <p>We use your information to process and deliver orders, communicate order updates, respond to customer service requests, and — only with your consent — send occasional emails about new collections or offers.</p>

            <h3>4. Payment Security</h3>
            <p>We never store or have access to full credit card numbers, UPI PINs, or banking details on our servers. All transactions are securely processed through our payment partner, Razorpay, which is PCI-DSS compliant.</p>

            <h3>5. We Never Sell Your Data</h3>
            <p>Your privacy is important to us. Annette Pure does not sell, rent, or trade customer data to third-party advertisers. We share only what's necessary with our shipping partners (to deliver your order) and payment processor (to complete your transaction).</p>

            <h3>6. Your Rights</h3>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at the details below.</p>

            <h3>7. Contact Us</h3>
            <p>Email: annettepure.1521@gmail.com<br />
            Phone: +91 65217 55830<br />
            Address: Industrial Area, Vanasthalipuram, Hyderabad, Telangana, India</p>
          </div>
        )}

        {/* 4. TERMS OF SERVICE */}
        {activeTab === 'terms' && (
          <div className="policy-doc-card">
            <h2>Terms of Service</h2>
            <p className="policy-last-updated">Last Updated: September 2026</p>

            <h3>1. Acceptance of Terms</h3>
            <p>By accessing this website and placing an order, you agree to these Terms of Service.</p>

            <h3>2. Artisan Handcrafted Quality</h3>
            <p>Because our candles are individually hand-poured in small batches, subtle variations in color, wax finish, and fragrance intensity between batches are natural and not considered defects.</p>

            <h3>3. Orders and Payment</h3>
            <p>Orders are confirmed only once payment is successfully processed through our secure payment partner, Razorpay. You agree to provide accurate billing and shipping information. All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</p>

            <h3>4. Candle Safety & User Responsibility</h3>
            <p>Always burn candles within sight, on a heat-resistant surface, away from drafts, flammable objects, children, and pets. Do not burn for more than 4 consecutive hours per session. Trim wicks to 1/4 inch before every burn. Annette Pure is not liable for damages resulting from improper use.</p>

            <h3>5. Intellectual Property</h3>
            <p>All brand names, fragrance formulas, logos, product imagery, and copy on this site are the proprietary intellectual property of Annette Pure.</p>

            <h3>6. Limitation of Liability</h3>
            <p>Annette Pure is not liable for indirect or incidental damages arising from the use of our products, to the extent permitted by Indian law.</p>

            <h3>7. Governing Law</h3>
            <p>These terms are governed by the laws of India, with jurisdiction in Hyderabad, Telangana.</p>

            <h3>8. Contact Us</h3>
            <p>Email: annettepure.1521@gmail.com<br />
            Phone: +91 65217 55830</p>
          </div>
        )}

      </div>

    </div>
  );
}
