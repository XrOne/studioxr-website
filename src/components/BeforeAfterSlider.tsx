"use client";

import { useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "DÉCOR BRUT",
  afterLabel = "DÉCOR SCÉNARISÉ",
  caption = "↳ glissez le séparateur · placeholder · Declics 2 (production Inevitable)",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    function onMove(clientX: number) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = ((clientX - rect.left) / rect.width) * 100;
      setPct(Math.max(0, Math.min(100, next)));
    }

    function handleMouseMove(e: MouseEvent) {
      if (dragging) onMove(e.clientX);
    }
    function handleTouchMove(e: TouchEvent) {
      if (dragging && e.touches[0]) onMove(e.touches[0].clientX);
    }
    function handleUp() {
      setDragging(false);
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging]);

  function handleMouseDown(e: React.MouseEvent) {
    setDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((e.clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }
  function handleTouchStart(e: React.TouchEvent) {
    setDragging(true);
    const t = e.touches[0];
    if (!t) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((t.clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }

  const afterStyle: React.CSSProperties = afterImage
    ? {
        backgroundImage: `url(${afterImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background:
          "radial-gradient(ellipse 700px 500px at 50% 60%, rgba(255,138,101,0.25), transparent 70%), linear-gradient(135deg, #8B5A2B 0%, #3D2818 100%)",
      };

  const beforeStyle: React.CSSProperties = beforeImage
    ? {
        backgroundImage: `url(${beforeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        clipPath: `inset(0 ${100 - pct}% 0 0)`,
      }
    : {
        background:
          "radial-gradient(ellipse 600px 400px at 60% 70%, rgba(180,170,140,0.4), transparent 70%), linear-gradient(135deg, #A89E80 0%, #5C5340 100%)",
        clipPath: `inset(0 ${100 - pct}% 0 0)`,
      };

  return (
    <>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-label={`Comparateur avant / après — ${beforeLabel} versus ${afterLabel}. Utilisez les flèches gauche et droite pour comparer.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-valuetext={`${Math.round(pct)} % du décor brut visible`}
        aria-orientation="horizontal"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            setPct((p) => Math.max(0, p - 5));
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            setPct((p) => Math.min(100, p + 5));
          }
          if (e.key === "Home") {
            e.preventDefault();
            setPct(0);
          }
          if (e.key === "End") {
            e.preventDefault();
            setPct(100);
          }
        }}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          cursor: "ew-resize",
          userSelect: "none",
          background: "#000",
          marginBottom: 16,
          overflow: "hidden",
          touchAction: "none",
        }}
        className="ba-comparator"
      >
        <div
          className="ba-panel ba-panel-after"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(248,251,252,0.95)",
            fontFamily: "var(--font-anton), Anton, sans-serif",
            fontSize: 32,
            textAlign: "center",
            padding: "0 32px",
            letterSpacing: "0.04em",
            ...afterStyle,
          }}
        >
          <span className="ba-center-label">{afterLabel}</span>
          <span className="ba-corner-label ba-corner-label-after">
            {afterLabel}
          </span>
        </div>

        <div
          className="ba-panel ba-panel-before"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(248,251,252,0.85)",
            fontFamily: "var(--font-anton), Anton, sans-serif",
            fontSize: 32,
            textAlign: "center",
            padding: "0 32px",
            letterSpacing: "0.04em",
            ...beforeStyle,
          }}
        >
          <span className="ba-center-label">{beforeLabel}</span>
          <span className="ba-corner-label ba-corner-label-before">
            {beforeLabel}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="ba-divider"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${pct}%`,
            width: 3,
            background: "#fff",
            transform: "translateX(-50%)",
            boxShadow: "0 0 32px rgba(255,255,255,0.5)",
            pointerEvents: "none",
          }}
        >
          <div
            className="ba-handle"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 48,
              height: 48,
              background: "#fff",
              color: "var(--abysse)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            ⇄
          </div>
        </div>
      </div>
      <div
        className="mono"
        style={{ color: "var(--muted)", marginBottom: 48 }}
      >
        {caption}
      </div>

      <style>{`
        /* Desktop par défaut : labels centraux visibles, badges en coins
           masqués, poignée 48px et séparateur 3px (cf. inline styles). */
        .ba-corner-label {
          display: none;
        }

        /* Mobile <768px : on inverse — labels centraux masqués, badges
           discrets en coins, poignée et séparateur réduits.
           Le !important est nécessaire pour override les inline styles
           des handle / divider (adaptation responsive ciblée). */
        @media (max-width: 767px) {
          .ba-center-label {
            display: none;
          }
          .ba-corner-label {
            display: inline-block;
            position: absolute;
            top: 12px;
            font-family: var(--font-anton), Anton, sans-serif;
            font-size: 10px;
            line-height: 1;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 5px 8px;
            background: rgba(10, 31, 44, 0.85);
            color: rgba(248, 251, 252, 0.95);
            pointer-events: none;
            white-space: nowrap;
            max-width: calc(50% - 24px);
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .ba-corner-label-before {
            left: 12px;
          }
          .ba-corner-label-after {
            right: 12px;
          }
          .ba-divider {
            width: 2px !important;
            box-shadow: 0 0 16px rgba(255, 255, 255, 0.4) !important;
          }
          .ba-handle {
            width: 36px !important;
            height: 36px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </>
  );
}
