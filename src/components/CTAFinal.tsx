import { CONTACT } from "@/lib/content";

export default function CTAFinal() {
  return (
    <section
      id="contact"
      className="relative py-28 lg:py-40 border-t border-[var(--color-border)] mesh-gradient grain overflow-hidden"
      aria-labelledby="cta-title"
    >
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <p className="eyebrow">Contact</p>
        <h2
          id="cta-title"
          className="font-serif mt-4 text-4xl sm:text-5xl lg:text-6xl tracking-tight"
        >
          Un projet ? Une idée ?<br />
          <span className="text-[var(--color-accent)]">Un brief à challenger ?</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-[var(--color-fg-muted)]">
          On répond en 48 h ouvrées. Premier échange offert pour cadrer
          ensemble la faisabilité, le ton et le budget.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${CONTACT.email}?subject=Brief%20Jenial`}
            className="btn-primary"
          >
            Démarrer la conversation
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
          >
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
