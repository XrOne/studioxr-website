import { defineType, defineField } from "sanity";

const VIDEO_MODES: Array<string> = ["video-proof", "character-sequence"];

function isComparator(parent: { mode?: string } | undefined): boolean {
  return !parent?.mode || parent.mode === "comparator";
}

function isVideoMode(parent: { mode?: string } | undefined): boolean {
  return parent?.mode ? VIDEO_MODES.includes(parent.mode) : false;
}

function isCharacterSequence(parent: { mode?: string } | undefined): boolean {
  return parent?.mode === "character-sequence";
}

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
          { title: "Production hybride", value: "tournage-hybride" },
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
        "Comportement du slot du haut. Comparator = curseur avant/après (cas standard). Video-proof = preuve vidéo loop. Character-sequence = preuve cohérence personnages avec références + séquence vidéo.",
      type: "string",
      options: {
        list: [
          { title: "Comparateur avant/après", value: "comparator" },
          { title: "Preuve vidéo (loop court)", value: "video-proof" },
          { title: "Cohérence personnages (refs + séquence)", value: "character-sequence" },
        ],
        layout: "dropdown",
      },
      initialValue: "comparator",
      validation: (Rule) => Rule.required(),
    }),

    // === Champs MODE COMPARATOR uniquement ===
    defineField({
      name: "beforeImage",
      title: "Image AVANT",
      description:
        "État brut / source. Affichée à gauche du curseur. Format 16:9 recommandé, min 1920×1080, idéal 2400×1350. Hotspot recommandé.",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => !isComparator(parent),
    }),
    defineField({
      name: "afterImage",
      title: "Image APRÈS",
      description:
        "Résultat IA / final. Affichée à droite du curseur. Mêmes spécifications que l'image avant.",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => !isComparator(parent),
    }),
    defineField({
      name: "beforeLabel",
      title: "Label AVANT",
      description:
        "2-3 mots en CAPITALES, ex : DÉCOR BRUT. Affiché en cartouche dans l'image gauche.",
      type: "string",
      validation: (Rule) => Rule.max(24),
      hidden: ({ parent }) => !isComparator(parent),
    }),
    defineField({
      name: "afterLabel",
      title: "Label APRÈS",
      description:
        "2-3 mots en CAPITALES, ex : PROJECTION IA. Affiché en cartouche dans l'image droite.",
      type: "string",
      validation: (Rule) => Rule.max(24),
      hidden: ({ parent }) => !isComparator(parent),
    }),

    // === Caption commune à tous les modes ===
    defineField({
      name: "caption",
      title: "Légende",
      description:
        "Ligne mono sous le slot. Ex : ↳ glissez · Declics S2 (Inevitable, ARTE). Sert de crédit ou de contexte.",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),

    // === Sous-objet VIDEO (modes video-proof + character-sequence) ===
    defineField({
      name: "video",
      title: "Vidéo (preuve)",
      description:
        "Loop muet court (idéal 4-8 s). Le front futur appliquera muted, loop, playsInline et autoplay au switch. Privilégier MP4 H.264 < 8 Mo et/ou WebM < 5 Mo. Pour les fichiers > 5 Mo, utiliser Vimeo unlisted via externalUrl plutôt que d'uploader dans Sanity.",
      type: "object",
      hidden: ({ parent }) => !isVideoMode(parent),
      fields: [
        defineField({
          name: "posterImage",
          title: "Poster (1ʳᵉ frame)",
          description:
            "Image affichée avant le démarrage. Format 16:9, min 1920×1080. Alt obligatoire.",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              validation: (Rule) =>
                Rule.required().error(
                  "L'alt du poster est obligatoire (accessibilité)."
                ),
            }),
          ],
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as { mode?: string } | undefined;
              if (!isVideoMode(parent)) return true;
              if (!value) return "Poster requis pour les modes vidéo.";
              return true;
            }),
        }),
        defineField({
          name: "fileMp4",
          title: "Fichier MP4 (H.264)",
          description: "Self-hosted. < 8 Mo recommandé. Optionnel.",
          type: "file",
          options: { accept: "video/mp4" },
        }),
        defineField({
          name: "fileWebm",
          title: "Fichier WebM",
          description: "Self-hosted. < 5 Mo recommandé. Optionnel.",
          type: "file",
          options: { accept: "video/webm" },
        }),
        defineField({
          name: "externalUrl",
          title: "URL externe",
          description: "Vimeo / YouTube unlisted. Optionnel.",
          type: "url",
        }),
        defineField({
          name: "duration",
          title: "Durée (secondes)",
          description: "Indicatif. Max 12 secondes.",
          type: "number",
          validation: (Rule) =>
            Rule.min(0)
              .max(12)
              .warning("Une preuve vidéo > 12 s est probablement trop longue."),
        }),
        defineField({
          name: "showSplitLabels",
          title: "Afficher labels avant / après sur la vidéo",
          description:
            "Si la vidéo elle-même est un split visuel, afficher des labels superposés. Sinon laisser décoché.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "transcript",
          title: "Transcription / description",
          description:
            "Description textuelle de ce que montre la vidéo. Recommandé pour l'accessibilité.",
          type: "text",
          rows: 3,
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mode?: string } | undefined;
          if (!isVideoMode(parent)) return true;
          const v = value as
            | {
                posterImage?: unknown;
                fileMp4?: unknown;
                fileWebm?: unknown;
                externalUrl?: unknown;
              }
            | undefined;
          if (!v) return "Bloc vidéo requis pour ce mode.";
          if (!v.posterImage) return "Poster requis.";
          if (!v.fileMp4 && !v.fileWebm && !v.externalUrl) {
            return "Au moins une source vidéo requise (MP4, WebM ou URL externe).";
          }
          return true;
        }),
    }),

    // === Sous-objet CHARACTER SEQUENCE (mode character-sequence uniquement) ===
    defineField({
      name: "characterSequence",
      title: "Cohérence personnages",
      description:
        "Références personnage + comptage de plans + sceau de validation. Visible uniquement en mode character-sequence.",
      type: "object",
      hidden: ({ parent }) => !isCharacterSequence(parent),
      fields: [
        defineField({
          name: "refs",
          title: "Références (3 ou 4 plans)",
          description:
            "Vignettes des plans à raccorder. Exactement 3 ou 4 items. Alt obligatoire sur chaque image.",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Texte alternatif",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error("Alt obligatoire."),
                }),
              ],
            },
          ],
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value) return true;
              const len = (value as Array<unknown>).length;
              if (len < 3 || len > 4)
                return "Exactement 3 ou 4 références attendues.";
              return true;
            }),
        }),
        defineField({
          name: "shotsCount",
          title: "Nombre de plans",
          description: "3 ou 4. Doit correspondre au nombre de refs.",
          type: "number",
          options: {
            list: [
              { title: "3 plans", value: 3 },
              { title: "4 plans", value: 4 },
            ],
            layout: "radio",
          },
          validation: (Rule) =>
            Rule.custom((value) => {
              if (value === undefined) return true;
              if (value !== 3 && value !== 4)
                return "shotsCount doit être 3 ou 4.";
              return true;
            }),
        }),
        defineField({
          name: "proofBadge",
          title: "Sceau de validation",
          description: "Affiché en surimpression. 24 caractères max.",
          type: "string",
          initialValue: "RACCORD VALIDÉ",
          validation: (Rule) => Rule.max(24),
        }),
      ],
    }),

    // === Champs visuels et complémentaires ===
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
      mode: "mode",
      mediaComparator: "afterImage",
      mediaVideo: "video.posterImage",
    },
    prepare: ({
      title,
      phase,
      order,
      featured,
      hidden,
      mode,
      mediaComparator,
      mediaVideo,
    }) => {
      const orderLabel =
        typeof order === "number" ? String(order).padStart(2, "0") : "—";
      const flags = `${featured ? " ★" : ""}${hidden ? " ◌" : ""}`;
      const modeLabel =
        mode && mode !== "comparator" ? ` · ${mode}` : "";
      const media = mediaVideo ?? mediaComparator;
      return {
        title: `${orderLabel} · ${title ?? "Sans titre"}${flags}`,
        subtitle: `${phase ? phase.replace("-", " ") : "—"}${modeLabel}`,
        media,
      };
    },
  },
});
