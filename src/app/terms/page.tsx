import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, Shield, CreditCard, Lock } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Última actualización: {new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Introducción
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Bienvenido a BLUMIN. Al acceder y utilizar nuestro sitio web y servicios, 
                aceptás los siguientes términos y condiciones. Si no estás de acuerdo con 
                alguno de estos términos, por favor no utilices nuestro sitio.
              </p>
            </div>

            {/* Use of Service */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                  Uso del Servicio
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  El uso de nuestro sitio web está sujeto a las siguientes condiciones:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">Debés tener al menos 18 años para realizar una compra</li>
                  <li className="list-disc">La información proporcionada debe ser precisa y actualizada</li>
                  <li className="list-disc">No está permitido usar el sitio para fines ilegales</li>
                  <li className="list-disc">No podés reproducir, duplicar o copiar el contenido sin autorización</li>
                </ul>
              </div>
            </div>

            {/* Products and Pricing */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                  Productos y Precios
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Nos esforzamos por mostrar información precisa sobre nuestros productos. 
                  Sin embargo:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">Los precios están sujetos a cambios sin previo aviso</li>
                  <li className="list-disc">Reservamos el derecho de corregir errores de precio</li>
                  <li className="list-disc">Las imágenes de productos son solo ilustrativas</li>
                  <li className="list-disc">Los colores pueden variar según la pantalla o dispositivo</li>
                </ul>
              </div>
            </div>

            {/* Payment and Billing */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Pagos y Facturación
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Aceptamos los siguientes métodos de pago:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">Tarjetas de crédito y débito (Visa, Mastercard, American Express)</li>
                  <li className="list-disc">Transferencias bancarias</li>
                  <li className="list-disc">Mercado Pago</li>
                </ul>
                <p className="mt-4">
                  Todos los pagos se procesan de forma segura. No almacenamos información 
                  completa de tarjetas de crédito.
                </p>
              </div>
            </div>

            {/* Privacy and Data */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                  Privacidad y Protección de Datos
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Tu privacidad es importante para nosotros. Al utilizar nuestro sitio, 
                  aceptás nuestra Política de Privacidad que describe cómo recopilamos, 
                  usamos y protegemos tu información personal.
                </p>
                <p>
                  No compartimos tu información personal con terceros sin tu consentimiento, 
                  excepto cuando sea necesario para procesar tu pedido o cumplir con 
                  obligaciones legales.
                </p>
              </div>
            </div>

            {/* Returns and Refunds */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Devoluciones y Reembolsos
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Para información detallada sobre nuestra política de devoluciones, 
                  consultá nuestra{" "}
                  <a href="/shipping" className="text-pink-600 font-semibold hover:text-pink-700">
                    página de Envíos y Devoluciones
                  </a>.
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">Aceptamos devoluciones dentro de 30 días de la compra</li>
                  <li className="list-disc">Los productos deben estar sin abrir y en su empaque original</li>
                  <li className="list-disc">El costo de envío de devolución corre por cuenta del cliente</li>
                  <li className="list-disc">Los reembolsos se procesan al método de pago original</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Limitación de Responsabilidad
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  BLUMIN no será responsable por daños indirectos, incidentales o 
                  consecuentes que puedan resultar del uso de nuestros productos o 
                  servicios. Nuestra responsabilidad total no excederá el monto pagado 
                  por el producto en cuestión.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Modificaciones de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos y condiciones en 
                cualquier momento. Las modificaciones entrarán en vigencia inmediatamente 
                después de su publicación en el sitio. Es tu responsabilidad revisar 
                periódicamente estos términos.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-pink-50 rounded-2xl p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si tenés alguna pregunta sobre estos términos y condiciones, 
                por favor{" "}
                <a href="/contact" className="text-pink-600 font-semibold hover:text-pink-700">
                  contactanos
                </a>.
              </p>
              <p className="text-gray-700">
                Email: legal@blumin.com<br />
                Teléfono: +54 11 1234-5678
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

