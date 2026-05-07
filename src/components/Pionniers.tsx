import Image from "next/image";
import type { LegacyProjectFallback } from "@/lib/content-fallback";

interface PionniersProps {
  projects: LegacyProjectFallback[];
}

/**
 * Section "Pionniers" — preuves d'ADN XR/VR (2015-2021).
 * Storytelling : "Depuis 2014, XR-ONE signe des premières dans les médias innovants."
 * Copy à affiner via Sanity (ce composant n'utilise que les fallbacks pour le moment).
 */
export default function Pionniers({ projects }: PionniersProps) {
  return (
    <section
      id="pionniers"
      style={{
        padding: "160px 0",
        background: "var(--sable)",
        color: "var(--abysse)",
      }}
    >
      <div className="container-x">
        <div className="section-eyebrow">
          <span className="mono">PIONNIERS · 05</span>
        </div>
        <h2 className="display section-title">
          DEPUIS 2014,
          <br />
          ON SIGNE
          <br />
          DES PREMIÈRES.
        </h2>
        <p
          className="section-sub"
          style={{ color: "var(--abysse)", opacity: 0.75 }}
        >
          Premier court-métrage français en VR 360° stéréo. Premier contest
          karaoké VR à Laval Virtual. Aujourd&apos;hui, prépa et plans IA
          insérés dans les rushes. La techno change, l&apos;envie d&apos;en
          être les premiers reste.
        </p>

        <ul
          style={{
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginTop: 64,
          }}
        >
          {projects.map((p) => {
            const youtubeUrl = p.youtubeId
              ? `https://www.youtube.com/watch?v=${p.youtubeId}`
              : "https://mizik.tech";
            const thumbUrl = p.youtubeId
              ? `https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg`
              : null;
            return (
              <li
                key={p._id}
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(10,31,44,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    background: thumbUrl
                      ? "var(--abysse)"
                      : "linear-gradient(135deg, var(--lagon) 0%, var(--abysse) 100%)",
                    overflow: "hidden",
                  }}
                >
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={`Vignette de la vidéo ${p.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        color: "var(--anse)",
                        fontFamily:
                          "var(--font-anton), Anton, sans-serif",
                        fontSize: 64,
                        letterSpacing: "0.04em",
                      }}
                    >
                      VR
                    </div>
                  )}
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <span
                    className="mono"
                    style={{
                      color: "var(--lagon-text)",
                      display: "inline-block",
                      marginBottom: 12,
                    }}
                  >
                    {p.year} · {p.format}
                  </span>
                  <h3
                    className="display"
                    style={{
                      fontSize: 28,
                      marginBottom: 12,
                      letterSpacing: "0.02em",
                      color: "var(--abysse)",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      marginBottom: 16,
                    }}
                  >
                    {p.claim}
                  </p>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "var(--muted)",
                      marginBottom: 20,
                      fontStyle: "italic",
                    }}
                  >
                    {p.role}
                  </p>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir ${p.title} (ouvre dans un nouvel onglet)`}
                    style={{
                      color: "var(--lagon-text)",
                      fontFamily:
                        "var(--font-jetbrains), JetBrains Mono, monospace",
                      fontSize: 13,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.youtubeId ? "Voir la vidéo →" : "mizik.tech →"}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
