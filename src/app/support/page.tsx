"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Phone, MessageCircle, Clock, Send } from "lucide-react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        orderNumber: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Atención al Cliente
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Estamos aquí para ayudarte con cualquier consulta o problema
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">Respuesta en 24-48 horas</p>
              <a href="mailto:support@blumin.com" className="text-pink-600 font-semibold hover:text-pink-700">
                support@blumin.com
              </a>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600 mb-2">Lun - Vie: 9:00 - 18:00</p>
              <a href="tel:+541112345678" className="text-pink-600 font-semibold hover:text-pink-700">
                +54 11 1234-5678
              </a>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chat en Vivo</h3>
              <p className="text-gray-600 mb-2">Respuesta inmediata</p>
              <button className="text-pink-600 font-semibold hover:text-pink-700">
                Iniciar Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Enviar Consulta
              </h2>
              <p className="text-gray-600">
                Completa el formulario y te responderemos lo antes posible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                    Número de Pedido (opcional)
                  </label>
                  <Input
                    id="orderNumber"
                    name="orderNumber"
                    type="text"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="ORD-123456"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="order">Consulta sobre Pedido</option>
                    <option value="product">Consulta sobre Producto</option>
                    <option value="return">Devolución o Cambio</option>
                    <option value="shipping">Envío y Seguimiento</option>
                    <option value="technical">Problema Técnico</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe tu consulta o problema aquí..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  ¡Consulta enviada exitosamente! Te responderemos pronto.
                </div>
              )}

              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">
                  Tiempo promedio de respuesta: 24-48 horas
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? "Enviando..." : "Enviar Consulta"}
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <a
              href="/shipping"
              className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-pink-500 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Envíos y Devoluciones</h3>
              <p className="text-gray-600 text-sm">Información sobre envíos, tiempos y políticas</p>
            </a>
            <a
              href="/faq"
              className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-pink-500 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Preguntas Frecuentes</h3>
              <p className="text-gray-600 text-sm">Encuentra respuestas a preguntas comunes</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

