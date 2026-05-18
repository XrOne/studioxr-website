"use client";

import styles from "./contamination.module.css";

/**
 * Accident optique : un flash/brûlure de tireuse, joué UNE seule fois au
 * montage de la page, jamais en boucle (animation-iteration-count: 1).
 * 100% CSS. Neutralisé par prefers-reduced-motion (gate amont + media query
 * CSS). Réservé au preset manifeste — aucune zone formulaire/CTA concernée.
 */
export function OpticalAccident() {
  return <div className={styles.opticalAccident} aria-hidden="true" />;
}
