import Link from "next/link";

export default function ManifesteTeaser() {
  return (
    <section
      style={{
        padding: "160px 0",
        background: "var(--abysse)",
        color: "var(--air)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(800px circle at 30% 50%, rgba(14,124,155,0.4), transparent 60%), radial-gradient(600px circle at 70% 50%, rgba(94,200,214,0.2), transparent 60%)",
        }}
      />
      <div
        className="container-x"
        style={{ position: "relative", zIndex: 1 }}
      >
        <span
          className="mono"
          style={{
            color: "var(--anse)",
            marginBottom: 24,
            display: "inline-block",
          }}
        >
          ↳ NOTRE POSITION
        </span>
        <h2
          className="display"
          style={{
            fontSize: "clamp(48px, 9vw, 140px)",
            color: "var(--air)",
            marginBottom: 24,
          }}
        >
          L&apos;IA NE REMPLACE
          <br />
          PAS LE{" "}
          <em
            style={{ fontStyle: "normal", color: "var(--corail)" }}
          >
            PLATEAU.
          </em>
          <br />
          ELLE L&apos;AGRANDIT.
        </h2>
        <p
          style={{
            fontSize: 21,
            color: "rgba(248,251,252,0.75)",
            maxWidth: 680,
            margin: "0 auto 40px",
          }}
        >
          Onze ans à manipuler les outils. À en connaître les forces, les
          angles morts, les bons et mauvais usages. Pour ne jamais laisser
          la machine décider à la place du réalisateur.
        </p>
        <Link href="/manifeste" className="cta-btn cta-btn-lg">
          Lire notre manifeste →
        </Link>
      </div>
    </section>
  );
}
