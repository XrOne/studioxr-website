import type { Metadata } from "next";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import CTAFinal from "@/components/CTAFinal";

import { fetchSanity } from "@/sanity/lib/fetch";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import {
  FALLBACK_ENGAGEMENTS,
  type EngagementFallback,
} from "@/lib/content-fallback";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Manifeste",
  description:
    "Tourner à l'ère de l'IA. Sans la subir. Sans la fétichiser. Onze ans à manipuler les outils — Studio XR·ONE.",
};

interface SanitySettings {
  contactEmail?: string;
  engagements?: { number?: string; title?: string; description?: string }[];
}

export default async function ManifestePage() {
  const settings = await fetchSanity<SanitySettings>({
    query: SETTINGS_QUERY,
    tags: ["settings"],
  });

  const engagements: EngagementFallback[] =
    settings?.engagements && settings.engagements.length > 0
      ? settings.engagements.map((e, i) => ({
          number: e.number || String(i + 1).padStart(2, "0"),
          title: e.title || "",
          description: e.description || "",
        }))
      : FALLBACK_ENGAGEMENTS;

  const contactEmail = settings?.contactEmail || "contact@studioxr.one";

  return (
    <div style={{ background: "var(--abysse)", color: "var(--air)" }}>
      {/* Header transparent fixed */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "transparent",
          zIndex: 50,
          padding: "32px 0",
        }}
      >
        <div className="container-x">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/"
              className="display"
              style={{
                fontSize: 24,
                color: "var(--air)",
                letterSpacing: "0.04em",
              }}
            >
              XR<span style={{ color: "var(--anse)" }}>·</span>ONE
            </Link>
            <Link
              href="/"
              className="mono"
              style={{ color: "rgba(248,251,252,0.6)" }}
            >
              ← Retour à l&apos;accueil
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "120px 0 80px",
          color: "var(--air)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1200px circle at 30% 40%, rgba(14,124,155,0.5), transparent 60%), radial-gradient(900px circle at 75% 65%, rgba(94,200,214,0.3), transparent 60%), linear-gradient(135deg, #061421 0%, #0A1F2C 50%, #0E2A3D 100%)",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(94,200,214,0.15) 1px, transparent 0)",
              backgroundSize: "48px 48px",
              opacity: 0.4,
            }}
          />
        </div>

        <div
          className="container-x"
          style={{ position: "relative", zIndex: 1, width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <span className="mono" style={{ color: "var(--anse)" }}>
              ↳ STUDIO XR-ONE · MANIFESTE
            </span>
            <span
              className="mono"
              style={{ color: "rgba(248,251,252,0.5)" }}
            >
              PRODUIRE À L&apos;ÈRE DE L&apos;IA · 2026
            </span>
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(72px, 16vw, 260px)",
              color: "var(--air)",
              marginBottom: 64,
            }}
          >
            MANIFESTE.
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "end",
            }}
            className="manifeste-hero-grid"
          >
            <div
              className="display"
              style={{
                fontSize: "clamp(20px, 2.5vw, 32px)",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                color: "var(--anse)",
              }}
            >
              Tourner à l&apos;ère de l&apos;intelligence artificielle.
              <br />
              Sans la subir. Sans la fétichiser.
            </div>
            <div
              style={{
                fontSize: 18,
                color: "rgba(248,251,252,0.7)",
                maxWidth: 480,
                justifySelf: "end",
                lineHeight: 1.5,
              }}
              className="manifeste-hero-right"
            >
              Onze ans à manipuler les outils. Onze ans à savoir{" "}
              <em style={{ color: "var(--anse)", fontStyle: "normal" }}>
                quand les utiliser. Et quand ne pas les utiliser.
              </em>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mono"
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(248,251,252,0.5)",
            letterSpacing: "0.12em",
            animation: "bob 2s ease-in-out infinite",
          }}
        >
          ↓ Lire
        </div>
      </section>

      {/* STATEMENT */}
      <section
        style={{
          padding: "200px 0",
          textAlign: "center",
          borderBlock: "1px solid var(--line-dark)",
        }}
      >
        <div className="container-x">
          <h2
            className="display"
            style={{
              fontSize: "clamp(48px, 9vw, 140px)",
              color: "var(--air)",
              marginBottom: 48,
              lineHeight: 0.95,
            }}
          >
            L&apos;IA NE REMPLACE
            <br />
            PAS LE{" "}
            <em style={{ fontStyle: "normal", color: "var(--corail)" }}>
              RÉALISATEUR.
            </em>
            <br />
            ELLE ÉLARGIT
            <br />
            SON CHAMP.
          </h2>
          <p
            style={{
              fontSize: 21,
              color: "rgba(248,251,252,0.7)",
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Ce qui change, ce n&apos;est pas la machine. C&apos;est ce
            qu&apos;on lui demande de faire.
          </p>
        </div>
      </section>

      {/* MANIFESTE BODY */}
      <section
        style={{
          padding: "160px 0",
          background: "var(--air)",
          color: "var(--fg)",
        }}
      >
        <div className="container-x">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 96,
              alignItems: "start",
            }}
            className="manifeste-grid"
          >
            <h2
              className="display"
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                color: "var(--fg)",
                position: "sticky",
                top: 120,
              }}
            >
              CE QUE NOUS
              <br />
              CROYONS.
            </h2>
            <div className="manifeste-text">
              <p style={paragraphStyle}>
                Depuis <strong style={strongStyle}>2014, à CréaCannes</strong>,
                nous fabriquons des images là où la frontière du réel devient
                floue. VR. AR. Plateaux virtuels. Plans IA. Tournage hybride.
              </p>
              <p style={paragraphStyle}>
                L&apos;IA générative n&apos;est pas une révolution. C&apos;est{" "}
                <strong style={strongStyle}>un outil de plus</strong> sur le
                plateau — un outil rapide, exigeant, parfois trompeur.
              </p>
              <p style={quoteStyle}>
                L&apos;IA ne crée pas du sens. Elle amplifie ce qu&apos;on lui
                confie.
              </p>
              <p style={paragraphStyle}>
                Notre métier n&apos;a pas changé.{" "}
                <strong style={strongStyle}>Nous racontons des histoires.</strong>{" "}
                Nous éclairons des décors. Nous cadrons des regards. Nous
                étalonnons des images. La technologie sert. Elle ne décide pas.
              </p>
              <p style={paragraphStyle}>
                Mais l&apos;IA change{" "}
                <strong style={strongStyle}>les règles du temps</strong>. Avant
                de poser un rideau, on peut voir le décor finalisé. Avant de
                tourner une séquence, on peut la prévisualiser. Avant la
                post-prod, on peut tester l&apos;étalonnage. C&apos;est ça, le
                tournage hybride.
              </p>
              <p style={quoteStyle}>Plus vite. Plus juste. Plus humain.</p>
              <p style={paragraphStyle}>
                Nous travaillons pour les productions qui veulent{" "}
                <strong style={strongStyle}>élever le standard</strong>. Pas
                pour celles qui cherchent un raccourci. Notre IA n&apos;est pas
                un gain de productivité — c&apos;est un gain de précision.
              </p>
              <p style={paragraphStyle}>
                Et nous le disons clairement :{" "}
                <strong style={strongStyle}>
                  il y a des choses que l&apos;IA ne fera jamais à votre place.
                </strong>{" "}
                Diriger des comédiens. Sentir une lumière. Trouver le bon
                raccord. Ces choses-là restent à vous. Nous, on s&apos;occupe du
                reste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POSITION */}
      <section
        style={{
          padding: "160px 0",
          background: "var(--abysse)",
          color: "var(--air)",
        }}
      >
        <div className="container-x">
          <div className="section-eyebrow dark">
            <span className="mono">↳ NOTRE POSITION</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              maxWidth: 920,
              marginBottom: 32,
            }}
          >
            CE QUI CHANGE.
            <br />
            CE QU&apos;ON ENGAGE.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "var(--line-dark)",
              marginTop: 64,
              border: "1px solid var(--line-dark)",
            }}
            className="position-grid"
          >
            <div style={posCol}>
              <h3
                className="display"
                style={{
                  fontSize: 32,
                  color: "var(--air)",
                  marginBottom: 32,
                  letterSpacing: "0.02em",
                }}
              >
                Ce que{" "}
                <span style={{ color: "var(--anse)" }}>
                  l&apos;IA change
                </span>{" "}
                vraiment.
              </h3>
              <ol style={posListStyle} start={1}>
                {[
                  "Les décors deviennent visualisables avant tournage. Plus de mauvaises surprises sur site.",
                  "Le découpage technique se construit en heures, plus en jours.",
                  "Les plans IA s'intègrent aux rushes — quand le scénario les justifie.",
                  "L'étalonnage HDR / 32-bit float devient accessible à des projets moyens.",
                  "Chaque corps de métier peut tester avant que l'équipe technique ne soit mobilisée.",
                  "Le standard cinéma monte. Le médiocre devient instantanément visible.",
                ].map((line, i) => (
                  <li key={i} style={posListItemStyle}>
                    <span style={posIndexStyle}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div style={posCol}>
              <h3
                className="display"
                style={{
                  fontSize: 32,
                  color: "var(--air)",
                  marginBottom: 32,
                  letterSpacing: "0.02em",
                }}
              >
                Ce que{" "}
                <span style={{ color: "var(--corail)" }}>nous</span>{" "}
                engageons.
              </h3>
              <ol style={posListStyle} start={1}>
                {[
                  "Pionniers depuis 2014, dès avant la mode. Onze ans de pratique réelle.",
                  "Maîtrise full-pipeline : prépa, tournage hybride, post-prod, formation.",
                  "Direction artistique avant outil. La machine ne propose jamais en premier.",
                  "Vos données restent vôtres. Pas de modèles entraînés sur vos rushes.",
                  "Transparence sur ce que l'IA fait — et sur ce qu'elle ne fait pas.",
                  "Conseil indépendant : on vous dit ce qu'il vaut mieux ne pas automatiser.",
                ].map((line, i) => (
                  <li key={i} style={posListItemStyle}>
                    <span style={posIndexStyle}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section
        style={{
          padding: "160px 0",
          background: "var(--air)",
          color: "var(--fg)",
        }}
      >
        <div className="container-x">
          <div className="section-eyebrow">
            <span className="mono">↳ LIGNES ROUGES</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              maxWidth: 920,
              color: "var(--fg)",
              marginBottom: 32,
            }}
          >
            CE QU&apos;ON NE
            <br />
            FERA PAS.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: "rgba(10,31,44,0.08)",
              border: "1px solid rgba(10,31,44,0.08)",
              marginTop: 64,
            }}
          >
            {engagements.map((e) => (
              <div
                key={e.number}
                style={{ padding: "48px 40px", background: "#fff" }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: 80,
                    color: "var(--anse)",
                    lineHeight: 0.8,
                    marginBottom: 24,
                  }}
                >
                  {e.number}
                </div>
                <h4
                  className="display"
                  style={{
                    fontSize: 24,
                    marginBottom: 16,
                    letterSpacing: "0.02em",
                  }}
                >
                  {e.title}
                </h4>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  {e.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAFinal contactEmail={contactEmail} variant="dark" />

      <Marquee
        items={[
          "Pionniers depuis 2014",
          "L'IA n'écrit pas l'histoire",
          "Le plateau reste roi",
          "Plus juste. Plus humain.",
        ]}
      />

      <style>{`
        @media (max-width: 768px) {
          .manifeste-hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .manifeste-hero-right { justify-self: start !important; }
          .manifeste-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .manifeste-grid h2.display { position: static !important; }
          .position-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const paragraphStyle: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.55,
  marginBottom: 32,
  color: "var(--fg)",
};

const strongStyle: React.CSSProperties = {
  fontFamily: "var(--font-anton), Anton, sans-serif",
  fontWeight: 400,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: "var(--lagon)",
  fontSize: "1.1em",
};

const quoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-anton), Anton, sans-serif",
  fontSize: 36,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  color: "var(--lagon)",
  lineHeight: 1.1,
  margin: "48px 0",
  paddingLeft: 24,
  borderLeft: "3px solid var(--corail)",
};

const posCol: React.CSSProperties = {
  padding: "48px 40px",
  background: "var(--abysse)",
};

const posListStyle: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const posListItemStyle: React.CSSProperties = {
  padding: "20px 0",
  borderTop: "1px solid rgba(94,200,214,0.12)",
  fontSize: 16,
  lineHeight: 1.5,
  display: "flex",
  gap: 16,
};

const posIndexStyle: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), JetBrains Mono, monospace",
  fontSize: 13,
  color: "var(--anse)",
  minWidth: 36,
  paddingTop: 2,
};
