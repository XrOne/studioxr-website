"use client";

import { useEffect, useState } from "react";
import { CONTAMINATION_ENABLED } from "./contamination.config";

/**
 * Décide si la couche contamination doit être montée.
 * - false si CONTAMINATION_ENABLED désactivé
 * - false si prefers-reduced-motion: reduce (coupe toute la couche, motion incluse)
 *
 * Retourne false au premier rendu (SSR + hydratation) puis réévalue au mount.
 * La couche ne se monte donc jamais côté serveur — pas de mismatch d'hydratation.
 *
 * Le cas viewport très étroit (<375px) n'est PAS géré ici : le CSS ne garde
 * alors que le grain léger et masque les repères complexes (cf. module CSS).
 */
export function useContaminationGate(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!CONTAMINATION_ENABLED) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setAllowed(!reduced);
  }, []);

  return allowed;
}
