"use client";

import { useId, useMemo } from "react";
import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

interface ForensicStampProps {
  label: string;
  position: Pick<CSSProperties, "top" | "right" | "bottom" | "left">;
  /** Rotation en degrés. Par défaut, valeur aléatoire entre -2 et 2 au mount. */
  rotation?: number;
}

/**
 * Tampon forensic SVG inline. Texte dégradé via feTurbulence + feDisplacementMap
 * pour un rendu d'encre imparfaite. Statique, sans animation.
 */
export function ForensicStamp({
  label,
  position,
  rotation,
}: ForensicStampProps) {
  const filterId = useId();
  // Composant rendu uniquement côté client (cf. useContaminationGate) —
  // Math.random() au mount ne provoque pas de mismatch d'hydratation.
  const rot = useMemo(
    () => (rotation ?? Math.random() * 4 - 2),
    [rotation]
  );

  return (
    <div
      className={styles.stamp}
      aria-hidden="true"
      style={{ ...position, transform: `rotate(${rot}deg)` }}
    >
      <svg
        width="220"
        height="28"
        viewBox="0 0 220 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.4"
            />
          </filter>
        </defs>
        <text
          x="0"
          y="19"
          filter={`url(#${filterId})`}
          fill="#1a1a1a"
          fillOpacity="0.55"
          fontFamily="var(--font-jetbrains), 'JetBrains Mono', monospace"
          fontSize="13"
          letterSpacing="0.04em"
        >
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
