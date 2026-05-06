import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

const SITE_URL = "https://studioxr.one";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jenial · Studio XR-ONE — Agence IA audiovisuelle",
    template: "%s · Jenial",
  },
  description:
    "De la frontière XR à la frontière IA. Studio XR-ONE pivote vers l'IA générative audiovisuelle : films IA, prévisualisation, moodboards et conseil workflow. Pionnier français depuis 2015.",
  keywords: [
    "IA audiovisuelle",
    "film IA",
    "prévisualisation",
    "moodboard",
    "Studio XR-ONE",
    "Jenial",
    "réalité virtuelle",
    "réalité augmentée",
    "agence créative",
    "Paris",
  ],
  authors: [{ name: "Studio XR-ONE" }],
  creator: "Studio XR-ONE",
  publisher: "Studio XR-ONE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Jenial · Studio XR-ONE",
    title: "Jenial · De la frontière XR à la frontière IA",
    description:
      "Agence IA audiovisuelle née de Studio XR-ONE. Films IA, prévisualisation, moodboards et conseil workflow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenial · Studio XR-ONE",
    description:
      "Agence IA audiovisuelle née de Studio XR-ONE. Pionnier XR depuis 2015.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
