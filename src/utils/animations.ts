/**
 * Animation Utilities with Prefers-Reduced-Motion Support
 * Provides animation configurations and helpers for GSAP and Framer Motion
 * Respects accessibility preference for reduced motion
 */

import { usePreferredReducedMotion } from '../hooks/usePreferredReducedMotion'

/**
 * Standard animation durations
 */
export const animationDurations = {
  // Fast interactions
  fast: 0.2,
  // Standard interactions and entrance animations
  standard: 0.3,
  // Slower entrance animations
  slow: 0.6,
  // Major section transitions
  slower: 0.8,
  // Transition overlay animations
  transition: 1.2,
}

/**
 * Easing functions for smooth, intentional motion
 */
export const easingFunctions = {
  easeOut: 'power2.out',
  easeIn: 'power2.in',
  easeInOut: 'power2.inOut',
  easeOutQuad: 'power3.out',
  easeInOutQuad: 'power3.inOut',
  easeOutCubic: 'power4.out',
  easeInOutCubic: 'power4.inOut',
}

/**
 * Framer Motion entrance animation variants
 * Use with motion.div, motion.section, etc.
 */
export const framerEntranceVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animationDurations.slow, ease: 'easeOut' },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animationDurations.slow, ease: 'easeOut' },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: animationDurations.slow, ease: 'easeOut' },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: animationDurations.slow, ease: 'easeOut' },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: animationDurations.slow, ease: 'easeOut' },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animationDurations.slow, ease: 'easeOut' },
    },
  },
}

/**
 * Framer Motion hover variants for interactive elements
 */
export const framerHoverVariants = {
  // Subtle scale and shadow increase
  cardHover: {
    scale: 1.02,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    transition: { duration: animationDurations.standard },
  },
  // Larger scale for CTA buttons
  buttonHover: {
    scale: 1.05,
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.15)',
    transition: { duration: animationDurations.standard },
  },
  // Slight lift effect
  liftHover: {
    y: -4,
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
    transition: { duration: animationDurations.standard },
  },
}

/**
 * Scroll-triggered animation configuration for GSAP ScrollTrigger
 */
export const scrollTriggerConfig = {
  // Standard scroll trigger - fires when 30% of element is visible
  standard: {
    trigger: undefined as any, // Set by component
    start: 'top 70%',
    end: 'top 30%',
    toggleActions: 'play none none reverse',
  },
  // Aggressive scroll trigger - fires when element just enters viewport
  aggressive: {
    trigger: undefined as any,
    start: 'top 85%',
    end: 'top 15%',
    toggleActions: 'play none none reverse',
  },
  // Lazy scroll trigger - fires when well into viewport
  lazy: {
    trigger: undefined as any,
    start: 'top 50%',
    end: 'center center',
    toggleActions: 'play none none reverse',
  },
}

/**
 * GSAP animation timeline presets
 */
export const gsapTimelinePresets = {
  /**
   * Transition overlay animation sequence
   * Step 1: Fade out video (0.3s)
   * Step 2: Scale up homepage (0.6s, offset 0.2s)
   * Step 3: Fade in overlay content (0.4s, offset 0.5s)
   */
  transitionOverlay: {
    videoFade: { duration: 0.3, ease: 'power2.inOut' },
    homePageScale: { duration: 0.6, ease: 'power2.inOut', offset: '-=0.1' },
    overlayFade: { duration: 0.4, ease: 'power2.inOut', offset: '-=0.2' },
  },
  /**
   * Section entrance animation
   * Fade in + slight scale up
   */
  sectionEntrance: {
    duration: 0.6,
    ease: 'power2.out',
  },
  /**
   * Hover animation for cards
   */
  cardHover: {
    duration: 0.3,
    ease: 'power2.out',
  },
}

/**
 * Get animation configuration with respect to prefers-reduced-motion
 * Returns durations of 0 if reduced motion is preferred
 */
export function getAnimationConfig(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      standard: 0,
      slow: 0,
      slower: 0,
      transition: 0,
      instant: 0,
    }
  }

  return {
    standard: animationDurations.standard,
    slow: animationDurations.slow,
    slower: animationDurations.slower,
    transition: animationDurations.transition,
    instant: 0,
  }
}

/**
 * Get Framer Motion variants with reduced motion support
 */
export function getMotionVariants(
  prefersReducedMotion: boolean,
  variant: keyof typeof framerEntranceVariants
) {
  if (!prefersReducedMotion) {
    return framerEntranceVariants[variant]
  }

  // Return instant variants that show element without animation
  return {
    hidden: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0 },
    },
  }
}

/**
 * Get hover animation variants with reduced motion support
 */
export function getHoverVariants(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      whileHover: {
        scale: 1,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: { duration: 0 },
      },
    }
  }

  return {
    whileHover: framerHoverVariants.cardHover,
  }
}

/**
 * GPU-accelerated CSS properties that maintain 60 FPS
 * Only use these properties for animations
 */
export const gpuAcceleratedProperties = [
  'transform',
  'opacity',
  'will-change: transform, opacity',
]

