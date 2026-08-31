import React from 'react';

const PAYMENTS = [
  { src: '/video/Google_pay.png', alt: 'Google Pay' },
  { src: '/video/phone_pe.png', alt: 'PhonePe' },
  { src: '/video/bhim_pay.png', alt: 'BHIM UPI' },
  { src: '/video/pay_tm.png', alt: 'Paytm' },
  { src: '/video/Ru_pay.png', alt: 'RuPay' },
  { src: '/video/visa_card.png', alt: 'Visa' },
  { src: '/video/Master_card.png', alt: 'Mastercard' },
  { src: '/video/cash_on_delivery.png', alt: 'Cash on Delivery' },
];

export default function SupportStrip() {
  return (
    <section className="support-strip-section question-footer">
      <div className="question-banner">
        <h2 className="question-title">HAVE A QUESTION?</h2>
        <p className="question-call">
          Call us at{' '}
          <a href="tel:+919820012345">(91) 98200-12345</a>
          {' / '}
          <a href="tel:18002668730">1800-266-8730</a>.
        </p>
      </div>

      <div className="question-info-row">
        <div className="question-info-col">
          <h3 className="question-info-heading">ECO-CONSCIOUS PACKAGING</h3>
          <p className="question-info-text">
            Sustainably packaged for a lighter footprint
          </p>
        </div>

        <div className="question-info-col">
          <h3 className="question-info-heading">SECURE PAYMENT</h3>
          <div className="payment-logo-row">
            {PAYMENTS.map((p) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                title={p.alt}
                width={56}
                height={36}
                className="payment-logo-img"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
