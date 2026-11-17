import React from 'react';
import { useCurrency } from '../hooks/useCurrency';

/**
 * PriceDisplay
 * Drop-in replacement for any hardcoded price text.
 *
 * Usage:
 *   <PriceDisplay priceInr={product.price} priceEur={product.priceEur} />
 *
 * Props:
 *   priceInr        {number}  — base_price from Supabase (INR)
 *   priceEur        {number}  — price_eur from Supabase (EUR, independent)
 *   comparePriceInr {number}  — optional strike-through price in INR
 *   comparePriceEur {number}  — optional strike-through price in EUR
 *   className       {string}  — extra CSS class
 */
export default function PriceDisplay({
  priceInr,
  priceEur,
  comparePriceInr = null,
  comparePriceEur = null,
  className = '',
}) {
  const { convertPrice, formatPrice, ratesLoaded } = useCurrency();

  // Show a subtle skeleton while EUR exchange rates are loading
  if (!ratesLoaded) {
    return <span className={`price-display ${className}`} aria-busy="true">···</span>;
  }

  const displayPrice   = convertPrice(priceInr, priceEur);
  const displayCompare = convertPrice(comparePriceInr, comparePriceEur);

  if (displayPrice === null) {
    return (
      <span className={`price-display price-unavailable ${className}`}>
        Price on request
      </span>
    );
  }

  return (
    <span className={`price-display ${className}`}>
      <span className="price-main">{formatPrice(displayPrice)}</span>
      {displayCompare !== null && displayCompare > displayPrice && (
        <span className="price-compare">{formatPrice(displayCompare)}</span>
      )}
    </span>
  );
}
