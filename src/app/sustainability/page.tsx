import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Leaf, Recycle, Heart, Globe } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Sustentabilidad
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Comprometidos con el planeta y el bienestar animal
            </p>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-6">
                Nuestro Compromiso
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  En Blumin, creemos que la belleza debe ser sostenible. Nos comprometemos 
                  a crear productos que no solo realcen tu belleza, sino que también cuiden 
                  el planeta y respeten a todos los seres vivos.
                </p>
                <p>
                  Trabajamos constantemente para reducir nuestro impacto ambiental, 
                  utilizando ingredientes naturales, empaques reciclables y procesos 
                  de producción responsables.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/images/sustainability/commitment.jpg"
                alt="Nuestro compromiso"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-4">
              Nuestras Prácticas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                100% Cruelty-Free
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nunca testeamos en animales. Todos nuestros productos son certificados 
                cruelty-free.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Ingredientes Naturales
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos ingredientes naturales y sostenibles, minimizando el uso 
                de químicos sintéticos.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <Recycle className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Empaques Reciclables
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nuestros empaques están diseñados para ser reciclables y reducir 
                el desperdicio plástico.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Producción Responsable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Trabajamos con proveedores que comparten nuestros valores de 
                sustentabilidad y responsabilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-8 text-center">
              Nuestros Objetivos
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Reducir el plástico en un 50% para 2025
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Estamos trabajando para reemplazar todos nuestros empaques plásticos 
                  con alternativas biodegradables y reciclables.
                </p>
              </div>
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Carbono neutral para 2026
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprometidos a compensar todas nuestras emisiones de carbono 
                  a través de proyectos de reforestación y energía renovable.
                </p>
              </div>
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  100% ingredientes sostenibles
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nuestro objetivo es que todos los ingredientes provengan de fuentes 
                  sostenibles y éticas para 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

