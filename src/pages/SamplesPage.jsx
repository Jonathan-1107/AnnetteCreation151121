import React, { useState } from 'react';
import { Sparkles, Check, Plus, Trash2, ShoppingBag, Gift, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import wellnessImg from '../assets/wellness_collection.png';
import foundersImg from '../assets/founders_collection.png';

export default function SamplesPage({ onAddToCart, onNavigate }) {
  const [boxSize, setBoxSize] = useState(4); // 4 or 6
  const [selectedScents, setSelectedScents] = useState([
    PRODUCTS[0], // Forest Ave
    PRODUCTS[1], // Perloat
    PRODUCTS[2], // Heritage
    PRODUCTS[7]  // Laguna Breeze
  ]);
  const [addedToast, setAddedToast] = useState(false);

  const boxPrice = boxSize === 4 ? 899.00 : 1299.00;
  const voucherAmount = 500.00;

  const handleSelectScent = (product) => {
    if (selectedScents.some(s => s.id === product.id)) {
      // Already selected -> remove
      setSelectedScents(selectedScents.filter(s => s.id !== product.id));
    } else {
      // Add if under capacity
      if (selectedScents.length < boxSize) {
        setSelectedScents([...selectedScents, product]);
      }
    }
  };

  const handleRemoveSlot = (index) => {
    const updated = [...selectedScents];
    updated.splice(index, 1);
    setSelectedScents(updated);
  };

  const handleAddBoxToCart = () => {
    const boxItem = {
      id: `discovery-box-${Date.now()}`,
      title: `Discovery Scent Flight (${boxSize} Samplers)`,
      price: boxPrice,
      image: wellnessImg,
      quantity: 1,
      description: `Custom box with: ${selectedScents.map(s => s.title).join(', ')} + ₹500 Full Size Voucher`
    };
    onAddToCart(boxItem, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 4000);
  };

  const isBoxFull = selectedScents.length === boxSize;

  return (
    <div className="samples-page">
      
      {/* Hero Header */}
      <section className="samples-hero">
        <div className="samples-hero-overlay" />
        <div className="samples-hero-content">
          <span className="samples-eyebrow">The Olfactory Discovery Flight</span>
          <h1 className="samples-title">Build Your Signature Sample Box</h1>
          <p className="samples-tagline">
            Experience our hand-poured fragrances in the comfort of your sanctuary. Each 2 oz travel tin burns for 15 hours.
          </p>
          <div className="voucher-highlight-banner">
            <Gift size={20} className="voucher-icon" />
            <span>
              <strong>Special Offer:</strong> Every Discovery Flight includes a <strong>₹{voucherAmount} voucher code</strong> redeemable toward any full-size candle!
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Builder Section */}
      <div className="samples-builder-container">
        
        {/* Step 1: Choose Box Size */}
        <div className="builder-step-header">
          <span className="step-tag">Step 1</span>
          <h2 className="step-heading">Choose Your Discovery Flight Size</h2>
        </div>

        <div className="box-size-selector-row">
          <div 
            className={`box-size-card ${boxSize === 4 ? 'active' : ''}`}
            onClick={() => {
              setBoxSize(4);
              if (selectedScents.length > 4) setSelectedScents(selectedScents.slice(0, 4));
            }}
          >
            <div className="box-size-radio">
              <div className={`radio-dot ${boxSize === 4 ? 'active' : ''}`} />
            </div>
            <div className="box-size-info">
              <h3>4-Scent Flight</h3>
              <p>4 &times; 2 oz Artisan Travel Tins (60 hrs total burn)</p>
              <span className="box-size-voucher">Includes ₹500 Full-Size Credit</span>
            </div>
            <span className="box-size-price">₹899</span>
          </div>

          <div 
            className={`box-size-card ${boxSize === 6 ? 'active' : ''}`}
            onClick={() => setBoxSize(6)}
          >
            <div className="box-size-radio">
              <div className={`radio-dot ${boxSize === 6 ? 'active' : ''}`} />
            </div>
            <div className="box-size-info">
              <h3>6-Scent Collector Flight</h3>
              <p>6 &times; 2 oz Artisan Travel Tins (90 hrs total burn)</p>
              <span className="box-size-voucher">Includes ₹500 Full-Size Credit</span>
            </div>
            <span className="box-size-price">₹1,299</span>
          </div>
        </div>

        {/* Step 2: Interactive Box Tray Showcase */}
        <div className="builder-step-header" style={{ marginTop: '40px' }}>
          <span className="step-tag">Step 2</span>
          <h2 className="step-heading">Your Presentation Keepsake Box ({selectedScents.length}/{boxSize} Selected)</h2>
        </div>

        <div className="box-tray-preview">
          <div className="tray-inner-grid" style={{ gridTemplateColumns: `repeat(${boxSize}, 1fr)` }}>
            {[...Array(boxSize)].map((_, idx) => {
              const scent = selectedScents[idx];
              return (
                <div className={`tray-slot ${scent ? 'filled' : 'empty'}`} key={idx}>
                  {scent ? (
                    <div className="slot-content">
                      <button 
                        className="slot-remove-btn" 
                        onClick={() => handleRemoveSlot(idx)}
                        aria-label="Remove scent"
                      >
                        <Trash2 size={12} />
                      </button>
                      <img src={scent.image} alt={scent.title} className="slot-img" />
                      <span className="slot-title">{scent.title}</span>
                      <span className="slot-vibe">{scent.scentFamily}</span>
                    </div>
                  ) : (
                    <div className="slot-placeholder">
                      <Plus size={20} />
                      <span>Select Scent {idx + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="tray-action-bar">
            <div className="tray-price-summary">
              <span className="tray-total-label">Total Box Price:</span>
              <span className="tray-total-val">₹{boxPrice.toLocaleString('en-IN')}</span>
              <span className="tray-credit-note">(Your effective cost after ₹500 candle voucher: ₹{(boxPrice - 500).toLocaleString('en-IN')})</span>
            </div>

            <button 
              className={`btn-luxury-cta ${!isBoxFull ? 'disabled' : ''}`}
              disabled={!isBoxFull}
              onClick={handleAddBoxToCart}
            >
              <ShoppingBag size={18} />
              <span>{isBoxFull ? `Add Discovery Flight to Bag &bull; ₹${boxPrice.toLocaleString('en-IN')}` : `Select ${boxSize - selectedScents.length} more scents to complete box`}</span>
            </button>
          </div>

          {addedToast && (
            <div className="pdp-toast-feedback">
              <Check size={16} />
              <span>Discovery Flight added to your scent bag with complimentary ₹500 voucher!</span>
            </div>
          )}
        </div>

        {/* Step 3: Scent Selection Grid */}
        <div className="builder-step-header" style={{ marginTop: '50px' }}>
          <span className="step-tag">Step 3</span>
          <h2 className="step-heading">Click Any Scent Below to Add or Swap</h2>
          <p className="step-subtext">Choose your favorite fragrance families to test in your home.</p>
        </div>

        <div className="scents-picker-grid">
          {PRODUCTS.filter(p => p.category !== 'Accessories').map((product) => {
            const isSelected = selectedScents.some(s => s.id === product.id);
            return (
              <div 
                key={product.id}
                className={`scent-pick-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectScent(product)}
              >
                <div className="pick-checkbox">
                  {isSelected ? <Check size={14} color="#FFF" /> : null}
                </div>
                <img src={product.image} alt={product.title} className="pick-img" />
                <div className="pick-info">
                  <span className="pick-category">{product.collection || product.category}</span>
                  <h4 className="pick-title">{product.title}</h4>
                  <span className="pick-scent-notes">{product.scentFamily}</span>
                  <p className="pick-desc">{product.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
