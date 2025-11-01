# EXEMPLOS DE CÓDIGO REACT - COMPONENTES KAHI STYLE
## Para uso no site BLUMIN - Linha KAHI

---

## 1. HEADER COMPONENT

```jsx
// components/Header.jsx
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'SHOP', href: '/shop' },
    { name: 'BEST SELLERS', href: '/best-sellers' },
    { name: 'ABOUT', href: '/about' },
    { name: 'INGREDIENTS', href: '/ingredients' },
    { name: 'REVIEWS', href: '/reviews' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-300 to-pink-200 text-white text-center py-3 px-4">
        <p className="text-sm font-semibold tracking-wide uppercase">
          FREE SHIPPING ON ORDERS OVER $50 | SHOP NOW
        </p>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-lg backdrop-blur-md bg-white/95' : ''
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/logo.png"
                alt="BLUMIN - KAHI"
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-9' : 'h-11'
                }`}
              />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-10 flex-1 justify-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-800 font-medium text-sm tracking-widest uppercase hover:text-pink-400 transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-800 hover:text-pink-400 transition-colors">
                <Search size={22} />
              </button>
              <button className="text-gray-800 hover:text-pink-400 transition-colors">
                <User size={22} />
              </button>
              <button className="text-gray-800 hover:text-pink-400 transition-colors relative">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-gray-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="py-4 px-6 space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-gray-800 font-medium text-sm tracking-wide uppercase hover:text-pink-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
```

---

## 2. HERO SECTION COMPONENT

```jsx
// components/HeroSection.jsx
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200/20 to-white/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-4xl">
          {/* Title */}
          <h1 className="animate-fade-in-up">
            <span className="block text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-gray-800 mb-3 opacity-90">
              Discover Your
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-none tracking-tight mb-8 drop-shadow-[0_2px_20px_rgba(255,255,255,0.8)]">
              Beautiful Change
            </span>
          </h1>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in-up animation-delay-200">
            {['EASY & EFFECTIVE', 'KIND TO SKIN & EYES', 'ECO-CONSCIOUS'].map(
              (feature) => (
                <div
                  key={feature}
                  className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-pink-200/30 shadow-lg"
                >
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-800">
                    {feature}
                  </span>
                </div>
              )
            )}
          </div>

          {/* CTA Button */}
          <a
            href="#shop"
            className="inline-block bg-pink-400 text-white px-12 py-4 rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_8px_25px_rgba(255,184,209,0.4)] hover:bg-pink-500 hover:shadow-[0_12px_35px_rgba(255,184,209,0.6)] hover:-translate-y-1 transition-all duration-300 animate-fade-in-up animation-delay-400"
          >
            SHOP NOW
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-sm tracking-widest uppercase text-gray-800">
          Scroll
        </span>
        <ChevronDown className="text-pink-400" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
