import type { Metadata } from "next";
import { Montserrat, Lato, Playfair_Display } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
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
      className={`${montserrat.variable} ${lato.variable} ${playfair.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
