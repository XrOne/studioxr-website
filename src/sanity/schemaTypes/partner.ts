import { defineType, defineField } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partenaire",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo (optionnel)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "website",
      title: "Site web",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
