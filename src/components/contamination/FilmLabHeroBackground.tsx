import type { CSSProperties } from "react";
import {
  ANALOG_TREATMENTS,
  CONTAMINATION_ENABLED,
  type AnalogVariant,
} from "./contamination.config";
import styles from "./contamination.module.css";

/**
 * Traitement analog « film lab » INTÉGRÉ au background d'une section.
 *
 * À monter comme premier enfant décoratif d'une section `position: relative`,
 * derrière le contenu (z-index 1, sous les titres/CTA). Ce n'est PAS un
 * overlay global : la couche est confinée à sa section, respecte le cadrage
 * et n'altère jamais le color grade du reste du site.
 *
 * Trois traitements purement CSS, statiques, pointer-events:none, aria-hidden :
 * grain de pellicule, vignettage cinéma, halation de base désaturée.
 */
export function FilmLabHeroBackground({
  variant = "hero",
}: {
  variant?: AnalogVariant;
}) {
  if (!CONTAMINATION_ENABLED) return null;

  const t = ANALOG_TREATMENTS[variant];
  const vars = {
    ["--analog-grain"]: String(t.grain),
    ["--analog-vignette"]: String(t.vignette),
    ["--analog-halation"]: String(t.halation),
  } as CSSProperties;

  return (
    <div className={styles.heroBg} aria-hidden="true" style={vars}>
      <div className={`${styles.layer} ${styles.vignette}`} />
      <div className={`${styles.layer} ${styles.halation}`} />
      <div className={`${styles.layer} ${styles.grain}`} />
    </div>
  );
}
