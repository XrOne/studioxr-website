# UX / DA — Section Capacités interactive

> **Type** : note de spec UX, pas une mission code.
> **Statut** : à valider par Charly avant rédaction du MISSION.md d'implémentation.
> **Périmètre** : `src/components/Capacities.tsx` + `src/components/BeforeAfterSlider.tsx` (read-only, on lui passe juste des props).

---

## 0. Résumé exécutif

La grille capacités du bas devient la télécommande du comparateur du haut.
Une seule capacité active à la fois. Le comparateur reste plein largeur, immuable
en hauteur et position : seul son **contenu** change (titre, sous-titre, images,
labels, caption). La grille reste sobre et lisible — elle n'attire l'œil que par
l'état actif, pas par des effets.

Principe directeur : **le visiteur scanne la grille, choisit, voit la
transformation. Tout en moins de 500 ms perçues.**

---

## 1. Placement UX (titre, sous-titre, labels avant/après)

État actuel à conserver, avec ajustements minimes :

```
┌────────────────────────────────────────────────────────────┐
│  CAPACITÉS · 01                                  (eyebrow) │
│                                                            │
│  UNE BOÎTE                                                 │
│  À OUTILS                                                  │
│  POUR LA PROD.                                  (H2 fixe)  │
│                                                            │
│  Une capacité IA par corps de métier. Pas un de plus.      │
│  Pas un de moins.                              (sous-H2 fixe)
│                                                            │
│  ┌────────────────────────────┐                            │
│  │ FEATURED · PRÉPA PROD       │  ← chip change avec       │
│  └────────────────────────────┘     l'item actif (phase)   │
│                                                            │
│  DÉCORS — AVANT / APRÈS.                       (H3 dynamique)
│                                                            │
│  Photo du décor brut. Projection IA finalisée. L'équipe    │
│  valide la mise en scène avant de poser un seul rideau.    │
│                                                  (P dynamique)
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ [BRUT]                                  [FINAL]     │  │
│  │                                                     │  │
│  │            « gros comparateur 560 px »              │  │
│  │                                                     │  │
│  │            ⇄ glissez le séparateur                  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ↳ caption · contexte projet                  (mono dynam.)│
│                                                            │
│  ┌──────┬──────┬──────┬──────┐                             │
│  │ 01   │ 02   │ 03 ✓ │ 04   │                             │
│  │ DÉC. │ STB. │ ANIM │ PLAN │   ← grille télécommande     │
│  ├──────┼──────┼──────┼──────┤                             │
│  │ 05   │ 06   │ 07   │ 08   │                             │
│  └──────┴──────┴──────┴──────┘                             │
└────────────────────────────────────────────────────────────┘
```

### Règles de placement

