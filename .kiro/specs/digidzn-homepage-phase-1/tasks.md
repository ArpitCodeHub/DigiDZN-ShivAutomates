# Implementation Plan: DigiDZN Homepage Phase 1

## Overview

This implementation plan breaks down the DigiDZN Homepage Phase 1 feature into actionable coding tasks. The feature comprises a fullscreen video entry experience followed by a fully functional 8-section homepage with animations, lead capture, and responsive design. All tasks use TypeScript/React with Vite, TailwindCSS, Framer Motion, GSAP, and Supabase integration.

The implementation follows a layered approach: infrastructure setup → video experience → core homepage structure → individual sections → animations → forms → testing → optimization.

---

## Tasks

- [x] 1. Initialize Vite + React project with core dependencies
  - Set up new Vite React project with TypeScript template
  - Install TailwindCSS, Framer Motion, GSAP, Supabase client, and dev dependencies
  - Configure Vite optimization settings (minification, tree-shaking, code-splitting)
  - Configure development and production build scripts in package.json
  - _Requirements: 1.1, 2.1, 14.4, 14.5_

- [x] 2. Set up project structure and configuration
  - Create directory structure: `/src/components`, `/src/sections`, `/src/hooks`, `/src/utils`, `/src/styles`, `/public/videos`
  - Create `.env.example` and `.env.local` for Supabase credentials
  - Configure Supabase client initialization in `/src/utils/supabaseClient.ts`
  - Set up TailwindCSS configuration with custom breakpoints (375px, 768px, 1024px)
  - _Requirements: 1.1, 18.1, 18.3_

- [x] 3. Create responsive design utilities and hooks
  - Build custom `useBreakpoint()` hook to detect viewport changes (375px, 768px, 1024px)
  - Build custom `usePreferredReducedMotion()` hook to respect accessibility preference
  - Create responsive typography scale utilities (mobile, tablet, desktop sizes)
  - Build responsive spacing utilities following premium spacing guidelines
  - _Requirements: 13.1-13.6, 12.6_

- [x] 4. Create VideoEntry component with fullscreen video rendering
  - Build VideoEntry component that accepts `videoSrc` and `onVideoComplete` props
  - Implement fullscreen container (100vw × 100vh) with `position: fixed`
  - Add video element with autoplay, muted, playsInline attributes
  - Configure `object-fit: cover` for fullscreen coverage without letterboxing
  - Add video `ended` event listener that triggers parent callback
  - Implement state tracking to prevent video restart after transition trigger
  - _Requirements: 1.1-1.6, 2.1-2.6_

- [x] 5. Implement video transition animation with GSAP
  - Create TransitionOverlay component that manages GSAP timeline animation
  - Build 1.2s multi-step GSAP timeline:
    - Step 1: Fade out video (0.3s, opacity → 0)
    - Step 2: Scale up homepage content (0.6s, offset -0.1s)
    - Step 3: Fade in homepage (0.4s, offset -0.2s)
  - Implement input blocking during transition (disable scroll, clicks, keyboard)
  - Trigger callback on animation complete to set page to final state
  - _Requirements: 3.1, 3.2, 3.4, 3.5, 3.6_

- [x] 6. Build Homepage container component with section management
  - Create Homepage component as wrapper for all 8 sections
  - Implement state management for: `isVideoComplete`, `isTransitioning`, `leadFormOpen`, `leadData`
  - Build conditional rendering logic:
    - If not video complete → render VideoEntry
    - If transitioning → render VideoEntry + TransitionOverlay
    - If complete → render Homepage with sections
  - Set up scroll-triggered animation state management
  - Configure background gradient and overflow settings
  - _Requirements: 3.3, 13.1-13.6_

- [x] 7. Create reusable Section wrapper component with entrance animations
  - Build Section component that wraps each major section (Positioning, Featured Work, etc.)
  - Implement Framer Motion `useInView` hook for scroll-triggered animations
  - Add entrance animation variants (fade-in + translate-up) with 0.6s duration
  - Configure responsive padding: mobile 2rem, tablet 3rem, desktop 4rem
  - Implement `prefers-reduced-motion` support to disable animations when requested
  - _Requirements: 12.2, 12.6, 13.1-13.6_

