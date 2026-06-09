/**
 * Responsive Design Utilities
 * Provides typography scales and spacing utilities following premium design guidelines
 * Supports mobile (375px), tablet (768px), and desktop (1024px+) breakpoints
 */

// Typography scales - mobile first, then tablet, then desktop
export const typographyScale = {
  // Heading scales
  h1: {
    mobile: { size: '28px', lineHeight: 1.2, weight: 700 },
    tablet: { size: '44px', lineHeight: 1.3, weight: 700 },
    desktop: { size: '56px', lineHeight: 1.2, weight: 700 },
  },
  h2: {
    mobile: { size: '24px', lineHeight: 1.3, weight: 700 },
    tablet: { size: '36px', lineHeight: 1.3, weight: 700 },
    desktop: { size: '44px', lineHeight: 1.3, weight: 700 },
  },
  h3: {
    mobile: { size: '20px', lineHeight: 1.4, weight: 600 },
    tablet: { size: '28px', lineHeight: 1.4, weight: 600 },
    desktop: { size: '32px', lineHeight: 1.4, weight: 600 },
  },
  h4: {
    mobile: { size: '18px', lineHeight: 1.4, weight: 600 },
    tablet: { size: '22px', lineHeight: 1.4, weight: 600 },
    desktop: { size: '24px', lineHeight: 1.4, weight: 600 },
  },
  // Body text scales
  body: {
    mobile: { size: '16px', lineHeight: 1.6, weight: 400 },
    tablet: { size: '18px', lineHeight: 1.7, weight: 400 },
    desktop: { size: '20px', lineHeight: 1.8, weight: 400 },
  },
  bodySmall: {
    mobile: { size: '14px', lineHeight: 1.5, weight: 400 },
    tablet: { size: '16px', lineHeight: 1.6, weight: 400 },
    desktop: { size: '16px', lineHeight: 1.6, weight: 400 },
  },
  caption: {
    mobile: { size: '12px', lineHeight: 1.4, weight: 500 },
    tablet: { size: '13px', lineHeight: 1.4, weight: 500 },
    desktop: { size: '14px', lineHeight: 1.4, weight: 500 },
  },
}

// Premium spacing scale following established design system
export const spacingScale = {
  xs: '0.5rem', // 8px
  sm: '1rem', // 16px
  md: '1.5rem', // 24px
  lg: '2rem', // 32px
  xl: '3rem', // 48px
  '2xl': '4rem', // 64px
  '3xl': '6rem', // 96px
  '4xl': '8rem', // 128px
}

// Responsive section padding by breakpoint
export const sectionPadding = {
  mobile: {
    top: '2rem',
    right: '1rem',
    bottom: '2rem',
    left: '1rem',
  },
  tablet: {
    top: '3rem',
    right: '2rem',
    bottom: '3rem',
    left: '2rem',
  },
  desktop: {
    top: '4rem',
    right: '4rem',
    bottom: '4rem',
    left: '4rem',
  },
}

// Responsive gap values for grids and flexbox
export const gridGap = {
  mobile: '1rem', // 16px
  tablet: '1.5rem', // 24px
  desktop: '2rem', // 32px
}

// Column configurations for responsive grids
export const gridColumns = {
  // Feature cards, project cards
  card: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  // Team members
  team: {
    mobile: 2,
    tablet: 2,
    desktop: 4,
  },
  // Testimonials
  testimonial: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
}

// Maximum content width to maintain readability
export const maxWidth = {
  container: '1440px',
  content: '960px',
  narrow: '640px',
}

// Responsive breakpoints matching TailwindCSS config
export const breakpoints = {
  xs: 375,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
  '2xl': 2560,
}

/**
 * Helper function to get typography scale based on device size
 * @param level - Typography level (h1, h2, h3, h4, body, bodySmall, caption)
 * @param breakpoint - Current breakpoint (mobile, tablet, desktop)
 * @returns Typography object with size, lineHeight, weight
 */
export function getTypography(
  level: keyof typeof typographyScale,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
) {
  return typographyScale[level][breakpoint]
}

