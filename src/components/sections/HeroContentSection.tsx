"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Sparkles, Heart, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { MobileBannerCarousel } from "./MobileBannerCarousel";

const features = [
  {
    icon: Sparkles,
    text: "Fácil y Efectivo",
  },
  {
    icon: Heart,
    text: "Amable con la Piel y Ojos",
  },
  {
    icon: Leaf,
    text: "Eco-Consciente",
  },
];

export const HeroContentSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/slide1.png",
    "/images/slide3.png",
    "/images/lookbook-slide-2.png",
  ];

  const mobileSlides = slides.map((image, idx) => ({
    id: idx,
    image,
    alt: `KAHI Beauty Slide ${idx + 1}`,
  }));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-white via-white to-pink-50 py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Subtitle */}
        <p
          className={`mx-auto mb-8 max-w-2xl text-pretty text-sm font-medium text-gray-600 transition-all duration-1000 delay-400 sm:mb-9 sm:text-base md:mb-10 md:text-lg lg:max-w-3xl lg:text-xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Cuidado de la piel coreano revolucionario con ADN de Salmón, Aceite de Jeju 144HR y tecnología FILMEXEL™.
          Transforma tu piel naturalmente.
        </p>

        {/* Slideshow Banner - Below Subtitle */}
        <div
          className={`relative mx-auto mb-8 w-full transform transition-all duration-1000 delay-500 sm:mb-9 md:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Mobile slideshow */}
          <div className="block sm:hidden">
            <MobileBannerCarousel images={mobileSlides} />
          </div>

          {/* Desktop / tablet slideshow */}
          <div className="hidden sm:block">
            <div className="group relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative w-full aspect-[16/8] md:aspect-[21/9]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100 z-10" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <Image
                      src={slide}
                      alt={`KAHI Beauty Slide ${index + 1}`}
                      fill
                      className="h-full w-full object-cover"
                      quality={85}
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 shadow-lg opacity-0 transition-opacity duration-300 hover:bg-white hover:scale-110 group-hover:opacity-100 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 shadow-lg opacity-0 transition-opacity duration-300 hover:bg-white hover:scale-110 group-hover:opacity-100 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "w-8 bg-pink-500" : "bg-white/60 hover:bg-white/90"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div
          className={`flex flex-wrap justify-center gap-2 sm:gap-4 md:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full border border-pink-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-5 sm:py-2 sm:text-sm"
            >
              <feature.icon className="h-4 w-4 text-pink-500 sm:h-5 sm:w-5" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 mt-6 sm:mt-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link href="/shop" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="large"
              className="w-full rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02] hover:bg-pink-600 sm:w-auto sm:min-w-[200px]"
            >
              Comprar Ahora
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button variant="outline" size="large" className="w-full sm:w-auto sm:min-w-[200px] rounded-full">
              Saber Más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
