# DigiDZN Homepage Phase 1 - Design Document

## Overview

The DigiDZN Homepage Phase 1 is a premium, immersive digital experience built with React, Vite, TailwindCSS, Framer Motion, GSAP, and Supabase. The solution comprises two integrated components:

1. **Video Entry Experience**: A fullscreen, immersive video that creates brand awareness and curiosity before the user enters the main experience.
2. **Homepage**: A fully functional, conversion-focused landing page organized into 8 distinct sections that build trust, showcase work, and generate leads.

The design emphasizes **outcome-focused messaging**, **premium visual hierarchy**, **smooth intentional motion**, and **mobile-first responsiveness**. All animations maintain 60 FPS performance on desktop and 30+ FPS on mobile while respecting accessibility preferences.

---

## Architecture

### System-Level Architecture

The application follows a single-entry-point architecture where the video entry experience gates access to the homepage. The flow transitions seamlessly from fullscreen video to scrollable homepage content.

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser Window                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          App Root (React Component)                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │ State Management (useState)                 │   │   │
│  │  │ - isVideoComplete: boolean                  │   │   │
│  │  │ - isTransitioning: boolean                  │   │   │
│  │  │ - leadFormOpen: boolean                     │   │   │
│  │  │ - leadData: object                          │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  │                                                       │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │ Conditional Rendering                       │   │   │
│  │  │ IF !isVideoComplete: <VideoEntry />         │   │   │
│  │  │ ELSE IF isTransitioning: <Transition />     │   │   │
│  │  │ ELSE: <Homepage />                          │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── VideoEntry (conditional render)
│   ├── VideoElement
│   └── TransitionTrigger (state management)
├── TransitionOverlay (conditional render, GSAP timeline)
└── Homepage (conditional render)
    ├── PositioningSection
    ├── FeaturedWorkSection
    │   └── ProjectCard[] (with hover animations)
    ├── GrowthEcosystemSection
    │   └── EcosystemNode[] (with interaction states)
    ├── AISectionAndGEO
    ├── ContentCreativeSection
    │   └── ContentGallery (with lazy loading)
    ├── TestimonialsSection
    │   └── TestimonialCarousel
    ├── TeamSection
    │   └── TeamMemberCard[]
    ├── FinalCTASection
    │   └── LeadFormModal (conditionally rendered)
    ├── Footer
    └── Navigation (sticky, mobile-responsive)
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Application State                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  useState Management:                                        │
│  ├── isVideoComplete → triggers transition                  │
│  ├── isTransitioning → locks user input, shows overlay     │
│  ├── leadFormOpen → controls form visibility               │
│  └── leadData → form field values                          │
│                                                               │
│  Effects & Event Handlers:                                  │
│  ├── useEffect: video end listener                         │
│  ├── useEffect: scroll detection for animations            │
│  ├── useEffect: window resize for responsive state         │
│  └── useEffect: prefers-reduced-motion listener            │
│                                                               │
│  External Integrations:                                     │
│  ├── Supabase Client: lead submission                      │
│  ├── Window/DOM APIs: video playback, scroll               │
│  └── localStorage: user preferences (optional)             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Animation Architecture

Two complementary motion libraries provide comprehensive animation coverage:

**GSAP (GreenSock Animation Platform):**
- Timeline sequences (video→homepage transition)
- Complex, multi-step animations
- Precise control over easing and timing
- Fallback animations for unsupported Framer Motion features

**Framer Motion:**
- Component-level entrance animations
- Scroll-triggered animations (useInView hook)
- Hover/focus interactions
- Gesture animations (optional swipe on carousel)

---

## Components and Interfaces

### 1. VideoEntry Component

**Purpose**: Displays a fullscreen video that acts as the entry gateway to the homepage.

**Structure**:
```jsx
<VideoEntry
  videoSrc="hero-digidzn.mp4"
  onVideoComplete={() => setIsVideoComplete(true)}
/>
```

**Key Props**:
- `videoSrc` (string): Path to the video asset
- `onVideoComplete` (function): Callback when video ends

**Key Features**:
- Fullscreen container (100vw × 100vh)
- No scrollbar or UI overlays
- Autoplay, muted, inline playback
- object-fit: cover to maintain aspect ratio
- Responsive scaling for all device sizes

**State Management**:
- Listens to `ended` event on video element
- Triggers parent callback on video completion
- Prevents restart if transition already triggered

