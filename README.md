# DigiDZN Homepage Phase 1

A premium, immersive digital experience built with React, Vite, TailwindCSS, Framer Motion, GSAP, and Supabase.

## Project Overview

DigiDZN Phase 1 consists of two integrated components:

1. **Video Entry Experience**: A fullscreen, immersive video that creates brand awareness and curiosity
2. **Homepage**: A fully functional, conversion-focused landing page with 8 distinct sections

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3
- **Animations**: Framer Motion 11 + GSAP 3
- **Backend**: Supabase
- **Package Manager**: npm

## Project Structure

```
digidzn-final/
├── src/
│   ├── components/
│   │   ├── VideoEntry.tsx          # Fullscreen video component
│   │   ├── TransitionOverlay.tsx   # GSAP transition animation
│   │   └── Homepage.tsx            # Main homepage container
│   ├── sections/                   # Homepage section components (TBD)
│   ├── hooks/
│   │   ├── useBreakpoint.ts       # Responsive breakpoint detection
│   │   └── usePreferredReducedMotion.ts # Accessibility preference
│   ├── utils/
│   │   └── supabaseClient.ts      # Supabase client initialization
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles + TailwindCSS
├── public/
│   └── videos/
│       └── hero-digidzn.mp4       # Video asset
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration with optimizations
├── tailwind.config.js              # TailwindCSS configuration
├── postcss.config.js               # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment variables (git-ignored)
└── README.md                       # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm 7+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000` with Vite's Fast Refresh enabled.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production with optimizations
- `npm run preview` - Preview production build locally
- `npm run lint` - Run linting (placeholder for MVP)
- `npm run test` - Run tests (placeholder for MVP)

## Build Optimization Features

This project includes several Vite optimizations configured in `vite.config.ts`:

### Code Splitting
- Vendor bundle (react, react-dom)
- Animation library bundle (gsap, framer-motion)
- TailwindCSS bundle
- Section components split into separate chunks

### Minification & Tree-Shaking
- Terser minification with console/debugger removal
- CSS code splitting
- Unused code removal via tree-shaking
- Manual chunk optimization

### Asset Optimization
- Organized asset directories (js/, css/, images/, videos/)
- Sourcemap disabled for production
- Chunk size warnings at 1000KB threshold

## Environment Variables

Required Supabase credentials (add to `.env.local`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: Vite only exposes variables prefixed with `VITE_` to the client.

## Development Guidelines

### TypeScript
- Strict mode enabled
- All source files use `.tsx` or `.ts` extensions
- No implicit `any` types

### Styling
- TailwindCSS for all styles
- Custom breakpoints: xs (375px), sm (480px), md (768px), lg (1024px), xl (1440px), 2xl (2560px)
- Responsive-first approach with mobile-first utility classes

### Animations
- GSAP for complex timelines and transitions
- Framer Motion for component-level animations and scroll triggers
- All animations respect `prefers-reduced-motion` media query

### Component Structure
- Functional components with hooks
- Custom hooks for responsive behavior and accessibility
- Prop-based configuration for reusability

### Performance
- Code splitting enabled for sections
- Lazy loading for below-the-fold images
- GPU acceleration for animations (transform, opacity)
- Optimized video asset < 10MB

### Accessibility
- WCAG AA color contrast (4.5:1 normal, 3:1 large text)
- Keyboard navigation support
- Focus rings on all interactive elements
- Semantic HTML markup
- Alt text for all images
- `prefers-reduced-motion` support

## Video Asset

The video asset (`hero-digidzn.mp4`) should be:
- MP4 format with H.264 codec
- Optimized for web delivery
- Target size: < 10MB
- Located in `public/videos/` directory

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Performance Targets

- Initial page load: < 3 seconds on 4G
- Lighthouse score: 80+ on desktop, 70+ on mobile
- Animation frame rate: 60 FPS on desktop, 30+ FPS on mobile
- Bundle size: < 100KB gzipped

## Lead Generation Integration

Lead form submissions are stored in Supabase `leads` table with:
- Name, email, company, message fields
- Timestamp and source tracking
- Real-time validation feedback
- Secure HTTPS transmission

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [GSAP Documentation](https://greensock.com/gsap/)
- [Supabase Documentation](https://supabase.com/docs)

## License

MIT
