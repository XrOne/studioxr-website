// Réglages globaux de la couche contamination (analog thriller).
// Système site-wide — cf. docs/design/DESIGN-contamination-layer.md
// Opacités séparées desktop / mobile (<768px), appliquées via CSS custom
// properties + media queries dans contamination.module.css.

export const CONTAMINATION_ENABLED =
  process.env.NEXT_PUBLIC_CONTAMINATION_ENABLED !== "false";

interface ResponsiveOpacity {
  desktop: number;
  mobile: number;
}

interface ContaminationVariantConfig {
  grain: ResponsiveOpacity;
  dust: ResponsiveOpacity;
  scratches: ResponsiveOpacity;
  /** corner = halation des 4 coins ; fog = vignettage périphérique. */
  halo: { corner: number; fog: number };
  stamp: { enabled: boolean; count: number; opacity: number };
  perforation: { enabled: boolean; opacity: number };
  /** Repères graphiques : croix de visée, n° de plan, marques contact-sheet. */
  marks: { enabled: boolean; opacity: number };
  /** Accident optique : un flash/brûlure CSS unique, jamais en boucle. */
  opticalAccident: boolean;
}

// Quatre presets d'intensité par route/section :
// - manifeste : strong (éditorial pur, pas de conversion)
// - home : medium
// - editorial : medium-low (capacités / process / pages éditoriales)
// - off : aucune couche (studio Sanity, zones protégées)
export const CONTAMINATION_VARIANTS: Record<
  "manifeste" | "home" | "editorial" | "off",
  ContaminationVariantConfig
> = {
  // Passe volontairement forte pour valider la direction artistique.
  manifeste: {
    grain: { desktop: 0.1, mobile: 0.065 },
    dust: { desktop: 0.08, mobile: 0.052 },
    scratches: { desktop: 0.06, mobile: 0.039 },
    halo: { corner: 0.4, fog: 0.32 },
    stamp: { enabled: true, count: 2, opacity: 0.45 },
    perforation: { enabled: true, opacity: 0.5 },
    marks: { enabled: true, opacity: 0.55 },
    opticalAccident: true,
  },
  home: {
    grain: { desktop: 0.07, mobile: 0.045 },
    dust: { desktop: 0.04, mobile: 0.026 },
    scratches: { desktop: 0.03, mobile: 0.02 },
    halo: { corner: 0.22, fog: 0.18 },
    stamp: { enabled: true, count: 1, opacity: 0.3 },
    perforation: { enabled: true, opacity: 0.32 },
    marks: { enabled: true, opacity: 0.32 },
    opticalAccident: false,
  },
  // Pages éditoriales / capacités / process : présence discrète, zéro
  // obstruction du contenu de conversion.
  editorial: {
    grain: { desktop: 0.045, mobile: 0.03 },
    dust: { desktop: 0.02, mobile: 0.013 },
    scratches: { desktop: 0.015, mobile: 0.01 },
    halo: { corner: 0.14, fog: 0.12 },
    stamp: { enabled: false, count: 0, opacity: 0 },
    perforation: { enabled: true, opacity: 0.2 },
    marks: { enabled: false, opacity: 0 },
    opticalAccident: false,
  },
  off: {
    grain: { desktop: 0, mobile: 0 },
    dust: { desktop: 0, mobile: 0 },
    scratches: { desktop: 0, mobile: 0 },
    halo: { corner: 0, fog: 0 },
    stamp: { enabled: false, count: 0, opacity: 0 },
    perforation: { enabled: false, opacity: 0 },
    marks: { enabled: false, opacity: 0 },
    opticalAccident: false,
  },
};

export type ContaminationVariant = keyof typeof CONTAMINATION_VARIANTS;

/**
 * Mappe un pathname Next.js vers un preset de contamination.
 * Le studio Sanity et les éventuelles routes d'admin restent "off".
 */
export function variantForPath(pathname: string): ContaminationVariant {
  if (pathname.startsWith("/studio")) return "off";
  if (pathname === "/manifeste" || pathname.startsWith("/manifeste/"))
    return "manifeste";
  if (pathname === "/") return "home";
  return "editorial";
}

// Labels des tampons forensic — array fixe, tirés dans l'ordre selon stampCount.
export const STAMP_LABELS = [
  "FILE 04 — 09:34:12",
  "TAKE 12 / 35MM",
  "NEG / REV B / 2026",
] as const;
