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
}

const nodes: EcoNode[] = [
  { id: 1, label: 'SEO',                  icon: '🔍', color: '#a87242', connections: [2,3,5,7], description: 'Organic visibility through precision keyword strategy, technical optimization, and content authority.' },
  { id: 2, label: 'GEO',                  icon: '📍', color: '#c89368', connections: [1,4,7],   description: 'Hyper-local targeting that puts your brand in front of the right audience at the right location.' },
  { id: 3, label: 'Content',              icon: '✍️', color: '#d4a576', connections: [1,4,6],   description: 'Strategic content that attracts, educates, and converts your ideal customers at every funnel stage.' },
  { id: 4, label: 'Branding',             icon: '✨', color: '#8b5e3c', connections: [2,3,5,6], description: 'Distinctive brand identity and positioning that commands attention and builds lasting recognition.' },
  { id: 5, label: 'Websites',             icon: '🌐', color: '#a87242', connections: [1,4,7],   description: 'High-converting web experiences engineered for performance, UX, and lead generation.' },
  { id: 6, label: 'Social',               icon: '💬', color: '#c89368', connections: [3,4],     description: 'Community-building and engagement strategies that amplify reach and deepen brand loyalty.' },
  { id: 7, label: 'Performance\nMkt',     icon: '📈', color: '#d4a576', connections: [1,2,5],   description: 'Data-driven paid advertising that maximises ROI and scales your growth predictably.' },
]

export default function GrowthEcosystemSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const isConnected = (id: number) => hoveredId !== null && (nodes.find(n => n.id === hoveredId)?.connections.includes(id) || id === hoveredId)

  const getOpacity = (id: number) => {
    if (hoveredId === null) return 1
    return isConnected(id) ? 1 : 0.2
  }

  return (
    <Section id="growth-ecosystem" className="py-24 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">Our Ecosystem</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Seven forces, <span className="font-serif-italic font-normal text-[#d4a576]">one</span><br />unified system
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every capability is interconnected. Hover a node to see how it amplifies the rest.
          </p>
        </motion.div>

        {/* Node grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              animate={{ opacity: getOpacity(node.id) }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              tabIndex={0}
              className="relative rounded-2xl border border-white/8 bg-white/3 p-6 cursor-pointer transition-all duration-300 group"
              style={{
                borderColor: hoveredId === node.id ? `${node.color}60` : undefined,
                boxShadow: hoveredId === node.id ? `0 0 30px ${node.color}20` : undefined,
              }}
              whileHover={{ y: -4, scale: 1.03 }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: `${node.color}20` }}
              >
                {node.icon}
              </div>

              <h3 className="font-bold text-white text-sm leading-tight mb-1">
                {node.label}
              </h3>

              {/* Connected indicator */}
              {hoveredId !== null && hoveredId !== node.id && isConnected(node.id) && (
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
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
              className="rounded-2xl border p-8"
              style={{
                borderColor: `${nodes.find(n => n.id === hoveredId)?.color}30`,
                background: `${nodes.find(n => n.id === hoveredId)?.color}08`,
              }}
            >
              {(() => {
                const node = nodes.find(n => n.id === hoveredId)!
                const connected = nodes.filter(n => node.connections.includes(n.id))
                return (
                  <div className="md:flex items-start gap-10">
                    <div className="flex-1 mb-6 md:mb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${node.color}20` }}>
                          {node.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{node.label}</h3>
                      </div>
                      <p className="text-white/60 leading-relaxed">{node.description}</p>
                    </div>
                    <div>
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
              className="text-center text-white/25 text-sm py-4"
            >
              Hover any capability to explore its connections
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  )
}
