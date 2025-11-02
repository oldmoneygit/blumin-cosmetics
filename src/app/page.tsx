"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BestSellersSection } from "@/components/sections/BestSellersSection";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { InteractiveLookbook } from "@/components/sections/InteractiveLookbook";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { AboutKahiSection } from "@/components/sections/AboutKahiSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { products, ingredients, faqs } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

export default function HomePage() {
  const { addToCart, getItemCount } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // You can add a toast notification here
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <main className="min-h-screen">
      <Header cartItemCount={getItemCount()} />

      <HeroSection />

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
