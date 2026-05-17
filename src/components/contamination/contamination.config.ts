// Réglages globaux de la couche contamination (analog thriller).
// Phase 2 — cf. docs/design/DESIGN-contamination-layer.md

export const CONTAMINATION_ENABLED =
  process.env.NEXT_PUBLIC_CONTAMINATION_ENABLED !== "false";

export const CONTAMINATION_VARIANTS = {
  manifeste: {
    grainOpacity: 0.06,
    haloOpacity: 0.18,
    stampsEnabled: true,
    stampCount: 2,
  },
  home: {
    grainOpacity: 0.04,
    haloOpacity: 0.12,
    stampsEnabled: false,
    stampCount: 0,
  },
  off: {
    grainOpacity: 0,
    haloOpacity: 0,
    stampsEnabled: false,
    stampCount: 0,
  },
} as const;

export type ContaminationVariant = keyof typeof CONTAMINATION_VARIANTS;

// Labels des tampons forensic — array fixe, tirés dans l'ordre selon stampCount.
export const STAMP_LABELS = [
  "FILE 04 — 09:34:12",
  "TAKE 12 / 35MM",
  "NEG / REV B / 2026",
] as const;
