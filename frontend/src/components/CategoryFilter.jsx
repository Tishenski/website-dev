import { useEffect, useState } from 'react'
import api from '../api'

export default function CategoryFilter({ selected, onSelect }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.categories.getAll()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-10 w-24 bg-white/10 rounded-full animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={`px-5 py-2 rounded-full text-sm font-light whitespace-nowrap transition-all duration-150 ${
          selected === null
            ? 'bg-white text-black'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        Усі товари
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2 rounded-full text-sm font-light whitespace-nowrap transition-all duration-150 ${
            selected === cat.id
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

