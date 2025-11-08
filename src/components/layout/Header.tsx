"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, Search, Heart, User } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

// Navigation configuration
const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Tienda", href: "/shop" },
  { name: "Black Friday Sets", href: "/sets" },
  { name: "Sets", href: "/sets-collection" },
  { name: "Skincare", href: "/shop/skincare" },
  { name: "Más Vendidos", href: "/shop?filter=best-sellers" },
  { name: "Reseñas", href: "/reviews" },
  { name: "Contacto", href: "/contact" },
] as const;

// Scroll threshold constants
const SCROLL_THRESHOLD = 50;

interface HeaderProps {
  cartItemCount?: number;
}

export const Header = memo(({ cartItemCount = 0 }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Memoize handlers
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Cancel previous animation frame if it exists
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Use requestAnimationFrame for better performance
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Header background changes after threshold
        setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

        // Keep header always visible (sticky)
        setIsVisible(true);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false);
    return () => handleRouteChange();
  }, []);

  return (
    <>
      {/* Announcement Bar - Fixed at top */}
      {!mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-pink-500 text-white">
          <p className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4 text-xs font-semibold tracking-wide sm:text-sm">
            Envío gratis a toda Argentina
          </p>
        </div>
      )}

      {/* Main Header - Fixed below topbar */}
      <header
        className={cn(
          "fixed left-0 right-0 transition-all duration-500",
          // Always below announcement bar (exactly 40px from top)
          "z-40",
          !mobileMenuOpen ? "top-10" : "top-0",
          isScrolled
            ? "bg-white/85 backdrop-blur-md shadow-sm"
            : "bg-white/95 backdrop-blur-md shadow",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex h-14 items-center justify-between md:h-16">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:text-pink-500 lg:hidden"
              onClick={toggleMobileMenu}
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="BLUMIN Logo"
                width={960}
                height={360}
                className="h-[12.5rem] w-auto transition-all duration-300 sm:h-[14rem] md:h-[15rem] lg:h-[16rem] xl:h-[17rem]"
                style={{ height: "12.5rem" }}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-semibold text-gray-700 hover:text-pink-500 transition-colors duration-300 relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                className="hidden md:block rounded-full p-2 text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-500"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <button
                className="relative hidden md:block rounded-full p-2 text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-500"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative rounded-full p-2 text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-500"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* CTA Button (Desktop) */}
              <div className="hidden lg:block">
                <Button variant="primary" size="small" className="px-3 py-1.5 text-xs">
                  <Link href="/shop">Comprar</Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-500",
          mobileMenuOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={closeMobileMenu}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 overflow-y-auto",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Menú
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-500"
              onClick={closeMobileMenu}
              aria-label="Cerrar menú"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Cerrar
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-6 py-3 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-all duration-300"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="border-t border-gray-200 px-6 py-6 space-y-4">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-all duration-300"
              aria-label="Buscar productos"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              <span>Buscar Productos</span>
            </button>

            <Link
              href="/wishlist"
              className="flex items-center gap-3 w-full px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-all duration-300"
              onClick={closeMobileMenu}
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              <span>Favoritos</span>
            </Link>
          </div>

          {/* CTA */}
          <div className="border-t border-gray-200 px-6 py-6">
            <Button
              variant="primary"
              size="large"
              className="w-full"
              onClick={closeMobileMenu}
            >
              <Link href="/shop">Comenzar a Comprar</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="px-6 py-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
              Seguinos
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/blumincosmetics/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

// Display name for debugging
Header.displayName = "Header";
