"use client";

import type { CSSProperties } from "react";
import styles from "./contamination.module.css";

/**
 * Couche poussière + rayures (dust-hair, scratches verticales).
 * Textures statiques en background-image, mix-blend-mode multiply,
 * très basse opacité. Opacités desktop/mobile via media query CSS.
 */
export function DustScratchLayer({
  dustDesktop,
  dustMobile,
  scratchDesktop,
  scratchMobile,
  jolt = false,
}: {
  dustDesktop: number;
  dustMobile: number;
  scratchDesktop: number;
  scratchMobile: number;
  jolt?: boolean;
}) {
  return (
    <div
      className={`${styles.dustWrap}${jolt ? ` ${styles.jolt}` : ""}`}
      aria-hidden="true"
      style={
        {
          ["--dust-op-d"]: String(dustDesktop),
          ["--dust-op-m"]: String(dustMobile),
          ["--scratch-op-d"]: String(scratchDesktop),
          ["--scratch-op-m"]: String(scratchMobile),
        } as CSSProperties
      }
    >
      <div className={`${styles.dust} ${styles.dustLayer}`} />
      <div className={`${styles.dust} ${styles.scratchLayer}`} />
    </div>
  );
}
