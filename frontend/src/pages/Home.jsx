import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Coffee, Truck, Shield, Star, Award, Users, Clock, ChevronRight, Quote } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import api from '../api'

const features = [
  {
    icon: Coffee,
    title: 'Преміальна якість',
    description: 'Тільки найкраще обладнання від провідних світових виробників',
  },
  {
    icon: Truck,
    title: 'Швидка доставка',
    description: 'Безкоштовна доставка по всій Україні за 1-3 робочі дні',
  },
  {
    icon: Shield,
    title: 'Офіційна гарантія',
    description: 'До 3 років гарантії на все обладнання від виробника',
  },
  {
    icon: Star,
    title: 'Експертна підтримка',
    description: 'Безкоштовні консультації та налаштування обладнання',
  },
]

const stats = [
  { value: '9+', label: 'Років на ринку', icon: Clock },
  { value: '50K+', label: 'Задоволених клієнтів', icon: Users },
  { value: '200+', label: 'Моделей обладнання', icon: Coffee },
  { value: '15+', label: 'Офіційних брендів', icon: Award },
]

const brands = [
  'DeLonghi', 'Bosch', 'Philips', 'Siemens', 'Twinings', 'Ahmad', 'Taylors', 'Fortnum'
]

const testimonials = [
  {
    name: 'Олександр Петренко',
    role: 'Власник чайної "Aroma"',
    text: 'Працюємо з TeaPro вже 4 роки. Завжди оперативна доставка, професійні консультації та чудовий сервіс. Рекомендую!',
    rating: 5,
  },
  {
    name: 'Марія Коваленко',
    role: 'HoReCa менеджер',
    text: 'Обладнання від TeaPro допомогло нам підвищити якість чаю в нашому ресторані. Клієнти в захваті!',
    rating: 5,
  },
  {
    name: 'Ігор Шевченко',
    role: 'Приватний покупець',
    text: 'Купив чайник для дому. Консультанти допомогли обрати ідеальний варіант під мій бюджет. Дякую!',
    rating: 5,
  },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await api.products.getAll()
        setProducts(data.slice(0, 4))
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="min-h-[80vh] flex items-center justify-center pt-12 fade-in">
        <div className="text-center w-full max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70 font-light">Офіційний дистриб'ютор в Україні</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-6">
            Професійне<br />
            <span className="gradient-text">чайне обладнання</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            Від провідних світових брендів для вашого бізнесу та дому.
            Якість, яка формує смак.
          </p>
          
          <SearchBar className="max-w-xl mx-auto mb-10" />

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/products"
              className="primary-button inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Каталог товарів
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="glass-button inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Зв'язатись з нами
            </Link>
          </div>
        </div>
      </section>

      <section className="fade-in" style={{ animationDelay: '100ms' }}>
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-white/40" />
                <div className="text-4xl md:text-5xl font-extralight gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 font-light text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-in" style={{ animationDelay: '200ms' }}>
        <div className="text-center mb-12">
          <p className="text-sm font-light text-white/60 mb-3 uppercase tracking-widest">
            Чому обирають нас
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">
            Ваші переваги
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 hover:bg-black/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="text-lg font-light text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-sm font-light text-white/60 mb-2 uppercase tracking-widest">
              Популярні товари
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
              Рекомендовано для вас
            </h2>
          </div>
          <Link
            to="/products"
            className="glass-button inline-flex items-center gap-2"
          >
            Всі товари
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-card rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="fade-in" style={{ animationDelay: '400ms' }}>
        <div className="text-center mb-12">
          <p className="text-sm font-light text-white/60 mb-3 uppercase tracking-widest">
            Наші партнери
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
            Офіційний дистриб'ютор
          </h2>
        </div>
        <div className="glass-card rounded-2xl p-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand) => (
              <div
                key={brand}
                className="text-2xl md:text-3xl font-extralight text-white/30 hover:text-white/60 transition-colors cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-in" style={{ animationDelay: '500ms' }}>
        <div className="text-center mb-12">
          <p className="text-sm font-light text-white/60 mb-3 uppercase tracking-widest">
            Відгуки клієнтів
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
            Нам довіряють
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-2xl p-6 hover:bg-black/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-amber-400/30 mb-4" />
              <p className="text-white/80 font-light leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center text-white font-medium">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-light">{testimonial.name}</div>
                  <div className="text-white/50 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in" style={{ animationDelay: '600ms' }}>
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(to right, rgba(217, 119, 6, 0.1), rgba(234, 88, 12, 0.1))' }}>
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Потрібна консультація?
          </h2>
          <p className="text-lg font-light max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
            Наші експерти безкоштовно допоможуть підібрати ідеальне обладнання для вашого бізнесу або домашнього використання.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="primary-button inline-flex items-center gap-2 px-8">
              Зв'язатись з нами
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+380441234567" className="glass-button">
              +38 (044) 123-45-67
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
