import { createClient } from "next-sanity";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

export const hasSanityConfig = projectId.length > 0;

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
