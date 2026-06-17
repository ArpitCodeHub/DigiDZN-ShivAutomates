import { motion } from 'framer-motion'
import Section, { Container } from '../sections/Section'

// Real DigiDZN creative work — pulled from client case studies, with a creative
// (rather than performance) framing. All images live under /public/case-studies/
// with a brand-tinted gradient fallback so the layout stays intentional even
// before the source images are dropped in.

interface CreativeItem {
  id: string
  type: string
  title: string
  desc: string
  metric: string
  color: string
  span: string
  image: string
}

const items: CreativeItem[] = [
  {
    id: 'fashion-ecommerce',
    type: 'Conversion Creative',
    title: 'Fashion E-Commerce — sales engine',
    desc:
      'Performance-led creatives and social storytelling built to drive real revenue, not vanity metrics.',
    metric: '₹57.48L+ sales generated',
    color: '#a87242',
    span: 'md:col-span-2',
    image: '/case-studies/fashion%26apparel-brand.png',
  },
  {
    id: 'fitness-wellness-growth',
    type: 'Visual Storytelling',
    title: 'Fitness & Wellness Brand',
    desc:
      'Strategic content and visual storytelling that turned a fitness brand into a recognised digital presence.',
    metric: '550K+ reach',
    color: '#c89368',
    span: '',
    image: '/case-studies/fitness%26wellness-brand.png',
  },
  {
    id: 'interior-design-authority',
    type: 'Brand Authority Content',
    title: 'Interior Design Studio',
    desc:
      'Project-led content and editorial creative that positioned a studio as a recognised industry authority.',
    metric: '208K+ impressions',
    color: '#d4a576',
    span: '',
    image: '/case-studies/interiordesign-brand.png',
  },
  {
    id: 'real-estate-leads',
    type: 'Lead Gen Creative',
    title: 'Real Estate Brand',
    desc:
      'Property-focused creatives and audience-driven messaging that turned social into a buyer-inquiry channel.',
    metric: '150+ qualified leads',
    color: '#8b5e3c',
    span: '',
    image: '/case-studies/realestate-brand.png',
  },
  {
    id: 'family-entertainment',
    type: 'Experience-Led Content',
    title: 'Family Entertainment Venue',
    desc:
      'Experience-first creative that showcased moments rather than facilities — making the venue the obvious choice for families.',
    metric: '5K+ profile visits',
    color: '#a87242',
    span: 'md:col-span-2',
    image: '/case-studies/arcade%26playzone-brand.png',
  },
]

export default function ContentCreativeSection() {
  return (
    <Section id="content-creative" className="py-20 md:py-32 bg-[#0d0a08]">
      <Container maxWidth="xl">
        {/* Header — editorial, left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-[0.25em] mb-4">
            Creative Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
            Creative that{' '}
            <span className="font-serif-italic font-normal text-[#d4a576]">earns its outcome.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/55 max-w-xl leading-relaxed">
            Every campaign below was built with a job to do — drive sales, fill a venue, generate
            qualified leads, or make a brand worth following.
          </p>
        </motion.div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`group rounded-2xl border border-[#a87242]/20 overflow-hidden cursor-pointer card-hover ${item.span} transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out`}
              style={{
                background: 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Image with brand-tinted fallback */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-[#1a120c]">
                {/* Always-on gradient base */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, #1a120c 0%, ${item.color} 130%)` }}
                />
                {/* Subtle texture for depth */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 25% 30%, rgba(255,255,255,0.07) 0%, transparent 35%), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.05) 0%, transparent 35%)',
                  }}
                />
                {/* Image (graceful fail) */}
                <img
                  src={item.image}
                  alt={`${item.type} – ${item.title}`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    img.style.display = 'none'
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Brand-tinted multiply overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-multiply opacity-25 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, #1a120c, ${item.color})` }}
                />
                {/* Bottom gradient */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(13,10,8,0.85))' }}
                />

                {/* Type pill */}
                <span
                  className="absolute top-4 left-4 inline-flex items-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full backdrop-blur-md border z-10"
                  style={{
                    background: `${item.color}30`,
                    color: '#fff',
                    borderColor: `${item.color}80`,
                  }}
                >
                  {item.type}
                </span>

                {/* Headline metric — bottom-left */}
                <p className="absolute bottom-4 left-4 right-4 text-sm sm:text-base font-semibold text-white/90 uppercase tracking-[0.18em] z-10">
                  {item.metric}
                </p>
              </div>

              <div className="p-6 md:p-7">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
