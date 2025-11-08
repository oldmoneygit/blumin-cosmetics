"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { isValidEmail } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    
    if (!isValidEmail(formData.email)) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const { getItemCount } = useCart();

  return (
    <main className="min-h-screen">
      <Header cartItemCount={getItemCount()} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pink-50 to-white pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-black uppercase tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Contactanos
            </h1>
            <p className="text-pretty text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sm:space-y-8">
                <div className="rounded-3xl border border-pink-100 bg-pink-50/40 p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-pink-600">
                      <Mail className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 sm:text-lg">Email</h3>
                    </div>
                  </div>
                  <p className="pl-12 text-sm text-gray-600 sm:pl-0 sm:text-base">info@blumin.com</p>
                  <p className="pl-12 text-sm text-gray-600 sm:pl-0 sm:text-base">ventas@blumin.com</p>
                </div>

                <div className="rounded-3xl border border-pink-100 bg-pink-50/40 p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-pink-600">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 sm:text-lg">Teléfono</h3>
                    </div>
                  </div>
                  <p className="pl-12 text-sm text-gray-600 sm:pl-0 sm:text-base">+54 11 1234-5678</p>
                  <p className="pl-12 text-sm text-gray-600 sm:pl-0 sm:text-base">Lun - Vie: 9:00 - 18:00</p>
                </div>

                <div className="rounded-3xl border border-pink-100 bg-pink-50/40 p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-pink-600">
                      <MapPin className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 sm:text-lg">Dirección</h3>
                    </div>
                  </div>
                  <p className="pl-12 text-sm text-gray-600 sm:pl-0 sm:text-base">
                    Av. Corrientes 1234<br />
                    C1043AAX, Buenos Aires<br />
                    Argentina
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
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
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+54 11 1234-5678"
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
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:px-4 sm:text-base"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consultation">Consulta General</option>
                      <option value="order">Consulta sobre Pedido</option>
                      <option value="product">Consulta sobre Producto</option>
                      <option value="return">Devolución o Cambio</option>
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
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:px-4 sm:text-base"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                    ¡Mensaje enviado exitosamente! Te responderemos pronto.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                    Por favor, verifica que el email sea válido.
                  </div>
                )}

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

