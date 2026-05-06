import type { ServiceId } from "@/lib/content";
import { SERVICES } from "@/lib/content";

interface IconProps {
  className?: string;
}

function ServiceIcon({ id, className = "w-6 h-6" }: { id: ServiceId } & IconProps) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (id) {
    case "films-ia":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M10 9l5 3-5 3V9z" />
        </svg>
      );
    case "previsualisation":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="1.5" />
          <path d="M3 9h18M7 13h4M7 17v3M17 17v3" />
        </svg>
      );
    case "moodboards":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="5" rx="1" />
          <rect x="13" y="10" width="8" height="11" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
        </svg>
      );
    case "conseil-workflow":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8 7l3 9M16 7l-3 9" />
        </svg>
      );
    case "logiciel-jenial":
      return (
        <svg {...common}>
          <path d="M4 7l8-4 8 4-8 4-8-4z" />
          <path d="M4 12l8 4 8-4M4 17l8 4 8-4" />
        </svg>
      );
  }
}

export default function Offres() {
  return (
    <section
      id="offres"
      className="py-24 lg:py-32 border-t border-[var(--color-border)]"
      aria-labelledby="offres-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">Offres</p>
        <h2
          id="offres-title"
          className="font-serif mt-4 text-4xl lg:text-5xl tracking-tight max-w-3xl"
        >
          Cinq leviers pour déployer l'IA dans votre audiovisuel.
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="card p-7 flex flex-col"
            >
              <div className="flex items-start justify-between">
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  aria-hidden="true"
                >
                  <ServiceIcon id={service.id} />
                </span>
                {service.badge && (
                  <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                    {service.badge}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl mt-6 text-[var(--color-fg)]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-fg-muted)] leading-relaxed flex-1">
                {service.description}
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:gap-2 transition-all"
              >
                En savoir plus
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
