"use client";

import type { CSSProperties } from "react";
import { useContaminationGate } from "./useContaminationGate";
import {
  CONTAMINATION_VARIANTS,
  STAMP_LABELS,
  type ContaminationVariant,
} from "./contamination.config";
import { GrainCycle } from "./GrainCycle";
import { DustScratchLayer } from "./DustScratchLayer";
import { HaloCorners } from "./HaloCorners";
import { ForensicStamp } from "./ForensicStamp";
import { PerforationStrip } from "./PerforationStrip";
import { GraphicMarks } from "./GraphicMarks";
import { MechanicalGlyphs } from "./MechanicalGlyphs";
import { TypewriterArtifact } from "./TypewriterArtifact";
import { OpticalAccident } from "./OpticalAccident";
import { SingleFrameInsert } from "./SingleFrameInsert";
import styles from "./contamination.module.css";

interface ContaminationLayerProps {
  variant: ContaminationVariant;
}

// Ancrages fixes des tampons : hors bande nav (haut) et hors zone CTA/footer
// (bas). Rotations déterministes — aucun Math.random, rendu stable.
const STAMP_SLOTS = [
  { position: { top: "30%", right: 40 }, rotation: -2.4 },
  { position: { top: "63%", left: 36 }, rotation: 1.8 },
] as const;

/**
 * Composant racine de la couche contamination, monté une fois globalement
 * via GlobalContamination. Toutes les sous-couches sont fixes,
 * pointer-events:none et aria-hidden — aucune interaction, conversion et
 * lisibilité préservées. Rend null tant que le gate (reduced-motion / flag)
 * ne l'autorise pas, donc jamais côté serveur.
 */
export function ContaminationLayer({ variant }: ContaminationLayerProps) {
  const enabled = useContaminationGate();
  if (!enabled) return null;

  const cfg = CONTAMINATION_VARIANTS[variant];
  const stamps = cfg.stamp.enabled
    ? STAMP_LABELS.slice(0, cfg.stamp.count)
    : [];
  const jolt = cfg.opticalJolt;

  return (
    <>
      <GrainCycle
        desktop={cfg.grain.desktop}
        mobile={cfg.grain.mobile}
        jolt={jolt}
      />
      <DustScratchLayer
        dustDesktop={cfg.dust.desktop}
        dustMobile={cfg.dust.mobile}
        scratchDesktop={cfg.scratches.desktop}
        scratchMobile={cfg.scratches.mobile}
        jolt={jolt}
      />
      <HaloCorners corner={cfg.halo.corner} fog={cfg.halo.fog} />
      {cfg.perforation.enabled && (
        <PerforationStrip opacity={cfg.perforation.opacity} jolt={jolt} />
      )}
      {cfg.marks.enabled && (
        <>
          <GraphicMarks opacity={cfg.marks.opacity} jolt={jolt} />
          <MechanicalGlyphs opacity={cfg.marks.opacity} jolt={jolt} />
        </>
      )}
      {cfg.typewriter.enabled && cfg.typewriter.text !== "" && (
        <TypewriterArtifact text={cfg.typewriter.text} />
      )}
      {stamps.length > 0 && (
        <div
          className={styles.stampLayer}
          aria-hidden="true"
          style={
            { ["--stamp-opacity"]: String(cfg.stamp.opacity) } as CSSProperties
          }
        >
          {stamps.map((label, i) => (
            <ForensicStamp
              key={label}
              label={label}
              position={STAMP_SLOTS[i]?.position ?? {}}
              rotation={STAMP_SLOTS[i]?.rotation ?? 0}
            />
          ))}
        </div>
      )}
      {cfg.opticalAccident && <OpticalAccident />}
      {cfg.singleFrameInsert && <SingleFrameInsert />}
    </>
  );
}
