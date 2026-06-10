import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoEntry from './components/VideoEntry'
import TransitionOverlay from './components/TransitionOverlay'
import Homepage from './components/Homepage'
import ServicesPage from './components/ServicesPage'
import LeadFormModal from './components/LeadFormModal'
import { Container } from './sections/Section'

export type PageView = 'home' | 'services'

export default function App() {
  const [isVideoComplete, setIsVideoComplete] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [leadFormOpen, setLeadFormOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<PageView>('home')

  const handleVideoComplete = () => {
    setIsVideoComplete(true)
    setIsTransitioning(true)
  }

  const handleTransitionComplete = () => {
    setIsTransitioning(false)
  }

  const navigateTo = (page: PageView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setCurrentPage(page), 150)
  }

  return (
    <>
      {/* Video Entry Experience */}
      {!isVideoComplete && (
        <VideoEntry
          videoSrc="/videos/final-digidzn.mp4"
          onVideoComplete={handleVideoComplete}
        />
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <TransitionOverlay onTransitionComplete={handleTransitionComplete} />
      )}

      {/* Homepage */}
      {isVideoComplete && currentPage === 'home' && (
        <Homepage
          leadFormOpen={leadFormOpen}
          setLeadFormOpen={setLeadFormOpen}
          onNavigateToServices={() => navigateTo('services')}
        />
      )}

      {/* Services Page */}
      {isVideoComplete && currentPage === 'services' && (
        <ServicesShell
          onBookCall={() => setLeadFormOpen(true)}
          onViewWork={() => navigateTo('home')}
          onNavigateHome={() => navigateTo('home')}
        />
      )}

      {/* Global lead form (shared across pages) */}
      <AnimatePresence>
        {leadFormOpen && <LeadFormModal onClose={() => setLeadFormOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

// ─── Services page shell: navbar + page content + footer ─────────────────────

function ServicesShell({
  onBookCall,
  onViewWork,
  onNavigateHome,
}: {
  onBookCall: () => void
  onViewWork: () => void
  onNavigateHome: () => void
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full bg-[#0a0807]">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/[0.04] backdrop-blur-xl border-b border-[#a87242]/30" style={{ WebkitBackdropFilter: 'blur(24px)' }}>
        <Container maxWidth="xl">
          <div className="flex items-center justify-between h-14 md:h-20">
            <button
              onClick={onNavigateHome}
              className="text-sm md:text-lg font-black text-white tracking-[0.2em] hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out"
            >
              DIGIDZN
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {[
                { label: 'Services',  id: 'services-ecosystem' },
                { label: 'Process',   id: 'services-process' },
                { label: 'Why Us',    id: 'services-why' },
              ].map(l => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.id)}
                  className="text-sm text-white/70 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={onNavigateHome}
                className="text-sm text-white/50 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out"
              >
                ← Home
              </button>
            </div>

            {/* Desktop CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookCall}
              className="hidden md:flex px-5 py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
            >
              Book a call
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 rounded-full border border-[#a87242]/40 flex flex-col items-center justify-center gap-1 text-white hover:border-[#a87242]/60 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
            >
              <span className="w-4 h-px bg-current" />
              <span className="w-4 h-px bg-current" />
              <span className="w-2.5 h-px bg-current ml-1.5" />
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="services-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-50"
            style={{ background: 'rgba(10,8,7,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgba(168,114,66,0.2), transparent 70%)', filter: 'blur(60px)' }}
            />
            <div className="relative h-full flex flex-col">
              <div className="flex items-center justify-between h-14 px-6 border-b border-white/5">
                <span className="text-sm font-black text-white tracking-[0.2em]">DIGIDZN</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full border border-[#a87242]/40 flex items-center justify-center text-white hover:border-[#a87242]/60 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                >
                  <span className="relative w-4 h-4">
                    <span className="absolute inset-0 m-auto w-4 h-px bg-current rotate-45" />
                    <span className="absolute inset-0 m-auto w-4 h-px bg-current -rotate-45" />
                  </span>
                </button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                className="flex-1 overflow-y-auto px-6 py-8"
              >
                <ul className="space-y-1 mb-8">
                  {[
                    { label: 'All Services', id: 'services-ecosystem' },
                    { label: 'Our Process',  id: 'services-process' },
                    { label: 'Why DigiDZN', id: 'services-why' },
                  ].map(l => (
                    <motion.li
                      key={l.label}
                      variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                    >
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setTimeout(() => scrollTo(l.id), 250)
                        }}
                        className="w-full flex items-center justify-between text-left py-4 border-b border-[#a87242]/20 text-2xl font-medium text-white hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                      >
                        {l.label}
                        <span className="text-white/30 text-xl">↗</span>
                      </button>
                    </motion.li>
                  ))}
                  <motion.li variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}>
                    <button
                      onClick={() => { setMobileMenuOpen(false); onNavigateHome() }}
                      className="w-full flex items-center justify-between text-left py-4 border-b border-[#a87242]/20 text-2xl font-medium text-white/50 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                    >
                      ← Back to Home
                    </button>
                  </motion.li>
                </ul>

                <motion.button
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMobileMenuOpen(false); setTimeout(onBookCall, 250) }}
                  className="w-full py-4 rounded-full text-base font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
                >
                  Book a call →
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page content ── */}
      <ServicesPage onBookCall={onBookCall} onViewWork={onViewWork} />

      {/* ── Footer ── */}
      <footer className="border-t border-[#a87242]/20 bg-[#0a0807] py-10 md:py-12">
        <Container maxWidth="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
            <button
              onClick={onNavigateHome}
              className="text-base font-black text-white tracking-[0.2em] hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out"
            >
              DIGIDZN
            </button>
            <p className="text-xs sm:text-sm text-white/30 order-3 md:order-2">© 2026 DigiDZN. Engineering attention into growth.</p>
            <div className="flex gap-5 sm:gap-6 order-2 md:order-3">
              {['Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" className="text-xs sm:text-sm text-white/35 hover:text-white/80 transition-[color,border-color,background-color,opacity] duration-200 ease-out">{l}</a>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
