import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

const team = [
  { name: 'Alex Rivera',  role: 'Strategy Director',           initials: 'AR', color: '#a87242', bio: 'Leads strategic initiatives with 12+ years of digital marketing expertise. Turns data into growth strategies.', skills: ['Strategy','Analytics','Growth'] },
  { name: 'Sam Chang',    role: 'Technical Lead',              initials: 'SC', color: '#c89368', bio: 'Full-stack expert overseeing technical implementations. Passionate about clean, scalable architecture.', skills: ['Dev','Architecture','Cloud'] },
  { name: 'Jordan Lee',   role: 'Content Strategist',          initials: 'JL', color: '#d4a576', bio: 'Crafts compelling narratives that convert. Expert in content marketing, copywriting, and SEO storytelling.', skills: ['Content','SEO','Creative'] },
  { name: 'Morgan Davis', role: 'Creative Director',           initials: 'MD', color: '#8b5e3c', bio: 'Brings visual excellence to every project. Ensures your brand stands out with precision design.', skills: ['Design','Branding','UX'] },
  { name: 'Casey Thompson','role': 'Analytics Specialist',     initials: 'CT', color: '#a87242', bio: 'Transforms raw data into strategic insights. Obsessed with metrics and proving marketing ROI.', skills: ['Analytics','Data','Reporting'] },
  { name: 'Riley Martinez', role: 'Account Manager',           initials: 'RM', color: '#c89368', bio: 'Your dedicated partner ensuring seamless communication and exceptional service delivery.', skills: ['Account Mgmt','CX','Projects'] },
  { name: 'Taylor Kim',   role: 'SEO Specialist',              initials: 'TK', color: '#d4a576', bio: 'Gets your brand visible where it matters. Expert in technical SEO and organic growth strategy.', skills: ['SEO','Technical','Links'] },
  { name: 'Jamie Chen',   role: 'Performance Marketing Lead',  initials: 'JC', color: '#5a3a22', bio: 'Maximises marketing ROI through data-driven paid advertising strategies at scale.', skills: ['Paid Ads','PPC','CRO'] },
]

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

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-2xl border border-[#a87242]/20 card-hover p-6 overflow-hidden cursor-default transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderColor: hovered === i ? `${member.color}40` : undefined,
                boxShadow: hovered === i ? `0 0 24px ${member.color}18` : undefined,
              }}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold mb-4"
                style={{ background: `${member.color}20`, color: member.color }}
              >
                {member.initials}
              </div>

              <h3 className="font-bold text-white text-sm leading-tight">{member.name}</h3>
              <p className="text-xs text-white/40 mt-1 mb-4">{member.role}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${member.color}15`, color: member.color }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Hover bio */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-end"
                    style={{ background: `linear-gradient(to top, ${member.color}ee 0%, ${member.color}99 100%)` }}
                  >
                    <p className="text-white/90 text-xs leading-relaxed">{member.bio}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
