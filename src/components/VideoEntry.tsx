import { useEffect, useRef, useState } from 'react'

interface VideoEntryProps {
  videoSrc: string
  onVideoComplete: () => void
}

/**
 * VideoEntry Component
 * 
 * Displays a fullscreen video experience that acts as the entry gateway to the homepage.
 * 
 * Acceptance Criteria Addressed:
 * 1. Fullscreen container (100vw × 100vh) with position: fixed
 * 2. Video element with autoplay, muted, playsInline attributes
 * 3. object-fit: cover for fullscreen coverage without letterboxing
 * 4. Video ended event listener triggers parent callback
 * 5. State tracking prevents video restart after transition trigger
 * 
 * Validates Requirements: 1.1-1.6, 2.1-2.6
 */
export default function VideoEntry({ videoSrc, onVideoComplete }: VideoEntryProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasTriggeredTransition, setHasTriggeredTransition] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // Only trigger transition once, on first video completion
      if (!hasTriggeredTransition) {
        console.log('Video ended, triggering transition')
        setHasTriggeredTransition(true)
        onVideoComplete()
      }
    }

    // Listen for video end event
    video.addEventListener('ended', handleVideoEnd)

    // Fallback: If video hasn't ended after 30 seconds, trigger transition anyway
    // This handles cases where video.ended event doesn't fire
    const timeoutId = setTimeout(() => {
      if (!hasTriggeredTransition && video) {
        console.log('Video timeout reached, triggering transition manually')
        setHasTriggeredTransition(true)
        onVideoComplete()
      }
    }, 30000)

    return () => {
      video.removeEventListener('ended', handleVideoEnd)
      clearTimeout(timeoutId)
    }
  }, [hasTriggeredTransition, onVideoComplete])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Remove loop attribute after transition is triggered to prevent restart
    // Requirement 2.5: IF video ends after transition triggered, video SHALL not restart
    if (hasTriggeredTransition) {
      video.loop = false
      // Ensure video doesn't restart
      video.currentTime = video.duration
    } else {
      // Before transition, don't loop - let it play once and end naturally
      video.loop = false
    }
  }, [hasTriggeredTransition])

  return (
    <div className="video-entry-container" data-testid="video-entry-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="video-element"
        data-testid="video-element"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Skip button - visible after 3 seconds */}
      {!hasTriggeredTransition && (
        <button
          onClick={() => {
            setHasTriggeredTransition(true)
            onVideoComplete()
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold rounded-lg backdrop-blur-sm transition-all opacity-0 animate-fade-in-delayed cursor-pointer z-20"
          style={{
            animationDelay: '3s',
            animation: 'fadeInUp 0.6s ease-out 3s forwards',
          }}
          aria-label="Skip to homepage"
        >
          Skip Video
        </button>
      )}
    </div>
  )
}
