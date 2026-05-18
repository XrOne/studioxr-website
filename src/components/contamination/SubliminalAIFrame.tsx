"use client";

import styles from "./contamination.module.css";

const LINE = "#E8E0D0"; // crème froid — tracé de calibration

/**
 * Insert subliminal IA : une apparition fantôme abstraite (masque synthétique
 * + grille neuronale fragmentée + microtexte) projetée comme un accident de
 * tireuse. ~40 ms, une seule fois, 4–5 s après le montage, jamais répétée.
 *
 * 100% SVG/CSS — aucun bitmap. Ni logo, ni visage, ni illustration : un
 * cadre de calibration caméra glissé entre deux photogrammes.
 * Neutralisé par prefers-reduced-motion (gate amont + media query CSS).
 * Fixe, pointer-events:none, aria-hidden — n'altère ni layout ni hydratation.
 */
export function SubliminalAIFrame() {
  return (
    <div className={styles.subliminalAI} aria-hidden="true">
      <svg
        width="360"
        height="360"
        viewBox="0 0 360 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke={LINE}
          strokeOpacity="0.72"
          strokeWidth="1"
        >
          {/* Contour de masque synthétique — silhouette, pas un visage */}
          <path d="M180 56 C124 56 96 104 96 168 C96 244 134 304 180 304 C226 304 264 244 264 168 C264 104 236 56 180 56 Z" />
          {/* Axes de calibration */}
          <line x1="180" y1="40" x2="180" y2="320" strokeDasharray="2 5" />
          <line x1="72" y1="172" x2="288" y2="172" strokeDasharray="2 5" />
          {/* Repères de calibration optique (emplacements capteurs) */}
          <rect x="132" y="156" width="20" height="20" />
          <rect x="208" y="156" width="20" height="20" />
          <circle cx="142" cy="166" r="3" />
          <circle cx="218" cy="166" r="3" />
          {/* Grille neuronale fragmentée — quadrant bas-droit */}
          <path d="M208 224 L244 236 L268 220 M244 236 L240 268 L272 260 M240 268 L210 276" />
          <circle cx="208" cy="224" r="2.5" />
          <circle cx="244" cy="236" r="2.5" />
          <circle cx="268" cy="220" r="2.5" />
          <circle cx="240" cy="268" r="2.5" />
          <circle cx="272" cy="260" r="2.5" />
          <circle cx="210" cy="276" r="2.5" />
        </g>
        <text
          x="180"
          y="338"
          textAnchor="middle"
          fill={LINE}
          fillOpacity="0.66"
          fontFamily="var(--font-jetbrains), 'JetBrains Mono', monospace"
          fontSize="11"
          letterSpacing="0.34em"
        >
          AI · FRAME 219 · 24FPS
        </text>
      </svg>
    </div>
  );
}
