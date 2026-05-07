interface Software {
  tag: string;
  title: string;
  desc: string;
  href: string;
  hrefLabel: string;
}

// Section "outils IA propriétaires actifs" — uniquement Jenial + Cinemia.
// MIZIK a été déplacé vers la section Pionniers (preuve d'ADN XR, pas outil vendu aux prods).
const SOFTWARES: Software[] = [
  {
    tag: "Phare",
    title: "Jenial",
    desc: "Éditeur de séquences IA. Multi-providers, timeline pro, dogma manager.",
    href: "https://jenial.app",
    hrefLabel: "jenial.app →",
  },
  {
    tag: "Module",
    title: "Cinemia",
    desc: "L'IA pour le cinéma. Découpage, continuité, prévisualisation.",
    href: "https://jenial.app/cinemia",
    hrefLabel: "/cinemia →",
  },
];

export default function Logiciels() {
  return (
    <section
      id="logiciels"
      style={{
        padding: "160px 0",
        background: "var(--abysse)",
        color: "var(--air)",
      }}
    >
      <div className="container-x">
        <div className="section-eyebrow dark">
          <span className="mono">LOGICIELS · 04</span>
        </div>
        <h2
          className="display section-title"
          style={{ color: "var(--air)" }}
        >
          NOS OUTILS.
          <br />
          PAS CEUX
          <br />
          D&apos;UN AUTRE.
        </h2>
        <p
          className="section-sub"
          style={{ color: "rgba(248,251,252,0.65)" }}
        >
          Concevoir nos propres briques IA, c&apos;est garantir qu&apos;elles
          servent vos plateaux — pas l&apos;inverse. R&amp;D interne,
          terrain réel, prods clientes.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 1,
            background: "var(--line-dark)",
            marginTop: 64,
            border: "1px solid var(--line-dark)",
          }}
        >
          {SOFTWARES.map((s) => (
            <div
              key={s.title}
              style={{
                padding: "48px 40px",
                background: "var(--abysse)",
                transition: "background .3s",
              }}
            >
              <span
                className="mono"
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "rgba(94,200,214,0.16)",
                  color: "var(--anse)",
                  marginBottom: 24,
                }}
              >
                {s.tag}
              </span>
              <h3
                className="display"
                style={{
                  fontSize: 42,
                  color: "var(--air)",
                  marginBottom: 12,
                  letterSpacing: "0.02em",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  color: "rgba(248,251,252,0.7)",
                  fontSize: 14.5,
                  marginBottom: 24,
                  lineHeight: 1.5,
                }}
              >
                {s.desc}
              </p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--anse)",
                  fontFamily:
                    "var(--font-jetbrains), JetBrains Mono, monospace",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                }}
              >
                {s.hrefLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
