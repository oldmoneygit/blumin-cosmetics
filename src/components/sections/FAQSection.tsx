"use client";

import { useState } from "react";
import { FAQ } from "@/types";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Group FAQs by category
  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-4">
            <HelpCircle className="h-4 w-4 text-pink-500" />
            <span className="text-sm font-semibold text-pink-700 uppercase tracking-wide">
              ¿Necesitás Ayuda?
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>

          <p className="text-xl text-gray-600">
            Encontrá respuestas a las preguntas más comunes sobre nuestros productos KAHI
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-pink-300 hover:shadow-lg"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors duration-300 hover:bg-pink-50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-lg font-bold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-6 w-6 text-pink-500 flex-shrink-0 transition-transform duration-300",
                    openIndex === index ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>

              {/* Answer */}
              <div
                id={`faq-answer-${faq.id}`}
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="border-t-2 border-pink-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>

                    {/* Category Badge */}
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-pink-50 to-cream-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            ¿Todavía tenés preguntas?
          </h3>
          <p className="text-gray-600 mb-6">
            Nuestro equipo de atención al cliente está aquí para ayudarte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@blumin.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-pink-400 text-white rounded-full font-bold uppercase tracking-wide text-sm hover:bg-pink-500 hover:shadow-lg transition-all duration-300"
            >
              Envianos un Email
            </a>
            <a
              href="tel:+5511999999999"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 border-2 border-gray-900 rounded-full font-bold uppercase tracking-wide text-sm hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Llamanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
