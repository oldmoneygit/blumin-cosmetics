"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { isValidEmail } from "@/lib/utils";

const footerNavigation = {
  shop: [
    { name: "Todos los Productos", href: "/shop" },
    { name: "Más Vendidos", href: "/shop?filter=best-sellers" },
    { name: "Novedades", href: "/shop?filter=new" },
    { name: "Multi Balm Sticks", href: "/shop?category=multi-balm" },
    { name: "Cuidado de la Piel", href: "/shop?category=skincare" },
  ],
  about: [
    { name: "Nuestra Historia", href: "/about" },
    { name: "Ingredientes", href: "/ingredients" },
    { name: "Sustentabilidad", href: "/sustainability" },
    { name: "Preguntas Frecuentes", href: "/faq" },
    { name: "Contactanos", href: "/contact" },
  ],
  support: [
    { name: "Envíos y Devoluciones", href: "/shipping" },
    { name: "Rastrear Pedido", href: "/track-order" },
    { name: "Guía de Tamaños", href: "/size-guide" },
    { name: "Atención al Cliente", href: "/support" },
    { name: "Términos y Condiciones", href: "/terms" },
  ],
};

const paymentMethods = [
  { name: "Visa", icon: "💳" },
  { name: "Mastercard", icon: "💳" },
  { name: "American Express", icon: "💳" },
  { name: "PayPal", icon: "💰" },
  { name: "PIX", icon: "📱" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Por favor ingresá tu correo electrónico");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Por favor ingresá un correo electrónico válido");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                Unite a Nuestro Newsletter
              </h3>
              <p className="text-gray-400">
                Suscribite para ofertas exclusivas, consejos de cuidado de la piel y acceso anticipado a nuevos productos
              </p>
            </div>

            <div>
              {isSubscribed ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-400 font-semibold">
                    ✓ ¡Gracias por suscribirte! Revisá tu correo para recibir un regalo de bienvenida.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Ingresá tu correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={emailError}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    isLoading={isSubmitting}
                    className="whitespace-nowrap"
                  >
                    Suscribirme
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="BLUMIN Logo"
                width={480}
                height={160}
                className="h-72 w-auto brightness-0 invert"
              />
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Descubrí tu hermoso cambio con el cuidado de piel coreano premium.
              Productos KAHI con ADN de Salmón, Aceite de Jeju y tecnología FILMEXEL™.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:hello@blumin.com"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>hello@blumin.com</span>
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>+55 11 99999-9999</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide">
              Tienda
            </h3>
            <ul className="space-y-3">
              {footerNavigation.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide">
              Nosotros
            </h3>
            <ul className="space-y-3">
              {footerNavigation.about.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide">
              Soporte
            </h3>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                © {new Date().getFullYear()} BLUMIN. Todos los derechos reservados. | Powered by KAHI Cosmetics
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Aceptamos:</span>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xl hover:bg-gray-700 transition-colors"
                    title={method.name}
                  >
                    {method.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="px-3 py-1 bg-gray-800 rounded-full">✓ 100% Vegano</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">✓ Libre de Crueldad</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">✓ Dermatológicamente Testado</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">✓ Eco-Consciente</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
