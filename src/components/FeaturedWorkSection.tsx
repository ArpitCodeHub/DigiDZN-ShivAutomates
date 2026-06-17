import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

// ─── Case study type ────────────────────────────────────────────────────────

interface Metric {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  title: string
  industry: string
  primaryService: string
  summary: string
  approach: string
  services: string[]
  metrics: Metric[]
  highlight: Metric
  color: string
  image: string // path under /public/case-studies/
}

// ─── Real DigiDZN client work — clients anonymised by industry ──────────────

const PROJECTS: CaseStudy[] = [
  {
    id: 'fashion-ecommerce-sales',
    title: 'Fashion E-Commerce Brand',
    industry: 'Fashion & Apparel',
    primaryService: 'Performance + Social',
    summary:
      'Social media and performance marketing engine built to drive sales at scale and convert traffic into real revenue.',
    approach:
      'A fashion e-commerce brand leveraged our social media and performance marketing expertise to generate revenue, drive website traffic, and build a digital presence that continues to attract and convert customers.',
    services: ['Social Media Marketing', 'Performance Marketing', 'Creative Strategy', 'Meta Ads'],
    metrics: [
      { value: '₹57.48L+', label: 'order value' },
      { value: '340K+', label: 'website visits' },
      { value: '5,701', label: 'add to carts' },
      { value: '₹5.54L', label: 'ad spend' },
    ],
    highlight: { value: '₹57.48L+', label: 'in sales generated' },
    color: '#a87242',
    image: '/case-studies/fashion%26apparel-brand.png',
  },
  {
    id: 'fitness-wellness-growth',
    title: 'Fitness & Wellness Brand',
    industry: 'Fitness & Wellness',
    primaryService: 'Content + Social',
    summary:
      'Performance-driven content and visual storytelling that significantly expanded a fitness brand’s digital footprint.',
    approach:
      'Through a combination of strategic content, performance-driven social media campaigns, and engaging visual storytelling, we strengthened audience engagement and increased brand visibility across key platforms.',
    services: ['Social Media Marketing', 'Content Marketing', 'Creative Strategy', 'Community Building'],
    metrics: [
      { value: '550K+', label: 'reach' },
      { value: '401K+', label: 'page views' },
      { value: '70K+', label: 'engagements' },
      { value: '88K+', label: 'video views' },
    ],
    highlight: { value: '550K+', label: 'reach' },
    color: '#c89368',
    image: '/case-studies/fitness%26wellness-brand.png',
  },
  {
    id: 'interior-design-authority',
    title: 'Interior Design & Architecture Studio',
    industry: 'Interior Design & Architecture',
    primaryService: 'Brand Building',
    summary:
      'Strategic content and creative storytelling that established a design studio as a recognised industry authority.',
    approach:
      'Through a combination of strategic content, creative storytelling, and audience-focused social media campaigns, we transformed social media into a powerful channel for visibility and engagement, showcasing projects, expertise, and brand values.',
    services: ['Social Media Marketing', 'Creative Strategy', 'Brand Building', 'Content Marketing'],
    metrics: [
      { value: '208K+', label: 'impressions' },
      { value: '201K+', label: 'reach' },
      { value: '22K+', label: 'engagements' },
      { value: '12.6K+', label: 'followers' },
    ],
    highlight: { value: '208K+', label: 'impressions' },
    color: '#d4a576',
    image: '/case-studies/interiordesign-brand.png',
  },
  {
    id: 'interior-design-leads',
    title: 'Interior Design Brand',
    industry: 'Interior Design & Architecture',
    primaryService: 'Performance + Lead Gen',
    summary:
      'Performance campaigns that turned an interior design brand’s online presence into a high-performing acquisition channel.',
    approach:
      'A combination of strategic advertising, compelling visual content, and audience-focused campaigns transformed the brand’s online presence into a customer acquisition channel — focused on attracting high-intent prospects while maximising campaign efficiency and return on investment.',
    services: ['Performance Marketing', 'Lead Generation', 'Social Media Marketing', 'Creative Strategy'],
    metrics: [
      { value: '355', label: 'qualified leads' },
      { value: '211K+', label: 'reach' },
      { value: '₹148.88', label: 'cost per lead' },
    ],
    highlight: { value: '355', label: 'qualified leads' },
    color: '#8b5e3c',
    image: '/case-studies/driving-lead-gen_interiordesign-brand.png',
  },
  {
    id: 'apparel-digital-presence',
    title: 'Apparel Brand',
    industry: 'Fashion & Apparel',
    primaryService: 'Brand Growth',
    summary:
      'Strategic social media campaigns and engaging creative content that built a stronger apparel brand presence.',
    approach:
      'We focused on audience engagement and consistent brand communication, helping the brand build a growing community and a stronger position in the competitive fashion market.',
    services: ['Social Media Marketing', 'Creative Strategy', 'Content Marketing', 'Brand Growth'],
    metrics: [
      { value: '205K+', label: 'reach' },
      { value: '25K+', label: 'engagements' },
      { value: '1.5K+', label: 'new followers' },
    ],
    highlight: { value: '205K+', label: 'account reach' },
    color: '#a87242',
    image: '/case-studies/stronger-digital-presence_apparel-brand.png',
  },
  {
    id: 'real-estate-leads',
    title: 'Real Estate Brand',
    industry: 'Real Estate',
    primaryService: 'Lead Generation',
    summary:
      'Targeted campaigns and property-focused creatives that turned social into a reliable buyer-inquiry channel.',
    approach:
      'By combining targeted campaigns, compelling property-focused creatives, and audience-driven messaging, we helped the brand expand its reach, increase visibility, and connect with prospective buyers actively exploring real estate opportunities.',
    services: ['Social Media Marketing', 'Lead Generation', 'Creative Strategy', 'Performance Campaigns'],
    metrics: [
      { value: '37K+', label: 'reach' },
      { value: '22K+', label: 'impressions' },
      { value: '150+', label: 'qualified leads' },
    ],
    highlight: { value: '150+', label: 'qualified buyer leads' },
    color: '#c89368',
    image: '/case-studies/realestate-brand.png',
  },
  {
    id: 'family-entertainment',
    title: 'Arcade, Playzone & Family Entertainment Venue',
    industry: 'Family Entertainment & Hospitality',
    primaryService: 'Social + Content',
    summary:
      'Experience-led social campaigns that positioned a family destination as the preferred choice for fun and recreation.',
    approach:
      'Through strategic social media campaigns and engaging content, we showcased experiences rather than just facilities — increasing brand visibility, driving profile engagement, and positioning the venue as a preferred destination for families.',
    services: ['Social Media Marketing', 'Content Strategy', 'Creative Design', 'Community Engagement'],
    metrics: [
      { value: '9.6K+', label: 'impressions' },
      { value: '8.7K+', label: 'reach' },
      { value: '5K+', label: 'profile visits' },
    ],
    highlight: { value: '5K+', label: 'profile visits' },
    color: '#d4a576',
    image: '/case-studies/arcade%26playzone-brand.png',
  },
]

