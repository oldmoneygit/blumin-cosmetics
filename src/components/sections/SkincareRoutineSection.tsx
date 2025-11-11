"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

interface RoutineStep {
  step: number;
  name: string;
  productName: string;
  productSlug?: string;
}

const routineSteps: RoutineStep[] = [
  {
    step: 1,
    name: "Espuma limpiadora",
    productName: "Limpiador Espumoso en Crema",
    productSlug: "cream-foaming-cleanser",
  },
  {
    step: 2,
    name: "Mascarilla",
    productName: "Máscara Facial Hidratante Rebote de Arrugas Water Full",
    productSlug: "water-full-hydrating-face-mask",
  },
  {
    step: 3,
    name: "Sérum",
    productName: "Sérum Rebote de Colágeno para Líneas Finas",
    productSlug: "fine-line-bounce-collagen-serum",
  },
  {
    step: 4,
    name: "Esencia mezcladora",
    productName: "Esencia Mezcladora Ajuste Perfecto Rebote de Arrugas",
    productSlug: "skin-fit-blending-essence",
  },
  {
    step: 5,
    name: "Ampolla",
    productName: "Ampolla Rebote Anti-Manchas",
    productSlug: "wrinkle-bounce-blemish-ampoule",
  },
  {
    step: 6,
    name: "Crema principal",
    productName: "Crema Core de Colágeno",
    productSlug: "core-collagen-cream",
  },
  {
    step: 7,
    name: "Bálsamo",
    productName: "Bálsamo en barra de colágeno",
    productSlug: "wrinkle-bounce-multi-balm",
  },
];

export const SkincareRoutineSection = () => {
  const getProductImage = (slug?: string) => {
    if (!slug) return null;
    const product = products.find((p) => p.slug === slug);
    return product?.images[0] || null;
  };

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-4">
            RUTINA DE CUIDADO DE LA PIEL WRINKLE BOUNCE
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base text-pink-600 font-semibold">
            <span>#Reafirmante</span>
            <span>#Hidratante</span>
            <span>#Iluminador</span>
            <span>#Colágeno</span>
          </div>
        </div>

        {/* Routine Timeline */}
        <div className="relative">
          {/* Horizontal Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-pink-400" />

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8">
            {routineSteps.map((step, index) => {
              const productImage = getProductImage(step.productSlug);
              const isLast = index === routineSteps.length - 1;

              return (
                <div
                  key={step.step}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-400 border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-white font-black text-lg md:text-xl">
                        {step.step}
                      </span>
                    </div>
                    {/* Connecting line to next step (mobile only) */}
                    {!isLast && (
                      <div className="hidden md:block lg:hidden absolute top-10 left-full w-full h-1 bg-pink-400 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="mb-4">
                    <p className="text-pink-600 font-bold text-sm md:text-base mb-2">
                      PASO {step.step}
                    </p>
                    <p className="text-gray-900 font-semibold text-sm md:text-base mb-2">
                      {step.name}
                    </p>
                  </div>

                  {/* Product Image & Link */}
                  {productImage && step.productSlug ? (
                    <Link
                      href={`/product/${step.productSlug}`}
                      className="group relative w-full max-w-[120px] md:max-w-[150px] mx-auto aspect-square rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <Image
                        src={productImage}
                        alt={step.productName}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    </Link>
                  ) : (
                    <div className="w-full max-w-[120px] md:max-w-[150px] mx-auto aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs text-center px-2">
                        {step.productName}
                      </span>
                    </div>
                  )}

                  {/* Product Name */}
                  <p className="mt-3 text-xs md:text-sm text-gray-700 font-medium leading-tight max-w-[150px]">
                    {step.productName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/shop/skincare"
            className="inline-block px-8 py-4 bg-pink-500 text-white font-bold uppercase tracking-wide rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Explorar Rutina Completa
          </Link>
        </div>
      </div>
    </div>
  );
};

