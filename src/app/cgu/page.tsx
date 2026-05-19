import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CGU",
  description:
    "Conditions générales d'utilisation du site Studio Jenial.",
};

export default function CGUPage() {
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
              <span aria-hidden="true">↳ </span>CGU
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
              CONDITIONS
              <br />
              GÉNÉRALES.
            </h1>

            <div style={proseStyle}>
              <p>
                Les présentes conditions régissent l&apos;utilisation du
                site jenial.fr édité par XR-ONE SAS, exploitant la marque
                Studio Jenial. En accédant au site, vous acceptez ces
                conditions sans réserve.
              </p>

              <h2 style={h2Style}>1. Objet</h2>
              <p>
                Le site présente l&apos;activité de Studio Jenial, ses
                références et permet d&apos;entrer en contact. Il ne
                constitue pas une offre commerciale contractuelle :
                chaque mission fait l&apos;objet d&apos;un contrat
                spécifique.
              </p>

              <h2 style={h2Style}>2. Accès au site</h2>
              <p>
                Le site est accessible 24h/24, sous réserve
                d&apos;interruptions liées à la maintenance, aux mises à
                jour ou à des contraintes techniques indépendantes de
                l&apos;éditeur.
              </p>

              <h2 style={h2Style}>3. Propriété intellectuelle</h2>
              <p>
                Les contenus (textes, images, vidéos, code, marques) sont
                la propriété exclusive de l&apos;éditeur, sauf mention
                contraire. Toute reproduction ou réutilisation sans
                autorisation écrite préalable est interdite.
              </p>

              <h2 style={h2Style}>4. Responsabilité</h2>
              <p>
                Les informations diffusées sont fournies à titre
                indicatif. L&apos;éditeur s&apos;efforce de garantir leur
                exactitude mais ne saurait être tenu responsable
                d&apos;omissions, d&apos;inexactitudes ou de conséquences
                résultant de leur utilisation.
              </p>

              <h2 style={h2Style}>5. Liens externes</h2>
              <p>
                Le site peut contenir des liens vers des ressources
                externes. L&apos;éditeur n&apos;exerce aucun contrôle sur
                ces sites tiers et décline toute responsabilité quant à
                leur contenu.
              </p>

              <h2 style={h2Style}>6. Données personnelles</h2>
              <p>
                Le traitement des données est précisé dans la{" "}
                <Link href="/confidentialite" style={linkStyle}>
                  politique de confidentialité
                </Link>
                .
              </p>

              <h2 style={h2Style}>7. Droit applicable</h2>
              <p>
                Les présentes conditions sont régies par le droit
                français. Tout litige relatif à leur application relève
                de la compétence des tribunaux français.
              </p>

              <h2 style={h2Style}>8. Contact</h2>
              <p>
                Pour toute question relative aux présentes conditions :{" "}
                <a href="mailto:contact@jenial.fr" style={linkStyle}>
                  contact@jenial.fr
                </a>
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
