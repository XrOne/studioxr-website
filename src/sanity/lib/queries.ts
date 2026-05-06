import { groq } from "next-sanity";

export const ALL_CAPACITIES_QUERY = groq`
  *[_type == "capacity"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    phase,
    order,
    shortDescription,
    longDescription,
    icon
  }
`;

export const ALL_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    production,
    tag,
    category,
    order,
    shortDescription,
    longDescription,
    heroImage,
    gallery,
    beforeAfterPairs
  }
`;

export const ALL_PARTNERS_QUERY = groq`
  *[_type == "partner"] | order(order asc, name asc) {
    _id,
    name,
    logo,
    website,
    order
  }
`;

export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    siteTitle,
    tagline,
    contactEmail,
    calendlyUrl,
    linkedinUrl,
    manifestoIntro,
    manifestoBody,
    engagements
  }
`;

export const ALL_TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(_createdAt asc) {
    _id,
    name,
    role,
    photo,
    bio
  }
`;
