"use client";

import { Ingredient } from "@/types";
import { Badge } from "../ui/Badge";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

export const IngredientsSection = ({ ingredients }: IngredientsSectionProps) => {
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-4">
            <Sparkles className="h-4 w-4 text-pink-500" />
            <span className="text-sm font-semibold text-pink-700 uppercase tracking-wide">
              Belleza Respaldada por la Ciencia
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ingredientes Poderosos
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubrí los ingredientes revolucionarios que hacen que los productos KAHI sean únicamente efectivos
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="space-y-24">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                onMouseEnter={() => setSelectedIngredient(ingredient.id)}
                onMouseLeave={() => setSelectedIngredient(null)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                  {/* Placeholder for ingredient image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Sparkles className="h-20 w-20 text-pink-400 mx-auto mb-4 opacity-50" />
                      <p className="text-gray-500 font-semibold">
                        {ingredient.name}
                      </p>
                    </div>
                  </div>

                  {/* Actual image when available */}
                  {ingredient.image && (
                    <Image
                      src={ingredient.image}
                      alt={ingredient.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent transition-opacity duration-500 ${
                      selectedIngredient === ingredient.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-white text-sm font-semibold">
                        {ingredient.scientificName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl opacity-20"></div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ingredient.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="default" size="small">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {ingredient.name}
                </h3>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {ingredient.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    Beneficios Clave:
                  </h4>
                  <ul className="space-y-3">
                    {ingredient.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-1 w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scientific Name */}
                {ingredient.scientificName && (
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Nombre Científico
                    </p>
                    <p className="text-gray-900 font-medium italic">
                      {ingredient.scientificName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Experimentá la Ciencia de la Belleza
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Todos los productos KAHI están formulados con estos ingredientes poderosos
              para máxima eficacia y resultados visibles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-pink-500 rounded-full font-bold uppercase tracking-wide hover:shadow-xl transition-all duration-300 hover:scale-105">
                Comprar Ingredientes
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-pink-500 transition-all duration-300">
                Saber Más
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
