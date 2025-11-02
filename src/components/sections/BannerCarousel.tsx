"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const bannerImages = [
  {
    id: 1,
    image: "/images/hero-banner.png",
    alt: "Banner KAHI Multi Balm 1",
  },
  {
    id: 2,
    image: "/images/banner3.png",
    alt: "Banner KAHI Multi Balm 2",
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
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Images Container - Fixed height */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            {bannerImages.map((banner, index) => (
              <div
                key={banner.id}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                  index === currentSlide
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                )}
              >
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300"
            aria-label="Siguiente banner"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  index === currentSlide
                    ? "w-8 h-3 bg-white"
                    : "w-3 h-3 bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Ir al banner ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-6 right-6 z-20 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-bold">
            {currentSlide + 1} / {bannerImages.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / bannerImages.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
};