**CSS Classes**:
```css
.video-entry-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

---

### 2. TransitionOverlay Component

**Purpose**: Manages the animated transition from video to homepage using GSAP.

**Behavior**:
- Overlays homepage content while animation plays
- Creates visual continuity between video and homepage
- Blocks user input during transition (1.2s max)
- Uses GSAP timeline for multi-step animation sequence

**GSAP Timeline Sequence** (1.2s total):
1. Fade out video → opacity: 0 (0.3s)
2. Scale up homepage content → scale: 1 (0.6s, offset: 0.2s)
3. Fade in homepage → opacity: 1 (0.4s, offset: 0.5s)
4. Remove overlay, enable input (end of timeline)

**Code Example**:
```jsx
useEffect(() => {
  if (isTransitioning && transitionRef.current) {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      },
    });

    tl.to(".video-entry-container", {
      opacity: 0,
      duration: 0.3,
      pointerEvents: "none",
    })
      .to(".homepage", {
        opacity: 1,
        scale: 1,
        duration: 0.6,
      }, "-=0.1")
      .to(".transition-overlay", {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      }, "-=0.2");
  }
}, [isTransitioning]);
```

---

### 3. Homepage Component

**Purpose**: Container component that wraps all 8 homepage sections.

**Structure**:
```jsx
<Homepage>
  <PositioningSection />
  <FeaturedWorkSection />
  <GrowthEcosystemSection />
  <AISectionAndGEO />
  <ContentCreativeSection />
  <TestimonialsSection />
  <TeamSection />
  <FinalCTASection />
  <Footer />
</Homepage>
```

**Responsibilities**:
- Manages scroll-triggered animation states
- Handles responsive layout adjustments
- Coordinates lead form state
- Detects prefers-reduced-motion preference

**CSS Layout**:
```css
.homepage {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(to bottom, #ffffff, #f9f9f9);
}

section {
  width: 100%;
  padding: 4rem 2rem; /* Mobile: 2rem, Tablet: 3rem, Desktop: 4rem */
}

@media (min-width: 768px) {
  section {
    padding: 6rem 3rem;
  }
}

@media (min-width: 1024px) {
  section {
    padding: 8rem 4rem;
  }
}
```

---

### 4. PositioningSection Component

**Purpose**: The first major section that establishes DigiDZN's core value proposition.

**Content Structure**:
- Large headline: "Engineering Attention Into Growth"
- Subheading: Emphasizes outcomes (leads, visibility, sales)
- Supporting body text: Outcome-focused messaging

**Responsive Typography**:
- Mobile (375px+): h1 = 28px, body = 16px, line-height = 1.6
- Tablet (768px+): h1 = 44px, body = 18px, line-height = 1.8
- Desktop (1024px+): h1 = 56px, body = 20px, line-height = 1.8

**Animation**:
- Entrance: Fade-in + slight translate-up when section enters viewport
- Duration: 0.6s ease-out
- Trigger: Framer Motion useInView (threshold: 0.3)

**Code Example**:
```jsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });

