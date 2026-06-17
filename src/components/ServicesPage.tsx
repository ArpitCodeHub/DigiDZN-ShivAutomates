import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'seo',
    slug: 'SEO + GEO',
    icon: '01',
    color: '#a87242',
    tagline: 'Get found everywhere — search and AI.',
    headline: 'SEO, AEO & GEO Services That Help Your Brand Get Found Everywhere',
    what: "Your customers are no longer searching only on Google. They're asking questions on ChatGPT, Gemini, Perplexity, Google AI Overviews, YouTube, and voice assistants before making purchasing decisions. We improve visibility across traditional search engines and AI-powered search experiences through SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).",
    why: "Search behaviour has evolved dramatically. Customers now expect instant answers instead of browsing through multiple pages of results. AI-powered platforms have become discovery engines that influence buying decisions, brand perception, and customer journeys. If your business isn't visible where customers are searching today, you risk losing opportunities to competitors.",
    approach:
      "We combine three disciplines into a unified search visibility strategy. SEO improves rankings on Google through technical optimization and content strategy. AEO targets featured snippets, AI Overviews, and voice search experiences. GEO improves visibility across AI platforms through entity optimization, authority building, citations, and knowledge graph enhancements.",
    deliverables: [
      'Technical SEO & Local SEO',
      'On-Page & Off-Page SEO',
      'SEO Content Strategy & Link Building',
      'Featured Snippet & AI Search Optimization',
      'Knowledge Graph & Citation Building',
      'Google Business Profile Optimization',
    ],
    framework: 'Discover → Optimize → Build Authority → AI Visibility → Scale',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'E-commerce Brand', outcome: 'Top rankings across 40+ commercial keywords', tag: 'Retail' },
      { title: 'D2C SaaS', outcome: 'Featured in AI Overviews for 12 target queries', tag: 'Tech' },
    ],
  },
  {
    id: 'content',
    slug: 'Content',
    icon: '02',
    color: '#c89368',
    tagline: 'Trust. Visibility. Demand.',
    headline: 'Content Marketing That Builds Trust, Visibility & Demand',
    what: "People don't buy because they see an advertisement. They buy because they trust the brand behind it. We help businesses create content that attracts attention, educates audiences, strengthens authority, and supports long-term growth.",
    why: "Content powers search visibility. Content powers AI visibility. Content powers social engagement. Content powers trust. Brands that consistently invest in content marketing remain discoverable long after campaigns end.",
    approach:
      "We build content aligned with customer journeys, position your brand as an industry expert, distribute across websites, search, social media, and AI platforms, and continuously measure and improve effectiveness so every asset compounds in value over time.",
    deliverables: [
      'SEO, GEO & AEO Content',
      'Website Copywriting & Blog Writing',
      'LinkedIn Thought Leadership',
      'Case Studies & Email Marketing',
      'Video Scripts',
      'Content Repurposing',
    ],
    framework: 'Research → Plan → Create → Distribute → Optimize',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'B2B SaaS Company', outcome: 'Content drives 40% of all inbound leads', tag: 'Tech' },
      { title: 'D2C Brand', outcome: 'Blog traffic up 250% in 8 months', tag: 'Retail' },
    ],
  },
  {
    id: 'influencer',
    slug: 'Influencer',
    icon: '03',
    color: '#d4a576',
    tagline: 'Trust that drives action.',
    headline: 'Influencer Marketing That Builds Trust & Drives Action',
    what: "Consumers trust people more than advertisements. Influencer marketing helps brands connect with audiences through authentic recommendations, creator-led storytelling, and community-driven engagement. We help brands identify the right creators, execute campaigns, and measure real business impact.",
    why: "Modern consumers research products through creators, influencers, and communities before making purchasing decisions. The right creator partnership can generate awareness, trust, engagement, and conversions faster than traditional advertising.",
    approach:
      "We discover creators aligned with your brand and audience, design campaigns based on business objectives, handle outreach and execution end-to-end, and track engagement, reach, and conversions so every collaboration is tied to measurable outcomes.",
    deliverables: [
      'Nano, Micro & Macro Influencers',
      'Celebrity Collaborations',
      'UGC Campaigns & Product Seeding',
      'Brand Ambassador Programs',
      'Influencer Events & Creator Partnerships',
      'Campaign Analytics',
    ],
    framework: 'Discover → Match → Execute → Amplify → Measure',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'Fashion Brand', outcome: '180% follower growth in 90 days', tag: 'Fashion' },
      { title: 'Consumer Tech', outcome: 'UGC campaign — 12M organic impressions', tag: 'Tech' },
    ],
  },
  {
    id: 'branding',
    slug: 'Branding',
    icon: '04',
    color: '#8b5e3c',
    tagline: "Memorable. Trusted. Chosen.",
    headline: 'Build A Brand That Customers Remember & Trust',
    what: "Your logo is not your brand. Your brand is how people perceive, remember, and choose your business over competitors. We help businesses build distinctive brands that create stronger market positioning, trust, and long-term growth.",
    why: "Products can be copied. Services can be replicated. Strong brands remain memorable. In crowded markets, branding becomes the difference between being noticed and being ignored.",
    approach:
      "We define positioning, purpose, and market differentiation through brand strategy. We create visual systems that communicate consistently through identity design. We develop messaging that resonates with target audiences, then ensure consistency across every customer touchpoint.",
    deliverables: [
      'Brand Strategy & Positioning',
      'Logo Design & Visual Identity',
      'Brand Guidelines',
      'Packaging Design',
      'Employer Branding & Rebranding',
      'Marketing Collateral Design',
    ],
    framework: 'Discover → Position → Design → Launch → Evolve',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'FinTech Startup', outcome: 'Full rebrand ahead of Series A raise', tag: 'Finance' },
      { title: 'Hospitality Group', outcome: 'New identity rolled out across 12 locations', tag: 'Hospitality' },
    ],
  },
  {
    id: 'ai',
    slug: 'AI Creative',
    icon: '05',
    color: '#a87242',
    tagline: 'Scale creative without compromise.',
    headline: 'AI-Powered Creative Production For Modern Brands',
    what: "Content demand has never been higher. Brands need more creatives, more videos, and faster production cycles without compromising quality. We combine AI-powered workflows with human creativity to produce impactful visual content at scale.",
    why: "The rise of short-form video, personalized content, and AI-powered content creation has transformed how brands communicate. Businesses need agile creative systems capable of producing high-performing content consistently.",
    approach:
      "We align creative concepts with marketing objectives, accelerate ideation and production through AI workflows, create engaging video content for digital platforms, and develop assets optimized for advertising campaigns.",
    deliverables: [
      'AI Creatives & Product Visuals',
      'Social Media Creatives',
      'Motion Graphics & Reels Production',
      'Corporate & Explainer Videos',
      'Ad Creatives & Video Editing',
      'Creative Testing Assets',
    ],
    framework: 'Concept → Create → Produce → Distribute → Optimize',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'Consumer App', outcome: '120 reels produced in a single quarter', tag: 'Tech' },
      { title: 'D2C Brand', outcome: '8× more ad creatives, 35% lower CPA', tag: 'Retail' },
    ],
  },
  {
    id: 'social',
    slug: 'Social',
    icon: '06',
    color: '#c89368',
    tagline: 'Attention. Trust. Growth.',
    headline: 'Social Media Marketing That Builds Attention, Trust & Growth',
    what: "Social media is no longer just a communication channel. It has become one of the most powerful discovery platforms where customers research brands, seek recommendations, and make buying decisions. We help businesses build meaningful presence through strategy, content, community engagement, and performance-driven campaigns.",
    why: "People discover products through Instagram Reels. They evaluate businesses through LinkedIn. They learn through YouTube. They trust recommendations from creators and communities. Brands that consistently create valuable content build stronger relationships and stay top-of-mind.",
    approach:
      "We build content roadmaps aligned with business goals, develop engaging visuals and platform-specific content, strengthen community through engagement and conversations, and amplify high-performing content to drive measurable growth.",
    deliverables: [
      'Instagram, Facebook, LinkedIn & YouTube Marketing',
      'Reels & Shorts Strategy',
      'Community Management',
      'Content Calendar Planning',
      'Influencer Collaborations',
      'AI-Powered Content Workflows',
    ],
    framework: 'Research → Create → Engage → Amplify → Grow',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'D2C Fashion', outcome: '180% follower growth in 90 days', tag: 'Fashion' },
      { title: 'B2B Software Co.', outcome: '3× LinkedIn engagement vs. industry avg', tag: 'Tech' },
    ],
  },
  {
    id: 'performance',
    slug: 'Performance',
    icon: '07',
    color: '#d4a576',
    tagline: 'Ad spend → business growth.',
    headline: 'Performance Marketing That Turns Ad Spend Into Business Growth',
    what: "Running ads is easy. Generating profitable results consistently is not. We help businesses attract the right audience, generate qualified leads, and maximize return on ad spend through data-driven campaigns across Meta, Google, LinkedIn, YouTube, and emerging advertising platforms.",
    why: "Customer journeys are no longer linear. A prospect may discover your brand through Instagram, search on Google, watch a YouTube video, and convert days later after seeing remarketing ads. Successful advertising today requires the right combination of targeting, creative strategy, automation, and conversion optimization.",
    approach:
      "We identify and target high-intent audiences, build and manage campaigns designed for measurable outcomes, improve landing pages and user journeys to maximize results, and continuously optimize campaigns for better performance and scalable growth.",
    deliverables: [
      'Meta, Google, YouTube & LinkedIn Ads',
      'Lead Generation Campaigns',
      'Ecommerce Advertising',
      'Remarketing Campaigns',
      'Conversion Rate & Landing Page Optimization',
      'B2B SaaS Lead Generation',
    ],
    framework: 'Research → Launch → Optimize → Scale → Grow',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'D2C Health Brand', outcome: '2.8× ROAS improvement after audit', tag: 'Health' },
      { title: 'EdTech Startup', outcome: 'CAC reduced by 42% in 60 days', tag: 'Education' },
    ],
  },
  {
    id: 'ecommerce',
    slug: 'Ecommerce',
    icon: '08',
    color: '#8b5e3c',
    tagline: 'Built to sell, not just look good.',
    headline: 'Ecommerce Solutions Built To Sell, Not Just Look Good',
    what: "Having a store online isn't enough anymore. Brands need stores that convert, ads that pay for themselves, and customers who keep coming back instead of buying once and disappearing. We combine store optimization, performance advertising, and retention marketing to help ecommerce brands grow profitably.",
    why: "Customers don't just visit your store and buy anymore. They compare prices across marketplaces, check reviews, abandon carts, and need a reason to come back before they actually convert. Winning in ecommerce today means treating your store as one connected system, not just a website waiting for traffic.",
    approach:
      "We fix what's costing you sales — from slow load times to confusing checkout flows. We run campaigns built to bring in buyers, not just clicks. We improve product pages and checkout to get more revenue from existing traffic. And we turn one-time buyers into repeat customers through email, WhatsApp, and remarketing.",
    deliverables: [
      'Shopify / WooCommerce Store Setup',
      'Product Page & Checkout Optimization',
      'Ecommerce Advertising (Meta, Google Shopping, YouTube)',
      'Marketplace Management (Amazon, Flipkart)',
      'Email & WhatsApp Retention Campaigns',
      'Remarketing & Abandoned Cart Recovery',
    ],
    framework: 'Audit → Build → Launch → Optimize → Retain',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop',
    relatedWork: [
      { title: 'Fashion D2C', outcome: '40% lift in conversion rate after optimization', tag: 'Retail' },
      { title: 'Beauty Brand', outcome: 'Repeat purchase rate up from 18% to 34%', tag: 'FMCG' },
    ],
  },
]

const ecosystemConnections: Record<string, string[]> = {
  seo:         ['content', 'ai', 'performance'],
  content:     ['seo', 'social', 'ai', 'branding'],
  influencer:  ['social', 'content', 'performance'],
  branding:    ['content', 'social', 'ai'],
  ai:          ['content', 'social', 'performance', 'ecommerce'],
  social:      ['content', 'influencer', 'performance', 'branding'],
  performance: ['seo', 'ai', 'social', 'ecommerce'],
  ecommerce:   ['performance', 'ai', 'seo'],
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

        {/* Framework */}
        <div className="mt-8 pt-6 border-t border-[#a87242]/15">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Our framework</p>
          <p
            className="text-sm sm:text-base font-semibold leading-relaxed"
            style={{ color: svc.color }}
          >
            {svc.framework}
          </p>
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
                Eight services,{' '}
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
