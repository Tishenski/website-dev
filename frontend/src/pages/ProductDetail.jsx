import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Check, Package, Truck, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'
import api from '../api'

const IMAGE_BASE = import.meta.env.DEV ? 'http://localhost/website-coffee-dev' : ''

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await api.products.getById(id)
        setProduct(data)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  async function handleAddToCart() {
    setAdding(true)
    const success = await addToCart(product.id, quantity)
    setAdding(false)
    if (success) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="pt-8 space-y-8">
        <div className="glass-card rounded-2xl p-8 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 aspect-square bg-white/10 rounded-xl" />
            <div className="lg:w-1/2 space-y-4">
              <div className="h-8 bg-white/10 rounded w-1/3" />
              <div className="h-12 bg-white/10 rounded w-2/3" />
              <div className="h-24 bg-white/10 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-8">
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-white/60 text-lg font-light mb-4">Товар не знайдено</p>
          <Link to="/products" className="glass-button inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Повернутись до каталогу
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = product.image 
    ? `${IMAGE_BASE}/images/${product.image}`
    : `${IMAGE_BASE}/images/placeholder.jpg`

  return (
    <div className="pt-8 space-y-8 fade-in">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-light"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад до каталогу
      </Link>

      <div className="glass-card rounded-3xl p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-1/2">
            <div className="aspect-square rounded-2xl overflow-hidden bg-black/20">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col">
            <p className="text-sm uppercase tracking-widest text-white/50 mb-2">
              {product.category_name}
            </p>
            <h1 className="text-3xl md:text-4xl font-extralight text-white tracking-tight mb-4">
              {product.name}
            </h1>

            <div className="text-4xl font-light gradient-text-warm mb-6">
              {Number(product.price).toLocaleString('uk-UA')} ₴
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center font-light text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`flex-1 py-4 rounded-full font-light transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-black hover:scale-[1.02]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Додано до кошика
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Додати до кошика
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-card rounded-xl p-4 text-center">
                <Package className="w-5 h-5 mx-auto mb-2 text-white/60" />
                <p className="text-xs text-white/50">В наявності</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Truck className="w-5 h-5 mx-auto mb-2 text-white/60" />
                <p className="text-xs text-white/50">Швидка доставка</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Shield className="w-5 h-5 mx-auto mb-2 text-white/60" />
                <p className="text-xs text-white/50">Гарантія</p>
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="text-lg font-light text-white mb-3">Опис</h3>
              <p className="text-white/70 font-light leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
