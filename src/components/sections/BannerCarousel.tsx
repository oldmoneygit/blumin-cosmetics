"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const bannerImages = [
  {
    id: 1,
    image: "/images/hero-banner.png",
    alt: "Banner KAHI Multi Balm 1",
    align: "object-left",
  },
  {
    id: 2,
    image: "/images/banner3.png",
    alt: "Banner KAHI Multi Balm 2",
    align: "object-center",
  },
];

export const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative py-8 sm:py-10">
      {/* Full-width gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-pink-50/50" />

      <div className="relative flex w-full flex-col gap-6 px-0 sm:mx-auto sm:max-w-7xl sm:px-6 lg:px-8">
        <div className="grid w-full gap-6 sm:grid-cols-[1fr,1.1fr] sm:items-center">
          {/* Text column */}
          <div className="space-y-4 text-center sm:text-left">
            <span className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-pink-600 sm:text-sm">
              Kahi Moments
            </span>
            <h2 className="text-2xl font-black uppercase text-gray-900 sm:text-3xl lg:text-4xl">
              Seleccionado, empaquetado y con descuento
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Pasteles suaves, tratamientos premium y combos curados para tu rutina. Deslizá y encontrá tu favorita.
            </p>
            <div className="hidden sm:flex gap-3">
              <button
                onClick={prevSlide}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 transition-all hover:border-pink-500 hover:bg-pink-50"
                aria-label="Banner anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 transition-all hover:border-pink-500 hover:bg-pink-50"
                aria-label="Siguiente banner"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative w-full">
            <div
              className="group relative w-full overflow-hidden rounded-none bg-white sm:rounded-3xl sm:ring-1 sm:ring-pink-100"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full aspect-[21/11] sm:aspect-[22/9] lg:aspect-[24/9]">
                {bannerImages.map((banner, index) => (
                  <div
                    key={banner.id}
                    className={cn(
                      "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out",
                      index === currentSlide ? "opacity-100 z-10" : "pointer-events-none opacity-0"
                    )}
                  >
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      priority={index === 0}
                      quality={85}
                      sizes="100vw"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              {/* Mobile navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-pink-500 shadow-lg backdrop-blur hover:bg-white sm:hidden"
                aria-label="Banner anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-pink-500 shadow-lg backdrop-blur hover:bg-white sm:hidden"
                aria-label="Siguiente banner"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 sm:justify-start">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                index === currentSlide ? "w-8 bg-pink-500" : "w-3 bg-pink-200 hover:bg-pink-300"
              )}
              aria-label={`Ir al banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
