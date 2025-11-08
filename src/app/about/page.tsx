'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Heart, Sparkles, Leaf } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function AboutPage() {
  const { getItemCount } = useCart();

  return (
    <main className="min-h-screen">
      <Header cartItemCount={getItemCount()} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pink-50 to-white pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-5 text-3xl font-black uppercase tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Nuestra Historia
            </h1>
            <p className="text-pretty text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              Descubrí la belleza coreana con ingredientes naturales y tecnología innovadora
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 sm:gap-12 md:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-5 text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Nuestra Misión
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  En Blumin, creemos en el poder de la belleza natural y la innovación coreana. 
                  Nuestra misión es ofrecer productos de cuidado de la piel y maquillaje de alta 
                  calidad que combinan ingredientes naturales con tecnología avanzada.
                </p>
                <p>
                  Inspirados en las tradiciones de belleza coreanas y comprometidos con la 
                  sustentabilidad, cada producto está diseñado para realzar tu belleza natural 
                  mientras cuidas tu piel y el planeta.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src="/images/about/mission.jpg"
                alt="Nuestra misión"
                fill
                className="object-cover"
                priority
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Nuestros Valores
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-base text-gray-600 sm:text-lg">
              Los principios que guían cada decisión y cada producto que creamos
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="text-center">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-600 sm:mb-6 sm:h-16 sm:w-16">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                Calidad Premium
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                Utilizamos solo los mejores ingredientes naturales y tecnología coreana 
                de vanguardia para garantizar la máxima eficacia en cada producto.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-600 sm:mb-6 sm:h-16 sm:w-16">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                Innovación
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                Incorporamos las últimas investigaciones y tecnologías en cuidado de la 
                piel para ofrecerte productos que realmente funcionan.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-600 sm:mb-6 sm:h-16 sm:w-16">
                <Leaf className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                Sustentabilidad
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                Comprometidos con el medio ambiente, nuestros productos son libres de 
                crueldad animal y respetuosos con el planeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 sm:gap-12 md:grid-cols-2 lg:gap-16">
            <div className="order-2 relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 md:order-1">
              <Image
                src="/images/about/commitment.jpg"
                alt="Nuestro compromiso"
                fill
                className="object-cover"
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="mb-5 text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Nuestro Compromiso
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  Cada producto de Blumin está diseñado pensando en ti y en el planeta. 
                  Nos comprometemos a:
                </p>
                <ul className="list-inside list-disc space-y-3 text-sm text-gray-700 sm:text-base">
                  <li>Utilizar ingredientes 100% naturales y efectivos</li>
                  <li>Garantizar productos libres de crueldad animal</li>
                  <li>Mantener empaques sustentables y reciclables</li>
                  <li>Ofrecer resultados visibles desde el primer uso</li>
                  <li>Proporcionar una experiencia de belleza excepcional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