```

---

## 3. PRODUCT CARD COMPONENT

```jsx
// components/ProductCard.jsx
import { useState } from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    name,
    description,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    badges,
  } = product;

  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-transparent hover:border-pink-400 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-pink-50 overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Badges */}
        {badges && (
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {badges.includes('bestseller') && (
              <span className="bg-pink-400 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                Best Seller
              </span>
            )}
            {badges.includes('new') && (
              <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                New
              </span>
            )}
          </div>
        )}

        {/* Quick View Button */}
        <button
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg hover:bg-pink-400 hover:text-white transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          <Eye size={16} className="inline mr-2" />
          QUICK VIEW
        </button>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-pink-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm text-gray-500">({reviewCount})</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          {originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-pink-400 text-white py-3.5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-pink-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,184,209,0.4)] transition-all duration-300">
          <ShoppingCart size={16} className="inline mr-2" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```

---

## 4. INGREDIENTS SECTION COMPONENT

```jsx
// components/IngredientsSection.jsx
const IngredientsSection = () => {
  const ingredients = [
    {
      name: 'Salmon DNA',
      description:
        'Sodium DNA (PDRN) supports skin repair, hydration, and elasticity. It helps boost collagen, smooth fine lines, and promote natural skin regeneration.',
      benefits: ['ANTI-AGING', 'HYDRATION', 'REPAIR'],
      image: '/ingredient-salmon-dna.jpg',
      reverse: false,
    },
    {
      name: '144HR Jeju Oil',
      description:
        "Jeju Island's pure ingredients undergo 144-hour fermentation, enhancing absorption, deep hydration, and long-lasting moisture retention.",
      benefits: ['DEEP HYDRATION', 'NATURAL', 'FERMENTED'],
      image: '/ingredient-jeju-oil.jpg',
      reverse: true,
    },
    {
      name: 'FILMEXEL™',
      description:
        'Filmexel™ technology creates a natural bio-film with Doty algae and Tara Spinosa, helping smooth fine lines and refine skin texture. Patented in FR & US.',
      benefits: ['PATENTED', 'SMOOTHING', 'BIO-FILM'],
      image: '/ingredient-filmexel.jpg',
      reverse: false,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-pink-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            SCIENCE MEETS BEAUTY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            ALL ABOUT: KAHI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the powerful ingredients behind our innovative formulas
          </p>
        </div>

        {/* Ingredients List */}
        <div className="space-y-20">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.name}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-3 transition-all duration-500"
            >
              <div
                className={`grid md:grid-cols-2 gap-0 items-center ${
                  ingredient.reverse ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Text Content */}
                <div className="p-12 lg:p-16">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                    {ingredient.name}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">
                    {ingredient.description}
                  </p>

                  {/* Benefits Tags */}
                  <div className="flex flex-wrap gap-3">
                    {ingredient.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="bg-gradient-to-r from-pink-400 to-pink-300 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div
                  className={`relative h-full min-h-[400px] overflow-hidden ${
                    ingredient.reverse ? 'md:col-start-1' : ''
                  }`}
                >
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
```

---

## 5. FAQ COMPONENT

```jsx
// components/FAQSection.jsx
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Is This an Official KAHI Store?',
      answer:
        'Yes, we are the official Kahi store, and we also operate the Kahi Amazon US store.',
    },
    {
      question: 'Do You Ship Faster Than Amazon?',
      answer:
        'Our products are in stock and ready to ship! You can expect shipping times similar to Amazon.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for unopened products. If you are not satisfied with your purchase, please contact our customer service team.',
    },
    {
      question: 'Are KAHI products suitable for sensitive skin?',
      answer:
        'Yes, KAHI products are formulated to be gentle and suitable for all skin types, including sensitive skin. However, we recommend patch testing before full application.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for faster delivery.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-pink-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-pink-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 lg:p-7 text-left hover:text-pink-400 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-pink-400">
                  {openIndex === index ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </span>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 lg:px-7 pb-6 lg:pb-7">
                  <p className="text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
```

---

## 6. FOOTER COMPONENT

```jsx
// components/Footer.jsx
import { Instagram, Facebook, Youtube, Music } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop/all' },
      { name: 'Best Sellers', href: '/shop/best-sellers' },
      { name: 'Multi Balms', href: '/shop/multi-balms' },
      { name: 'Sunscreen', href: '/shop/sunscreen' },
      { name: 'Gift Sets', href: '/shop/sets' },
    ],
    about: [
      { name: 'Our Story', href: '/about' },
      { name: 'Ingredients', href: '/ingredients' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Reviews', href: '/reviews' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Track Order', href: '/track-order' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <img src="/logo-white.png" alt="BLUMIN - KAHI" className="h-10 mb-6" />
              <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-md">
                Discover your beautiful change with innovative Korean skincare
                solutions that deliver real results.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: '#' },
                  { icon: Facebook, href: '#' },
                  { icon: Youtube, href: '#' },
                  { icon: Music, href: '#' }, // TikTok
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-400 transition-all hover:-translate-y-1"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-5">
                SHOP
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors inline-block hover:translate-x-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-5">
                ABOUT
              </h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors inline-block hover:translate-x-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-5">
                SUPPORT
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors inline-block hover:translate-x-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="max-w-md">
              <h4 className="text-sm font-bold tracking-widest uppercase mb-3">
                STAY CONNECTED
              </h4>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Subscribe for exclusive offers and skincare tips
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-5 py-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="bg-pink-400 text-white px-6 py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-pink-500 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,184,209,0.4)] transition-all"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2025 BLUMIN - KAHI. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-pink-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-pink-400 transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-pink-400 transition-colors">
                Cookie Policy
              </a>
            </div>

            <div className="flex items-center gap-3">
              {['visa', 'mastercard', 'amex', 'paypal'].map((payment) => (
                <img
                  key={payment}
                  src={`/payment-${payment}.svg`}
                  alt={payment}
                  className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

---

## 7. TAILWIND CONFIG

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FFF8F5',
          100: '#FFE8EF',
          200: '#FFD4DC',
          300: '#FFC9D9',
          400: '#FFB8D1',
          500: '#FFA3C4',
          600: '#FF8DB7',
          700: '#FF77AA',
          800: '#FF619D',
          900: '#FF4B90',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        secondary: ['Lato', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## 8. EXEMPLO DE PÁGINA HOME COMPLETA

```jsx
// pages/index.jsx
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import IngredientsSection from '@/components/IngredientsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  // Exemplo de dados de produtos
  const products = [
    {
      id: 1,
      name: 'Wrinkle Bounce Multi Balm',
      description: 'Multi-purpose stick for instant hydration and glow',
      price: 32.0,
      originalPrice: 40.0,
      image: '/products/multi-balm.jpg',
      rating: 5,
      reviewCount: 1234,
      badges: ['bestseller', 'new'],
    },
    // Adicionar mais produtos...
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Best Sellers Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block text-pink-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                TOP PICKS
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                BEST SELLERS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Our most-loved products, backed by thousands of glowing reviews
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <a
                href="/shop"
                className="inline-block bg-transparent text-gray-900 border-2 border-gray-900 px-12 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                VIEW ALL PRODUCTS
              </a>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <IngredientsSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
```

---

## 9. CUSTOM HOOKS ÚTEIS

```javascript
// hooks/useCart.js
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Calculate total
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    total,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
```

```javascript
// hooks/useScrollDirection.js
import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};
```

```javascript
// hooks/useIntersectionObserver.js
import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return [elementRef, isIntersecting];
};
```

---

## 10. PACKAGE.JSON RECOMENDADO

```json
{
  "name": "blumin-kahi",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    "framer-motion": "^10.16.0",
    "stripe": "^14.0.0",
    "swiper": "^11.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.54.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.3.0"
  }
}
```

---

Pronto! Estes exemplos de código React fornecerão uma base sólida para implementar o site KAHI style no BLUMIN usando Next.js e Tailwind CSS. 🚀