return (
  <motion.section
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <h1>Engineering Attention Into Growth</h1>
    <p>We focus on outcomes: more leads, greater visibility, increased sales.</p>
  </motion.section>
);
```

---

### 5. FeaturedWorkSection Component

**Purpose**: Showcase 3-5 past projects with compelling results and visuals.

**Data Structure** (from props or API):
```javascript
{
  projects: [
    {
      id: 1,
      title: "Project Name",
      clientContext: "Client situation",
      challenge: "Business challenge",
      approach: "Our solution",
      result: "Measurable outcome (e.g., +150% leads)",
      imageUrl: "project-image.jpg",
      caseStudyUrl: "/case-studies/1"
    },
    // ... 3-5 projects
  ]
}
```

**Layout**:
- Desktop: 2-column grid with staggered animation
- Tablet: 1 column, full width
- Mobile: Single column, scrollable

**Interactions**:
- Hover (desktop): Reveal additional details (challenge, approach)
- Animation: Scale + shadow increase on hover
- Modal: Click to expand or navigate to full case study

**Animation Details**:
```jsx
// Project card entrance animation
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Hover animation
const hoverVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 },
  },
};
```

---

### 6. GrowthEcosystemSection Component

**Purpose**: Visualize the interconnected system of 7 core capabilities.

**Components**:
- SEO
- GEO (Geolocation)
- Content Marketing
- Branding
- Websites
- Social Media
- Performance Marketing

**Visual Approach**:
- Network diagram or flow visualization (not traditional cards)
- Center hub with radial connections
- Interactive hover states that highlight relationships
- Color-coded by capability type

**Layout**:
- Desktop: Full network diagram with interactive overlays
- Tablet: Simplified network, larger touch targets
- Mobile: Vertical flow or circular layout adapted for 375px width

**Interactive Features**:
- Hover/focus: Highlight node and its connections
- Animation: Pulse effect on hovered node, fade non-related nodes
- Duration: 0.4s for highlight transitions

**Data Structure**:
```javascript
const ecosystemNodes = [
  {
    id: 1,
    name: "SEO",
    description: "Search visibility",
    connections: [4, 5], // Connected to GEO and Content
    color: "#1a73e8",
  },
  // ... 7 nodes total
];
```

---

### 7. AISectionAndGEO Component

**Purpose**: Highlight DigiDZN's forward-looking approach to AI and geolocation.

**Content**:
- Headline: Forward-looking positioning ("The Future of Attention")
- Subheading: AI and GEO capabilities
- Body: Business outcomes focus (not technical jargon)
- Visual: Animated graphics or illustrations

**Animations**:
- Entrance: Staggered reveal of elements
- Interactions: Hover over key concepts to reveal details
- Duration: 0.5–0.7s per element

**Responsive Behavior**:
- Mobile: Stack content vertically, simplify visuals
- Tablet: Two-column layout with flexible sizing
- Desktop: Three-column or custom grid layout

---

### 8. ContentCreativeSection Component

**Purpose**: Showcase creative campaigns, reels, and production work.

**Layout**:
- Desktop: 3-column masonry gallery
- Tablet: 2-column grid
- Mobile: Single-column scrollable

**Features**:
- Lazy loading for images/videos (below fold)
- Modal expansion for detailed view
- Smooth transition to expanded state (0.4s ease-in-out)
- Video autoplay in modal (muted)

**Data Structure**:
```javascript
{
  contentItems: [
    {
      id: 1,
      type: "video", // or "image"
      src: "content-url",
      thumbnail: "thumb-url",
      title: "Campaign Name",
      description: "Campaign overview",
    },
    // ... multiple items
  ]
}
```

**Performance Optimization**:
- Lazy load images using Intersection Observer
- Video thumbnails instead of autoplay on grid
- Optimized image formats (WebP with JPG fallback)
- Progressive loading with skeleton loaders

---

### 9. TestimonialsSection Component

**Purpose**: Build trust through client social proof.

**Format**:
- Clean card layout with quote, client name, company, title
- Premium spacing (generous margins, breathing room)
- Optional: Star rating or metrics

**Carousel/Grid**:
- Desktop: 3-column grid or 1-at-a-time carousel
- Tablet: 2-column or full-width
- Mobile: Single-column vertical scroll or carousel with swipe

**Interactions**:
- Hover: Scale (1.02–1.05), shadow deepens
- Animation: Scale 0.3s ease-out
- Focus: Keyboard navigation with visible focus ring (WCAG AA)

**Data Structure**:
```javascript
{
  testimonials: [
    {
      id: 1,
      quote: "Powerful quote about results",
      clientName: "Jane Doe",
      company: "Acme Corp",
      role: "CMO",
      photo: "avatar-url",
      result: "Optional: +250% leads",
    },
    // ... multiple testimonials
  ]
}
```

---

### 10. TeamSection Component

**Purpose**: Humanize the brand by showcasing team members.

**Layout**:
- Desktop: 3+ column grid
- Tablet: 2-column grid
- Mobile: 2-column grid (responsive down to 375px)

**Card Details**:
- Photo (circular or square)
- Name, role
- On hover: Reveal bio, expertise, social links
- Animation: Expand reveal with smooth transition (0.4s)

**Data Structure**:
```javascript
{
  teamMembers: [
    {
      id: 1,
      name: "John Smith",
      role: "Creative Director",
      photo: "photo-url",
      bio: "Seasoned designer with 10+ years...",
      expertise: ["Design", "Brand", "UX"],
      social: { linkedin: "url", twitter: "url" },
    },
    // ... multiple team members
  ]
}
```

**Responsive Behavior**:
- Mobile (375px–767px): 2 columns
- Tablet (768px–1023px): 2–3 columns
- Desktop (1024px+): 3–4 columns

---

### 11. FinalCTASection Component

**Purpose**: Convert visitors into leads with a compelling call-to-action.

**Content**:
- Large headline: "Let's Engineer Your Growth" (or similar)
- Subheading: Brief value prop or urgency message
- CTA Button: High contrast, prominent sizing

**Button Specifications**:
- Minimum height: 48px on mobile, 56px on desktop
- Text: Action-oriented ("Get Started", "Schedule Consultation", etc.)
- Hover state: Scale (1.05–1.1), color shift, shadow increase
- Animation: GSAP or Framer Motion, 0.3s ease-out

**On Click**:
- Trigger lead form modal
- Or redirect to external form/tool (Calendly, Typeform, etc.)
- Disable button while submission in progress

**Data Submission Flow**:
```
User clicks CTA
    ↓
Lead form modal opens (or external redirect)
    ↓
User enters: Name, Email, Message, Company
    ↓
Form validates (real-time feedback on errors)
    ↓
User submits
    ↓
Data sent to Supabase via client library
    ↓
Confirmation message displayed
    ↓
