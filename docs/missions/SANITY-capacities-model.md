# Architecture éditoriale — Capacités pilotables depuis Sanity

> **Type** : note d'archi CMS, pas une mission code.
> **Statut** : à valider avant rédaction du MISSION.md d'implémentation.
> **Approche** : on **étend** le schéma `capacity` existant (`src/sanity/schemaTypes/capacity.ts`). On ne réécrit rien.

> Compagnon de `UX-capacities-interactive.md`. Lire dans cet ordre :
> UX d'abord (l'expérience visiteur), puis ce doc (modèle éditorial qui la nourrit).

---

## 0. Diagnostic de l'existant

Le schéma actuel a déjà 6 champs utiles : `title`, `slug`, `phase`, `order`,
`shortDescription`, `longDescription`, `icon`. Aucun n'est à supprimer.

**Manquent pour piloter le comparateur depuis l'admin** :
- les 2 images (avant / après)
- les 2 labels courts (avant / après)
- un caption mono (crédit / contexte)
- un mode (comparator | split | video | screenshot | sequence) pour gérer les capacités traitées autrement (cf. note UX §5)
- un drapeau "vedette" (mise en avant)
- un slot vidéo optionnel (Vimeo / YouTube ou upload Sanity)

C'est **8 champs à ajouter au max**. Pas une usine.

---

## 1. Modèle Sanity recommandé

Extension du `capacity.ts`, en gardant l'ordre des champs existants en haut et en
ajoutant les nouveaux **regroupés par usage** via les `groups` Sanity.

### 1.a. Groupes de l'admin (onglets en haut du formulaire)

```
┌─────────────────────────────────────────────────────────────┐
│  IDENTITÉ  │  CONTENU  │  MÉDIA COMPARATEUR  │  MODES PRO   │
└─────────────────────────────────────────────────────────────┘
```

- **Identité** (par défaut, déjà ouvert) : `title`, `slug`, `phase`, `order`, `featured`, `published`.
- **Contenu** : `shortDescription`, `longDescription`, `icon`.
- **Média comparateur** : `mode`, `beforeImage`, `afterImage`, `beforeLabel`, `afterLabel`, `caption`.
- **Modes pro** (avancés) : `video`, `splitLeftText`, `hotspots`, `sequenceImages` — chacun visible **uniquement si** le `mode` choisi le requiert.

### 1.b. Schéma cible (en pseudo-code, lisible)

```
document "capacity" {

  // === GROUP "Identité" ===
  title: string, requis, max 80                       // (existant)
  slug: slug, requis, source = title                  // (existant)
  phase: enum, requis                                 // (existant)
        ["prepa-prod", "tournage-hybride", "post-prod", "transverse"]
  order: number, defaut 0                             // (existant)
  featured: boolean, defaut false                     // NOUVEAU
        // ➜ 1 seul item devrait être true à la fois.
        //   Si plusieurs : on prend le 1er dans l'ordre.
        //   Si aucun : on prend le 1er item ordonné.

  // === GROUP "Contenu" ===
  shortDescription: text(rows=2), max 180             // (existant)
        // ➜ devient le SOUS-TITRE affiché sous le H3 dynamique du comparateur.
  longDescription: blockContent                       // (existant — pas affiché en home)
        // ➜ réservé pour une éventuelle page /capacites/[slug].
  icon: image, hotspot=true                           // (existant)
        // ➜ utilisé dans la card grille uniquement (vignette de la télécommande).

  // === GROUP "Média comparateur" ===
  mode: enum, requis, defaut "comparator"             // NOUVEAU
        ["comparator", "split", "video", "screenshot", "sequence"]
        // ➜ Pilote le rendu du slot du haut. Cf. note UX §5.

  beforeImage: image, hotspot=true                    // NOUVEAU
        // ➜ visible si mode ∈ {comparator, split}
        // ➜ alt requis (champ "alt" sur l'image)

  afterImage: image, hotspot=true                     // NOUVEAU
        // ➜ visible si mode ∈ {comparator, split, screenshot}
        // ➜ alt requis

  beforeLabel: string, max 24                         // NOUVEAU
        // ➜ ex. "DÉCOR BRUT", "RUSH SOURCE"
        // ➜ visible si mode ∈ {comparator, split}

  afterLabel: string, max 24                          // NOUVEAU
        // ➜ ex. "PROJECTION IA", "MASTER CONFORME"
        // ➜ visible si mode ∈ {comparator, split}

  caption: string, max 120                            // NOUVEAU
        // ➜ ligne mono sous le slot, ex. "↳ glissez · Declics S2 (Inevitable, ARTE)"
        // ➜ optionnel mais recommandé

  // === GROUP "Modes pro" (avancé) ===

  video: object, optionnel                            // NOUVEAU, conditionnel mode="video"
        ├─ url: url (Vimeo/YouTube), validation regex
        ├─ file: file (mp4 self-hosted), accept .mp4 .webm
        └─ poster: image (1ère frame, pour <video poster>)
        // ➜ Le composant front utilise file en priorité, puis url en fallback.

  splitLeftText: text(rows=10), optionnel             // NOUVEAU, conditionnel mode="split"
        // ➜ ex. extrait scénario en mono pour la capacité "Storyboards auto"

  hotspots: array of objects, optionnel               // NOUVEAU, conditionnel mode="screenshot"
        ├─ label: string, max 40              // ex. "① Assistant prompt"
        ├─ xPct: number, 0-100                // position horizontale en % de l'image
        └─ yPct: number, 0-100                // position verticale en %

  sequenceImages: array of images, optionnel          // NOUVEAU, conditionnel mode="sequence"
        // ➜ 4 vignettes "raccord" pour la capacité "Continuité"
        // ➜ validation : exactement 4 items
}
```

