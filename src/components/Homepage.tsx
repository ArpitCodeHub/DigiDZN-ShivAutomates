import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PositioningSection from './PositioningSection'
import AboutSection from './AboutSection'
import FeaturedWorkSection from './FeaturedWorkSection'
import GrowthEcosystemSection from './GrowthEcosystemSection'
import AISectionAndGEO from './AISectionAndGEO'
import ContentCreativeSection from './ContentCreativeSection'
import TestimonialsSection from './TestimonialsSection'
import TeamSection from './TeamSection'
import { Container } from '../sections/Section'

interface LeadData { name: string; email: string; company: string; message: string }
interface HomepageProps { leadFormOpen: boolean; setLeadFormOpen: (v: boolean) => void }

const navLinks = [
  { label: 'Agency',       href: '#about' },
  { label: 'Our Works',    href: '#featured-work' },
  { label: 'Services',     href: '#growth-ecosystem' },
  { label: 'Testimonials', href: '#testimonials' },
]

function Navbar({ onContactClick }: { onContactClick: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0807]/70 backdrop-blur-md">
      <Container maxWidth="xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <span className="text-base md:text-lg font-black text-white tracking-[0.2em]">
            DIGIDZN
          </span>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={onContactClick}
            aria-label="Contact"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-colors"
          >
            <span className="grid grid-cols-2 gap-0.5">
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </Container>
    </nav>
  )
}

function LeadFormModal({ onClose }: { onClose: () => void }) {
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
    <div>
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
        {label}{required && <span className="text-[#c89368] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={data[key]}
        onChange={e => { setData(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: '' })) }}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-colors
          focus:border-[#a87242]/60 focus:bg-white/8
          ${errors[key] ? 'border-red-500/60' : 'border-white/10'}`}
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
        className="bg-[#110d0a] border border-white/10 rounded-2xl w-full max-w-lg"
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
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">✕</button>
          </div>

          {status === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[#a87242]/60 focus:bg-white/8 resize-none"
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
                <button type="button" onClick={onClose}
                  className="px-5 py-3.5 rounded-xl text-sm font-semibold text-white/50 border border-white/10 hover:bg-white/5 transition-colors">
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

function FinalCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="final-cta" className="py-32 md:py-40 bg-[#0a0807] relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(168,114,66,0.35), transparent 70%)', filter: 'blur(40px)' }} />

      <Container maxWidth="lg" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-6">Ready to grow?</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            Let's engineer<br />
            <span className="font-serif-italic font-normal" style={{ color: '#d4a576' }}>your growth</span>
          </h2>
          <p className="text-lg md:text-xl text-white/55 max-w-xl mx-auto mb-12 leading-relaxed">
            Ready to transform your business into an attention-capturing powerhouse?
            Let's start the conversation.
          </p>
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full text-base md:text-lg font-semibold text-white border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-[#a87242]/20 hover:border-[#a87242]/60 transition-colors"
          >
            Book a call →
          </motion.button>
        </motion.div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0807] py-12">
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-base font-black text-white tracking-[0.2em]">DIGIDZN</span>
          <p className="text-sm text-white/30">© 2026 DigiDZN. Engineering attention into growth.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" className="text-sm text-white/35 hover:text-white/80 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default function Homepage({ leadFormOpen, setLeadFormOpen }: HomepageProps) {
  return (
    <div className="homepage">
      <Navbar onContactClick={() => setLeadFormOpen(true)} />
      <PositioningSection />
      <AboutSection />
      <FeaturedWorkSection />
      <GrowthEcosystemSection />
      <AISectionAndGEO />
      <ContentCreativeSection />
      <TestimonialsSection />
      <TeamSection />
      <FinalCTA onOpen={() => setLeadFormOpen(true)} />
      <Footer />

      <AnimatePresence>
        {leadFormOpen && <LeadFormModal onClose={() => setLeadFormOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
