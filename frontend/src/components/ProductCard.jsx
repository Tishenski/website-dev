import { Link } from 'react-router-dom'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const IMAGE_BASE = import.meta.env.DEV ? 'http://localhost/website-coffee-dev' : ''

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)

  async function handleAddToCart(e) {
    e.preventDefault()
    setAdding(true)
    await addToCart(product.id)
    setTimeout(() => setAdding(false), 500)
  }

  const imageUrl = product.image 
    ? `${IMAGE_BASE}/images/${product.image}`
    : `${IMAGE_BASE}/images/placeholder.jpg`

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden group transition-all duration-300 fade-in"
      style={{ 
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--glass-bg)'
      }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-black/20">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-tertiary)' }}>
          {product.category_name}
        </p>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-light text-lg mb-2 line-clamp-2 transition-colors" style={{ color: 'var(--text-secondary)' }}>
            {product.name}
          </h3>
        </Link>

        <p className="text-sm font-light line-clamp-2 mb-4" style={{ color: 'var(--text-tertiary)' }}>
          {product.description?.slice(0, 80)}...
        </p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-light gradient-text-warm">
            {Number(product.price).toLocaleString('uk-UA')} ₴
          </div>

          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
              }}
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 ${
                adding ? 'scale-110' : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: adding ? '#10b981' : 'var(--text-primary)',
                color: adding ? '#ffffff' : 'var(--bg-primary)'
              }}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
