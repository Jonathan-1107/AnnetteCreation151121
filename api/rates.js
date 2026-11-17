/**
 * /api/rates.js — Vercel Serverless Function
 *
 * Fetches EUR-based exchange rates from Frankfurter API (European Central Bank).
 * - Free, no API key required
 * - Updates every business day
 * - Cached at Vercel CDN edge for 1 hour (s-maxage=3600)
 * - Falls back to hardcoded approximate rates if the API is unreachable
 *
 * Usage: fetch('/api/rates') → { USD: 1.08, GBP: 0.86, AED: 3.97, ... }
 */
export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const CURRENCIES = 'USD,GBP,AED,SAR,SGD,AUD,CAD,JPY,CHF,MYR,THB,ZAR,KWD,QAR,BHD,OMR,NZD,HKD';

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=EUR&to=${CURRENCIES}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`Frankfurter API error: ${response.status}`);

    const data = await response.json();

    // Cache at Vercel CDN edge for 1 hour, serve stale for 10 more minutes
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data.rates);

  } catch (err) {
    console.error('Rates API error:', err.message);

    // Hardcoded fallback — approximate ECB rates (EUR base), update monthly if needed
    const fallbackRates = {
      USD: 1.08,  GBP: 0.86,  AED: 3.97,  SAR: 4.05,
      SGD: 1.46,  AUD: 1.67,  CAD: 1.47,  JPY: 162.50,
      CHF: 0.97,  MYR: 5.08,  THB: 39.10, ZAR: 20.10,
      KWD: 0.33,  QAR: 3.93,  BHD: 0.41,  OMR: 0.42,
      NZD: 1.79,  HKD: 8.44,
    };

    res.setHeader('Cache-Control', 's-maxage=600');
    return res.status(200).json(fallbackRates);
  }
}