// ─── Card ───────────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick }: { project: CaseStudy; onClick: (p: CaseStudy) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      onClick={() => onClick(project)}
      className="rounded-2xl border border-[#a87242]/20 card-hover overflow-hidden group relative cursor-pointer transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out"
      style={{
        background: 'rgba(26,18,12,0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Image / typographic fallback */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a120c]">
        {/* Brand-coloured fallback gradient (always present) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, #1a120c 0%, ${project.color} 130%)` }}
        />
        {/* Subtle grain texture so the gradient feels intentional, not blank */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0%, transparent 35%)',
          }}
        />
        {/* Image (graceful fail) */}
        <img
          src={project.image}
          alt={`${project.title} — ${project.summary}`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement
            img.style.display = 'none'
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Restrained warm tint */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
          style={{ background: `linear-gradient(135deg, #1a120c 0%, ${project.color} 120%)` }}
        />
        {/* Bottom fade */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(10,8,7,0.95))' }}
        />

        {/* Industry pill — top left */}
        <span
          className="absolute top-4 left-4 inline-flex items-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full backdrop-blur-md border z-10"
          style={{
            background: `${project.color}30`,
            color: '#fff',
            borderColor: `${project.color}80`,
          }}
        >
          {project.industry}
        </span>

        {/* Highlight metric — bottom left, editorial */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <p
            className="font-bold text-white leading-none tracking-tight mb-1.5"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 56px)',
              letterSpacing: '-0.03em',
            }}
          >
            {project.highlight.value}
          </p>
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/65">
            {project.highlight.label}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: project.color }}>
          {project.primaryService}
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out">
          {project.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed mb-6 line-clamp-2">{project.summary}</p>

        <div className="flex items-center justify-between pt-5 border-t border-[#a87242]/15">
          <span className="text-xs text-white/35 font-medium uppercase tracking-[0.2em]">
            {project.metrics.length} key metrics
          </span>
          <span
            className="text-xs font-semibold flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ color: project.color }}
          >
            View case →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Modal ──────────────────────────────────────────────────────────────────

function CaseStudyModal({ project, onClose }: { project: CaseStudy; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-y-auto border border-[#a87242]/30"
        style={{ background: 'rgba(17,13,10,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image / fallback */}
        <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl bg-[#1a120c]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, #1a120c 0%, ${project.color} 130%)` }}
          />
          <img
            src={project.image}
            alt={project.title}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              img.style.display = 'none'
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply opacity-25"
            style={{ background: `linear-gradient(135deg, #1a120c, ${project.color})` }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-28"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(17,13,10,1))' }}
          />
        </div>

        <div className="p-8 md:p-10 -mt-12 relative">
          <div className="flex items-start justify-between mb-7 gap-6">
            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-[0.22em] border"
                style={{
                  background: `${project.color}25`,
                  color: '#fff',
                  borderColor: `${project.color}80`,
                }}
              >
                {project.industry}
              </span>
              <h3
                className="font-bold text-white leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-0.02em' }}
              >
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Approach */}
          <div className="mb-9">
            <p className="text-xs font-semibold text-white/35 uppercase tracking-[0.22em] mb-3">Approach</p>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">{project.approach}</p>
          </div>

          {/* Metrics grid */}
          <div className="mb-9">
            <p className="text-xs font-semibold text-white/35 uppercase tracking-[0.22em] mb-4">Results</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden border border-[#a87242]/20" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {project.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`p-5 sm:p-6 ${i < project.metrics.length - 1 ? 'border-r border-[#a87242]/15' : ''}`}
                  style={{ background: 'rgba(10,8,7,0.55)' }}
                >
                  <p
                    className="font-bold text-white leading-none tracking-tight mb-2"
                    style={{
                      fontSize: 'clamp(22px, 2.6vw, 32px)',
                      letterSpacing: '-0.02em',
                      color: i === 0 ? project.color : undefined,
                    }}
                  >
                    {m.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/45 uppercase tracking-[0.18em]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-white/35 uppercase tracking-[0.22em] mb-4">Services delivered</p>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full border font-medium"
                  style={{
                    borderColor: `${project.color}40`,
                    color: project.color,
                    background: `${project.color}10`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ────────────────────────────────────────────────────────────────

export default function FeaturedWorkSection() {
  const [selected, setSelected] = useState<CaseStudy | null>(null)

  return (
    <Section id="featured-work" className="py-24 md:py-36 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header — left-aligned editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-[0.25em] mb-5">
            Featured Work
          </p>
          <h2
            className="text-white leading-[1.02] tracking-tight font-bold mb-6"
            style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', letterSpacing: '-0.02em' }}
          >
            Numbers don't lie.{' '}
            <span className="font-serif-italic font-normal text-[#d4a576]">Neither does our work.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/55 max-w-xl leading-relaxed">
            Real campaigns. Real outcomes. Below are some of the engagements we've delivered for clients
            across fashion, real estate, fitness, design, and entertainment. Click any case to see the
            full story.
          </p>
        </motion.div>

        {/* Grid — 1/2/3 cols, asymmetric on lg via row-span/col-span if needed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selected && <CaseStudyModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Section>
  )
}