### 1.c. Statut publié / non publié

**Pas besoin d'un champ custom.** Sanity gère nativement les versions
**Draft / Published**. Front : on requête uniquement les documents publiés
(client `useCdn` + `next-sanity` standard). Si un editor sauvegarde un draft,
ça ne sort pas en prod tant qu'il ne clique pas Publish. C'est l'usage standard.

Si tu veux un drapeau **`hidden: true`** pour publié-mais-masqué (dépublication
soft), j'ajoute :

```
hidden: boolean, defaut false
// ➜ si true, exclu du front même si publié. Permet de retirer une capacité
//   sans la supprimer (utile si on doute, si on retoure les images, etc.)
```

→ **Recommandation** : ajouter `hidden`. C'est 5 secondes de schéma pour 100 fois
plus de souplesse éditoriale.

---

## 2. Liste des champs avec leur usage

| Champ | Type | Requis | Visible quand | Usage front |
|-------|------|--------|---------------|-------------|
| `title` | string | ✅ | toujours | H3 du comparateur ET titre H4 de la card grille |
| `slug` | slug | ✅ | toujours | URL (page dédiée future), ancre `#capacite-[slug]`, clé React |
| `phase` | enum (4) | ✅ | toujours | Chip corail `FEATURED · {phase}` + badge sur la card grille |
| `order` | number | — | toujours | Ordre des cards dans la grille |
| `featured` | boolean | — | toujours | État initial du comparateur au chargement de la section |
| `hidden` (proposé) | boolean | — | toujours | Si true, exclu du front |
| `shortDescription` | text 180 | ✅ | toujours | Sous-titre du comparateur (paragraphe sous H3) |
| `longDescription` | blockContent | — | toujours | Réservé page dédiée /capacites/[slug] |
| `icon` | image | — | toujours | Vignette dans la card grille (mobile : 60×40) |
| `mode` | enum (5) | ✅ | toujours | Pilote quel rendu utiliser dans le slot du haut |
| `beforeImage` | image | conditionnel | mode ∈ {comparator, split} | Image gauche du comparateur |
| `afterImage` | image | conditionnel | mode ∈ {comparator, split, screenshot} | Image droite du comparateur (ou unique screenshot) |
| `beforeLabel` | string 24 | conditionnel | mode ∈ {comparator, split} | Label en surimpression `BRUT` |
| `afterLabel` | string 24 | conditionnel | mode ∈ {comparator, split} | Label en surimpression `FINAL` |
| `caption` | string 120 | — | toujours | Ligne mono sous le slot |
| `video.url` | url | conditionnel | mode = video | Lien Vimeo/YouTube unlisted |
| `video.file` | file mp4/webm | conditionnel | mode = video | Loop self-hosted (priorité sur url) |
| `video.poster` | image | — | mode = video | 1ère frame, attribut `poster` |
| `splitLeftText` | text | conditionnel | mode = split | Colonne gauche statique (extrait script) |
| `hotspots` | array | conditionnel | mode = screenshot | Annotations chiffrées sur le screenshot |
| `sequenceImages` | array (exactement 4) | conditionnel | mode = sequence | 4 vignettes raccord côte à côte |

