/**
 * Données de secours utilisées tant que Sanity n'a pas été configuré.
 * Une fois `.env.local` rempli + contenu créé via /studio,
 * ces fallbacks ne sont plus utilisés.
 */

export type CapacityPhase =
  | "prepa-prod"
  | "tournage-hybride"
  | "post-prod"
  | "transverse";

export interface CapacityFallback {
  _id: string;
  title: string;
  slug: string;
  phase: CapacityPhase;
  order: number;
  shortDescription: string;
}

export interface CaseStudyFallback {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  production?: string;
  tag: string;
  category: string;
  order: number;
  shortDescription: string;
  bgVariant: 1 | 2 | 3;
}

export interface PartnerFallback {
  _id: string;
  name: string;
  order: number;
}

export interface EngagementFallback {
  number: string;
  title: string;
  description: string;
}

export interface SettingsFallback {
  siteTitle: string;
  tagline: string;
  contactEmail: string;
  calendlyUrl?: string;
  linkedinUrl?: string;
  engagements: EngagementFallback[];
}

// === Capacités IA — 8 entries (cf. mockup-home-v3) ===
export const FALLBACK_CAPACITIES: CapacityFallback[] = [
  {
    _id: "cap-1",
    title: "Décors avant / après",
    slug: "decors-avant-apres",
    phase: "prepa-prod",
    order: 1,
    shortDescription: "Lieu repéré → projection IA finale.",
  },
  {
    _id: "cap-2",
    title: "Storyboards auto",
    slug: "storyboards-auto",
    phase: "prepa-prod",
    order: 2,
    shortDescription: "Du scénario aux planches cohérentes.",
  },
  {
    _id: "cap-3",
    title: "Animatics",
    slug: "animatics",
    phase: "prepa-prod",
    order: 3,
    shortDescription: "Prévisualisation séquences pré-tournage.",
  },
  {
    _id: "cap-4",
    title: "HDR 8 → 32 bits",
    slug: "hdr-8-32-bits",
    phase: "post-prod",
    order: 4,
    shortDescription: "Uprez colorimétrique IA · masters EXR float.",
  },
  {
    _id: "cap-5",
    title: "Apps métier",
    slug: "apps-metier",
    phase: "transverse",
    order: 5,
    shortDescription: "Outils dédiés — déco, costume, lumière, cadre.",
  },
  {
    _id: "cap-6",
    title: "Continuité",
    slug: "continuite",
    phase: "prepa-prod",
    order: 6,
    shortDescription: "Détection d'incohérences scénario.",
  },
  {
    _id: "cap-7",
    title: "Plans IA insérés",
    slug: "plans-ia-inseres",
    phase: "tournage-hybride",
    order: 7,
    shortDescription: "Génération qui s'intègre aux rushes.",
  },
  {
    _id: "cap-8",
    title: "Moodboards & DA",
    slug: "moodboards-da",
    phase: "prepa-prod",
    order: 8,
    shortDescription: "Direction artistique alignée brief.",
  },
];

// === Études de cas — 3 entries ===
export const FALLBACK_CASE_STUDIES: CaseStudyFallback[] = [
  {
    _id: "case-1",
    title: "Declics 2",
    slug: "declics-2",
    client: "Declics 2",
    production: "production Inevitable",
    tag: "Tournage hybride · prod Inevitable · 2025",
    category: "tournage-hybride",
    order: 1,
    shortDescription:
      "Décors IA avant/après · prévisualisation séquences · plans IA insérés.",
    bgVariant: 1,
  },
  {
    _id: "case-2",
    title: "MIZIK",
    slug: "mizik",
    client: "MIZIK",
    tag: "Projet XR-ONE · VR pionnier",
    category: "projet-xr-one",
    order: 2,
    shortDescription:
      "Karaoké VR hybride. Premier contest VR à Laval Virtual 2021.",
    bgVariant: 3,
  },
  {
    _id: "case-3",
    title: "BNP Paribas",
    slug: "bnp-paribas",
    client: "BNP Paribas",
    tag: "Corporate immersif · à préciser",
    category: "corporate",
    order: 3,
    shortDescription:
      "〈à compléter — quelle prestation tu veux mettre en avant ?〉",
    bgVariant: 2,
  },
];

// === Partenaires — 5 entries ===
export const FALLBACK_PARTNERS: PartnerFallback[] = [
  { _id: "p-1", name: "Inevitable", order: 1 },
  { _id: "p-2", name: "BNP Paribas", order: 2 },
  { _id: "p-3", name: "ELLE Décor", order: 3 },
  { _id: "p-4", name: "INRA · CIRAD", order: 4 },
  { _id: "p-5", name: "Fictions VR", order: 5 },
];

// === Engagements (lignes rouges) — 6 entries ===
export const FALLBACK_ENGAGEMENTS: EngagementFallback[] = [
  {
    number: "01",
    title: "Pas de deepfake.",
    description:
      "Aucun visage généré pour incarner une personne réelle sans accord écrit.",
  },
  {
    number: "02",
    title: "Pas de style volé.",
    description:
      "Pas de prompts qui imitent un artiste vivant identifiable. Le style se construit, ne se copie pas.",
  },
  {
    number: "03",
    title: "Pas de boîte noire.",
    description:
      "On documente quels modèles, quels prompts, quelles itérations. Vous savez d'où vient chaque pixel.",
  },
  {
    number: "04",
    title: "Pas d'usurpation.",
    description:
      "Si un plan est IA, on l'indique. Vos crédits restent honnêtes.",
  },
  {
    number: "05",
    title: "Pas de tout-IA.",
    description:
      "Le réel reste la matière première. L'IA augmente. Elle ne substitue pas.",
  },
  {
    number: "06",
    title: "Pas de précipitation.",
    description:
      "Si on vous dit qu'un plan exige un vrai tournage, c'est un vrai tournage.",
  },
];

export const FALLBACK_SETTINGS: SettingsFallback = {
  siteTitle: "Studio XR·ONE",
  tagline: "Du plateau au pixel. Depuis 2014.",
  contactEmail: "contact@studioxr.one",
  engagements: FALLBACK_ENGAGEMENTS,
};
