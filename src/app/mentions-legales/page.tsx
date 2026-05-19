import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Studio Jenial — éditeur, hébergement, contact.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <a href="#content" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      <main
        id="content"
        tabIndex={-1}
        style={{ background: "var(--air)" }}
      >
        <section style={{ padding: "120px 0 96px" }}>
          <div className="container-x" style={{ maxWidth: 760 }}>
            <span className="mono" style={{ color: "var(--lagon-text)" }}>
              <span aria-hidden="true">↳ </span>MENTIONS LÉGALES
            </span>
            <h1
              className="display"
              style={{
                fontSize: "clamp(48px, 7vw, 88px)",
                lineHeight: 0.95,
                margin: "16px 0 48px",
                color: "var(--fg)",
              }}
            >
              MENTIONS
              <br />
              LÉGALES.
            </h1>

            <div style={proseStyle}>
              <h2 style={h2Style}>Éditeur du site</h2>
              <p>
                XR-ONE, société par actions simplifiée (SAS) au capital de
                30&nbsp;500&nbsp;€, exploitant la marque{" "}
                <strong>Studio Jenial</strong>.
                <br />
                Siège social : 11 rue de Lourmel, 75015 Paris, France.
                <br />
                RCS Paris 881&nbsp;808&nbsp;828. SIRET (siège) :
                881&nbsp;808&nbsp;828&nbsp;00019.
                <br />
                N°&nbsp;TVA intracommunautaire : FR10881808828.
                <br />
                Directeur de la publication : Charles-Henri Marraud Des
                Grottes.
              </p>

              <h2 style={h2Style}>Contact</h2>
              <p>
                Email :{" "}
                <a href="mailto:contact@jenial.fr" style={linkStyle}>
                  contact@jenial.fr
                </a>
              </p>

              <h2 style={h2Style}>Hébergement</h2>
              <p>
                Vercel Inc.
                <br />
                340 S Lemon Ave #4133
                <br />
                Walnut, CA 91789, États-Unis
                <br />
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  vercel.com
                </a>
              </p>

              <h2 style={h2Style}>Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes,
                images, vidéos, code, marques) est la propriété exclusive
                de Studio Jenial, sauf mention contraire. Toute
                reproduction, représentation ou diffusion sans autorisation
                préalable écrite est interdite.
              </p>

              <h2 style={h2Style}>Données personnelles</h2>
              <p>
                Le traitement des données personnelles collectées via ce
                site est détaillé dans la{" "}
                <Link href="/confidentialite" style={linkStyle}>
                  politique de confidentialité
                </Link>
                .
              </p>

              <p style={updatedStyle}>Dernière mise à jour : mai 2026.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const proseStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.65,
  color: "var(--fg)",
};

const h2Style: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: "0.02em",
  margin: "40px 0 12px",
  color: "var(--fg)",
};

const linkStyle: React.CSSProperties = {
  color: "var(--lagon-text)",
  textDecoration: "underline",
};

const updatedStyle: React.CSSProperties = {
  marginTop: 48,
  fontSize: 13,
  color: "var(--muted)",
  fontStyle: "italic",
};
