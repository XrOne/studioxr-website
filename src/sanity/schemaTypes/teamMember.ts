import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Membre d'équipe",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
