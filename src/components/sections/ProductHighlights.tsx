"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { SkincareRoutineSection } from "./SkincareRoutineSection";

const highlights = [
  {
    id: 1,
    title: "MULTI BALM STICK",
    stat: "Reduce las Patas de Gallo en un 5.32%",
    description: "*Evaluación clínica realizada por DATC (2022)",
    image: "/images/highlight-01.png",
    link: "/product/wrinkle-bounce-multi-balm",
    bgColor: "bg-pink-100",
  },
  {
    id: 2,
    title: "EYE BALM STICK",
    stat: "Levanta las Comisuras de los Ojos en un 6.27%",
    description: "*Evaluación clínica realizada por DATC (2021)",
    image: "/images/highlight-02.png",
    link: "/product/aqua-balm-stick",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    title: "SKIN FIT BLENDING ESSENCE",
    stat: "Minimiza la Apariencia de los Poros en un 13.7%",
    description: "*Evaluación clínica realizada por P&K Skin Research Center (2020)",
    image: "/images/highlight-03.png",
    link: "/product/fine-line-bounce-collagen-serum",
    bgColor: "bg-purple-100",
  },
];

export const ProductHighlights = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-4">
            BRILLA. HIDRATA. REJUVENECE.
          </h2>
          
          {/* Video Section */}
          <div className="relative w-full max-w-6xl mx-auto mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
            <div className="relative w-full aspect-[16/7] md:aspect-[21/9]">
              <video
                src="/videos/videoo.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
                style={{ width: '100%', height: '100%' }}
              >
                Tu navegador no soporta videos.
              </video>
            </div>
          </div>

          {/* Skincare Routine Section */}
          <div className="mb-6 sm:mb-8">
            <SkincareRoutineSection />
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="group relative transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative w-full overflow-hidden rounded-3xl">
                <div className="relative h-72 w-full sm:h-72 lg:h-80">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={highlight.id === 1}
                  />
                </div>

                {/* Overlay Text */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-white/90 text-sm font-medium mb-4">
                    {highlight.stat}
                  </p>
                  <p className="text-white/70 text-xs mb-4">
                    {highlight.description}
                  </p>
                  <Link href={highlight.link}>
                    <Button
                      variant="primary"
                      size="medium"
                      className="w-full bg-white text-gray-900 hover:bg-pink-500 hover:text-white"
                    >
                      COMPRAR AHORA
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  # {highlight.title}
                </h3>
                <p className="text-sm font-semibold text-pink-600 mb-1">
                  {highlight.stat}
                </p>
                <p className="text-xs text-gray-500">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
