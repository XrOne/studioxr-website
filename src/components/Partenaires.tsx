import { PARTNERS } from "@/lib/content";

export default function Partenaires() {
  return (
    <section
      className="py-20 border-t border-[var(--color-border)]"
      aria-labelledby="partenaires-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p
          id="partenaires-title"
          className="eyebrow text-center"
        >
          Ils nous ont fait confiance
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PARTNERS.map((partner, index) => (
            <li key={partner} className="flex items-center gap-x-12">
              <span className="font-serif text-xl lg:text-2xl text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors tracking-wide">
                {partner}
              </span>
              {index < PARTNERS.length - 1 && (
                <span
                  className="hidden sm:inline-block text-[var(--color-fg-subtle)]"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
