/**
 * ContentGalleryItem Component
 * 
 * Individual gallery item (image or video) with hover animations and modal expansion
 * 
 * Acceptance Criteria Addressed:
 * - 8.1: Thumbnail image or video preview
 * - 8.2: Hover animation: scale + overlay reveal
 * - 8.3: Click to expand modal view with full-size content
 * - 8.4: Modal expansion animation (0.4s ease-in-out)
 * - 8.5: Video autoplay in modal (muted)
 * 
 * Validates Requirements: 8.1-8.6, 14.3
 */

import { motion } from 'framer-motion'
import { useState } from 'react'

export interface ContentGalleryItemData {
  id: string | number
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  title: string
  description?: string
}

interface ContentGalleryItemProps {
  item: ContentGalleryItemData
  onExpandClick: (item: ContentGalleryItemData) => void
}

export default function ContentGalleryItem({
  item,
  onExpandClick,
}: ContentGalleryItemProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Determine the source to display (thumbnail for video, src for image)
  const displaySrc =
    item.type === 'video' && item.thumbnail ? item.thumbnail : item.src

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer group"
      style={{ aspectRatio: '1' }}
      onClick={() => onExpandClick(item)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      data-testid={`gallery-item-${item.id}`}
    >
      {/* Lazy loaded image or video preview */}
      {!imageError ? (
        <img
          src={displaySrc}
          alt={item.title}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          data-testid={`gallery-item-image-${item.id}`}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center bg-gray-300"
          data-testid={`gallery-item-error-${item.id}`}
        >
          <span className="text-gray-600">Failed to load</span>
        </div>
      )}

      {/* Loading skeleton placeholder */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          data-testid={`gallery-item-skeleton-${item.id}`}
        />
      )}

      {/* Hover overlay with title and video icon */}
      <motion.div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        data-testid={`gallery-item-overlay-${item.id}`}
      >
        <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Video play icon */}
          {item.type === 'video' && (
            <motion.div
              className="mb-4"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <svg
                className="w-12 h-12 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                data-testid="video-play-icon"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          )}

          {/* Title and description */}
          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-200 px-2">{item.description}</p>
          )}

          {/* Expand hint */}
          <p className="text-xs text-gray-300 mt-3">Click to expand</p>
        </div>
      </motion.div>

      {/* Badge for video items */}
      {item.type === 'video' && (
        <div
          className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white font-semibold"
          data-testid={`gallery-item-video-badge-${item.id}`}
        >
          VIDEO
        </div>
      )}
    </motion.div>
  )
}