| Élément | Comportement | Pourquoi |
|---------|--------------|----------|
| H2 + sous-H2 (section title) | **Statique** | Ce sont les "racines" de la section, pas l'item actif. |
| Chip `FEATURED · {phase}` | **Dynamique** (phase de l'item actif) | Donne le contexte métier du sujet courant. |
| H3 (titre item) | **Dynamique** | Doit être lu d'abord par les screen readers à chaque switch. `aria-live="polite"`. |
| Paragraphe sous H3 | **Dynamique** (sous-titre) | Donne le bénéfice métier en 2 lignes max. |
| Comparateur (slot) | **Hauteur fixe 560 px desktop / 360 px mobile**, contenu remplacé | Évite les sauts de mise en page. |
| Labels comparateur (`beforeLabel`, `afterLabel`) | **Dynamiques**, format court | "DÉCOR BRUT" / "PROJECTION IA" — 2-3 mots max, capitales Anton. |
| Badge corail in-image (haut-droite) | **Statique de TYPE** (ex. "PLAN CINÉMA"), peut changer si pertinent | Sceau de finition. |
| Caption mono (sous le slider) | **Dynamique** | Crédite la production / contextualise. |
| Grille capacités | Statique en structure, **état actif** dynamique | C'est la télécommande. |

### Mobile (< 768 px)

- Stack vertical : H2 → comparateur → grille (2 colonnes).
- Comparateur 360 px de haut.
- Le clic carte fait un **scroll automatique smooth** jusqu'au top du comparateur (`scrollIntoView({ behavior: 'smooth', block: 'start' })`) — sinon le visiteur ne voit pas la transition.
- Sur la grille mobile, chaque carte affiche en plus une **micro-vignette 60×40 px** de l'image "après" (icône visuelle) pour anticiper le résultat avant le clic.

---

## 2. État visuel de la carte active

Quatre états par carte : `idle`, `hover`, `focus-visible`, `active`.

| État | Fond | Bordure | Numéro mono | Titre H4 | Texte muted | Indicateur |
|------|------|---------|-------------|----------|-------------|------------|
| **idle** | `#fff` | `1px solid var(--line)` (existant) | `var(--lagon)` | `var(--fg)` | `var(--muted)` | — |
| **hover** | `#fff` | bordure passe à `var(--anse)` (1px) | inchangé | inchangé | inchangé | underline subtle sur le titre, transition 150 ms |
| **focus-visible** | `#fff` | `outline 2px var(--corail)` à `2px d'offset` | inchangé | inchangé | inchangé | accessibilité — anneau corail visible sans hover |
| **active** | `var(--abysse)` | `2px solid var(--corail)` | `var(--anse)` | `var(--air)` | `rgba(248,251,252,0.72)` | barre verticale corail 4 px à gauche + chevron `→` discret en haut-droite |

Le contraste **active vs idle** doit être franc — c'est la carte qui dit "moi je suis ce que tu vois en haut". Inverser fond clair/sombre fait ce travail sans gadget.

### Aria

- Toute la grille = `role="tablist"`, `aria-label="Capacités IA"`.
- Chaque carte = `role="tab"`, `aria-selected={isActive}`, `aria-controls="capacities-comparator"`.
- Le comparateur = `id="capacities-comparator"`, `role="tabpanel"`, `aria-labelledby={activeTabId}`, `aria-live="polite"` sur le bloc titre+sous-titre du dessus pour annoncer les changements de contenu.
- Le slider lui-même garde son `role="slider"` actuel (ne pas le casser).
- Tab navigation : `Tab` pour entrer dans la grille → flèches `←/→/↑/↓` pour naviguer entre cartes (pattern WAI-ARIA tabs), `Enter` ou `Space` pour activer (auto-activation au focus = optionnel, je recommande **manual activation** pour ne pas spammer le screen reader).

---

## 3. Règles d'animation (sobres)

**Doctrine** : aucune animation décorative. Chaque animation existe pour
**masquer un changement de contenu** ou **accuser réception du clic**.

| Élément | Transition | Durée | Easing | Note |
|---------|-----------|-------|--------|------|
| Carte idle ↔ hover | `border-color` | 150 ms | `ease-out` | Pas de transform. |
| Carte → active | `background`, `border`, `color` | 220 ms | `cubic-bezier(.2,.8,.2,1)` | La barre corail à gauche apparaît avec `transform: scaleY(0→1)` 220 ms `ease-out`. |
| Titre H3 + sous-titre du comparateur (zone texte) | `opacity` 1→0 puis 0→1 + `translateY 0→6px→0` | 180 ms aller, 180 ms retour | `ease-in-out` | Petit fade-up, pas de slide horizontal. |
| Images comparateur (`before` / `after`) | crossfade `opacity` | 240 ms | `ease-in-out` | Au switch, on remet `pct = 50` instantanément (pas d'animation du séparateur). |
| Caption mono | crossfade simple | 180 ms | `ease-in-out` | Synchro avec les images. |
| Chip `FEATURED · {phase}` | crossfade simple | 180 ms | — | |
| Scroll mobile vers comparateur | `scrollIntoView smooth` natif | — | — | Une fois, au clic carte. |

**Interdits** :
- ❌ Transformations 3D, parallax, blur transition, rotations, échelle de carte au hover.
- ❌ Auto-rotation des capacités. C'est le visiteur qui pilote.
- ❌ Effet "carrousel" (slide horizontal du comparateur).
- ❌ Haptic / sons.

**Bonus** :
- `prefers-reduced-motion: reduce` → toutes les transitions tombent à 0 ms sauf l'`opacity` (qu'on garde à ~80 ms pour ne pas faire un flash brutal). Le `scrollIntoView` passe en `auto`.

---

## 4. Capacités à GARDER en comparateur avant/après

Critère de tri : la transformation est-elle **lisible en image fixe juxtaposée** ?

✅ **Oui — comparateur image vs image idéal** :

| # | Capacité | Phase | Pertinence avant/après |
|---|----------|-------|------------------------|
| 1 | **Décors — avant / après** | prépa-prod | ★★★★★ (cas d'école) |
| 2 | **Plans IA insérés** | tournage hybride | ★★★★★ (rush brut → plan augmenté) |
| 3 | **Plans de foule / figuration** | tournage hybride | ★★★★★ (lisible instantanément) |
| 4 | **Météo / ambiance** | tournage hybride / post | ★★★★☆ (très visuel, magique) |
| 5 | **VFX IA** | post-prod | ★★★★☆ (selon plan, certains délicats) |
| 6 | **Étalonnage / conformité** | post-prod | ★★★★☆ (subtil mais lisible si plans bien choisis) |
| 7 | **HDR 8 → 32 bits** | post-prod | ★★★☆☆ (visible si capture HDR-aware côté affichage — sinon mock visuel : pousser hautes lumières et ombres) |
| 8 | **Moodboards & DA** | prépa-prod | ★★★★☆ (planche brute → planche stylisée IA) |

→ **8 cartes en comparateur**. C'est la limite haute pour ne pas saturer la grille (4×2 desktop, 2×4 mobile).

---

## 5. Capacités à TRAITER AUTREMENT

Certaines capacités du brief actuel ne **gagnent rien** à un slider statique. Pour
celles-ci, on garde l'item dans la grille mais le comparateur passe en mode
spécial (même slot, contenu différent) :

| Capacité | Pourquoi pas le slider | Solution alternative dans le slot |
|----------|------------------------|-----------------------------------|
| **Storyboards auto** | "Avant" = texte/script, pas une image — peu photogénique. | Slot spécial : à gauche un extrait de scénario en mono sur fond Abysse, à droite une planche storyboard 4 cases. Pas de slider, juste un split fixe. |
| **Animatics** | Animation = nature dynamique, slider statique perd 80 % du sens. | Slot spécial : vidéo MP4 muette, autoplay au switch UNIQUEMENT (`<video muted playsinline loop preload="metadata">`), 4-6 sec, sous 2 Mo. Bouton pause discret. |
| **Apps métier** | C'est un produit logiciel, pas une transformation. | Slot spécial : screenshot UI (capture Cinemia / Jenial) avec 2-3 hotspots numérotés qui annotent les fonctions clés. |
| **Continuité** | Concerne la cohérence INTER-plans (look character, raccord costume…), pas la transformation d'un plan. | Slot spécial : 4 vignettes en ligne ("plan 12 / 13 / 14 / 15") avec un sceau "RACCORD VALIDÉ" en corail. Démontre la consistance. |

→ Le composant final doit donc accepter **deux modes** dans le slot du haut :

```
mode: "comparator"  → BeforeAfterSlider classique (déjà existant)
mode: "split"       → 2 colonnes statiques (storyboards)
mode: "video"       → loop court (animatics)
mode: "screenshot"  → image annotée (apps métier)
mode: "sequence"    → 4 vignettes raccord (continuité)
```

C'est plus de boulot front qu'un simple slider, **mais** c'est la seule façon de
ne pas mentir avec un slider qui n'a pas de sens. Recommandation : **phaser** —
livrer en mission #1 les 8 capacités en mode `comparator` (cf. §4), puis ajouter
les autres modes en missions séparées au fur et à mesure des assets disponibles.

---

## 6. Textes exemple par capacité

Format pour chaque capacité : **chip phase** · **H3 titre** · **paragraphe sous-titre (≤ 30 mots, anti-buzzword)** · **labels avant/après (2-3 mots, capitales)** · **caption mono (crédit / contexte)**.

### 1. Décors — avant / après

- Chip : `FEATURED · PRÉPA PROD`
- Titre : `DÉCORS — AVANT / APRÈS.`
- Sous-titre : *Photo de repérage à gauche. Décor habillé par projection IA à droite. Le réalisateur, le chef déco et le chef op valident la mise en scène avant la première lecture chefs de poste.*
- Labels : `DÉCOR BRUT` / `PROJECTION IA`
- Caption : `↳ glissez le séparateur · Declics S2 (Inevitable, ARTE)`

### 2. Plans IA insérés

- Chip : `TOURNAGE HYBRIDE`
- Titre : `PLAN COMPLET. SANS RETOUR PLATEAU.`
- Sous-titre : *Le plan manque au montage. On le génère cohérent avec le rush, intégré au décor et à la lumière. Pas de retake. Pas de calendrier qui glisse.*
- Labels : `RUSH BRUT` / `PLAN IA INTÉGRÉ`
- Caption : `↳ glissez · plan complémentaire IA — projet client (NDA)`

### 3. Plans de foule / figuration

- Chip : `TOURNAGE HYBRIDE`
- Titre : `MILLE FIGURANTS. ZÉRO LOGISTIQUE.`
- Sous-titre : *Décor vide à gauche. Foule, bataille ou public à droite. Densité, lumière et mouvement contrôlés sans bus de figurants ni régisseur foule.*
- Labels : `DÉCOR VIDE` / `FOULE IA`
- Caption : `↳ glissez · scène de foule générée — référence Declics S2`

### 4. Météo / ambiance

- Chip : `TOURNAGE HYBRIDE`
- Titre : `LE TEMPS QU'IL VOUS FAUT.`
- Sous-titre : *Pluie, brume, golden hour, nuit. Vous tournez quand l'équipe est dispo, vous décidez de l'ambiance après. Le DIT n'attend plus le ciel.*
- Labels : `JOUR NEUTRE` / `GOLDEN HOUR`
- Caption : `↳ glissez · transformation météo IA, pipeline Cinemia`

### 5. VFX IA

- Chip : `POST-PROD`
- Titre : `VFX SANS FRICTION.`
- Sous-titre : *Plan source à gauche. Effet intégré à droite — explosion, destruction, créature, projection. Itération en heures, pas en semaines.*
- Labels : `PLAN SOURCE` / `VFX INTÉGRÉ`
- Caption : `↳ glissez · VFX IA — démo interne`

### 6. Étalonnage / conformité

- Chip : `POST-PROD`
- Titre : `LOOK FINAL. NORME LIVRAISON.`
- Sous-titre : *De l'image source au master conforme diffuseur. ARTE, Netflix, broadcast. Référence colorimétrique respectée, look réalisateur préservé.*
- Labels : `RUSH SOURCE` / `MASTER CONFORME`
- Caption : `↳ glissez · étalonnage assisté IA — Declics S2`

### 7. HDR 8 → 32 bits

- Chip : `POST-PROD`
- Titre : `PROFONDEUR HDR. PAR DÉFAUT.`
- Sous-titre : *Image 8 bits à gauche, version 32 bits à droite. Hautes lumières et ombres récupérées sans cramer, sans boucher. Source-prête pour HDR10 / Dolby Vision.*
- Labels : `8 BITS LDR` / `32 BITS HDR`
- Caption : `↳ glissez · pipeline HDR XR-ONE — référence interne`

### 8. Moodboards & DA

- Chip : `PRÉPA PROD`
- Titre : `MOODBOARDS À LA SECONDE.`
- Sous-titre : *Brief texte ou références éparses à gauche. Planche stylisée cohérente à droite — ambiance, palette, composition. Le réalisateur valide une DA en une réunion, pas en cinq.*
- Labels : `RÉFÉRENCES BRUTES` / `PLANCHE STYLISÉE`
- Caption : `↳ glissez · moodboard IA — pipeline Jenial`

---

### Variantes traitées autrement (cf. §5)

#### A. Storyboards auto (mode `split`)

- Chip : `PRÉPA PROD`
- Titre : `DU SCRIPT À LA PLANCHE.`
- Sous-titre : *À gauche, l'extrait du scénario. À droite, le storyboard 4 cases généré, raccordé, prêt à présenter au chef op.*
- Labels colonne G : `EXTRAIT SCRIPT` / colonne D : `STORYBOARD GÉNÉRÉ`
- Caption : `↳ découpage technique illustré — pipeline Cinemia`

#### B. Animatics (mode `video`, loop muet 4-6 s)

- Chip : `PRÉPA PROD`
- Titre : `ANIMATIC. EN UNE NUIT.`
- Sous-titre : *Le storyboard prend mouvement. Timing, raccords, sound temp. La production lit le film avant le premier jour de tournage.*
- Pas de labels avant/après (vidéo plein cadre).
- Caption : `↳ animatic généré — référence Cinemia`

#### C. Apps métier (mode `screenshot` annoté)

- Chip : `TRANSVERSE`
- Titre : `OUTILS PAR CORPS DE MÉTIER.`
- Sous-titre : *Un assistant prompt pour la scripte. Une timeline pour le monteur. Un dogma manager pour le chef op. Construits avec eux, pas pour eux.*
- Hotspots à annoter sur le screenshot Jenial / Cinemia : `① Assistant prompt`, `② Timeline pro`, `③ Dogma manager`, `④ Character bank`.
- Caption : `↳ pile logicielle Jenial · jenial.app`

#### D. Continuité (mode `sequence`, 4 vignettes en ligne)

- Chip : `TRANSVERSE`
- Titre : `RACCORD VERROUILLÉ.`
- Sous-titre : *Personnage, costume, lumière, décor : la cohérence inter-plans est tenue par le pipeline. Plus de surprise au montage.*
- Sceau corail : `RACCORD VALIDÉ` superposé en haut-droite des 4 vignettes.
- Caption : `↳ continuité IA · 4 plans consécutifs · projet client (NDA)`

---

## 7. Décisions à prendre avant MISSION.md d'implémentation

Pour pouvoir cadrer la mission code, il me faut tes choix sur :

| Question | Options | Reco |
|----------|---------|------|
| a) On part en **2 missions** (mode `comparator` seul, puis modes spéciaux plus tard) ou **1 mission** complète d'un coup ? | 1 / 2 missions | **2 missions** — livrer vite, valider l'UX, puis enrichir. |
| b) L'**état initial** au chargement = item 1 (Décors) ou un item au hasard ? | item 1 / random | **Item 1** (Décors) — c'est le cas d'école, et c'est ce qu'on a déjà. |
| c) Activation au **focus clavier** (immédiate) ou au **Enter/Space** (manuelle) ? | auto / manuelle | **Manuelle** — moins de bruit pour les screen readers, pattern WAI-ARIA recommandé. |
| d) Au switch de carte, on **scroll auto** vers le comparateur sur mobile ? | oui / non | **Oui sur mobile uniquement**, jamais sur desktop. |
| e) Source des **images** : Sanity CMS, fichiers `public/images/capacities/`, ou CDN externe ? | Sanity / public/ / CDN | **`public/images/capacities/`** pour la mission #1 (rapide, pas de drift Sanity). Migration Sanity = mission séparée. |
| f) Couples d'images **réels** dispos par capacité ? Ou on commence avec des placeholders gradient (comme aujourd'hui) ? | réels / placeholders | À toi de me dire — sans images réelles, on partira sur les gradients existants pour la mission code, et tu fourniras les vrais visuels au fur et à mesure. |

---

## 8. Risques / vigilances

1. **Saut visuel au switch** si la hauteur du paragraphe sous-titre varie. → fixer un `min-height` cohérent (~ 5 lignes de body 17px).
2. **Latence des images** : précharger les 8 paires "after" en `<link rel="preload" as="image">` (ou plus tabou, en JS au mount). Sinon, premier clic = flash blanc.
3. **`pct` du séparateur** : doit retomber à 50 à chaque switch. Sinon le visiteur clique "Plans IA" et voit 92 % de "before" — il rate la démo.
4. **Charge cognitive** : 8 cartes c'est déjà beaucoup. Au-delà, il faut un filtre par phase (chips Prépa / Tournage / Post). Pour la mission #1 on reste à 8 sans filtre.
5. **A11y régression** : ne PAS supprimer les flèches du clavier sur le slider (`ArrowLeft`/`Right`). Ce sont DEUX systèmes de touches qui coexistent (grille = flèches pour navigation tabs ; comparateur = flèches pour pct du slider) — la séparation se fait par le focus.
