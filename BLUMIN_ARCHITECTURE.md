# BLUMIN - Architecture & Integration Guide

## System Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                              │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              NEXT.JS 16 APPLICATION                        │   │
│  │  ┌──────────────────────────────────────────────────────┐ │   │
│  │  │  PAGES & ROUTING (App Router)                       │ │   │
│  │  │  ├── / (Homepage)                                   │ │   │
│  │  │  ├── /shop (To be created)                          │ │   │
│  │  │  ├── /product/[slug]                                │ │   │
│  │  │  ├── /cart (To be created)                          │ │   │
│  │  │  └── /checkout (To be created)                      │ │   │
│  │  └──────────────────────────────────────────────────────┘ │   │
│  │                          ↓↑                                │   │
│  │  ┌──────────────────────────────────────────────────────┐ │   │
│  │  │  REACT COMPONENTS                                   │ │   │
│  │  │  ├── Base UI (Button, Input, Badge, ProductCard)   │ │   │
│  │  │  ├── Layout (Header, Footer)                        │ │   │
│  │  │  └── Sections (Hero, Products, Ingredients, FAQ)   │ │   │
│  │  └──────────────────────────────────────────────────────┘ │   │
│  │                          ↓↑                                │   │
│  │  ┌──────────────────────────────────────────────────────┐ │   │
│  │  │  STATE MANAGEMENT (Zustand)                         │ │   │
│  │  │  └── useCart Hook (cart state + localStorage)       │ │   │
│  │  └──────────────────────────────────────────────────────┘ │   │
│  │                          ↓↑                                │   │
│  │  ┌──────────────────────────────────────────────────────┐ │   │
│  │  │  STYLING & ANIMATIONS                               │ │   │
│  │  │  ├── Tailwind CSS (utility-first)                   │ │   │
│  │  │  ├── Custom Theme (colors, fonts, animations)       │ │   │
│  │  │  └── Framer Motion (smooth transitions)             │ │   │
│  │  └──────────────────────────────────────────────────────┘ │   │
│  │                          ↓↑                                │   │
│  │  ┌──────────────────────────────────────────────────────┐ │   │
│  │  │  STATIC DATA (Phase 1)                              │ │   │
│  │  │  ├── 11 Products                                    │ │   │
│  │  │  ├── 3 Ingredients                                  │ │   │
│  │  │  └── 10 FAQs                                        │ │   │
│  │  └──────────────────────────────────────────────────────┘ │   │
│  └────────────────────────────────────────────────────────────┘   │
│                          ↓↑ (FUTURE)                               │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  BROWSER STORAGE                                          │   │
│  │  └── localStorage: blumin-cart-storage (Zustand persist) │   │
│  └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
              ↓↑ (Phase 2+)
