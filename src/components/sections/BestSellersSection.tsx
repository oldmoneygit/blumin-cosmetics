"use client";

import { ProductCard } from "../ui/ProductCard";
import { Product } from "@/types";
import { Button } from "../ui/Button";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface BestSellersSectionProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const BestSellersSection = ({
  products,
  onAddToCart,
}: BestSellersSectionProps) => {
  // Filter to show only best sellers
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);

  return (
    <section className="py-20 bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-4">
            <TrendingUp className="h-4 w-4 text-pink-500" />
            <span className="text-sm font-semibold text-pink-700 uppercase tracking-wide">
              Más Amados
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Más Vendidos
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubrí nuestros productos KAHI más populares amados por miles de clientes en todo el mundo
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/shop">
            <Button variant="outline" size="large">
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
