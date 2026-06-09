import { motion } from 'framer-motion'
import Section, { Container } from '../sections/Section'

const cards = [
  {
    icon: '⚡',
    title: 'AI-Powered Insights',
    desc: 'ML algorithms analyze behavior patterns to predict what captures attention and drives conversions before you spend a dollar.',
    outcomes: ['Predictive Targeting', 'Smart Personalization', 'Continuous Optimization'],
    color: '#a855f7',
  },
  {
    icon: '📍',
    title: 'Geo-Location Marketing',
    desc: 'Reach customers at the exact moment and location where purchasing decisions happen. Right place, right message, every time.',
    outcomes: ['Hyper-Local Targeting', 'Higher Conversions', 'Measurable ROI'],
    color: '#6366f1',
  },
  {
    icon: '🔄',
    title: 'Real-Time Adaptation',
    desc: 'Our systems continuously learn and adapt campaigns in real-time, keeping your strategy ahead of market shifts automatically.',
    outcomes: ['Dynamic Optimization', 'Market Responsiveness', 'Competitive Advantage'],
    color: '#14b8a6',
  },
]

export default function AISectionAndGEO() {
  return (
    <Section id="ai-geo" className="py-24 md:py-32 bg-[#0d0d0d]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">AI & GEO</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The future of<br />
            <span style={{ background: 'linear-gradient(135deg,#a855f7,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              engineered attention
            </span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            The brands winning today aren't just reaching more people — they're reaching the right
            people at the right moment. We combine AI precision with geolocation data to make
            every marketing dollar work harder.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/8 bg-white/3 p-8 group"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6"
                style={{ background: `${card.color}20` }}
              >
                {card.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{card.desc}</p>

              <ul className="space-y-2">
                {card.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: card.color }} />
                    {o}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(99,102,241,0.08))' }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5" />
          <div className="relative z-10 md:flex items-center justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Why this matters</h3>
              <p className="text-white/60 max-w-2xl leading-relaxed">
                Traditional marketing casts a wide net. We use AI-powered geo-targeting to ensure
                your budget reaches customers actively ready to buy — measurable ROI, faster growth,
                and competitive advantage that scales.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0 px-8 py-4 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
