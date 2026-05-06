interface MarqueeProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  "Pionniers depuis 2014",
  "Du brief au pixel",
  "Tournage hybride",
  "IA au service du plateau",
];

export default function Marquee({ items = DEFAULT_ITEMS }: MarqueeProps) {
  // On duplique pour boucle infinie sans saut
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        background: "var(--abysse)",
        color: "var(--air)",
        padding: "24px 0",
        overflow: "hidden",
        borderBlock: "1px solid var(--abysse)",
      }}
    >
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