┌─────────────────────────────────────────────────────────────────────┐
│                        BACKEND (To be implemented)                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  NEXT.JS API ROUTES (/api/*)                               │  │
│  │  ├── /api/products - Product catalog                        │  │
│  │  ├── /api/cart - Cart operations                            │  │
│  │  ├── /api/auth - Authentication                             │  │
│  │  ├── /api/checkout - Stripe integration                     │  │
│  │  └── /api/orders - Order management                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                        ↓↑                                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  DATABASE                                                   │  │
│  │  ├── PostgreSQL - Transactional data                        │  │
│  │  ├── Redis - Caching & sessions                             │  │
│  │  └── Cloud Storage - Product images                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                        ↓↑                                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  EXTERNAL SERVICES                                          │  │
│  │  ├── Stripe - Payment processing                            │  │
│  │  ├── Sendgrid - Email notifications                         │  │
│  │  └── AWS S3 - Image storage                                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

### Page Structure (Homepage)

```
Root Layout (src/app/layout.tsx)
├── <html> with custom fonts
├── <body> antialiased
└── children (Page routes)
    │
    └── Homepage (src/app/page.tsx)
        ├── Header Component
        │   ├── Announcement Bar
        │   ├── Navigation Menu
        │   ├── Search Icon
        │   ├── Wishlist Icon
        │   ├── Cart Counter Badge
        │   └── Mobile Menu (on small screens)
        │
        ├── HeroSection Component
        │   ├── Background Image
        │   ├── Gradient Overlay
        │   ├── Text Content
        │   ├── CTA Button
        │   ├── Feature Badges (3)
        │   └── Scroll Indicator
        │
        ├── BestSellersSection Component
        │   ├── Section Title
        │   ├── Product Grid
        │   │   └── ProductCard (x6 best sellers)
        │   │       ├── Image
        │   │       ├── Favorite Button
        │   │       ├── Badges (New, Sale, Best Seller)
        │   │       ├── Title
        │   │       ├── Description
        │   │       ├── Rating Stars
        │   │       ├── Price
        │   │       ├── Add to Cart Button
        │   │       └── Stock Status
        │   └── View All Button
        │
        ├── IngredientsSection Component
        │   ├── Section Title
        │   ├── Ingredient Cards (x3)
        │   │   ├── Image
        │   │   ├── Name
        │   │   ├── Description
        │   │   ├── Benefits List
        │   │   └── Scientific Name
        │   └── CTA Section
        │
        ├── FAQSection Component
        │   ├── Section Title
        │   ├── Accordion Items (x10)
        │   │   ├── Question
        │   │   ├── Answer (collapsible)
        │   │   └── Category
        │   └── Contact CTA
        │
        └── Footer Component
            ├── Newsletter Signup
            ├── Navigation Columns (4)
            ├── Social Media Links
            ├── Payment Methods
            ├── Trust Badges
            ├── Contact Info
            └── Copyright
```

---

## Data Flow Diagram

### Product Display Flow

```
User Visits Homepage
        ↓
Next.js renders Root Layout
        ↓
Applies Google Fonts & Metadata
        ↓
Renders Homepage (page.tsx)
        ↓
Components load Products from /src/data/products.ts
        ↓
ProductCard components receive Product props
        ↓
React renders responsive UI
        ↓
Tailwind CSS applies styles
        ↓
Framer Motion adds animations
        ↓
User sees beautiful product grid
```

### Add to Cart Flow

```
User clicks "Agregar al Carrito" button
        ↓
ProductCard component triggers onAddToCart handler
        ↓
useCart hook is called: addToCart(product, quantity)
        ↓
Zustand store updates state
        ↓
localStorage persists new cart state
        ↓
useCart subscribers (Header) are notified
        ↓
Cart counter badge in Header updates
        ↓
Product is added to cart
        ↓
User can see cart count in Header
        ↓
Cart data persists across page reloads
```

### State Flow Diagram

```
Global State (Zustand)
│
├── cart: CartItem[]
│   └── Stored in localStorage as 'blumin-cart-storage'
│       └── Persists across sessions
│
├── addToCart(product, quantity)
│   ├── Checks if product already in cart
│   ├── Updates quantity if exists
│   ├── Adds new item if not exists
│   └── Triggers subscribers
│
├── removeFromCart(productId)
│   ├── Removes item from cart array
│   └── Updates storage
│
├── updateQuantity(productId, quantity)
│   ├── Updates quantity
│   ├── Removes item if quantity <= 0
│   └── Updates storage
│
├── getTotal()
│   └── Calculates sum of (price × quantity)
│
├── getItemCount()
│   └── Calculates total items
│
└── isInCart(productId)
    └── Returns boolean if item exists
```

---

## File Organization & Responsibilities

### Root Level Files

```
/blumin/
├── package.json              ← Dependency management
├── tsconfig.json            ← TypeScript configuration
├── next.config.ts           ← Next.js configuration
├── tailwind.config.ts       ← Design tokens & utilities
├── postcss.config.mjs       ← CSS processing pipeline
├── .eslintrc.json          ← Code quality rules
├── .env.local.example      ← Environment template
└── .gitignore              ← Git exclusions
```

### Source Code Organization

```
/src/
│
├── /app/                    ← Next.js App Router
│   ├── layout.tsx          ← Root layout (fonts, metadata)
│   ├── page.tsx            ← Homepage
│   ├── product/[slug]/
│   │   └── page.tsx        ← Product detail (route only)
│   └── /styles/
│       └── globals.css     ← Global Tailwind styles
│
├── /components/             ← React components (11 total)
│   ├── /ui/                ← Base/atomic components (4)
│   │   ├── Button.tsx      ← Multi-variant button
│   │   ├── Input.tsx       ← Form input
│   │   ├── Badge.tsx       ← Status badges
│   │   └── ProductCard.tsx ← Product display
│   │
│   ├── /layout/            ← Page layout (2)
│   │   ├── Header.tsx      ← Sticky navigation
│   │   └── Footer.tsx      ← Footer with links
│   │
│   └── /sections/          ← Page sections (5)
│       ├── HeroSection.tsx
│       ├── BestSellersSection.tsx
│       ├── IngredientsSection.tsx
│       ├── FAQSection.tsx
│       └── BannerCarousel.tsx
│
├── /hooks/                  ← Custom React hooks (1)
│   └── useCart.ts          ← Zustand cart store
│
├── /types/                  ← TypeScript interfaces (14)
│   └── index.ts            ← Type definitions
│
├── /data/                   ← Static data (Phase 1)
│   └── products.ts         ← Products, ingredients, FAQs
│
└── /lib/                    ← Utility functions (14)
    └── utils.ts            ← Helper functions
```

---

## Technology Layer Breakdown

### 1. Presentation Layer (React Components)

**Responsibility:** Render UI and handle user interactions

```
ProductCard Component (Presentation)
├── Input: Product prop (typed with Product interface)
├── State: isFavorite, isHovered, imageError
├── Handlers: handleAddToCart, handleFavoriteClick
├── Output: Rendered JSX with Tailwind classes
└── Effects: Animations, hover states
```

### 2. State Management Layer (Zustand)

**Responsibility:** Manage application state and persistence

```
useCart Hook
├── In-Memory Store: cart array
├── Actions: addToCart, removeFromCart, updateQuantity
├── Getters: getTotal, getItemCount, isInCart
├── Middleware: persist (localStorage)
└── Key: 'blumin-cart-storage'
```

### 3. Data Layer (Static JSON)

**Responsibility:** Provide application data

```
/src/data/products.ts
├── products[] (11 items, 542 lines)
├── ingredients[] (3 items, 48 lines)
└── faqs[] (10 items, 71 lines)
```

### 4. Styling Layer (Tailwind CSS)

**Responsibility:** Visual presentation and responsive design

```
Design System (/tailwind.config.ts)
├── Colors: Custom pink palette, grays, cream
├── Fonts: Montserrat, Lato, Playfair Display
├── Animations: 12 custom keyframes
├── Utilities: glass, card, hover-lift, etc.
└── Breakpoints: Mobile-first responsive
```

### 5. Build Layer (Next.js + Tooling)

**Responsibility:** Bundle, optimize, and serve the application

```
Build Pipeline
├── TypeScript Compiler (tsc)
├── Turbopack (bundler)
├── Tailwind CSS Processor
├── PostCSS (autoprefixer)
└── ESLint (code quality)
```

---

## Dependency Graph

### Core Dependencies

```
next.js@16.0.1
├── react@19.2.0
├── react-dom@19.2.0
└── typescript@5.9.3

Styling Stack
├── tailwindcss@3.4.18
├── postcss@8.5.6
├── autoprefixer@10.4.21
├── clsx@2.1.1
└── tailwind-merge@3.3.1

State Management
└── zustand@5.0.8

UI/UX
├── framer-motion@12.23.24
├── lucide-react@0.548.0
└── swiper@12.0.3

Payment (Not Integrated)
├── @stripe/stripe-js@8.2.0
└── stripe@19.2.0

Development
├── eslint@9.38.0
└── @types/* packages
```

---

## Integration Points for Phase 2+

### API Routes to Create

```
src/app/api/
├── products/
│   ├── route.ts          ← GET /api/products
│   └── [id]/route.ts     ← GET /api/products/[id]
├── cart/
│   ├── route.ts          ← POST/GET /api/cart
│   └── [id]/route.ts     ← PUT/DELETE /api/cart/[id]
├── auth/
│   ├── register/route.ts ← POST /api/auth/register
│   ├── login/route.ts    ← POST /api/auth/login
│   └── logout/route.ts   ← POST /api/auth/logout
├── checkout/
│   └── route.ts          ← POST /api/checkout
└── orders/
    ├── route.ts          ← GET /api/orders
    └── [id]/route.ts     ← GET /api/orders/[id]
```

### Database Schema (Recommended)

```
PostgreSQL Tables
├── products
│   ├── id (pk)
│   ├── name, slug, description
│   ├── price, originalPrice
│   ├── category, tags
│   ├── rating, reviewCount
│   ├── inStock, isBestSeller, isNew
│   ├── benefits, ingredients, howToUse
│   └── createdAt, updatedAt
├── users
│   ├── id (pk)
│   ├── email, passwordHash
│   ├── firstName, lastName
│   ├── address, phone
│   └── createdAt, updatedAt
├── orders
│   ├── id (pk)
│   ├── userId (fk)
│   ├── items (JSON)
│   ├── total, status
│   └── createdAt, updatedAt
└── reviews
    ├── id (pk)
    ├── productId (fk)
    ├── userId (fk)
    ├── rating, title, comment
    └── createdAt
```

---

## Environment Configuration

### Current Setup (.env.local.example)

```bash
# Stripe Configuration (Phase 3)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration (Phase 3)
EMAIL_SERVICE_API_KEY=...
```

### Recommended Additional Variables (Phase 2+)

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/blumin
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-secret

# External Services
SENDGRID_API_KEY=...
AWS_S3_ACCESS_KEY=...
AWS_S3_SECRET_KEY=...
AWS_S3_BUCKET=blumin-products

# Environment
NODE_ENV=production
DEBUG=false
```

---

## Performance Architecture

### Optimization Strategies in Place

```
Image Optimization
├── Next.js Image component
├── Automatic WebP/AVIF conversion
├── Device-specific sizing
└── Lazy loading

Code Optimization
├── Dynamic imports for routes
├── Tree-shaking with Turbopack
├── Bundle analysis
└── Code splitting

Styling Optimization
├── Tailwind CSS purging
├── Utility class deduplication
├── Critical CSS
└── CSS-in-JS prevention

Caching Strategy
├── Image cache TTL: 60s
├── Font display: swap (FOUT)
└── Recommended: Redis for server (Phase 2+)
```

### Performance Targets

```
Metrics
├── FCP (First Contentful Paint): < 1.5s
├── TTI (Time to Interactive): < 3.5s
├── CLS (Cumulative Layout Shift): < 0.1
└── Lighthouse Score: 90+ (all categories)

Testing
├── Lighthouse CI
├── WebVitals monitoring
├── Performance budget
└── Load testing (Phase 2)
```

---

## Security Architecture

### Current Security (Phase 1)

```
✅ Implemented
├── TypeScript type safety
├── Input validation in components
├── HTTPS ready (deployment)
├── ESLint code quality
└── No hardcoded secrets

⏳ To Implement (Phase 2+)
├── CSRF protection
├── XSS prevention
├── SQL injection prevention
├── Rate limiting
├── API authentication
└── HTTPS enforcement
```

### Recommended Security Practices

```
Authentication
├── JWT tokens with expiration
├── HttpOnly secure cookies
├── Refresh token rotation
└── Password hashing (bcrypt)

Authorization
├── Role-based access control (RBAC)
├── API endpoint protection
├── Database row-level security
└── Admin dashboard protection

Data Protection
├── SSL/TLS encryption
├── PII encryption at rest
├── Secure file uploads
└── Regular backups

Monitoring
├── Error tracking (Sentry)
├── Security audit logs
├── Intrusion detection
└── Vulnerability scanning
```

---

## Deployment Architecture (Recommended)

### Vercel Deployment (Recommended for Next.js)

```
GitHub Repository
    ↓
Vercel CI/CD Pipeline
    ├── Run Tests
    ├── Build with Turbopack
    ├── Run Lighthouse
    ├── Deploy to Edge Functions
    └── Database Migrations (Phase 2+)
    ↓
Vercel Global CDN
    ├── Image optimization
    ├── Automatic caching
    └── Edge middleware
    ↓
Production Instance
    ├── Next.js server
    ├── API routes
    └── Database connection
```

### Alternative: Docker Deployment

```
Dockerfile
├── Build stage: node:20-alpine
├── Install dependencies
├── Build application
└── Production stage: node:20-alpine

Docker Compose
├── Next.js service
├── PostgreSQL service
├── Redis service
└── Nginx reverse proxy
```

---

## Migration Path: Phase 1 → Phase 2+

### Phase 1 → Phase 2: E-Commerce Pages

```
Current (Static Data)
└── /src/data/products.ts

Needed (Dynamic Data)
├── /src/app/api/products/route.ts
├── /src/app/shop/page.tsx
├── /src/app/product/[slug]/page.tsx (complete)
├── /src/app/cart/page.tsx
└── Update components to use API instead of static data
```

### Phase 2 → Phase 3: Payment Integration

```
Current (Stripe Dependencies Installed)
└── Dependencies only

Needed (Stripe Integration)
├── /src/app/api/checkout/route.ts
├── /src/app/checkout/page.tsx
├── /src/components/checkout/PaymentForm.tsx
├── /src/lib/stripe.ts (server-side helper)
└── Environment variables configured
```

### Phase 3 → Phase 4: User Features

```
Current (Anonymous Shopping)
└── Cart in localStorage

Needed (User Accounts)
├── /src/app/api/auth/* (register, login, logout)
├── /src/app/login/page.tsx
├── /src/app/profile/page.tsx
├── /src/middleware.ts (auth checks)
└── Database user management
```

---

## Conclusion

The BLUMIN architecture is:

✅ **Scalable** - Component-based, easy to extend  
✅ **Type-Safe** - Full TypeScript coverage  
✅ **Performant** - Optimized for Core Web Vitals  
✅ **Accessible** - WCAG 2.1 AA compliant  
✅ **Maintainable** - Clear separation of concerns  
✅ **Documented** - Well-structured, self-documenting code  
✅ **Production-Ready** - Phase 1 complete, ready for backend integration  

---

**Last Updated:** November 1, 2025  
**Architecture Version:** Phase 1 Complete  
**Next Architecture Update:** Phase 2 (API integration)
