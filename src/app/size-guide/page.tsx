import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Ruler, Info } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
              <Ruler className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Guía de Tamaños
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Información sobre tamaños y especificaciones de nuestros productos
            </p>
          </div>
        </div>
      </section>

      {/* Size Guide Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Sizes */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-8">
                Tamaños de Productos
              </h2>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Multi Balm Sticks
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Tamaño:</span>
                      <span className="font-semibold text-gray-900">9g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Alto:</span>
                      <span className="font-semibold text-gray-900">7.5 cm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Diámetro:</span>
                      <span className="font-semibold text-gray-900">2.2 cm</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Todos nuestros balm sticks tienen el mismo tamaño estándar, perfecto 
                      para llevar en el bolso y aplicar en cualquier momento.
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Productos de Skincare
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Sérums:</span>
                      <span className="font-semibold text-gray-900">30ml / 50ml</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Hidratantes:</span>
                      <span className="font-semibold text-gray-900">50ml / 100ml</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Tratamientos:</span>
                      <span className="font-semibold text-gray-900">30ml</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Guide */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-8">
                Cómo Usar
              </h2>

              <div className="space-y-6">
                <div className="bg-pink-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-pink-600" />
                    Multi Balm Sticks
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>Aplicá directamente en la zona deseada (labios, contorno de ojos, mejillas, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>Masajeá suavemente hasta que se absorba completamente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>Usá como primer antes del maquillaje o para retoques durante el día</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>Duración aproximada: 2-3 meses con uso regular</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Duración de Productos
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <p className="font-semibold mb-1">Sin abrir:</p>
                      <p className="text-sm">3 años desde la fecha de fabricación</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Abierto:</p>
                      <p className="text-sm">12 meses para mejor eficacia (indicado en el símbolo PAO en el empaque)</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Consejos de Almacenamiento
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>Mantené los productos en un lugar fresco y seco, alejado de la luz solar directa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>Evitá exponerlos a temperaturas extremas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>Cerrá bien los productos después de cada uso</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

