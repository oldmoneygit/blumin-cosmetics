"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PackageSearch, CheckCircle, Clock, Truck } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;

    setIsTracking(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingInfo({
        orderNumber,
        status: "En tránsito",
        estimatedDelivery: "2024-01-25",
        carrier: "OCA",
        trackingNumber: "OCA1234567890",
        steps: [
          { status: "completed", label: "Pedido confirmado", date: "2024-01-18" },
          { status: "completed", label: "Preparado para envío", date: "2024-01-19" },
          { status: "completed", label: "En tránsito", date: "2024-01-20" },
          { status: "current", label: "En camino a tu ciudad", date: "2024-01-22" },
          { status: "pending", label: "Entregado", date: null },
        ],
      });
      setIsTracking(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
              <PackageSearch className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Rastrear Pedido
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Ingresá tu número de pedido y email para ver el estado de tu envío
            </p>
          </div>
        </div>
      </section>

      {/* Track Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <form onSubmit={handleTrack} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                  Número de Pedido *
                </label>
                <Input
                  id="orderNumber"
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Ej: ORD-123456"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email de Compra *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isTracking}
              >
                Rastrear Pedido
              </Button>
            </form>
          </div>

          {/* Tracking Info */}
          {trackingInfo && (
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Pedido #{trackingInfo.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Transportista: {trackingInfo.carrier}
                    </p>
                    <p className="text-sm text-gray-600">
                      Número de seguimiento: {trackingInfo.trackingNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-sm">
                      {trackingInfo.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-2">
                      Entrega estimada: {trackingInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Steps */}
              <div className="space-y-4">
                {trackingInfo.steps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {step.status === "completed" ? (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      ) : step.status === "current" ? (
                        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-200 last:border-0">
                      <p className={`font-semibold ${
                        step.status === "completed" ? "text-green-600" :
                        step.status === "current" ? "text-pink-600" :
                        "text-gray-400"
                      }`}>
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-sm text-gray-600 mt-1">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              ¿No podés encontrar tu número de pedido?{" "}
              <a href="/contact" className="text-pink-600 font-semibold hover:text-pink-700">
                Contactanos
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

