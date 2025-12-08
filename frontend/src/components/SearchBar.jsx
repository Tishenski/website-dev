import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ initialValue = '', className = '' }) {
  const [query, setQuery] = useState(initialValue)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук товарів..."
        className="w-full px-5 py-3 pl-12 backdrop-blur-sm border rounded-full font-light focus:outline-none transition-all duration-150"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-light)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--border-color)'
          e.target.style.backgroundColor = 'var(--bg-secondary)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-light)'
          e.target.style.backgroundColor = 'var(--bg-tertiary)'
        }}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-sm font-light hover:scale-105 transition-transform duration-150"
        style={{
          backgroundColor: 'var(--text-primary)',
          color: 'var(--bg-primary)'
        }}
      >
        Знайти
      </button>
    </form>
  )
}

