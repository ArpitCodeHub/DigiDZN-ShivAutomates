import { motion } from 'framer-motion'
import Section, { Container } from '../sections/Section'

const items = [
  { id: 1, type: 'Case Study',    title: 'E-commerce Revenue Campaign',     desc: 'Multi-channel strategy driving 250% traffic growth',  color: '#a855f7', span: 'md:col-span-2' },
  { id: 2, type: 'Brand Video',   title: 'Brand Identity Reel',             desc: 'Visual storytelling that captures brand essence',     color: '#6366f1', span: '' },
  { id: 3, type: 'SEO Report',    title: 'Technical SEO Overhaul',          desc: '12-month ranking trajectory from page 4 to #1',      color: '#14b8a6', span: '' },
  { id: 4, type: 'Ad Creative',   title: 'Paid Social Campaign Deck',       desc: 'High-CTR creatives that outperformed benchmarks 3×',  color: '#f59e0b', span: '' },
  { id: 5, type: 'Content Hub',   title: 'B2B Content Strategy',            desc: 'Thought leadership series generating 40% of leads',   color: '#ec4899', span: 'md:col-span-2' },
]

export default function ContentCreativeSection() {
  return (
    <Section id="content-creative" className="py-24 md:py-32 bg-[#0d0d0d]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">Creative Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Content that<br />converts
          </h2>
          <p className="text-lg text-white/50 max-w-2xl">
            Every piece of content we create is engineered with a goal: attract the right audience, build trust, and drive action.
          </p>
        </motion.div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group rounded-2xl border border-white/8 bg-white/3 overflow-hidden cursor-pointer ${item.span}`}
            >
              {/* Visual placeholder */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${item.color}18, ${item.color}08)` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: `${item.color}20` }}
                >
                  {item.type === 'Case Study' ? '📊' :
                   item.type === 'Brand Video' ? '🎬' :
                   item.type === 'SEO Report' ? '📈' :
                   item.type === 'Ad Creative' ? '🎨' : '✍️'}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: `${item.color}30`, backdropFilter: 'blur(4px)' }}>
                  <span className="text-white font-semibold text-sm">View Project →</span>
                </div>
              </div>

              <div className="p-6">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block"
                  style={{ background: `${item.color}18`, color: item.color }}
                >
                  {item.type}
                </span>
                <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/45">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