- [-] 8. Build PositioningSection with outcome-focused messaging
  - Create PositioningSection component with headline "Engineering Attention Into Growth"
  - Add responsive typography:
    - Mobile: h1 28px, body 16px
    - Tablet: h1 44px, body 18px
    - Desktop: h1 56px, body 20px
  - Write outcome-focused copy emphasizing leads, visibility, sales (not services)
  - Apply Section wrapper for entrance animations
  - Implement premium spacing with max-width constraint
  - _Requirements: 4.1-4.6, 13.2, 13.3_

- [-] 9. Implement FeaturedWorkSection with project grid and animations
  - Create FeaturedWorkSection component with 3-5 project data structure
  - Build responsive grid: 1 col mobile, 1 col tablet, 2 col desktop
  - Implement ProjectCard sub-component with:
    - Project image, title, client context, challenge, approach, result
    - Hover state: scale 1.05 + shadow deepening
    - Framer Motion hover animation (0.3s ease-out)
  - Add staggered entrance animation (each card delays by 0.15s)
  - Implement modal or case-study link on click
  - _Requirements: 5.1-5.6_

- [-] 10. Create GrowthEcosystemSection with network visualization
  - Build GrowthEcosystemSection component with 7 interconnected nodes (SEO, GEO, Content, Branding, Websites, Social, Performance Marketing)
  - Implement network diagram or hub-and-spoke layout (not traditional cards)
  - Add hover/focus state that highlights node and its connections
  - Implement node highlight animation:
    - Hovered node: pulse effect + glow
    - Non-connected nodes: fade to 50% opacity
    - Connected nodes: full opacity, highlight color
  - Responsive layout: Full network on desktop, simplified circular layout on mobile
  - Add descriptions and relationship information on interaction
  - _Requirements: 6.1-6.6_

- [-] 11. Build AISectionAndGEO with innovation positioning
  - Create AISectionAndGEO component highlighting future-focused capabilities
  - Implement headline "The Future of Attention" with forward-looking messaging
  - Add body content explaining AI and geolocation contributions to growth
  - Use staggered entrance animations for headline, subheading, and supporting text
  - Implement responsive layout: 1 col mobile, 2 col tablet, 3 col desktop
  - Add optional feature grid or concept cards with hover animations
  - _Requirements: 7.1-7.6_

- [-] 12. Create ContentCreativeSection with gallery and lazy loading
  - Build ContentCreativeSection component with gallery grid layout
  - Implement responsive grid: 1 col mobile, 2 col tablet, 3 col desktop masonry
  - Add Intersection Observer for lazy loading images below the fold
  - Create ContentGalleryItem component with:
    - Thumbnail image or video preview
    - Hover animation: scale + overlay reveal
    - Click to expand modal view with full-size content
  - Implement modal expansion animation (0.4s ease-in-out)
  - Add video autoplay in modal (muted)
  - _Requirements: 8.1-8.6, 14.3_

- [-] 13. Build TestimonialsSection with carousel and interactions
  - Create TestimonialsSection component with client testimonial data
  - Implement carousel/grid layout:
    - Desktop: 3-column grid or 1-at-a-time carousel
    - Tablet: 2-column
    - Mobile: Single column scrollable
  - Create TestimonialCard component with quote, client name, company, role
  - Add hover animation: scale 1.02-1.05 + shadow increase (0.3s ease-out)
  - Implement keyboard navigation for carousel (arrow keys)
  - Add optional star rating display
  - _Requirements: 9.1-9.6_

- [-] 14. Build TeamSection with member cards and reveal animations
  - Create TeamSection component with team member grid
  - Implement responsive grid:
    - Mobile: 2 columns
    - Tablet: 2-3 columns
    - Desktop: 3-4 columns
  - Create TeamMemberCard component with:
    - Circular/square photo
    - Name, role
    - On hover: Smooth expand reveal of bio, expertise badges, social links
    - Reveal animation: 0.4s ease-out
  - Add accessible social link icons with aria-labels
  - Implement focus states for keyboard navigation
  - _Requirements: 10.1-10.6_

- [-] 15. Create FinalCTASection with prominent call-to-action
  - Build FinalCTASection component with large headline "Let's Engineer Your Growth"
  - Add subheading with brief value proposition or urgency message
  - Implement CTA button with:
    - Minimum 48px height on mobile, 56px desktop
    - High contrast background color
    - Hover animation: scale 1.05-1.1 + shadow + color shift (0.3s ease-out)
    - Active state feedback
  - Add `onClick` handler to trigger lead form modal opening
  - Implement premium spacing and background visual interest
  - _Requirements: 11.1-11.6_

