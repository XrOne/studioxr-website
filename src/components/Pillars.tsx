interface Pillar {
  num: string;
  tag: string;
  title: string;
  intro: string;
  bullets: string[];
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    tag: "PRÉPA PROD",
    title: "Voir avant.",
    intro:
      "Décors. Storyboards. Animatics. Continuité. Le tournage commence ici.",
    bullets: [
      "Décors IA avant / après",
      "Storyboards & animatics",
      "Découpage technique",
      "Moodboards alignés brief",
    ],
  },
  {
    num: "02",
    tag: "TOURNAGE HYBRIDE",
    title: "Augmenter sans perturber.",
    intro:
      "Plans IA dans vos rushes. Outils par corps de métier. Le plateau reste roi.",
    bullets: [
      "Plans IA insertion rushes",
      "Apps par corps de métier",
      "Assistant scripte / cadre",
      "VR · AR · expériences immersives",
    ],
  },
  {
    num: "03",
    tag: "POST PROD & CONSEIL",
    title: "Étalonner. Transmettre.",
    intro:
      "Pipeline HDR. Audits workflow. Formations équipes. Le plateau, ensuite.",
    bullets: [
      "Profondeur 8 → 32 bits float",
      "Pipeline HDR & EXR",
      "Audit workflow IA",
      "Formations équipes prod",
    ],
  },
];

export default function Pillars() {
  return (
    <section style={{ padding: "160px 0", background: "#fff" }}>
      <div className="container-x">
        <div className="section-eyebrow">
          <span className="mono">MÉTHODE · 02</span>
        </div>
        <h2 className="display section-title">
          TROIS MÉTIERS.
          <br />
          UNE SEULE
          <br />
          MÉTHODE.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
        >
          {PILLARS.map((p) => (
            <div
              key={p.num}
              style={{
                position: "relative",
                padding: "48px 40px",
                background: "#fff",
                transition: "background .3s",
              }}
            >
              <div
                className="display"
                style={{
                  fontSize: 96,
                  color: "var(--anse)",
                  lineHeight: 0.8,
                  marginBottom: 24,
                }}
              >
                {p.num}
              </div>
              <span
                className="mono"
                style={{
                  color: "var(--muted)",
                  marginBottom: 16,
                  display: "block",
                }}
              >
                {p.tag}
              </span>
              <h3
                className="display"
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                  letterSpacing: "0.02em",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 15.5,
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                {p.intro}
              </p>
              <ul style={{ listStyle: "none", marginBottom: 24 }}>
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      padding: "8px 0 8px 20px",
                      fontSize: 14,
                      color: "var(--fg)",
                      borderTop: "1px solid var(--line)",
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
