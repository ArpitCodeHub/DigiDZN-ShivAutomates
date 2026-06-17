import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

// Real DigiDZN client outcomes — clients anonymised by industry.
// Quote = the approach we took (verbatim from the client work doc).
// Headline metric is what we are anchoring on for that story.

interface ClientStory {
  id: string
  industry: string
  caseLabel: string         // shown in sidebar — short identifier
  serviceTag: string        // primary service line, shown as chip
  approach: string          // used as the editorial quote
  headlineMetric: { value: string; label: string }
  supporting: { value: string; label: string }[]
  initials: string
  color: string
  image: string
}

const STORIES: ClientStory[] = [
  {
    id: 'fashion-ecommerce',
    industry: 'Fashion & Apparel',
    caseLabel: 'Fashion E-Commerce Brand',
    serviceTag: 'Performance + Social',
    approach:
      'A fashion e-commerce brand leveraged our social media and performance marketing expertise to generate revenue, drive website traffic, and build a digital presence that continues to attract and convert customers.',
    headlineMetric: { value: '₹57.48L+', label: 'in sales generated' },
    supporting: [
      { value: '340K+', label: 'website visits' },
      { value: '5,701', label: 'add to carts' },
      { value: '₹5.54L', label: 'ad spend' },
    ],
    initials: 'FE',
    color: '#a87242',
    image: '/case-studies/fashion-ecommerce-sales.png',
  },
  {
    id: 'fitness-wellness',
    industry: 'Fitness & Wellness',
    caseLabel: 'Fitness & Wellness Brand',
    serviceTag: 'Content + Social',
    approach:
      'Through a combination of strategic content, performance-driven social media campaigns, and engaging visual storytelling, we strengthened audience engagement and increased brand visibility across key platforms.',
    headlineMetric: { value: '550K+', label: 'total reach' },
    supporting: [
      { value: '401K+', label: 'page views' },
      { value: '70K+', label: 'engagements' },
      { value: '88K+', label: 'video views' },
    ],
    initials: 'FW',
    color: '#c89368',
    image: '/case-studies/fitness-wellness-growth.png',
  },
  {
    id: 'interior-design-authority',
    industry: 'Interior Design Studio',
    caseLabel: 'Interior Design & Architecture',
    serviceTag: 'Brand Building',
    approach:
      'Strategic content, creative storytelling, and audience-focused social campaigns transformed social media into a powerful channel for visibility and engagement — showcasing projects, expertise, and brand values.',
    headlineMetric: { value: '208K+', label: 'impressions' },
    supporting: [
      { value: '201K+', label: 'reach' },
      { value: '22K+', label: 'engagements' },
      { value: '12.6K+', label: 'followers' },
    ],
    initials: 'ID',
    color: '#d4a576',
    image: '/case-studies/interior-design-authority.png',
  },
  {
    id: 'real-estate',
    industry: 'Real Estate',
    caseLabel: 'Real Estate Brand',
    serviceTag: 'Lead Generation',
    approach:
      'Targeted campaigns, compelling property-focused creatives, and audience-driven messaging helped the brand expand its reach and connect with prospective buyers actively exploring real estate opportunities.',
    headlineMetric: { value: '150+', label: 'qualified leads' },
    supporting: [
      { value: '37K+', label: 'reach' },
      { value: '22K+', label: 'impressions' },
    ],
    initials: 'RE',
    color: '#8b5e3c',
    image: '/case-studies/real-estate-leads.png',
  },
  {
    id: 'apparel',
    industry: 'Apparel Brand',
    caseLabel: 'Apparel Brand',
    serviceTag: 'Brand Growth',
    approach:
      'Strategic social campaigns and engaging creative content built a stronger brand presence, focused on audience engagement and consistent communication, helping the brand build a growing community in a competitive fashion market.',
    headlineMetric: { value: '205K+', label: 'account reach' },
    supporting: [
      { value: '25K+', label: 'engagements' },
      { value: '1.5K+', label: 'new followers' },
    ],
    initials: 'AB',
    color: '#a87242',
    image: '/case-studies/apparel-digital-presence.png',
  },
  {
    id: 'family-entertainment',
    industry: 'Family Entertainment',
    caseLabel: 'Arcade & Playzone Venue',
    serviceTag: 'Social + Content',
    approach:
      'Strategic social campaigns and engaging content showcased experiences over facilities — increasing brand visibility, driving profile engagement, and positioning the venue as a preferred destination for families.',
    headlineMetric: { value: '5K+', label: 'profile visits' },
    supporting: [
      { value: '9.6K+', label: 'impressions' },
      { value: '8.7K+', label: 'reach' },
    ],
    initials: 'FE',
    color: '#c89368',
    image: '/case-studies/family-entertainment.png',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const t = STORIES[active]

  return (
    <Section id="testimonials" className="py-20 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header — left-aligned editorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-[0.25em] mb-4">
            Client Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-5">
            The work speaks{' '}
            <span className="font-serif-italic font-normal text-[#d4a576]">for itself.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/55 max-w-xl leading-relaxed">
            Real engagements, real outcomes. Identifiers withheld for client confidentiality, results
            pulled directly from campaign reporting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Sidebar list */}
          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-2">
            {STORIES.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl text-left w-full transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out border ${
                  active === i
                    ? 'border-[#a87242]/40 bg-white/[0.06] backdrop-blur-sm'
                    : 'border-transparent bg-transparent hover:bg-white/[0.04]'
                }`}
                style={
                  active === i
                    ? { borderLeft: `3px solid ${item.color}` }
                    : undefined
                }
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
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">
                    {item.industry}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/40 truncate uppercase tracking-[0.15em]">
                    {item.serviceTag}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Main quote panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-[#a87242]/20 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Hero image / fallback band */}
                <div className="relative h-44 md:h-52 overflow-hidden bg-[#1a120c]">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, #1a120c 0%, ${t.color} 130%)` }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0%, transparent 35%)',
                    }}
                  />
                  <img
                    src={t.image}
                    alt={`${t.caseLabel} — ${t.serviceTag}`}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-multiply opacity-25"
                    style={{ background: `linear-gradient(135deg, #1a120c, ${t.color})` }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-24"
                    style={{ background: 'linear-gradient(180deg, transparent, rgba(10,8,7,0.95))' }}
                  />
                  {/* Industry pill */}
                  <span
                    className="absolute top-4 left-4 inline-flex items-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full backdrop-blur-md border"
                    style={{
                      background: `${t.color}30`,
                      color: '#fff',
                      borderColor: `${t.color}80`,
                    }}
                  >
                    {t.industry}
                  </span>
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                  {/* Headline metric */}
                  <div className="mb-7 pb-7 border-b border-[#a87242]/15">
                    <p
                      className="font-bold text-white leading-none tracking-tight mb-2"
                      style={{
                        fontSize: 'clamp(40px, 5vw, 64px)',
                        letterSpacing: '-0.03em',
                        color: t.color,
                      }}
                    >
                      {t.headlineMetric.value}
                    </p>
                    <p className="text-xs sm:text-sm text-white/55 uppercase tracking-[0.22em] font-medium">
                      {t.headlineMetric.label}
                    </p>
                  </div>

                  {/* Approach as quote */}
                  <blockquote className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-light mb-7 md:mb-8">
                    <span className="font-serif-italic text-2xl mr-1" style={{ color: t.color }}>
                      “
                    </span>
                    {t.approach}
                    <span className="font-serif-italic text-2xl ml-1" style={{ color: t.color }}>
                      ”
                    </span>
                  </blockquote>

                  {/* Supporting metrics row */}
                  <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-[#a87242]/15">
                    {t.supporting.map((m, i) => (
                      <div
                        key={m.label}
                        className="p-4 sm:p-5"
                        style={{
                          background: 'rgba(10,8,7,0.55)',
                          borderRight:
                            i < t.supporting.length - 1
                              ? '1px solid rgba(168,114,66,0.15)'
                              : undefined,
                        }}
                      >
                        <p
                          className="font-bold text-white leading-none tracking-tight mb-1.5"
                          style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
                        >
                          {m.value}
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/45 uppercase tracking-[0.18em]">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer line — case + service */}
                  <div className="mt-7 pt-5 border-t border-[#a87242]/15 flex items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-white/45">
                      <span className="text-white/70 font-medium">{t.caseLabel}</span>
                    </p>
                    <span
                      className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full border font-medium uppercase tracking-[0.18em]"
                      style={{
                        borderColor: `${t.color}40`,
                        color: t.color,
                        background: `${t.color}10`,
                      }}
                    >
                      {t.serviceTag}
                    </span>
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
