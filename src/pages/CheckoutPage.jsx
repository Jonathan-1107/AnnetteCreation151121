import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, CreditCard, Truck, Gift, ArrowRight, ArrowLeft, 
  ShoppingBag, Sparkles, CheckCircle, Smartphone, Building2, Banknote 
} from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function CheckoutPage({ 
  cartItems = [], 
  onClearCart, 
  onNavigate,
  appliedDiscount = 0,
  initialGiftMessage = '',
  onAddOrder 
}) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Address, 2: Shipping, 3: Payment, 4: Confirmation
  
  // Form State
  const [email, setEmail] = useState('patron@annettepure.in');
  const [fullName, setFullName] = useState('Patron Member');
  const [phone, setPhone] = useState('+91 98200 12345');
  const [address, setAddress] = useState('14 Altamount Road, Penthouse 8B');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [zip, setZip] = useState('400026');
  const [country, setCountry] = useState('India');
  const [saveInfo, setSaveInfo] = useState(true);

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard', 'express', 'whiteglove'

  // Payment State
  const [paymentTab, setPaymentTab] = useState('upi'); // 'upi', 'card', 'netbanking', 'cod'
  const [upiId, setUpiId] = useState('patron@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardName, setCardName] = useState('Patron Member');
  const [cardExp, setCardExp] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(appliedDiscount || 0);
  const [promoMessage, setPromoMessage] = useState('');
  const [giftNote, setGiftNote] = useState(initialGiftMessage || '');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Totals calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const isFreeStandard = subtotal >= 1499;
  
  let shippingCost = 0;
  if (shippingMethod === 'standard') shippingCost = isFreeStandard ? 0 : 99;
  if (shippingMethod === 'express') shippingCost = 199;
  if (shippingMethod === 'whiteglove') shippingCost = 399;

  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage('10% Welcome Discount Applied!');
    } else if (clean === 'LUXURY20') {
      setDiscountPercent(20);
      setPromoMessage('20% VIP Vault Discount Applied!');
    } else if (clean === 'FREESHIP') {
      setDiscountPercent(0);
      setShippingMethod('standard');
      setPromoMessage('Complimentary Pan-India Shipping Activated!');
    } else {
      setPromoMessage('Invalid coupon code. Try WELCOME10 or LUXURY20');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderNumber = `AP-IN-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing (Hand-Pouring Batch in Atelier)',
      items: [...cartItems],
      subtotal,
      discountAmount,
      shippingCost,
      tax: 0,
      total: grandTotal,
      shippingAddress: {
        name: fullName,
        phone,
        address: `${address} ${apt}`.trim(),
        city,
        state,
        zip,
        country
      },
      shippingMethodTitle: shippingMethod === 'standard' ? 'Standard Pan-India Delivery (2-4 Days)' : (shippingMethod === 'express' ? 'Express Priority Air (1-2 Days)' : 'White-Glove Keepsake Box & Wax Seal'),
      paymentMethodTitle: paymentTab === 'upi' ? `UPI (${upiId})` : (paymentTab === 'card' ? 'Credit / Debit Card (RuPay/Visa/MasterCard)' : (paymentTab === 'netbanking' ? `NetBanking (${selectedBank})` : 'Cash on Delivery')),
      giftNote,
      estimatedDelivery: shippingMethod === 'express' ? '1 - 2 Business Days' : '2 - 4 Business Days'
    };

    setConfirmedOrder(newOrder);
    if (onAddOrder) {
      onAddOrder(newOrder);
    }
    if (onClearCart) {
      onClearCart();
    }
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cartItems.length === 0 && currentStep !== 4) {
    return (
      <div className="checkout-empty-page">
        <div className="checkout-empty-card">
          <ShoppingBag size={56} strokeWidth={1} />
          <h2>Your Scent Bag is Empty</h2>
          <p>Please add candles to your bag before proceeding to checkout.</p>
          <button className="btn-luxury-cta" onClick={() => onNavigate('shop')}>
            Discover Collection &rarr;
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 4 && confirmedOrder) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container">
          <div className="confirmation-header-card">
            <div className="confirm-icon-wrap">
              <CheckCircle size={44} className="confirm-icon" />
            </div>
            <span className="confirm-eyebrow">Order Confirmed</span>
            <h1 className="confirm-title">Thank You For Your Order!</h1>
            <p className="confirm-desc">
              Your order <strong>#{confirmedOrder.orderNumber}</strong> has been received by our atelier. We are carefully hand-pouring and preparing your botanical soy candles.
            </p>
            <span className="confirm-email-note">
              A detailed invoice and SMS tracking updates have been dispatched to <strong>{email}</strong> and <strong>{confirmedOrder.shippingAddress.phone}</strong>.
            </span>
          </div>

          <div className="confirmation-receipt-card">
            <div className="receipt-header">
              <h3>Order Receipt &bull; {confirmedOrder.orderNumber}</h3>
              <span className="receipt-date">{confirmedOrder.date}</span>
            </div>

            <div className="receipt-items-list">
              {confirmedOrder.items.map((it, idx) => (
                <div className="receipt-item-row" key={idx}>
                  <img src={it.image} alt={it.title} className="receipt-item-thumb" />
                  <div className="receipt-item-meta">
                    <h4>{it.title}</h4>
                    <span>Qty: {it.quantity} &bull; 100% Organic Soy</span>
                  </div>
                  <span className="receipt-item-price">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="receipt-totals-table">
              <div className="receipt-row">
                <span>Subtotal</span>
                <span>₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {confirmedOrder.discountAmount > 0 && (
                <div className="receipt-row discount">
                  <span>Discount Applied</span>
                  <span>-₹{confirmedOrder.discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="receipt-row">
                <span>Shipping ({confirmedOrder.shippingMethodTitle})</span>
                <span>{confirmedOrder.shippingCost === 0 ? 'FREE' : `₹${confirmedOrder.shippingCost}`}</span>
              </div>
              <div className="receipt-row">
                <span>GST (Included)</span>
                <span>₹0.00 (All Inclusive)</span>
              </div>
              <div className="receipt-row total-row">
                <span>Total Paid</span>
                <span>₹{Math.round(confirmedOrder.total).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="receipt-address-box">
              <strong>Shipping Destination:</strong>
              <p>{confirmedOrder.shippingAddress.name} ({confirmedOrder.shippingAddress.phone})</p>
              <p>{confirmedOrder.shippingAddress.address}</p>
              <p>{confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.zip}, {confirmedOrder.shippingAddress.country}</p>
              <p><strong>Payment Method:</strong> {confirmedOrder.paymentMethodTitle}</p>
              {confirmedOrder.giftNote && (
                <p className="receipt-gift-text"><strong>Gift Note:</strong> "{confirmedOrder.giftNote}"</p>
              )}
            </div>
          </div>

          <div className="confirmation-actions-row">
            <button className="btn-luxury-cta" onClick={() => onNavigate('account', { tab: 'orders' })}>View in My Account & Track &rarr;</button>
            <button className="btn-luxury-outline" onClick={() => onNavigate('shop')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-top-bar">
        <button onClick={() => onNavigate('home')} className="checkout-logo-link">
          <span className="logo-script-accent" style={{ fontSize: '2.6rem', top: '-10px' }}>A</span>
          <div className="logo-text-group" style={{ paddingLeft: '18px' }}>
            <span className="logo-wordmark" style={{ fontSize: '1.2rem' }}>ANNETTE PURE</span>
            <span className="logo-submark" style={{ fontSize: '0.48rem' }}>SECURE PAN-INDIA CHECKOUT</span>
          </div>
        </button>
        <div className="checkout-security-badge">
          <Lock size={14} />
          <span>256-Bit SSL Encrypted &bull; 100% Secure</span>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-column">
          <div className="checkout-step-indicator">
            <button className={`step-bubble-btn ${currentStep >= 1 ? 'active' : ''}`} onClick={() => setCurrentStep(1)}>1. Address</button>
            <span className="step-arrow">&rarr;</span>
            <button className={`step-bubble-btn ${currentStep >= 2 ? 'active' : ''}`} onClick={() => setCurrentStep(2)}>2. Shipping</button>
            <span className="step-arrow">&rarr;</span>
            <button className={`step-bubble-btn ${currentStep >= 3 ? 'active' : ''}`} onClick={() => setCurrentStep(3)}>3. Payment</button>
          </div>

          {currentStep === 1 && (
            <div className="step-card">
              <h2 className="step-title">1. Contact & Shipping Destination (India)</h2>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Email Address for Tracking Updates *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label>Mobile Number (For Delivery SMS) *</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label>Recipient Full Name *</label>
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label>Street Address / Flat / Building *</label>
                <input type="text" required placeholder="e.g. 14 Altamount Road, Penthouse 8B" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label>Landmark / Area (Optional)</label>
                <input type="text" placeholder="e.g. Near Kemps Corner" value={apt} onChange={(e) => setApt(e.target.value)} className="form-input" />
              </div>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select value={state} onChange={(e) => setState(e.target.value)} className="form-input">
                    {INDIAN_STATES.map((st) => (<option key={st} value={st}>{st}</option>))}
                  </select>
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input type="text" required maxLength={6} placeholder="400026" value={zip} onChange={(e) => setZip(e.target.value)} className="form-input" />
                </div>
              </div>
              <div className="form-checkbox-row">
                <input type="checkbox" id="save-info" checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} />
                <label htmlFor="save-info">Save this address to my profile for fast 1-click checkout</label>
              </div>
              <div className="step-actions-row">
                <button type="button" className="btn-luxury-cta step-next-btn" onClick={() => setCurrentStep(2)}><span>Continue to Shipping Method</span><ArrowRight size={16} /></button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-card">
              <h2 className="step-title">2. Choose Delivery Speed</h2>
              <div className="shipping-address-summary">
                <div><strong>Deliver to:</strong> {fullName} ({phone}), {address} {apt}, {city}, {state} - {zip}, {country}</div>
                <button className="summary-edit-btn" onClick={() => setCurrentStep(1)}>Edit</button>
              </div>
              <div className="shipping-methods-list">
                <div className={`shipping-option-card ${shippingMethod === 'standard' ? 'selected' : ''}`} onClick={() => setShippingMethod('standard')}>
                  <div className="shipping-radio"><div className={`radio-dot ${shippingMethod === 'standard' ? 'active' : ''}`} /></div>
                  <div className="shipping-details">
                    <div className="shipping-title-row"><strong>Standard Pan-India Express (2-4 Business Days)</strong><span className="shipping-price-tag">{isFreeStandard ? 'FREE' : '₹99'}</span></div>
                    <p>Eco-friendly carbon-neutral surface & air shipping in protective recycled paper cushioning.</p>
                  </div>
                </div>
                <div className={`shipping-option-card ${shippingMethod === 'express' ? 'selected' : ''}`} onClick={() => setShippingMethod('express')}>
                  <div className="shipping-radio"><div className={`radio-dot ${shippingMethod === 'express' ? 'active' : ''}`} /></div>
                  <div className="shipping-details">
                    <div className="shipping-title-row"><strong>Blue Dart / Delhivery Air Express Priority (1-2 Days)</strong><span className="shipping-price-tag">₹199</span></div>
                    <p>Guaranteed 1-2 business day expedited air cargo delivery with real-time GPS tracking.</p>
                  </div>
                </div>
                <div className={`shipping-option-card ${shippingMethod === 'whiteglove' ? 'selected' : ''}`} onClick={() => setShippingMethod('whiteglove')}>
                  <div className="shipping-radio"><div className={`radio-dot ${shippingMethod === 'whiteglove' ? 'active' : ''}`} /></div>
                  <div className="shipping-details">
                    <div className="shipping-title-row"><strong>White-Glove Luxury Delivery + Keepsake Gold Foil Box & Wax Seal</strong><span className="shipping-price-tag">₹399</span></div>
                    <p>Signature embossed presentation box, hand-stamped wax seal, and priority handling.</p>
                  </div>
                </div>
              </div>
              <div className="step-actions-row">
                <button type="button" className="btn-luxury-outline" onClick={() => setCurrentStep(1)}><ArrowLeft size={16} /><span>Back to Address</span></button>
                <button type="button" className="btn-luxury-cta" onClick={() => setCurrentStep(3)}><span>Continue to Payment</span><ArrowRight size={16} /></button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-card">
              <h2 className="step-title">3. Secure Payment Method</h2>
              <div className="payment-tabs-row">
                <button className={`payment-tab-btn ${paymentTab === 'upi' ? 'active' : ''}`} onClick={() => setPaymentTab('upi')}><Smartphone size={16} /><span>UPI / QR</span></button>
                <button className={`payment-tab-btn ${paymentTab === 'card' ? 'active' : ''}`} onClick={() => setPaymentTab('card')}><CreditCard size={16} /><span>Cards (RuPay/Visa/MC)</span></button>
                <button className={`payment-tab-btn ${paymentTab === 'netbanking' ? 'active' : ''}`} onClick={() => setPaymentTab('netbanking')}><Building2 size={16} /><span>NetBanking</span></button>
                <button className={`payment-tab-btn ${paymentTab === 'cod' ? 'active' : ''}`} onClick={() => setPaymentTab('cod')}><Banknote size={16} /><span>Cash on Delivery</span></button>
              </div>
              {paymentTab === 'upi' && (
                <div className="card-payment-form">
                  <div className="upi-payment-box" style={{ background: '#FAF7F2', padding: '16px', borderRadius: '8px', border: '1px solid #E5DFD7', marginBottom: '16px' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#2D2A26' }}><strong>Instant UPI Payment:</strong> Pay seamlessly with Google Pay, PhonePe, Paytm, CRED, or BHIM.</p>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Enter Your UPI ID *</label><input type="text" required placeholder="yourname@okhdfcbank" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="form-input" /></div>
                  </div>
                </div>
              )}
              {paymentTab === 'card' && (
                <div className="card-payment-form">
                  <div className="live-card-preview">
                    <div className="card-chip" /><span className="preview-card-number">{cardNumber || '•••• •••• •••• ••••'}</span>
                    <div className="preview-card-bottom">
                      <div><span className="preview-label">CARDHOLDER</span><span className="preview-val">{cardName || fullName || 'NAME'}</span></div>
                      <div><span className="preview-label">EXPIRES</span><span className="preview-val">{cardExp || 'MM/YY'}</span></div>
                    </div>
                  </div>
                  <div className="form-group"><label>Card Number</label><input type="text" required placeholder="4532 •••• •••• 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="form-input" /></div>
                  <div className="form-group"><label>Name on Card</label><input type="text" required placeholder="Name as printed on card" value={cardName} onChange={(e) => setCardName(e.target.value)} className="form-input" /></div>
                  <div className="form-grid-2">
                    <div className="form-group"><label>Expiration (MM/YY)</label><input type="text" required placeholder="12/28" value={cardExp} onChange={(e) => setCardExp(e.target.value)} className="form-input" /></div>
                    <div className="form-group"><label>Security CVV / CVC</label><input type="text" required placeholder="892" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} className="form-input" /></div>
                  </div>
                </div>
              )}
              {paymentTab === 'netbanking' && (
                <div className="card-payment-form">
                  <div className="form-group">
                    <label>Select Your Bank</label>
                    <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="form-input">
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="IndusInd Bank">IndusInd Bank</option>
                    </select>
                  </div>
                </div>
              )}
              {paymentTab === 'cod' && (
                <div className="card-payment-form">
                  <div style={{ background: '#FAF7F2', padding: '16px', borderRadius: '8px', border: '1px solid #E5DFD7' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#2D2A26' }}><strong>Cash on Delivery:</strong> Pay via cash or courier UPI QR upon arrival at your doorstep. Verified delivery OTP required.</p>
                  </div>
                </div>
              )}
              <div className="step-actions-row">
                <button type="button" className="btn-luxury-outline" onClick={() => setCurrentStep(2)}><ArrowLeft size={16} /><span>Back to Shipping</span></button>
                <button type="button" className="btn-luxury-cta place-order-btn" onClick={handlePlaceOrder}><Lock size={15} /><span>Complete Order &bull; ₹{Math.round(grandTotal).toLocaleString('en-IN')}</span></button>
              </div>
            </div>
          )}
        </div>

        <aside className="checkout-summary-column">
          <div className="summary-sticky-card">
            <h3 className="summary-title">Order Summary ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h3>
            {isFreeStandard && (
              <div className="free-shipping-congrats"><Sparkles size={14} /><span>You've unlocked Complimentary Pan-India Shipping!</span></div>
            )}
            <div className="summary-items-list">
              {cartItems.map((item) => (
                <div className="summary-item" key={item.id}>
                  <div className="summary-img-wrap"><img src={item.image} alt={item.title} /><span className="summary-item-qty">{item.quantity}</span></div>
                  <div className="summary-item-details"><h4>{item.title}</h4><span>100% Soy &bull; 11 oz</span></div>
                  <span className="summary-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="summary-gift-box">
              <label><Gift size={14} /> Complimentary Handwritten Gift Note</label>
              <textarea rows={2} placeholder="Include a message for the recipient..." value={giftNote} onChange={(e) => setGiftNote(e.target.value)} className="gift-textarea" />
            </div>
            <form onSubmit={handleApplyPromo} className="summary-coupon-form">
              <input type="text" placeholder="Promo code (e.g. WELCOME10)" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="coupon-input" />
              <button type="submit" className="coupon-btn">Apply</button>
            </form>
            {promoMessage && (<p className={`coupon-feedback ${discountPercent > 0 ? 'success' : 'error'}`}>{promoMessage}</p>)}
            <div className="summary-totals-breakdown">
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              {discountPercent > 0 && (<div className="summary-row discount"><span>VIP Discount ({discountPercent}%)</span><span>-₹{discountAmount.toLocaleString('en-IN')}</span></div>)}
              <div className="summary-row"><span>Shipping</span><span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span></div>
              <div className="summary-row"><span>GST (Included)</span><span>₹0.00</span></div>
              <div className="summary-row total-row"><span>Total Due</span><span>₹{Math.round(grandTotal).toLocaleString('en-IN')}</span></div>
            </div>
            <div className="summary-guarantee-note"><ShieldCheck size={16} /><span>Happiness Guarantee & Complimentary Exchanges</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
