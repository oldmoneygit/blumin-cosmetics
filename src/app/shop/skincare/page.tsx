"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { Grid, List, Sparkles, Droplet, Wind, Shield, FlaskConical, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Skincare categories
const skincareCategories = [
  {
    id: "hidratante",
    name: "Hidratantes",
    icon: Droplet,
    description: "Cremas y lociones para hidratación profunda",
    color: "from-blue-50 to-blue-100",
  },
  {
    id: "serum",
    name: "Sérums",
    icon: FlaskConical,
    description: "Tratamientos concentrados para resultados intensivos",
    color: "from-purple-50 to-purple-100",
  },
  {
    id: "esencia",
    name: "Esencias",
    icon: Sparkles,
    description: "Preparadores de piel para mejor absorción",
    color: "from-pink-50 to-pink-100",
  },
  {
    id: "mascarilla",
    name: "Mascarillas",
    icon: Shield,
    description: "Tratamientos intensivos para uso semanal",
    color: "from-green-50 to-green-100",
  },
  {
    id: "limpiador",
    name: "Limpiadores",
    icon: Wind,
    description: "Limpieza profunda sin resecar",
    color: "from-cyan-50 to-cyan-100",
  },
  {
    id: "tratamiento",
    name: "Tratamientos",
    icon: Sparkles,
    description: "Soluciones especializadas para necesidades específicas",
    color: "from-amber-50 to-amber-100",
  },
];

export default function SkincarePage() {
  const { addToCart, getItemCount } = useCart();
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter skincare products
  const skincareProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.category === "Sérum" ||
        p.category === "Hidratante" ||
        p.category === "Tratamiento" ||
        p.category === "Limpiador" ||
        p.category === "Mascarilla" ||
        p.category === "Esencia" ||
        p.category === "Cuidado de Ojos"
    );
  }, []);

  // Filter by selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return skincareProducts;

    const categoryMap: { [key: string]: string } = {
      hidratante: "Hidratante",
      serum: "Sérum",
      esencia: "Esencia",
      mascarilla: "Mascarilla",
      limpiador: "Limpiador",
      tratamiento: "Tratamiento",
    };

    return skincareProducts.filter(
      (p) => p.category === categoryMap[selectedCategory]
    );
  }, [skincareProducts, selectedCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === "price-low") return sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "name") return sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [filteredProducts, sortBy]);

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: { [key: string]: Product[] } = {};
    skincareProducts.forEach((product) => {
      const category = product.category.toLowerCase().replace(/\s/g, "-");
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });
    return grouped;
  }, [skincareProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <main className="min-h-screen">
      <Header cartItemCount={getItemCount()} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-white md:bg-transparent">
        {/* Background Image - Desktop Only */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/banners/kahi.jpg"
            alt="KAHI Background"
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
              SKINCARE
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              Rutina completa de cuidado de la piel con productos KAHI
            </p>
            <p className="text-lg text-gray-600">
              Descubrí nuestra selección completa de sérums, cremas hidratantes, esencias, mascarillas y tratamientos especializados para una piel radiante y saludable.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-4 sm:py-6 md:py-8 bg-white border-b border-gray-200 sticky top-[70px] sm:top-[80px] md:top-[100px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300",
                selectedCategory === null
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              Todas las Categorías
            </button>
            {skincareCategories.map((category) => {
              const Icon = category.icon;
              const count = productsByCategory[category.id]?.length || 0;
              if (count === 0) return null;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2",
                    selectedCategory === category.id
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">({count})</span>
                </button>
              );
            })}
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
                {selectedCategory && (
                  <span className="ml-1 sm:ml-2">
                    en <span className="font-semibold text-gray-900">
                      {skincareCategories.find((c) => c.id === selectedCategory)?.name}
                    </span>
                  </span>
                )}
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
          {sortedProducts.length > 0 ? (
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
          ) : (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <p className="text-lg sm:text-xl text-gray-600 mb-4 px-4">
                No se encontraron productos en esta categoría
              </p>
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Ver Todas las Categorías
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Category Sections */}
      {!selectedCategory && (
        <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center px-4">
              Explora por Categoría
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {skincareCategories.map((category) => {
                const Icon = category.icon;
                const categoryProducts = productsByCategory[category.id] || [];
                if (categoryProducts.length === 0) return null;

                return (
                  <div
                    key={category.id}
                    className={cn(
                      "bg-gradient-to-br rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group",
                      category.color
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-gray-700 group-hover:scale-110 transition-transform" />
                      <span className="text-xl sm:text-2xl font-bold text-gray-700">
                        {categoryProducts.length}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      Ver productos
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 px-4">
            ¿Por qué elegir KAHI Skincare?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mt-8 sm:mt-10 md:mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🧬</div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Tecnología Avanzada</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Ingredientes como ADN de Salmón (PDRN) y tecnología FILMEXEL™ para resultados visibles
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌿</div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">100% Natural</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Fórmulas veganas y cruelty-free con ingredientes naturales de Jeju
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 shadow-sm sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✨</div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Resultados Comprobados</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Miles de clientes satisfechos con resultados visibles en 2-4 semanas
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
