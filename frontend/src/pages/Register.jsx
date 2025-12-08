import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Паролі не співпадають')
      return
    }

    if (password.length < 6) {
      setError('Пароль має бути не менше 6 символів')
      return
    }

    setLoading(true)

    try {
      await register(username, email, password, confirmPassword)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Помилка реєстрації')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-8 flex items-center justify-center min-h-[70vh] fade-in">
      <div className="glass-card rounded-3xl p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            Реєстрація
          </h1>
          <p className="text-white/60 font-light mt-2">
            Створіть новий акаунт
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/60 text-sm font-light mb-2">
              Логін
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Придумайте логін"
            />
          </div>

          <div>
            <label className="block text-white/60 text-sm font-light mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-white/60 text-sm font-light mb-2">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Мінімум 6 символів"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-sm font-light mb-2">
              Підтвердіть пароль
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Повторіть пароль"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full primary-button py-4"
          >
            {loading ? 'Реєстрація...' : 'Зареєструватись'}
          </button>
        </form>

        <p className="text-center text-white/60 font-light mt-6">
          Вже є акаунт?{' '}
          <Link to="/login" className="text-white hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  )
}

