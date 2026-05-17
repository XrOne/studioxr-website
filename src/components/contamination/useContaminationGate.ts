"use client";

import { useEffect, useState } from "react";
import { CONTAMINATION_ENABLED } from "./contamination.config";

/**
 * Décide si la couche contamination doit être montée.
 * - false si CONTAMINATION_ENABLED désactivé
 * - false si prefers-reduced-motion: reduce
 * - false si viewport < 375px (mobile portrait étroit)
 *
 * Retourne false au premier rendu (SSR + hydratation) puis réévalue au mount.
 * La couche ne se monte donc jamais côté serveur — pas de mismatch d'hydratation.
 */
export function useContaminationGate(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!CONTAMINATION_ENABLED) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const tooNarrow = window.matchMedia("(max-width: 374px)").matches;
    setAllowed(!reduced && !tooNarrow);
  }, []);

  return allowed;
}
