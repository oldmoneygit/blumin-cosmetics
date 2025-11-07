"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Instagram } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { isValidEmail } from "@/lib/utils";

const footerNavigation = {
  official: [
    { name: "Acerca de", href: "/about" },
    { name: "Términos de Servicio", href: "/terms" },
    { name: "Política de Privacidad", href: "/privacy" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "TikTok Shop", href: "https://tiktok.com" },
  ],
  help: [
    { name: "FAQ", href: "/faq" },
    { name: "Contacto", href: "/contact" },
  ],
};

const paymentMethods = [
  { name: "American Express", short: "AM EX", color: "bg-blue-600" },
  { name: "Apple Pay", short: "Pay", color: "bg-black" },
  { name: "Diners Club", short: "DC", color: "bg-blue-500" },
  { name: "Discover", short: "DC", color: "bg-orange-600" },
  { name: "Google Pay", short: "G Pay", color: "bg-gray-800" },
  { name: "Mastercard", short: "MC", color: "bg-red-500" },
  { name: "Shop Pay", short: "shop", color: "bg-purple-600" },
  { name: "Visa", short: "VISA", color: "bg-blue-700" },
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
    <footer className="text-gray-900" style={{ backgroundColor: '#ffb8d1' }}>
      {/* Newsletter Section */}
      <div className="border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-4xl">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-4 text-left">
              ¡MANTENTE AL DÍA!
            </h3>
            <p className="text-lg text-gray-700 mb-8 text-left">
              Suscribite y sé el primero en conocer nuestros nuevos lanzamientos y ofertas exclusivas.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mb-6 max-w-md">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg flex-1"
              />
              <Button
                type="submit"
                variant="primary"
                size="medium"
                isLoading={isSubmitting}
                className="rounded-lg px-4 bg-gray-900 hover:bg-gray-800 text-white"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <p className="text-xs text-gray-700 max-w-2xl leading-relaxed text-left">
              Al enviar tu correo electrónico, aceptás que KAHI pueda enviarte mensajes promocionales por correo electrónico con ofertas, actualizaciones y otros mensajes de marketing. Entendés que KAHI puede usar tu información de acuerdo con su{" "}
              <Link href="/terms" className="underline hover:text-pink-600">
                Términos de Uso
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="underline hover:text-pink-600">
                Política de Privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Official Column */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide text-gray-900">
              OFICIAL
            </h3>
            <ul className="space-y-3">
              {footerNavigation.official.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide text-gray-900">
              SOCIAL
            </h3>
            <ul className="space-y-3">
              {footerNavigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide text-gray-900">
              AYUDA
            </h3>
            <ul className="space-y-3">
              {footerNavigation.help.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-pink-600 transition-colors"
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
      <div className="border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 flex-wrap">
            {/* Rewards Button */}
            <Link
              href="/rewards"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Recompensas</span>
            </Link>

            {/* Copyright */}
            <div className="text-gray-700 text-sm text-left">
              <p>
                © {new Date().getFullYear()} Korea Tech Co. Ltd. Todos los derechos reservados.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 flex-wrap md:ml-auto">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className={`w-14 h-10 ${method.color} rounded flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm`}
                  title={method.name}
                >
                  <span className="text-xs font-bold text-white">
                    {method.short}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