- [~] 16. Create LeadFormModal component with validation
  - Build LeadFormModal component accepting form state handlers
  - Implement form fields: Name (required), Email (required), Company (optional), Message (optional)
  - Add real-time validation:
    - Name: non-empty, max 100 chars
    - Email: valid email format
    - Company: max 100 chars
    - Message: max 500 chars
  - Show validation error message on field blur if invalid (200ms feedback)
  - Show success checkmark on field blur if valid
  - Disable submit button until all required fields are valid
  - _Requirements: 18.1, 18.2_

- [~] 17. Implement Supabase lead submission integration
  - Integrate Supabase client for lead data insertion
  - Implement `handleSubmit` function that:
    - Creates lead object with name, email, company, message, source, timestamp
    - Sends POST request to Supabase `leads` table
    - Shows loading spinner during submission
    - Displays success message on completion (1s confirmation)
    - Displays error message and retry option on failure
  - Add error logging to monitoring service (console.error at minimum)
  - Prevent duplicate submissions (disable button during submission)
  - _Requirements: 18.3-18.6_

- [~] 18. Implement scroll-triggered section animations with ScrollTrigger
  - Integrate GSAP ScrollTrigger plugin for viewport-based animations
  - Build entrance animations for each section:
    - Trigger when section 50% visible
    - Fade-in + slight scale-up (0.5-0.7s ease-out)
    - Stagger child elements (cards, list items) by 0.1-0.15s
  - Configure animations to fire once on first scroll, not repeat
  - Implement GPU acceleration (transform, opacity only)
  - Test FPS maintenance during scroll animations
  - _Requirements: 12.2, 12.4, 12.5_

- [~] 19. Apply hover/interaction animations to all interactive elements
  - Add Framer Motion `whileHover` animations to all buttons, links, cards
  - Implement consistent animation patterns:
    - Scale: 1.02-1.05 depending on element
    - Shadow: increase box-shadow on hover
    - Color shift: subtle color transitions
    - Duration: 0.3s ease-out for all hover states
  - Implement focus states for keyboard navigation (visible focus ring)
  - Add active states for button clicks (scale down slightly)
  - _Requirements: 12.1, 12.2, 12.4_

- [~] 20. Configure environment variables and Supabase setup
  - Create `.env.local` with Supabase URL and API key
  - Verify Supabase project has `leads` table with correct schema
  - Test Supabase client connection from React app
  - Configure CORS settings in Supabase if needed
  - Document all required environment variables in README
  - _Requirements: 1.1, 18.1_

- [~] 21. Test video entry experience across browsers and devices
  - Test video playback on Chrome, Firefox, Safari, Edge (last 2 versions)
  - Verify autoplay + muted behavior on all browsers
  - Test fullscreen scaling on iOS (Safari) and Android (Chrome)
  - Verify video aspect ratio coverage without letterboxing
  - Test video restart prevention after transition triggered
  - Verify transition animation completes within 1.2s
  - _Requirements: 1.1-1.6, 2.1-2.6, 3.1-3.6, 15.1-15.5_

- [~] 22. Test responsive layout across all breakpoints
  - Test layout at 375px, 480px, 768px, 1024px, 1440px, 2560px
  - Verify column counts adjust correctly for grids
  - Verify typography scaling maintains readability at all sizes
  - Test touch targets are minimum 48px on mobile
  - Test form inputs are usable on touch devices
  - Verify no horizontal scrolling on any breakpoint
  - _Requirements: 13.1-13.6_

- [~] 23. Verify accessibility compliance
  - Verify WCAG AA color contrast (4.5:1 for normal text, 3:1 for large text)
  - Test keyboard navigation (Tab, Enter, Shift+Tab)
  - Verify all interactive elements have visible focus rings
  - Add descriptive alt text to all images (minimum 10 chars, meaningful)
  - Verify heading hierarchy (h1→h2→h3 with no skips)
  - Test with `prefers-reduced-motion: reduce` enabled
  - Verify form labels associated with inputs via `<label>` or aria-label
  - _Requirements: 17.1-17.6_