/**
 * Helper to create a GSAP-compatible easing string
 */
export function getEasingString(
  easing: keyof typeof easingFunctions
): typeof easingFunctions[keyof typeof easingFunctions] {
  return easingFunctions[easing]
}

/**
 * Helper to get responsive animation duration
 * Slower on mobile to maintain 30+ FPS
 */
export function getResponsiveAnimationDuration(
  baselineDuration: number,
  isMobile: boolean
): number {
  // Reduce animation duration on mobile by 20% to maintain better FPS
  return isMobile ? baselineDuration * 0.8 : baselineDuration
}

/**
 * Generate staggered delay array for list items
 * @param count - Number of items
 * @param baseDelay - Base delay between items (default 0.1s)
 */
export function generateStaggerDelays(
  count: number,
  baseDelay: number = 0.1
): number[] {
  return Array.from({ length: count }, (_, i) => i * baseDelay)
}

/**
 * Framer Motion custom hook helper for animations with reduced motion support
 * @param prefersReducedMotion - User's reduced motion preference
 * @returns Configuration object for Framer Motion components
 */
export function useAnimationConfig(prefersReducedMotion: boolean) {
  return {
    // Disable animation delays if reduced motion is preferred
    delayChildren: prefersReducedMotion ? 0 : 0.1,
    staggerChildren: prefersReducedMotion ? 0 : 0.1,

    // Fast animations if reduced motion, no animation otherwise
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: animationDurations.standard },

    // Map between transition and no-motion modes
    entrance: prefersReducedMotion
      ? { opacity: 1, y: 0, transition: { duration: 0 } }
      : { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }
}

/**
 * Intersection Observer configuration for scroll-triggered animations
 */
export const intersectionObserverConfig = {
  // Standard: Trigger when 30% of element is visible
  standard: {
    threshold: 0.3,
    rootMargin: '0px',
  },
  // Aggressive: Trigger at any visibility
  aggressive: {
    threshold: 0,
    rootMargin: '100px 0px 100px 0px',
  },
  // Lazy: Trigger when 50% of element is visible
  lazy: {
    threshold: 0.5,
    rootMargin: '0px',
  },
}

/**
 * Video animation presets
 */
export const videoAnimations = {
  // Fade out video during transition
  fadeOutVideo: {
    targets: '.video-entry-container',
    opacity: [1, 0],
    duration: animationDurations.standard * 1000,
    easing: 'easeInOutQuad',
  },
  // Fade in homepage content
  fadeInHomepage: {
    targets: '.homepage',
    opacity: [0, 1],
    duration: animationDurations.slow * 1000,
    easing: 'easeOutQuad',
  },
}

/**
 * Form animation presets
 */
export const formAnimations = {
  // Slide in form modal
  slideInModal: {
    targets: '.lead-form-modal',
    y: [40, 0],
    opacity: [0, 1],
    duration: animationDurations.slow * 1000,
    easing: 'easeOutQuad',
  },
  // Pulse on error state
  errorPulse: {
    targets: '.form-field-error',
    boxShadow: [
      '0 0 0 0 rgba(255, 67, 54, 0.4)',
      '0 0 0 10px rgba(255, 67, 54, 0)',
    ],
    duration: 500,
    easing: 'easeOutQuad',
  },
  // Success checkmark animation
  successCheckmark: {
    targets: '.form-success-icon',
    scale: [0, 1],
    opacity: [0, 1],
    duration: animationDurations.standard * 1000,
    easing: 'backOut',
  },
}

/**
 * Performance monitoring for animations
 * Detects if FPS is dropping below threshold
 */
export function createAnimationPerformanceMonitor(
  targetFPS: number = 60,
  callback?: (fps: number) => void
) {
  let frameCount = 0
  let lastTime = performance.now()
  let animationFrameId: number

  const checkFPS = () => {
    frameCount++
    const now = performance.now()

    if (now - lastTime >= 1000) {
      const currentFPS = frameCount
      if (callback) {
        callback(currentFPS)
      }

      // If FPS is dropping significantly, consider disabling animations
      if (currentFPS < targetFPS * 0.5) {
        console.warn(
          `Animation performance warning: ${currentFPS} FPS (target: ${targetFPS})`
        )
      }

      frameCount = 0
      lastTime = now
    }

    animationFrameId = requestAnimationFrame(checkFPS)
  }

  // Start monitoring
  animationFrameId = requestAnimationFrame(checkFPS)

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId)
  }
}

/**
 * Helper to get animation status based on prefers-reduced-motion
 */
export function shouldAnimateElement(
  prefersReducedMotion: boolean
): { shouldAnimate: boolean; duration: number } {
  return {
    shouldAnimate: !prefersReducedMotion,
    duration: prefersReducedMotion ? 0 : animationDurations.slow,
  }
}

/**
 * Framer Motion page transition configuration
 * For layout animations between major page sections
 */
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: animationDurations.standard,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: animationDurations.fast,
    },
  },
}
