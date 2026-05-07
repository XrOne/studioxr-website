import { defineType, defineField } from "sanity";

/**
 * Projet historique XR-ONE — preuve d'ADN pionnier (VR, 360°, immersif).
 * Distinct des `caseStudy` qui présentent les prestations actuelles (IA, prépa prod).
 */
export const legacyProject = defineType({
  name: "legacyProject",
  title: "Projet pionnier",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Année",
      type: "string",
      description: 'Format libre (ex : "2015", "2016-2017").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format / techno",
      type: "string",
      description: 'Ex : "VR 360° stéréo", "Vidéo 360°", "Drone 360°".',
    }),
    defineField({
      name: "role",
      title: "Rôle XR-ONE",
      type: "string",
      description: 'Ex : "Réalisation", "Prestataire technique 360/VR", "Editing & stitching".',
    }),
    defineField({
      name: "claim",
      title: "Claim / preuve courte",
      type: "text",
      rows: 2,
      description:
        "Une phrase qui prouve l'antériorité ou le caractère pionnier (festival, prix, citation, claim factuel).",
    }),
    defineField({
      name: "youtubeId",
      title: "ID YouTube",
      type: "string",
      description: 'Ex : "MI5p-keCBns" (extrait de https://youtu.be/MI5p-keCBns).',
    }),
    defineField({
      name: "thumbnailOverride",
      title: "Vignette personnalisée (optionnel)",
      type: "image",
      options: { hotspot: true },
      description: "Si laissé vide, la miniature YouTube est utilisée.",
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "thumbnailOverride" },
  },
});
