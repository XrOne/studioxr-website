// Réglages globaux de la couche contamination (analog thriller).
// Phase 2 — cf. docs/design/DESIGN-contamination-layer.md
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
  haloOpacity: number;
  stampsEnabled: boolean;
  stampCount: number;
}

export const CONTAMINATION_VARIANTS: Record<
  "manifeste" | "home" | "off",
  ContaminationVariantConfig
> = {
  // Passe volontairement visible pour valider la direction artistique.
  manifeste: {
    grain: { desktop: 0.08, mobile: 0.06 },
    dust: { desktop: 0.06, mobile: 0.04 },
    scratches: { desktop: 0.045, mobile: 0.03 },
    haloOpacity: 0.28,
    stampsEnabled: true,
    stampCount: 1,
  },
  home: {
    grain: { desktop: 0.04, mobile: 0.03 },
    dust: { desktop: 0, mobile: 0 },
    scratches: { desktop: 0, mobile: 0 },
    haloOpacity: 0.12,
    stampsEnabled: false,
    stampCount: 0,
  },
  off: {
    grain: { desktop: 0, mobile: 0 },
    dust: { desktop: 0, mobile: 0 },
    scratches: { desktop: 0, mobile: 0 },
    haloOpacity: 0,
    stampsEnabled: false,
    stampCount: 0,
  },
};

export type ContaminationVariant = keyof typeof CONTAMINATION_VARIANTS;

// Labels des tampons forensic — array fixe, tirés dans l'ordre selon stampCount.
export const STAMP_LABELS = [
  "FILE 04 — 09:34:12",
  "TAKE 12 / 35MM",
  "NEG / REV B / 2026",
] as const;
