"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CapacityFallback } from "@/lib/content-fallback";
import BeforeAfterSlider from "./BeforeAfterSlider";
import VideoProofPlayer from "./VideoProofPlayer";

interface CapacitiesProps {
  capacities: CapacityFallback[];
}

const PHASE_LABEL: Record<string, string> = {
  "prepa-prod": "prépa prod",
  "tournage-hybride": "tournage hybride",
  "post-prod": "post prod",
  transverse: "transverse",
};

const PANEL_ID = "capacities-comparator";

function pickInitialId(items: CapacityFallback[]): string | null {
  if (items.length === 0) return null;
  const featured = items.find((c) => c.featured);
  if (featured) return featured._id;
  return items[0]._id;
}

export default function Capacities({ capacities }: CapacitiesProps) {
  const visible = useMemo(
    () => capacities.filter((c) => c.hidden !== true),
    [capacities]
  );

  const [activeId, setActiveId] = useState<string | null>(() =>
    pickInitialId(visible)
  );

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const [mediaFrameHeight, setMediaFrameHeight] = useState<number | null>(null);

  const active =
    visible.find((c) => c._id === activeId) ?? visible[0] ?? null;

  const activeMode = active?.mode ?? "comparator";
  const renderMode: "comparator" | "video-proof" =
    activeMode === "video-proof" ? "video-proof" : "comparator";

  // Synchronise la hauteur de la mosaïque sur le rectangle media (premier
  // enfant du wrapper, hors caption). ResizeObserver suit les changements
  // de viewport / aspect ratio. Aucune hauteur hardcodée côté CSS.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrapper = mediaWrapperRef.current;
    if (!wrapper) return;
    const frame = wrapper.firstElementChild;
    if (!(frame instanceof HTMLElement)) return;

    const updateHeight = () => {
      const h = frame.getBoundingClientRect().height;
      if (h > 0) setMediaFrameHeight(h);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [active?._id, renderMode]);

  function activateCapacity(id: string) {
    // Pas de scroll au switch : sur mobile les chips de télécommande sont
    // placées au-dessus du media, donc le changement est immédiatement
    // visible sans yo-yo viewport.
    setActiveId(id);
  }

  function focusCapacity(id: string) {
    const node = tabRefs.current[id];
    if (node) node.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent, currentIdx: number) {
    const total = visible.length;
    if (total === 0) return;

    let nextIdx: number | null = null;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIdx = (currentIdx + 1) % total;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIdx = (currentIdx - 1 + total) % total;
        break;
      case "Home":
        nextIdx = 0;
        break;
      case "End":
        nextIdx = total - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        activateCapacity(visible[currentIdx]._id);
        return;
      default:
        return;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      focusCapacity(visible[nextIdx]._id);
    }
  }

  const phaseLabel = active?.phase
    ? PHASE_LABEL[active.phase] || active.phase
    : "";

  return (
    <section
      id="capacities"
      style={{ padding: "160px 0", background: "var(--air)" }}
    >
      <div className="container-x">
        <div className="section-eyebrow">
          <span className="mono">CAPACITÉS · 01</span>
        </div>
        <h2 className="display section-title">
          UNE BOÎTE
          <br />À OUTILS
          <br />
          POUR LA PROD.
        </h2>
        <p className="section-sub">
          Une capacité IA par corps de métier. Pas un de plus. Pas un de
          moins.
        </p>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={
            active ? `capacity-tab-${active._id}` : undefined
          }
          className="capacities-text"
          style={{ scrollMarginTop: 80 }}
        >
          <div
            aria-live="polite"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              background: "var(--corail)",
              color: "var(--abysse)",
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: 12,
              letterSpacing: "0.1em",
              marginBottom: 24,
              textTransform: "uppercase",
            }}
          >
            FEATURED · {phaseLabel.toUpperCase() || "PRÉPA PROD"}
          </div>
          <h3
            className="display"
            aria-live="polite"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              marginBottom: 24,
            }}
          >
            {active ? active.title.toUpperCase() : "DÉCORS — AVANT / APRÈS."}
          </h3>
          <p
            aria-live="polite"
            style={{
              color: "var(--muted)",
              maxWidth: 680,
              marginBottom: 32,
              fontSize: 17,
              minHeight: 52,
            }}
          >
            {active?.shortDescription ||
              "Photo du décor brut. Projection IA finalisée. L’équipe valide la mise en scène avant de poser un seul rideau."}
          </p>
        </div>

        <div className="capacities-layout">
          <div
            role="tablist"
            aria-label="Capacités IA"
            className="capacities-grid"
            style={
              mediaFrameHeight
                ? ({
                    ["--media-frame-height" as string]: `${mediaFrameHeight}px`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {visible.map((cap, idx) => {
              const isActive = cap._id === activeId;
              return (
                <button
                  key={cap._id}
                  ref={(el) => {
                    tabRefs.current[cap._id] = el;
                  }}
                  id={`capacity-tab-${cap._id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={PANEL_ID}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => activateCapacity(cap._id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="capacity-card"
                  data-active={isActive ? "true" : "false"}
                  title={cap.title}
                  style={{
                    position: "relative",
                    textAlign: "left",
                    background: isActive ? "var(--abysse)" : "#fff",
                    color: isActive ? "var(--air)" : "var(--fg)",
                    border: "none",
                    borderLeft: isActive
                      ? "4px solid var(--corail)"
                      : "4px solid transparent",
                    cursor: "pointer",
                    font: "inherit",
                    transition:
                      "background .22s cubic-bezier(.2,.8,.2,1), color .22s ease, border-color .22s ease",
                  }}
                >
                  <div
                    className="capacity-card-eyebrow"
                    style={{
                      fontFamily:
                        "var(--font-jetbrains), JetBrains Mono, monospace",
                      fontSize: 11,
                      color: isActive ? "var(--anse)" : "var(--lagon)",
                      marginBottom: 12,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")} ·{" "}
                    {PHASE_LABEL[cap.phase] || cap.phase}
                  </div>
                  <h4
                    className="display capacity-card-title"
                    style={{
                      fontSize: 22,
                      marginBottom: 10,
                      color: isActive ? "var(--air)" : "var(--fg)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {cap.title}
                  </h4>
                  <p
                    className="capacity-card-desc"
                    style={{
                      color: isActive
                        ? "rgba(248,251,252,0.72)"
                        : "var(--muted)",
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {cap.shortDescription}
                  </p>
                </button>
              );
            })}
          </div>

          <div ref={mediaWrapperRef} className="capacities-media">
            {renderMode === "video-proof" ? (
              <VideoProofPlayer
                key={active?._id ?? "default"}
                video={active?.video}
                caption={active?.caption}
                beforeLabel={active?.beforeLabel}
                afterLabel={active?.afterLabel}
                ariaLabel={
                  active?.title
                    ? `Preuve vidéo · ${active.title}`
                    : "Preuve vidéo"
                }
              />
            ) : (
              <BeforeAfterSlider
                key={active?._id ?? "default"}
                beforeImage={active?.beforeImage}
                afterImage={active?.afterImage}
                beforeLabel={active?.beforeLabel ?? "AVANT"}
                afterLabel={active?.afterLabel ?? "APRÈS"}
                caption={active?.caption}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Layout par défaut : flex column. JSX = [tablist, media] ;
           sur mobile <768px, le tablist (devenu chips horizontaux) apparaît
           donc AU-DESSUS du media — télécommande compacte avant le lecteur. */
        .capacities-layout {
          display: flex;
          flex-direction: column;
        }
        .capacities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }
        .capacity-card {
          padding: 32px 28px;
        }

        /* Mobile <768px : chips horizontaux scroll-x au-dessus du media */
        @media (max-width: 767px) {
          .capacities-grid {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 8px;
            margin: 8px 0 24px;
            padding: 4px 4px;
            background: transparent;
            border: none;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
          }
          .capacity-card {
            flex: 0 0 auto;
            padding: 10px 16px;
            min-height: 0;
          }
          .capacity-card-eyebrow,
          .capacity-card-desc {
            display: none;
          }
          .capacity-card-title {
            font-size: 13px !important;
            margin: 0 !important;
            white-space: nowrap;
          }
        }

        /* Mobile <768px : stabilise la hauteur du bloc texte au-dessus du
           media pour éviter que le lecteur ne saute au switch de chip
           (le H3 et la description varient en longueur selon la capacité). */
        @media (max-width: 767px) {
          .capacities-text {
            margin-bottom: 16px;
          }
          .capacities-text > h3 {
            font-size: 28px !important;
            line-height: 1.05 !important;
            margin-bottom: 12px !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: calc(2 * 28px * 1.05);
          }
          .capacities-text > p {
            font-size: 14px !important;
            line-height: 1.4 !important;
            margin-bottom: 12px !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: calc(2 * 14px * 1.4);
          }
        }

        /* 768-1199px : conserver l'ancien ordre (media avant tablist en stack)
           via flex order, plus sticky du media pour réduire le yo-yo. */
        @media (min-width: 768px) and (max-width: 1199px) {
          .capacities-media {
            order: 0;
            position: sticky;
            top: 88px;
            z-index: 1;
            background: var(--air);
            padding-bottom: 24px;
          }
          .capacities-grid {
            order: 1;
            margin-top: 40px;
          }
        }

        /* 1200px+ : layout 2 colonnes (media gauche / mosaïque droite)
           via grid-template-areas pour remixer l'ordre DOM.
           Mosaïque calée sur la hauteur mesurée du rectangle media
           (cf. ResizeObserver côté React qui pose --media-frame-height). */
        @media (min-width: 1200px) {
          .capacities-layout {
            display: grid;
            grid-template-columns: minmax(0, 6fr) minmax(0, 4fr);
            grid-template-areas: "media grid";
            gap: 32px;
            align-items: start;
          }
          .capacities-media {
            grid-area: media;
            min-width: 0;
          }
          .capacities-grid {
            grid-area: grid;
            height: var(--media-frame-height, auto);
            min-height: 0;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(4, minmax(0, 1fr));
            gap: 12px;
            background: transparent;
            border: none;
            overflow: hidden;
          }
          .capacity-card {
            padding: 12px 14px;
            min-height: 0;
            overflow: hidden;
            box-shadow: inset 0 0 0 1px var(--line);
          }
          .capacity-card[data-active="true"] {
            box-shadow: none;
          }
          .capacity-card-eyebrow {
            margin-bottom: 4px !important;
          }
          .capacity-card-title {
            font-size: 15px !important;
            margin-bottom: 4px !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .capacity-card-desc {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        /* prefers-reduced-motion : aplatir la transition de fond */
        @media (prefers-reduced-motion: reduce) {
          .capacity-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
