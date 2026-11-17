-- ============================================================
-- ANNETTE CREATION — Multi-Currency Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- Step 1: Add EUR price columns to the products table
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS price_eur NUMERIC(10, 2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS compare_price_eur NUMERIC(10, 2) DEFAULT NULL;

-- Step 2: Add a comment so your team knows what these mean
COMMENT ON COLUMN products.price_eur IS
  'Euro price — manually set, NOT converted from INR. Used directly for EU users.';

COMMENT ON COLUMN products.compare_price_eur IS
  'Euro compare/strike-through price — manually set.';

-- Step 3: Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN ('price_eur', 'compare_price_eur', 'base_price');

-- ============================================================
-- After running this, go to:
--   Supabase Dashboard → Table Editor → products
-- and manually fill in price_eur for each product.
-- ============================================================
