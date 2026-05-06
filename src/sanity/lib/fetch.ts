import { hasSanityConfig, sanityClient } from "./client";

interface FetchOptions {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}

/**
 * Wrapper safe pour les fetch Sanity côté serveur.
 * Retourne null si Sanity n'est pas configuré (le caller bascule
 * sur les fallbacks de content-fallback.ts).
 */
export async function fetchSanity<T>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: FetchOptions): Promise<T | null> {
  if (!hasSanityConfig || !sanityClient) {
    return null;
  }

  try {
    const result = await sanityClient.fetch<T>(query, params, {
      next: {
        revalidate,
        tags,
      },
    });
    return result;
  } catch (err) {
    console.warn("[fetchSanity] Erreur — fallback utilisé:", err);
    return null;
  }
}
