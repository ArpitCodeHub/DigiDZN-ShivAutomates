import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

interface EcoNode {
  id: number
  label: string
  tagline: string
  description: string
  color: string
  connections: number[]
  number: string
  image: string
}

const nodes: EcoNode[] = [
  {
    id: 1,
    label: 'SEO',
    tagline: 'Be found first.',
    number: '01',
    color: '#a87242',
    connections: [2, 3, 5, 7],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=85&auto=format&fit=crop',
    description:
      'Organic visibility through precision keyword strategy, technical optimization, and content authority — engineered to compound over time.',
  },
  {
    id: 2,
    label: 'GEO',
    tagline: 'Right place. Right person.',
    number: '02',
    color: '#c89368',
    connections: [1, 4, 7],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=85&auto=format&fit=crop',
    description:
      'Hyper-local targeting that puts your brand in front of the right audience at the right location, exactly when intent is highest.',
  },
  {
    id: 3,
    label: 'Content',
    tagline: 'Attract. Educate. Convert.',
    number: '03',
    color: '#d4a576',
    connections: [1, 4, 6],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=85&auto=format&fit=crop',
    description:
      'Strategic content that attracts, educates, and converts your ideal customers at every funnel stage — built to rank and to resonate.',
  },
  {
    id: 4,
    label: 'Branding',
    tagline: 'Identity that commands attention.',
    number: '04',
    color: '#8b5e3c',
    connections: [2, 3, 5, 6],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=85&auto=format&fit=crop',
    description:
      'Distinctive brand identity and positioning that commands attention and builds lasting recognition across every customer touchpoint.',
  },
  {
    id: 5,
    label: 'Websites',
    tagline: 'Your hardest-working asset.',
    number: '05',
    color: '#a87242',
    connections: [1, 4, 7],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=85&auto=format&fit=crop',
    description:
      'High-converting web experiences engineered for performance, UX, and lead generation — your most accountable channel, working 24/7.',
  },
  {
    id: 6,
    label: 'Social',
    tagline: 'Build community. Drive loyalty.',
    number: '06',
    color: '#c89368',
    connections: [3, 4],
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200&q=85&auto=format&fit=crop',
    description:
      'Community-building and engagement strategies that amplify reach, deepen loyalty, and turn audiences into advocates.',
  },
  {
    id: 7,
    label: 'Performance',
    tagline: 'Every dollar, accountable.',
    number: '07',
    color: '#d4a576',
    connections: [1, 2, 5],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop',
    description:
      'Data-driven paid advertising that maximises ROI and scales your growth predictably — every campaign tied to a measurable outcome.',
  },
]

