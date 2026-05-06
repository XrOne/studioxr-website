# Studio XR-ONE → Jenial : Audit & Plan de modernisation

**Date :** 4 mai 2026
**Auteur :** CTO Jenial (assisté Claude)
**Domaine audité :** studioxr.one
**Stack actuelle :** WordPress 6.9.4 + thème "Elementy" (désactivé manuellement)

---

## TL;DR (1 minute)

Le site **studioxr.one** est techniquement mort (thème désactivé, plugins coupés, stack 2015), mais l'**actif business est solide** : marque XR pionnière, équipe identifiée, réalisations crédibles, partenaires de référence. Plutôt que de le réparer, on **reconstruit from scratch sur stack moderne** (Next.js 15 + Tailwind + Sanity + Vercel) et on en profite pour **fusionner intelligemment l'héritage XR et la nouvelle offre Jenial** dans une narrative unifiée. Délai cible : **3 à 4 semaines** pour la V1 en ligne.

---

## 1. Diagnostic technique (résumé)

### Stack détectée
- **WordPress 6.9.4** (à jour côté core)
- **Thème actif** : `wp-elementy-disabled` — le dossier a été renommé (suffixe `-disabled`), ce qui désactive le thème de force
- **Plugins** : tous désactivés. Traces résiduelles : Slider Revolution, WooCommerce + WooCommerce FR, YITH Wishlist
- **Page builder** : prévu Elementor (template `elementor_header_footer`) mais Elementor non chargé
- **Libs front** : jQuery 3.7.1, **Bootstrap 3.3.2 (2015)**, **Font Awesome 4.3.0 (2015)**, Owl Carousel 2.0.0

### Problèmes critiques
| # | Problème | Sévérité |
|---|----------|----------|
| 1 | Thème volontairement désactivé (assets en 404) | BLOQUANT |
| 2 | Stack frontend obsolète (Bootstrap 3, FA 4, jQuery legacy) | HAUTE |
| 3 | Aucun plugin opérationnel — site WP "à nu" | HAUTE |
| 4 | `lang="en-GB"` sur contenu 100% français | HAUTE (SEO) |
| 5 | 4 balises H1 sur la home (anti-pattern SEO) | MOYENNE |
| 6 | Aucune meta description, aucun Schema.org, aucun OpenGraph | HAUTE (SEO) |
| 7 | Footer "© Elementy 2016" jamais modifié | COSMÉTIQUE / CRÉDIBILITÉ |
| 8 | Navigation polluée par 80+ pages démo du thème | MOYENNE |
| 9 | Liens YouTube vides + HTML cassé (balises `<a>` mal imbriquées) | MOYENNE |
| 10 | xmlrpc.php exposé, surface d'attaque | SÉCURITÉ |
| 11 | Shortcode `[rev_slider]` rendu en texte brut | COSMÉTIQUE |
| 12 | Site inactif depuis 2021 (signaux SEO probablement effondrés) | STRATÉGIQUE |

### Verdict
**Réparer = perdre du temps.** Le coût de debug + assainissement + modernisation d'une stack 2015 dépasse celui d'un build neuf sur stack moderne. La seule valeur à conserver est le **contenu rédactionnel** et l'**ADN de marque**.

---

## 2. Actifs récupérables (ce qu'on garde)

### Identité de marque
- **Nom** : Studio XR-ONE
- **Tagline** : *"Making Virtual Reality Your Reality"*
- **Positionnement historique** : Studio pionnier français en réalité virtuelle & augmentée
- **Localisation** : Incubateur ENSAM, 155 Bd de l'Hôpital, 75013 Paris
- **Email** : contact@studioxr.one

### Services historiques
1. Réalité Virtuelle (VR)
2. Visite 360°
3. Évènement Virtuel
4. Réalité Augmentée (AR)
5. Formations XR

