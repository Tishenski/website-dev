import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

const IMAGE_BASE = import.meta.env.DEV ? 'http://localhost/website-coffee-dev' : ''

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const imageUrl = item.image 
    ? `${IMAGE_BASE}/images/${item.image}`
    : `${IMAGE_BASE}/images/placeholder.jpg`

  return (
    <div className="glass-card rounded-2xl p-4 flex gap-4 items-center">
      <Link to={`/product/${item.id}`} className="shrink-0">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/20">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id}`}>
          <h3 className="font-light text-white/90 hover:text-white transition-colors truncate">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-white/50 mt-1">
          {Number(item.price).toLocaleString('uk-UA')} ₴ / шт
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center font-light">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="text-lg font-light gradient-text-warm min-w-[100px] text-right">
          {Number(item.total_price).toLocaleString('uk-UA')} ₴
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
