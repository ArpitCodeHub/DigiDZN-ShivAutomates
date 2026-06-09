/**
 * Styles Index
 * Central export point for all style imports and utilities
 * 
 * This file helps organize and manage all CSS imports
 */

// Import all CSS files
import './globals.css'
import './animations.css'

// Export style utilities for use in components
export const animationDurations = {
  fast: '0.2s',
  normal: '0.3s',
  standard: '0.6s',
  slow: '0.8s',
  transition: '1.2s',
} as const

export const easingFunctions = {
  easeOut: 'cubic-bezier(0.23, 1, 0.320, 1)',
  easeIn: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  linear: 'linear',
} as const

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 50,
  offCanvas: 75,
  modal: 200,
  popover: 210,
  tooltip: 220,
  notification: 230,
} as const
