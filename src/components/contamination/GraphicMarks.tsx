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
 * Repères graphiques de banc-titre : équerres de cadrage aux 4 coins,
 * croix de visée caméra au centre, deux numéros de plan en mono.
 * Positions fixes et déterministes — rares, jamais aléatoires.
 * SVG/CSS inline, fixe, pointer-events:none, aria-hidden.
 */
export function GraphicMarks({ opacity }: { opacity: number }) {
  return (
    <div
      className={styles.marks}
      aria-hidden="true"
      style={{ ["--marks-opacity"]: String(opacity) } as CSSProperties}
    >
      {/* Équerres contact-sheet — 4 coins */}
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

      {/* Croix de visée caméra — centre viewport */}
      <div className={styles.crosshair}>
        <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
          <g fill="none" stroke={INK} strokeWidth="1.5">
            <line x1="36" y1="6" x2="36" y2="26" />
            <line x1="36" y1="46" x2="36" y2="66" />
            <line x1="6" y1="36" x2="26" y2="36" />
            <line x1="46" y1="36" x2="66" y2="36" />
            <circle cx="36" cy="36" r="12" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* Numéros de plan — mono, deux ancrages discrets */}
      <span className={`${styles.frameNum} ${styles.frameNumTop}`}>
        017A · 24F
      </span>
      <span className={`${styles.frameNum} ${styles.frameNumBottom}`}>
        K—24 / NEG
      </span>
    </div>
  );
}
