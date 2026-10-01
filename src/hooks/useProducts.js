import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, name, slug, description, tagline, base_price, seller_sku,
          is_bestseller, is_top_pick, scent_family, burn_time,
          wax_type, wick, net_weight, vessel, rating, review_count,
          image_url,
          categories ( name, collections ( name ) ),
          product_images ( image_url, display_order )
        `)
      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

            const shaped = data.map((p) => {
        const galleryImages = (p.product_images || [])
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          .map((img) => img.image_url)
          .filter(Boolean)

        const images = [p.image_url, ...galleryImages].filter(Boolean)

        return {

          id: p.id,
          sku: p.seller_sku || '',
          title: p.name,
          slug: p.slug || String(p.id),
          category: p.categories?.name || '',
          collection: p.categories?.collections?.name || '',
          price: p.base_price || 0,
          comparePrice: null,
          rating: p.rating || 5,
          reviewCount: p.review_count || 0,
          image: images[0] || '',
          hoverImage: images[1] || images[0] || '',
          images,
          isBestseller: p.is_bestseller,
          tag: p.is_bestseller ? 'Best Seller' : (p.is_top_pick ? 'Top Pick' : null),
          scentFamily: p.scent_family || '',
          burnTime: p.burn_time || '65 Hours',
          waxType: p.wax_type,
          wick: p.wick || '',
          netWeight: p.net_weight || '',
          vessel: p.vessel || '',
          tagline: p.tagline || '',
          description: p.description || '',
          scentPyramid: { top: [], heart: [], base: [] },
          specs: { intensity: '', mood: '', roomPlacement: '' },
          reviews: []
        }
      })

      setProducts(shaped)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return { products, loading }
}