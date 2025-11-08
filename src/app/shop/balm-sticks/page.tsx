"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BalmSticksPage() {
  const { addToCart, getItemCount } = useCart();
  const { showToast } = useToast();
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter balm sticks products
  const balmProducts = products.filter(
    (p) => p.category === "Multi Balm Sticks" || p.category.includes("Balm")
  );

  // Sort products
  const sortedProducts = [...balmProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

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

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-white md:bg-transparent">
        {/* Background Image - Desktop Only */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/banners/balms.jpg"
            alt="BALMS Background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-pink-50/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-900 mb-4">
              BALM STICKS
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              Hidratación instantánea y cuidado completo con productos KAHI
            </p>
            <p className="text-lg text-gray-600">
              Descubrí nuestra colección completa de bálsamos multi-uso, sticks hidratantes y tratamientos especializados para una hidratación intensa y resultados visibles.
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-4 sm:py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">
                Mostrando <span className="font-semibold text-gray-900">{sortedProducts.length}</span>{" "}
                {sortedProducts.length === 1 ? "producto" : "productos"}
              </p>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1 sm:flex-none min-w-[140px] sm:min-w-0"
              >
                <option value="featured">Destacados</option>
                <option value="name">Nombre A-Z</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 sm:p-2 transition-colors",
                    viewMode === "grid" ? "bg-pink-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  )}
                  aria-label="Vista de cuadrícula"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-1.5 sm:p-2 transition-colors",
                    viewMode === "list" ? "bg-pink-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  )}
                  aria-label="Vista de lista"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "grid gap-4 sm:gap-5 md:gap-6",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
