import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LeadData { name: string; email: string; company: string; message: string }
interface LeadFormModalProps { onClose: () => void }

export default function LeadFormModal({ onClose }: LeadFormModalProps) {
  const [data, setData] = useState<LeadData>({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<LeadData>>({})

  const validate = () => {
    const e: Partial<LeadData> = {}
    if (!data.name.trim()) e.name = 'Name is required'
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = 'Valid email required'
    return e
  }

  const handleSubmit = useCallback(async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setStatus('loading')
    try {
      await new Promise(r => setTimeout(r, 1200))
      setStatus('success')
      setTimeout(onClose, 2000)
    } catch {
      setStatus('error')
    }
  }, [data, onClose])

  const field = (key: keyof LeadData, label: string, type = 'text', required = false) => (
    <div key={key}>
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
        {label}{required && <span className="text-[#c89368] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={data[key]}
        onChange={e => { setData(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: '' })) }}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-colors
          focus:border-[#a87242]/60 focus:bg-white/8
          ${errors[key] ? 'border-red-500/60' : 'border-[#a87242]/30'}`}
        placeholder={`Your ${label.toLowerCase()}`}
      />
      {errors[key] && <p className="text-xs text-red-400 mt-1.5">{errors[key]}</p>}
    </div>
  )

  return (
    <motion.div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="rounded-2xl w-full max-w-lg border border-[#a87242]/30"
        style={{ background: 'rgba(17,13,10,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg,#a87242,#c89368)' }} />
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Let's Talk Growth</h3>
              <p className="text-sm text-white/40">We'll get back to you within 24 hours.</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
              aria-label="Close form"
            >
              ✕
            </button>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h4 className="text-xl font-bold text-white mb-2">Message sent!</h4>
              <p className="text-white/50 text-sm">We'll be in touch shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {field('name', 'Name', 'text', true)}
              {field('email', 'Email', 'email', true)}
              {field('company', 'Company')}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  value={data.message}
                  onChange={e => setData(p => ({ ...p, message: e.target.value }))}
                  rows={4}
                  className="w-full bg-white/5 border border-[#a87242]/30 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[#a87242]/60 focus:bg-white/8 resize-none"
                  placeholder="Tell us about your goals…"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </motion.button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3.5 rounded-xl text-sm font-semibold text-white/50 border border-[#a87242]/30 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
