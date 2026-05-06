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
      name: "shortDescription",
      title: "Description courte",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "longDescription",
      title: "Description longue",
      type: "blockContent",
    }),
    defineField({
      name: "icon",
      title: "Icône / image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", phase: "phase" },
    prepare: ({ title, phase }) => ({
      title,
      subtitle: phase ? phase.replace("-", " ") : undefined,
    }),
  },
});
