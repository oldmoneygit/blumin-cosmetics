import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPage() {
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
              Política de Privacidad
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Última actualización: {new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Introducción
              </h2>
              <p className="text-gray-700 leading-relaxed">
                En BLUMIN, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
                Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu 
                información cuando utilizás nuestro sitio web y servicios.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                  Información que Recopilamos
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Recopilamos información que nos proporcionás directamente y también información que se recopila automáticamente:</p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc"><strong>Información personal:</strong> Nombre, dirección de correo electrónico, dirección postal, número de teléfono</li>
                  <li className="list-disc"><strong>Información de pago:</strong> Datos de tarjetas de crédito (procesados de forma segura por terceros)</li>
                  <li className="list-disc"><strong>Información de cuenta:</strong> Nombre de usuario, contraseña, preferencias</li>
                  <li className="list-disc"><strong>Información de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas</li>
                  <li className="list-disc"><strong>Cookies y tecnologías similares:</strong> Para mejorar tu experiencia de navegación</li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Cómo Usamos tu Información
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Utilizamos la información recopilada para:</p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">Procesar y completar tus pedidos</li>
                  <li className="list-disc">Enviarte actualizaciones sobre tu pedido</li>
                  <li className="list-disc">Responder a tus consultas y solicitudes de servicio al cliente</li>
                  <li className="list-disc">Enviarte comunicaciones de marketing (con tu consentimiento)</li>
                  <li className="list-disc">Mejorar nuestros productos y servicios</li>
                  <li className="list-disc">Prevenir fraudes y garantizar la seguridad</li>
                  <li className="list-disc">Cumplir con obligaciones legales</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                  Compartir Información
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  No vendemos ni alquilamos tu información personal. Compartimos tu información solo en las siguientes circunstancias:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc"><strong>Proveedores de servicios:</strong> Para procesar pagos, enviar correos, etc.</li>
                  <li className="list-disc"><strong>Obligaciones legales:</strong> Cuando sea requerido por ley</li>
                  <li className="list-disc"><strong>Protección de derechos:</strong> Para proteger nuestros derechos y seguridad</li>
                  <li className="list-disc"><strong>Con tu consentimiento:</strong> En cualquier otra situación con tu autorización</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                  Seguridad de Datos
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
                  personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, 
                  ningún método de transmisión por Internet es 100% seguro.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Tus Derechos
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Tenés derecho a:</p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">Acceder a tu información personal</li>
                  <li className="list-disc">Rectificar información incorrecta</li>
                  <li className="list-disc">Eliminar tu información personal</li>
                  <li className="list-disc">Oponerte al procesamiento de tus datos</li>
                  <li className="list-disc">Retirar tu consentimiento en cualquier momento</li>
                  <li className="list-disc">Solicitar la portabilidad de tus datos</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Cookies
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el 
                  tráfico del sitio y personalizar el contenido. Podés configurar tu navegador para 
                  rechazar cookies, pero esto puede afectar algunas funcionalidades del sitio.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-pink-50 rounded-2xl p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si tenés alguna pregunta sobre esta Política de Privacidad, 
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

