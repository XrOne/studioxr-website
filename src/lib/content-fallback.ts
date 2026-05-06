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

export interface LegacyProjectFallback {
  _id: string;
  title: string;
  year: string;
  format: string;
  role: string;
  claim: string;
  youtubeId: string;
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

// === Études de cas — prestations IA actuelles ===
// MIZIK et BNP ont été déplacés vers FALLBACK_LEGACY_PROJECTS (preuves d'antériorité XR/VR).
// Cette section accueille uniquement les prestations IA récentes (à enrichir).
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
];

// === Projets pionniers — preuves d'ADN XR/VR (2015-2021) ===
// Source : playlist YouTube "Videos immersive by studio XR-ONE" + projet MIZIK 2021.
export const FALLBACK_LEGACY_PROJECTS: LegacyProjectFallback[] = [
  {
    _id: "legacy-other-side",
    title: "The Other Side",
    year: "2015",
    format: "Court-métrage VR 360° stéréoscopique",
    role: "Réalisation — partenaires Panocam 3D + Holodia (O. Zitvogel)",
    claim:
      "Premier court-métrage français immersif stéréoscopique à 360°.",
    youtubeId: "MI5p-keCBns",
    order: 1,
  },
  {
    _id: "legacy-shopper-lab",
    title: "Shopper Lab Essilor",
    year: "2016",
    format: "Visite 360°",
    role: "Opérateur 360, stitching, editing — Production Gunsmoke",
    claim:
      "Immersion R&D pour le shopper lab d'un grand groupe industriel.",
    youtubeId: "mdDgzupI4es",
    order: 2,
  },
  {
    _id: "legacy-inra-cirad",
    title: "INRA · CIRAD Corse",
    year: "2016",
    format: "Drone 360° + visite guidée immersive",
    role: "Editing, stitching",
    claim:
      "Vue drone 360° sur la Corse, puis visite de la plus grande collection d'agrumes au monde.",
    youtubeId: "dUgtBq8NWpA",
    order: 3,
  },
  {
    _id: "legacy-noob",
    title: "Making of Noob 360°",
    year: "2017",
    format: "Coulisses 360°",
    role: "Captation 360°, stitching, editing",
    claim:
      "Coulisses immersives de la web-série Noob, pop culture FR.",
    youtubeId: "kE301arZ6aY",
    order: 4,
  },
  {
    _id: "legacy-elle-decor",
    title: "ELLE Décor",
    year: "2017",
    format: "Vidéo 360°",
    role: "Prestataire technique 360/VR — Production Plissken, agence Armstrong",
    claim:
      "Vidéo 360° au cœur d'un appartement parisien pour la marque presse.",
    youtubeId: "RPtj42-5sZw",
    order: 5,
  },
  {
    _id: "legacy-mizik",
    title: "MIZIK",
    year: "2021",
    format: "Karaoké VR hybride",
    role: "Conception, réalisation et production XR-ONE",
    claim:
      "Premier contest karaoké VR à Laval Virtual 2021. Projet propre XR-ONE.",
    youtubeId: "",
    order: 6,
  },
];

// === Partenaires — 8 entries ===
// "Fictions VR" retiré (terme générique, pas une société).
// "Inevitable" retiré de la liste partenaires (reste mentionné comme producteur de Declics 2 dans caseStudies).
export const FALLBACK_PARTNERS: PartnerFallback[] = [
  { _id: "p-1", name: "Arte", order: 1 },
  { _id: "p-2", name: "BNP Paribas", order: 2 },
  { _id: "p-3", name: "ELLE Décor", order: 3 },
  { _id: "p-4", name: "INRA · CIRAD", order: 4 },
  { _id: "p-5", name: "DoTheFilm", order: 5 },
  { _id: "p-6", name: "Unifrance", order: 6 },
  { _id: "p-7", name: "WE ARE", order: 7 },
  { _id: "p-8", name: "Media club", order: 8 },
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
