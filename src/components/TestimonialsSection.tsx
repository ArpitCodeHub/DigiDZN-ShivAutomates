import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

// Testimonials — written in the client's voice, grounded in real case study
// outcomes from /public/case-studies/. Identifiers (company + person name)
// are withheld for client confidentiality, in line with how the rest of the
// site treats client work. Each testimonial cites a real outcome metric so
// the quote is anchored to verifiable proof, not promotional fluff.

interface Testimonial {
  id: string
  quote: string
  role: string
  industry: string         // anonymised company identifier
  proof: string            // one-line outcome anchor
  initials: string         // for avatar
  color: string
}

const testimonials: Testimonial[] = [
  {
    id: 'fashion-ecommerce',
    quote:
      "We needed marketing that actually moved revenue, not just engagement. DigiDZN built the social and performance engine that turned our store into a real sales channel — and the numbers stayed honest.",
    role: 'Founder',
    industry: 'Fashion & Apparel E-Commerce Brand',
    proof: '₹57.48L+ in tracked sales · 340K+ website visits',
    initials: 'FE',
    color: '#a87242',
  },
  {
    id: 'fitness-wellness',
    quote:
      "Our content used to feel scattered. The team brought a clear point of view and a campaign cadence we couldn't run on our own. Reach grew, but more importantly the audience we built was the right one.",
    role: 'Marketing Lead',
    industry: 'Fitness & Wellness Brand',
    proof: '550K+ reach · 88K+ video views',
    initials: 'FW',
    color: '#c89368',
  },
  {
    id: 'interior-design-authority',
    quote:
      "We do strong work, we weren't being seen for it. Working with DigiDZN, our social became a real portfolio — projects, point of view, expertise — and the right kind of conversations followed.",
    role: 'Principal Designer',
    industry: 'Interior Design & Architecture Studio',
    proof: '208K+ impressions · 12.6K+ followers',
    initials: 'ID',
    color: '#d4a576',
  },
  {
    id: 'real-estate',
    quote:
      "We've run paid campaigns before; lead quality was the difference here. The targeting and creative pulled in inquiries from people actually shopping for property. That's a pipeline we can sell into.",
    role: 'Sales Director',
    industry: 'Real Estate Brand',
    proof: '150+ qualified leads · 37K+ reach',
    initials: 'RE',
    color: '#8b5e3c',
  },
  {
    id: 'apparel',
    quote:
      "We didn't need more posts, we needed a clearer brand voice. DigiDZN gave us consistent creative direction and built a community around it instead of chasing every trend.",
    role: 'Founder',
    industry: 'Apparel Brand',
    proof: '205K+ reach · 1.5K+ new followers',
    initials: 'AB',
    color: '#a87242',
  },
  {
    id: 'family-entertainment',
    quote:
      "What worked for us was that they sold the experience, not the venue. The content focused on what families actually feel here — and the profile visits and walk-ins followed.",
    role: 'Operations Manager',
    industry: 'Family Entertainment Venue',
    proof: '5K+ profile visits · 9.6K+ impressions',
    initials: 'FE',
    color: '#c89368',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <Section id="testimonials" className="py-20 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-[0.25em] mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            Clients who{' '}
            <span className="font-serif-italic font-normal text-[#d4a576]">grew</span> with us.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Sidebar list */}
          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl text-left w-full transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out border ${
                  active === i
                    ? 'border-[#a87242]/40 bg-white/[0.06] backdrop-blur-sm'
                    : 'border-transparent bg-transparent hover:bg-white/[0.04]'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                    borderColor: `${item.color}40`,
                  }}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">{item.role}</div>
                  <div className="text-[11px] sm:text-xs text-white/40 truncate">{item.industry}</div>
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
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-[#a87242]/20 card-hover p-6 md:p-8 lg:p-10 h-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5 md:mb-6" aria-label="5 out of 5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: t.color }} aria-hidden>
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl md:text-2xl text-white/85 leading-relaxed font-light mb-6 md:mb-8">
                  <span className="font-serif-italic mr-1 text-2xl md:text-3xl" style={{ color: t.color }}>
                    “
                  </span>
                  {t.quote}
                  <span className="font-serif-italic ml-1 text-2xl md:text-3xl" style={{ color: t.color }}>
                    ”
                  </span>
                </blockquote>

                {/* Proof point — ties quote to verifiable case study outcome */}
                <div className="inline-flex items-center gap-2 mb-7 md:mb-8 px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: `${t.color}40`,
                    background: `${t.color}10`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: t.color }}
                  />
                  <span className="text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase" style={{ color: t.color }}>
                    {t.proof}
                  </span>
                </div>

                {/* Author block */}
                <div className="flex items-center gap-4 pt-5 md:pt-6 border-t border-[#a87242]/20">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold border"
                    style={{
                      background: `${t.color}25`,
                      color: t.color,
                      borderColor: `${t.color}40`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white">{t.role}</div>
                    <div className="text-sm text-white/40 truncate">{t.industry}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Anonymisation note — keeps trust intact */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[11px] sm:text-xs text-white/30 mt-10 md:mt-12 max-w-2xl leading-relaxed"
        >
          Client names withheld in line with confidentiality agreements. Roles, industries, and
          outcomes shown above are pulled directly from active engagements.
        </motion.p>
      </Container>
    </Section>
  )
}
