import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

interface EcoNode {
  id: number
  label: string
  description: string
  color: string
  connections: number[]
  icon: string
  image: string
}

const nodes: EcoNode[] = [
  { id: 1, label: 'SEO',                  icon: '🔍', color: '#a87242', connections: [2,3,5,7], image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&auto=format&fit=crop', description: 'Organic visibility through precision keyword strategy, technical optimization, and content authority.' },
  { id: 2, label: 'GEO',                  icon: '📍', color: '#c89368', connections: [1,4,7],   image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80&auto=format&fit=crop', description: 'Hyper-local targeting that puts your brand in front of the right audience at the right location.' },
  { id: 3, label: 'Content',              icon: '✍️', color: '#d4a576', connections: [1,4,6],   image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80&auto=format&fit=crop', description: 'Strategic content that attracts, educates, and converts your ideal customers at every funnel stage.' },
  { id: 4, label: 'Branding',             icon: '✨', color: '#8b5e3c', connections: [2,3,5,6], image: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=600&q=80&auto=format&fit=crop', description: 'Distinctive brand identity and positioning that commands attention and builds lasting recognition.' },
  { id: 5, label: 'Websites',             icon: '🌐', color: '#a87242', connections: [1,4,7],   image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80&auto=format&fit=crop', description: 'High-converting web experiences engineered for performance, UX, and lead generation.' },
  { id: 6, label: 'Social',               icon: '💬', color: '#c89368', connections: [3,4],     image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&q=80&auto=format&fit=crop', description: 'Community-building and engagement strategies that amplify reach and deepen brand loyalty.' },
  { id: 7, label: 'Performance\nMkt',     icon: '📈', color: '#d4a576', connections: [1,2,5],   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop', description: 'Data-driven paid advertising that maximises ROI and scales your growth predictably.' },
]

export default function GrowthEcosystemSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const isConnected = (id: number) => hoveredId !== null && (nodes.find(n => n.id === hoveredId)?.connections.includes(id) || id === hoveredId)

  const getOpacity = (id: number) => {
    if (hoveredId === null) return 1
    return isConnected(id) ? 1 : 0.2
  }

  return (
    <Section id="growth-ecosystem" className="py-20 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">Our Ecosystem</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 md:mb-6 leading-[1.1]">
            Seven forces, <span className="font-serif-italic font-normal text-[#d4a576]">one</span><br />unified system
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4">
            Every capability is interconnected. Hover a node to see how it amplifies the rest.
          </p>
        </motion.div>

        {/* Node grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              animate={{ opacity: getOpacity(node.id) }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label.replace('\n', ' ')} – ${node.description}`}
              className="relative rounded-2xl border border-white/8 bg-white/3 cursor-pointer transition-all duration-300 group overflow-hidden"
              style={{
                borderColor: hoveredId === node.id ? `${node.color}60` : undefined,
                boxShadow: hoveredId === node.id ? `0 0 30px ${node.color}25` : undefined,
              }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Image strip */}
              <div className="relative h-20 sm:h-24 overflow-hidden bg-[#1a120c]">
                <img
                  src={node.image}
                  alt={`${node.label.replace('\n', ' ')} capability`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Brand-tinted overlay */}
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background: `linear-gradient(135deg, rgba(26,18,12,0.55), ${node.color}aa)`,
                  }}
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-12"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(10,8,7,0.9))' }} />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 -mt-7 relative">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-3 border-2 border-[#0a0807]"
                  style={{ background: node.color }}
                >
                  {node.icon}
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight whitespace-pre-line">
                  {node.label}
                </h3>
              </div>

              {/* Connected indicator */}
              {hoveredId !== null && hoveredId !== node.id && isConnected(node.id) && (
                <div
                  className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full ring-2 ring-[#0a0807]"
                  style={{ background: nodes.find(n => n.id === hoveredId)?.color }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Description panel */}
        <AnimatePresence mode="wait">
          {hoveredId !== null && (
            <motion.div
              key={hoveredId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border p-6 md:p-8"
              style={{
                borderColor: `${nodes.find(n => n.id === hoveredId)?.color}30`,
                background: `${nodes.find(n => n.id === hoveredId)?.color}08`,
              }}
            >
              {(() => {
                const node = nodes.find(n => n.id === hoveredId)!
                const connected = nodes.filter(n => node.connections.includes(n.id))
                return (
                  <div className="md:flex items-start gap-8 lg:gap-10">
                    <div className="flex-1 mb-6 md:mb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: node.color }}>
                          {node.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{node.label.replace('\n', ' ')}</h3>
                      </div>
                      <p className="text-sm sm:text-base text-white/60 leading-relaxed">{node.description}</p>
                    </div>
                    <div className="md:max-w-xs">
                      <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Connects with</p>
                      <div className="flex flex-wrap gap-2">
                        {connected.map(c => (
                          <span key={c.id} className="text-xs px-3 py-1.5 rounded-full border font-medium"
                            style={{ borderColor: `${c.color}40`, color: c.color, background: `${c.color}10` }}>
                            {c.label.replace('\n', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}
          {hoveredId === null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/30 text-xs sm:text-sm py-4"
            >
              <span className="hidden md:inline">Hover</span>
              <span className="inline md:hidden">Tap</span>
              {' '}any capability to explore its connections
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  )
}
