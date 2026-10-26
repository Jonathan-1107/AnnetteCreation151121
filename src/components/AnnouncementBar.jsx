import React from 'react';

export default function AnnouncementBar() {
  const announcements = [
    "Express Delivery Across India on Orders",
    "100% Non-Toxic Promise — Pure Organic Soy Wax & Lead-Free Wicks",
    "Transform Your Space: The Power of Pure Essential Oils in Every Burn",
    "Handcrafted in Small Batches • India Artisanal workshop"
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
