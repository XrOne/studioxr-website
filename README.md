# Studio XR·ONE — Site marketing

Site Next.js 15 + Sanity Studio embedded pour Studio XR·ONE (pionnier du tournage hybride et production augmentée par IA depuis 2014, CréaCannes).

## Stack

- **Next.js 15** (App Router) + TypeScript strict
- **Tailwind CSS v4** (config CSS-first dans `globals.css`)
- **Sanity v3** embedded (Studio sur `/studio` dans le même Next.js)
- **next-sanity** pour fetch + draft mode
- Animations CSS natives (pas de framer-motion)

## Installation rapide

```bash
npm install
cp .env.example .env.local
# (optionnel) remplir NEXT_PUBLIC_SANITY_PROJECT_ID
npm run dev
```

Le site fonctionne **sans Sanity configuré** grâce aux fallbacks (`src/lib/content-fallback.ts`).

Voir `SETUP-USER.md` pour le guide non-tech.

## Structure

```
src/
  app/
    layout.tsx              — Root layout (fonts, metadata)
    page.tsx                — Home
    manifeste/page.tsx      — Page manifeste
    studio/[[...tool]]/     — Sanity Studio embedded
    api/draft-mode/enable/  — Endpoint preview
    globals.css             — Tailwind v4 + design tokens
  components/                — Composants UI (Header, Hero, etc.)
  sanity/
    lib/                     — client, image, queries, fetch
    schemaTypes/             — schémas Sanity (capacity, caseStudy, settings...)
    structure.ts             — structure du Studio
  lib/
    content-fallback.ts      — données de secours
public/
  case-studies/              — assets versionnés (alternative à Sanity)
```

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Dev server sur `localhost:3000` (site + `/studio`) |
| `npm run build` | Build prod |
| `npm run start` | Serveur prod |
| `npm run typecheck` | Vérif TypeScript |

## Ajouter du contenu via /studio

1. Démarrer `npm run dev`
2. Ouvrir `http://localhost:3000/studio`
3. Se connecter avec son compte Sanity (créé sur sanity.io/manage)
4. Créer des entrées : **Capacités**, **Études de cas**, **Partenaires**, **Réglages**
5. Le site se met à jour automatiquement (revalidation 60s)

## Variables d'environnement

Cf. `.env.example` :
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — projectId Sanity (public, OK côté client)
- `NEXT_PUBLIC_SANITY_DATASET` — `production` par défaut
- `SANITY_API_TOKEN` — token serveur, **jamais exposé côté client**
- `NEXT_PUBLIC_SITE_URL` — URL canonique pour metadata

## Déploiement

Vercel (recommandé) : connecter le repo, ajouter les vars d'env, déployer.

## Crédits

Direction artistique inspirée de Grandmur et Narrative Coders.
Typo : Anton (display) + Inter (body) + JetBrains Mono (méta).
Palette océan : lagon, anse, abysse, sable, corail.
