import { useMemo } from 'react'
import { useProducts } from './useProducts'

/**
 * Returns `count` random, distinct product images pulled from live Supabase data.
 * Falls back to an empty array if no products/images are available yet.
 */
export function useRandomProductImages(count = 1) {
  const { products, loading } = useProducts()

  const randomImages = useMemo(() => {
    const allImages = products
      .map((p) => p.image)
      .filter(Boolean)

    if (allImages.length === 0) return []

    const shuffled = [...allImages].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }, [products, count])

  return { randomImages, loading }
}