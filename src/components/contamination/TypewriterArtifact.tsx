"use client";

import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

/**
 * Artefact machine à écrire : un fragment court, non marketing, révélé
 * caractère par caractère en coupe sèche (CSS steps(), ~48 ms/caractère).
 * Joué une seule fois au montage, puis reste visible — aucune boucle.
 * Fixe, pointer-events:none, aria-hidden.
 */
export function TypewriterArtifact({ text }: { text: string }) {
  const chars = text.length;
  const style = {
    ["--tw-chars"]: String(chars),
    animationDuration: `${(chars * 0.048).toFixed(3)}s`,
    animationTimingFunction: `steps(${chars}, end)`,
  } as CSSProperties;

  return (
    <div className={styles.typewriter} aria-hidden="true">
      <span className={styles.typewriterText} style={style}>
        {text}
      </span>
    </div>
  );
}
