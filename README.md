# Jenial — Studio XR-ONE

Site officiel de **Jenial**, l'agence IA audiovisuelle née de l'héritage de **Studio XR-ONE** (pionnier français en réalité virtuelle/augmentée, 2015–2021).

> De la frontière XR à la frontière IA.

## Stack

- **Next.js 15** (App Router, TypeScript strict)
- **React 19**
- **Tailwind CSS v4** (config CSS-first, pas de `tailwind.config.js`)
- **Framer Motion** pour les micro-animations
- Fonts : **Inter** (UI) + **Fraunces** (titres) via `next/font/google`

## Quick start

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de dev
npm run dev
# → http://localhost:3000

# 3. Build de production
npm run build
npm run start
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Variables :

- `RESEND_API_KEY` — clé API Resend (à venir, pour le formulaire de contact)
- `CONTACT_TO_EMAIL` — email destinataire des briefs (défaut : `contact@studioxr.one`)

## Déploiement Vercel

```bash
# Installer le CLI (une fois)
npm i -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

Voir [SETUP.md](./SETUP.md) pour le guide complet (GitHub → Vercel → DNS `studioxr.one`).

## Structure

```
src/
├── app/
│   ├── layout.tsx        # RootLayout + fonts + metadata
│   ├── page.tsx          # Page d'accueil (assemble les sections)
│   └── globals.css       # Tailwind v4 + tokens CSS
├── components/
│   ├── Header.tsx        # Nav sticky + burger mobile
│   ├── Hero.tsx
│   ├── Heritage.tsx      # Timeline 2015 → 2026
│   ├── Offres.tsx        # 5 cards services
│   ├── Realisations.tsx  # Cas clients
│   ├── Process.tsx       # 6 étapes
│   ├── Partenaires.tsx   # Bandeau logos texte
│   ├── CTAFinal.tsx
│   └── Footer.tsx
└── lib/
    └── content.ts        # Données typées (services, équipe, timeline…)
```

## Design tokens

Définis dans `src/app/globals.css` via `@theme inline` :

- `--bg` : fond très sombre
- `--bg-elev` : surface élevée (cards)
- `--fg` / `--fg-muted` : texte
- `--accent` : ambré chaud (`#F5A56A`)
- `--accent-soft` : variante atténuée

## Licence

© 2026 Studio XR-ONE · Jenial. Tous droits réservés.
