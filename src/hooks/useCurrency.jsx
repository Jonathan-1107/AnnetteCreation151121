import { useState, useEffect, useContext, createContext, useCallback } from 'react';

// ---------------------------------------------------------------------------
// COUNTRY → CURRENCY MAP
// Add more countries here as your business expands.
// ---------------------------------------------------------------------------
export const COUNTRY_CURRENCY_MAP = {
  // India — uses INR price directly from Supabase base_price
  IN: { code: 'INR', symbol: '₹',   name: 'Indian Rupee',       source: 'inr' },

  // Eurozone — uses EUR price directly from Supabase price_eur
  DE: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  FR: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  IT: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  ES: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  NL: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  BE: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  AT: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  PT: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  FI: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  GR: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  IE: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  LU: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  SK: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  SI: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  EE: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  LV: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  LT: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  CY: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  MT: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },
  HR: { code: 'EUR', symbol: '€',   name: 'Euro',               source: 'eur' },

  // All other regions — auto-converted from price_eur via Frankfurter API
  US: { code: 'USD', symbol: '$',   name: 'US Dollar',          source: 'convert' },
  GB: { code: 'GBP', symbol: '£',   name: 'British Pound',      source: 'convert' },
  AE: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham',         source: 'convert' },
  SA: { code: 'SAR', symbol: '﷼',   name: 'Saudi Riyal',        source: 'convert' },
  SG: { code: 'SGD', symbol: 'S$',  name: 'Singapore Dollar',   source: 'convert' },
  AU: { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar',  source: 'convert' },
  CA: { code: 'CAD', symbol: 'C$',  name: 'Canadian Dollar',    source: 'convert' },
  JP: { code: 'JPY', symbol: '¥',   name: 'Japanese Yen',       source: 'convert' },
  CH: { code: 'CHF', symbol: 'Fr',  name: 'Swiss Franc',        source: 'convert' },
  MY: { code: 'MYR', symbol: 'RM',  name: 'Malaysian Ringgit',  source: 'convert' },
  TH: { code: 'THB', symbol: '฿',   name: 'Thai Baht',          source: 'convert' },
  ZA: { code: 'ZAR', symbol: 'R',   name: 'South African Rand', source: 'convert' },
  KW: { code: 'KWD', symbol: 'KD',  name: 'Kuwaiti Dinar',      source: 'convert' },
  QA: { code: 'QAR', symbol: 'QR',  name: 'Qatari Riyal',       source: 'convert' },
  BH: { code: 'BHD', symbol: 'BD',  name: 'Bahraini Dinar',     source: 'convert' },
  OM: { code: 'OMR', symbol: 'RO',  name: 'Omani Rial',         source: 'convert' },
  NZ: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', source: 'convert' },
  HK: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar',   source: 'convert' },
};

// Currencies available in the manual switcher dropdown in Header
export const SWITCHER_CURRENCIES = [
  { code: 'INR', label: '₹  INR — Indian Rupee' },
  { code: 'EUR', label: '€  EUR — Euro' },
  { code: 'USD', label: '$  USD — US Dollar' },
  { code: 'GBP', label: '£  GBP — British Pound' },
  { code: 'AED', label: 'د.إ  AED — UAE Dirham' },
  { code: 'SAR', label: '﷼  SAR — Saudi Riyal' },
  { code: 'SGD', label: 'S$  SGD — Singapore Dollar' },
  { code: 'AUD', label: 'A$  AUD — Australian Dollar' },
  { code: 'CAD', label: 'C$  CAD — Canadian Dollar' },
  { code: 'GBP', label: '£  GBP — British Pound' },
];

const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP['IN'];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

/** Read the country cookie set by Vercel Middleware (or fall back to 'IN') */
function getCountryFromCookie() {
  if (typeof document === 'undefined') return 'IN';
  const match = document.cookie.match(/annette_country=([A-Z]{2})/);
  return match ? match[1] : null;
}

