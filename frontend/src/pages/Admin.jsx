import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Package, ShoppingCart, Users, FolderTree, 
  LogOut, Coffee, Plus, Edit, Trash2, Eye, Search,
  TrendingUp, DollarSign, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const API_BASE = '/api'

async function adminRequest(endpoint, options = {}) {
  const url = `${API_BASE}/admin${endpoint}`
  const config = {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  }
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }
  const response = await fetch(url, config)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Дашборд', exact: true },
  { path: '/admin/products', icon: Package, label: 'Товари' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Замовлення' },
  { path: '/admin/users', icon: Users, label: 'Користувачі' },
  { path: '/admin/categories', icon: FolderTree, label: 'Категорії' },
]

function AdminLayout({ children }) {
  const location = useLocation()
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login')
    }
  }, [isAdmin, navigate])

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <aside className="w-64 bg-black/50 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-medium">TeaPro</span>
              <span className="text-xs text-white/50 block">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{user?.username}</div>
              <div className="text-xs text-white/50">Адміністратор</div>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminRequest('/stats.php').then(setStats).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
      </div>
    </div>
  }

  const statCards = [
    { label: 'Дохід', value: `${stats?.total_revenue?.toLocaleString()} ₴`, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Замовлення', value: stats?.orders_count, icon: ShoppingCart, color: 'from-blue-500 to-cyan-500' },
    { label: 'Товари', value: stats?.products_count, icon: Package, color: 'from-amber-600 to-orange-600' },
    { label: 'Користувачі', value: stats?.users_count, icon: Users, color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light mb-2">Дашборд</h1>
        <p className="text-white/60">Огляд вашого магазину</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                <card.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-light mb-1">{card.value}</div>
            <div className="text-white/60 text-sm">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium mb-4">Останні замовлення</h3>
          <div className="space-y-3">
            {stats?.recent_orders?.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <div className="font-medium">Замовлення #{order.id}</div>
                  <div className="text-sm text-white/50">{order.username || 'Гість'}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{Number(order.total).toLocaleString()} ₴</div>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium mb-4">Топ товари</h3>
          <div className="space-y-3">
            {stats?.top_products?.map((product, i) => (
              <div key={product.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center text-sm font-medium">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium truncate">{product.name}</div>
                  <div className="text-sm text-white/50">{Number(product.price).toLocaleString()} ₴</div>
                </div>
                <div className="text-sm text-white/60">
                  {product.total_sold} продано
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const config = {
    pending: { icon: Clock, color: 'text-yellow-400 bg-yellow-500/20', label: 'Очікує' },
    processing: { icon: AlertCircle, color: 'text-blue-400 bg-blue-500/20', label: 'В обробці' },
    completed: { icon: CheckCircle, color: 'text-green-400 bg-green-500/20', label: 'Виконано' },
    cancelled: { icon: XCircle, color: 'text-red-400 bg-red-500/20', label: 'Скасовано' },
  }
  const s = config[status] || config.pending
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${s.color}`}>
      <s.icon className="w-3 h-3" />
      {s.label}
    </span>
  )
}

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([
      adminRequest('/products.php'),
      adminRequest('/categories.php')
    ]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
    }).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    if (!confirm('Видалити товар?')) return
    await adminRequest('/products.php', { method: 'DELETE', body: { id } })
    setProducts(products.filter(p => p.id !== id))
  }

  async function handleSave(data) {
    if (editingProduct) {
      await adminRequest('/products.php', { method: 'PUT', body: { ...data, id: editingProduct.id } })
    } else {
      const result = await adminRequest('/products.php', { method: 'POST', body: data })
      data.id = result.id
    }
    const updated = await adminRequest('/products.php')
    setProducts(updated)
    setShowModal(false)
    setEditingProduct(null)
  }

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light mb-2">Товари</h1>
          <p className="text-white/60">{products.length} товарів</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Додати товар
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук товарів..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
        />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">Товар</th>
                <th className="text-left p-4 text-white/60 font-medium">Категорія</th>
                <th className="text-left p-4 text-white/60 font-medium">Ціна</th>
                <th className="text-left p-4 text-white/60 font-medium">Залишок</th>
                <th className="text-right p-4 text-white/60 font-medium">Дії</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden">
                        {product.image && (
                          <img 
                            src={`http://localhost/website-coffee-dev/images/${product.image}`} 
                            alt="" 
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <div className="font-medium truncate max-w-[200px]">{product.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-white/70">{product.category_name || '—'}</td>
                  <td className="p-4 font-medium">{Number(product.price).toLocaleString()} ₴</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 10 ? 'bg-green-500/20 text-green-400' :
                      product.stock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {product.stock} шт
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditingProduct(product); setShowModal(true); }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function ProductModal({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    category_id: product?.category_id || '',
    stock: product?.stock || 0,
  })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-medium">
            {product ? 'Редагувати товар' : 'Новий товар'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Назва *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Опис</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Ціна *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Залишок</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                min="0"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Категорія</label>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
            >
              <option value="">Без категорії</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Зображення (назва файлу)</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="1.jpg"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl hover:opacity-90 transition-opacity"
            >
              {saving ? 'Збереження...' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    adminRequest('/orders.php').then(setOrders).finally(() => setLoading(false))
  }, [])

  async function updateStatus(id, status) {
    await adminRequest('/orders.php', { method: 'PUT', body: { id, status } })
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status })
    }
  }

  async function viewOrder(id) {
    const order = await adminRequest(`/orders.php?id=${id}`)
    setSelectedOrder(order)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light mb-2">Замовлення</h1>
        <p className="text-white/60">{orders.length} замовлень</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">ID</th>
                <th className="text-left p-4 text-white/60 font-medium">Клієнт</th>
                <th className="text-left p-4 text-white/60 font-medium">Сума</th>
                <th className="text-left p-4 text-white/60 font-medium">Статус</th>
                <th className="text-left p-4 text-white/60 font-medium">Дата</th>
                <th className="text-right p-4 text-white/60 font-medium">Дії</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">#{order.id}</td>
                  <td className="p-4">
                    <div>{order.username || 'Гість'}</div>
                    <div className="text-sm text-white/50">{order.email}</div>
                  </td>
                  <td className="p-4 font-medium">{Number(order.total).toLocaleString()} ₴</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-transparent border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="pending">Очікує</option>
                      <option value="processing">В обробці</option>
                      <option value="completed">Виконано</option>
                      <option value="cancelled">Скасовано</option>
                    </select>
                  </td>
                  <td className="p-4 text-white/70">
                    {new Date(order.created_at).toLocaleDateString('uk-UA')}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => viewOrder(order.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-medium">Замовлення #{selectedOrder.id}</h2>
              <StatusBadge status={selectedOrder.status} />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-sm text-white/60 mb-1">Клієнт</div>
                <div>{selectedOrder.username || 'Гість'} ({selectedOrder.email})</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Товари</div>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b border-white/5">
                      <div>{item.product_name} × {item.quantity}</div>
                      <div>{Number(item.price * item.quantity).toLocaleString()} ₴</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-lg font-medium pt-2">
                <span>Разом:</span>
                <span>{Number(selectedOrder.total).toLocaleString()} ₴</span>
              </div>
            </div>
            <div className="p-6 border-t border-white/10">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminRequest('/users.php').then(setUsers).finally(() => setLoading(false))
  }, [])

  async function updateRole(id, role) {
    try {
      await adminRequest('/users.php', { method: 'PUT', body: { id, role } })
      setUsers(users.map(u => u.id === id ? { ...u, role } : u))
    } catch (e) {
      alert(e.message)
    }
  }

  async function deleteUser(id) {
    if (!confirm('Видалити користувача?')) return
    try {
      await adminRequest('/users.php', { method: 'DELETE', body: { id } })
      setUsers(users.filter(u => u.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light mb-2">Користувачі</h1>
        <p className="text-white/60">{users.length} користувачів</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">Користувач</th>
                <th className="text-left p-4 text-white/60 font-medium">Email</th>
                <th className="text-left p-4 text-white/60 font-medium">Роль</th>
                <th className="text-left p-4 text-white/60 font-medium">Замовлень</th>
                <th className="text-left p-4 text-white/60 font-medium">Витрачено</th>
                <th className="text-right p-4 text-white/60 font-medium">Дії</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium">{user.username}</div>
                    </div>
                  </td>
                  <td className="p-4 text-white/70">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className="bg-transparent border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="user">Користувач</option>
                      <option value="admin">Адмін</option>
                    </select>
                  </td>
                  <td className="p-4">{user.orders_count}</td>
                  <td className="p-4 font-medium">{Number(user.total_spent).toLocaleString()} ₴</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    adminRequest('/categories.php').then(setCategories).finally(() => setLoading(false))
  }, [])

  async function handleSave(data) {
    if (editing) {
      await adminRequest('/categories.php', { method: 'PUT', body: { ...data, id: editing.id } })
    } else {
      await adminRequest('/categories.php', { method: 'POST', body: data })
    }
    const updated = await adminRequest('/categories.php')
    setCategories(updated)
    setShowModal(false)
    setEditing(null)
  }

  async function handleDelete(id) {
    if (!confirm('Видалити категорію?')) return
    await adminRequest('/categories.php', { method: 'DELETE', body: { id } })
    setCategories(categories.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light mb-2">Категорії</h1>
          <p className="text-white/60">{categories.length} категорій</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Додати
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                <FolderTree className="w-6 h-6" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(cat); setShowModal(true); }} className="p-2 hover:bg-white/10 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-1">{cat.name}</h3>
            <p className="text-white/60 text-sm mb-3">{cat.description || 'Без опису'}</p>
            <div className="text-sm text-white/40">{cat.products_count} товарів</div>
          </div>
        ))}
      </div>

      {showModal && (
        <CategoryModal
          category={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function CategoryModal({ category, onClose, onSave }) {
  const [form, setForm] = useState({
    name: category?.name || '',
    description: category?.description || '',
  })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-medium">
            {category ? 'Редагувати категорію' : 'Нова категорія'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Назва *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Опис</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl">
              Скасувати
            </button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl">
              {saving ? 'Збереження...' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Admin() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </AdminLayout>
  )
}

