import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Studio · Sanity",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Le Studio Sanity nécessite un layout dédié sans Header/Footer marketing
 * et avec ses propres styles globaux gérés par sanity/next-sanity.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
