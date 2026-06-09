import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface TransitionOverlayProps {
  onTransitionComplete: () => void
}

export default function TransitionOverlay({ onTransitionComplete }: TransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current) return

    // Block all user inputs during transition
    const blockInput = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
    }

    // Apply input blocking
    document.addEventListener('click', blockInput, true)
    document.addEventListener('scroll', blockInput, true)
    document.addEventListener('touchstart', blockInput, true)
    document.addEventListener('touchmove', blockInput, true)
    document.addEventListener('wheel', blockInput, true)
    document.addEventListener('keydown', blockInput, true)

    // Prevent scroll
    const originalOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        // Remove input blocking after animation completes
        document.removeEventListener('click', blockInput, true)
        document.removeEventListener('scroll', blockInput, true)
        document.removeEventListener('touchstart', blockInput, true)
        document.removeEventListener('touchmove', blockInput, true)
        document.removeEventListener('wheel', blockInput, true)
        document.removeEventListener('keydown', blockInput, true)
        document.documentElement.style.overflow = originalOverflow

        onTransitionComplete()
      },
    })

    // Step 1: Fade out video (0.3s, opacity → 0)
    tl.to('.video-entry-container', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    })

    // Step 2: Scale up homepage content (0.6s, offset -0.1s)
    tl.to('.homepage', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.1')

    // Step 3: Fade in homepage (0.4s, offset -0.2s)
    tl.to('.transition-overlay', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      pointerEvents: 'none',
    }, '-=0.2')

    return () => {
      // Cleanup on unmount
      tl.kill()
      document.removeEventListener('click', blockInput, true)
      document.removeEventListener('scroll', blockInput, true)
      document.removeEventListener('touchstart', blockInput, true)
      document.removeEventListener('touchmove', blockInput, true)
      document.removeEventListener('wheel', blockInput, true)
      document.removeEventListener('keydown', blockInput, true)
      document.documentElement.style.overflow = originalOverflow
    }
  }, [onTransitionComplete])

  return (
    <div
      ref={overlayRef}
      className="transition-overlay fixed inset-0 z-50 bg-black opacity-100 pointer-events-auto"
    />
  )
}