export default function GrowthEcosystemSection() {
  // The ecosystem always has an "active" service so the detail panel never feels empty.
  // First service is the default; hover/focus updates it.
  const [activeId, setActiveId] = useState<number>(1)
  const active = nodes.find(n => n.id === activeId)!
  const connected = nodes.filter(n => active.connections.includes(n.id))

  return (
    <Section id="growth-ecosystem" className="py-24 md:py-36 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* ── Header — left-aligned, editorial ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-[0.25em] mb-5">
            The Ecosystem
          </p>
          <h2
            className="text-white leading-[1.02] tracking-tight mb-6 font-bold"
            style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', letterSpacing: '-0.02em' }}
          >
            Seven forces.{' '}
            <span className="font-serif-italic font-normal text-[#d4a576]">One</span>{' '}
            unified system.
          </h2>
          <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-xl">
            A modular system of capabilities, each designed to amplify the others. Move through any
            service to see how it connects to the rest.
          </p>
        </motion.div>

        {/* ── Editorial split: service list ↔ detail panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* List column */}
          <ol className="lg:col-span-5 border-t border-[#a87242]/20">
            {nodes.map((node, i) => {
              const isActive = activeId === node.id
              const isConnected = active.connections.includes(node.id) && !isActive

              return (
                <motion.li
                  key={node.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  viewport={{ once: true, amount: 0 }}
                  className="border-b border-[#a87242]/20"
                >
                  <button
                    onMouseEnter={() => setActiveId(node.id)}
                    onFocus={() => setActiveId(node.id)}
                    onClick={() => setActiveId(node.id)}
                    aria-label={`${node.label} — ${node.tagline}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative w-full text-left py-5 md:py-7 transition-[background,color] duration-300 ease-out"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg, ${node.color}10, transparent 70%)`
                        : 'transparent',
                    }}
                  >
                    {/* Active rail */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 bottom-0 w-px transition-all duration-300 ease-out"
                      style={{
                        background: node.color,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                      }}
                    />

                    <div className="flex items-baseline gap-4 sm:gap-6 pl-3 sm:pl-5 pr-2">
                      {/* Numeral */}
                      <span
                        className="font-serif-italic font-normal flex-shrink-0 transition-colors duration-300 ease-out"
                        style={{
                          fontSize: 'clamp(20px, 2vw, 28px)',
                          color: isActive ? node.color : 'rgba(255,255,255,0.28)',
                        }}
                      >
                        {node.number}
                      </span>

                      {/* Name + tagline */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span
                            className="font-bold text-white tracking-tight leading-none"
                            style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', letterSpacing: '-0.01em' }}
                          >
                            {node.label}
                          </span>
                          {/* Connected dot */}
                          {isConnected && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.25 }}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: active.color }}
                            />
                          )}
                        </div>
                        <span className="block font-serif-italic text-sm sm:text-base text-white/45 mt-1.5">
                          {node.tagline}
                        </span>
                      </div>

                      {/* Arrow */}
                      <span
                        aria-hidden
                        className="flex-shrink-0 text-base sm:text-lg transition-all duration-300 ease-out self-center"
                        style={{
                          color: isActive ? node.color : 'rgba(255,255,255,0.2)',
                          transform: isActive ? 'translateX(2px)' : 'translateX(0)',
                        }}
                      >
                        →
                      </span>
                    </div>
                  </button>
                </motion.li>
              )
            })}
          </ol>

          {/* Detail column — sticky on desktop */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Hero image — large, refined treatment */}
                <div
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8"
                  style={{ background: '#1a120c' }}
                >
                  <img
                    src={active.image}
                    alt={`${active.label} — ${active.tagline}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Editorial duotone — heavier, more uniform than card style */}
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-multiply"
                    style={{
                      background: `linear-gradient(135deg, #1a120c 0%, ${active.color}cc 100%)`,
                      opacity: 0.65,
                    }}
                  />
                  {/* Soft top vignette */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at top, transparent 40%, rgba(10,8,7,0.4) 100%)',
                    }}
                  />
                  {/* Number watermark */}
                  <span
                    aria-hidden
                    className="absolute top-6 left-6 sm:top-8 sm:left-8 font-serif-italic font-normal leading-none select-none pointer-events-none"
                    style={{
                      fontSize: 'clamp(48px, 7vw, 96px)',
                      color: '#fff',
                      opacity: 0.18,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {active.number}
                  </span>
                  {/* Label pill — bottom left */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 right-6 sm:right-8 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-1.5">
                        Capability {active.number}
                      </p>
                      <h3
                        className="text-white font-bold tracking-tight leading-none"
                        style={{ fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '-0.02em' }}
                      >
                        {active.label}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Detail body */}
                <div className="space-y-7">
                  <p
                    className="font-serif-italic font-normal leading-tight"
                    style={{
                      fontSize: 'clamp(20px, 2vw, 26px)',
                      color: active.color,
                    }}
                  >
                    {active.tagline}
                  </p>

                  <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl">
                    {active.description}
                  </p>

                  {/* Connections */}
                  <div className="pt-5 border-t border-[#a87242]/20">
                    <p className="text-xs font-semibold text-white/35 uppercase tracking-[0.25em] mb-4">
                      Amplifies & connects with
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {connected.map(c => (
                        <button
                          key={c.id}
                          onMouseEnter={() => setActiveId(c.id)}
                          onFocus={() => setActiveId(c.id)}
                          onClick={() => setActiveId(c.id)}
                          className="group inline-flex items-baseline gap-2 text-sm sm:text-base font-medium text-white/70 hover:text-white transition-colors duration-200"
                        >
                          <span
                            className="font-serif-italic text-xs"
                            style={{ color: c.color }}
                          >
                            {c.number}
                          </span>
                          <span className="group-hover:underline underline-offset-4 decoration-1" style={{ textDecorationColor: c.color }}>
                            {c.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  )
}
