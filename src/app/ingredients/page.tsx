import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { ingredients } from "@/data/products";

export default function IngredientsPage() {
  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Ingredientes Poderosos
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Descubrí la ciencia detrás de nuestros productos coreanos
            </p>
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="bg-white rounded-2xl overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 rounded-2xl mb-6">
                  <Image
                    src={ingredient.image || "/images/placeholder-ingredient.jpg"}
                    alt={ingredient.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Content */}
                <div className="px-0 pb-6">
                  {ingredient.tag && (
                    <span className="inline-block text-xs uppercase tracking-widest text-pink-600 font-semibold mb-3">
                      {ingredient.tag}
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {ingredient.name}
                  </h3>
                  {ingredient.scientificName && (
                    <p className="text-sm text-gray-500 italic mb-4">
                      {ingredient.scientificName}
                    </p>
                  )}
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    {ingredient.description}
                  </p>
                  {ingredient.benefits && ingredient.benefits.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Beneficios:
                      </h4>
                      <ul className="space-y-1">
                        {ingredient.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-6">
            Descubrí Nuestros Productos
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Todos nuestros productos están formulados con estos ingredientes poderosos 
            para ofrecerte los mejores resultados.
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-4 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors duration-300"
          >
            Ver Productos
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

