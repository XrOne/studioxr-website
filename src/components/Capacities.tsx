"use client";

import { useMemo, useRef, useState } from "react";
import type { CapacityFallback } from "@/lib/content-fallback";
import BeforeAfterSlider from "./BeforeAfterSlider";

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
  const panelRef = useRef<HTMLDivElement>(null);

  const active =
    visible.find((c) => c._id === activeId) ?? visible[0] ?? null;

  const supportedMode =
    !active?.mode || active.mode === "comparator" ? "comparator" : "fallback";

  function activateCapacity(id: string) {
    setActiveId(id);
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768 && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          ref={panelRef}
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={active ? `capacity-tab-${active._id}` : undefined}
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

          <BeforeAfterSlider
            key={active?._id ?? "default"}
            beforeImage={
              supportedMode === "comparator" ? active?.beforeImage : undefined
            }
            afterImage={
              supportedMode === "comparator" ? active?.afterImage : undefined
            }
            beforeLabel={active?.beforeLabel}
            afterLabel={active?.afterLabel}
            caption={active?.caption}
          />
        </div>

        <div
          role="tablist"
          aria-label="Capacités IA"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: "var(--line)",
            marginTop: 80,
            border: "1px solid var(--line)",
          }}
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
                style={{
                  position: "relative",
                  textAlign: "left",
                  padding: "32px 28px",
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
                  style={{
                    fontFamily:
                      "var(--font-jetbrains), JetBrains Mono, monospace",
                    fontSize: 11,
                    color: isActive ? "var(--anse)" : "var(--lagon)",
                    marginBottom: 16,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")} ·{" "}
                  {PHASE_LABEL[cap.phase] || cap.phase}
                </div>
                <h4
                  className="display"
                  style={{
                    fontSize: 24,
                    marginBottom: 12,
                    color: isActive ? "var(--air)" : "var(--fg)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {cap.title}
                </h4>
                <p
                  style={{
                    color: isActive
                      ? "rgba(248,251,252,0.72)"
                      : "var(--muted)",
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {cap.shortDescription}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
