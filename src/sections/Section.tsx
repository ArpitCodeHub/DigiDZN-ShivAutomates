import React, { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { usePreferredReducedMotion } from '../hooks/usePreferredReducedMotion'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export default function Section({ children, className = '', id, delay = 0 }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const reduced = usePreferredReducedMotion()

  const variants: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 32 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  }

  return (
    <motion.section
      ref={ref} id={id}
      className={`w-full ${className}`}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  )
}

interface ContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ children, className = '', maxWidth = 'xl' }: ContainerProps) {
  const widths = { sm: 'max-w-2xl', md: 'max-w-4xl', lg: 'max-w-5xl', xl: 'max-w-7xl', full: 'max-w-full' }
  return (
    <div className={`mx-auto w-full px-6 md:px-10 lg:px-16 ${widths[maxWidth]} ${className}`}>
      {children}
    </div>
  )
}

interface SectionHeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export function SectionHeading({ children, as: Tag = 'h2', className = '' }: SectionHeadingProps) {
  const sizes = { h1: 'text-5xl md:text-6xl lg:text-7xl', h2: 'text-4xl md:text-5xl', h3: 'text-3xl md:text-4xl' }
  return (
    <Tag className={`font-bold leading-tight tracking-tight text-white ${sizes[Tag]} ${className}`}>
      {children}
    </Tag>
  )
}

interface SectionSubtitleProps {
  children: ReactNode
  className?: string
}

export function SectionSubtitle({ children, className = '' }: SectionSubtitleProps) {
  return (
    <p className={`text-lg md:text-xl text-white/60 leading-relaxed ${className}`}>
      {children}
    </p>
  )
}
