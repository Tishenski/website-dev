import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import api from '../api'

export default function Products() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const searchQuery = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category')

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(Number(categoryParam))
    }
  }, [categoryParam])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const params = {}
        if (searchQuery) params.q = searchQuery
        if (selectedCategory) params.category = selectedCategory
        
        const data = await api.products.getAll(params)
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [searchQuery, selectedCategory])

  return (
    <div className="space-y-8 pt-8">
      <section className="fade-in">
        <div className="text-center mb-8">
          <p className="text-sm font-light text-white/60 mb-2 uppercase tracking-widest">
            Каталог товарів
          </p>
          <h1 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">
            {searchQuery ? `Результати для "${searchQuery}"` : 'Усі товари'}
          </h1>
        </div>

        <SearchBar initialValue={searchQuery} className="max-w-2xl mx-auto mb-8" />

        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </section>

      <section className="fade-in" style={{ animationDelay: '200ms' }}>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="glass-card rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-white/60 text-lg font-light">
              Товарів не знайдено
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

