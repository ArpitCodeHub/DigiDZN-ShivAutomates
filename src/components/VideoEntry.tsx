import { useEffect, useRef, useState } from 'react'

interface VideoEntryProps {
  videoSrc: string
  videoSrcMobile?: string
  onVideoComplete: () => void
}

// Breakpoint that matches "mobile" — anything below 768px (md) is mobile
const MOBILE_BREAKPOINT = 768

export default function VideoEntry({ videoSrc, videoSrcMobile, onVideoComplete }: VideoEntryProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasTriggeredTransition, setHasTriggeredTransition] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Pick source once on mount based on current viewport width.
  // We intentionally do NOT re-evaluate on resize — the video is already
  // playing and swapping mid-experience would be jarring.
  const [activeSrc] = useState<string>(() => {
    if (videoSrcMobile && window.innerWidth < MOBILE_BREAKPOINT) {
      return videoSrcMobile
    }
    return videoSrc
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      if (!hasTriggeredTransition) {
        setHasTriggeredTransition(true)
        onVideoComplete()
      }
    }

    video.addEventListener('ended', handleVideoEnd)

    // Fallback: 30s max wait then skip
    const timeoutId = setTimeout(() => {
      if (!hasTriggeredTransition) {
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
    if (hasTriggeredTransition) {
      video.loop = false
      video.currentTime = video.duration
    } else {
      video.loop = false
    }
  }, [hasTriggeredTransition])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

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
        <source src={activeSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mute / unmute toggle — bottom right */}
      {!hasTriggeredTransition && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white border border-[#a87242]/50 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
        >
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      )}

      {/* Skip button — fades in after 3s, bottom centre */}
      {!hasTriggeredTransition && (
        <button
          onClick={() => { setHasTriggeredTransition(true); onVideoComplete() }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full text-sm font-semibold text-white border border-[#a87242]/50 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors z-20 opacity-0"
          style={{ animation: 'fadeInUp 0.6s ease-out 3s forwards' }}
          aria-label="Skip to homepage"
        >
          Skip →
        </button>
      )}
    </div>
  )
}
