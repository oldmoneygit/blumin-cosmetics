# BLUMIN Project - Quick Reference Guide

## Project Summary

**BLUMIN** - Premium e-commerce platform for KAHI cosmetics built with Next.js 16, React 19, TypeScript 5.9, and Tailwind CSS 3.4.

**Status:** Phase 1 Complete - Homepage and core components production-ready
**Location:** `/blumin/` directory

---

## Technology Stack at a Glance

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.0.1 |
| Runtime | React | 19.2.0 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 3.4.18 |
| Animations | Framer Motion | 12.23.24 |
| State | Zustand | 5.0.8 |
| Icons | Lucide React | 0.548.0 |
| Carousel | Swiper | 12.0.3 |

---

## Project Structure

```
src/
├── app/                        # Pages & routing (App Router)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── product/[slug]/        # Product detail (route only)
├── components/                 # React components
│   ├── ui/                    # Base components (Button, Input, Badge, ProductCard)
│   ├── layout/                # Layout components (Header, Footer)
│   └── sections/              # Page sections (Hero, BestSellers, Ingredients, FAQ)
├── hooks/                      # Custom hooks (useCart)
├── types/                      # TypeScript interfaces (14 total)
├── data/                       # Static data (products, ingredients, FAQs)
└── lib/                        # Utilities (14 helper functions)
```

---

## Key Components

### Base Components (src/components/ui/)

1. **Button.tsx** - Multi-variant button (primary, secondary, outline, ghost)
2. **Input.tsx** - Form input with labels and validation
3. **Badge.tsx** - Status badges (5 variants)
4. **ProductCard.tsx** - Product display with hover effects and add-to-cart

### Layout Components (src/components/layout/)

1. **Header.tsx** - Sticky navigation with mobile menu
2. **Footer.tsx** - Newsletter signup and links

### Section Components (src/components/sections/)

1. **HeroSection.tsx** - Image banner with carousel and CTA
2. **BestSellersSection.tsx** - Product grid filtered by isBestSeller
3. **IngredientsSection.tsx** - 3-column ingredient showcase
4. **FAQSection.tsx** - Accordion with 10 FAQs

---

## State Management

### Cart Store (useCart hook)

```typescript
useCart() returns:
├── cart[]           - Array of CartItems
├── addToCart()      - Add product to cart
├── removeFromCart() - Remove item
├── updateQuantity() - Change item quantity
├── clearCart()      - Empty entire cart
├── getTotal()       - Calculate total price
├── getItemCount()   - Count total items
└── isInCart()       - Check if product in cart

Storage: localStorage with key 'blumin-cart-storage'
Persistence: Automatic, survives page reload
```

---

## Data Models

### Product Interface

```typescript
{
  id: number
  name: string
  slug: string
  description: string
  fullDescription: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isBestSeller?: boolean
  isNew?: boolean
  benefits: string[]
  ingredients: string[]
  howToUse: string
  size?: string
}
```

### Cart Data

11 Products pre-populated:
- Wrinkle Bounce Multi Balm (Best Seller, $32)
- Aqua Balm Stick (Best Seller, $28)
- Eye Balm Stick ($26)
- Extin C Balm (Best Seller, $30)
- Kisstin Balm (New, $27)
- Core Collagen Cream (Best Seller, $42)
- Cream Foaming Cleanser ($24)
- Fine Line Bounce Collagen Serum (Best Seller, $38)
- Wrinkle Bounce Blemish Ampoule (Best Seller, $44)
- Single Veil Cream (New, $36)
- Highlighter Stick ($25)

---

## Design System

### Colors

**Primary Pink Palette:**
- pink-50: #FFF8F5 (very light)
- pink-400: #FFB8D1 (brand primary)
- pink-500: #FFA3C4 (accent)

**Grays:**
- gray-50 to gray-900 (complete neutral range)

### Typography

- **Montserrat** (weights: 300-700) - Main font
- **Lato** (weights: 400, 700) - Secondary
- **Playfair Display** (weights: 400, 700) - Accent/headings

### Animations

Pre-defined in tailwind.config.ts:
- fade-in, fade-in-up, fade-in-down
- slide-in-left, slide-in-right
- scale-in
- bounce-slow, pulse-slow
- shimmer (loading effect)

---

## Utility Functions (src/lib/utils.ts)

```typescript
cn()                    // Class merging
formatPrice()           // Format as ARS currency
formatPriceUSD()        // Format as USD currency
formatDate()            // Format date in Spanish
formatDateShort()       // Format as DD/MM/YYYY
calculateDiscount()     // Discount percentage
truncateText()          // Truncate with ellipsis
slugify()               // Create URL-safe slugs
isValidEmail()          // Email validation
debounce()              // Debounce function calls
formatNumber()          // Add thousands separators
clamp()                 // Constrain number range
```

---

## Configuration Files