- [~] 24. Add SEO meta tags and structured data
  - Add meta title, description, keywords tags in `<head>`
  - Implement Open Graph tags (og:title, og:description, og:image, og:url)
  - Add Twitter Card tags for social sharing
  - Implement JSON-LD structured data for Organization schema
  - Verify semantic HTML markup (header, main, section, article tags)
  - Test crawlability with `robots.txt` and `sitemap.xml`
  - _Requirements: 16.1-16.6_

- [~] 25. Optimize video asset and images
  - Compress hero video to MP4 format (H.264, AAC audio)
  - Create alternative WebM format for browser compatibility
  - Target video file size < 10MB for 4G delivery
  - Optimize all hero images (WebP with JPG fallback)
  - Implement responsive image srcset for different screen densities
  - Configure lazy loading for below-the-fold images
  - _Requirements: 14.1, 14.3_

- [~] 26. Code-split sections with dynamic imports
  - Implement dynamic imports for each major section component
  - Use Vite's dynamic import syntax: `import('./components/Section')`
  - Configure chunk size optimization to keep chunks < 100KB
  - Verify all chunks load correctly during scroll
  - Monitor bundle size with Vite plugin (vite-plugin-visualizer)
  - _Requirements: 14.4_

- [~] 27. Checkpoint - Verify all components render correctly
  - Ensure all 8 sections render without errors
  - Check console for no TypeScript or React errors
  - Verify video entry → homepage transition completes smoothly
  - Check responsive layout at 3+ breakpoints
  - Ensure lead form modal opens and closes properly
  - Ask user if any components need adjustment before proceeding to testing

- [~] 28. Write unit tests for VideoEntry component
  - Test video element renders with correct attributes (autoplay, muted, playsInline)
  - Test video fullscreen container styling (100vw × 100vh)
  - Test video `ended` event triggers `onVideoComplete` callback
  - Test video element does not restart after transition triggered
  - _Requirements: 2.1-2.6_

- [~] 29. Write unit tests for TransitionOverlay component
  - Test GSAP timeline executes with correct duration (1.2s total)
  - Test animation sequence: fade out video → scale homepage → fade in
  - Test animation completes and calls completion callback
  - Test user input is blocked during transition
  - _Requirements: 3.1-3.6_

- [~] 30. Write unit tests for form validation logic
  - Test name field: accepts non-empty strings, rejects empty, respects max 100 chars
  - Test email field: validates email format, rejects invalid emails
  - Test company field: accepts optional, respects max 100 chars
  - Test message field: accepts optional, respects max 500 chars
  - Test submit button: disabled until all required fields valid, enables on valid input
  - _Requirements: 18.2, 18.5_

- [~] 31. Write integration tests for lead form submission
  - Test form submission with valid data → Supabase insert succeeds
  - Test success message displays after submission
  - Test error message displays if Supabase request fails
  - Test retry button allows resubmission after error
  - Test form closes after successful submission
  - _Requirements: 18.3-18.6_

- [~] 32. Write property tests for responsive behavior
  - Test video entry maintains fullscreen coverage at 50+ random viewport widths (375px–2560px)
  - Test grid column count adjusts correctly: 1 col <768px, 2 col 768–1023px, 3+ col 1024px+
  - Test typography scales proportionally: smaller on mobile, larger on desktop
  - Test touch targets minimum 48px on mobile at 20+ test sizes
  - _Requirements: 13.1-13.6, 2.4_

- [~] 33. Write property tests for animation timing
  - Test transition animation completes within 1.2s ± 50ms across 100+ runs
  - Test entrance animations stay within 0.3–0.8s duration at 50+ viewport sizes
  - Test scroll-triggered animations trigger within 200ms of threshold
  - Test FPS does not drop below 30 (mobile) or 45 (desktop) during animations
  - _Requirements: 12.4, 12.5, 3.4, 5.4_

- [~] 34. Write property tests for form validation
  - Test email validation with 100+ random valid/invalid email inputs
  - Test name validation with 50+ special characters and edge cases
  - Test company field accepts and rejects inputs correctly
  - Test message field respects 500 char limit with unicode characters
  - _Requirements: 18.2, 18.5_

- [~] 35. Write property tests for color contrast accessibility
  - Test text elements maintain 4.5:1 contrast at 100+ random color combinations
  - Test graphical elements maintain 3:1 contrast
  - Test focus ring contrast is sufficient for visibility
  - _Requirements: 17.5_

