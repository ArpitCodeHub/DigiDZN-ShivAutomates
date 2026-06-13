import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Section, { Container } from '../sections/Section'
import thumbnails from '../data/blog-thumbnails'

// ─── Blog data — extracted from public/blog-links/digiDZN Blog links.pdf ─────

interface BlogPost {
  url: string
  title: string
  category: BlogCategory
}

type BlogCategory = 'SEO' | 'Performance' | 'Social' | 'AI' | 'Content' | 'Strategy' | 'Branding' | 'Industry'

const slugToTitle = (slug: string): string => {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bSeo\b/g, 'SEO')
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bPpc\b/g, 'PPC')
    .replace(/\bRoi\b/g, 'ROI')
    .replace(/\bCpa\b/g, 'CPA')
    .replace(/\bUrl\b/g, 'URL')
    .replace(/\bB2b\b/g, 'B2B')
    .replace(/\bB2c\b/g, 'B2C')
    .replace(/\bD2c\b/g, 'D2C')
    .replace(/\bGa4\b/g, 'GA4')
    .replace(/\bCro\b/g, 'CRO')
    .replace(/\bSerp\b/g, 'SERP')
    .replace(' S ', "'s ")
    .replace(' Re ', "'re ")
    .replace(' Ll ', "'ll ")
    .replace(' T ', "'t ")
    .replace(' Isn ', " Isn'")
    .replace(/\s+/g, ' ')
    .trim()
}

const categoriseSlug = (slug: string): BlogCategory => {
  const s = slug.toLowerCase()
  if (s.includes('ai-') || s.includes('artificial')) return 'AI'
  if (s.includes('seo') || s.includes('keyword') || s.includes('rank') || s.includes('serp') || s.includes('search-') || s.includes('voice-search') || s.includes('google-my-business') || s.includes('image-seo') || s.includes('wordpress-seo') || s.includes('image-optimization')) return 'SEO'
  if (s.includes('ppc') || s.includes('google-ads') || s.includes('facebook-ad') || s.includes('retargeting') || s.includes('cpa') || s.includes('conversion') || s.includes('amazon-advertising') || s.includes('amazon-s-game') || s.includes('cost-per') || s.includes('paid-ads') || s.includes('performance-marketing') || s.includes('ad-impressions') || s.includes('ad-formats') || s.includes('low-cost-digital-campaigns') || s.includes('ad-budget')) return 'Performance'
  if (s.includes('social-media') || s.includes('instagram') || s.includes('influencer') || s.includes('how-often-to-post')) return 'Social'
  if (s.includes('content-marketing') || s.includes('content-strateg') || s.includes('video-') || s.includes('-content') || s.includes('storytelling') || s.includes('story-curve') || s.includes('podcast') || s.includes('email-marketing') || s.includes('landing-pages')) return 'Content'
  if (s.includes('brand') || s.includes('rebranding') || s.includes('tone-of-voice') || s.includes('nostalgia')) return 'Branding'
  if (s.includes('appliance') || s.includes('trutrtl') || s.includes('real-estate') || s.includes('startup') || s.includes('small-business') || s.includes('e-commerce') || s.includes('ecommerce') || s.includes('mobile-app') || s.includes('home-appliance') || s.includes('kitchen')) return 'Industry'
  return 'Strategy'
}

