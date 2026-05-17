"use client";

import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

/**
 * Deux couches de grain 35mm empilées, alternées en step-end sur 3s.
 * Animation 100% CSS — aucun re-render React. Si une texture manque,
 * le background-image échoue silencieusement (couche à opacité 0).
 */
export function GrainCycle({ opacity }: { opacity: number }) {
  return (
    <div
      className={styles.grainWrap}
      aria-hidden="true"
      style={{ ["--grain-opacity"]: String(opacity) } as CSSProperties}
    >
      <div className={`${styles.grain} ${styles.grain1}`} />
      <div className={`${styles.grain} ${styles.grain2}`} />
    </div>
  );
}