### Équipe (à valider/mettre à jour)
- Isabel De Peuter-Rutten — CEO
- Charles-Henri Marraud des Grottes — CCO
- Morgane Krauss
- Emilia Kukovski
- Nicolas Vanhoutte

### Réalisations citées
MIZIK · Le dernier Hero · INRA/CIRAD · The Other Side · ELLE DECOR · Monaco Périgord

### Partenaires / écosystème
MIDEM · VR Days · Laval Virtual · XR4ALL

### Timeline (2015 → 2021)
À reprendre, étendre **2022 → aujourd'hui** avec le pivot vers l'IA audiovisuelle (Jenial).

---

## 3. Stratégie : narrative XR → IA audiovisuelle

L'idée maîtresse : **ne pas couper l'héritage XR, en faire le socle de crédibilité de Jenial.**

> *"Studio XR-ONE a été l'un des premiers studios français à explorer la réalité virtuelle et augmentée dès 2015. Aujourd'hui, la révolution immersive prend une nouvelle forme : l'IA générative. Avec **Jenial**, nous appliquons la même obsession de la frontière créative à un nouveau médium — la production audiovisuelle pilotée par IA."*

C'est une histoire **vraie**, **cohérente**, et **différenciante** dans le marché des agences IA. Personne ne peut copier 10 ans d'expérience XR.

### Architecture site recommandée (V1)

```
studioxr.one (ou jenial.studio à arbitrer)
│
├── /                          → Home Jenial-first (offre actuelle)
│                                avec teaser héritage XR
│
├── /offres/
│   ├── /films-ia              → Production vidéo IA (clips, pubs, cinéma)
│   ├── /previz                → Prévisualisation de plans
│   ├── /moodboards            → Direction artistique IA
│   ├── /workflow-conseil      → Audit & industrialisation
│   └── /jenial-soft           → Le logiciel Jenial (waitlist)
│
├── /realisations/             → Cas Jenial actuels (priorité)
│                                + archive XR (MIZIK, Le dernier Hero, etc.)
│
├── /process/                  → Les 6 étapes Jenial (vulgarisées)
│
├── /heritage/                 → L'histoire XR-ONE (timeline 2015→aujourd'hui)
│   ├── /timeline
│   ├── /equipe
│   └── /partenaires
│
├── /blog/                     → Articles, retours d'expérience
│
├── /brief/                    → Formulaire de brief intelligent
│
└── /contact/                  → Contact direct + prise de RDV
```

**Décision à prendre côté domaine :**
- Option A : garder `studioxr.one` (préserve historique SEO) + sous-marque Jenial visible
- Option B : nouveau domaine `jenial.fr` ou `jenial.studio` + redirection 301 depuis studioxr.one
- Option C : les deux, `studioxr.one` redirige vers `jenial.fr/heritage`

---

## 4. Stack technique cible

| Brique | Choix | Pourquoi |
|--------|-------|----------|
| Framework | **Next.js 15 (App Router)** | SEO impeccable, performances, écosystème mature |
| Style | **Tailwind CSS v4** | Vélocité, cohérence design system |
| CMS | **Sanity** ou **Payload CMS** (à arbitrer) | Headless, modern, parfait pour contenu structuré (réalisations, équipe, blog) |
| Hébergement | **Vercel** | Déploiement Git-based, edge global, gratuit pour démarrer |
| Formulaires | **Resend** + API route Next.js | Pas de service tiers, contrôle total |
| Analytics | **Plausible** ou **Vercel Analytics** | RGPD-friendly, pas de cookie banner agressif |
| Animations | **Framer Motion** + **Three.js / R3F** | Rappelle l'ADN XR, démos 3D légères |
| i18n | **next-intl** | FR principal, EN à terme |
| Newsletter | **Resend Audiences** ou **Beehiiv** | Capture leads tunnel de vente |
| Booking | **Cal.com** (self-hosted ou cloud) | Open source, prise de RDV brief gratuite |

