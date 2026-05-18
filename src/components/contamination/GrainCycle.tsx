"use client";

import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

/**
 * Deux couches de grain 35mm empilées, alternées en step-end sur 3s.
 * Animation 100% CSS — aucun re-render React. Opacités desktop/mobile
 * résolues via media query dans le CSS module.
 */
export function GrainCycle({
  desktop,
  mobile,
  jolt = false,
}: {
  desktop: number;
  mobile: number;
  jolt?: boolean;
}) {
  return (
    <div
      className={`${styles.grainWrap}${jolt ? ` ${styles.jolt}` : ""}`}
      aria-hidden="true"
      style={
        {
          ["--grain-op-d"]: String(desktop),
          ["--grain-op-m"]: String(mobile),
        } as CSSProperties
      }
    >
      <div className={`${styles.grain} ${styles.grain1}`} />
      <div className={`${styles.grain} ${styles.grain2}`} />
    </div>
  );
}