### Règles de validation côté Sanity

- `beforeImage.alt` : **requis** dès qu'on uploade une image (a11y critique).
- `title` : 80 max ; en pratique vise 30 (les H3 cassent au-delà).
- `shortDescription` : 180 max ; vise 130 (3 lignes sur desktop, 5 sur mobile).
- `beforeLabel` / `afterLabel` : 24 max ; vise 18 (capitales Anton dans un cartouche).
- `caption` : 120 max ; vise 80 (ligne mono unique).
- `mode = video` → au moins `url` OU `file` doit être fourni.
- `mode = sequence` → `sequenceImages` doit avoir **exactement 4 items**.
- `mode = screenshot` → au moins `afterImage` requis.
- `mode = split` → `splitLeftText` ET `afterImage` requis.

---

## 3. Règles UX admin simples

### 3.a. Groupes + visibilité conditionnelle = 0 friction

Le secret pour éviter l'usine à gaz : **les champs des modes pro ne s'affichent
que si on les sélectionne**. Concrètement, dans le schéma :

```ts
defineField({
  name: "splitLeftText",
  title: "Texte colonne gauche",
  type: "text",
  hidden: ({ parent }) => parent?.mode !== "split",
})
```

Résultat côté admin : un editor qui crée une capacité en `mode: comparator` (le
défaut, le cas standard) ne **voit jamais** les champs vidéo / hotspots /
sequence. L'écran reste épuré.

### 3.b. Ordre logique des champs dans le formulaire

Sanity respecte l'ordre de déclaration. Recommandation :

```
1. title              ← ce qu'on remplit en premier
2. slug               ← auto-généré, on touche rarement
3. phase              ← radio, 1 clic
4. order              ← spin-box
5. featured           ← case à cocher
6. hidden             ← case à cocher
7. shortDescription   ← le texte qu'on travaille le plus
8. mode               ← détermine la suite
9. beforeImage / afterImage / beforeLabel / afterLabel / caption
10. (champs modes pro, conditionnels)
11. icon              ← optionnel, en bas
12. longDescription   ← rare, en dernier
```

### 3.c. Preview de l'item dans le studio

À enrichir pour que la liste de capacités soit lisible :

```ts
preview: {
  select: {
    title: "title",
    phase: "phase",
    order: "order",
    featured: "featured",
    hidden: "hidden",
    media: "afterImage",   // ← preview montre l'image "après" en miniature
  },
  prepare: ({ title, phase, order, featured, hidden, media }) => ({
    title: `${order ?? "—"} · ${title}${featured ? "  ★" : ""}${hidden ? "  ◌" : ""}`,
    subtitle: phase ? phase.replace("-", " ") : "—",
    media,
  }),
}
```

→ La liste affiche `01 · Décors — avant / après ★`, miniature à gauche,
phase en sous-titre. Charly voit en un coup d'œil ce qui est featured (★) et
masqué (◌).

### 3.d. Structure de navigation Sanity (`structure.ts`)

Recommandation : créer un groupe **"Capacités"** dans la sidebar du studio,
trié par défaut sur `order asc`, avec deux sous-listes :
- **Publiées** (filtre `hidden == false`)
- **Masquées** (filtre `hidden == true`)

C'est 10 lignes dans `structure.ts`. Charly reste dans son flow éditorial sans
avoir à scroller dans une liste mélangée.

### 3.e. Champ image — recommandations dimensions

À écrire en aide (`description: "..."`) sur chaque champ image :

| Champ | Format | Min | Reco | Ratio |
|-------|--------|-----|------|-------|
| `beforeImage` | JPEG / WEBP | 1920×1080 | **2400×1350** | 16:9 (ciné classique) ou 21:9 (ciné large) |
| `afterImage` | idem | idem | idem | idem |
| `icon` | PNG / SVG | 240×240 | 480×480 | 1:1 (carré) |
| `video.poster` | JPEG | 1920×1080 | 2400×1350 | 16:9 |
| `sequenceImages[]` | JPEG | 800×450 | 1200×675 | 16:9 |

**Hotspot Sanity activé** sur toutes les images → l'editor définit le point de
focus et le crop responsive ne coupe jamais le sujet.

