import Link from "next/link";

const CYCLE_WORDS = ["BRIEF", "SCRIPT", "PLATEAU", "TEASER", "STORYBOARD"];

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "flex-end",
        padding: "140px 0 60px",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, var(--air) 0%, #fff 100%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(900px circle at 15% 30%, rgba(94,200,214,0.18), transparent 65%), radial-gradient(700px circle at 85% 75%, rgba(14,124,155,0.14), transparent 65%)",
          animation: "drift 20s ease-in-out infinite alternate",
        }}
      />

      <div
        className="container-x"
        style={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span className="mono" style={{ color: "var(--lagon-text)" }}>
            <span aria-hidden="true">↳ </span>STUDIO XR-ONE · DEPUIS 2014
          </span>
          <span className="mono" style={{ color: "var(--muted)" }}>
            CRÉACANNES <span aria-hidden="true">→</span>
            <span className="sr-only"> à </span> PARIS · 11 ANS DE TOURNAGE HYBRIDE
          </span>
        </div>

        <h1
          className="display"
          style={{
            fontSize: "clamp(64px, 12vw, 180px)",
            color: "var(--fg)",
          }}
        >
          DU{" "}
          <span className="sr-only">
            brief, du script, du plateau, du teaser ou du storyboard,
          </span>
          <span className="word-cycle" aria-hidden="true">
            {CYCLE_WORDS.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </span>
          <br />
          <span style={{ color: "var(--lagon)" }}>AU PIXEL.</span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginTop: 48,
            alignItems: "end",
          }}
          className="hero-sub-grid"
        >
          <p
            style={{
              fontSize: 19,
              color: "var(--muted)",
              maxWidth: 520,
              lineHeight: 1.5,
            }}
          >
            Studio audiovisuel pionnier. On accompagne réalisateurs,
            producteurs et régies de l&apos;écriture au pixel final — brief,
            script, prépa, tournage hybride, post-prod augmentée par IA.
            Sans buzzword. Avec méthode.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 16,
            }}
            className="hero-actions"
          >
            <span className="mono" style={{ color: "var(--muted)" }}>
              <span aria-hidden="true">↓ </span>ÉCRIRE PROCHAIN PROJET
            </span>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="#cta-final" className="cta-btn">
                Démarrer un brief
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-sub-grid { grid-template-columns: 1fr !important; }
          .hero-actions { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
