"use client";

import { usePathname } from "next/navigation";
import { ContaminationLayer } from "./ContaminationLayer";
import { variantForPath } from "./contamination.config";

/**
 * Point de montage unique de la couche contamination, posé une seule fois
 * dans le layout racine. Choisit le preset d'intensité selon la route
 * courante (cf. variantForPath). Le studio Sanity reçoit "off".
 *
 * Composant client : usePathname impose le rendu client. La couche
 * elle-même ne s'affiche qu'après hydratation (cf. useContaminationGate),
 * donc aucun mismatch SSR.
 */
export function GlobalContamination() {
  const pathname = usePathname() || "/";
  const variant = variantForPath(pathname);
  if (variant === "off") return null;
  return <ContaminationLayer variant={variant} />;
}
