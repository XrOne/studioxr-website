import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/**
 * Endpoint preview/draft mode.
 * Utiliser : /api/draft-mode/enable?secret=XXX&slug=/manifeste
 *
 * Sécurité : vérifier le `secret` côté query (à configurer dans Sanity
 * preview URL settings).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";

  const expected = process.env.SANITY_API_TOKEN;
  if (!expected || !secret || secret !== expected) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}
