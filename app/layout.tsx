import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Space_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const poppinsBody = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Space Grotesk — a characterful tech-display face that matches the space theme.
const grotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Futurera Digital — İnşaat & Gayrimenkul Pazarlama Ajansı",
  description:
    "Futurera Digital, inşaat ve gayrimenkul projeleri için niş dijital pazarlama ajansıdır. Lansman kampanyaları, 3D görselleştirme, şantiye içerik üretimi ve satış ofisi CRM otomasyonu.",
  keywords: ["inşaat pazarlama", "gayrimenkul pazarlama", "konut lansmanı", "3D görselleştirme", "sanal tur", "satış ofisi CRM", "emlak reklam ajansı"],
  openGraph: {
    title: "Futurera Digital — İnşaat & Gayrimenkul Pazarlama Ajansı",
    description: "Konut projelerini ve gayrimenkul markalarını satışa taşıyan niş dijital pazarlama ajansı.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${poppinsBody.variable} ${grotesk.variable} ${spaceMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
