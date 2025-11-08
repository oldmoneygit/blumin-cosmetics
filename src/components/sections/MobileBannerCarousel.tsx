"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBannerCarouselProps {
  images?: { id: number; image: string; alt: string }[];
  className?: string;
}

const defaultBanners = [
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

export const MobileBannerCarousel = ({
  images = defaultBanners,
  className,
}: MobileBannerCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className={cn("relative w-full overflow-hidden bg-white", className)}>
      <div className="relative aspect-[3/2] w-full">
        {images.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out",
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
              className="h-full w-full object-contain object-center bg-white"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => goToSlide((currentSlide - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-pink-500 shadow-lg backdrop-blur"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-pink-500 shadow-lg backdrop-blur"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              index === currentSlide ? "w-8 bg-pink-500" : "w-3 bg-pink-200"
            )}
            aria-label={`Ir al banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

