/**
 * Bloc "manifeste de la différence" — interlude entre Pillars et CaseStudies.
 * Positionne XR-ONE comme studio + editor (rare dans l'audiovisuel).
 * Volontairement minimaliste : une punchline en grosse typo Anton, fond Abysse.
 */
export default function ManifesteDifference() {
  return (
    <section
      aria-label="Notre différence"
      style={{
        padding: "112px 0",
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
            "radial-gradient(700px circle at 30% 50%, rgba(14,124,155,0.32), transparent 60%), radial-gradient(500px circle at 75% 50%, rgba(255,138,101,0.14), transparent 60%)",
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
          ↳ NOTRE DIFFÉRENCE
        </span>
        <h2
          className="display"
          style={{
            fontSize: "clamp(40px, 7.5vw, 116px)",
            color: "var(--air)",
            lineHeight: 0.96,
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          ON NE SE CONTENTE PAS DE LIVRER.
          <br />
          <span style={{ color: "var(--corail)" }}>
            ON CONÇOIT LES OUTILS QUI LIVRENT.
          </span>
        </h2>
        <p
          style={{
            fontSize: 17.5,
            color: "rgba(248,251,252,0.72)",
            maxWidth: 720,
            margin: "32px auto 0",
            lineHeight: 1.55,
          }}
        >
          Studio de prestation et éditeur d&apos;outils IA. Les deux à la
          fois. C&apos;est cette double casquette qui fait que vos
          productions ne dépendent pas du roadmap d&apos;un éditeur tiers.
        </p>
      </div>
    </section>
  );
}
