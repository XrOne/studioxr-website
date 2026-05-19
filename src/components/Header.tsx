"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Studio", href: "/#pionniers" },
  { label: "Capacités", href: "/#capacities" },
  { label: "Études", href: "/#cases" },
  { label: "Logiciels", href: "/#logiciels" },
  { label: "Manifeste", href: "/manifeste" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "rgba(248,251,252,0.85)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-x">
        <nav
          aria-label="Principale"
          className="flex items-center justify-between h-[72px]"
        >
          <Link
            href="/"
            aria-label="Jenial — accueil"
            className="display"
            style={{ fontSize: 24, letterSpacing: "0.04em" }}
          >
            JEN<span style={{ color: "var(--corail)" }}>IA</span>L
          </Link>

          <div
            className="hidden md:flex"
            style={{
              gap: 24,
              fontSize: 14,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  color: "var(--muted)",
                  transition: "color .2s",
                  padding: "14px 4px",
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--fg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="#cta-final"
              className="cta-btn"
              aria-label="Démarrer un brief de projet"
            >
              Brief
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 12,
              minWidth: 44,
              minHeight: 44,
              color: "var(--fg)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            className="md:hidden"
            style={{
              padding: "16px 0 24px",
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  color: "var(--fg)",
                  fontSize: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 500,
                  padding: "14px 0",
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#cta-final"
              className="cta-btn"
              aria-label="Démarrer un brief de projet"
              onClick={() => setOpen(false)}
              style={{ alignSelf: "flex-start", marginTop: 12 }}
            >
              Brief
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
