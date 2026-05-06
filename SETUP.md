# SETUP — Mise en ligne de Jenial sur `studioxr.one`

Guide pas à pas pour passer du scaffold local à un site en production sur le domaine **studioxr.one**.

Durée estimée : **20 à 30 minutes** (hors propagation DNS).

---

## Étape 1 — Prérequis locaux

Vérifier que les outils suivants sont installés :

```bash
node -v   # >= 20.x
npm -v    # >= 10.x
git --version
```

Installer les dépendances et tester localement :

```bash
cd jenial-site
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) et vérifier que la page d'accueil s'affiche correctement.

---

## Étape 2 — Initialiser le dépôt Git

Depuis le dossier `jenial-site/` :

```bash
git init
git add .
git commit -m "chore: initial scaffold Jenial"
git branch -M main
```

---

## Étape 3 — Créer un repository GitHub

1. Aller sur [https://github.com/new](https://github.com/new)
2. Nom du repo : `jenial-site` (ou `studioxr-one`)
3. **Privé** recommandé pour commencer
4. **Ne pas** cocher "Add a README" (le projet en a déjà un)
5. Cliquer "Create repository"

Lier le remote et pousser :

```bash
git remote add origin git@github.com:<ton-org>/jenial-site.git
git push -u origin main
```

---

## Étape 4 — Connecter Vercel au repo

1. Aller sur [https://vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → sélectionner `jenial-site`
3. Framework Preset : **Next.js** (auto-détecté)
4. Root Directory : `./` (par défaut)
5. Build Command : `next build` (par défaut)
6. Output Directory : laisser vide (Next.js gère)
7. Cliquer **Deploy**

Premier déploiement → URL temporaire `jenial-site-xxx.vercel.app`. Vérifier que le site s'affiche.

---

## Étape 5 — Configurer les variables d'environnement

Dans le dashboard Vercel → projet `jenial-site` → **Settings → Environment Variables** :

| Nom                | Valeur                       | Environnements        |
| ------------------ | ---------------------------- | --------------------- |
| `RESEND_API_KEY`   | `re_xxx...` (depuis Resend)  | Production, Preview   |
| `CONTACT_TO_EMAIL` | `contact@studioxr.one`       | Production, Preview   |

Redéployer pour appliquer les variables (Deployments → ··· → **Redeploy**).

---

## Étape 6 — Ajouter le domaine `studioxr.one`

Dans Vercel → projet → **Settings → Domains** :

1. Saisir `studioxr.one` → **Add**
2. Saisir `www.studioxr.one` → **Add** (Vercel proposera une redirection vers l'apex, accepter)

Vercel affiche les enregistrements DNS à configurer.

---

## Étape 7 — Configurer le DNS chez le registrar

Chez le registrar de `studioxr.one` (OVH, Gandi, Namecheap, etc.), zone DNS :

### Option A — Apex via A record (recommandée Vercel)

| Type    | Nom    | Valeur               | TTL    |
| ------- | ------ | -------------------- | ------ |
| `A`     | `@`    | `76.76.21.21`        | 3600   |
| `CNAME` | `www`  | `cname.vercel-dns.com.` | 3600 |

### Option B — Tout chez Vercel (nameservers)

Pointer les nameservers du domaine vers :

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Propagation DNS** : 5 min à 24 h selon le registrar. Vérifier sur [https://dnschecker.org](https://dnschecker.org).

Une fois les DNS propagés, Vercel émet automatiquement un certificat **Let's Encrypt** (HTTPS).

Le site est en ligne sur **https://studioxr.one**.

---

## Aller plus loin

- **Analytics** : activer Vercel Analytics dans Settings → Analytics
- **Speed Insights** : activer Speed Insights pour mesurer le LCP/INP réel
- **Branche `preview`** : chaque PR génère une URL de preview automatique
- **Custom domain redirect** : forcer `www.studioxr.one` → `studioxr.one` (ou inverse)
- **Resend** : créer un compte sur [resend.com](https://resend.com), vérifier le domaine `studioxr.one` (DKIM/SPF), récupérer la clé API

---

## Troubleshooting

| Problème                                | Solution                                                                |
| --------------------------------------- | ----------------------------------------------------------------------- |
| Build fail Vercel : `Module not found`  | Vérifier `tsconfig.json` paths + relancer `npm install` localement      |
| Domaine "Invalid Configuration"         | Attendre la propagation DNS + cliquer "Refresh" dans Vercel             |
| 404 sur `/`                             | Vérifier que `src/app/page.tsx` existe et exporte un composant default  |
| Polices Inter/Fraunces ne se chargent pas | `next/font/google` nécessite un accès réseau au build → Vercel OK      |
