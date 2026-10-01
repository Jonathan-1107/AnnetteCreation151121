import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useCatalogNav() {
  const [navDepartments, setNavDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNav() {
      const { data, error } = await supabase
        .from('departments')
        .select(`
          id, name,
          collections (
            id, name,
            categories ( id, name )
          )
        `)

      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

      const shaped = data.map((dept) => ({
        name: dept.name,
        page: 'shop',
        category: dept.name,
        dropdown: (dept.collections || []).map((col) => ({
          name: col.name,
          page: 'shop',
          category: col.name,
          children: (col.categories || []).map((cat) => ({
            name: cat.name,
            page: 'shop',
            category: cat.name
          }))
        }))
      }))

      setNavDepartments(shaped)
      setLoading(false)
    }
    fetchNav()
  }, [])

  return { navDepartments, loading }
}