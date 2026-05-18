"use client";

import type { CSSProperties, ReactNode } from "react";
import styles from "./contamination.module.css";

const INK = "#F4ECDD"; // crème clair — repères lisibles sur fonds sombres

/** Mire « + » (état 1 du glyphe mire). */
function PlusMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="1.5">
        <line x1="17" y1="4" x2="17" y2="30" />
        <line x1="4" y1="17" x2="30" y2="17" />
      </g>
    </svg>
  );
}

/** Carré de mire (état 2 du glyphe mire). */
function SquareMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <rect
        x="7"
        y="7"
        width="20"
        height="20"
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Cercle simple (état 1 du glyphe registration). */
function CircleMark() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle
        cx="36"
        cy="36"
        r="13"
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Croix de registration (état 2 du glyphe registration). */
function RegistrationCross() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="1.5">
        <line x1="36" y1="6" x2="36" y2="66" />
        <line x1="6" y1="36" x2="66" y2="36" />
        <circle cx="36" cy="36" r="11" strokeWidth="1" />
      </g>
    </svg>
  );
}

interface GlyphProps {
  position: string;
  /** Durée du cycle complet (s). État changé toutes les durée/2. */
  duration: number;
  stateA: ReactNode;
  stateB: ReactNode;
}

/** Glyphe à deux états, alternés en coupe sèche (step-end). */
function Glyph({ position, duration, stateA, stateB }: GlyphProps) {
  const dur = { animationDuration: `${duration}s` } as CSSProperties;
  return (
    <div className={`${styles.mechGlyph} ${styles[position]}`}>
      <div className={`${styles.glyphState} ${styles.glyphA}`} style={dur}>
        {stateA}
      </div>
      <div className={`${styles.glyphState} ${styles.glyphB}`} style={dur}>
        {stateB}
      </div>
    </div>
  );
}

/**
 * Glyphes mécaniques mutants : mire +→carré, cercle→croix de registration,
 * numéro de plan 127A→128B. États alternés en coupe sèche CSS steps()
 * toutes les 4–7 s. Aucun fondu, aucune boucle flashy — lecture banc-titre.
 * Fixe, pointer-events:none, aria-hidden.
 */
export function MechanicalGlyphs({
  opacity,
  jolt = false,
}: {
  opacity: number;
  jolt?: boolean;
}) {
  return (
    <div
      className={`${styles.mechGlyphs}${jolt ? ` ${styles.jolt}` : ""}`}
      aria-hidden="true"
      style={{ ["--mech-opacity"]: String(opacity) } as CSSProperties}
    >
      <Glyph
        position="mechMire"
        duration={9}
        stateA={<PlusMark />}
        stateB={<SquareMark />}
      />
      <Glyph
        position="mechReg"
        duration={11}
        stateA={<CircleMark />}
        stateB={<RegistrationCross />}
      />
      <Glyph
        position="mechFrame"
        duration={13}
        stateA={<span className={styles.glyphText}>FRAME 127A</span>}
        stateB={<span className={styles.glyphText}>FRAME 128B</span>}
      />
    </div>
  );
}
