import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Politique de confidentialité Studio Jenial — données collectées, finalités, droits RGPD, hébergement.",
};

export default function ConfidentialitePage() {
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
              <span aria-hidden="true">↳ </span>CONFIDENTIALITÉ · RGPD
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
              POLITIQUE DE
              <br />
              CONFIDENTIALITÉ.
            </h1>

            <div style={proseStyle}>
              <p>
                XR-ONE SAS, exploitant la marque Studio Jenial, traite vos
                données personnelles dans le respect du Règlement général
                sur la protection des données (RGPD) et de la loi
                Informatique et Libertés.
              </p>

              <h2 style={h2Style}>Responsable du traitement</h2>
              <p>
                XR-ONE SAS — RCS Paris 881&nbsp;808&nbsp;828 — joignable à
                l&apos;adresse{" "}
                <a href="mailto:contact@jenial.fr" style={linkStyle}>
                  contact@jenial.fr
                </a>
                . Pour les coordonnées complètes, voir les{" "}
                <Link href="/mentions-legales" style={linkStyle}>
                  mentions légales
                </Link>
                .
              </p>

              <h2 style={h2Style}>Données collectées</h2>
              <p>
                Nous collectons uniquement les données strictement
                nécessaires :
              </p>
              <ul style={ulStyle}>
                <li>
                  données fournies via le formulaire de contact ou un
                  email entrant (adresse, contenu du message, pièces
                  jointes éventuelles) ;
                </li>
                <li>
                  données techniques de connexion (logs serveur, adresse
                  IP, user-agent) à des fins de sécurité et de
                  performance.
                </li>
              </ul>

              <h2 style={h2Style}>Finalités</h2>
              <ul style={ulStyle}>
                <li>répondre à vos demandes et propositions de projet ;</li>
                <li>assurer la sécurité technique du site ;</li>
                <li>établir des statistiques de fréquentation agrégées.</li>
              </ul>

              <h2 style={h2Style}>Bases légales</h2>
              <p>
                Intérêt légitime du responsable du traitement pour le
                traitement des demandes entrantes et la sécurité du site.
                Consentement pour tout traitement complémentaire qui le
                requerrait.
              </p>

              <h2 style={h2Style}>Durée de conservation</h2>
              <p>
                Les échanges liés à un projet sont conservés pendant la
                durée de la relation puis archivés au maximum 3 ans après
                le dernier contact. Les logs techniques sont conservés au
                maximum 12 mois.
              </p>

              <h2 style={h2Style}>Destinataires</h2>
              <p>
                Les données sont traitées par l&apos;équipe interne. Elles
                ne sont ni vendues, ni cédées à des tiers à des fins
                commerciales. Les sous-traitants techniques (hébergement,
                outils internes) accèdent aux données uniquement dans le
                cadre de leur prestation.
              </p>

              <h2 style={h2Style}>Hébergement et transferts hors UE</h2>
              <p>
                Le site est hébergé par Vercel Inc. (États-Unis). Les
                transferts éventuels vers les États-Unis sont encadrés par
                les clauses contractuelles types de la Commission
                européenne.
              </p>

              <h2 style={h2Style}>Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit
                d&apos;accès, de rectification, d&apos;effacement,
                d&apos;opposition, de limitation et de portabilité de vos
                données. Pour les exercer, écrivez à{" "}
                <a href="mailto:contact@jenial.fr" style={linkStyle}>
                  contact@jenial.fr
                </a>
                .
              </p>

              <h2 style={h2Style}>Réclamation</h2>
              <p>
                Vous pouvez introduire une réclamation auprès de la
                Commission nationale de l&apos;informatique et des
                libertés (CNIL) :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  cnil.fr
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

const ulStyle: React.CSSProperties = {
  paddingLeft: 20,
  margin: "0 0 16px",
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
