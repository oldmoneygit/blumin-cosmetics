import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Truck, Package, RefreshCw, Shield } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Envíos y Devoluciones
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Información completa sobre envíos, tiempos de entrega y políticas de devolución
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900">
                  Envíos
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Envío Gratis
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Envío gratis a toda Argentina en pedidos superiores a $15.000. 
                    Para pedidos menores, el costo de envío es de $2.500.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Tiempos de Entrega
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Buenos Aires:</strong> 2-3 días hábiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Interior de Argentina:</strong> 5-7 días hábiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span><strong>Zonas remotas:</strong> 7-10 días hábiles</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Seguimiento de Pedidos
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Una vez que tu pedido sea despachado, recibirás un email con el 
                    número de seguimiento. Podrás rastrear tu pedido en tiempo real.
                  </p>
                  <a
                    href="/track-order"
                    className="inline-block mt-4 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
                  >
                    Rastrear mi pedido →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Package className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Empaque Seguro
                    </h3>
                    <p className="text-gray-700">
                      Todos los productos son empaquetados cuidadosamente para 
                      garantizar que lleguen en perfectas condiciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Protección de Compra
                    </h3>
                    <p className="text-gray-700">
                      Si tu pedido se pierde o llega dañado, te reembolsaremos 
                      o enviaremos un reemplazo sin costo adicional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Returns Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-pink-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900">
                Devoluciones y Cambios
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Política de Devolución
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aceptamos devoluciones dentro de <strong>30 días</strong> de la fecha de compra. 
                  Los productos deben estar sin abrir, en su empaque original y en condiciones de reventa.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>Productos no abiertos y en su empaque original</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>Recibo o comprobante de compra requerido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>El costo de envío de devolución corre por cuenta del cliente</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Proceso de Devolución
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <span>Contactanos a través de <a href="/contact" className="text-pink-600 font-semibold">nuestro formulario</a> o email indicando el motivo de la devolución</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <span>Recibirás instrucciones para enviar el producto de vuelta</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    <span>Una vez recibido y verificado, procesaremos el reembolso en un plazo de 5-7 días hábiles</span>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Reembolsos
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Los reembolsos se procesarán al método de pago original utilizado en la compra. 
                  El tiempo de procesamiento depende de tu banco o método de pago, generalmente 
                  toma entre 5-10 días hábiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

