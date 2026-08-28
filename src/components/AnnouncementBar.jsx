import React from 'react';

export default function AnnouncementBar() {
  const announcements = [
    "Complimentary Express Delivery Across India on Orders ₹1,499+",
    "100% Non-Toxic Promise — Pure Organic Soy Wax & Lead-Free Wicks",
    "Special Offer: Discovery Scent Flight Includes ₹500 Full-Size Candle Voucher",
    "Handcrafted in Small Batches • India Flagship Atelier"
  ];

  return (
    <div className="announcement-bar">
      <div className="announcement-bar-content">
        {/* Render twice for continuous scrolling effect */}
        {announcements.map((text, i) => (
          <span className="announcement-item" key={`a1-${i}`}>{text}</span>
        ))}
        {announcements.map((text, i) => (
          <span className="announcement-item" key={`a2-${i}`}>{text}</span>
        ))}
      </div>
    </div>
  );
}
