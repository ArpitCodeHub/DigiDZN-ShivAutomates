/**
 * Type definitions for animations and motion
 */

import { Variants } from 'framer-motion'

/**
 * Animation duration type
 */
export type AnimationDuration = number

/**
 * Easing function names
 */
export type EasingFunction =
  | 'easeOut'
  | 'easeIn'
  | 'easeInOut'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeOutCubic'
  | 'easeInOutCubic'

/**
 * Animation variant type
 */
export type AnimationVariant = Variants

/**
 * GSAP animation configuration
 */
export interface GSAPAnimationConfig {
  duration: number
  ease: string
  delay?: number
  offset?: string | number
}

/**
 * Scroll trigger configuration
 */
export interface ScrollTriggerConfig {
  trigger: string | HTMLElement
  start: string
  end: string
  toggleActions: string
  markers?: boolean
}

/**
 * Intersection Observer configuration
 */
export interface IntersectionObserverConfig {
  threshold: number | number[]
  rootMargin: string
}

/**
 * Animation timing configuration
 */
export interface AnimationTimingConfig {
  standard: number
  slow: number
  slower: number
  transition: number
  instant: number
}

/**
 * Motion configuration for reduced motion preference
 */
export interface MotionConfig {
  delayChildren: number
  staggerChildren: number
  transition: {
    duration: number
  }
  entrance: {
    opacity: number
    y: number
    transition: {
      duration: number
    }
  }
}

/**
 * Performance monitoring callback
 */
export type PerformanceMonitorCallback = (fps: number) => void

/**
 * Animation status
 */
export interface AnimationStatus {
  shouldAnimate: boolean
  duration: number
}

/**
 * Stagger configuration
 */
export interface StaggerConfig {
  delay: number
  count: number
}

/**
 * Hover animation configuration
 */
export interface HoverAnimationConfig {
  scale?: number
  boxShadow?: string
  y?: number
  transition?: {
    duration: number
  }
}

/**
 * Entrance animation configuration
 */
export interface EntranceAnimationConfig {
  opacity: number
  x?: number
  y?: number
  scale?: number
  transition: {
    duration: number
    ease?: string
  }
}

/**
 * GPU accelerated properties list
 */
export type GPUAcceleratedProperty =
  | 'transform'
  | 'opacity'
  | 'will-change'

/**
 * Video animation preset
 */
export interface VideoAnimationPreset {
  targets: string
  [key: string]: any
}

/**
 * Form animation preset
 */
export interface FormAnimationPreset {
  targets: string
  [key: string]: any
}

/**
 * Page transition configuration
 */
export interface PageTransitionConfig {
  initial: {
    opacity: number
  }
  animate: {
    opacity: number
    transition: {
      duration: number
    }
  }
  exit: {
    opacity: number
    transition: {
      duration: number
    }
  }
}
