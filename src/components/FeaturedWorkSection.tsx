import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { Container } from '../sections/Section'

export interface Project {
  id: number
  title: string
  tag: string
  clientContext: string
  challenge: string
  approach: string
  result: string
  metric: string
  metricLabel: string
  color: string
  image: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform Growth',
    tag: 'SEO + GEO',
    clientContext: 'Fast-growing online retailer struggling with visibility',
    challenge: 'Low organic search visibility and lack of local market penetration',
    approach: 'Comprehensive SEO strategy combined with targeted local GEO marketing and content optimization',
    result: '+250% organic traffic in 6 months',
    metric: '250%', metricLabel: 'Traffic increase',
    color: '#a87242',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'B2B SaaS Lead Generation',
    tag: 'Content + Paid',
    clientContext: 'Enterprise software company expanding market reach',
    challenge: 'Limited brand awareness and ineffective lead capture',
    approach: 'Integrated content marketing, targeted paid campaigns, and conversion funnel optimization',
    result: '+180% qualified leads, 3.2x ROI',
    metric: '3.2×', metricLabel: 'Marketing ROI',
    color: '#c89368',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Local Service Expansion',
    tag: 'Local SEO',
    clientContext: 'Home services company operating in multiple markets',
    challenge: 'Inconsistent performance across locations, poor local rankings',
    approach: 'Multi-location SEO strategy with hyper-local GEO targeting and reputation management',
    result: '+340% service inquiries from local search',
    metric: '340%', metricLabel: 'Local inquiries',
    color: '#d4a576',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Brand Repositioning Campaign',
    tag: 'Branding',
    clientContext: 'Established brand undergoing strategic pivot',
    challenge: 'Need to communicate new positioning without alienating existing customers',
    approach: 'Creative storytelling campaign and integrated marketing communications',
    result: '+45% brand awareness increase',
    metric: '45%', metricLabel: 'Brand awareness',
    color: '#8b5e3c',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80&auto=format&fit=crop',
  },
]

function ProjectCard({ project, onClick }: { project: Project; onClick: (p: Project) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      
      onClick={() => onClick(project)}
      className="rounded-2xl border border-[#a87242]/20 card-hover overflow-hidden group relative cursor-pointer transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out"
      style={{ background: 'rgba(26,18,12,0.45)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      {/* Image header */}
      <div className="relative h-52 overflow-hidden bg-[#1a120c]">
        <img
          src={project.image}
          alt={`${project.title} – ${project.tag}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Warm tint blend */}
        <div className="absolute inset-0 mix-blend-multiply opacity-40"
          style={{ background: `linear-gradient(135deg, #1a120c 0%, ${project.color} 120%)` }} />
        {/* Bottom fade for tag readability */}
        <div className="absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(10,8,7,0.85))' }} />

        {/* Tag pinned on image */}
        <span
          className="absolute top-4 left-4 inline-block text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
          style={{ background: `${project.color}40`, color: '#fff', border: `1px solid ${project.color}80` }}
        >
          {project.tag}
        </span>
      </div>

      <div className="p-7">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d4a576] transition-[color,border-color,background-color,opacity] duration-200 ease-out">
          {project.title}
        </h3>

        <p className="text-sm text-white/50 leading-relaxed mb-7">
          {project.clientContext}
        </p>

        {/* Metric */}
        <div className="flex items-end gap-3 pt-5 border-t border-[#a87242]/20">
          <span className="text-4xl font-bold" style={{ color: project.color }}>
            {project.metric}
          </span>
          <span className="text-sm text-white/40 mb-1">{project.metricLabel}</span>
          <span className="ml-auto text-white/30 group-hover:text-[#c89368] transition-[color,border-color,background-color,opacity] duration-200 ease-out text-sm">
            View case study →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#a87242]/30"
        style={{ background: 'rgba(17,13,10,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl bg-[#1a120c]">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 mix-blend-multiply opacity-50"
            style={{ background: `linear-gradient(135deg, #1a120c, ${project.color})` }} />
          <div className="absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(17,13,10,1))' }} />
        </div>
        <div className="p-8 md:p-10 -mt-10 relative">
          <div className="flex items-start justify-between mb-8">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block"
                style={{ background: `${project.color}25`, color: '#fff', border: `1px solid ${project.color}80` }}>
                {project.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-[color,border-color,background-color,opacity] duration-200 ease-out p-2 rounded-lg hover:bg-white/5 ml-4">
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Context', text: project.clientContext },
              { label: 'Challenge', text: project.challenge },
              { label: 'Approach', text: project.approach },
            ].map(({ label, text }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">{label}</p>
                <p className="text-white/70 leading-relaxed">{text}</p>
              </div>
            ))}

            <div className="rounded-xl p-6" style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: project.color }}>Result</p>
              <p className="text-2xl font-bold text-white">{project.result}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FeaturedWorkSection() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section id="featured-work" className="py-20 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#c89368] uppercase tracking-widest mb-4">Featured Work</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 md:mb-6 leading-[1.1]">
            Results that <span className="font-serif-italic font-normal text-[#d4a576]">speak</span><br />for themselves
          </h2>
          <p className="text-lg text-white/50 max-w-2xl">
            Case studies showcasing measurable outcomes from our strategic partnerships.
            Click any card to explore the full story.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
