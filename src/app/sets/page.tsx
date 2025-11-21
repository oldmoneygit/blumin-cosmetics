"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Product } from "@/types";

export default function SetsPage() {
  const { addToCart, getItemCount } = useCart();
  const { showToast } = useToast();

  const setsCollection = useMemo(
    () =>
      products.filter(
        (product) => 
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

      <section className="bg-gradient-to-b from-pink-50 to-white pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-pink-600 sm:text-sm">
              Black Friday Sets
            </p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Comprá dos y llevate uno gratis
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Descubrí nuestros sets especiales con la promo exclusiva de Black Friday “comprá dos y llevate uno gratis”.
            </p>
          </div>
          <div className="mt-10">
            <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/banners/black-friday-sets-banner.png"
                alt="¡Comprá dos y llevate uno gratis!"
                width={1200}
                height={400}
                priority
                className="h-full w-full object-contain bg-white"
                sizes="(max-width: 640px) 100vw, 80vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {setsCollection.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {setsCollection.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-600">No hay sets disponibles en este momento.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

