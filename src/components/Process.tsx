import { PROCESS_STEPS } from "@/lib/content";

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 lg:py-32 border-t border-[var(--color-border)] bg-[var(--color-bg-elev)]"
      aria-labelledby="process-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">Process</p>
        <h2
          id="process-title"
          className="font-serif mt-4 text-4xl lg:text-5xl tracking-tight max-w-3xl"
        >
          Six étapes claires, zéro flou artistique.
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-fg-muted)]">
          On a transposé une décennie de production XR dans un workflow IA
          maîtrisé. Chaque étape a un livrable, chaque livrable a un délai.
        </p>

        <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {PROCESS_STEPS.map((step) => (
            <li key={step.step} className="relative">
              <span
                className="font-serif text-7xl lg:text-8xl text-[var(--color-accent)] leading-none block"
                aria-hidden="true"
              >
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl mt-4 text-[var(--color-fg)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)] leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
