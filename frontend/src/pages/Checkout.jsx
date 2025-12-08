import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api'

const IMAGE_BASE = import.meta.env.DEV ? 'http://localhost/website-coffee-dev' : ''

export default function Checkout() {
  const { items, total, fetchCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)

  if (!isAuthenticated) {
    return (
      <div className="pt-8 fade-in">
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto">
          <h1 className="text-3xl font-extralight text-white mb-4">
            Необхідна авторизація
          </h1>
          <p className="text-white/60 font-light mb-8">
            Для оформлення замовлення потрібно увійти в акаунт
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="primary-button">
              Увійти
            </Link>
            <Link to="/register" className="glass-button">
              Реєстрація
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="pt-8 fade-in">
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto">
          <h1 className="text-3xl font-extralight text-white mb-4">
            Кошик порожній
          </h1>
          <Link to="/products" className="gradient-button">
            Перейти до каталогу
          </Link>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="pt-8 fade-in">
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-extralight text-white mb-4">
            Замовлення оформлено!
          </h1>
          <p className="text-white/60 font-light mb-2">
            Номер вашого замовлення:
          </p>
          <div className="text-4xl font-light gradient-text mb-8">
            #{orderId}
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/orders" className="primary-button">
              Мої замовлення
            </Link>
            <Link to="/products" className="glass-button">
              Продовжити покупки
            </Link>
          </div>
        </div>
      </div>
    )
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const result = await api.orders.create()
      setOrderId(result.order_id)
      setOrderComplete(true)
      fetchCart()
    } catch (error) {
      console.error('Failed to create order:', error)
      alert('Помилка при створенні замовлення')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-8 space-y-8 fade-in">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-light"
      >
        <ArrowLeft className="w-4 h-4" />
        Повернутись до кошика
      </Link>

      <div>
        <p className="text-sm font-light text-white/60 mb-1 uppercase tracking-widest">
          Оформлення
        </p>
        <h1 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
          Підтвердження замовлення
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const imageUrl = item.image 
              ? `${IMAGE_BASE}/images/${item.image}`
              : `${IMAGE_BASE}/images/placeholder.jpg`
            
            return (
              <div key={item.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/20 shrink-0">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-light text-white/90 truncate">{item.name}</h3>
                  <p className="text-sm text-white/50">
                    {item.quantity} × {Number(item.price).toLocaleString('uk-UA')} ₴
                  </p>
                </div>
                <div className="text-lg font-light gradient-text-warm">
                  {Number(item.total_price).toLocaleString('uk-UA')} ₴
                </div>
              </div>
            )
          })}
        </div>

        <div className="glass-card rounded-3xl p-6 h-fit sticky top-8">
          <h3 className="text-lg font-light text-white mb-6">Ваше замовлення</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-white/60 font-light">
              <span>Товари ({items.length})</span>
              <span>{Number(total).toLocaleString('uk-UA')} ₴</span>
            </div>
            <div className="flex justify-between text-white/60 font-light">
              <span>Доставка</span>
              <span className="text-green-400">Безкоштовно</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mb-6">
            <div className="flex justify-between">
              <span className="text-white font-light">Разом</span>
              <span className="text-2xl font-light gradient-text-warm">
                {Number(total).toLocaleString('uk-UA')} ₴
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full primary-button flex items-center justify-center gap-2"
          >
            {loading ? (
              'Оформлення...'
            ) : (
              <>
                <Package className="w-4 h-4" />
                Підтвердити замовлення
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
