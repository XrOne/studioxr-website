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
