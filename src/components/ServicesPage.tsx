import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'seo',
    slug: 'SEO',
    icon: '🔍',
    color: '#a87242',
    tagline: 'Be found first.',
    headline: 'Search Engine Optimisation',
    what: 'SEO is the practice of making your website the most relevant, trustworthy result for the searches your customers are already making.',
    why: 'Over 90% of online experiences begin with a search engine. Brands that own the first page own the conversation — and the leads that come with it.',
    approach:
      'We start with a full technical audit, then layer in competitive keyword mapping, on-page content strategy, and authoritative link-building. Everything is tied to business outcomes, not vanity metrics.',
    deliverables: [
      'Technical site audit & fix roadmap',
      'Keyword strategy & content calendar',
      'On-page optimisation',
      'Link-building campaigns',
      'Monthly ranking & traffic reports',
    ],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'E-commerce Brand', outcome: '#1 ranking for 40+ target keywords', tag: 'Retail' },
      { title: 'SaaS Platform', outcome: '320% organic traffic growth in 6 months', tag: 'Tech' },
    ],
  },
  {
    id: 'geo',
    slug: 'GEO',
    icon: '📍',
    color: '#c89368',
    tagline: 'Right place. Right person.',
    headline: 'Geo-Location Marketing',
    what: 'GEO marketing uses location intelligence to serve hyper-relevant ads and content to potential customers at the exact moment they are most likely to act.',
    why: "Location context is the strongest purchase-intent signal available. A person searching near your competitor is your best prospect — if you reach them first.",
    approach:
      'We build geo-fenced audiences, layer in behavioural and demographic signals, then craft messaging tuned to location context. Campaigns are continuously optimised against foot-traffic and conversion data.',
    deliverables: [
      'Geo-audience strategy & build',
      'Location-triggered ad campaigns',
      'Competitor geo-fencing',
      'Foot-traffic attribution',
      'Performance dashboards',
    ],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'Restaurant Chain', outcome: '65% increase in foot traffic from ads', tag: 'Hospitality' },
      { title: 'Retail Group', outcome: '4.2× ROAS on geo-targeted campaigns', tag: 'Retail' },
    ],
  },
  {
    id: 'social',
    slug: 'Social',
    icon: '💬',
    color: '#d4a576',
    tagline: 'Build community. Drive loyalty.',
    headline: 'Social Media Marketing',
    what: 'Social media marketing turns platforms into owned media channels — places where your brand builds real relationships and drives measurable business results.',
    why: 'Your audience spends hours daily on social. Brands that show up consistently with valuable, entertaining content become the default choice when it is time to buy.',
    approach:
      'We build platform-specific strategies, produce native creative content, manage community engagement, and run paid amplification on top of organic — all in one unified system.',
    deliverables: [
      'Platform strategy & content pillars',
      'Monthly content calendar & production',
      'Community management',
      'Paid social integration',
      'Analytics & growth reporting',
    ],
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'Fashion Brand', outcome: '180% follower growth in 90 days', tag: 'Fashion' },
      { title: 'B2B Software Co.', outcome: '3× LinkedIn engagement rate vs. industry avg', tag: 'Tech' },
    ],
  },
  {
    id: 'performance',
    slug: 'Performance',
    icon: '📈',
    color: '#a87242',
    tagline: 'Every dollar, accountable.',
    headline: 'Performance Marketing',
    what: 'Performance marketing is paid advertising built entirely around measurable outcomes — clicks, leads, and revenue — not impressions or reach.',
    why: "Organic growth is powerful but slow. Performance marketing injects velocity, letting you scale proven messages to new audiences and pull forward revenue you'd otherwise wait months for.",
    approach:
      'We audit existing accounts, restructure campaign architecture for efficiency, and build creative testing pipelines. As winners emerge we scale budgets predictably — always optimising for cost-per-acquisition, not cost-per-click.',
    deliverables: [
      'Account audit & restructure',
      'Creative strategy & ad production',
      'A/B testing framework',
      'Conversion rate optimisation',
      'Bi-weekly performance reports',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'D2C Health Brand', outcome: '2.8× ROAS improvement after audit', tag: 'Health' },
      { title: 'EdTech Startup', outcome: 'CAC reduced by 42% in 60 days', tag: 'Education' },
    ],
  },
  {
    id: 'branding',
    slug: 'Branding',
    icon: '✨',
    color: '#8b5e3c',
    tagline: 'Identity that commands attention.',
    headline: 'Branding & Identity',
    what: 'Branding is the strategic and visual language that tells the world who you are, what you stand for, and why you are different from every alternative.',
    why: 'In a noisy market, the brand that is most memorable and most trusted wins — regardless of price. Strong branding is the compound interest of marketing.',
    approach:
      'We go deep on brand positioning before we touch a pixel: audience research, competitive landscape, messaging architecture. Then we translate strategy into a distinctive visual identity system that scales from social thumbnails to billboard.',
    deliverables: [
      'Brand positioning & messaging framework',
      'Logo & visual identity system',
      'Brand guidelines document',
      'Typography & colour palette',
      'Brand voice & tone guide',
    ],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'FinTech Startup', outcome: 'Full rebrand ahead of Series A raise', tag: 'Finance' },
      { title: 'Hospitality Group', outcome: 'New identity across 12 locations', tag: 'Hospitality' },
    ],
  },
  {
    id: 'web',
    slug: 'Websites',
    icon: '🌐',
    color: '#a87242',
    tagline: 'Your hardest-working sales asset.',
    headline: 'Website Development',
    what: 'We build high-performance websites that are engineered — not just designed — to convert visitors into customers and rank on search engines.',
    why: 'Your website is the only digital asset you fully own. It should be doing the heavy lifting: generating leads, building trust, and working 24/7.',
    approach:
      'Every project starts with conversion goals and user journeys. We design with those outcomes in mind, build on modern stacks for performance, and optimise every page for SEO and Core Web Vitals from day one.',
    deliverables: [
      'UX/UI design & prototyping',
      'Front-end & CMS development',
      'Performance & Core Web Vitals optimisation',
      'On-page SEO implementation',
      'Post-launch support & maintenance',
    ],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'Real Estate Platform', outcome: 'Site rebuilt — 210% more qualified leads', tag: 'Real Estate' },
      { title: 'Agency Rebrand', outcome: '99 Lighthouse score, 0.8s LCP', tag: 'Agency' },
    ],
  },
  {
    id: 'content',
    slug: 'Content',
    icon: '✍️',
    color: '#c89368',
    tagline: 'Attract. Educate. Convert.',
    headline: 'Content Creation',
    what: 'Content creation is the engine behind every other service — the articles, videos, copy, and visuals that attract your audience, build trust, and drive decisions.',
    why: 'Brands that consistently produce valuable content earn 6× more leads than brands that rely on advertising alone. Content compounds; ads stop the moment you stop paying.',
    approach:
      'We build content ecosystems around topics your customers are already searching for. Every piece is strategically mapped to a stage in the buyer journey and optimised to rank, share, and convert.',
    deliverables: [
      'Content strategy & pillar mapping',
      'Blog articles & thought leadership',
      'Video scripts & production direction',
      'Social content & copywriting',
      'Content performance analysis',
    ],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'B2B SaaS Company', outcome: 'Content drives 40% of all inbound leads', tag: 'Tech' },
      { title: 'E-commerce Brand', outcome: 'Blog traffic up 250% in 8 months', tag: 'Retail' },
    ],
  },
  {
    id: 'graphic',
    slug: 'Design',
    icon: '🎨',
    color: '#d4a576',
    tagline: 'Visual language that sells.',
    headline: 'Graphic Design',
    what: 'Graphic design is how your brand communicates without words — the visual shorthand that signals quality, trust, and professionalism before a single word is read.',
    why: 'People form visual judgements in milliseconds. Premium design is not a luxury — it is a conversion tool that affects every touchpoint from ad creative to pitch deck.',
    approach:
      'We approach every design brief as a communication problem first. Concept, hierarchy, and clarity come before aesthetics. Then we execute to the highest production standard, across digital and print.',
    deliverables: [
      'Ad creative & campaign visuals',
      'Pitch decks & presentation design',
      'Social media graphics & templates',
      'Print collateral & packaging',
      'Infographics & data visualisation',
    ],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'Consumer App', outcome: 'App Store feature — 3× download spike', tag: 'Tech' },
      { title: 'Food & Beverage Brand', outcome: 'Packaging redesign increased shelf pickup by 38%', tag: 'FMCG' },
    ],
  },
]

