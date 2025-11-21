"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroContentSection } from "@/components/sections/HeroContentSection";
import { BestSellersSection } from "@/components/sections/BestSellersSection";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { MobileBannerCarousel } from "@/components/sections/MobileBannerCarousel";
import { InteractiveLookbook } from "@/components/sections/InteractiveLookbook";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { AboutKahiSection } from "@/components/sections/AboutKahiSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { products, ingredients, faqs } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";
import { useToast } from "@/hooks/useToast";

export default function HomePage() {
  const { addToCart, getItemCount } = useCart();
  const { showToast } = useToast();

  const blackFridaySets = useMemo(
    () =>
      products
        .filter((product) => 
          product.inStock && 
          (product.tags.includes("SET") || 
           product.tags.includes("COMBO") || 
           product.tags.includes("DUO") || 
           product.tags.includes("KIT"))
        ),
    []
  );


  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    showToast({
      title: product.name,
      description: "Agregado al carrito",
      type: "success",
      image: product.images?.[0],
      price: product.price,
      quantity: 1,
      ctaLabel: "Ver carrito",
      ctaHref: "/cart",
      duration: 6000,
    });
  };

  return (
    <main className="min-h-screen">
      <Header cartItemCount={getItemCount()} />

      <HeroSection />

      <section className="py-6 sm:py-10 bg-white">
        <div className="mx-auto w-full max-w-7xl px-0 sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-none sm:rounded-3xl shadow-2xl bg-gray-100 aspect-[3/1] sm:aspect-[22/9] lg:aspect-[24/9]">
            <Image
              src="/images/banners/compra-2-llavate-1.png"
              alt="Black Friday - Comprá dos y llevate uno gratis"
              width={1600}
              height={533}
              priority
              className="h-full w-full object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-x-0 bottom-4 hidden sm:flex justify-end pr-10">
              <Link
                href="/sets"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-pink-600 shadow-lg transition-all hover:bg-pink-100"
              >
                Ver Black Friday Sets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {blackFridaySets.length > 0 && (
        <section className="bg-gradient-to-b from-white via-pink-50/40 to-white py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-pink-600 sm:text-sm">
                  Black Friday Sets
                </p>
                <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                  Comprá dos y llevate uno gratis
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
                  Descubrí nuestros sets especiales con la promo exclusiva de Black Friday “comprá dos y llevate uno gratis”.
                </p>
              </div>
              <Link
                href="/sets"
                className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-5 py-2 text-sm font-semibold text-pink-600 transition-all hover:bg-pink-500 hover:text-white"
              >
                Ver colección completa
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {blackFridaySets.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      <HeroContentSection />

      <BestSellersSection products={products} onAddToCart={handleAddToCart} />

      <ProductHighlights />

      <InteractiveLookbook />

      <CategoriesSection />

      <AboutKahiSection />

      <IngredientsSection ingredients={ingredients} />

      <FAQSection faqs={faqs} />

      <Footer />
    </main>
  );
}
