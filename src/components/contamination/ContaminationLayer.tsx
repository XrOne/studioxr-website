"use client";

import { useContaminationGate } from "./useContaminationGate";
import {
  CONTAMINATION_VARIANTS,
  STAMP_LABELS,
  type ContaminationVariant,
} from "./contamination.config";
import { GrainCycle } from "./GrainCycle";
import { HaloCorners } from "./HaloCorners";
import { ForensicStamp } from "./ForensicStamp";
import styles from "./contamination.module.css";

interface ContaminationLayerProps {
  variant: ContaminationVariant;
}

// Positions fixes des tampons dans le stampLayer plein écran.
const STAMP_POSITIONS = [
  { top: 132, right: 36 },
  { bottom: 152, left: 32 },
] as const;

/**
 * Composant racine de la couche contamination.
 * Monté en premier enfant de la page /manifeste. Rend null tant que le
 * gate (reduced-motion / viewport étroit / flag désactivé) ne l'autorise pas.
 */
export function ContaminationLayer({ variant }: ContaminationLayerProps) {
  const enabled = useContaminationGate();
  if (!enabled) return null;

  const cfg = CONTAMINATION_VARIANTS[variant];
  const stamps = cfg.stampsEnabled
    ? STAMP_LABELS.slice(0, cfg.stampCount)
    : [];

  return (
    <>
      <GrainCycle opacity={cfg.grainOpacity} />
      <HaloCorners opacity={cfg.haloOpacity} />
      {stamps.length > 0 && (
        <div className={styles.stampLayer} aria-hidden="true">
          {stamps.map((label, i) => (
            <ForensicStamp
              key={label}
              label={label}
              position={STAMP_POSITIONS[i] ?? {}}
            />
          ))}
        </div>
      )}
    </>
  );
}
