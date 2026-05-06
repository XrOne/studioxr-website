"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/content";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = (): void => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="#main"
          className="flex items-center gap-2 font-serif text-lg tracking-tight"
          aria-label="Accueil Studio XR · Jenial"
        >
          <span className="text-[var(--color-fg)]">Studio XR</span>
          <span className="text-[var(--color-fg-subtle)]">×</span>
          <span className="text-[var(--color-accent)]">Jenial</span>
        </a>

        <nav
          className="hidden md:flex items-center gap-8 text-sm"
          aria-label="Navigation principale"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="btn-primary text-sm">
            Brief
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-[var(--color-fg)]"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
        >
          <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Navigation mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-base text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="btn-primary text-sm self-start mt-2"
            >
              Brief
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
