"use client";

import styles from "./contamination.module.css";

/**
 * Insert mono-frame : un cut blanc cassé bref (≈70 ms) joué UNE seule fois,
 * 2–4 s après le montage. 100% CSS, jamais répété. Neutralisé par
 * prefers-reduced-motion (gate amont + media query CSS). Manifeste seulement.
 * Fixe, pointer-events:none, aria-hidden.
 */
export function SingleFrameInsert() {
  return <div className={styles.singleFrameInsert} aria-hidden="true" />;
}