- [~] 36. Write property tests for heading hierarchy
  - Test document contains exactly 1 h1 tag
  - Test all h2 tags are children of h1 context, no h2 orphans
  - Test no heading hierarchy skips (no h3 without h2 parent, etc.)
  - _Requirements: 16.4_

- [~] 37. Checkpoint - Run full test suite and verify coverage
  - Run all unit tests → pass with 100% component coverage
  - Run all integration tests → pass lead form submission end-to-end
  - Run all property tests → pass across minimum 100 iterations per property
  - Verify no critical errors in test output
  - Ask user if any test failures need resolution before optimization

- [~] 38. Run Lighthouse audit and analyze results
  - Run Lighthouse on desktop (target 80+ score)
  - Run Lighthouse on mobile (target 70+ score)
  - Identify performance bottlenecks (slow sections, large assets)
  - Identify accessibility issues (color contrast, focus states, alt text)
  - Document findings for optimization phase
  - _Requirements: 14.6_

- [~] 39. Optimize bundle size and code-splitting
  - Analyze bundle with vite-plugin-visualizer
  - Identify largest dependencies (GSAP, Framer Motion, unused code)
  - Tree-shake unused GSAP/Framer Motion features
  - Code-split sections into separate chunks
  - Target final bundle < 100KB (gzipped)
  - _Requirements: 14.4, 14.5_

- [~] 40. Test page load performance on 4G network
  - Simulate 4G connection in browser DevTools
  - Measure Time to First Byte (TTFB)
  - Measure First Contentful Paint (FCP)
  - Verify page fully interactive within 3s on 4G
  - Identify and optimize slow assets
  - _Requirements: 14.2_

- [~] 41. Test browser compatibility across all target browsers
  - Test Chrome (latest 2 versions): video, animations, forms
  - Test Firefox (latest 2 versions): video, animations, forms
  - Test Safari (latest 2 versions): video, animations, forms
  - Test Edge (latest 2 versions): video, animations, forms
  - Document any browser-specific issues and workarounds
  - _Requirements: 15.1-15.5_

- [~] 42. Verify animation performance (60 FPS desktop, 30+ FPS mobile)
  - Use Chrome DevTools Performance tab to record animations
  - Verify GPU acceleration with `transform` and `opacity` properties
  - Check frame rate stays above 60 FPS on desktop
  - Check frame rate stays above 30 FPS on mobile
  - Identify and optimize any janky animations
  - _Requirements: 12.5, 14.5_

- [~] 43. Test `prefers-reduced-motion` accessibility feature
  - Enable `prefers-reduced-motion: reduce` in OS settings
  - Verify all animations are disabled (instant, no delays)
  - Verify content is still accessible without animations
  - Test form submission works with reduced motion
  - _Requirements: 12.6, 17.4_

- [~] 44. Final integration test - Simulate complete user journey
  - User arrives on homepage → sees video entry experience
  - Video plays for full duration → transitions to homepage
  - User scrolls through all 8 sections → animations trigger on scroll
  - Hover over interactive elements → hover animations trigger
  - Click CTA button → lead form modal opens
  - Fill form with valid data → submit → see success message
  - Verify Supabase has new lead record
  - _Requirements: All_

- [~] 45. Final checkpoint - Complete feature verification
  - All visual sections render correctly
  - All animations smooth and performant
  - All form functionality working
  - All tests passing
  - Accessibility compliance verified
  - SEO metadata present
  - Performance targets met (< 3s load, 80+ Lighthouse desktop)
  - Ask user for final approval before deployment preparation

- [~] 46. Prepare deployment configuration
  - Create production environment variables (`.env.production`)
  - Configure Supabase for production (security rules, constraints)
  - Set up error logging/monitoring service (Sentry or console.error)
  - Create deployment checklist and runbook
  - Document form submission error handling and support process
  - _Requirements: 11.1, 18.1_

- [~] 47. Document API integration and form submission flow
  - Write API documentation for Supabase `leads` table schema
  - Document lead submission endpoint and request/response format
  - Document error codes and handling strategies
  - Create user guide for form error scenarios
  - Document how to access submitted leads in Supabase dashboard
  - _Requirements: 11.1, 11.2_

