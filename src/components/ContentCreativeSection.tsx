import { motion } from 'framer-motion'
import Section, { Container } from '../sections/Section'

const items = [
  { id: 1, type: 'Case Study',  title: 'E-commerce Revenue Campaign', desc: 'Multi-channel strategy driving 250% traffic growth',  color: '#a87242', span: 'md:col-span-2', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop' },
  { id: 2, type: 'Brand Video', title: 'Brand Identity Reel',         desc: 'Visual storytelling that captures brand essence',     color: '#c89368', span: '',                image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&auto=format&fit=crop' },
  { id: 3, type: 'SEO Report',  title: 'Technical SEO Overhaul',      desc: '12-month ranking trajectory from page 4 to #1',      color: '#d4a576', span: '',                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=900&q=80&auto=format&fit=crop' },
  { id: 4, type: 'Ad Creative', title: 'Paid Social Campaign Deck',   desc: 'High-CTR creatives that outperformed benchmarks 3×',  color: '#8b5e3c', span: '',                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format&fit=crop' },
  { id: 5, type: 'Content Hub', title: 'B2B Content Strategy',        desc: 'Thought leadership series generating 40% of leads',   color: '#a87242', span: 'md:col-span-2', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80&auto=format&fit=crop' },
]

export default function ContentCreativeSection() {
  return (
    <Section id="content-creative" className="py-20 md:py-32 bg-[#0d0a08]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">Creative Work</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 md:mb-6 leading-[1.1]">
            Content that<br /><span className="font-serif-italic font-normal text-[#d4a576]">converts</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl">
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
              {/* Image */}
              <div
                className="relative h-48 overflow-hidden bg-[#1a120c]"
              >
                <img
                  src={item.image}
                  alt={`${item.type} – ${item.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Brand-tinted overlay for cohesion */}
                <div className="absolute inset-0 mix-blend-multiply opacity-35"
                  style={{ background: `linear-gradient(135deg, #1a120c, ${item.color})` }} />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'rgba(10,8,7,0.55)', backdropFilter: 'blur(2px)' }}>
                  <span className="text-white font-semibold text-sm border border-white/30 px-4 py-2 rounded-full bg-white/10">View Project →</span>
                </div>
              </div>

              <div className="p-6">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block"
                  style={{ background: `${item.color}18`, color: item.color }}
                >
                  {item.type}
                </span>
                <h3 className="font-bold text-white mb-2 group-hover:text-[#d4a576] transition-colors">
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
