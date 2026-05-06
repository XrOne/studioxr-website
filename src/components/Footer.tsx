import Link from "next/link";
import Marquee from "./Marquee";

interface FooterProps {
  contactEmail?: string;
  linkedinUrl?: string;
  calendlyUrl?: string;
}

export default function Footer({
  contactEmail = "contact@studioxr.one",
  linkedinUrl = "#",
  calendlyUrl = "#",
}: FooterProps) {
  return (
    <footer
      style={{
        background: "var(--abysse)",
        color: "rgba(248,251,252,0.65)",
        paddingTop: 64,
      }}
    >
      <div className="container-x">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          <div>
            <div
              className="display"
              style={{
                fontSize: 32,
                color: "var(--air)",
                letterSpacing: "0.04em",
              }}
            >
              XR<span style={{ color: "var(--anse)" }}>·</span>ONE
            </div>
            <p style={{ marginTop: 16, fontSize: 14, maxWidth: 320 }}>
              Pionnier français du tournage hybride et de la production
              augmentée par IA. Né à CréaCannes, 2014.
            </p>
          </div>
          <div>
            <h5
              className="display"
              style={{
                fontSize: 14,
                color: "var(--air)",
                marginBottom: 20,
                letterSpacing: "0.1em",
              }}
            >
              Studio
            </h5>
            <Link
              href="/manifeste"
              className="footer-link"
              style={footerLinkStyle}
            >
              Manifeste
            </Link>
            <Link href="#" className="footer-link" style={footerLinkStyle}>
              Équipe
            </Link>
            <Link href="#" className="footer-link" style={footerLinkStyle}>
              Heritage XR
            </Link>
            <Link href="#" className="footer-link" style={footerLinkStyle}>
              Journal
            </Link>
          </div>
          <div>
            <h5
              className="display"
              style={{
                fontSize: 14,
                color: "var(--air)",
                marginBottom: 20,
                letterSpacing: "0.1em",
              }}
            >
              Produits
            </h5>
            <a
              href="https://jenial.app"
              target="_blank"
              rel="noopener noreferrer"
              style={footerLinkStyle}
            >
              Jenial
            </a>
            <a
              href="https://jenial.app/cinemia"
              target="_blank"
              rel="noopener noreferrer"
              style={footerLinkStyle}
            >
              Cinemia
            </a>
            <Link
              href="/#pionniers"
              style={footerLinkStyle}
            >
              Pionniers (R&amp;D XR)
            </Link>
          </div>
          <div>
            <h5
              className="display"
              style={{
                fontSize: 14,
                color: "var(--air)",
                marginBottom: 20,
                letterSpacing: "0.1em",
              }}
            >
              Contact
            </h5>
            <a href={`mailto:${contactEmail}`} style={footerLinkStyle}>
              {contactEmail}
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={footerLinkStyle}
            >
              LinkedIn
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={footerLinkStyle}
            >
              Calendly
            </a>
          </div>
        </div>

        <div
          style={{
            padding: "24px 0",
            borderTop: "1px solid var(--line-dark)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 12,
          }}
        >
          <span
            className="display"
            style={{
              fontSize: 14,
              color: "var(--air)",
              letterSpacing: "0.06em",
            }}
          >
            © 2026 · STUDIO XR-ONE · DEPUIS 2014
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={footerSmallStyle}>Mentions</a>
            <a href="#" style={footerSmallStyle}>RGPD</a>
            <a href="#" style={footerSmallStyle}>CGU</a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <Marquee
          items={[
            "Pionniers depuis 2014",
            "L'IA n'écrit pas l'histoire",
            "Le plateau reste roi",
            "Plus juste. Plus humain.",
          ]}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}

const footerLinkStyle: React.CSSProperties = {
  display: "block",
  color: "rgba(248,251,252,0.6)",
  fontSize: 14,
  padding: "6px 0",
  transition: "color .2s",
};

const footerSmallStyle: React.CSSProperties = {
  color: "rgba(248,251,252,0.6)",
};
