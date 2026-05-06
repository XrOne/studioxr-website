import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://studioxr.one";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · Studio XR·ONE",
    default: "Studio XR·ONE — Du plateau au pixel. Depuis 2014.",
  },
  description:
    "Pionnier français du tournage hybride et de la production augmentée par IA. Né à CréaCannes en 2014. Prépa prod, tournage hybride, post prod & étalonnage HDR.",
  keywords: [
    "tournage hybride",
    "IA cinéma",
    "production augmentée",
    "studio audiovisuel",
    "prépa prod",
    "post prod",
    "étalonnage HDR",
    "VR",
    "AR",
    "CréaCannes",
  ],
  authors: [{ name: "Studio XR·ONE" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Studio XR·ONE",
    title: "Studio XR·ONE — Du plateau au pixel.",
    description:
      "Pionnier du tournage hybride. Onze ans à manipuler les outils. L'IA ne remplace pas le plateau. Elle l'agrandit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio XR·ONE",
    description:
      "Du plateau au pixel. Tournage hybride et production augmentée par IA depuis 2014.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
