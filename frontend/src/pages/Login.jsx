import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Помилка входу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-8 flex items-center justify-center min-h-[70vh] fade-in">
      <div className="glass-card rounded-3xl p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            Вхід
          </h1>
          <p className="text-white/60 font-light mt-2">
            Увійдіть до свого акаунту
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
              placeholder="Ваш логін"
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
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Ваш пароль"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full primary-button py-4"
          >
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <p className="text-center text-white/60 font-light mt-6">
          Немає акаунту?{' '}
          <Link to="/register" className="text-white hover:underline">
            Зареєструватись
          </Link>
        </p>
      </div>
    </div>
  )
}

