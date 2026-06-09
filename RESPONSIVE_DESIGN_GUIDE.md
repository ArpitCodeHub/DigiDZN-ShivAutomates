# Responsive Design Utilities - Quick Reference Guide

## 🎯 Quick Start

### Import Hooks
```typescript
import { 
  useBreakpoint, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  usePreferredReducedMotion 
} from '@/hooks'
```

### Import Utilities
```typescript
import { 
  typographyScale, 
  spacingScale, 
  gridColumns,
  animationDurations,
  framerEntranceVariants
} from '@/utils'
```

---

## 📱 Breakpoints

### Breakpoint System
```
xs:  375px   - Small phones
sm:  480px   - Phones
md:  768px   - Tablets
lg:  1024px  - Small desktops
xl:  1440px  - Desktops
2xl: 2560px  - Large displays
```

### Using useBreakpoint Hook
```typescript
const breakpoint = useBreakpoint() // Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Render different content
{breakpoint === 'xs' && <MobileMenu />}
{breakpoint === 'md' && <TabletView />}
{['lg', 'xl', '2xl'].includes(breakpoint) && <DesktopView />}
```

### Helper Hooks
```typescript
const isMobile = useIsMobile()     // true if breakpoint is 'xs' or 'sm'
const isTablet = useIsTablet()     // true if breakpoint is 'md'
const isDesktop = useIsDesktop()   // true if breakpoint is 'lg', 'xl', or '2xl'
```

---

## 🔤 Typography Scales

### Typography Levels
```
h1       - Large headings (28px → 44px → 56px)
h2       - Section headings (24px → 36px → 44px)
h3       - Subsection headings (20px → 28px → 32px)
h4       - Small headings (18px → 22px → 24px)
body     - Body text (16px → 18px → 20px)
bodySmall - Small text (14px → 16px → 16px)
caption  - Caption text (12px → 13px → 14px)
```

### Using Typography Scale
```typescript
import { getTypography } from '@/utils/responsive'

// Get typography config for specific level and breakpoint
const mobileH1 = getTypography('h1', 'mobile')     // { size: '28px', lineHeight: 1.2, weight: 700 }
const desktopBody = getTypography('body', 'desktop') // { size: '20px', lineHeight: 1.8, weight: 400 }
```

### Responsive Typography Classes (Tailwind)
```html
<!-- Mobile: 28px, Tablet: 44px, Desktop: 56px -->
<h1 class="text-[28px] md:text-[44px] lg:text-7xl">Heading</h1>

<!-- Body text responsive -->
<p class="text-base md:text-lg lg:text-xl">Body text</p>
```

### CSS-in-JS Usage
```typescript
const h1Styles = getResponsiveTypography('h1')
// Returns object with default, tablet, and desktop CSS strings
```

---

## 🎨 Spacing System

### Spacing Scale
```
xs:   0.5rem  (8px)
sm:   1rem    (16px)
md:   1.5rem  (24px)
lg:   2rem    (32px)
xl:   3rem    (48px)
2xl:  4rem    (64px)
3xl:  6rem    (96px)
4xl:  8rem    (128px)
```

### Section Padding by Breakpoint
```typescript
import { getSectionPadding } from '@/utils/responsive'

const mobilePadding = getSectionPadding('mobile')   // { top: '2rem', right: '1rem', bottom: '2rem', left: '1rem' }
const desktopPadding = getSectionPadding('desktop') // { top: '4rem', right: '4rem', bottom: '4rem', left: '4rem' }
```

### Tailwind Spacing Classes
```html
<!-- Responsive padding -->
<section class="p-4 md:p-6 lg:p-8">Content</section>

<!-- Responsive margin -->
<div class="my-6 md:my-8 lg:my-12">Content</div>

<!-- Responsive gap in grids -->
<div class="grid gap-4 md:gap-6 lg:gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 📊 Grid Layouts

### Grid Columns Configuration
```typescript
import { getGridColumns, getGridClasses } from '@/utils/responsive'

// Get column count for specific type and breakpoint
const cardCols = getGridColumns('card', 'mobile')     // 1
const desktopCardCols = getGridColumns('card', 'desktop') // 3

// Get Tailwind classes for responsive grid
const gridClass = getGridClasses('card')
// Returns: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'
```

### Predefined Grid Types
```
card:       1 col (mobile) → 2 col (tablet) → 3 col (desktop)
team:       2 col (mobile) → 2 col (tablet) → 4 col (desktop)
testimonial: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
```

### Example Grid Implementation
```jsx
function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  )
}
```

---

## ✨ Animation Utilities

### Animation Durations
```typescript
import { animationDurations } from '@/utils/animations'

animationDurations.fast       // 0.2s  - Quick interactions
animationDurations.standard   // 0.3s  - Standard interactions
animationDurations.slow       // 0.6s  - Entrance animations
animationDurations.slower     // 0.8s  - Slower entrance
animationDurations.transition // 1.2s  - Major transitions
```

### Framer Motion Entrance Variants
```typescript
import { framerEntranceVariants } from '@/utils/animations'
import { motion } from 'framer-motion'

// Fade in with upward movement
<motion.div
  variants={framerEntranceVariants.fadeInUp}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>

