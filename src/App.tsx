import { useState } from 'react'
import VideoEntry from './components/VideoEntry'
import TransitionOverlay from './components/TransitionOverlay'
import Homepage from './components/Homepage'

export default function App() {
  const [isVideoComplete, setIsVideoComplete] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [leadFormOpen, setLeadFormOpen] = useState(false)

  const handleVideoComplete = () => {
    setIsVideoComplete(true)
    setIsTransitioning(true)
  }

  const handleTransitionComplete = () => {
    setIsTransitioning(false)
  }

  return (
    <>
      {/* Video Entry Experience */}
      {!isVideoComplete && (
        <VideoEntry 
          videoSrc="/videos/hero-digidzn.mp4" 
          onVideoComplete={handleVideoComplete}
        />
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <TransitionOverlay onTransitionComplete={handleTransitionComplete} />
      )}

      {/* Homepage */}
      {isVideoComplete && (
        <Homepage 
          leadFormOpen={leadFormOpen}
          setLeadFormOpen={setLeadFormOpen}
        />
      )}
    </>
  )
}
