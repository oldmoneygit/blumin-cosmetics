"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/Button";

// Hotspot positions (percentage-based for responsiveness)
const hotspots = [
  {
    id: 1,
    x: 16, // percentage from left
    y: 45, // percentage from top
    product: {
      name: "KAHI Wrinkle Bounce Multi Balm",
      price: "$22.99",
      originalPrice: "$29.99",
      image: "/images/products/wrinkle-bounce-multi-balm.jpg",
      slug: "wrinkle-bounce-multi-balm",
      description: "Multi-purpose balm for wrinkles and hydration",
    },
  },
  {
    id: 2,
    x: 29.25,
    y: 45,
    product: {
      name: "KAHI Eye Balm Stick",
      price: "$24.99",
      originalPrice: "$32.99",
      image: "/images/products/eye-balm-stick.jpg",
      slug: "eye-balm-stick",
      description: "Hydrating eye balm stick for lifting and firming",
    },
  },
  {
    id: 3,
    x: 42.5,
    y: 45,
    product: {
      name: "KAHI Aqua Balm Stick",
      price: "$24.99",
      originalPrice: "$32.99",
      image: "/images/products/aqua-balm-stick.jpg",
      slug: "aqua-balm-stick",
      description: "Hydrating eye balm stick for lifting",
    },
  },
  {
    id: 4,
    x: 57,
    y: 45,
    product: {
      name: "KAHI Highlighter Stick",
      price: "$27.99",
      originalPrice: "$35.99",
      image: "/images/products/highlighter-stick.jpg",
      slug: "highlighter-stick",
      description: "Illuminating highlighter balm stick",
    },
  },
  {
    id: 5,
    x: 71.5,
    y: 45,
    product: {
      name: "KAHI Kisstin Balm Pink",
      price: "$25.99",
      originalPrice: "$33.99",
      image: "/images/products/kisstin-balm-pink.jpg",
      slug: "kisstin-balm-pink",
      description: "Nourishing pink lip balm stick",
    },
  },
  {
    id: 6,
    x: 85.5,
    y: 45,
    product: {
      name: "KAHI Extin C Balm Stick",
      price: "$26.99",
      originalPrice: "$34.99",
      image: "/images/products/extin-c-balm-stick.webp",
      slug: "extin-c-balm-stick",
      description: "Vitamin C brightening balm stick",
    },
  },
];

export const InteractiveLookbook = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);

  const handleHotspotClick = (id: number) => {
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  const handleClose = () => {
    setActiveHotspot(null);
  };

  const activeProduct = hotspots.find((h) => h.id === activeHotspot)?.product;
  const hoveredProduct = hotspots.find((h) => h.id === hoveredHotspot)?.product;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-4">
            SHOP THE LOOK
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestros productos KAHI. Hacé clic en los puntos para ver más detalles.
          </p>
        </div>

        {/* Lookbook Container */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/lookbook-main.webp"
              alt="KAHI Lookbook"
              className="w-full h-auto"
            />

            {/* Hotspots */}
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handleHotspotClick(hotspot.id)}
                onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                aria-label={`View ${hotspot.product.name}`}
              >
                {/* Hotspot Dot */}
                <div
                  className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 ${
                    activeHotspot === hotspot.id || hoveredHotspot === hotspot.id
                      ? "bg-pink-500 scale-125"
                      : "bg-white"
                  } shadow-lg flex items-center justify-center`}
                >
                  {/* Pulse Animation */}
                  <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-30"></span>

                  {/* Plus Icon */}
                  <span className="relative text-gray-900 font-bold text-lg">
                    {activeHotspot === hotspot.id ? "×" : "+"}
                  </span>
                </div>

                {/* Hover Card (Desktop only) */}
                {hoveredHotspot === hotspot.id && !activeHotspot && (
                  <div className="hidden md:block absolute z-20 w-64 bg-white rounded-2xl shadow-2xl p-4 pointer-events-none"
                    style={{
                      left: hotspot.x > 50 ? "auto" : "120%",
                      right: hotspot.x > 50 ? "120%" : "auto",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img
                        src={hotspot.product.image}
                        alt={hotspot.product.name}
                        className="max-w-full max-h-full object-contain p-4"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                      {hotspot.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-pink-600">{hotspot.product.price}</span>
                      {hotspot.product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {hotspot.product.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {hotspot.product.description}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile/Active Product Card */}
          {activeProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 md:absolute md:inset-auto md:bg-transparent md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Product Image */}
                <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="max-w-full max-h-full object-contain p-6"
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activeProduct.name}
                </h3>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-pink-600">
                    {activeProduct.price}
                  </span>
                  {activeProduct.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {activeProduct.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6">
                  {activeProduct.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link href={`/product/${activeProduct.slug}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="medium"
                      className="w-full"
                    >
                      Ver Detalles
                    </Button>
                  </Link>
                  <Link href={`/product/${activeProduct.slug}`} className="flex-1">
                    <Button
                      variant="primary"
                      size="medium"
                      className="w-full"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Comprar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
