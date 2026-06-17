import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'

interface AdminLoginProps {
  onSignedIn: () => void
}

export default function AdminLogin({ onSignedIn }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!email.trim() || !password) {
      setErrorMessage('Email and password are required.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMessage('')
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })
    if (error) {
      setStatus('error')
      setErrorMessage(
        error.message === 'Invalid login credentials'
          ? 'Incorrect email or password.'
          : error.message,
      )
      return
    }
    onSignedIn()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0807] p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(closest-side, rgba(168,114,66,0.18), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-2xl border border-[#a87242]/30 overflow-hidden"
        style={{
          background: 'rgba(17,13,10,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="h-1" style={{ background: 'linear-gradient(90deg,#a87242,#c89368)' }} />
        <div className="p-8 md:p-10">
          {/* Brand */}
          <div className="mb-8">
            <p className="text-xs font-black tracking-[0.3em] text-white/50 mb-2">DIGIDZN</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
              Admin{' '}
              <span className="font-serif-italic font-normal text-[#d4a576]">access</span>
            </h1>
            <p className="text-sm text-white/45 mt-2">Sign in to view client enquiries.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                autoComplete="username"
                required
                className="w-full bg-white/5 border border-[#a87242]/30 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[#a87242]/60 focus:bg-white/8"
                placeholder="you@digidzn.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (status === 'error') setStatus('idle') }}
                  autoComplete="current-password"
                  required
                  className="w-full bg-white/5 border border-[#a87242]/30 rounded-xl px-4 py-3 pr-20 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[#a87242]/60 focus:bg-white/8"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-white/45 hover:text-white/70 transition-colors px-2 py-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {status === 'error' && errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                {errorMessage}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
            >
              {status === 'loading' ? 'Signing in…' : 'Sign in'}
            </motion.button>
          </form>

          <p className="text-[11px] text-white/30 mt-8 leading-relaxed">
            Restricted access. Only authorised DigiDZN team members can sign in. Submissions are
            governed by Row Level Security on the Supabase project.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
