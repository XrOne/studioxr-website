/**
 * Contenu typé du site Jenial · Studio XR-ONE.
 * Centralise toutes les données éditoriales pour faciliter les itérations.
 */

// ----------------------------------------------------------
// Services / Offres
// ----------------------------------------------------------
export type ServiceId =
  | "films-ia"
  | "previsualisation"
  | "moodboards"
  | "conseil-workflow"
  | "logiciel-jenial";

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  badge?: string;
}

export const SERVICES: readonly Service[] = [
  {
    id: "films-ia",
    title: "Films IA",
    description:
      "Clips, capsules de marque et formats narratifs courts produits avec les modèles génératifs de pointe.",
  },
  {
    id: "previsualisation",
    title: "Prévisualisation",
    description:
      "Storyboards animés et previz IA pour valider une intention créative avant le tournage.",
  },
  {
    id: "moodboards",
    title: "Moodboards",
    description:
      "Direction artistique IA : planches d'ambiance, références visuelles et chartes esthétiques sur mesure.",
  },
  {
    id: "conseil-workflow",
    title: "Conseil & Workflow",
    description:
      "Audit de pipeline, intégration des outils IA dans vos équipes créatives, formation et accompagnement.",
  },
  {
    id: "logiciel-jenial",
    title: "Logiciel Jenial",
    description:
      "Notre plateforme intégrée pour orchestrer un projet audiovisuel IA de bout en bout.",
    badge: "Bientôt",
  },
] as const;

// ----------------------------------------------------------
// Réalisations
// ----------------------------------------------------------
export type RealisationCategory = "Clip" | "Previz" | "Pipeline";

export interface Realisation {
  id: string;
  title: string;
  client: string;
  category: RealisationCategory;
  excerpt: string;
  /** Tailwind gradient classes used for the card cover placeholder. */
  cover: string;
}

export const REALISATIONS: readonly Realisation[] = [
  {
    id: "mizik",
    title: "Clip immersif",
    client: "MIZIK",
    category: "Clip",
    excerpt:
      "Un clip musical entièrement généré par IA, mêlant esthétique vaporwave et chorégraphie procédurale.",
    cover:
      "from-[#f5a56a]/30 via-[#b46a35]/20 to-[#0a0908]",
  },
  {
    id: "le-dernier-hero",
    title: "Prévisualisation IA",
    client: "Le dernier Hero",
    category: "Previz",
    excerpt:
      "Storyboard animé IA pour un long-métrage indépendant : 18 séquences clés livrées en 5 jours.",
    cover:
      "from-[#e89b5c]/25 via-[#1f1a15] to-[#15120f]",
  },
  {
    id: "elle-decor",
    title: "Pipeline AR",
    client: "ELLE DECOR",
    category: "Pipeline",
    excerpt:
      "Workflow de production AR pour la presse : du moodboard IA à l'expérience mobile, intégré chez le client.",
    cover:
      "from-[#b46a35]/30 via-[#15120f] to-[#0a0908]",
  },
] as const;

// ----------------------------------------------------------
// Process
// ----------------------------------------------------------
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: 1,
    title: "Brief & contraintes",
    description:
      "Cadrage de l'intention, du public, du budget et des deadlines. Aucun angle mort.",
  },
  {
    step: 2,
    title: "Direction créative",
    description:
      "Moodboards, références, ton. On valide une cible esthétique avant toute génération.",
  },
  {
    step: 3,
    title: "Images clés",
    description:
      "Plans signature, frames pivots. La narration visuelle se fixe ici.",
  },
  {
    step: 4,
    title: "Animation / vidéo",
    description:
      "Génération des séquences, motion design, lipsync, contrôle frame par frame.",
  },
  {
    step: 5,
    title: "Post-prod",
    description:
      "Étalonnage, sound design, mixage, conformations diffusion. Finition cinéma.",
  },
  {
    step: 6,
    title: "Livraison & itérations",
    description:
      "Livrables aux formats demandés, sessions de revue, deux tours d'itérations inclus.",
  },
] as const;

// ----------------------------------------------------------
// Timeline (Heritage)
// ----------------------------------------------------------
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const TIMELINE: readonly TimelineEvent[] = [
  {
    year: "2015",
    title: "Naissance Studio XR-ONE",
    description: "Création du studio à Paris, focus VR/AR pionnière.",
  },
  {
    year: "2017",
    title: "Premières VR pour MIDEM",
    description: "Productions immersives pour l'industrie musicale.",
  },
  {
    year: "2019",
    title: "Laval Virtual / XR4ALL",
    description: "Reconnaissance européenne, programmes R&D XR.",
  },
  {
    year: "2021",
    title: "Pic d'activité XR",
    description: "Une décennie à pousser le média immersif.",
  },
  {
    year: "2024",
    title: "Pivot IA générative",
    description: "Bascule progressive vers les pipelines IA audiovisuels.",
  },
  {
    year: "2026",
    title: "Lancement Jenial",
    description: "Nouvelle marque, mêmes obsessions : la frontière du média.",
  },
] as const;

// ----------------------------------------------------------
// Partners
// ----------------------------------------------------------
export const PARTNERS: readonly string[] = [
  "MIDEM",
  "VR Days",
  "Laval Virtual",
  "XR4ALL",
  "ENSAM",
  "INRA / CIRAD",
] as const;

// ----------------------------------------------------------
// Team
// ----------------------------------------------------------
export interface TeamMember {
  name: string;
  role: string;
}

export const TEAM: readonly TeamMember[] = [
  { name: "Isabel De Peuter-Rutten", role: "CEO" },
  { name: "Charles-Henri Marraud des Grottes", role: "CCO" },
  { name: "Morgane Krauss", role: "Production" },
  { name: "Emilia Kukovski", role: "Design & DA" },
  { name: "Nicolas Vanhoutte", role: "Tech / IA" },
] as const;

// ----------------------------------------------------------
// Navigation
// ----------------------------------------------------------
export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "#offres", label: "Offres" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#process", label: "Process" },
  { href: "#heritage", label: "Heritage" },
  { href: "#contact", label: "Contact" },
] as const;

// ----------------------------------------------------------
// Contact / Brand
// ----------------------------------------------------------
export const CONTACT = {
  email: "contact@studioxr.one",
  address: "155 Bd de l'Hôpital, 75013 Paris",
  location: "ENSAM Incubateur",
} as const;
