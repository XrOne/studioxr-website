// Fondation du traitement analog « film lab ».
// Approche INTÉGRÉE : les effets vivent dans le background d'une section
// précise (cf. FilmLabHeroBackground), jamais en overlay global plein écran.
// Aucun calque fixe au-dessus du site, aucune altération du color grade global.

export const CONTAMINATION_ENABLED =
  process.env.NEXT_PUBLIC_CONTAMINATION_ENABLED !== "false";

export type AnalogVariant = "hero" | "editorial";

interface AnalogTreatment {
  /** Grain de pellicule confiné à la section (opacité du calque). */
  grain: number;
  /** Vignettage cinéma intégré au cadrage (opacité du calque). */
  vignette: number;
  /** Halation : bloom de base pellicule, désaturé (opacité du calque). */
  halation: number;
}

// Presets de traitement par type de section. Réutilisables : monter le
// composant là où la composition le demande, pas globalement.
export const ANALOG_TREATMENTS: Record<AnalogVariant, AnalogTreatment> = {
  // Hero : traitement affiché, fond cinéma éditorial premium.
  hero: { grain: 0.07, vignette: 0.42, halation: 0.16 },
  // Section éditoriale : présence discrète, zéro obstruction.
  editorial: { grain: 0.035, vignette: 0.22, halation: 0.08 },
};
