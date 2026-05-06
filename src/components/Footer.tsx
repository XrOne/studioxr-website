import { CONTACT, NAV_ITEMS } from "@/lib/content";

const HERITAGE_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "#heritage", label: "Timeline 2015-2026" },
  { href: "#realisations", label: "Cas XR historiques" },
  { href: "#process", label: "Notre méthode" },
];

const LEGAL_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/rgpd", label: "RGPD" },
  { href: "/cookies", label: "Cookies" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      aria-labelledby="footer-title"
    >
      <h2 id="footer-title" className="sr-only">
        Pied de page
      </h2>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="font-serif text-lg flex items-center gap-2">
            <span className="text-[var(--color-fg)]">Studio XR</span>
            <span className="text-[var(--color-fg-subtle)]">×</span>
            <span className="text-[var(--color-accent)]">Jenial</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-fg-muted)] leading-relaxed max-w-xs">
            Agence IA audiovisuelle. De la frontière XR à la frontière IA,
            depuis 2015.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-wider uppercase text-[var(--color-fg-subtle)]">
            Offres
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-wider uppercase text-[var(--color-fg-subtle)]">
            Heritage
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {HERITAGE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-wider uppercase text-[var(--color-fg-subtle)]">
            Contact
          </h3>
          <address className="mt-4 not-italic text-sm text-[var(--color-fg-muted)] space-y-2">
            <p>{CONTACT.address}</p>
            <p>{CONTACT.location}</p>
            <p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-soft)] transition-colors"
              >
                {CONTACT.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--color-fg-subtle)]">
          <p>© 2026 Studio XR-ONE · Jenial. Pionnier XR depuis 2015.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-[var(--color-fg-muted)] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
