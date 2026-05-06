import type { CapacityFallback } from "@/lib/content-fallback";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface CapacitiesProps {
  capacities: Pick<
    CapacityFallback,
    "_id" | "title" | "phase" | "shortDescription"
  >[];
}

const PHASE_LABEL: Record<string, string> = {
  "prepa-prod": "prépa prod",
  "tournage-hybride": "tournage hybride",
  "post-prod": "post prod",
  transverse: "transverse",
};

export default function Capacities({ capacities }: CapacitiesProps) {
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
          FEATURED · PRÉPA PROD
        </div>
        <h3
          className="display"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            marginBottom: 24,
          }}
        >
          DÉCORS — AVANT / APRÈS.
        </h3>
        <p
          style={{
            color: "var(--muted)",
            maxWidth: 680,
            marginBottom: 32,
            fontSize: 17,
          }}
        >
          Photo du décor brut. Projection IA finalisée. L&apos;équipe valide
          la mise en scène avant de poser un seul rideau.
        </p>

        <BeforeAfterSlider />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: "var(--line)",
            marginTop: 80,
            border: "1px solid var(--line)",
          }}
        >
          {capacities.map((cap, idx) => (
            <div
              key={cap._id}
              style={{
                padding: "32px 28px",
                background: "#fff",
                transition: "background .2s",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-jetbrains), JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "var(--lagon)",
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
                  color: "var(--fg)",
                  letterSpacing: "0.02em",
                }}
              >
                {cap.title}
              </h4>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 14.5,
                  lineHeight: 1.55,
                }}
              >
                {cap.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
