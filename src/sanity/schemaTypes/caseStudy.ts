import { defineType, defineField, defineArrayMember } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Étude de cas",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "production",
      title: "Production / Société (optionnel)",
      type: "string",
      description: 'Ex : "production Inevitable"',
    }),
    defineField({
      name: "tag",
      title: "Tag court",
      type: "string",
      description: 'Ex : "Production hybride · 2025"',
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Production hybride", value: "tournage-hybride" },
          { title: "Prépa prod", value: "prepa-prod" },
          { title: "Projet XR-ONE", value: "projet-xr-one" },
          { title: "Corporate", value: "corporate" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "shortDescription",
      title: "Description courte",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Description longue",
      type: "blockContent",
    }),
    defineField({
      name: "heroImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt" },
            { name: "caption", type: "string", title: "Légende" },
          ],
        }),
      ],
    }),
    defineField({
      name: "beforeAfterPairs",
      title: "Comparaisons avant / après",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "before",
              title: "Avant",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "after",
              title: "Après",
              type: "image",
              options: { hotspot: true },
            },
            { name: "label", type: "string", title: "Légende" },
          ],
          preview: {
            select: { media: "after", title: "label" },
            prepare: ({ media, title }) => ({
              title: title || "Avant / Après",
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag", media: "heroImage" },
  },
});
