import { groq } from "next-sanity";

export const ALL_CAPACITIES_QUERY = groq`
  *[_type == "capacity" && hidden != true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    phase,
    order,
    featured,
    hidden,
    mode,
    shortDescription,
    longDescription,
    icon,
    "beforeImage": beforeImage.asset->url,
    "afterImage": afterImage.asset->url,
    beforeLabel,
    afterLabel,
    caption,
    "video": video {
      "posterImage": posterImage.asset->url,
      "fileMp4": fileMp4.asset->url,
      "fileWebm": fileWebm.asset->url,
      externalUrl,
      duration,
      showSplitLabels,
      transcript
    }
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

export const ALL_LEGACY_PROJECTS_QUERY = groq`
  *[_type == "legacyProject"] | order(order asc, _createdAt desc) {
    _id,
    title,
    year,
    format,
    role,
    claim,
    youtubeId,
    thumbnailOverride,
    order
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
    manifestoVideo {
      isEnabled,
      title,
      source,
      externalUrl,
      caption,
      poster,
      fallbackImage,
      "fileUrl": file.asset->url
    },
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
