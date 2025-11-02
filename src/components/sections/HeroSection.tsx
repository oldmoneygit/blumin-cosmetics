"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Sparkles, Heart, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/slide1.png",
    "/images/slide3.png",
  ];

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Auto-advance slideshow every 5 seconds
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
    <section className="relative w-full overflow-hidden bg-white mt-0" style={{ paddingTop: '100px' }}>
      {/* Main Banner - Full Width Edge to Edge */}
      <div
        className={`relative w-full transform transition-all duration-1000 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Banner Container with Background Image */}
        <div className="relative w-full overflow-hidden">
          {/* Background Image */}
          <img
            src="/images/hero-banner.png"
            alt="KAHI Cosmetics Banner"
            className="w-full h-auto object-cover"
          />

          {/* Gradient Overlay with Text and Button */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full">
              <div className="max-w-4xl mx-auto text-center">
                {/* Overlay Text */}
                <h2 className="text-lg sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-8 leading-tight px-4">
                  <span className="block">Firma tus rasgos y</span>
                  <span className="block">obtén beneficios complementarios</span>
                </h2>

                {/* Call to Action Button */}
                <div className="mt-4 sm:mt-6">
                  <Link href="/shop">
                    <Button
                      variant="primary"
                      size="large"
                      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      COMPRA AHORA
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Cuidado de la piel coreano revolucionario con ADN de Salmón, Aceite de Jeju 144HR y tecnología FILMEXEL™.
            Transforma tu piel naturalmente.
          </p>

          {/* Slideshow Banner - Below Subtitle */}
          <div
            className={`relative w-full max-w-6xl mx-auto mb-6 sm:mb-8 md:mb-10 transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative w-full overflow-hidden group rounded-2xl shadow-2xl">
              {/* Slideshow Images Container - Fixed aspect ratio */}
              <div className="relative w-full aspect-[16/7] md:aspect-[21/9]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide}
                      alt={`KAHI Beauty Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      quality={100}
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-pink-500 w-6 md:w-8"
                        : "bg-white/60 hover:bg-white/90"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Feature Badges */}
          <div
            className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 transform transition-all duration-1000 delay-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-pink-100"
              >
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                <span className="text-sm sm:text-base font-semibold text-gray-900">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transform transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Link href="/shop" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="large"
                className="w-full sm:w-auto sm:min-w-[200px] bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
    </section>
  );
};
