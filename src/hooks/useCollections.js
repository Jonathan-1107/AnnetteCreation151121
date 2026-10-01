import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useCollections() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCollections() {
      const { data, error } = await supabase
        .from('collections')
        .select(`
          id, name,
          categories (
            products ( id )
          )
        `)

      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

      const shaped = data.map((c) => ({
        id: c.id,
        name: c.name,
        image: '' // TODO: wire up once product_variants (or product images) exist
      }))

      setCollections(shaped)
      setLoading(false)
    }
    fetchCollections()
  }, [])

  return { collections, loading }
}