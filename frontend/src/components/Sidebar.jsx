import { Link, useLocation } from 'react-router-dom'
import { Coffee, ShoppingBag, ShoppingCart, User, LogOut, Package, Home, Info, Mail, Settings, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { path: '/', icon: Home, label: 'Головна' },
  { path: '/products', icon: ShoppingBag, label: 'Каталог' },
  { path: '/cart', icon: ShoppingCart, label: 'Кошик' },
  { path: '/about', icon: Info, label: 'Про нас' },
  { path: '/contact', icon: Mail, label: 'Контакти' },
]

export default function Sidebar() {
  const location = useLocation()
  const { isAuthenticated, isAdmin, logout, user } = useAuth()
  const { count } = useCart()
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col gap-3 sm:gap-4 py-6 px-3 items-center bg-transparent z-50 print:hidden">
      <Link
        to="/"
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-150"
        style={{
          backgroundColor: isDark ? '#ffffff' : '#1a1a1a',
          color: isDark ? '#000000' : '#ffffff'
        }}
      >
        <Coffee className="w-5 h-5" />
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          const isCartPath = path === '/cart'
          
          return (
            <Link
              key={path}
              to={path}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 ${
                isActive
                  ? 'scale-105 shadow-md'
                  : 'backdrop-blur-sm border hover:scale-105'
              }`}
              style={{
                backgroundColor: isActive 
                  ? (isDark ? '#ffffff' : '#1a1a1a')
                  : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
                color: isActive 
                  ? (isDark ? '#000000' : '#ffffff')
                  : (isDark ? '#ffffff' : '#1a1a1a'),
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }}
              title={label}
            >
              <Icon className="w-4 h-4" />
              {isCartPath && count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-[10px] flex items-center justify-center font-medium">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>
          )
        })}

        {isAuthenticated && (
          <Link
            to="/orders"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 ${
              location.pathname === '/orders'
                ? 'scale-105 shadow-md'
                : 'backdrop-blur-sm border hover:scale-105'
            }`}
            style={{
              backgroundColor: location.pathname === '/orders'
                ? (isDark ? '#ffffff' : '#1a1a1a')
                : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
              color: location.pathname === '/orders'
                ? (isDark ? '#000000' : '#ffffff')
                : (isDark ? '#ffffff' : '#1a1a1a'),
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }}
            title="Замовлення"
          >
            <Package className="w-4 h-4" />
          </Link>
        )}

        {isAdmin && (
          <Link
            to="/admin"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 ${
              location.pathname.startsWith('/admin')
                ? 'scale-105 shadow-md'
                : 'backdrop-blur-sm border hover:scale-105'
            }`}
            style={{
              background: location.pathname.startsWith('/admin')
                ? 'linear-gradient(to right, #d97706, #ea580c)'
                : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
              color: location.pathname.startsWith('/admin')
                ? '#ffffff'
                : (isDark ? '#ffffff' : '#1a1a1a'),
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }}
            title="Адмін панель"
          >
            <Settings className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm border hover:scale-105 transition-all duration-150"
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            color: isDark ? '#ffffff' : '#1a1a1a',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
          title={isDark ? 'Світла тема' : 'Темна тема'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        {isAuthenticated ? (
          <>
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-medium" title={user?.username}>
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={logout}
              className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm border hover:scale-105 transition-all duration-150"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                color: isDark ? '#ffffff' : '#1a1a1a',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }}
              title="Вийти"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 ${
              location.pathname === '/login' || location.pathname === '/register'
                ? 'scale-105 shadow-md'
                : 'backdrop-blur-sm border hover:scale-105'
            }`}
            style={{
              backgroundColor: (location.pathname === '/login' || location.pathname === '/register')
                ? (isDark ? '#ffffff' : '#1a1a1a')
                : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
              color: (location.pathname === '/login' || location.pathname === '/register')
                ? (isDark ? '#000000' : '#ffffff')
                : (isDark ? '#ffffff' : '#1a1a1a'),
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }}
            title="Увійти"
          >
            <User className="w-4 h-4" />
          </Link>
        )}
      </div>
    </aside>
  )
}
