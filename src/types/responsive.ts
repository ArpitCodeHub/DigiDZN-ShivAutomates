/**
 * Type definitions for responsive design and utilities
 */

/**
 * Breakpoint type for media queries
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Device type classification
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Typography level classification
 */
export type TypographyLevel =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'bodySmall'
  | 'caption'

/**
 * Spacing scale keys
 */
export type SpacingScale =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'

/**
 * Grid type classification
 */
export type GridType = 'card' | 'team' | 'testimonial'

/**
 * Typography object structure
 */
export interface TypographyConfig {
  size: string
  lineHeight: number
  weight: number
}

/**
 * Typography scale by breakpoint
 */
export interface ResponsiveTypography {
  mobile: TypographyConfig
  tablet: TypographyConfig
  desktop: TypographyConfig
}

/**
 * Spacing configuration by breakpoint
 */
export interface ResponsiveSpacing {
  mobile: string
  tablet: string
  desktop: string
}

/**
 * Padding configuration with all sides
 */
export interface PaddingConfig {
  top: string
  right: string
  bottom: string
  left: string
}

/**
 * Section padding by breakpoint
 */
export interface ResponsiveSectionPadding {
  mobile: PaddingConfig
  tablet: PaddingConfig
  desktop: PaddingConfig
}

/**
 * Grid column configuration
 */
export interface GridColumnConfig {
  mobile: number
  tablet: number
  desktop: number
}

/**
 * Maximum width constraints
 */
export interface MaxWidthConfig {
  container: string
  content: string
  narrow: string
}

/**
 * Breakpoint pixel values
 */
export interface BreakpointPixels {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

/**
 * Color palette structure
 */
export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  neutral: string
  text: {
    primary: string
    secondary: string
    light: string
    inverse: string
  }
  background: {
    light: string
    neutral: string
    dark: string
  }
}

/**
 * Shadow scale structure
 */
export interface ShadowScale {
  soft: string
  medium: string
  elevated: string
}
