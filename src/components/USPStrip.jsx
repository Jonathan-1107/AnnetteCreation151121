import React from 'react';
import { Leaf, ShieldAlert, Sparkles, Flame } from 'lucide-react';

export default function USPStrip() {
  const usps = [
    {
      icon: <Leaf className="usp-icon" size={32} />,
      title: "Made with Soy Wax",
      desc: "100% natural, clean-burning soy wax from sustainable farms."
    },
    {
      icon: <ShieldAlert className="usp-icon" size={32} style={{ transform: 'rotate(180deg)' }} />,
      title: "Paraben Free",
      desc: "Zero toxic parabens, phthalates, or artificial colors."
    },
    {
      icon: <Sparkles className="usp-icon" size={32} />,
      title: "Premium Fragrances",
      desc: "Infused with therapeutic essential oils and fine perfume oils."
    },
    {
      icon: <Flame className="usp-icon" size={32} />,
      title: "100% Cotton Wicks",
      desc: "Lead-free, organic cotton wicks for a slow, reliable burn."
    }
  ];

  return (
    <section className="section usp-section">
      <div className="usp-grid">
        {usps.map((usp, i) => (
          <div className="usp-item" key={i}>
            {usp.icon}
            <h3 className="usp-title">{usp.title}</h3>
            <p className="usp-desc">{usp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