const blogUrls = [
  'https://digidzn.com/blog-view/best-digital-marketing-agency-in-delhi-complete-guide',
  'https://digidzn.com/blog-view/exploring-digital-marketing-services-for-small-business-paid-ads-performance-marketing-and-more',
  'https://digidzn.com/blog-view/beginner-s-guide-to-email-marketing-automation-for-small-businesses',
  'https://digidzn.com/blog-view/boost-your-business-with-these-local-seo-tactics-for-2025',
  'https://digidzn.com/blog-view/the-shocking-truth-about-social-media-algorithms-in-2025',
  'https://digidzn.com/blog-view/why-your-website-load-speed-is-killing-your-seo-and-how-to-fix-it-fast',
  'https://digidzn.com/blog-view/top-10-high-converting-facebook-ad-formats-you-re-not-using-yet',
  'https://digidzn.com/blog-view/5-minute-growth-hacks-every-startup-should-know-in-2025',
  'https://digidzn.com/blog-view/7-digital-marketing-mistakes-you-re-still-making-in-2025-and-how-to-fix-them',
  'https://digidzn.com/blog-view/the-future-of-marketing-is-ai-taking-over-human-creativity',
  'https://digidzn.com/blog-view/retargeting-ads-101-why-customers-keep-seeing-your-ads-and-how-to-use-it-smartly',
  'https://digidzn.com/blog-view/seo-for-voice-search-how-to-get-found-on-alexa-and-google-assistant',
  'https://digidzn.com/blog-view/how-to-use-google-analytics-4-to-skyrocket-your-campaign-roi',
  'https://digidzn.com/blog-view/how-micro-influencers-are-winning-the-marketing-game-in-2025',
  'https://digidzn.com/blog-view/stop-wasting-ad-budget-the-best-low-cost-digital-campaigns-that-convert',
  'https://digidzn.com/blog-view/7-reasons-why-your-digital-marketing-strategy-isn-t-working-and-how-to-fix-it',
  'https://digidzn.com/blog-view/the-power-of-website-development-in-driving-appliance-sales',
  'https://digidzn.com/blog-view/ppc-marketing-for-kitchen-appliances-is-it-worth-the-investment',
  'https://digidzn.com/blog-view/google-ads-vs-social-media-ads-what-works-best-for-home-appliance-brands',
  'https://digidzn.com/blog-view/how-social-media-ads-helped-trutrtl-boost-sales-brand-awareness',
  'https://digidzn.com/blog-view/how-google-ads-helped-trutrtl-boost-sales-visibility',
  'https://digidzn.com/blog-view/how-technical-seo-helped-trutrtl-rank-higher-on-google-serp',
  'https://digidzn.com/blog-view/how-digidzn-helped-trutrtl-rank-higher-on-google-and-drive-traffic',
  'https://digidzn.com/blog-view/10-reasons-why-no-one-is-watching-your-video-content',
  'https://digidzn.com/blog-view/how-b2c-companies-leverage-ai-marketing-examples-tips',
  'https://digidzn.com/blog-view/11-best-ai-video-generators-to-use-in-2025',
  'https://digidzn.com/blog-view/seo-for-startups-how-startups-can-unlock-growth-with-seo',
  'https://digidzn.com/blog-view/navigating-the-future-of-seo-5-tips-from-digidzn',
  'https://digidzn.com/blog-view/ai-predictions-that-could-impact-marketers-in-2025-trending-data-expert-insights',
  'https://digidzn.com/blog-view/guide-to-creating-optimizing-high-converting-landing-pages',
  'https://digidzn.com/blog-view/improve-mobile-app-reviews-ratings',
  'https://digidzn.com/blog-view/revolutionizing-retail-media-amazon-s-game-changing-ad-service',
  'https://digidzn.com/blog-view/how-marketers-are-spending-their-money-in-2025',
  'https://digidzn.com/blog-view/maximizing-social-media-marketing-to-promote-kitchen-appliances',
  'https://digidzn.com/blog-view/the-power-of-ppc-campaigns-for-boosting-sales-of-home-appliances-in-india',
  'https://digidzn.com/blog-view/how-digital-campaigns-can-boil-success-for-home-appliance-brands',
  'https://digidzn.com/blog-view/why-digital-marketing-is-the-perfect-ingredient-for-home-appliance-brands',
  'https://digidzn.com/blog-view/how-seo-can-boost-e-commerce-sales-for-kitchen-appliances-brands',
  'https://digidzn.com/blog-view/how-digital-marketing-is-changing-the-home-appliance-industry',
  'https://digidzn.com/blog-view/personality-content-strategies-for-creating-ai-proof-content',
  'https://digidzn.com/blog-view/15-real-estate-social-media-marketing-strategies-that-ll-bring-in-new-business',
  'https://digidzn.com/blog-view/understanding-keyword-match-types-for-effective-google-ads-campaigns',
  'https://digidzn.com/blog-view/what-is-search-intent',
  'https://digidzn.com/blog-view/a-complete-guide-to-outbound-marketing',
  'https://digidzn.com/blog-view/image-seo-tips-for-image-optimization',
  'https://digidzn.com/blog-view/creating-a-multichannel-marketing-strategy',
  'https://digidzn.com/blog-view/maximizing-ppc-success-for-small-businesses',
  'https://digidzn.com/blog-view/crafting-a-local-content-marketing-strategy',
  'https://digidzn.com/blog-view/wordpress-seo-guide-boost-your-site-s-visibility',
  'https://digidzn.com/blog-view/how-marketers-are-spending-their-money-in-2025-we-asked-11-093-marketers',
  'https://digidzn.com/blog-view/the-story-curve-transform-your-marketing-with-the-power-of-storytelling',
  'https://digidzn.com/blog-view/how-to-start-using-video-in-your-marketing',
  'https://digidzn.com/blog-view/ai-conversion-rate-optimization-what-are-the-benefits-how-to-use-it-in-your-business',
  'https://digidzn.com/blog-view/getting-b2b-ecommerce-right-strategies-for-success',
  'https://digidzn.com/blog-view/maximizing-cost-per-acquisition-cpa-here-s-what-we-have-to-say',
  'https://digidzn.com/blog-view/what-is-d2c-marketing-here-are-11-tips-we-found-for-doing-it-right',
  'https://digidzn.com/blog-view/why-an-event-marketing-budget-is-crucial',
  'https://digidzn.com/blog-view/6-of-the-best-video-formats-for-2025',
  'https://digidzn.com/blog-view/we-used-ai-to-create-a-marketing-plan-2-ways-here-s-how-you-can-too',
  'https://digidzn.com/blog-view/9-best-ai-marketing-bots-to-use-at-work-in-2024',
  'https://digidzn.com/blog-view/how-to-generate-video-scripts-with-ai',
  'https://digidzn.com/blog-view/how-often-to-post-on-social-media-for-business',
  'https://digidzn.com/blog-view/how-to-create-a-complete-marketing-strategy-in-2025',
  'https://digidzn.com/blog-view/5-marketing-strategies-polymarket-is-using-to-be-everywhere-at-once',
  'https://digidzn.com/blog-view/what-is-rebranding-best-examples-strategies-to-consider-for-2025',
  'https://digidzn.com/blog-view/does-instagram-shopping-drive-roi-new-data-on-how-to-get-approved-add-product-tags-actually-make-sales',
  'https://digidzn.com/blog-view/level-up-your-content-marketing-funnel-here-s-how-digidzn-makes-the-right-content-for-each-stage',
  'https://digidzn.com/blog-view/5-ways-that-ai-analytics-tools-can-make-you-a-better-marketer',
  'https://digidzn.com/blog-view/21-creative-lead-generation-ideas-to-try-why-marketers-recommend-them',
  'https://digidzn.com/blog-view/the-ultimate-guide-to-advertising-in-2025',
  'https://digidzn.com/blog-view/google-my-business-guide-complete-overview-expert-tips-for-2025',
  'https://digidzn.com/blog-view/top-6-video-marketing-metrics',
  'https://digidzn.com/blog-view/how-pillar-pages-will-help-your-search-engine-rankings',
  'https://digidzn.com/blog-view/nostalgia-marketing-how-it-works',
  'https://digidzn.com/blog-view/get-even-more-keyword-ideas-and-data-from-ubersuggest-and-answer-the-public',
  'https://digidzn.com/blog-view/develop-your-brand-s-tone-of-voice',
  'https://digidzn.com/blog-view/what-are-brand-identity-elements',
  'https://digidzn.com/blog-view/my-comprehensive-guide-to-micro-influencer-marketing',
  'https://digidzn.com/blog-view/data-driven-insights-into-email-marketing-open-rates',
  'https://digidzn.com/blog-view/b2b-influencer-marketing-partnering-with-industry-leaders',
  'https://digidzn.com/blog-view/the-keys-to-success-with-amazon-advertising',
  'https://digidzn.com/blog-view/you-re-wasting-your-time-creating-social-media-content',
  'https://digidzn.com/blog-view/url-slugs-why-they-matter-for-seo',
  'https://digidzn.com/blog-view/understanding-ad-impressions',
  'https://digidzn.com/blog-view/decoding-podcast-success-top-analytics-tools-for-podcasters',
  'https://digidzn.com/blog-view/how-to-do-keyword-research-for-youtube-for-results',
  'https://digidzn.com/blog-view/search-engine-positioning-what-is-it-how-to-improve-it',
  'https://digidzn.com/blog-view/ai-conversion-rate-optimization-how-ai-is-transforming-cro-strategies',
]