### 3.f. Aide contextuelle (champ `description` Sanity)

Mettre une phrase d'aide sous chaque champ critique. Exemples :
- `mode` → *"Comment afficher cette capacité dans le grand slot du haut. Comparator = curseur avant/après (cas standard). Split = 2 colonnes statiques. Video = loop muet. Screenshot = capture annotée. Sequence = 4 vignettes raccord."*
- `beforeImage` → *"Image AVANT (état brut, source). Affichée à gauche du curseur. Min 1920×1080, idéal 2400×1350. Hotspot recommandé."*
- `afterImage` → *"Image APRÈS (résultat IA). Affichée à droite du curseur. Mêmes spécs que avant."*
- `beforeLabel` / `afterLabel` → *"2-3 mots en CAPITALES, ex: DÉCOR BRUT / PROJECTION IA. Affiché en cartouche dans l'image."*
- `caption` → *"Ligne mono sous le slot. Ex: ↳ Declics S2 (Inevitable, ARTE). Sert de crédit / contexte."*
- `featured` → *"Coche cette case pour afficher cette capacité au chargement de la page. Une seule capacité devrait être featured à la fois."*

---

## 4. Capacités à créer au départ

Mapper sur les 8 capacités validées dans `UX-capacities-interactive.md` §4-6.
Tu crées **8 documents `capacity`** dans Sanity avec ces valeurs (les textes sont
ceux de la note UX §6, déjà calibrés) :

| order | featured | mode | title | slug | phase | beforeLabel | afterLabel |
|-------|----------|------|-------|------|-------|-------------|------------|
| 1 | ✅ true | comparator | Décors — avant / après | `decors-avant-apres` | prepa-prod | DÉCOR BRUT | PROJECTION IA |
| 2 | — | comparator | Plan complet. Sans retour plateau. | `plans-ia-inseres` | tournage-hybride | RUSH BRUT | PLAN IA INTÉGRÉ |
| 3 | — | comparator | Mille figurants. Zéro logistique. | `foule-figuration` | tournage-hybride | DÉCOR VIDE | FOULE IA |
| 4 | — | comparator | Le temps qu'il vous faut. | `meteo-ambiance` | tournage-hybride | JOUR NEUTRE | GOLDEN HOUR |
| 5 | — | comparator | VFX sans friction. | `vfx-ia` | post-prod | PLAN SOURCE | VFX INTÉGRÉ |
| 6 | — | comparator | Look final. Norme livraison. | `etalonnage-conformite` | post-prod | RUSH SOURCE | MASTER CONFORME |
| 7 | — | comparator | Profondeur HDR. Par défaut. | `hdr-32-bits` | post-prod | 8 BITS LDR | 32 BITS HDR |
| 8 | — | comparator | Moodboards à la seconde. | `moodboards-da` | prepa-prod | RÉFÉRENCES BRUTES | PLANCHE STYLISÉE |

**Phase 2** (modes pro), à créer plus tard quand assets disponibles :

| order | mode | title | slug | phase | particularité |
|-------|------|-------|------|-------|---------------|
| 9 | split | Du script à la planche. | `storyboards-auto` | prepa-prod | `splitLeftText` = extrait scénario |
| 10 | video | Animatic. En une nuit. | `animatic` | prepa-prod | `video.file` ou `video.url` |
| 11 | screenshot | Outils par corps de métier. | `apps-metier` | transverse | 4 hotspots numérotés |
| 12 | sequence | Raccord verrouillé. | `continuite` | transverse | `sequenceImages` exactement 4 |

→ **Stratégie de remplissage** : commence par les 4 capacités pour lesquelles tu
as déjà les visuels (probablement Décors, Plans IA, Étalonnage, Moodboards), tu
publies. Les 4 autres restent en `hidden: true` jusqu'à ce que tu aies les
images. Le front gère la grille de 4 ou 8 sans changer une ligne de code.

---

## 5. Risques à éviter

