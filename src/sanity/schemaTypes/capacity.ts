import { defineType, defineField } from "sanity";

export const capacity = defineType({
  name: "capacity",
  title: "Capacité IA",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phase",
      title: "Phase",
      type: "string",
      options: {
        list: [
          { title: "Prépa prod", value: "prepa-prod" },
          { title: "Tournage hybride", value: "tournage-hybride" },
          { title: "Post prod", value: "post-prod" },
          { title: "Transverse", value: "transverse" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Vedette",
      description:
        "Coche cette case pour afficher cette capacité au chargement de la section. Une seule capacité devrait être vedette à la fois ; si plusieurs le sont, le front prend la première selon l'ordre.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "hidden",
      title: "Masquée",
      description:
        "Si cochée, la capacité reste publiée mais est exclue du front. Permet une dépublication soft sans suppression.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "shortDescription",
      title: "Description courte",
      description:
        "Sous-titre affiché sous le titre dynamique du comparateur. 180 caractères max ; viser 130.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "mode",
      title: "Mode d'affichage",
      description:
        "Comment afficher cette capacité dans le slot du haut. Comparator = curseur avant/après (cas standard). Les autres modes (split, video, screenshot, sequence) sont réservés à une mission ultérieure.",
      type: "string",
      options: {
        list: [
          { title: "Comparateur avant/après", value: "comparator" },
          { title: "Split (2 colonnes statiques)", value: "split" },
          { title: "Vidéo (loop muet)", value: "video" },
          { title: "Screenshot annoté", value: "screenshot" },
          { title: "Séquence (4 vignettes)", value: "sequence" },
        ],
        layout: "dropdown",
      },
      initialValue: "comparator",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beforeImage",
      title: "Image AVANT",
      description:
        "État brut / source. Affichée à gauche du curseur. Format 16:9 recommandé, min 1920×1080, idéal 2400×1350. Hotspot recommandé.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "afterImage",
      title: "Image APRÈS",
      description:
        "Résultat IA / final. Affichée à droite du curseur. Mêmes spécifications que l'image avant.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "beforeLabel",
      title: "Label AVANT",
      description:
        "2-3 mots en CAPITALES, ex : DÉCOR BRUT. Affiché en cartouche dans l'image gauche.",
      type: "string",
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: "afterLabel",
      title: "Label APRÈS",
      description:
        "2-3 mots en CAPITALES, ex : PROJECTION IA. Affiché en cartouche dans l'image droite.",
      type: "string",
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: "caption",
      title: "Légende",
      description:
        "Ligne mono sous le slot. Ex : ↳ glissez · Declics S2 (Inevitable, ARTE). Sert de crédit ou de contexte.",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "icon",
      title: "Icône / image",
      description: "Vignette utilisée dans la grille (télécommande).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "longDescription",
      title: "Description longue",
      description: "Réservée pour une éventuelle page dédiée /capacites/[slug].",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      phase: "phase",
      order: "order",
      featured: "featured",
      hidden: "hidden",
      media: "afterImage",
    },
    prepare: ({ title, phase, order, featured, hidden, media }) => {
      const orderLabel = typeof order === "number" ? String(order).padStart(2, "0") : "—";
      const flags = `${featured ? " ★" : ""}${hidden ? " ◌" : ""}`;
      return {
        title: `${orderLabel} · ${title ?? "Sans titre"}${flags}`,
        subtitle: phase ? phase.replace("-", " ") : undefined,
        media,
      };
    },
  },
});