(Optional) Redirect to thank-you page
```

---

### 12. LeadFormModal Component

**Purpose**: Capture lead information with validation and error handling.

**Form Fields**:
1. Name (required, text)
2. Email (required, email)
3. Company (optional, text)
4. Message/Notes (optional, textarea)

**Validation Rules**:
- Name: non-empty, max 100 characters
- Email: valid email format
- Company: max 100 characters
- Message: max 500 characters

**Real-time Feedback**:
- Show error message immediately when field loses focus (invalid state)
- Show success checkmark when field becomes valid
- Disable submit button until all required fields are valid

**Submission**:
- POST to Supabase with timestamp and source
- Show loading spinner during submission
- Display success message or error recovery on failure

**Code Example**:
```jsx
const handleSubmit = async (formData) => {
  try {
    setIsSubmitting(true);
    const response = await supabase
      .from("leads")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          source: "homepage-cta",
          created_at: new Date().toISOString(),
        },
      ]);
    
    if (response.error) throw response.error;
    
    setSubmitSuccess(true);
    // Show confirmation message for 3 seconds
    setTimeout(() => setLeadFormOpen(false), 3000);
  } catch (error) {
    setSubmitError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Data Models

### Lead Schema (Supabase)

```sql
CREATE TABLE leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  source TEXT DEFAULT 'homepage-cta',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  contact_status TEXT DEFAULT 'new'
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

### Project/Content Data Structure

Projects and testimonials are initially seeded as static data within the React component but can be migrated to Supabase for dynamic management:

```javascript
// Current: Static data in component
const projects = [
  {
    id: 1,
    title: "Client Project Name",
    clientContext: "Situation",
    challenge: "Business challenge",
    approach: "Solution description",
    result: "+250% lead increase",
    imageUrl: "/images/project-1.jpg",
  },
];

// Future: Fetch from Supabase
const { data: projects } = await supabase
  .from("projects")
  .select("*");
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is a rich interactive experience with complex state management, responsive behavior, and animation logic. Property-based testing is highly applicable to verify correctness across varying inputs (device sizes, animation timings, form inputs, network conditions, etc.).

### Property 1: Video Entry Transition Logic

*For any* video element that has completed playback, the system SHALL transition to the homepage within 1.2 seconds and display the homepage as fully interactive.

**Validates: Requirements 3.1, 3.4, 3.6**

### Property 2: Responsive Video Fullscreen Behavior

*For any* viewport width (375px to 2560px+), the video element SHALL occupy 100% of the viewport (100vw × 100vh) without letterboxing or pillarboxing, maintaining proper aspect ratio coverage.

**Validates: Requirements 1.6, 2.4**

### Property 3: Video Looping State Management

*For any* video end event where the transition has not been triggered, the video SHALL automatically restart and loop; conversely, if transition has been triggered, the video SHALL not restart.

**Validates: Requirements 2.5, 2.6**

### Property 4: User Input Disabled During Transition

*For any* user interaction (click, scroll, keyboard input) that occurs while the transition animation is playing (0–1.2s window), the input SHALL be completely ignored and not affect the page state.

**Validates: Requirement 3.5**

### Property 5: Animation Duration Constraints

*For any* animation applied to page elements, the duration SHALL be between 0.3–0.8 seconds for standard interactions or 1–1.2 seconds for major transitions. No animation SHALL exceed 1.2 seconds.

**Validates: Requirements 12.4**

### Property 6: Scroll-Triggered Section Animations

*For any* section that enters the viewport (from below), a fade-in and scale entrance animation SHALL trigger within 200ms of crossing the viewport threshold (50% visibility).

**Validates: Requirements 5.4, 12.2**

### Property 7: Responsive Grid Column Adjustment

*For any* grid-based layout (projects, team, testimonials), the number of columns SHALL adjust correctly based on viewport width: 1 column on mobile (<768px), 2 columns on tablet (768px–1023px), 3+ columns on desktop (1024px+).

**Validates: Requirements 13.4, 10.6, 9.4**

### Property 8: Responsive Typography Scaling

*For any* viewport width below 768px, headline and body typography sizes SHALL be proportionally smaller than desktop sizes while maintaining readability (minimum font size: 14px body text, 20px headlines on mobile).

**Validates: Requirements 13.2, 4.5**

### Property 9: Touch Target Sizing

*For any* interactive element (button, link, form input) on mobile devices, the clickable/touchable area SHALL be at least 48px × 48px to accommodate finger touch without errors.

**Validates: Requirement 13.5**

### Property 10: Hover State Animations

*For any* interactive element (project cards, team cards, testimonials, buttons) where a user hovers with a mouse, a smooth scale or shadow animation SHALL apply within 0.3 seconds.

**Validates: Requirements 5.5, 9.5, 10.4, 11.4**

### Property 11: Prefers-Reduced-Motion Respect

*For any* user who has set `prefers-reduced-motion: reduce` in their OS accessibility settings, all non-essential animations SHALL be disabled, and content SHALL display instantly (duration: 0s) without animation delays.

**Validates: Requirement 12.6**

### Property 12: Form Validation Real-Time Feedback

*For any* form field input (name, email, company, message), invalid entries SHALL receive real-time validation feedback within 200ms of the blur event, and the submit button SHALL remain disabled until all required fields are valid.

**Validates: Requirement 18.5**

### Property 13: Lead Form Submission Round-Trip

*For any* valid lead submission (non-empty name and email), submitting the form SHALL result in the data being stored in Supabase with a timestamp, and a confirmation message SHALL be displayed to the user within 1 second of submission completion.

**Validates: Requirement 18.4**

### Property 14: Lazy Loading Performance

*For any* images positioned below the viewport (below-the-fold content), lazy loading SHALL defer their download until the image enters within 300px of the viewport, improving initial page load time without visible degradation.

**Validates: Requirement 14.3**

### Property 15: Page Load Performance

*For any* page load on a 4G connection, the initial interactive page (video + first section visible) SHALL be fully rendered and interactive within 3 seconds from initial request.

**Validates: Requirement 14.2**

### Property 16: FPS Maintenance During Animation

*For any* animation playing on desktop (with 60 FPS target) or mobile (30+ FPS target), the frame rate SHALL not drop below these thresholds when using GPU-accelerated CSS properties (transform, opacity).

**Validates: Requirement 12.5**

### Property 17: Heading Hierarchy Consistency

*For any* page heading (h1, h2, h3), headings SHALL follow a strict hierarchy where h1 contains the main page theme, h2 sections are children of h1, and h3 subsections are children of h2, with no skipped levels.

**Validates: Requirement 16.4**

### Property 18: Alt Text Presence

*For any* image or visual content on the page, an alt attribute or descriptive aria-label SHALL be present and describe the image/content meaningfully (minimum 10 characters, not generic "image").

**Validates: Requirement 17.2**

### Property 19: Color Contrast Compliance

*For any* text element, the color contrast ratio between text and background SHALL meet WCAG AA standards: 4.5:1 for normal text (12px+), 3:1 for large text (18px+), and 3:1 for graphical elements.

**Validates: Requirement 17.5**

### Property 20: Keyboard Focus Visibility

*For any* interactive element (button, link, form input), a visible focus ring or indicator SHALL be present when focused via keyboard navigation (Tab key), with sufficient contrast (2:1 minimum from background).

**Validates: Requirement 17.1**

---

## Error Handling

### Video Loading Failures

**Scenario**: Video asset fails to load (404, network error, unsupported format)

**Handling**:
- Display fallback static image or placeholder
- Log error to console and error tracking service
- Optionally show user message: "Video unavailable. Proceeding to homepage..."
- Auto-advance to homepage after 2 seconds

**Code Example**:
```jsx
<video
  onError={() => {
    console.error("Video failed to load");
    setIsVideoComplete(true); // Skip to homepage
    trackError("video_load_failed");
  }}
/>
```

### Form Submission Errors

**Scenario**: Supabase insertion fails (network error, database constraint violation)

**Handling**:
- Show user-friendly error message: "Unable to submit form. Please try again."
- Log detailed error to monitoring service (Sentry, LogRocket)
- Provide retry button or clear form to allow resubmission
- Do not submit same data twice (disable button during submission)

**Code Example**:
```jsx
const handleSubmit = async (data) => {
  try {
    setIsSubmitting(true);
    const { error } = await supabase.from("leads").insert([data]);
    if (error) throw error;
    setSuccessMessage("Thank you! We'll be in touch.");
  } catch (error) {
    setErrorMessage(error.message || "Submission failed. Try again.");
    trackError("lead_submission_failed", { error });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Animation Performance Degradation

**Scenario**: Device or browser cannot maintain target FPS during animations

**Handling**:
- Detect FPS performance using requestAnimationFrame timing
- If FPS drops below threshold (30 on mobile, 45 on desktop), disable advanced animations
- Fall back to simpler opacity/fade-only animations
- Respect prefers-reduced-motion setting first

**Code Example**:
```jsx
useEffect(() => {
  let frameCount = 0;
  let lastTime = performance.now();
  const checkFPS = () => {
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      const fps = frameCount;
      if (fps < 30) {
        setReducedAnimations(true);
      }
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(checkFPS);
  };
  const id = requestAnimationFrame(checkFPS);
  return () => cancelAnimationFrame(id);
}, []);
```

### Responsive Layout Breakage

**Scenario**: Content overflows or wraps unexpectedly on specific viewport sizes

**Handling**:
- Test thoroughly at all breakpoint boundaries (375px, 768px, 1024px, 1440px, 2560px)
- Use CSS max-width constraints and overflow: hidden where needed
- Provide mobile-first styles that progressively enhance
- Use Tailwind CSS responsive prefixes (sm:, md:, lg:, xl:)

---

## Testing Strategy

### 1. Property-Based Testing (PBT)

**Framework**: Hypothesis (Python) or fast-check (JavaScript for Vitest/Jest)

**Coverage**: Focus on properties that vary meaningfully with input:

- **Responsive behavior** (Properties 2, 7, 8, 9): Test layout at 50+ random viewport sizes (375px–2560px)
- **Animation timing** (Properties 1, 5, 6): Test animations complete within specified duration bounds across 100+ iterations
- **Form validation** (Property 12): Test form with 100+ random email/name combinations, special characters, edge cases
- **Performance** (Property 15): Test page load across 50+ simulated network speeds
- **Accessibility** (Properties 19, 20): Test contrast ratios and focus states across all components

**Minimum 100 Iterations Per Property**: Ensures comprehensive edge case coverage

**Tag Format**:
```javascript
// Example test tag
describe("DigiDZN Homepage Phase 1 - Correctness Properties", () => {
  test("Property 2: Responsive video fullscreen behavior", () => {
    // Feature: digidzn-homepage-phase-1, Property 2
    // Test video element at random viewport sizes (375px–2560px)
  });
});
```

### 2. Unit Testing

**Test Video Entry Transition**:
- Verify video element renders with correct attributes (autoplay, muted, playsInline)
- Verify transition triggers on video end event
- Verify transition completes in < 1.2 seconds

**Test Form Validation**:
- Invalid emails are rejected
- Names over 100 characters are truncated/rejected
- Empty required fields disable submit button
- Whitespace-only input is treated as empty

**Test State Management**:
- isVideoComplete state updates correctly
- isTransitioning state blocks user input
- leadFormOpen state controls modal visibility

### 3. Integration Testing

**Test Supabase Lead Submission**:
- Submit valid lead data and verify it appears in database
- Verify timestamp is set correctly
- Verify all fields persist without mutation
- Verify error handling when network is down (use msw or mock)

**Test External Integrations**:
- Video asset loads from correct path
- Lazy loading triggers for below-fold images
- Lazy loading uses Intersection Observer API

**Test Cross-Browser Compatibility** (manual or Playwright/Cypress):
- Chrome, Firefox, Safari, Edge
- iOS Safari, Chrome Android
- Verify video playback works on all platforms

### 4. Performance Testing

**Lighthouse Audits**:
- Desktop: Performance 80+, Accessibility 95+, Best Practices 90+, SEO 100
- Mobile: Performance 70+, Accessibility 95+, Best Practices 90+, SEO 100

**Load Testing**:
- Page loads in < 3 seconds on 4G (simulate using Chrome DevTools throttling)
- Video asset is < 10MB (optimized for web)
- Bundle size < 150KB (gzipped) for React + Framer Motion + GSAP

**Scroll Performance**:
- Maintain 60 FPS on desktop, 30+ FPS on mobile during scroll
- Test with Chrome DevTools Performance tab
- Profile animation frames to identify jank

### 5. Accessibility Testing

**Manual Testing**:
- Keyboard-only navigation: Tab through all interactive elements
- Screen reader testing: NVDA (Windows), JAWS (Windows), VoiceOver (macOS)
- Color contrast: Verify 4.5:1 for all text using WebAIM contrast checker

**Automated Testing**:
- axe DevTools: Scan for WCAG violations
- Jest + jest-axe: Automated a11y checks in test suite
- prefers-reduced-motion: Verify animations disable when set

### 6. Mobile Testing

**Real Device Testing** (or emulation via DevTools):
- Test on iPhone (iOS Safari), Android (Chrome)
- Verify touch target sizes (48px minimum)
- Test form input on mobile keyboard
- Verify video plays inline without full-screen hijack

**Responsive Testing**:
- Test at 375px, 425px, 768px, 1024px, 1440px, 2560px
- Verify no horizontal scroll at any size
- Test orientation changes (portrait → landscape)

### 7. SEO Testing

**Technical SEO**:
- Verify meta tags (title, description, OG tags) are present
- Check semantic HTML structure (header, main, section, article)
- Verify structured data (JSON-LD) renders in source
- Test crawlability: Google Search Console, Screaming Frog

**Performance for SEO**:
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Mobile-Friendly test: Google Mobile-Friendly Test passes
- XML sitemap and robots.txt configured

---

## Design Decisions and Rationale

### 1. Single-Entry Architecture (Video → Homepage)

**Decision**: Use a fullscreen video entry as the landing page before transitioning to the scrollable homepage.

**Rationale**:
- Creates immersive brand impression and sets premium positioning
- Avoids generic landing page aesthetic
- Video plays only once per session; subsequent navigation goes directly to homepage
- Aligns with high-end digital agency trends (Refokus, Lume, etc.)

**Alternative Considered**: Merge video into homepage hero section
- **Rejected**: Would conflict with scroll interactivity and reduce immersion

### 2. GSAP + Framer Motion Hybrid Approach

**Decision**: Use GSAP for complex timeline sequences (video→homepage transition) and Framer Motion for component-level animations (scroll triggers, hover states).

**Rationale**:
- GSAP excels at multi-step timeline sequences with precise timing control
- Framer Motion is better for declarative, React-integrated animations
- Hybrid approach leverages strengths of both libraries
- Reduces code complexity vs. using one library for all animations

**Alternative Considered**: GSAP only
- **Rejected**: More verbose in React; Framer Motion's useInView hook is cleaner for scroll detection

### 3. Lazy Loading for Below-Fold Content

**Decision**: Implement Intersection Observer-based lazy loading for images and videos below the viewport.

**Rationale**:
- Reduces initial page load time (< 3s on 4G)
- Improves Lighthouse performance scores
- Better LCP and FCP metrics
- Standard practice for modern web performance

**Implementation**: Use Framer Motion's `whileInView` or custom Intersection Observer hook

### 4. Supabase for Lead Management

**Decision**: Use Supabase (PostgreSQL + REST API) for lead form submissions.

**Rationale**:
- Simple, serverless architecture (no backend required)
- Real-time database updates
- Built-in Row Level Security for data protection
- Easier than setting up custom API endpoints
- Includes free tier for MVP phase

**Alternative Considered**: Third-party form service (Typeform, Webflow)
- **Rejected**: Less control over data and UX; additional vendor dependency

### 5. Mobile-First Responsive Design

**Decision**: Build CSS starting with mobile (375px) and progressively enhance for larger viewports.

**Rationale**:
- Ensures core functionality works on smallest devices first
- Simplifies cascade (fewer overrides)
- TailwindCSS mobile-first breakpoints align with this approach
- Improves performance on constrained devices

**Breakpoints**:
- Mobile: 375px–767px (sm: 640px)
- Tablet: 768px–1023px (md: 768px, lg: 1024px)
- Desktop: 1024px+ (xl: 1280px, 2xl: 1536px)

### 6. Prefers-Reduced-Motion Respect

**Decision**: Automatically disable all non-essential animations when user has set `prefers-reduced-motion: reduce`.

**Rationale**:
- Required by WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions)
- Respects user accessibility preferences (vestibular issues, cognitive load)
- Improves inclusion for users sensitive to motion

**Implementation**:
```javascript
const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
const shouldReduceMotion = mediaQueryList.matches;

// Apply in animations:
const duration = shouldReduceMotion ? 0 : 0.6;
const transition = { duration };
```

### 7. Form Validation Strategy

**Decision**: Combine client-side real-time validation with server-side validation on Supabase.

**Rationale**:
- Client-side: Immediate user feedback, better UX
- Server-side: Security (prevent malformed data), data integrity
- Real-time feedback: Show errors on blur event (not onchange) to avoid rapid flickering

---

## Browser and Device Support

### Supported Browsers

- Chrome 90+ (desktop, mobile)
- Firefox 88+
- Safari 14+ (macOS, iOS)
- Edge 90+

### Supported Devices

- Mobile: iPhone SE and newer, Android 5.0+ with Chrome/Firefox/Samsung Internet
- Tablet: iPad (5th gen and newer), Android tablets 7"–12"
- Desktop: Windows 10+, macOS 10.15+

### Graceful Degradation

- Browsers without CSS Grid: Use fallback Flexbox layout
- Browsers without video support: Show static image + link to external player
- Browsers without Intersection Observer: Eagerly load all images, no lazy loading
- Motion disabled: All animations instantly apply (duration: 0)

---

## Performance Optimization Strategies

### 1. Video Asset Optimization

- Format: Use H.264 MP4 codec (broad compatibility)
- Resolution: 1920×1080 for desktop, 1280×720 for fallback
- Bitrate: 5–8 Mbps for balance between quality and file size
- File size target: < 10MB (< 5MB ideal)
- Tool: Use FFmpeg or online compressors

### 2. Image Optimization

- Format: WebP for modern browsers, JPEG fallback
- Responsive images: Use srcset for 1x, 2x, 3x pixel densities
- Sizes attribute for different viewport widths
- Lazy loading: Intersection Observer for below-fold images
- Tool: Vercel Image Optimization API or similar

### 3. Bundle Optimization

- Tree-shake GSAP: Import only necessary components (gsap/gsap-core, plugins)
- Code splitting: Split Homepage into separate chunk from VideoEntry
- Minification: Vite handles automatically in production build
- Target output: React + Framer Motion + GSAP < 150KB (gzipped)

### 4. Runtime Performance

- Use `production` React build
- Profile with React DevTools Profiler
- Avoid inline function definitions in render; use useCallback
- Memoize expensive components with React.memo or useMemo
- Use CSS transforms and opacity for animations (GPU acceleration)

---

## Accessibility Features

### WCAG AA Compliance Checklist

- ✅ All images have descriptive alt text
- ✅ Headings follow logical hierarchy (h1 → h2 → h3)
- ✅ Interactive elements have visible focus rings
- ✅ Color contrast meets 4.5:1 for text (3:1 for graphics)
- ✅ Form labels associated with inputs (htmlFor attribute)
- ✅ Error messages linked to fields (aria-describedby)
- ✅ Video has captions (if audio present)
- ✅ prefers-reduced-motion is respected
- ✅ Keyboard navigation works for all interactive elements
- ✅ Semantic HTML (header, main, section, article, nav)
- ✅ ARIA roles used appropriately (not overused)
- ✅ Skip link provided for keyboard users

### Assistive Technology Support

- Screen readers: VoiceOver, NVDA, JAWS
- Color contrast analyzers: Can detect text on various backgrounds
- Zoom: Page remains usable at 200% zoom
- High contrast mode: Windows high contrast mode doesn't break layouts

---

## SEO Optimization

### On-Page Elements

```html
<head>
  <title>DigiDZN - Attention Engineering for Growth</title>
  <meta name="description" content="DigiDZN engineers attention into growth. Outcomes-focused digital marketing and brand strategy for modern businesses." />
  <meta name="keywords" content="digital marketing, brand strategy, growth, SEO, attention engineering" />
  <meta property="og:title" content="DigiDZN - Attention Engineering for Growth" />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="https://digidzn.com/og-image.jpg" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://digidzn.com/" />
</head>
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DigiDZN",
  "url": "https://digidzn.com",
  "logo": "https://digidzn.com/logo.png",
  "description": "Outcomes-focused digital marketing and brand strategy",
  "sameAs": [
    "https://linkedin.com/company/digidzn",
    "https://twitter.com/digidzn"
  ]
}
```

### Technical SEO

- XML sitemap: `/sitemap.xml` with all sections
- robots.txt: Allow all crawlers
- Mobile-friendly: Responsive design, touch targets 48px+
- Page speed: Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- HTTPS: All traffic encrypted
- Hreflang: If multi-language, specify language variants

---

## Security Considerations

### Lead Form Submission

- Use HTTPS only (enforced by platform)
- Validate and sanitize all form inputs on client and server
- Use parameterized queries in Supabase (built-in)
- Store no sensitive data (passwords, payment info) in leads table
- Rate-limit form submissions (max 5 per IP per hour) using edge function

### Video Asset

- Host from CDN or trusted source
- Use content-security-policy header to restrict video source origin
- Verify file integrity if hosted externally

### Third-Party Scripts

- Load analytics (GA) async or with defer attribute
- Review GSAP and Framer Motion for security advisories
- Use Subresource Integrity (SRI) hashes for CDN-hosted libraries

---

## Deployment and Hosting

### Recommended Hosting

- **Frontend**: Vercel (automatic deployments from GitHub, edge functions for rate-limiting)
- **Backend/Database**: Supabase (managed PostgreSQL, REST API)
- **CDN**: Vercel Edge Network or Cloudflare (automatic)
- **Analytics**: Google Analytics 4 or Plausible (privacy-friendly)

### Environment Variables

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxx
VITE_ANALYTICS_ID=G-xxxx
VITE_ENVIRONMENT=production
```

