import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CasesStrip from "@/components/CasesStrip";
import ManifesteTeaser from "@/components/ManifesteTeaser";
import Capacities from "@/components/Capacities";
import Pillars from "@/components/Pillars";
import ManifesteDifference from "@/components/ManifesteDifference";
import CaseStudies from "@/components/CaseStudies";
import Pionniers from "@/components/Pionniers";
import Logiciels from "@/components/Logiciels";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

import { fetchSanity } from "@/sanity/lib/fetch";
import {
  ALL_CAPACITIES_QUERY,
  ALL_CASE_STUDIES_QUERY,
  ALL_LEGACY_PROJECTS_QUERY,
  ALL_PARTNERS_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";

import {
  FALLBACK_CAPACITIES,
  FALLBACK_CASE_STUDIES,
  FALLBACK_LEGACY_PROJECTS,
  FALLBACK_PARTNERS,
  FALLBACK_SETTINGS,
  type CapacityFallback,
  type CaseStudyFallback,
  type LegacyProjectFallback,
  type PartnerFallback,
  type SettingsFallback,
} from "@/lib/content-fallback";

export const revalidate = 60;

interface SanityCapacity {
  _id: string;
  title: string;
  slug?: string;
  phase: CapacityFallback["phase"];
  order?: number;
  shortDescription?: string;
  featured?: boolean;
  hidden?: boolean;
  mode?: CapacityFallback["mode"];
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  video?: CapacityFallback["video"];
}

interface SanityCaseStudy {
  _id: string;
  title: string;
  slug?: string;
  client?: string;
  production?: string;
  tag?: string;
  category?: string;
  order?: number;
  shortDescription?: string;
}

interface SanityPartner {
  _id: string;
  name: string;
  order?: number;
}

interface SanityLegacyProject {
  _id: string;
  title: string;
  year?: string;
  format?: string;
  role?: string;
  claim?: string;
  youtubeId?: string;
  order?: number;
}

interface SanitySettings {
  siteTitle?: string;
  tagline?: string;
  contactEmail?: string;
  calendlyUrl?: string;
  linkedinUrl?: string;
}

export default async function HomePage() {
  const [
    capacitiesRes,
    caseStudiesRes,
    legacyProjectsRes,
    partnersRes,
    settingsRes,
  ] = await Promise.all([
    fetchSanity<SanityCapacity[]>({
      query: ALL_CAPACITIES_QUERY,
      tags: ["capacity"],
    }),
    fetchSanity<SanityCaseStudy[]>({
      query: ALL_CASE_STUDIES_QUERY,
      tags: ["caseStudy"],
    }),
    fetchSanity<SanityLegacyProject[]>({
      query: ALL_LEGACY_PROJECTS_QUERY,
      tags: ["legacyProject"],
    }),
    fetchSanity<SanityPartner[]>({
      query: ALL_PARTNERS_QUERY,
      tags: ["partner"],
    }),
    fetchSanity<SanitySettings>({
      query: SETTINGS_QUERY,
      tags: ["settings"],
    }),
  ]);

  // Bascule sur fallback si Sanity vide
  const capacities: CapacityFallback[] =
    capacitiesRes && capacitiesRes.length > 0
      ? capacitiesRes
          .filter((c) => c.hidden !== true)
          .map((c, i) => ({
            _id: c._id,
            title: c.title,
            slug: c.slug || c._id,
            phase: c.phase,
            order: c.order ?? i,
            shortDescription: c.shortDescription || "",
            featured: c.featured,
            hidden: c.hidden,
            mode: c.mode,
            beforeImage: c.beforeImage,
            afterImage: c.afterImage,
            beforeLabel: c.beforeLabel,
            afterLabel: c.afterLabel,
            caption: c.caption,
            video: c.video,
          }))
      : FALLBACK_CAPACITIES;

  const caseStudies: CaseStudyFallback[] =
    caseStudiesRes && caseStudiesRes.length > 0
      ? caseStudiesRes.map((cs, i) => ({
          _id: cs._id,
          title: cs.title,
          slug: cs.slug || cs._id,
          client: cs.client,
          production: cs.production,
          tag: cs.tag || "",
          category: cs.category || "tournage-hybride",
          order: cs.order ?? i,
          shortDescription: cs.shortDescription || "",
          bgVariant: ((i % 3) + 1) as 1 | 2 | 3,
        }))
      : FALLBACK_CASE_STUDIES;

  const legacyProjects: LegacyProjectFallback[] =
    legacyProjectsRes && legacyProjectsRes.length > 0
      ? legacyProjectsRes.map((lp, i) => ({
          _id: lp._id,
          title: lp.title,
          year: lp.year || "",
          format: lp.format || "",
          role: lp.role || "",
          claim: lp.claim || "",
          youtubeId: lp.youtubeId || "",
          order: lp.order ?? i,
        }))
      : FALLBACK_LEGACY_PROJECTS;

  const partners: PartnerFallback[] =
    partnersRes && partnersRes.length > 0
      ? partnersRes.map((p, i) => ({
          _id: p._id,
          name: p.name,
          order: p.order ?? i,
        }))
      : FALLBACK_PARTNERS;

  const settings: SettingsFallback = settingsRes
    ? {
        siteTitle: settingsRes.siteTitle || FALLBACK_SETTINGS.siteTitle,
        tagline: settingsRes.tagline || FALLBACK_SETTINGS.tagline,
        contactEmail:
          settingsRes.contactEmail || FALLBACK_SETTINGS.contactEmail,
        calendlyUrl: settingsRes.calendlyUrl,
        linkedinUrl: settingsRes.linkedinUrl,
        engagements: FALLBACK_SETTINGS.engagements,
      }
    : FALLBACK_SETTINGS;

  return (
    <>
      <a href="#content" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      <main id="content" tabIndex={-1}>
        <Hero />
        <Marquee />
        <CasesStrip partners={partners} />
        <ManifesteTeaser />
        <Capacities capacities={capacities} />
        <Pillars />
        <ManifesteDifference />
        <CaseStudies caseStudies={caseStudies} />
        <Pionniers projects={legacyProjects} />
        <Logiciels />
        <CTAFinal contactEmail={settings.contactEmail} />
      </main>
      <Footer
        contactEmail={settings.contactEmail}
        linkedinUrl={settings.linkedinUrl}
        calendlyUrl={settings.calendlyUrl}
      />
    </>
  );
}
