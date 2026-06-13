import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

interface TeamMember {
  name: string
  role: string
  photo: string | null
  color: string
  skills: string[]
  bio: string
}

const team: TeamMember[] = [
  // Leadership
  {
    name: 'Sangeeta Verma',
    role: 'Founder Director',
    photo: '/team_photos/Sangeeta%20Verma.jpg',
    color: '#a87242',
    skills: ['Leadership', 'Strategy', 'Operations'],
    bio: "Visionary entrepreneur and founder of DigiDZN with expertise in business strategy, operations, and growth management. Focused on building scalable processes, strengthening client relationships, and driving long-term business success.",
  },
  {
    name: 'Manish Verma',
    role: 'Co-Founder',
    photo: '/team_photos/Manish%20Verma.jpg',
    color: '#c89368',
    skills: ['Finance', 'Strategy', 'Growth'],
    bio: "With expertise in finance, business strategy, and growth planning, Manish drives DigiDZN's financial management and expansion initiatives. He focuses on developing new growth channels, optimizing business performance, and building scalable opportunities for long-term success.",
  },

  // Department Heads / Leads
  {
    name: 'Hema Batra',
    role: 'E-commerce Head — Planning & Control',
    photo: '/team_photos/Hema%20Batra.jpeg',
    color: '#d4a576',
    skills: ['E-commerce', 'Planning', 'Operations'],
    bio: "Hema leads ecommerce planning, operational control, and marketplace growth initiatives, ensuring efficient execution across channels. She focuses on strategic planning, process optimization, inventory coordination, and performance management to drive sustainable business growth.",
  },
  {
    name: 'Tarun Arora',
    role: 'Accounts Head',
    photo: '/team_photos/tarun.jpg',
    color: '#8b5e3c',
    skills: ['Finance', 'Compliance', 'Audits'],
    bio: "Leads accounting operations with a focus on financial integrity, compliance, and process excellence. Experienced in managing teams, audits, and financial controls.",
  },
  {
    name: 'Jatin Sharma',
    role: 'Revenue & Optimisation Lead',
    photo: '/team_photos/Jatin.jpeg',
    color: '#a87242',
    skills: ['Revenue', 'Optimisation', 'Growth'],
    bio: "Focused on scaling businesses through profitable growth and revenue optimization. Continuously improves performance, efficiency, and commercial outcomes.",
  },
  {
    name: 'Rupali Das',
    role: 'Team Lead, Social Media & Content',
    photo: '/team_photos/RUPALI%20DAS.jpg',
    color: '#c89368',
    skills: ['Social', 'Strategy', 'Team Lead'],
    bio: "Rupali leads social media strategy, content planning, and campaign execution while managing a team of creatives and content specialists. She works closely with clients and internal teams to develop impactful brand narratives, ensure seamless project delivery, and drive meaningful audience engagement across digital platforms.",
  },

  // Account / Client Management
  {
    name: 'Sunita Tenia',
    role: 'Digital Marketing Administrator',
    photo: '/team_photos/Sunita%20Tenia.jpeg',
    color: '#d4a576',
    skills: ['Coordination', 'Delivery', 'Campaigns'],
    bio: "A highly organized digital marketing professional who manages project deliverables, campaign execution, and cross-functional team coordination. She works closely with clients and internal teams to ensure seamless communication, timely delivery, and successful marketing outcomes.",
  },
  {
    name: 'Jasmeen Kaur',
    role: 'CRM & Client Relationship Manager',
    photo: '/team_photos/Jasmeen%20Kaur.jpeg',
    color: '#8b5e3c',
    skills: ['CRM', 'Client Mgmt', 'Conversion'],
    bio: "Jasmeen specializes in lead management, client communication, and conversion optimization through effective CRM processes. She ensures every inquiry is nurtured through the sales funnel, building strong relationships that drive customer acquisition and business growth.",
  },
  {
    name: 'Yogesh Arya',
    role: 'Sourcing & New Channels Specialist',
    photo: '/team_photos/Yogesh.jpeg',
    color: '#a87242',
    skills: ['Sourcing', 'Marketplaces', 'Launch'],
    bio: "Specializes in launching products across marketplaces and creating market-ready offerings. Combines creativity and execution to deliver successful product launches.",
  },
  {
    name: 'Kartik Rohilla',
    role: 'HR Executive',
    photo: '/team_photos/Kartik%20Rohilla.jpg',
    color: '#c89368',
    skills: ['Talent', 'Engagement', 'Culture'],
    bio: "Dedicated HR professional focused on talent acquisition, employee engagement, and organizational development. Works to create a positive workplace culture while supporting business and team growth.",
  },

  // Marketing / SEO / Strategy
  {
    name: 'Dhruv Daksh',
    role: 'Performance Marketer',
    photo: '/team_photos/Dhruv%20Daksh.jpg',
    color: '#d4a576',
    skills: ['Performance', 'CRO', 'Targeting'],
    bio: "Results-driven marketer focused on performance campaigns, conversion optimization, and audience targeting. Creates data-backed strategies that maximize ROI and business growth.",
  },
  {
    name: 'Divyanshu Desai',
    role: 'Performance Marketer',
    photo: '/team_photos/Divyanshu%20Desai.png',
    color: '#8b5e3c',
    skills: ['Paid Ads', 'Targeting', 'CRO'],
    bio: "Performance-driven marketer specializing in paid advertising, audience targeting, and conversion optimization. Creates data-backed campaigns that maximize ROI and generate measurable business growth.",
  },
  {
    name: 'Sohan',
    role: 'SEO Expert',
    photo: '/team_photos/Sohan%20Singh.jpeg',
    color: '#a87242',
    skills: ['SEO', 'Technical', 'Strategy'],
    bio: "Specializes in SEO strategies that improve rankings, organic traffic, and online visibility. Delivers sustainable growth through technical SEO and content optimization.",
  },
  {
    name: 'Aastha',
    role: 'Social Media & Content Strategist',
    photo: null,
    color: '#c89368',
    skills: ['Strategy', 'Content', 'SEO'],
    bio: "Develops content strategies aligned with business goals and audience needs. Combines strategic planning with SEO best practices to drive visibility and growth.",
  },
  {
    name: 'Jai',
    role: 'Content Strategist & Visual Designer',
    photo: '/team_photos/Jai.png',
    color: '#d4a576',
    skills: ['Content', 'Visual', 'Storytelling'],
    bio: "Blends strategic storytelling with impactful visual design to help brands grow. Creates engaging content and creative experiences that strengthen brand identity.",
  },
  {
    name: 'Suzzane',
    role: 'Social Media & Content Strategist',
    photo: '/team_photos/Suzzane.jpg',
    color: '#8b5e3c',
    skills: ['Social', 'Content', 'Community'],
    bio: "Passionate about creating engaging content and managing social media platforms to strengthen brand presence. Focuses on audience engagement, content execution, and building meaningful digital communities.",
  },

  // Creative / Design / Video
  {
    name: 'Akash Rathore',
    role: 'Graphic Designer',
    photo: '/team_photos/Akash%20Singh%20rathore.webp',
    color: '#a87242',
    skills: ['Design', 'Branding', 'Visual'],
    bio: "Creative designer skilled at transforming ideas into visually impactful designs. Creates compelling brand visuals that capture attention and communicate effectively.",
  },
  {
    name: 'Davinder Singh',
    role: 'Graphic Designer & Video Editor',
    photo: '/team_photos/Davinder.jpeg',
    color: '#c89368',
    skills: ['Design', 'Video', 'Motion'],
    bio: "Specializes in branding, social media creatives, motion graphics, and video editing. Creates visually engaging content that strengthens brand communication and engagement.",
  },
  {
    name: 'Gunnit Singh',
    role: 'Graphic Designer, Video Editor & AI Creative Specialist',
    photo: '/team_photos/Gunnit%20Singh.jpeg',
    color: '#d4a576',
    skills: ['Design', 'Video', 'AI'],
    bio: "Combines creativity with AI-powered tools to produce impactful visual and video content. Delivers innovative branding and content solutions for modern businesses.",
  },
  {
    name: 'Goutam Dagar',
    role: 'Graphic Designer & Video Editor',
    photo: '/team_photos/Goutam%20Dagar.jpg',
    color: '#8b5e3c',
    skills: ['Design', 'Video', 'Branding'],
    bio: "Passionate about creating eye-catching designs and engaging videos that help brands communicate effectively. Focused on delivering creative content with lasting impact.",
  },
  {
    name: 'Abhay Bhardwaj',
    role: 'Video Producer',
    photo: null,
    color: '#a87242',
    skills: ['Video', 'Direction', 'Production'],
    bio: "Experienced in bringing concepts to life through creative planning, production, and execution. Produces engaging visual content that connects with audiences and delivers results.",
  },
  {
    name: 'Siddharth',
    role: 'Video Editor & Motion Designer',
    photo: '/team_photos/Sid.png',
    color: '#c89368',
    skills: ['Video', 'Motion', 'Direction'],
    bio: "Creates engaging visual narratives through professional video editing and motion graphics. Delivers high-quality content that enhances brand storytelling.",
  },

  // Tech / Data
  {
    name: 'Ajay',
    role: 'Website Developer',
    photo: '/team_photos/Ajay.jpeg',
    color: '#d4a576',
    skills: ['Development', 'Web', 'UX'],
    bio: "Solution-oriented website developer with strong technical expertise and adaptability. Builds efficient, user-friendly digital experiences that support business goals.",
  },
  {
    name: 'Tushar Sunaria',
    role: 'Data Analyst Intern',
    photo: '/team_photos/Tushar%20Sunaria.JPG',
    color: '#8b5e3c',
    skills: ['Analytics', 'Dashboards', 'Reporting'],
    bio: "Passionate about transforming raw data into actionable business insights. Specializes in reporting, dashboards, trend analysis, and data-driven decision-making.",
  },

  // E-commerce / Operations
  {
    name: 'Vivek Gupta',
    role: 'E-commerce Executive',
    photo: '/team_photos/Vivek.jpeg',
    color: '#a87242',
    skills: ['Operations', 'Inventory', 'Logistics'],
    bio: "Experienced in operations, inventory coordination, and logistics management. Dedicated to streamlining workflows and ensuring smooth business operations.",
  },
  {
    name: 'Monika',
    role: 'E-commerce Executive',
    photo: '/team_photos/Monika.png',
    color: '#c89368',
    skills: ['Marketplace', 'Catalog', 'Listings'],
    bio: "Skilled in marketplace management, catalog optimization, distributor coordination, and social media support. Focused on improving visibility and customer satisfaction.",
  },
  {
    name: 'Harsh',
    role: 'E-commerce Operations Executive',
    photo: '/team_photos/Harsh.jpg',
    color: '#d4a576',
    skills: ['Operations', 'Catalog', 'Fulfilment'],
    bio: "Responsible for managing ecommerce marketplace operations, catalog updates, inventory tracking, and order fulfillment. Harsh works to improve operational efficiency, maintain listing accuracy, and support overall business growth across online channels.",
  },

  // Accounting
  {
    name: 'Rishabh Gupta',
    role: 'Assistant Accountant',
    photo: '/team_photos/Rishabh.jpg',
    color: '#8b5e3c',
    skills: ['Accounting', 'Reconciliation', 'Reporting'],
    bio: "Handles daily accounting operations, reconciliations, invoicing, and financial records. Supports accurate reporting and smooth financial processes.",
  },
  {
    name: 'Dhruv Khurana',
    role: 'Junior Accountant',
    photo: '/team_photos/Dhruv%20Khurana.jpg',
    color: '#a87242',
    skills: ['Accounting', 'TallyPrime', 'ACCA'],
    bio: "Aspiring accounting professional with knowledge of financial record-keeping and accounting practices. Dedicated to continuous learning and professional growth.",
  },

  // Customer
  {
    name: 'Laxmi',
    role: 'Customer Care Executive',
    photo: '/team_photos/Laxmi.jpeg',
    color: '#c89368',
    skills: ['Customer Care', 'Support', 'Communication'],
    bio: "Dedicated customer care executive focused on delivering responsive support and resolving client queries. Works to ensure positive customer experiences and long-lasting relationships.",
  },
]

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export default function TeamSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <Section id="team" className="py-20 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">The Team</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]">
            The people <span className="font-serif-italic font-normal text-[#d4a576]">behind</span><br />your growth
          </h2>
        </motion.div>

        {/* Grid — fixed aspect ratio cards for size consistency */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 12) * 0.04 }}
              viewport={{ once: true, amount: 0 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              className="relative rounded-2xl border border-[#a87242]/20 card-hover overflow-hidden cursor-default group transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderColor: hovered === i ? `${member.color}50` : undefined,
                boxShadow: hovered === i ? `0 0 28px ${member.color}25` : undefined,
              }}
            >
              {/* Photo / placeholder — fixed aspect ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a120c]">
                {/* Brand-coloured fallback gradient (always present) */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, #1a120c 0%, ${member.color} 130%)` }}
                />

                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`${member.name} — ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  // No-photo placeholder: large initials monogram on brand gradient
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-black text-white/20 select-none"
                      style={{ fontSize: 'clamp(56px, 7vw, 96px)', letterSpacing: '-0.04em' }}
                    >
                      {initialsOf(member.name)}
                    </span>
                  </div>
                )}

                {/* Subtle warm tint on top of photo */}
                {member.photo && (
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-multiply opacity-25 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, #1a120c, ${member.color})` }}
                  />
                )}

                {/* Bottom gradient for name readability */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(10,8,7,0.95))' }}
                />

                {/* Name + role overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10">
                  <div className="w-6 h-0.5 mb-2 rounded-full" style={{ background: member.color }} />
                  <h3 className="font-black text-white text-xs sm:text-sm leading-tight uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/60 mt-0.5 leading-tight">{member.role}</p>
                </div>

                {/* Hover bio overlay */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-4 overflow-y-auto"
                      style={{
                        background: `linear-gradient(180deg, ${member.color}40 0%, ${member.color}f2 100%)`,
                        backdropFilter: 'blur(2px)',
                        WebkitBackdropFilter: 'blur(2px)',
                      }}
                    >
                      <div className="w-6 h-0.5 mb-2 rounded-full bg-white/80" />
                      <h3 className="font-black text-white text-xs sm:text-sm leading-tight uppercase tracking-wide mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/85 mb-2 leading-tight">{member.role}</p>
                      <p className="text-[10px] sm:text-xs text-white leading-snug mb-3 line-clamp-6">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map(s => (
                          <span
                            key={s}
                            className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-white/15 text-white border border-white/25"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team count footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm text-white/30 mt-10 md:mt-12 tracking-widest uppercase"
        >
          {team.length}+ specialists, one unified team
        </motion.p>
      </Container>
    </Section>
  )
}
