import { defineType, defineField, defineArrayMember } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Titre du site",
      type: "string",
      initialValue: "Jenial",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Du script au pixel.",
    }),
    defineField({
      name: "contactEmail",
      title: "Email de contact",
      type: "string",
      initialValue: "contact@studioxr.one",
    }),
    defineField({
      name: "calendlyUrl",
      title: "URL Calendly",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "URL LinkedIn",
      type: "url",
    }),
    defineField({
      name: "manifestoIntro",
      title: "Manifeste — intro",
      type: "blockContent",
    }),
    defineField({
      name: "manifestoBody",
      title: "Manifeste — corps",
      type: "blockContent",
    }),
    defineField({
      name: "manifestoVideo",
      title: "Manifeste — vidéo",
      type: "object",
      fields: [
        defineField({
          name: "isEnabled",
          title: "Afficher la vidéo",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "title",
          title: "Titre de la section",
          type: "string",
        }),
        defineField({
          name: "source",
          title: "Source de la vidéo",
          type: "string",
          options: {
            list: [
              { title: "Fichier hébergé sur Sanity", value: "sanityFile" },
              { title: "URL externe (lien direct .mp4 / .webm)", value: "externalUrl" },
            ],
            layout: "radio",
          },
          initialValue: "sanityFile",
        }),
        defineField({
          name: "file",
          title: "Fichier vidéo",
          type: "file",
          options: { accept: "video/*" },
          description: 'Utilisé si la source est "Fichier hébergé sur Sanity".',
        }),
        defineField({
          name: "externalUrl",
          title: "URL externe",
          type: "url",
          description:
            'Lien direct vers un fichier vidéo (.mp4 / .webm). Pas un lien YouTube/Vimeo. Utilisé si la source est "URL externe".',
        }),
        defineField({
          name: "poster",
          title: "Image poster",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "fallbackImage",
          title: "Image de repli",
          type: "image",
          options: { hotspot: true },
          description:
            "Affichée en fond du hero /manifeste si aucune vidéo n'est configurée (mais que la section est activée).",
        }),
        defineField({
          name: "mobileImage",
          title: "Image mobile",
          type: "image",
          options: { hotspot: true },
          description:
            "Image spécifique mobile. Utilisée sur smartphone pour éviter les crops agressifs du visuel principal. Format recommandé : portrait, 4:5 ou 3:4.",
        }),
        defineField({
          name: "caption",
          title: "Légende",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "engagements",
      title: "Engagements (lignes rouges)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Numéro (01...06)" },
            { name: "title", type: "string", title: "Titre" },
            { name: "description", type: "text", title: "Description" },
          ],
          preview: {
            select: { title: "title", subtitle: "number" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Réglages du site" }),
  },
});
