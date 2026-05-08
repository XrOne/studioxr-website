import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Capacities from "../Capacities";
import type { CapacityFallback } from "@/lib/content-fallback";

const fixtures: CapacityFallback[] = [
  {
    _id: "test-1",
    title: "Décors avant / après",
    slug: "decors-avant-apres",
    phase: "prepa-prod",
    order: 1,
    shortDescription: "Lieu repéré → projection IA finale.",
    featured: true,
    mode: "comparator",
    beforeLabel: "DÉCOR BRUT",
    afterLabel: "PROJECTION IA",
    caption: "↳ glissez · placeholder · Decors test",
  },
  {
    _id: "test-2",
    title: "Lumière & météo",
    slug: "lumiere-meteo",
    phase: "tournage-hybride",
    order: 2,
    shortDescription:
      "Changer l'heure, l'ambiance ou la lumière d'une séquence.",
    mode: "comparator",
    beforeLabel: "PLAN SOURCE",
    afterLabel: "AMBIANCE RELIGHT",
    caption: "↳ glissez · relight test",
  },
  {
    _id: "test-3",
    title: "Capacité masquée",
    slug: "masquee",
    phase: "post-prod",
    order: 3,
    shortDescription: "Ne doit pas apparaître.",
    hidden: true,
    mode: "comparator",
    beforeLabel: "AVANT",
    afterLabel: "APRÈS",
  },
  {
    _id: "test-4",
    title: "Cohérence personnages",
    slug: "coherence-personnages",
    phase: "transverse",
    order: 4,
    shortDescription: "Même visage, mêmes vêtements sur plusieurs plans.",
    mode: "comparator",
    beforeLabel: "RÉFÉRENCES PERSO",
    afterLabel: "SÉQUENCE COHÉRENTE",
    caption: "↳ glissez · cohérence personnages test",
  },
];

function getTablist() {
  return screen.getByRole("tablist", { name: /capacités ia/i });
}

function getActiveHeadingText() {
  return screen.getByRole("heading", { level: 3 }).textContent ?? "";
}

describe("Capacities — section interactive", () => {
  it("rend la section avec un tablist contenant les capacités visibles", () => {
    render(<Capacities capacities={fixtures} />);

    const tablist = getTablist();
    const tabs = within(tablist).getAllByRole("tab");

    expect(tabs).toHaveLength(3);
    expect(within(tablist).getByText("Décors avant / après")).toBeInTheDocument();
    expect(within(tablist).getByText("Lumière & météo")).toBeInTheDocument();
    expect(within(tablist).getByText("Cohérence personnages")).toBeInTheDocument();
  });

  it("active la capacité featured au chargement et affiche son contenu", () => {
    render(<Capacities capacities={fixtures} />);

    const tablist = getTablist();
    const featuredTab = within(tablist).getByRole("tab", {
      name: /décors avant \/ après/i,
    });
    expect(featuredTab).toHaveAttribute("aria-selected", "true");

    expect(getActiveHeadingText()).toMatch(/DÉCORS AVANT \/ APRÈS/i);
    expect(screen.getByText("DÉCOR BRUT")).toBeInTheDocument();
    expect(screen.getByText("PROJECTION IA")).toBeInTheDocument();
    expect(screen.getByText(/placeholder · Decors test/)).toBeInTheDocument();
  });

  it("ne rend pas les capacités hidden dans la grille", () => {
    render(<Capacities capacities={fixtures} />);

    expect(screen.queryByText("Capacité masquée")).not.toBeInTheDocument();
    const tablist = getTablist();
    expect(within(tablist).getAllByRole("tab")).toHaveLength(3);
  });

  it("change le contenu du comparateur au clic sur une autre capacité", async () => {
    const user = userEvent.setup();
    render(<Capacities capacities={fixtures} />);

    const tablist = getTablist();
    const targetTab = within(tablist).getByRole("tab", {
      name: /lumière & météo/i,
    });

    await user.click(targetTab);

    expect(targetTab).toHaveAttribute("aria-selected", "true");
    expect(getActiveHeadingText()).toMatch(/LUMIÈRE & MÉTÉO/i);
    expect(screen.getByText("PLAN SOURCE")).toBeInTheDocument();
    expect(screen.getByText("AMBIANCE RELIGHT")).toBeInTheDocument();
    expect(screen.getByText(/relight test/)).toBeInTheDocument();
  });

  it("active une capacité via Enter sur le clavier", async () => {
    const user = userEvent.setup();
    render(<Capacities capacities={fixtures} />);

    const tablist = getTablist();
    const targetTab = within(tablist).getByRole("tab", {
      name: /cohérence personnages/i,
    });

    targetTab.focus();
    expect(targetTab).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(targetTab).toHaveAttribute("aria-selected", "true");
    expect(getActiveHeadingText()).toMatch(/COHÉRENCE PERSONNAGES/i);
    expect(screen.getByText("RÉFÉRENCES PERSO")).toBeInTheDocument();
    expect(screen.getByText("SÉQUENCE COHÉRENTE")).toBeInTheDocument();
  });

  it("déplace le focus avec ArrowRight et Home", async () => {
    const user = userEvent.setup();
    render(<Capacities capacities={fixtures} />);

    const tablist = getTablist();
    const tabs = within(tablist).getAllByRole("tab");
    const [first, second] = tabs;

    first.focus();
    expect(first).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(second).toHaveFocus();
    expect(first).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    expect(first).toHaveFocus();
  });

  it("rend sans crash quand beforeImage et afterImage sont absents", () => {
    const noImages: CapacityFallback[] = fixtures
      .filter((c) => !c.hidden)
      .map((c) => ({ ...c, beforeImage: undefined, afterImage: undefined }));

    expect(() => render(<Capacities capacities={noImages} />)).not.toThrow();

    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
  });
});