- [~] 48. Create deployment and rollback procedures
  - Document step-by-step deployment process
  - Create automated deployment script (if applicable)
  - Document how to verify deployment succeeded
  - Create rollback procedure if issues arise
  - Set up monitoring for production errors
  - _Requirements: 11.1_

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery. These are primarily advanced testing tasks.
- All property tests must run minimum 100 iterations to ensure comprehensive coverage.
- Each task references specific requirements for traceability to requirements document.
- Checkpoint tasks (27, 37, 45) serve as validation gates before proceeding to next phase.
- Video asset (hero-digidzn.mp4) must be optimized before deployment (target < 10MB).
- All animations respect `prefers-reduced-motion` media query for accessibility.
- Form validation provides real-time feedback within 200ms of blur event.
- Color contrast must be verified manually with WCAG AA standards (4.5:1 for text).
- Keyboard navigation must be tested on all interactive elements (Tab key).

---

## Task Dependency Graph

The following JSON defines execution waves for parallel task scheduling. Tasks within the same wave are independent and can run in parallel. Tasks in later waves depend on earlier waves.

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1", "2", "3"],
      "description": "Project initialization and configuration"
    },
    {
      "id": 1,
      "tasks": ["4", "5", "6", "7"],
      "description": "Core components: VideoEntry, Transition, Homepage, Section wrapper"
    },
    {
      "id": 2,
      "tasks": ["8", "9", "10", "11", "12", "13", "14", "15"],
      "description": "All 8 section components"
    },
    {
      "id": 3,
      "tasks": ["16", "17"],
      "description": "Lead form and Supabase integration"
    },
    {
      "id": 4,
      "tasks": ["18", "19", "20"],
      "description": "Animations, interactions, environment setup"
    },
    {
      "id": 5,
      "tasks": ["21", "22", "23", "24", "25"],
      "description": "Browser testing, responsive testing, accessibility, SEO, optimization"
    },
    {
      "id": 6,
      "tasks": ["26", "27"],
      "description": "Code-splitting and component rendering checkpoint"
    },
    {
      "id": 7,
      "tasks": ["28", "29", "30", "31"],
      "description": "Unit and integration tests"
    },
    {
      "id": 8,
      "tasks": ["32", "33", "34", "35", "36"],
      "description": "Property-based tests"
    },
    {
      "id": 9,
      "tasks": ["37", "38", "39", "40", "41", "42", "43"],
      "description": "Test checkpoint, Lighthouse audit, performance optimization, compatibility testing"
    },
    {
      "id": 10,
      "tasks": ["44"],
      "description": "Complete user journey integration test"
    },
    {
      "id": 11,
      "tasks": ["45", "46", "47", "48"],
      "description": "Final checkpoint, deployment preparation, documentation"
    }
  ]
}
```

---

## Implementation Flow Summary

### Phase 1: Infrastructure (Wave 0)
1. Set up Vite project with all dependencies
2. Create directory structure and configuration files
3. Build utility hooks and responsive design infrastructure

### Phase 2: Core Components (Waves 1-2)
4. Implement VideoEntry component and transition animation
5. Build Homepage container and Section wrapper
6. Create all 8 section components with content and layouts

### Phase 3: Interactions & Forms (Wave 3)
7. Implement form validation and Supabase integration
8. Wire form submission to backend

### Phase 4: Polish & Testing (Waves 4-6)
9. Add scroll-triggered animations and hover effects
10. Configure environment variables
11. Test across browsers, devices, responsive breakpoints

### Phase 5: Verification (Waves 7-11)
12. Write comprehensive unit, integration, and property tests
13. Run Lighthouse audit and performance testing
14. Optimize bundle size and load time
15. Run final user journey integration test
16. Deploy and document

---

## Acceptance Criteria Mapping

This task list ensures all requirements are addressed:

- **Req 1-3**: Tasks 4, 5, 21 (Video entry and transition)
- **Req 4-11**: Tasks 8-15 (All 8 sections)
- **Req 12**: Tasks 18-19 (Animations)
- **Req 13**: Tasks 22, 32 (Responsive design and testing)
- **Req 14**: Tasks 25, 26, 39, 40 (Performance)
- **Req 15**: Task 41 (Browser compatibility)
- **Req 16**: Task 24 (SEO)
- **Req 17**: Tasks 23, 35, 43 (Accessibility)
- **Req 18**: Tasks 16-17, 31 (Lead generation)

All property-based testing (Properties 1-20) are covered in tasks 32-36.