### CI/CD Pipeline

1. **Development**: Commit to feature branch → Vercel preview deployment
2. **Review**: Team reviews preview, tests in browser
3. **Merge**: Merge to main → Automatic production deployment to Vercel
4. **Post-Deploy**: Lighthouse check, smoke tests, monitoring alerts

---

## Monitoring and Analytics

### Metrics to Track

- **Page Load Performance**: LCP, FID, CLS (Core Web Vitals)
- **User Engagement**: Video completion rate, scroll depth, time on page
- **Lead Conversion**: Form submissions, form abandonment rate
- **Errors**: Video load failures, form submission errors, JavaScript errors
- **Accessibility**: Screen reader usage (if available), keyboard-only navigation

### Tools

- Google Analytics 4: User behavior, conversions, traffic sources
- Sentry: Error tracking and monitoring
- Vercel Analytics: Core Web Vitals, performance metrics
- LogRocket: Session replay (optional, for debugging user issues)

---

## Future Enhancements

### Phase 2 Considerations

1. **Internationalization (i18n)**: Support multiple languages
2. **Dynamic Content**: Fetch projects, testimonials, team from Supabase CMS
3. **Advanced Analytics**: Event tracking (video skip, form field interaction)
4. **A/B Testing**: Test different CTA copy, form fields, animations
5. **Email Integration**: Autoresponder via Mailgun or SendGrid
6. **WhatsApp Integration**: Offer WhatsApp contact option in lead form
7. **Live Chat**: Intercom or Drift for real-time support
8. **Blog/Resources**: SEO-focused content hub

---

## Conclusion

This design establishes a comprehensive, production-ready blueprint for DigiDZN's Phase 1 homepage. The architecture prioritizes performance, accessibility, and user engagement while maintaining premium visual and interaction standards. The combination of property-based testing, unit testing, integration testing, and accessibility testing ensures robust correctness across diverse devices and browsers.

Key success metrics will be measured through performance dashboards (Lighthouse scores, Core Web Vitals), user engagement (scroll depth, time on page, video completion), and lead conversion metrics (form submissions, form abandonment rate). Continuous monitoring and iteration based on real user data will refine the experience in subsequent phases.