const ecosystemConnections: Record<string, string[]> = {
  seo:         ['content', 'web', 'performance'],
  geo:         ['performance', 'social', 'seo'],
  social:      ['content', 'branding', 'performance'],
  performance: ['seo', 'geo', 'web', 'content'],
  branding:    ['web', 'content', 'graphic', 'social'],
  web:         ['seo', 'branding', 'performance'],
  content:     ['seo', 'social', 'branding'],
  graphic:     ['branding', 'content', 'social'],
}

const processSteps = [
  { number: '01', label: 'Discover',   description: 'We dig into your business, your market, and your customers. No assumptions — just research.' },
  { number: '02', label: 'Strategise', description: 'We map out exactly which services, in what sequence, will move the needle fastest for your goals.' },
  { number: '03', label: 'Create',     description: 'Our full in-house team executes — design, copy, code, ads — to the highest standard.' },
  { number: '04', label: 'Launch',     description: 'We ship with precision. Every channel activated, every tracking pixel fired, every integration verified.' },
  { number: '05', label: 'Optimise',   description: 'Data flows in. We iterate relentlessly — cutting what underperforms, doubling what works.' },
  { number: '06', label: 'Scale',      description: 'Once the system is proven, we scale. More budget, more channels, more growth.' },
]

const whyPoints = [
  { label: 'Full-funnel execution',         body: 'From awareness to conversion to retention — we cover every stage in-house, eliminating the gaps that kill growth when you stitch together multiple agencies.', color: '#a87242' },
  { label: 'In-house creative production',  body: 'Most agencies outsource creative. We do not. Our designers, videographers, and copywriters work alongside your strategists — faster briefs, better output, lower cost.', color: '#c89368' },
  { label: 'SEO + GEO expertise',           body: 'Very few agencies genuinely understand both organic search and location-based marketing. We have built processes that combine them for compounding results.', color: '#d4a576' },
  { label: 'Data-first decisions',          body: 'Every recommendation we make is grounded in data — not trends, gut feelings, or what worked for a different client in a different industry.', color: '#8b5e3c' },
  { label: 'Systems thinking',              body: 'We build interconnected systems, not isolated campaigns. Each service amplifies the others, creating compounding returns that standalone tactics can never match.', color: '#a87242' },
  { label: 'Website development capability',body: 'Most marketing agencies cannot touch your website. We design and build them — so strategy and execution are never in conflict.', color: '#c89368' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServiceEcosystemMap({ onServiceClick }: { onServiceClick: (id: string) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const getOpacity = (id: string) => {
    if (!hoveredId) return 1
    const connected = ecosystemConnections[hoveredId] ?? []
    return id === hoveredId || connected.includes(id) ? 1 : 0.2
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {services.map((svc, i) => (
        <motion.button
          key={svc.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          viewport={{ once: true }}
          animate={{ opacity: getOpacity(svc.id) }}
          onMouseEnter={() => setHoveredId(svc.id)}
          onMouseLeave={() => setHoveredId(null)}
          onFocus={() => setHoveredId(svc.id)}
          onBlur={() => setHoveredId(null)}
          onClick={() => onServiceClick(svc.id)}
          aria-label={`${svc.headline} — click to learn more`}
          className="relative rounded-2xl border border-[#a87242]/20 card-hover overflow-hidden text-left transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out group"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: hoveredId === svc.id ? `${svc.color}60` : undefined,
            boxShadow: hoveredId === svc.id ? `0 0 30px ${svc.color}22` : undefined,
          }}
          
        >
          {/* Image strip */}
          <div className="relative h-28 sm:h-32 overflow-hidden bg-[#1a120c]">
            <img
              src={svc.image}
              alt={svc.headline}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{ background: `linear-gradient(135deg, rgba(26,18,12,0.6), ${svc.color}99)` }}
            />
            {/* Bottom gradient — deeper so text is readable */}
            <div className="absolute inset-x-0 bottom-0 h-16"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(10,8,7,1))' }} />
          </div>

          <div className="px-4 sm:px-5 pt-3 pb-5 relative">
            {/* Colour accent line */}
            <div
              className="w-6 h-0.5 mb-3 rounded-full"
              style={{ background: svc.color }}
            />
            {/* Service name — prominent editorial treatment */}
            <p className="leading-none mb-1.5">
              <span
                className="font-black text-white uppercase tracking-wide"
                style={{ fontSize: 'clamp(13px, 2.2vw, 17px)', letterSpacing: '0.04em' }}
              >
                {svc.slug}
              </span>
            </p>
            <p className="text-xs text-white/40 leading-snug font-serif-italic" style={{ color: `${svc.color}cc` }}>{svc.tagline}</p>
          </div>

          {/* "connected" dot */}
          {hoveredId && hoveredId !== svc.id && (ecosystemConnections[hoveredId] ?? []).includes(svc.id) && (
            <div
              className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full ring-2 ring-[#0a0807]"
              style={{ background: services.find(s => s.id === hoveredId)?.color }}
            />
          )}

          {/* Click arrow */}
          <div className="absolute bottom-4 right-4 text-white/25 text-xs group-hover:text-[#d4a576] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">↗</div>
        </motion.button>
      ))}
    </div>
  )
}

function ServiceDeepDive({ svc, index }: { svc: typeof services[0]; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      id={`service-${svc.id}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start py-16 md:py-20 border-b border-[#a87242]/20 last:border-b-0"
    >
      {/* Text side */}
      <div className={isEven ? '' : 'lg:order-2'}>
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#a87242]/20"
            style={{ background: `${svc.color}20` }}
          >
            <span className="font-black text-xs tracking-widest" style={{ color: svc.color }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: svc.color }}>
            {svc.slug}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-3">
          {svc.headline}
        </h3>
        <p className="font-serif-italic text-xl md:text-2xl font-normal mb-8" style={{ color: svc.color }}>
          {svc.tagline}
        </p>

        {/* What / Why / How */}
        <div className="space-y-6 mb-10">
          {[
            { heading: 'What it is', body: svc.what },
            { heading: 'Why it matters', body: svc.why },
            { heading: 'How we approach it', body: svc.approach },
          ].map(block => (
            <div key={block.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">{block.heading}</p>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Key deliverables</p>
          <ul className="space-y-2.5">
            {svc.deliverables.map(d => (
              <li key={d} className="flex items-start gap-3 text-sm text-white/70">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: svc.color }}
                />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual side */}
      <div className={isEven ? '' : 'lg:order-1'}>
        {/* Hero image */}
        <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[4/3] bg-[#1a120c]">
          <img
            src={svc.image}
            alt={svc.headline}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 mix-blend-multiply opacity-40"
            style={{ background: `linear-gradient(135deg, #1a120c, ${svc.color})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0807]/70 via-transparent to-transparent" />

          {/* Overlay text */}
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-white font-bold text-lg sm:text-xl leading-tight">{svc.headline}</p>
          </div>
        </div>

        {/* Related work cards */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Related work</p>
          {svc.relatedWork.map(work => (
            <div
              key={work.title}
              className="rounded-xl border border-[#a87242]/20 p-4 sm:p-5 group cursor-pointer hover:border-[#a87242]/40 transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out"
              style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white text-sm mb-1 group-hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out">{work.title}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{work.outcome}</p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: `${svc.color}18`, color: svc.color }}
                >
                  {work.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface ServicesPageProps {
  onBookCall: () => void
  onViewWork: () => void
}

export default function ServicesPage({ onBookCall, onViewWork }: ServicesPageProps) {
  const scrollToService = (id: string) => {
    document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="w-full bg-[#0a0807] overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(168,114,66,0.28) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <Container maxWidth="xl" className="relative z-10 pt-28 pb-20 md:pt-40 md:pb-28">
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-8 md:mb-10"
            >
              Services
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="font-bold text-white leading-[0.95] tracking-tight mb-8 md:mb-10"
              style={{ fontSize: 'clamp(48px, 10vw, 130px)', letterSpacing: '-0.03em' }}
            >
              Growth isn't<br />
              one{' '}
              <span className="font-serif-italic font-normal" style={{ color: '#d4a576' }}>
                service.
              </span>
              <br />
              It's a{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #a87242, #d4a576)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                system.
              </span>
            </motion.h1>

            {/* Sub-copy + CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/55 max-w-lg leading-relaxed">
                DigiDZN integrates eight disciplines into one connected growth engine — so every channel amplifies every other, and nothing falls through the cracks.
              </p>
              <div className="flex flex-wrap gap-3 sm:flex-shrink-0">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onBookCall}
                  className="px-6 py-3 rounded-full text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
                >
                  Book Strategy Call
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('services-ecosystem')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 rounded-full text-sm font-semibold text-white border border-[#a87242]/40 bg-white/5 hover:bg-[#a87242]/15 hover:border-[#a87242]/40 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
                >
                  Explore services ↓
                </motion.button>
              </div>
            </motion.div>

            {/* Service slugs ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-2 mt-12 md:mt-16"
            >
              {services.map(svc => (
                <button
                  key={svc.id}
                  onClick={() => scrollToService(svc.id)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#a87242]/30 text-white/45 transition-all hover:text-white hover:border-[#a87242]/50 hover:bg-[#a87242]/10"
                >
                  {svc.slug}
                </button>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Growth Ecosystem ─────────────────────────────────────────── */}
      <Section id="services-ecosystem" className="py-20 md:py-32 bg-[#0d0a08]">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">The Ecosystem</p>
            <div className="md:flex items-end justify-between gap-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4 md:mb-0">
                Eight forces,{' '}
                <span className="font-serif-italic font-normal text-[#d4a576]">one</span>{' '}
                unified system
              </h2>
              <p className="text-base text-white/50 max-w-sm leading-relaxed">
                Hover any service to see how it connects to the rest. Click to go deeper.
              </p>
            </div>
          </motion.div>

          <ServiceEcosystemMap onServiceClick={scrollToService} />

          {/* Connector callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 md:mt-12 rounded-2xl border border-[#a87242]/20 p-6 md:p-8"
            style={{ background: 'rgba(168,114,66,0.06)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            <div className="md:flex items-center justify-between gap-8">
              <div className="mb-5 md:mb-0">
                <p className="text-white font-bold text-lg sm:text-xl mb-2">The compounding effect</p>
                <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
                  When SEO, Content, and Performance Marketing run together, the results aren't additive — they're multiplicative. Each service creates data, audiences, and assets that the others consume. That's what separates a system from a collection of tactics.
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onBookCall}
                className="flex-shrink-0 px-6 py-3 rounded-full text-sm font-semibold text-white border border-[#a87242]/40 bg-white/5 hover:bg-[#a87242]/20 hover:border-[#a87242]/50 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
              >
                Build your system →
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── Service Deep Dives ───────────────────────────────────────── */}
      <section id="services-deep-dive" className="w-full py-16 md:py-24 bg-[#0a0807]">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">What we do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4">
              Every service,{' '}
              <span className="font-serif-italic font-normal text-[#d4a576]">explained</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed">
              No jargon. No fluff. Here's exactly what each service is, why it matters, and how we execute it.
            </p>
          </motion.div>

          <div>
            {services.map((svc, i) => (
              <ServiceDeepDive key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Process ─────────────────────────────────────────────────── */}
      <Section id="services-process" className="py-20 md:py-32 bg-[#0d0a08]">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-14 md:mb-20"
          >
            <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">How we work</p>
            <div className="md:flex items-end justify-between gap-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4 md:mb-0">
                The{' '}
                <span className="font-serif-italic font-normal text-[#d4a576]">process</span>
              </h2>
              <p className="text-base text-white/50 max-w-sm leading-relaxed">
                From first conversation to scaling revenue — here's how every engagement unfolds.
              </p>
            </div>
          </motion.div>

          {/* Steps — two-column grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative rounded-2xl border border-[#a87242]/20 card-hover p-7 sm:p-8 group overflow-hidden transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out"
                style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
              >
                {/* Step number watermark */}
                <span
                  className="absolute -top-2 -right-1 text-7xl font-black leading-none select-none pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168,114,66,0.12), rgba(212,165,118,0.06))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {step.number}
                </span>

                {/* Step number badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-[#a87242]/30"
                  style={{ background: 'rgba(168,114,66,0.10)' }}
                >
                  <span className="font-black text-xs tracking-widest" style={{ color: '#a87242' }}>{step.number}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-wide uppercase group-hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out">
                  {step.label}
                </h3>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed">{step.description}</p>

                {/* Connector arrow (not on last) */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#a87242]/40 text-lg">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Why DigiDZN ──────────────────────────────────────────────── */}
      <Section id="services-why" className="py-20 md:py-32 bg-[#0a0807]">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-14 md:mb-20"
          >
            <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">Why DigiDZN</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-5">
              What makes us{' '}
              <span className="font-serif-italic font-normal text-[#d4a576]">different</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed">
              Most agencies are a collection of freelancers with a shared email address. We're a fully integrated team built to execute across every growth lever simultaneously.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {whyPoints.map((pt, i) => (
              <motion.div
                key={pt.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                
                className="relative rounded-2xl border border-[#a87242]/20 card-hover p-7 sm:p-8 group transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out"
              style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-[#a87242]/20"
                  style={{ background: `${pt.color}15` }}
                >
                  <span
                    className="font-black text-xs tracking-widest"
                    style={{ color: pt.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-black text-white text-base sm:text-lg mb-3 tracking-wide uppercase group-hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out">
                  {pt.label}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{pt.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[#a87242]/20"
          style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            {[
              { value: '8', unit: 'Services', label: 'fully in-house' },
              { value: '100+', unit: 'Projects', label: 'delivered' },
              { value: '3×', unit: 'Average', label: 'ROAS improvement' },
              { value: '24h', unit: 'Response', label: 'guaranteed' },
            ].map((stat, i) => (
              <div
                key={stat.unit}
                className={`p-6 sm:p-8 ${i < 3 ? 'border-r border-[#a87242]/20' : ''} bg-white/[0.025]`}
              >
                <p
                  className="text-3xl sm:text-4xl font-black text-white leading-none mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #a87242, #d4a576)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-white/70 mb-0.5">{stat.unit}</p>
                <p className="text-xs text-white/35">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="py-28 md:py-44 bg-[#0a0807] relative overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(168,114,66,0.3), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <Container maxWidth="lg" className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-6">Ready to grow?</p>
            <h2
              className="font-bold text-white leading-[0.95] tracking-tight mb-7 md:mb-8"
              style={{ fontSize: 'clamp(40px, 8vw, 100px)', letterSpacing: '-0.03em' }}
            >
              Ready to grow with a{' '}
              <span className="font-serif-italic font-normal" style={{ color: '#d4a576' }}>
                system,
              </span>
              <br />
              not just a service?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/55 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
              Let's talk about your goals, diagnose what's holding back your growth, and build the right system to fix it.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onBookCall}
                className="px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
              >
                Book Strategy Call →
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onViewWork}
                className="px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white border border-[#a87242]/50 bg-white/5 hover:bg-[#a87242]/15 hover:border-[#a87242]/40 transition-[color,border-color,background-color,opacity] duration-200 ease-out"
              >
                View Our Work
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </section>

    </div>
  )
}