const blogs: BlogPost[] = blogUrls.map(url => {
  const slug = url.split('/').pop() ?? ''
  return {
    url,
    title: slugToTitle(slug),
    category: categoriseSlug(slug),
  }
})

const categoryColors: Record<BlogCategory, string> = {
  SEO:         '#a87242',
  Performance: '#c89368',
  Social:      '#d4a576',
  AI:          '#8b5e3c',
  Content:     '#a87242',
  Strategy:    '#c89368',
  Branding:    '#d4a576',
  Industry:    '#8b5e3c',
}

const allCategories: ('All' | BlogCategory)[] = [
  'All', 'SEO', 'Performance', 'Social', 'AI', 'Content', 'Strategy', 'Branding', 'Industry',
]

// Local thumbnail lookup. If a slug has no entry, the card falls back
// to a brand-coloured gradient placeholder.
const localThumbnail = (url: string): string | null => {
  const slug = url.split('/').pop() ?? ''
  const filename = thumbnails[slug]
  return filename ? `/blog-thumbnails/${filename}` : null
}

// ─── Card component ──────────────────────────────────────────────────────────

function BlogCard({ blog, index, featured = false }: { blog: BlogPost; index: number; featured?: boolean }) {
  const color = categoryColors[blog.category]
  const thumb = localThumbnail(blog.url)

  return (
    <motion.a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: (index % 9) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.1 }}
      className={`relative rounded-2xl border border-[#a87242]/20 card-hover overflow-hidden block group transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Image area — local thumbnail when available, brand gradient placeholder otherwise */}
      <div className={`relative overflow-hidden bg-[#1a120c] ${featured ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
        {/* Brand-coloured fallback gradient (always present, sits below image) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #1a120c 0%, ${color} 120%)`,
          }}
        />
        {/* Subtle texture pattern on the gradient (only visible when no image) */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0%, transparent 35%)',
          }}
        />
        {/* If a local thumbnail exists, render it on top of the gradient */}
        {thumb && (
          <img
            src={thumb}
            alt={blog.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              img.style.display = 'none'
            }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        {/* Subtle warm tint on top of image */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply opacity-25 pointer-events-none"
          style={{ background: `linear-gradient(135deg, #1a120c, ${color})` }}
        />
        {/* Bottom gradient for category badge readability */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(10,8,7,0.85))' }}
        />

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md border z-10"
          style={{
            background: `${color}30`,
            color: '#fff',
            borderColor: `${color}80`,
          }}
        >
          {blog.category}
        </span>

        {/* Title overlay for cards without a thumbnail (helps placeholder feel intentional) */}
        {!thumb && (
          <div className="absolute inset-0 flex items-end p-5 z-10 pointer-events-none">
            <span
              className="font-black text-white/85 leading-tight uppercase tracking-wide line-clamp-3"
              style={{ fontSize: featured ? '1.4rem' : '1rem' }}
            >
              {blog.title}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`relative ${featured ? 'p-7 md:p-9' : 'p-5 sm:p-6'}`}>
        {/* Colour accent bar */}
        <div
          className="w-6 h-0.5 mb-3 rounded-full"
          style={{ background: color }}
        />
        <h3
          className={`font-bold text-white leading-[1.2] mb-3 group-hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out ${
            featured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg'
          }`}
        >
          {blog.title}
        </h3>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#a87242]/15">
          <span className="text-xs text-white/40 font-medium tracking-wide uppercase">
            DigiDZN Insights
          </span>
          <span
            className="text-xs font-semibold flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ color }}
          >
            Read article
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </motion.a>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

interface BlogsPageProps {
  onBookCall: () => void
}

export default function BlogsPage({ onBookCall }: BlogsPageProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | BlogCategory>('All')

  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'All') return blogs
    return blogs.filter(b => b.category === activeCategory)
  }, [activeCategory])

  const featured = filteredBlogs[0]
  const rest = filteredBlogs.slice(1)

  return (
    <div className="w-full bg-[#0a0807] overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70svh] flex flex-col justify-center overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(168,114,66,0.25) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <Container maxWidth="xl" className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-8 md:mb-10"
          >
            Insights
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-bold text-white leading-[0.95] tracking-tight mb-8 md:mb-10"
            style={{ fontSize: 'clamp(44px, 9vw, 110px)', letterSpacing: '-0.03em' }}
          >
            Ideas that{' '}
            <span className="font-serif-italic font-normal" style={{ color: '#d4a576' }}>
              compound
            </span>
            <br />
            into{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a87242, #d4a576)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              growth.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed"
          >
            Tactical playbooks, market trends, and case studies — written by the team building the systems behind today's fastest-growing brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3 mt-10 md:mt-14"
          >
            <span className="text-xs text-white/30 uppercase tracking-widest font-semibold mr-2">
              {filteredBlogs.length} articles
            </span>
            <span className="text-white/15">·</span>
            <span className="text-xs text-white/30 uppercase tracking-widest font-semibold">
              Updated weekly
            </span>
          </motion.div>
        </Container>
      </section>

      {/* ── Category filter ───────────────────────────────────────────────── */}
      <Section id="blogs-filter" className="py-6 md:py-8 bg-[#0d0a08] border-y border-[#a87242]/15">
        <Container maxWidth="xl">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {allCategories.map(cat => {
              const isActive = activeCategory === cat
              const color = cat === 'All' ? '#d4a576' : categoryColors[cat as BlogCategory]
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ease-out border"
                  style={{
                    background: isActive ? `${color}20` : 'transparent',
                    borderColor: isActive ? `${color}60` : 'rgba(168,114,66,0.15)',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ── Blog grid ─────────────────────────────────────────────────────── */}
      <Section id="blogs-grid" className="py-16 md:py-24 bg-[#0a0807]">
        <Container maxWidth="xl">
          {filteredBlogs.length === 0 ? (
            <p className="text-center text-white/40 py-20">No articles in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Featured (only on the All view) */}
              {activeCategory === 'All' && featured && (
                <BlogCard blog={featured} index={0} featured />
              )}
              {(activeCategory === 'All' ? rest : filteredBlogs).map((blog, i) => (
                <BlogCard key={blog.url} blog={blog} index={i + 1} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#0a0807] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(168,114,66,0.28), transparent 70%)',
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
            <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-5">
              From insight to impact
            </p>
            <h2
              className="font-bold text-white leading-[0.95] tracking-tight mb-7"
              style={{ fontSize: 'clamp(36px, 7vw, 80px)', letterSpacing: '-0.03em' }}
            >
              Ready to put these{' '}
              <span className="font-serif-italic font-normal" style={{ color: '#d4a576' }}>
                ideas
              </span>{' '}
              to work?
            </h2>
            <p className="text-base sm:text-lg text-white/55 max-w-xl mx-auto mb-10 leading-relaxed">
              Reading is great. Executing is what moves the needle. Let's talk about your goals.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onBookCall}
              className="px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #a87242, #c89368)' }}
            >
              Book Strategy Call →
            </motion.button>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
