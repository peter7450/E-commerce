import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, signup } = useAuth()

  const returnTo = location.state?.from?.pathname || '/'

  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await signup(email, password)
      }
      navigate(returnTo, { replace: true })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function switchMode() {
    setMode((m) => (m === 'login' ? 'signup' : 'login'))
    setError('')
  }

  const isLogin = mode === 'login'

  return (
    <div className="min-h-screen bg-slate-950 text-white lg:grid lg:grid-cols-2">

      {/* ── Left: Brand image panel ── */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80"
          alt="Brand visual"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-slate-950/10" />

        {/* Brand tag */}
        <div className="absolute bottom-10 left-10 max-w-xs">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
            Premium Streetwear
          </p>
          <p className="mt-2 text-2xl font-bold leading-snug text-white">
            Style is a way to say who you are without having to speak.
          </p>
        </div>

        {/* Logo top-left */}
        <div className="absolute left-10 top-10">
          <Link to="/" className="text-xl font-bold tracking-tight text-white">
            BRAND
          </Link>
        </div>
      </div>

      {/* ── Right: Form panel ── */}
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 sm:px-12 lg:min-h-0">

        {/* Mobile logo */}
        <div className="mb-10 lg:hidden">
          <Link to="/" className="text-xl font-bold tracking-tight text-white">
            BRAND
          </Link>
        </div>

        <div className="w-full max-w-sm">
          {/* Heading */}
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            {isLogin
              ? 'Sign in to continue to checkout.'
              : 'Join us to start shopping.'}
          </p>

          {/* Return path hint */}
          {returnTo === '/checkout' && (
            <div className="mt-4 border border-slate-700 bg-slate-900/60 px-4 py-3 text-xs text-slate-400">
              You&apos;ll be redirected back to checkout after signing in.
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.1em] text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium uppercase tracking-[0.1em] text-slate-400">
                  Password
                </label>
                {isLogin && (
                  <button type="button" className="text-xs text-slate-500 transition-colors hover:text-slate-300">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-700 bg-slate-900 py-3 pl-10 pr-10 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword
                    ? <HiOutlineEyeOff className="h-4 w-4" />
                    : <HiOutlineEye className="h-4 w-4" />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-white py-3.5 text-sm font-bold tracking-tight text-slate-950 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? (isLogin ? 'Signing in…' : 'Creating account…')
                : (isLogin ? 'Sign In' : 'Create Account')
              }
            </button>
          </form>

          {/* Mode toggle */}
          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="font-medium text-slate-300 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>

          {/* Back link */}
          <p className="mt-4 text-center">
            <Link to="/" className="text-xs text-slate-600 transition-colors hover:text-slate-400">
              ← Back to store
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
