"use client";

import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

const INK = "#F4ECDD"; // crème clair — repères lisibles sur fonds sombres

/** Équerre de cadrage (contact-sheet) — coin en L. */
function CropMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <path
        d="M1 1 V14 M1 1 H14"
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Équerres de cadrage statiques aux 4 coins du viewport (contact-sheet).
 * Positions fixes et déterministes. Les repères mutants (croix de visée,
 * numéros de plan) sont portés par MechanicalGlyphs.
 * SVG/CSS inline, fixe, pointer-events:none, aria-hidden.
 */
export function GraphicMarks({
  opacity,
  jolt = false,
}: {
  opacity: number;
  jolt?: boolean;
}) {
  return (
    <div
      className={`${styles.marks}${jolt ? ` ${styles.jolt}` : ""}`}
      aria-hidden="true"
      style={{ ["--marks-opacity"]: String(opacity) } as CSSProperties}
    >
      <div className={`${styles.cropMark} ${styles.cropTL}`}>
        <CropMark />
      </div>
      <div className={`${styles.cropMark} ${styles.cropTR}`}>
        <CropMark />
      </div>
      <div className={`${styles.cropMark} ${styles.cropBL}`}>
        <CropMark />
      </div>
      <div className={`${styles.cropMark} ${styles.cropBR}`}>
        <CropMark />
      </div>
    </div>
  );
}