// Other variants: fadeInDown, fadeInLeft, fadeInRight, scaleIn
```

### Hover Animations
```typescript
import { framerHoverVariants } from '@/utils/animations'

<motion.div whileHover={framerHoverVariants.cardHover}>
  Hover me
</motion.div>
```

### Staggered Animations
```typescript
<motion.div
  variants={framerEntranceVariants.staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={framerEntranceVariants.staggerItem}>Item 1</motion.div>
  <motion.div variants={framerEntranceVariants.staggerItem}>Item 2</motion.div>
  <motion.div variants={framerEntranceVariants.staggerItem}>Item 3</motion.div>
</motion.div>
```

---

## ♿ Accessibility - Reduced Motion

### Detecting User Preference
```typescript
import { usePreferredReducedMotion } from '@/hooks'

function AnimatedComponent() {
  const prefersReducedMotion = usePreferredReducedMotion()
  
  if (prefersReducedMotion) {
    return <StaticContent /> // No animations
  }
  
  return <AnimatedContent /> // With animations
}
```

### Applying Reduced Motion to Framer Motion
```typescript
import { usePreferredReducedMotion, getMotionVariants } from '@/utils'

function SafeAnimatedElement() {
  const prefersReducedMotion = usePreferredReducedMotion()
  const variants = getMotionVariants(prefersReducedMotion, 'fadeInUp')
  
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      Content shows instantly if reduced motion is preferred
    </motion.div>
  )
}
```

---

## 🎨 Color & Shadows

### Color Palette
```typescript
import { colorPalette, shadowScale } from '@/utils/responsive'

const primary = colorPalette.primary           // #000000
const accent = colorPalette.accent             // #1a73e8
const textSecondary = colorPalette.text.secondary // #666666

const softShadow = shadowScale.soft             // 0 2px 8px rgba(0, 0, 0, 0.08)
const elevatedShadow = shadowScale.elevated     // 0 20px 40px rgba(0, 0, 0, 0.15)
```

### Tailwind Shadow Classes
```html
<div class="shadow-soft">Soft shadow</div>
<div class="shadow-medium">Medium shadow</div>
<div class="shadow-elevated">Elevated shadow</div>
```

---

## 🚀 Performance Optimization

### GPU Accelerated Properties
Only animate these properties for 60 FPS:
- `transform` - Translate, rotate, scale
- `opacity` - Transparency changes

```typescript
// ✅ GOOD - Uses GPU acceleration
<motion.div animate={{ x: 100, opacity: 0.5 }} />

// ❌ AVOID - Causes repaints
<motion.div animate={{ width: 100, height: 100 }} />
```

### Monitor Animation Performance
```typescript
import { createAnimationPerformanceMonitor } from '@/utils/animations'

// Start monitoring (30 FPS target for mobile)
const stopMonitoring = createAnimationPerformanceMonitor(30, (fps) => {
  console.log(`Current FPS: ${fps}`)
})

// Stop monitoring when done
stopMonitoring()
```

---

## 📋 Common Patterns

### Responsive Component with Hooks
```typescript
function ResponsiveComponent() {
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePreferredReducedMotion()

  return (
    <div>
      {isMobile ? (
        <MobileLayout disableAnimations={prefersReducedMotion} />
      ) : (
        <DesktopLayout disableAnimations={prefersReducedMotion} />
      )}
    </div>
  )
}
```

### Responsive Grid with Automatic Classes
```typescript
function ProjectGrid({ projects }) {
  return (
    <div className={getGridClasses('card')}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

### Animated List with Stagger
```typescript
function AnimatedList({ items }) {
  return (
    <motion.ul
      variants={framerEntranceVariants.staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={framerEntranceVariants.staggerItem}>
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Accessible Animated Button
```typescript
function AnimatedButton() {
  const prefersReducedMotion = usePreferredReducedMotion()

  return (
    <motion.button
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
    >
      Click me
    </motion.button>
  )
}
```

---

## 🔍 Type Safety

All utilities are fully typed with TypeScript:

```typescript
import type { 
  Breakpoint, 
  DeviceType, 
  TypographyLevel, 
  SpacingScale,
  GridType 
} from '@/types'

// IDE autocomplete works for all utilities
const level: TypographyLevel = 'h1' // ✅ Type-safe
const spacing: SpacingScale = 'lg'  // ✅ Type-safe
```

---

## 📚 Additional Resources

- **Design System**: See `tailwind.config.js` for extended Tailwind configuration
- **Component Examples**: Check individual section components for implementation patterns
- **Type Definitions**: See `/src/types` directory for all TypeScript types
- **Test Examples**: See test files for usage patterns

---

## ⚡ Pro Tips

1. **Always use hooks for responsive logic** - React will handle re-renders efficiently
2. **Combine helper hooks** - `useIsMobile()` is cleaner than checking `useBreakpoint() === 'xs'`
3. **Respect reduced motion** - Always import and use `usePreferredReducedMotion()`
4. **Use spacing scale consistently** - Don't hardcode pixel values
5. **Leverage Tailwind classes** - Use responsive prefixes (`md:`, `lg:`) for simpler styling
6. **Monitor animation performance** - Use FPS monitor for performance-critical animations
7. **Tree-shake unused utilities** - Only import what you need

---

**Last Updated**: 2024
**Version**: 1.0.0
