export default function Hero() {
  return (
    <section
      className="relative overflow-hidden mesh-gradient grain"
      aria-labelledby="hero-title"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-32 lg:pt-32 lg:pb-44">
        <p className="eyebrow animate-fade-up">
          Studio XR-ONE · Depuis 2015
        </p>

        <h1
          id="hero-title"
          className="font-serif mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight max-w-5xl animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          De la frontière XR à la frontière{" "}
          <span className="text-[var(--color-accent)]">IA</span>.
        </h1>

        <p
          className="mt-8 max-w-2xl text-lg lg:text-xl text-[var(--color-fg-muted)] leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Pionnier français de la réalité virtuelle et augmentée, nous pivotons
          vers l'IA générative audiovisuelle.
          <br />
          Films IA, prévisualisation, moodboards et conseil workflow — pour les
          marques, les studios et les créateurs qui ne veulent pas rater la
          marche.
        </p>

        <div
          className="mt-10 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a href="#realisations" className="btn-primary">
            Voir nos films IA
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost">
            Démarrer un projet
          </a>
        </div>

        <div
          className="mt-16 flex items-center gap-3 text-xs text-[var(--color-fg-subtle)] animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse-soft" />
          <span>Studio actif · Paris 13e · ENSAM Incubateur</span>
        </div>
      </div>
    </section>
  );
}
