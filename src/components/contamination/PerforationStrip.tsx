"use client";

import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

/**
 * Bandes de perforation 35mm le long des bords gauche/droit du viewport.
 * Lecture « bord de pellicule / banc-titre » sur les zones hero/éditoriales.
 * 100% CSS (repeating-linear-gradient), fixe, pointer-events:none, aria-hidden.
 */
export function PerforationStrip({
  opacity,
  jolt = false,
}: {
  opacity: number;
  jolt?: boolean;
}) {
  return (
    <div
      className={`${styles.perforation}${jolt ? ` ${styles.jolt}` : ""}`}
      aria-hidden="true"
      style={{ ["--perf-opacity"]: String(opacity) } as CSSProperties}
    >
      <div className={`${styles.perfStrip} ${styles.perfLeft}`} />
      <div className={`${styles.perfStrip} ${styles.perfRight}`} />
    </div>
  );
}
