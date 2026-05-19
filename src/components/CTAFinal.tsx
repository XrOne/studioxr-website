interface CTAFinalProps {
  contactEmail?: string;
  variant?: "light" | "dark";
}

export default function CTAFinal({
  contactEmail = "contact@jenial.fr",
  variant = "light",
}: CTAFinalProps) {
  const dark = variant === "dark";
  return (
    <section
      id="cta-final"
      style={{
        padding: "200px 0",
        textAlign: "center",
        background: dark
          ? "var(--abysse)"
          : "linear-gradient(180deg, #fff, var(--air))",
        color: dark ? "var(--air)" : "var(--fg)",
      }}
    >
      <div className="container-x">
        <span
          className="mono"
          style={{
            color: dark ? "var(--anse)" : "var(--lagon)",
            display: "inline-block",
            marginBottom: 24,
          }}
        >
          ↳ ON COMMENCE QUAND ?
        </span>
        <h2
          className="display"
          style={{
            fontSize: "clamp(56px, 10vw, 160px)",
            marginBottom: 32,
            lineHeight: 0.9,
            color: dark ? "var(--air)" : "var(--fg)",
          }}
        >
          UN PROJET ?
          <br />
          UN{" "}
          <em
            style={{ fontStyle: "normal", color: "var(--corail)" }}
          >
            BRIEF.
          </em>
        </h2>
        <p
          style={{
            color: dark ? "rgba(248,251,252,0.65)" : "var(--muted)",
            fontSize: 19,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          30 minutes pour cadrer ensemble. Sans engagement. On vous dit ce
          qu&apos;on peut faire — et ce qu&apos;on refuse.
        </p>
        <a
          href={`mailto:${contactEmail}?subject=Brief%20Jenial`}
          className="cta-btn cta-btn-lg"
        >
          Discuter avec l&apos;équipe
        </a>
      </div>
    </section>
  );
}
