import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const { items, total, count, loading, clearCart } = useCart()
  const { isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="pt-8 space-y-6">
        <div className="glass-card rounded-2xl p-6 animate-pulse h-24" />
        <div className="glass-card rounded-2xl p-6 animate-pulse h-24" />
        <div className="glass-card rounded-2xl p-6 animate-pulse h-24" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="pt-8 fade-in">
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-white/30" />
          <h1 className="text-3xl font-extralight text-white mb-4">
            Кошик порожній
          </h1>
          <p className="text-white/60 font-light mb-8">
            Додайте товари з каталогу, щоб оформити замовлення
          </p>
          <Link to="/products" className="gradient-button inline-flex items-center gap-2">
            Перейти до каталогу
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-8 space-y-8 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-light text-white/60 mb-1 uppercase tracking-widest">
            Ваш кошик
          </p>
          <h1 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
            {count} {count === 1 ? 'товар' : count < 5 ? 'товари' : 'товарів'}
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="glass-button inline-flex items-center gap-2 text-red-400 border-red-500/20 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
          Очистити
        </button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white/60 font-light mb-1">Загальна сума</p>
            <div className="text-4xl font-light gradient-text-warm">
              {Number(total).toLocaleString('uk-UA')} ₴
            </div>
          </div>

          {isAuthenticated ? (
            <Link
              to="/checkout"
              className="primary-button inline-flex items-center justify-center gap-2 px-8"
            >
              Оформити замовлення
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="text-center md:text-right">
              <p className="text-white/60 font-light mb-3">
                Для оформлення замовлення потрібно увійти
              </p>
              <div className="flex gap-3 justify-center md:justify-end">
                <Link to="/login" className="primary-button">
                  Увійти
                </Link>
                <Link to="/register" className="glass-button">
                  Реєстрація
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

