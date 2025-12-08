import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingBag, Clock, Check, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../api'

const statusConfig = {
  pending: { label: 'Очікує', icon: Clock, color: 'text-yellow-400 bg-yellow-500/20' },
  processing: { label: 'В обробці', icon: Package, color: 'text-blue-400 bg-blue-500/20' },
  completed: { label: 'Виконано', icon: Check, color: 'text-green-400 bg-green-500/20' },
  cancelled: { label: 'Скасовано', icon: X, color: 'text-red-400 bg-red-500/20' },
}

export default function Orders() {
  const { isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await api.orders.getAll()
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="pt-8 fade-in">
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto">
          <h1 className="text-3xl font-extralight text-white mb-4">
            Необхідна авторизація
          </h1>
          <p className="text-white/60 font-light mb-8">
            Для перегляду замовлень потрібно увійти в акаунт
          </p>
          <Link to="/login" className="primary-button">
            Увійти
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="pt-8 space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-pulse h-32" />
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="pt-8 fade-in">
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-white/30" />
          <h1 className="text-3xl font-extralight text-white mb-4">
            Замовлень поки немає
          </h1>
          <p className="text-white/60 font-light mb-8">
            Ваші замовлення будуть відображатись тут
          </p>
          <Link to="/products" className="gradient-button">
            Перейти до каталогу
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-8 space-y-8 fade-in">
      <div>
        <p className="text-sm font-light text-white/60 mb-1 uppercase tracking-widest">
          Ваш акаунт
        </p>
        <h1 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
          Мої замовлення
        </h1>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => {
          const status = statusConfig[order.status] || statusConfig.pending
          const StatusIcon = status.icon
          const date = new Date(order.created_at).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })

          return (
            <div
              key={order.id}
              className="glass-card rounded-2xl p-6 fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white">
                      Замовлення #{order.id}
                    </h3>
                    <p className="text-white/50 text-sm">{date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${status.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-light">{status.label}</span>
                  </div>
                  <div className="text-xl font-light gradient-text-warm">
                    {Number(order.total).toLocaleString('uk-UA')} ₴
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

