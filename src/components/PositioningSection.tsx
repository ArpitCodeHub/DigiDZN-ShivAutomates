import { motion } from 'framer-motion'
import { Container } from '../sections/Section'

const services = ['Design', 'Development', 'Maintenance']

const previewCards = [
  { title: 'UniLearn',  tag: 'EdTech',     gradient: 'linear-gradient(135deg,#3a2a1f 0%,#a87242 100%)' },
  { title: 'Homeway',   tag: 'Real Estate',gradient: 'linear-gradient(135deg,#5a3a22 0%,#c89368 100%)' },
]

export default function PositioningSection() {
  return (
    <section
      id="positioning"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0807]"
    >
      {/* Brown radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[1100px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(closest-side, rgba(168,114,66,0.55), rgba(168,114,66,0.18) 45%, transparent 75%)',
          filter: 'blur(20px)',
        }}
      />

      <Container maxWidth="xl" className="relative z-10 pt-32 pb-12 md:pt-40 md:pb-16">
        {/* Massive wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left leading-none mb-10"
        >
          <h1 className="leading-[0.85] tracking-tight">
            <span
              className="block font-black text-white"
              style={{
                fontSize: 'clamp(64px, 14vw, 220px)',
                letterSpacing: '-0.04em',
                background: 'linear-gradient(180deg,#ffffff 0%,#e8d9c9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DIGI<span className="font-serif-italic font-normal" style={{ WebkitTextFillColor: '#f1e3d2' }}>DZN</span>
            </span>
          </h1>
        </motion.div>

        {/* Pills row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          {services.map((s, i) => (
            <span
              key={s}
              className="px-5 py-2.5 rounded-full text-sm md:text-base text-white border border-white/15 backdrop-blur-sm"
              style={{
                background: i === 0
                  ? 'rgba(255,255,255,0.10)'
                  : `linear-gradient(135deg, rgba(168,114,66,${0.35 - i * 0.08}), rgba(200,147,104,${0.25 - i * 0.08}))`,
              }}
            >
              {s}
            </span>
          ))}

          <motion.a
            href="#growth-ecosystem"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm md:text-base text-white border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <span className="text-[#d4a576]">↗</span> All services
          </motion.a>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-10" />

        {/* Tagline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-2xl md:text-3xl text-white/85 leading-snug mb-8">
            We design, develop, and maintain digital products that{' '}
            <span className="font-serif-italic text-[#d4a576]">make an impact</span>
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-full text-sm md:text-base text-white border border-white/25 bg-white/5 backdrop-blur-sm hover:bg-[#a87242]/20 hover:border-[#a87242]/50 transition-colors"
          >
            Book a call
          </motion.button>
        </motion.div>

        {/* Preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {previewCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl border border-white/10 overflow-hidden h-48 md:h-64 cursor-pointer group"
              style={{ background: card.gradient }}
            >
              <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-white/65 mb-1">{card.tag}</span>
                <span className="text-2xl md:text-3xl font-bold text-white">{card.title}</span>
              </div>
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">↗</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
