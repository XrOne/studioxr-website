import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Studio XR·ONE")
    .items([
      S.listItem()
        .title("Réglages")
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
            .title("Réglages du site"),
        ),
      S.divider(),
      S.listItem()
        .title("Capacités IA")
        .schemaType("capacity")
        .child(S.documentTypeList("capacity").title("Capacités")),
      S.listItem()
        .title("Études de cas")
        .schemaType("caseStudy")
        .child(S.documentTypeList("caseStudy").title("Études de cas")),
      S.divider(),
      S.listItem()
        .title("Équipe")
        .schemaType("teamMember")
        .child(S.documentTypeList("teamMember").title("Équipe")),
      S.listItem()
        .title("Partenaires")
        .schemaType("partner")
        .child(S.documentTypeList("partner").title("Partenaires")),
    ]);
