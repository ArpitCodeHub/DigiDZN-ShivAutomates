import { useEffect, useState } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<Breakpoint, number> = {
  xs: 375,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
  '2xl': 2560,
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < breakpoints.sm) {
        setBreakpoint('xs')
      } else if (width < breakpoints.md) {
        setBreakpoint('sm')
      } else if (width < breakpoints.lg) {
        setBreakpoint('md')
      } else if (width < breakpoints.xl) {
        setBreakpoint('lg')
      } else if (width < breakpoints['2xl']) {
        setBreakpoint('xl')
      } else {
        setBreakpoint('2xl')
      }
    }

    // Set initial breakpoint
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

export function useIsMobile(): boolean {
  const breakpoint = useBreakpoint()
  return breakpoint === 'xs' || breakpoint === 'sm'
}

export function useIsTablet(): boolean {
  const breakpoint = useBreakpoint()
  return breakpoint === 'md'
}

export function useIsDesktop(): boolean {
  const breakpoint = useBreakpoint()
  return breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl'
}
