"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { faqs } from "@/data/products";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(faqs.map((faq) => faq.category)))];
  const filteredFAQs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Encontrá respuestas a las preguntas más comunes sobre nuestros productos
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg font-semibold transition-all duration-300",
                  selectedCategory === category
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {category === "all" ? "Todas" : category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <HelpCircle className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0",
                      openFAQ === faq.id && "transform rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openFAQ === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-5 pl-14">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    {faq.category && (
                      <span className="inline-block mt-3 text-xs uppercase tracking-wide text-pink-600 font-semibold">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-pink-50 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              ¿No encontraste tu respuesta?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestro equipo de atención al cliente está listo para ayudarte
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Contactanos
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