**Sécurité** : zéro secret côté front, toutes les API keys en variables d'env Vercel, endpoints dans `/api/*` (Edge Functions), rate limiting via Upstash Redis.

---

## 5. Plan d'exécution (4 semaines)

### Semaine 1 — Sauvegarde + sourcing
- [ ] Backup complet de studioxr.one (files via FTP/SFTP + DB via phpMyAdmin)
- [ ] Export du contenu utile (textes, images, vidéos) vers un dossier de travail
- [ ] Récupérer les accès : registrar du domaine, hébergeur actuel, comptes Google (GA, Search Console s'ils existent), Vercel, GitHub
- [ ] Créer le repo GitHub `jenial-site` (privé)
- [ ] Initialiser Next.js 15 + Tailwind + structure de base
- [ ] Choix CMS (Sanity vs Payload) — je te fais une note comparative dédiée si tu veux
- [ ] Brief design : moodboard de référence (esthétique épurée, accents XR/IA, typographie premium)

### Semaine 2 — Build + contenu
- [ ] Routes principales (Home, Offres, Réalisations, Process, Heritage, Contact)
- [ ] Schémas CMS (Service, Réalisation, Membre équipe, Partenaire, Article, Étape process)
- [ ] Migration contenu legacy depuis le HTML audité
- [ ] Composants core : Header, Footer, Card, Hero, CTA, FormBrief
- [ ] Intégration brief intelligent (formulaire conditionnel, envoi email Resend)

### Semaine 3 — Polish + intégrations
- [ ] Animations Framer Motion (sobres, pas de WOW gratuit)
- [ ] Mini démo 3D Three.js sur la home (optionnel mais ADN XR)
- [ ] SEO : meta, OG, Schema.org Organization + Service + ImageObject, sitemap, robots.txt
- [ ] Plan de redirections 301 (studioxr.one anciens URLs → nouveaux)
- [ ] Cal.com intégré pour prise de RDV
- [ ] Newsletter (capture email tunnel de vente)
- [ ] Tests Lighthouse (cible : 95+ partout)

### Semaine 4 — Lancement
- [ ] Déploiement Vercel (preview puis prod)
- [ ] Bascule DNS du domaine choisi
- [ ] Soumission Search Console + indexation
- [ ] Setup Plausible + monitoring uptime
- [ ] Documentation interne (README, comment éditer du contenu, comment déployer)
- [ ] Annonce LinkedIn / clients existants

---

## 6. Risques & mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Perte de SEO historique | Trafic | Plan 301 exhaustif + sitemap soumis dès J1 |
| Accès admin/FTP perdus | Bloque le backup | Récupérer via hébergeur (procédure de recovery) |
| Contenu ancien périmé/erroné | Crédibilité | Validation manuelle avant publication |
| Tentation de tout reconstruire en 1x | Délai qui dérape | Méthode : V1 minimale en ligne en 4 semaines, itérations ensuite |
| Confusion XR/Jenial pour les visiteurs | Conversion | Storytelling clair : "héritage" vs "offre actuelle" |

---

## 7. Décisions à trancher (priorité)

1. **Domaine principal** : `studioxr.one`, `jenial.fr`, ou les deux ?
2. **Choix CMS** : Sanity (plus mature, cloud) ou Payload (open-source, self-hostable) ?
3. **Équipe affichée** : tu es seul aux commandes maintenant ou l'équipe historique est toujours associée ?
4. **Budget mensuel** cible (hébergement + CMS + outils) : on cale le stack en fonction.
5. **Premier livrable visuel** : tu préfères un mockup Figma de la home, ou une preview Vercel directement ?

---

## 8. Prochaine étape immédiate

Je peux livrer dès que tu valides la direction :

**Livrable #2 (sous 24h)** : un mockup HTML statique de la home (V0) — un seul fichier autonome qui te montre le ton, la structure, le storytelling XR→Jenial — pour valider la direction avant de lancer le build complet.

Dis-moi : URL ou mockup d'abord ?
