import { motion } from 'framer-motion'
import { Container } from '../sections/Section'

const stats = [
  { value: '150%+', label: 'Avg. lead increase' },
  { value: '500+',  label: 'Brands transformed' },
  { value: '10M+',  label: 'People reached' },
]

export default function PositioningSection() {
  return (
    <section
      id="positioning"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[80px]" />

      <Container maxWidth="xl" className="relative z-10 py-32 md:py-40">
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Digital Growth Agency
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.05] tracking-tight mb-6"
          >
            Engineering{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Attention
            </span>
            <br />
            Into Growth
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10"
          >
            More leads, greater visibility, increased sales. We combine strategy,
            creativity, and technology to convert attention into measurable growth
            that directly impacts your bottom line.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl text-base font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Growth Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/15 bg-white/5 transition-colors"
              onClick={() => document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work →
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
