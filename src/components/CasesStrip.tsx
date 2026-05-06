import type { PartnerFallback } from "@/lib/content-fallback";

interface CasesStripProps {
  partners: Pick<PartnerFallback, "_id" | "name">[];
}

export default function CasesStrip({ partners }: CasesStripProps) {
  return (
    <section
      style={{
        padding: "48px 0",
        background: "#fff",
      }}
    >
      <div className="container-x">
        <div
          className="mono"
          style={{
            textAlign: "center",
            marginBottom: 32,
            color: "var(--muted)",
          }}
        >
          ↳ ILS NOUS ONT FAIT CONFIANCE
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 48,
            opacity: 0.65,
          }}
        >
          {partners.map((p) => (
            <div
              key={p._id}
              className="display"
              style={{
                fontSize: 24,
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
