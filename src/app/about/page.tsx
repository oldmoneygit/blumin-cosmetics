import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Heart, Sparkles, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Nuestra Historia
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Descubrí la belleza coreana con ingredientes naturales y tecnología innovadora
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-6">
                Nuestra Misión
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/images/about/mission.jpg"
                alt="Nuestra misión"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada producto que creamos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Calidad Premium
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos solo los mejores ingredientes naturales y tecnología coreana 
                de vanguardia para garantizar la máxima eficacia en cada producto.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Innovación
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Incorporamos las últimas investigaciones y tecnologías en cuidado de la 
                piel para ofrecerte productos que realmente funcionan.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Sustentabilidad
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Comprometidos con el medio ambiente, nuestros productos son libres de 
                crueldad animal y respetuosos con el planeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 order-2 md:order-1">
              <Image
                src="/images/about/commitment.jpg"
                alt="Nuestro compromiso"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-6">
                Nuestro Compromiso
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Cada producto de Blumin está diseñado pensando en ti y en el planeta. 
                  Nos comprometemos a:
                </p>
                <ul className="space-y-3 list-disc list-inside text-gray-700">
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

