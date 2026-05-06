import type { CaseStudyFallback } from "@/lib/content-fallback";

interface CaseStudiesProps {
  caseStudies: Pick<
    CaseStudyFallback,
    "_id" | "title" | "tag" | "shortDescription" | "bgVariant"
  >[];
}

const BG_GRADIENTS: Record<1 | 2 | 3, string> = {
  1: "linear-gradient(180deg, rgba(10,31,44,0) 30%, rgba(10,31,44,0.92) 100%), linear-gradient(135deg, #0E7C9B 0%, #0A1F2C 100%)",
  2: "linear-gradient(180deg, rgba(10,31,44,0) 30%, rgba(10,31,44,0.92) 100%), linear-gradient(135deg, #3D5A6C 0%, #0A1F2C 100%)",
  3: "linear-gradient(180deg, rgba(10,31,44,0) 30%, rgba(10,31,44,0.92) 100%), linear-gradient(135deg, #5EC8D6 0%, #0E7C9B 100%)",
};

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
    <section
      id="cases"
      style={{ padding: "160px 0", background: "var(--air)" }}
    >
      <div className="container-x">
        <div className="section-eyebrow">
          <span className="mono">ÉTUDES DE CAS · 03</span>
        </div>
        <h2 className="display section-title">
          LA PREUVE,
          <br />
          PAR L&apos;USAGE.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginTop: 64,
          }}
        >
          {caseStudies.map((cs) => (
            <article
              key={cs._id}
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: BG_GRADIENTS[cs.bgVariant ?? 1],
                  transition: "transform .6s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 32,
                  color: "var(--air)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    background: "rgba(248,251,252,0.18)",
                    backdropFilter: "blur(8px)",
                    marginBottom: 16,
                    color: "var(--air)",
                  }}
                >
                  {cs.tag}
                </span>
                <h3
                  className="display"
                  style={{
                    fontSize: 36,
                    color: "var(--air)",
                    marginBottom: 8,
                    letterSpacing: "0.02em",
                  }}
                >
                  {cs.title}
                </h3>
                <p
                  style={{
                    color: "rgba(248,251,252,0.75)",
                    fontSize: 14,
                  }}
                >
                  {cs.shortDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
