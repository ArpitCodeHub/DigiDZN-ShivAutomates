import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PositioningSection from './PositioningSection'
import AboutSection from './AboutSection'
import GrowthEcosystemSection from './GrowthEcosystemSection'
import AISectionAndGEO from './AISectionAndGEO'
import ClientOutcomesSection from './ClientOutcomesSection'
import TestimonialsSection from './TestimonialsSection'
import TeamSection from './TeamSection'
import LeadFormModal from './LeadFormModal'
import { Container } from '../sections/Section'

interface HomepageProps {
  leadFormOpen: boolean
  setLeadFormOpen: (v: boolean) => void
  onNavigateToServices?: () => void
  onNavigateToBlogs?: () => void
}

function Navbar({ onContactClick, onNavigateToServices, onNavigateToBlogs }: { onContactClick: () => void; onNavigateToServices?: () => void; onNavigateToBlogs?: () => void }) {
  const [open, setOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const closeAndScroll = (href: string) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 250)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/[0.04] backdrop-blur-xl border-b border-[#a87242]/30" style={{ WebkitBackdropFilter: 'blur(24px)' }}>
        <Container maxWidth="xl">
          <div className="flex items-center justify-between h-14 md:h-20">
            <span className="text-sm md:text-lg font-black text-white tracking-[0.2em]">
              DIGIDZN
            </span>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              <a href="#about" className="text-sm text-white/70 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out">Agency</a>
              <a href="#client-outcomes" className="text-sm text-white/70 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out">Our Works</a>
              <button
                onClick={onNavigateToServices}
                className="text-sm text-white/70 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out"
              >
                Services
              </button>
              <button
                onClick={onNavigateToBlogs}
                className="text-sm text-white/70 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out"
              >
                Blogs
              </button>
              <a href="#testimonials" className="text-sm text-white/70 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out">Testimonials</a>
            </div>

            {/* Desktop contact button */}
            <button
              onClick={onContactClick}
              aria-label="Contact"
              className="hidden md:flex w-10 h-10 rounded-full border border-[#a87242]/40 items-center justify-center text-white/80 hover:text-white hover:border-[#a87242]/60 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
            >
              <span className="grid grid-cols-2 gap-0.5">
                <span className="w-1 h-1 rounded-full bg-current" />
                <span className="w-1 h-1 rounded-full bg-current" />
                <span className="w-1 h-1 rounded-full bg-current" />
                <span className="w-1 h-1 rounded-full bg-current" />
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="md:hidden w-10 h-10 rounded-full border border-[#a87242]/40 flex flex-col items-center justify-center gap-1 text-white hover:border-[#a87242]/60 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
            >
              <span className="w-4 h-px bg-current" />
              <span className="w-4 h-px bg-current" />
              <span className="w-2.5 h-px bg-current ml-1.5" />
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-50"
            style={{ background: 'rgba(10,8,7,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            {/* Brown ambient glow */}
            <div className="pointer-events-none absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgba(168,114,66,0.25), transparent 70%)', filter: 'blur(60px)' }} />

            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between h-14 px-6 border-b border-white/5">
                <span className="text-sm font-black text-white tracking-[0.2em]">DIGIDZN</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full border border-[#a87242]/40 flex items-center justify-center text-white hover:border-[#a87242]/60 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                >
                  <span className="relative w-4 h-4">
                    <span className="absolute inset-0 m-auto w-4 h-px bg-current rotate-45" />
                    <span className="absolute inset-0 m-auto w-4 h-px bg-current -rotate-45" />
                  </span>
                </button>
              </div>

              {/* Menu body */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                className="flex-1 overflow-y-auto px-6 py-8"
              >
                {/* Main nav links */}
                <ul className="space-y-1 mb-8">
                  {[
                    { label: 'Agency',       action: () => closeAndScroll('#about') },
                    { label: 'Our Works',    action: () => closeAndScroll('#client-outcomes') },
                    { label: 'Testimonials', action: () => closeAndScroll('#testimonials') },
                  ].map(l => (
                    <motion.li
                      key={l.label}
                      variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                    >
                      <button
                        onClick={l.action}
                        className="w-full flex items-center justify-between text-left py-4 border-b border-[#a87242]/20 text-2xl font-medium text-white hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                      >
                        {l.label}
                        <span className="text-white/30 text-xl">↗</span>
                      </button>
                    </motion.li>
                  ))}

                  {/* Services → navigates to Services page */}
                  <motion.li variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}>
                    <button
                      onClick={() => {
                        setOpen(false)
                        document.body.style.overflow = ''
                        if (onNavigateToServices) onNavigateToServices()
                      }}
                      className="w-full flex items-center justify-between text-left py-4 border-b border-[#a87242]/20 text-2xl font-medium text-white hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                    >
                      Services
                      <span className="text-white/30 text-xl">↗</span>
                    </button>
                  </motion.li>

                  {/* Blogs → navigates to Blogs page */}
                  <motion.li variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}>
                    <button
                      onClick={() => {
                        setOpen(false)
                        document.body.style.overflow = ''
                        if (onNavigateToBlogs) onNavigateToBlogs()
                      }}
                      className="w-full flex items-center justify-between text-left py-4 border-b border-[#a87242]/20 text-2xl font-medium text-white hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                    >
                      Blogs
                      <span className="text-white/30 text-xl">↗</span>
                    </button>
                  </motion.li>
                </ul>

                {/* CTA */}
                <motion.button
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  onClick={() => { setOpen(false); setTimeout(onContactClick, 250) }}
                  className="w-full py-4 rounded-full text-base font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
                >
                  Book a call →
                </motion.button>

                <motion.p
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-center text-xs text-white/30 mt-8"
                >
                  Engineering attention into growth
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FinalCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="final-cta" className="py-24 md:py-40 bg-[#0a0807] relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(168,114,66,0.35), transparent 70%)', filter: 'blur(40px)' }} />

      <Container maxWidth="lg" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-5 md:mb-6">Ready to grow?</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 md:mb-8">
            Let's engineer<br />
            <span className="font-serif-italic font-normal" style={{ color: '#d4a576' }}>your growth</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/55 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
            Ready to transform your business into an attention-capturing powerhouse?
            Let's start the conversation.
          </p>
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold text-white border border-[#a87242]/50 bg-white/5 backdrop-blur-sm hover:bg-[#a87242]/20 hover:border-[#a87242]/60 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
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
    <footer className="border-t border-[#a87242]/20 bg-[#0a0807] py-10 md:py-12">
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
          <span className="text-base font-black text-white tracking-[0.2em]">DIGIDZN</span>
          <p className="text-xs sm:text-sm text-white/30 order-3 md:order-2">© 2026 DigiDZN. Engineering attention into growth.</p>
          <div className="flex gap-5 sm:gap-6 order-2 md:order-3">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" className="text-xs sm:text-sm text-white/35 hover:text-white/80 transition-[color,border-color,background-color,opacity] duration-200 ease-out">{l}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default function Homepage({ leadFormOpen, setLeadFormOpen, onNavigateToServices, onNavigateToBlogs }: HomepageProps) {
  return (
    <div className="homepage">
      <Navbar onContactClick={() => setLeadFormOpen(true)} onNavigateToServices={onNavigateToServices} onNavigateToBlogs={onNavigateToBlogs} />
      <PositioningSection />
      <AboutSection />
      <ClientOutcomesSection />
      <GrowthEcosystemSection />
      <AISectionAndGEO />
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
