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
  process.env.NEXT_PUBLIC_SITE_URL || "https://jenial.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · Jenial",
    default: "Jenial — Du script au pixel.",
  },
  description:
    "Studio GenAI cinéma. Workflows IA pour la prépa, le tournage et la post-prod. Onze ans à diriger les outils. Du script au pixel, la vision reste humaine.",
  keywords: [
    "GenAI cinéma",
    "IA cinéma",
    "production augmentée",
    "prépa prod",
    "production hybride",
    "post prod",
    "étalonnage HDR",
    "Jenial",
    "Cinemia",
    "studio audiovisuel",
  ],
  authors: [{ name: "Jenial" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Jenial",
    title: "Jenial — Du script au pixel.",
    description:
      "Studio GenAI cinéma. Workflows IA pour la prépa, le tournage et la post-prod. Onze ans à diriger les outils. Du script au pixel, la vision reste humaine.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenial",
    description:
      "Studio GenAI cinéma. Du script au pixel, la vision reste humaine.",
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