| # | Risque | Mitigation |
|---|--------|-----------|
| 1 | **Schéma trop riche** dès le départ → editor perdu, formulaire de 30 champs | `groups` + `hidden: ({ parent }) => …` réduit l'écran à 5-7 champs visibles à la fois selon le mode. |
| 2 | **Image manquante** publiée par erreur → grosse zone blanche en prod | Validation `Rule.required()` conditionnelle au mode + fallback gradient (cf. existant) si la query Sanity renvoie une image absente. |
| 3 | **`alt` text oublié** sur les images → fail WCAG | Ajouter `alt` comme champ requis du sous-document `image` (c'est un schéma custom à 5 lignes, on factorise). |
| 4 | **Plusieurs `featured: true`** → le front doit choisir | Documenter dans l'aide du champ + côté front : prendre le 1er publié dans `order asc, _createdAt asc`. |
| 5 | **Drift entre fallback local et Sanity** | Garder `FALLBACK_CAPACITIES` (`src/lib/content-fallback.ts`) **synchronisé** : à chaque ajout de capacité Sanity, mettre à jour le fallback. C'est une règle d'hygiène, pas une contrainte technique. |
| 6 | **Suppression accidentelle** d'une capacité (clic Delete dans le studio) | Sanity garde l'historique 14 jours. Plus sûr : utiliser `hidden: true` à la place de Delete. À documenter dans une mini-doc admin. |
| 7 | **Vidéo trop lourde** uploadée dans Sanity (assets payants) | Préférer Vimeo unlisted (champ `video.url`) plutôt que `video.file` pour les vidéos > 5 Mo. Aide texte explicite. |
| 8 | **Hotspots qui dérivent au responsive** | Stocker les coordonnées en `%` (xPct, yPct) — pas en pixels. Le front les calque sur l'image redimensionnée. |
| 9 | **Re-traduction de l'enum `phase`** entre code et CMS | Source unique : le schéma. Le `PHASE_LABEL` côté front est dérivé d'un export du schéma (un fichier `phases.ts` partagé). Aujourd'hui c'est dupliqué — à corriger dans la mission code. |
| 10 | **Pas d'environnement de preview** : un editor publie et casse la prod | Activer **Sanity Presentation** (preview live dans le studio) pour cette section. Un peu plus de boulot front mais sauve la vie. Mission séparée si besoin. |

---

## 6. Décisions à acter avant MISSION.md d'implémentation

| Question | Reco |
|----------|------|
| a) On **étend** `capacity` existant ou on crée un type séparé `capacityComparator` ? | **Étendre** — diff minimal, aucun fork de données. Les anciennes capacités passent automatiquement en mode `comparator` avec image vide → fallback gradient (donc pas de casse en prod). |
| b) On ajoute le champ `hidden` ? | **Oui** — pratique pour soft-delete. |
| c) Le `featured` est un booléen libre ou une seule case "épingle" globale ? | **Booléen libre** — simple. La règle "1 seul" est gérée par le front (1er trouvé). |
| d) Les modes pro (video/split/screenshot/sequence) sont dans cette mission ou plus tard ? | **Plus tard** — la mission CMS #1 livre les 6 nouveaux champs strictement nécessaires au comparateur. Les modes spéciaux = mission CMS #2 (quand assets dispo). |
| e) On crée un schéma `imageWithAlt` réutilisable pour forcer le alt text ? | **Oui** — 5 lignes, factorise pour les 4 schemas qui ont des images. |
| f) Sanity Presentation (live preview) maintenant ou plus tard ? | **Plus tard** — confort éditorial, pas bloquant. Mission séparée. |

---

## 7. Plan de séquencement (vue d'ensemble)

Pour ne pas tout faire d'un coup et garder des PR courtes :

```
[Mission CMS #1]  Étendre capacity + 6 champs comparateur + featured + hidden
                  → migration data : ajouter manuellement les images sur les
                    8 capacités existantes via le studio
                  → front continue d'utiliser FALLBACK_CAPACITIES en attendant

[Mission UX #1]   Implémenter l'interactivité (cf. UX-capacities-interactive.md)
                  consume `featured`, `beforeImage`, `afterImage`, `beforeLabel`,
                  `afterLabel`, `caption` depuis Sanity, fallback sur gradients
                  si vide

[Mission CMS #2]  Ajouter les modes pro (video, split, screenshot, sequence)
                  → schéma + UI admin

[Mission UX #2]   Implémenter les 4 modes pro côté front
                  → composants Comparator, Split, VideoLoop, ScreenshotAnnotated,
                    SequenceStrip

[Mission CMS #3]  Activer Sanity Presentation (live preview studio)
```

Ce séquencement respecte la règle 1 (1 mission = 1 PR), évite les big-bang
schéma + front en même temps, et te permet de fournir les images au fur et à
mesure sans bloquer le code.
