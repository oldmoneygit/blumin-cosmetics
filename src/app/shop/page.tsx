"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Filter, X, Grid, List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ShopContent() {
  const searchParams = useSearchParams();
  const { addToCart, getItemCount } = useCart();
  const { showToast } = useToast();
  
  const filter = searchParams.get("filter") || "";
  const category = searchParams.get("category") || "";
  
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filter
    if (filter === "best-sellers") {
      filtered = filtered.filter((p) => p.isBestSeller);
    } else if (filter === "new") {
      filtered = filtered.filter((p) => p.isNew);
    }

    // Apply category
    if (category === "multi-balm") {
      filtered = filtered.filter((p) => p.category === "Multi Balm Sticks");
    } else if (category === "skincare") {
      filtered = filtered.filter((p) => p.category === "Sérum" || p.category === "Hidratante" || p.category === "Tratamiento");
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [filter, category, sortBy]);

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

      {/* Page Header */}
      <section className="pt-24 pb-10 bg-gradient-to-b from-pink-50 to-white sm:pt-28 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2 sm:text-4xl md:text-5xl">
                {filter === "best-sellers"
                  ? "Más Vendidos"
                  : filter === "new"
                  ? "Novedades"
                  : category === "multi-balm"
                  ? "Multi Balm Sticks"
                  : category === "skincare"
                  ? "Skincare"
                  : "Tienda"}
              </h1>
              <p className="text-base text-gray-600 sm:text-lg">
                {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
              </p>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:px-4 sm:text-base"
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
                    "p-2 transition-colors",
                    viewMode === "grid" ? "bg-pink-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === "list" ? "bg-pink-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              )}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">No se encontraron productos</p>
              <Link href="/shop">
                <Button variant="outline">Ver Todos los Productos</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <Header cartItemCount={0} />
        <div className="pt-28 pb-12 flex items-center justify-center">
          <p className="text-lg text-gray-600">Cargando...</p>
        </div>
        <Footer />
      </main>
    }>
      <ShopContent />
    </Suspense>
  );
}

