"use client";

/**
 * Studio Sanity embedded.
 * Routé sur /studio/* via le [[...tool]] catch-all.
 *
 * - L'auth est gérée par Sanity (login via sanity.io ou Google).
 * - Vérifier que projectId est défini dans .env.local sinon le Studio ne charge pas.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
