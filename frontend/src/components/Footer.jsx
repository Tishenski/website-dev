import { Link } from 'react-router-dom'
import { Coffee, Mail, Phone, MapPin, Instagram, Facebook, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-card mt-24 rounded-t-3xl border-b-0">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-light" style={{ color: 'var(--text-primary)' }}>TeaPro</span>
            </Link>
            <p className="font-light leading-relaxed mb-6" style={{ color: 'var(--text-tertiary)' }}>
              Офіційний дистриб'ютор професійного чайного обладнання в Україні з 2015 року.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)' }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)' }}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)' }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)' }}>
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)' }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)' }}>
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Навігація</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors font-light">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/60 hover:text-white transition-colors font-light">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 hover:text-white transition-colors font-light">
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-white transition-colors font-light">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Покупцям</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/cart" className="text-white/60 hover:text-white transition-colors font-light">
                  Кошик
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-white/60 hover:text-white transition-colors font-light">
                  Мої замовлення
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors font-light">
                  Доставка і оплата
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors font-light">
                  Гарантія та повернення
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Контакти</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/40 mt-0.5" />
                <div>
                  <a href="tel:+380441234567" className="text-white hover:text-amber-400 transition-colors font-light block">
                    +38 (044) 123-45-67
                  </a>
                  <span className="text-white/40 text-sm">Пн-Пт: 9:00 - 18:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/40 mt-0.5" />
                <a href="mailto:info@teapro.ua" className="text-white hover:text-amber-400 transition-colors font-light">
                  info@teapro.ua
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/40 mt-0.5" />
                <span className="text-white/60 font-light">
                  м. Київ, вул. Хрещатик, 22
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-light">
            © {new Date().getFullYear()} TeaPro. Усі права захищені.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm font-light transition-colors">
              Політика конфіденційності
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm font-light transition-colors">
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

