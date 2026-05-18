"use client";

import styles from "./contamination.module.css";

// Halation : bloom blanc-chaud très désaturé (pas de teinte orange filtre
// Instagram). Edge fog : vignettage froid sombre, proche de l'abysse.
const BLOOM = "#EDE4D2"; // crème désaturé
const FOG = "#08161F"; // bleu-nuit froid

/**
 * Traitement bord d'image : halation de bloom dans les 4 coins +
 * edge fog (vignettage périphérique froid). SVG inline, gradients radiaux,
 * mix-blend-mode: overlay, pointer-events:none, aria-hidden.
 *
 * corner / fog : intensités séparées (0–1) pilotées par le preset.
 */
export function HaloCorners({
  corner,
  fog,
}: {
  corner: number;
  fog: number;
}) {
  return (
    <div className={styles.halo} aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="halo-tl" cx="0%" cy="0%" r="55%">
            <stop offset="0%" stopColor={BLOOM} stopOpacity={corner} />
            <stop offset="100%" stopColor={BLOOM} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-tr" cx="100%" cy="0%" r="55%">
            <stop offset="0%" stopColor={BLOOM} stopOpacity={corner} />
            <stop offset="100%" stopColor={BLOOM} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-bl" cx="0%" cy="100%" r="55%">
            <stop offset="0%" stopColor={BLOOM} stopOpacity={corner} />
            <stop offset="100%" stopColor={BLOOM} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-br" cx="100%" cy="100%" r="55%">
            <stop offset="0%" stopColor={BLOOM} stopOpacity={corner} />
            <stop offset="100%" stopColor={BLOOM} stopOpacity="0" />
          </radialGradient>
          {/* Edge fog : transparent au centre, sombre froid vers les bords */}
          <radialGradient id="halo-fog" cx="50%" cy="48%" r="64%">
            <stop offset="0%" stopColor={FOG} stopOpacity="0" />
            <stop offset="62%" stopColor={FOG} stopOpacity="0" />
            <stop offset="100%" stopColor={FOG} stopOpacity={fog} />
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
