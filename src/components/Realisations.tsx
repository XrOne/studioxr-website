import { REALISATIONS } from "@/lib/content";

export default function Realisations() {
  return (
    <section
      id="realisations"
      className="py-24 lg:py-32 border-t border-[var(--color-border)]"
      aria-labelledby="realisations-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow">Réalisations</p>
            <h2
              id="realisations-title"
              className="font-serif mt-4 text-4xl lg:text-5xl tracking-tight max-w-3xl"
            >
              Du clip immersif au pipeline AR : des cas réels.
            </h2>
          </div>
          <a
            href="#contact"
            className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Voir tous les cas →
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REALISATIONS.map((realisation) => (
            <article key={realisation.id} className="card overflow-hidden group">
              <div
                className={`relative aspect-[4/5] bg-gradient-to-br ${realisation.cover} grain`}
                aria-hidden="true"
              >
                <span className="absolute top-4 left-4 text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-[var(--color-bg)]/70 backdrop-blur-sm text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                  {realisation.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs text-[var(--color-fg-subtle)] uppercase tracking-wider">
                  {realisation.client}
                </p>
                <h3 className="font-serif text-2xl mt-1 text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                  {realisation.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {realisation.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
