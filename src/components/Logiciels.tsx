interface Software {
  tag: string;
  title: string;
  intro: string;
  bullets: string[];
  href: string;
  hrefLabel: string;
}

interface PipelineStep {
  num: string;
  title: string;
  desc: string;
}

// Section "outils IA propriétaires actifs" — Jenial + Cinemia.
// MIZIK a été déplacé vers la section Pionniers (preuve d'ADN XR, pas outil vendu aux productions).
const SOFTWARES: Software[] = [
  {
    tag: "Phare",
    title: "Jenial",
    intro:
      "Visualisation IA pour la production audiovisuelle. Keyframes, références, séquences tests, continuité visuelle.",
    bullets: [
      "Timeline pro multi-providers",
      "Gestion des références & moodboards",
      "Dogma manager (charte de style projet)",
      "Cohérence inter-plans, raccords",
    ],
    href: "https://jenial.app",
    hrefLabel: "jenial.app →",
  },
  {
    tag: "Module pré-production",
    title: "Cinemia",
    intro:
      "L'IA appliquée à la pré-production audiovisuelle. Du scénario à la pré-séquence, sans toucher au tournage.",
    bullets: [
      "Dépouillement & découpage technique",
      "Storyboard 4 traitements (crayon, animation, photoréaliste, animatic)",
      "Previz décor / casting / prélighting",
      "Plan au sol caméra & électro, plan de feu",
      "Pré-séquence test (vidéo IA conforme au brief)",
    ],
    href: "https://jenial.app/cinemia",
    hrefLabel: "jenial.app/cinemia →",
  },
];

const PIPELINE_STEPS: PipelineStep[] = [
  {
    num: "01",
    title: "Dépouillement & découpage technique",
    desc: "Lecture du scénario, extraction des éléments à produire (décors, costumes, accessoires, casting, effets), liste des plans avec valeur, mouvement, raccord. Sortie : fiche scènes + plan de travail prévisionnel.",
  },
  {
    num: "02",
    title: "Storyboard & animatic",
    desc: "Illustration des plans clés en 4 traitements selon la cible : crayon (réa), animation (chefs de poste), photoréaliste (production / diffuseur), animatic (timing + son temp).",
  },
  {
    num: "03",
    title: "Prévisualisation",
    desc: "Habillage IA des photos de repérage. Previz décor, previz casting, prélighting, plan au sol caméra & électro. Validation avant réunion chefs de poste.",
  },
  {
    num: "04",
    title: "Pré-séquence test",
    desc: "Séquence vidéo IA conforme au brief (ambiance, casting, décor) — la production valide le concept avant le premier jour de tournage.",
  },
];

export default function Logiciels() {
  return (
    <section
      id="logiciels"
      aria-labelledby="logiciels-title"
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
          id="logiciels-title"
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
          servent vos productions — du dépouillement à la post — pas
          l&apos;inverse. R&amp;D interne, projets clients, validation
          chefs de poste.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
                display: "flex",
                flexDirection: "column",
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
                  alignSelf: "flex-start",
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
                  color: "rgba(248,251,252,0.78)",
                  fontSize: 15,
                  marginBottom: 20,
                  lineHeight: 1.55,
                }}
              >
                {s.intro}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  marginBottom: 28,
                }}
              >
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      padding: "8px 0 8px 20px",
                      fontSize: 13.5,
                      color: "rgba(248,251,252,0.72)",
                      lineHeight: 1.5,
                      borderTop: "1px solid var(--line-dark)",
                      position: "relative",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        color: "var(--corail)",
                        fontWeight: "bold",
                      }}
                    >
                      +
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "auto",
                  color: "var(--anse)",
                  fontFamily:
                    "var(--font-jetbrains), JetBrains Mono, monospace",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {s.hrefLabel}
              </a>
            </div>
          ))}
        </div>

        {/* === Pipeline pré-production Cinemia === */}
        <div
          id="cinemia"
          aria-labelledby="cinemia-pipeline-title"
          style={{ marginTop: 96 }}
        >
          <div className="section-eyebrow dark">
            <span className="mono">CINEMIA · PIPELINE PRÉ-PRODUCTION</span>
          </div>
          <h3
            id="cinemia-pipeline-title"
            className="display"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "var(--air)",
              marginBottom: 48,
              maxWidth: 920,
              letterSpacing: "0.01em",
            }}
          >
            DU SCRIPT AU PIXEL.
            <br />
            SANS RIEN CASSER.
          </h3>

          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 1,
              background: "var(--line-dark)",
              border: "1px solid var(--line-dark)",
            }}
          >
            {PIPELINE_STEPS.map((step) => (
              <li
                key={step.num}
                style={{
                  padding: "36px 32px",
                  background: "var(--abysse)",
                }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: 64,
                    color: "var(--anse)",
                    lineHeight: 0.85,
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </div>
                <h4
                  className="display"
                  style={{
                    fontSize: 20,
                    color: "var(--air)",
                    marginBottom: 12,
                    letterSpacing: "0.02em",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "rgba(248,251,252,0.7)",
                    lineHeight: 1.55,
                  }}
                >
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>

          <div
            style={{
              marginTop: 56,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
            }}
          >
            <a
              href="https://jenial.app/cinemia"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-lg"
              style={{ background: "var(--corail)", color: "var(--abysse)" }}
            >
              Découvrir Cinemia
            </a>
            {/* TODO[forme-supabase] : remplacer par /api/lead-cinemia */}
            <a
              href="mailto:contact@studioxr.one?subject=Demande%20d%C3%A9mo%20Cinemia%20%E2%80%94%20pr%C3%A9-production"
              style={{
                color: "var(--anse)",
                fontFamily:
                  "var(--font-jetbrains), JetBrains Mono, monospace",
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom: "1px solid var(--anse)",
                paddingBottom: 4,
              }}
            >
              Demander une démo pré-production →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