/**
 * Helper function to generate responsive CSS for typography
 * @param level - Typography level
 * @returns CSS-in-JS object for Tailwind or styled-components
 */
export function getResponsiveTypography(level: keyof typeof typographyScale) {
  const mobile = typographyScale[level].mobile
  const tablet = typographyScale[level].tablet
  const desktop = typographyScale[level].desktop

  return {
    default: `
      font-size: ${mobile.size};
      line-height: ${mobile.lineHeight};
      font-weight: ${mobile.weight};
    `,
    tablet: `
      @media (min-width: 768px) {
        font-size: ${tablet.size};
        line-height: ${tablet.lineHeight};
        font-weight: ${tablet.weight};
      }
    `,
    desktop: `
      @media (min-width: 1024px) {
        font-size: ${desktop.size};
        line-height: ${desktop.lineHeight};
        font-weight: ${desktop.weight};
      }
    `,
  }
}

/**
 * Helper function to get section padding based on breakpoint
 * @param breakpoint - Current breakpoint
 * @returns Padding object
 */
export function getSectionPadding(breakpoint: 'mobile' | 'tablet' | 'desktop') {
  return sectionPadding[breakpoint]
}

/**
 * Helper function to generate responsive padding CSS
 * @returns CSS string with media queries
 */
export function getResponsiveSectionPaddingCSS(): string {
  const mobile = sectionPadding.mobile
  const tablet = sectionPadding.tablet
  const desktop = sectionPadding.desktop

  return `
    padding: ${mobile.top} ${mobile.right} ${mobile.bottom} ${mobile.left};
    
    @media (min-width: 768px) {
      padding: ${tablet.top} ${tablet.right} ${tablet.bottom} ${tablet.left};
    }
    
    @media (min-width: 1024px) {
      padding: ${desktop.top} ${desktop.right} ${desktop.bottom} ${desktop.left};
    }
  `
}

/**
 * Helper function to get grid columns for responsive layout
 * @param type - Grid type (card, team, testimonial)
 * @param breakpoint - Current breakpoint
 * @returns Number of columns
 */
export function getGridColumns(
  type: keyof typeof gridColumns,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): number {
  return gridColumns[type][breakpoint]
}

/**
 * Helper function to get Tailwind grid class names based on breakpoint
 * @param type - Grid type
 * @returns Tailwind class string
 */
export function getGridClasses(type: keyof typeof gridColumns): string {
  const config = gridColumns[type]

  const mobileClass = `grid-cols-${config.mobile}`
  const tabletClass = `md:grid-cols-${config.tablet}`
  const desktopClass = `lg:grid-cols-${config.desktop}`

  return `grid ${mobileClass} ${tabletClass} ${desktopClass} gap-4 md:gap-6 lg:gap-8`
}

/**
 * Helper to check if viewport is mobile
 * @param width - Current viewport width
 * @returns boolean
 */
export function isMobileViewport(width: number): boolean {
  return width < breakpoints.md
}

/**
 * Helper to check if viewport is tablet
 * @param width - Current viewport width
 * @returns boolean
 */
export function isTabletViewport(width: number): boolean {
  return width >= breakpoints.md && width < breakpoints.lg
}

/**
 * Helper to check if viewport is desktop
 * @param width - Current viewport width
 * @returns boolean
 */
export function isDesktopViewport(width: number): boolean {
  return width >= breakpoints.lg
}

/**
 * Get minimum touch target size (48px) as recommended by WCAG AA
 */
export const MIN_TOUCH_TARGET = '48px'

/**
 * Premium color palette for consistent theming
 */
export const colorPalette = {
  primary: '#000000',
  secondary: '#ffffff',
  accent: '#1a73e8',
  neutral: '#f9f9f9',
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    inverse: '#ffffff',
  },
  background: {
    light: '#ffffff',
    neutral: '#f9f9f9',
    dark: '#f0f0f0',
  },
}

/**
 * Premium shadow scale
 */
export const shadowScale = {
  soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
  medium: '0 10px 24px rgba(0, 0, 0, 0.12)',
  elevated: '0 20px 40px rgba(0, 0, 0, 0.15)',
}
