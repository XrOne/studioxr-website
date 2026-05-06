# Guide de mise en route — Studio XR·ONE

Pas besoin d'être développeur. Suivez les étapes dans l'ordre.

## 1. Pré-requis

- **Node.js 20+** installé. Vérifier avec :
  ```
  node --version
  ```
  Si absent : télécharger sur [nodejs.org](https://nodejs.org).

## 2. Installation

Ouvrir un terminal dans le dossier du projet, puis :

```
npm install
```

Patienter (1 à 3 minutes).

## 3. Test rapide SANS Sanity

Le site fonctionne immédiatement avec les données de démo :

```
npm run dev
```

Ouvrir **http://localhost:3000** dans le navigateur. Vous voyez le site complet avec contenu fallback.

## 4. Créer un projet Sanity (pour gérer le contenu)

1. Aller sur [sanity.io/manage](https://www.sanity.io/manage)
2. Cliquer **Create new project**
3. Nommer le projet (ex : "Studio XR-ONE")
4. Choisir le dataset **production**
5. Récupérer le **Project ID** affiché dans l'URL (ex: `abc123de`)

## 5. Configurer .env.local

Copier `.env.example` en `.env.local` :

```
cp .env.example .env.local
```

Ouvrir `.env.local` et remplir :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_SITE_URL=https://studioxr.one
```

Pour `SANITY_API_TOKEN` (optionnel, requis pour le mode preview) :
- Dans sanity.io/manage → projet → API → Tokens → **Add token**
- Permissions : **Viewer** (ou Editor)
- Copier la valeur dans `.env.local`

## 6. Autoriser localhost dans Sanity

Dans sanity.io/manage → projet → API → CORS Origins → **Add origin** :
- URL : `http://localhost:3000`
- Cocher **Allow credentials**

## 7. Ouvrir le Studio

Relancer le dev server :

```
npm run dev
```

Ouvrir **http://localhost:3000/studio**.

Se connecter avec le compte Sanity. Vous arrivez dans l'éditeur.

## 8. Créer le premier contenu

Dans le Studio :
1. Ouvrir **Réglages** → remplir le tagline, l'email, la story manifeste
2. Aller dans **Capacités** → **Create new** → ajouter une capacité IA
3. Aller dans **Études de cas** → ajouter Declics 2, MIZIK, etc.
4. Aller dans **Partenaires** → ajouter Inevitable, BNP Paribas, etc.

Le site (`localhost:3000`) se met à jour automatiquement (60s max).

## 9. Mise en ligne

Recommandation : **Vercel**.

1. Pousser le repo sur GitHub
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'env dans **Settings → Environment Variables**
4. Déployer
5. Ajouter le domaine final (ex: `studioxr.one`) dans Vercel + Sanity CORS Origins

## Aide

| Problème | Solution |
|---|---|
| Le site ne démarre pas | `npm install` puis `npm run dev` |
| `/studio` reste blanc | Vérifier projectId dans `.env.local` + CORS Origin localhost:3000 |
| Pas de contenu affiché | Normal sans Sanity → fallback s'affiche |
| Modifs Studio invisibles | Attendre 60s (revalidation ISR) ou hard reload |
