import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

const testimonials = [
  { id: 1, quote: 'DigiDZN transformed our online presence completely. Our lead generation increased by 300% within the first quarter. Truly exceptional work.', name: 'Sarah Johnson', company: 'TechStart Inc.', role: 'Marketing Director', initials: 'SJ', color: '#a87242' },
  { id: 2, quote: 'The strategic approach and attention to detail was exceptional. Our website now ranks for over 200 keywords we never thought possible.', name: 'Michael Chen', company: 'Growth Co.', role: 'CEO', initials: 'MC', color: '#c89368' },
  { id: 3, quote: "We've worked with several agencies, but DigiDZN's focus on actual business outcomes made them stand out. The ROI has been remarkable.", name: 'Jessica Martinez', company: 'Premium Services LLC', role: 'Founder', initials: 'JM', color: '#d4a576' },
  { id: 4, quote: 'From day one, DigiDZN understood our vision and executed beyond expectations. Their team is knowledgeable, responsive, and genuinely invested.', name: 'David Park', company: 'Innovation Labs', role: 'Product Lead', initials: 'DP', color: '#8b5e3c' },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <Section id="testimonials" className="py-24 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Clients who <span className="font-serif-italic font-normal text-[#d4a576]">grew</span><br />with us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Sidebar list */}
          <div className="lg:col-span-2 flex lg:flex-col gap-3">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 p-4 rounded-xl text-left w-full transition-all duration-300 border ${
                  active === i
                    ? 'border-white/20 bg-white/8'
                    : 'border-transparent bg-transparent hover:bg-white/4'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${item.color}25`, color: item.color }}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{item.name}</div>
                  <div className="text-xs text-white/40 truncate">{item.company}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Main quote */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-white/8 bg-white/3 p-8 md:p-10 h-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: t.color }}>★</span>
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white/85 leading-relaxed font-light mb-8">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-white/8">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                    style={{ background: `${t.color}25`, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-white/40">{t.role}, {t.company}</div>
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
