import { TIMELINE } from "@/lib/content";

export default function Heritage() {
  return (
    <section
      id="heritage"
      className="relative py-24 lg:py-32 border-t border-[var(--color-border)]"
      aria-labelledby="heritage-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">Heritage</p>
        <h2
          id="heritage-title"
          className="font-serif mt-4 text-4xl lg:text-5xl tracking-tight max-w-3xl"
        >
          10 ans à pousser les limites du média immersif.
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-fg-muted)]">
          De la première salle VR pour MIDEM en 2017 au lancement de Jenial en
          2026, on a accumulé une obsession : la frontière du média.
        </p>
      </div>

      <div className="mt-14 relative">
        <div className="overflow-x-auto no-scrollbar">
          <ol className="relative flex gap-6 px-6 lg:px-10 min-w-max pb-4">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-deep)]/40 to-transparent"
            />
            {TIMELINE.map((event) => (
              <li
                key={event.year}
                className="relative w-64 shrink-0 pt-14"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-5 w-4 h-4 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]"
                />
                <div className="font-serif text-3xl text-[var(--color-accent)]">
                  {event.year}
                </div>
                <h3 className="mt-2 text-base font-medium text-[var(--color-fg)]">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
