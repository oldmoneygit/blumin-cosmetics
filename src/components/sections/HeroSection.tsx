"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
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

export const HeroSection = () => {
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
    <section className="relative mt-32 w-full overflow-hidden bg-white sm:mt-24 lg:mt-28">
      {/* Main Banner - Full Width Edge to Edge */}
      <div
        className={`relative w-full transform transition-all duration-1000 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Banner Container with Background Image */}
        <div className="relative w-full overflow-hidden">
          {/* Background Image */}
          <Image
            src="/images/hero-banner.png"
            alt="KAHI Cosmetics Banner"
            width={1920}
            height={900}
            priority
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 100vw, 100vw"
            placeholder="empty"
          />

          {/* Gradient Overlay with Text and Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-black/70 via-black/40 to-black/10">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 xl:px-16">
              <div className="mx-auto max-w-2xl text-center sm:max-w-3xl lg:max-w-4xl">
                {/* Overlay Text */}
                <h2 className="px-2 text-balance text-2xl font-bold leading-tight text-white sm:px-4 sm:text-4xl md:text-5xl lg:text-[3.75rem]">
                  Tu imprescindible para brillar en cualquier lugar.
                </h2>

                {/* Call to Action Button */}
                <div className="mt-5 sm:mt-6">
                  <Link href="/shop">
                    <Button
                      variant="primary"
                      size="large"
                      className="rounded-full bg-pink-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-pink-600 hover:shadow-xl sm:px-10 sm:py-4 sm:text-base"
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

    </section>
  );
};
