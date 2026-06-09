# Sections Directory

This directory contains all the major homepage section components.

## Section Components

### 1. PositioningSection
- First major section after video transition
- Headline: "Engineering Attention Into Growth"
- Outcome-focused messaging (leads, visibility, sales)
- Responsive typography scaling

**Files:**
- `PositioningSection.tsx`

### 2. FeaturedWorkSection
- Showcase 3-5 past projects with case studies
- Project grid: 1 col mobile, 2 col desktop
- Hover animations and modal expansion
- Case study data structure

**Files:**
- `FeaturedWorkSection.tsx`
- `ProjectCard.tsx`

### 3. GrowthEcosystemSection
- 7 interconnected capabilities (SEO, GEO, Content, Branding, Websites, Social, Performance Marketing)
- Network diagram visualization
- Interactive hover states highlighting relationships
- Responsive layout simplification for mobile

**Files:**
- `GrowthEcosystemSection.tsx`
- `EcosystemNode.tsx`

### 4. AISectionAndGEO
- Forward-looking positioning ("The Future of Attention")
- AI and geolocation capabilities
- Staggered entrance animations
- 1 col mobile, 2 col tablet, 3+ col desktop

**Files:**
- `AISectionAndGEO.tsx`

### 5. ContentCreativeSection
- Gallery of campaigns, reels, production work
- Lazy loading for images/videos below fold
- Modal expansion with smooth transitions
- Masonry grid layout responsive to device

**Files:**
- `ContentCreativeSection.tsx`
- `ContentGalleryItem.tsx`

### 6. TestimonialsSection
- Client testimonials with social proof
- Carousel/grid display
- Desktop: 3-column or 1-at-a-time carousel
- Mobile: single column scrollable

**Files:**
- `TestimonialsSection.tsx`
- `TestimonialCard.tsx`

### 7. TeamSection
- Team member cards with expandable bios
- 2 col mobile, 2-3 col tablet, 3-4 col desktop
- Reveal animations on hover
- Social links and expertise badges

**Files:**
- `TeamSection.tsx`
- `TeamMemberCard.tsx`

### 8. FinalCTASection
- Prominent call-to-action
- Headline: "Let's Engineer Your Growth"
- Button: Minimum 48px mobile, 56px desktop
- Hover animations and premium spacing

**Files:**
- `FinalCTASection.tsx`

## Shared Components

All sections use:
- `Section.tsx` - Wrapper component with entrance animations
- `useBreakpoint()` hook for responsive behavior
- `usePreferredReducedMotion()` hook for accessibility
- Responsive typography utilities from `/src/utils/responsive.ts`

## Animation Library

- **GSAP**: Complex multi-step animations, scroll-triggered effects
- **Framer Motion**: Component-level animations, hover states, scroll detection

## Data Structure

Section components accept data props. Example structure:

```typescript
interface Project {
  id: number
  title: string
  clientContext: string
  challenge: string
  approach: string
  result: string
  imageUrl: string
  caseStudyUrl?: string
}

interface Testimonial {
  id: number
  quote: string
  clientName: string
  company: string
  role: string
  photo?: string
  result?: string
}

interface TeamMember {
  id: number
  name: string
  role: string
  photo: string
  bio: string
  expertise: string[]
  social?: {
    linkedin?: string
    twitter?: string
  }
}
```

## Styling Approach

- TailwindCSS for utility classes and responsive breakpoints
- CSS modules for component-specific styling (optional)
- Custom animations in `/src/styles/animations.css`
- Responsive typography from `/src/utils/responsive.ts`

## Accessibility

All sections must:
- Include semantic HTML (h1, h2, h3 hierarchy)
- Support keyboard navigation
- Maintain WCAG AA color contrast (4.5:1)
- Provide alt text for images
- Respect `prefers-reduced-motion` setting
- Include focus states for all interactive elements
