import type { Metadata } from "next";
import { Roboto, Assistant } from "next/font/google";
import "../styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BLUMIN - Línea KAHI | Cuidado de Piel Coreano Premium",
  description:
    "Descubrí los productos innovadores KAHI en BLUMIN. Multi balm sticks con ADN de Salmón, Aceite de Jeju y FILMEXEL™ para una piel joven y radiante.",
  keywords: [
    "KAHI",
    "cosméticos coreanos",
    "skincare",
    "K-beauty",
    "BLUMIN",
    "ADN de Salmón",
    "Multi Balm",
    "Belleza Coreana",
    "Argentina",
  ],
  authors: [{ name: "BLUMIN" }],
  openGraph: {
    title: "BLUMIN - Línea KAHI | Cuidado de Piel Coreano Premium",
    description:
      "Productos innovadores KAHI con ADN de Salmón, Aceite de Jeju y tecnología FILMEXEL™",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLUMIN - Línea KAHI",
    description: "Cuidado de Piel Coreano Premium con ADN de Salmón y Aceite de Jeju",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${roboto.variable} ${assistant.variable}`}
    >
      <body className={`${assistant.variable} font-assistant antialiased`}>
        {children}
      </body>
    </html>
  );
}
