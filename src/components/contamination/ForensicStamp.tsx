"use client";

import { useId } from "react";
import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

interface ForensicStampProps {
  label: string;
  position: Pick<CSSProperties, "top" | "right" | "bottom" | "left">;
  /** Rotation en degrés. Déterministe — pas de Math.random. */
  rotation: number;
}

const INK = "#141414";

/**
 * Tampon de laboratoire film : cadre encré double-filet, label principal,
 * filet de séparation et sous-mention. Pas du texte fin — un vrai bloc
 * tamponné. Encre imparfaite via feTurbulence + feDisplacementMap.
 * Statique, sans animation, aria-hidden.
 */
export function ForensicStamp({
  label,
  position,
  rotation,
}: ForensicStampProps) {
  const filterId = useId();

  return (
    <div
      className={styles.stamp}
      aria-hidden="true"
      style={{ ...position, transform: `rotate(${rotation}deg)` }}
    >
      <svg
        width="248"
        height="62"
        viewBox="0 0 248 62"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" />
          </filter>
        </defs>
        <g
          filter={`url(#${filterId})`}
          fill="none"
          stroke={INK}
          strokeOpacity="0.62"
        >
          {/* Cadre encré double-filet */}
          <rect x="4" y="4" width="240" height="54" strokeWidth="3" />
          <rect x="10" y="10" width="228" height="42" strokeWidth="1" />
          {/* Filet de séparation sous le label principal */}
          <line x1="18" y1="38" x2="230" y2="38" strokeWidth="1" />
        </g>
        <g filter={`url(#${filterId})`} fill={INK} fillOpacity="0.62">
          <text
            x="20"
            y="31"
            fontFamily="var(--font-jetbrains), 'JetBrains Mono', monospace"
            fontSize="14"
            fontWeight="600"
            letterSpacing="0.06em"
          >
            {label.toUpperCase()}
          </text>
          <text
            x="20"
            y="50"
            fontFamily="var(--font-jetbrains), 'JetBrains Mono', monospace"
            fontSize="9"
            letterSpacing="0.22em"
          >
            STUDIO JENIAL — LAB PROCESSED
          </text>
        </g>
      </svg>
    </div>
  );
}
