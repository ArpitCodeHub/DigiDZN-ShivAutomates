import { motion } from 'framer-motion'
import Section, { Container } from '../sections/Section'

const collage = [
  {
    rotate: -6,
    top: '0%',
    left: '8%',
    z: 3,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop',
    alt: 'Team collaborating around laptops',
  },
  {
    rotate: 4,
    top: '30%',
    left: '32%',
    z: 2,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80&auto=format&fit=crop',
    alt: 'Designers working at desk',
  },
  {
    rotate: -3,
    top: '58%',
    left: '6%',
    z: 1,
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80&auto=format&fit=crop',
    alt: 'Co-working session',
  },
]

export default function AboutSection() {
  return (
    <Section id="about" className="py-20 md:py-32 bg-[#0a0807]">
      <Container maxWidth="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Photo collage */}
          <div className="relative h-[420px] sm:h-[480px] md:h-[560px] order-2 lg:order-1">
            {collage.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                className="absolute w-[60%] sm:w-[55%] md:w-[320px] aspect-[3/2] rounded-xl border border-white/10 shadow-2xl overflow-hidden bg-[#1a120c]"
                style={{ top: p.top, left: p.left, zIndex: p.z }}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {/* Subtle warm tint */}
                <div className="absolute inset-0 mix-blend-multiply opacity-25"
                  style={{ background: 'linear-gradient(135deg,#3a2a1f,#a87242)' }} />
              </motion.div>
            ))}

            {/* 4-point star */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute right-4 top-[18%] text-white/70 text-2xl md:text-3xl"
              style={{ fontFamily: 'serif' }}
            >
              ✦
            </motion.div>

            {/* Hexagon (brown) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute left-1 top-[42%] w-8 h-8 md:w-10 md:h-10"
              style={{
                background: '#a87242',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            />

            {/* Sun-burst */}
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute right-[15%] top-[45%] text-[#c89368] text-3xl md:text-4xl"
            >
              ✺
            </motion.div>

            {/* Decorative dotted line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 600"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M 50 50 Q 200 200 100 400 T 250 580"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            </svg>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-3"
            >
              We help <br className="hidden md:block" />businesses
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-serif-italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-8 md:mb-10"
              style={{ color: '#d4a576' }}
            >
              go digital,<br />
              stay efficient,<br />
              and evolve confidently.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-5 max-w-md text-sm sm:text-base text-white/65 leading-relaxed mb-8 md:mb-10"
            >
              <p>
                We create modern digital solutions — from concept and design to full-scale
                development and continuous maintenance.
              </p>
              <p>
                Our team of designers, developers, and analysts helps businesses grow,
                stand out, and stay ahead in the digital world.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(168,114,66,0.15)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-7 py-3 rounded-full text-sm md:text-base text-white border border-white/25 bg-white/5 backdrop-blur-sm transition-colors"
            >
              More about agency
            </motion.button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