### tsconfig.json
- Target: ES2017
- Strict mode: true
- Path alias: @/* → ./src/*

### tailwind.config.ts
- Custom colors (pink, gray, cream)
- Custom fonts (Montserrat, Lato, Playfair)
- Custom animations (12 total)
- Extended utilities

### next.config.ts
- Remote image patterns allowed
- Image formats: WebP, AVIF
- Image optimization enabled
- Lucide React optimization

### .env.local.example
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Development Scripts

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

---

## Component Usage Examples

### Using the Button

```typescript
import { Button } from '@/components/ui/Button';

// Primary button
<Button variant="primary" size="medium">Click Me</Button>

// Loading state
<Button variant="primary" isLoading={true}>Loading...</Button>

// Disabled
<Button variant="secondary" disabled>Disabled</Button>
```

### Using the useCart Hook

```typescript
import { useCart } from '@/hooks/useCart';

function MyComponent() {
  const { cart, addToCart, removeFromCart, getTotal } = useCart();
  
  return (
    <div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <p>Total: {getTotal()}</p>
    </div>
  );
}
```

### Using the ProductCard

```typescript
import { ProductCard } from '@/components/ui/ProductCard';

<ProductCard 
  product={product}
  onAddToCart={(product) => addToCart(product)}
/>
```

---

## Current Features (Phase 1)

✅ Responsive design (mobile, tablet, desktop)  
✅ Homepage with all sections  
✅ Product catalog (11 items)  
✅ Shopping cart (Zustand + localStorage)  
✅ Add/remove/update cart items  
✅ Product filtering (best sellers, new)  
✅ Smooth animations  
✅ Accessibility (ARIA labels, focus states)  
✅ SEO metadata  
✅ Mobile menu  
✅ Newsletter signup form  
✅ FAQ accordion  
✅ Image optimization  

---

## Upcoming Features (Phase 2+)

⏳ Shop page with filters  
⏳ Product detail page completion  
⏳ Cart management page  
⏳ Stripe checkout integration  
⏳ User authentication  
⏳ Order management  
⏳ Review system  
⏳ Wishlist  
⏳ Search functionality  
⏳ User accounts  

---

## File Sizes & Performance

- **Bundle Size:** ~38 production dependencies (Turbopack optimized)
- **Image Formats:** WebP, AVIF with fallbacks
- **Cache TTL:** 60 seconds minimum
- **Lighthouse Target:** 90+ in all categories

---

## SEO Configuration

```typescript
Language: es-AR (Spanish - Argentina)
Title: "BLUMIN - Línea KAHI | Cuidado de Piel Coreano Premium"
Keywords: KAHI, cosméticos coreanos, skincare, K-beauty, BLUMIN, etc.
OpenGraph: Configured for social sharing
Twitter Card: summary_large_image format
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android Chrome)

---

## Getting Started

```bash
# Navigate to project
cd blumin

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

---

## Common Tasks

### Add a New Component

```typescript
// Create file: src/components/ui/MyComponent.tsx
"use client"  // If interactive

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  children: ReactNode;
  className?: string;
}

export const MyComponent = ({ children, className }: MyComponentProps) => {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
};
```

### Add a Product

```typescript
// Edit: src/data/products.ts
{
  id: 12,
  name: "New Product",
  slug: "new-product",
  description: "Short description",
  fullDescription: "Long description",
  price: 29.99,
  images: ["/images/product-1.jpg"],
  category: "Category",
  tags: ["TAG1", "TAG2"],
  rating: 5,
  reviewCount: 0,
  inStock: true,
  benefits: ["Benefit 1", "Benefit 2"],
  ingredients: ["Ingredient 1"],
  howToUse: "Instructions",
  size: "50ml"
}
```

### Add a Utility Function

```typescript
// Add to: src/lib/utils.ts
export function myUtility(param: string): string {
  // Implementation
  return result;
}

// Use anywhere
import { myUtility } from '@/lib/utils';
const result = myUtility('input');
```

---

## Troubleshooting

### Port already in use

```bash
# Use different port
npm run dev -- -p 3001
```

### Clear cache

```bash
# Delete .next folder
rm -rf .next

# Reinstall and rebuild
npm install
npm run build
```

### TypeScript errors

```bash
# Run type check
npx tsc --noEmit
```

---

## Best Practices

1. **Use TypeScript** - Always define types for props and returns
2. **Use Components** - Break UI into reusable components
3. **Use Utility Classes** - Use Tailwind's utility-first approach
4. **Use Path Aliases** - Always use @/ imports
5. **Use useCart Hook** - For cart operations (not local state)
6. **Use cn() Function** - For conditional class merging
7. **Use Next Image** - Always use next/image, not <img>
8. **Responsive Design** - Test on mobile, tablet, desktop

---

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org
- **Zustand:** https://github.com/pmndrs/zustand

---

**Last Updated:** November 1, 2025  
**Current Phase:** 1 (Complete)  
**Next Phase:** E-Commerce Pages (Shop, Product Detail, Cart)
