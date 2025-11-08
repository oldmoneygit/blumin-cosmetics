"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Product } from "@/types";

const FEATURED_SET_SLUGS = [
  "balm-lovers-set",
  "multi-balm-core-cream-moisturizer",
  "multi-balm-blending-essence",
  "multi-balm-collagen-ampoule-mist",
  "multi-balm-han-gyob-cream",
  "kahi-essentials-set",
  "kahi-deluxe-set",
  "best-seller-set",
  "wrinkle-bounce-multi-balm-duo-edition",
  "best-seller-set-new",
  "skin-clarity-care-set",
];

export default function SetsCollectionPage() {
  const { addToCart, getItemCount } = useCart();
  const { showToast } = useToast();

  const setsCollection = useMemo(
    () =>
      FEATURED_SET_SLUGS.map((slug) =>
        products.find((product) => product.slug === slug && product.inStock)
      ).filter((product): product is Product => Boolean(product)),
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

      <section className="bg-gradient-to-b from-white via-pink-50/30 to-white pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <p className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-pink-600 sm:text-sm">
            Colección de Sets
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Sets curados para cada necesidad
          </h1>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Hidratación, tratamiento, regalos y combos premium listos para sorprender. Elegí tu set ideal y optimizá tu rutina en un solo paso.
          </p>
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