/** Read manually-overridden currency from localStorage */
function getSavedCurrencyCode() {
  try {
    return localStorage.getItem('annette_currency') || null;
  } catch {
    return null;
  }
}

/** Find currency object by its code */
function currencyByCode(code) {
  return Object.values(COUNTRY_CURRENCY_MAP).find((c) => c.code === code) || null;
}

// ---------------------------------------------------------------------------
// CONTEXT
// ---------------------------------------------------------------------------
const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [rates, setRates]       = useState({});          // EUR-based live rates
  const [ratesLoaded, setRatesLoaded] = useState(false);
  const [country, setCountry]   = useState('IN');

  // --- On mount: detect country → pick currency ---
  useEffect(() => {
    // 1. Manual override wins (user explicitly chose via the selector)
    const saved = getSavedCurrencyCode();
    if (saved) {
      const found = currencyByCode(saved);
      if (found) { setCurrency(found); return; }
    }
    // 2. Vercel geo cookie
    const detectedCountry = getCountryFromCookie();
    if (detectedCountry) {
      setCountry(detectedCountry);
      const detected = COUNTRY_CURRENCY_MAP[detectedCountry] || DEFAULT_CURRENCY;
      setCurrency(detected);
      return;
    }
    // 3. Default to INR
    setCurrency(DEFAULT_CURRENCY);
  }, []);

  // --- Fetch live EUR-based rates whenever needed ---
  useEffect(() => {
    if (currency.source !== 'convert') {
      // INR and EUR don't need external rates
      setRatesLoaded(true);
      return;
    }
    setRatesLoaded(false);
    fetch('/api/rates')
      .then((r) => r.json())
      .then((data) => {
        setRates(data);
        setRatesLoaded(true);
      })
      .catch(() => {
        // Hardcoded ECB approximate fallback rates (EUR-based)
        setRates({
          USD: 1.08, GBP: 0.86, AED: 3.97, SAR: 4.05,
          SGD: 1.46, AUD: 1.67, CAD: 1.47, JPY: 162.5,
          CHF: 0.97, MYR: 5.08, THB: 39.1,  ZAR: 20.1,
          KWD: 0.33, QAR: 3.93, BHD: 0.41,  OMR: 0.42,
          NZD: 1.79, HKD: 8.44,
        });
        setRatesLoaded(true);
      });
  }, [currency.source]);

  // --- Convert a product price to the active currency ---
  // priceInr  = product.price     (from Supabase base_price)
  // priceEur  = product.priceEur  (from Supabase price_eur — manually set)
  const convertPrice = useCallback(
    (priceInr, priceEur) => {
      if (currency.source === 'inr') return priceInr ?? null;
      if (currency.source === 'eur') return priceEur ?? null;
      // convert: EUR → target currency
      if (priceEur == null) return null; // product not priced for international
      const rate = rates[currency.code];
      if (!rate) return null;
      return +(priceEur * rate).toFixed(2);
    },
    [currency, rates]
  );

  // --- Format a numeric amount as a currency string ---
  const formatPrice = useCallback(
    (amount) => {
      if (amount === null || amount === undefined) return '—';
      try {
        return new Intl.NumberFormat('en', {
          style: 'currency',
          currency: currency.code,
          minimumFractionDigits: currency.code === 'JPY' ? 0 : 2,
          maximumFractionDigits: currency.code === 'JPY' ? 0 : 2,
        }).format(amount);
      } catch {
        return `${currency.symbol}${amount.toFixed(2)}`;
      }
    },
    [currency]
  );

  // --- Manual currency switcher (user override) ---
  const switchCurrency = useCallback((code) => {
    const found = currencyByCode(code);
    if (!found) return;
    setCurrency(found);
    try { localStorage.setItem('annette_currency', code); } catch {}
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        country,
        rates,
        ratesLoaded,
        convertPrice,
        formatPrice,
        switchCurrency,
        SWITCHER_CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// HOOK
// ---------------------------------------------------------------------------
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside <CurrencyProvider>');
  return ctx;
}
