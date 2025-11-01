"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, Flame, Star, Gift } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  textColor: string;
  image: string;
  badge?: {
    text: string;
    icon: React.ElementType;
    color: string;
  };
}

const banners: Banner[] = [
  {
    id: 1,
    title: "OFERTA LIMITADA",
    subtitle: "Hasta 40% OFF en Multi Balms",
    description: "Descubrí la revolución en cuidado de piel con nuestra línea completa KAHI",
    ctaText: "COMPRAR AHORA",
    ctaLink: "/shop?filter=sale",
    bgColor: "from-pink-500 via-pink-600 to-pink-700",
    textColor: "text-white",
    image: "/images/banner1.png",
    badge: {
      text: "HOT DEAL",
      icon: Flame,
      color: "bg-red-500",
    },
  },
  {
    id: 2,
    title: "NUEVO LANZAMIENTO",
    subtitle: "Wrinkle Bounce Multi Balm",
    description: "Tecnología avanzada anti-edad con ácido hialurónico y colágeno",
    ctaText: "DESCUBRIR",
    ctaLink: "/product/wrinkle-bounce-multi-balm",
    bgColor: "from-purple-500 via-purple-600 to-indigo-700",
    textColor: "text-white",
    image: "/images/slide2.png",
    badge: {
      text: "NUEVO",
      icon: Star,
      color: "bg-yellow-500",
    },
  },
  {
    id: 3,
    title: "ENVÍO GRATIS",
    subtitle: "En compras mayores a $50.000",
    description: "Aprovechá nuestro envío express gratis en toda Argentina",
    ctaText: "VER PRODUCTOS",
    ctaLink: "/shop",
    bgColor: "from-emerald-500 via-teal-600 to-cyan-700",
    textColor: "text-white",
    image: "/images/banner3.png",
    badge: {
      text: "REGALO",
      icon: Gift,
      color: "bg-green-500",
    },
  },
  {
    id: 4,
    title: "MÁS VENDIDO",
    subtitle: "Aqua Balm Stick - Hidratación 144HR",
    description: "El favorito de nuestras clientas para una piel radiante todo el día",
    ctaText: "PROBAR AHORA",
    ctaLink: "/product/aqua-balm-stick",
    bgColor: "from-blue-500 via-sky-600 to-cyan-700",
    textColor: "text-white",
    image: "/images/banner1.png",
    badge: {
      text: "BEST SELLER",
      icon: Zap,
      color: "bg-orange-500",
    },
  },
];

export const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Auto-advance every 5 seconds if not hovered
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentBanner = banners[currentSlide];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slides */}
          <div className="relative h-[400px] md:h-[500px]">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-in-out",
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : index < currentSlide
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                )}
              >
                {/* Background Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    banner.bgColor
                  )}
                />

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20px 20px, white 2px, transparent 0)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
                  {/* Left Content */}
                  <div className="flex-1 space-y-6 text-center md:text-left z-10">
                    {/* Badge */}
                    {banner.badge && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full animate-pulse">
                        <banner.badge.icon className="h-5 w-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">
                          {banner.badge.text}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2
                      className={cn(
                        "text-4xl md:text-6xl font-black uppercase tracking-tight leading-none",
                        banner.textColor
                      )}
                    >
                      {banner.title}
                    </h2>

                    {/* Subtitle */}
                    <h3
                      className={cn(
                        "text-2xl md:text-4xl font-bold",
                        banner.textColor
                      )}
                    >
                      {banner.subtitle}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-lg md:text-xl max-w-lg opacity-90",
                        banner.textColor
                      )}
                    >
                      {banner.description}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Link href={banner.ctaLink}>
                        <button className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-bold uppercase tracking-wide text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                          <span className="relative z-10">{banner.ctaText}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                          <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                            {banner.ctaText}
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="flex-1 relative h-64 md:h-full w-full md:w-auto mt-8 md:mt-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Decorative circles */}
                      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                      <div className="absolute w-48 h-48 bg-white/20 rounded-full blur-2xl animate-pulse animation-delay-300"></div>

                      {/* Product Image */}
                      <img
                        src={banner.image}
                        alt={banner.subtitle}
                        className="relative z-10 max-h-80 md:max-h-96 w-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
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
            {banners.map((_, index) => (
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
            {currentSlide + 1} / {banners.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / banners.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
};
