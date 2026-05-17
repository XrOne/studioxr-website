"use client";

import styles from "./contamination.module.css";

const HALO_COLOR = "#9B5C2A"; // orange sodium

/**
 * Halation dans les 4 coins du viewport + léger edge fog (vignettage
 * périphérique discret). SVG inline, gradients radiaux.
 * mix-blend-mode: overlay, pointer-events: none.
 */
export function HaloCorners({ opacity }: { opacity: number }) {
  return (
    <div className={styles.halo} aria-hidden="true" style={{ opacity }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="halo-tl" cx="0%" cy="0%" r="55%">
            <stop offset="0%" stopColor={HALO_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor={HALO_COLOR} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-tr" cx="100%" cy="0%" r="55%">
            <stop offset="0%" stopColor={HALO_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor={HALO_COLOR} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-bl" cx="0%" cy="100%" r="55%">
            <stop offset="0%" stopColor={HALO_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor={HALO_COLOR} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-br" cx="100%" cy="100%" r="55%">
            <stop offset="0%" stopColor={HALO_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor={HALO_COLOR} stopOpacity="0" />
          </radialGradient>
          {/* Edge fog : transparent au centre, teinte ténue vers les bords */}
          <radialGradient id="halo-fog" cx="50%" cy="48%" r="62%">
            <stop offset="0%" stopColor={HALO_COLOR} stopOpacity="0" />
            <stop offset="68%" stopColor={HALO_COLOR} stopOpacity="0" />
            <stop offset="100%" stopColor={HALO_COLOR} stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#halo-fog)" />
        <rect width="100%" height="100%" fill="url(#halo-tl)" />
        <rect width="100%" height="100%" fill="url(#halo-tr)" />
        <rect width="100%" height="100%" fill="url(#halo-bl)" />
        <rect width="100%" height="100%" fill="url(#halo-br)" />
      </svg>
    </div>
  );
}
