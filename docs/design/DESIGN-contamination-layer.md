# DESIGN — Analog Thriller Contamination Layer

> Système visuel et motion subliminal pour le site Studio Jenial.
> Référence d'usage : couche ponctuelle, pas charte globale.

**Verdict** : GO WITH LIMITS
**Statut** : spec design — pas encore en implémentation
**Auteur** : design-review-agent (Cowork)
**Date** : 2026-05-17

---

## 1. Audit de pertinence — Studio Jenial

### Contexte
Studio Jenial vend de la production audiovisuelle assistée par IA. Le site
doit faire deux choses simultanément :
- rassurer un commanditaire (réalisateur, prod exécutive, agence pub) sur la
  rigueur de l'outil
- donner un signal d'appartenance cinéma fort, à un public qui détecte les
  faux studios "GenAI" en moins de 5 secondes

Le ton éditorial est déjà tranché en mémoire : provoc maîtrisée
Aronofsky/Fincher/Park/De Palma/Levinson/Gilligan. Pas trash, pas TikTok.

### Pourquoi un contamination layer est pertinent
1. **Différenciation contre les agences IA SaaS**. La concurrence (genario,
   les wrappers OpenAI, les studios IA sans pedigree) communique en gradient
   violet, bento glossy, animations Framer Motion par défaut. Le terrain
   "analog thriller" est désert dans le secteur.
2. **Cohérence avec l'héritage XR-ONE et le ton cinéphile**. Onze ans à
   manipuler les outils → un site qui montre des accidents de pellicule et
   des marques de labo dit "on est du métier".
3. **Subliminalité = sophistication**. Une couche que le visiteur ressent
   mais ne nomme pas est lue comme "studio cinéma sérieux". Une couche
   visible et nommable est lue comme "effet After Effects".

### Pourquoi des limites sont nécessaires
1. **Risque conversion**. Le site est aussi un tunnel commercial. Une page
   contact ou un formulaire qui scintille = chute du taux de conversion.
2. **Risque cohérence terminologie**. La mémoire dit "pré-prod / tournage /
   post-prod" stricts. Une couche forensic mal calibrée évoque la criminologie,
   pas le cinéma. Il faut tenir les références dans le champ ciné, jamais
   dans le champ true-crime.
3. **Risque accessibilité**. WCAG, prefers-reduced-motion, contraste. Tout
   scintillement < 3 Hz est obligatoire, pas optionnel.
4. **Risque sloppy**. C'est exactement le type de système qui dégénère en
   "VHS preset" si chaque dev ajoute "une petite touche". Doit être figé
   dans un module unique, contrôlé par un seul fichier de réglages.

---

## 2. Trois directions visuelles

### Direction A — FILM STOCK CONTAMINATION *(recommandée comme socle)*
Pellicule 35mm vieillie comme matière première : perforations partielles,
leader academy countdown, dust, hair-in-gate, scratches verticaux, halation,
edge fog.

**Pourquoi en socle** : c'est la grammaire la plus "cinéma" pure. Tout le
monde du métier la lit immédiatement. Faible risque de basculer ailleurs.
Pas d'équivoque true-crime.

### Direction B — FORENSIC ARCHIVE *(en accent ponctuel, manifeste uniquement)*
Tampons labo, numéros d'archives, coordonnées GPS dégradées, micro-typo de
protocole, scans abîmés, frappes typewriter datées.

**Risque** : peut basculer en HUD sci-fi ou en true-crime documentaire. À
utiliser uniquement sur les zones éditoriales du manifeste, jamais en
décoration de page produit ou de contact.

### Direction C — OPTICAL PRINTER ACCIDENTS *(en transition verticale)*
Double exposition, flashes blancs accidentels, gate weave, mauvais
registration RGB sub-pixel, hauts contrastes brûlés, frames fantômes.

**Risque** : peut basculer en glitch TikTok si la fréquence dépasse 1 event
par 20s. À réserver aux transitions verticales lentes entre sections
éditoriales.

### Recommandation finale
**A en socle (texture permanente très atténuée), B + C en inserts ponctuels.**

Pondération budget visuel :
- A : 70 % (grain + dust + halation permanents, opacité ≤ 8 %)
- B : 20 % (tampons / labels / typewriter, 3 occurrences max par page)
- C : 10 % (1 insert single-frame par grande section visitée)

---

## 3. Moodframes (8 frames de référence à produire en moodboard)

1. **Generic Se7en — leader academy**
   Cadre noir, perforations 35mm latérales fines, countdown "3" gros chiffre
   blanc dégradé en haut à gauche, scratches verticaux, fond aplat charbon.

2. **Forensic photo dégradée**
   Photo de plateau extrême gros plan désaturée, surimposée par tampon
   "FILE 04—09.34.12.045", coin corné, traces de scotch translucide, micro-
   texte illisible en bas à droite.

3. **Hair-in-gate**
   Plan urbain nuit en arrière-plan, cheveu flou hyper-net en superposition
   verticale au tiers gauche du cadre, halation orange sodium ponctuelle dans
   le coin supérieur droit.

4. **Double exposition optique**
   Visage en gros plan + paysage transparent à 18 % en surimpression, edge
   fog rouge fané, scratches diagonaux ténus.

5. **Contact sheet**
   Grille 3×3 de plans en négatif dégradé, encadrés par numéros séquence
   gravés (01 02 03...), marques rouges manuelles type Sharpie sur 2 frames
   approuvées, micro-typo en bas de planche.

6. **Optical printer flash**
   Frame brûlée pleine page blanc cassé pendant 1 frame, suivie de la
   composition normale. Pas plus.

7. **Gate weave**
   Cadre photo qui respire latéralement et verticalement de 1-2 px à 24 fps,
   imperceptible mais inconfortable.

8. **Photocopie générationnelle**
   Texte éditorial photocopié 4 fois, contours dégradés, blancs sales, points
   de chimie noirs aléatoires.

---

## 4. Système de symboles

| Symbole | Usage | Densité max |
|---|---|---|
| Croix de centrage caméra (+) | Coins de blocs éditoriaux clés | 2 par page |
| Mire SMPTE simplifiée (4 carrés) | Bas de section manifeste uniquement | 1 par page |
| Perforation 35mm partielle | Bord latéral d'images hero, opacité 30 % | bandeau permanent ok |
| Countdown leader (3 / 2 / 1) | Première section d'une page éditoriale | 1 par page |
| Tampon dégradé (APPROVED / FILE / 35MM / TAKE 04) | Manifeste, blocs Process | 3 par page |
| Numéro de séquence (01 / 04 / 07) | Sections numérotées du process | 1 par section |
| Dot blanc pleine frame | Insert subliminal single-frame | 1 par session navigation |
| Géométrie discrète (cercle vide / triangle) | Marges de page, opacité 6 % | 2 par page |

**Interdits** :
- Pentagrammes, yeux dans triangles, runes, croix occultes lisibles
- Logos studios cinéma existants (Universal, Paramount...)
- Symboles politiques, religieux, juridiques, médicaux
- Émojis, glyphes Apple SF Symbols, icônes Lucide visibles
- Sigles inventés "officiels-look" (FBI/CIA-like)

---

## 5. Overlays — répartition bitmap / code-only

### 5.1 Assets bitmap pré-rendus (`public/textures/contamination/`)

Générés en interne via `scripts/generate-textures.py` (reproductibles via
seeds fixes). Licence pleine Studio Jenial.

| Asset | Dimensions | Poids réel | Usage |
|---|---|---|---|
| `grain-35mm-1.webp` | 1280×720 tileable | ~87 Ko | grain permanent global, opacité 4-6 %, cycle 1/2 |
| `grain-35mm-2.webp` | 1280×720 tileable | ~92 Ko | variante anti-pattern, cycle 2/2 (3s alternance) |
| `dust-hair-1.webp` | 1920×1080 | ~30 Ko | overlay statique zones éditoriales |
| `scratches-vertical.webp` | 1920×1080 | ~17 Ko | overlay statique très ponctuel (rayures pellicule) |

**Note de dimensions** : les grains sont à 1280×720 (pas 1920×1080) car le
bruit haute fréquence compresse mal en WebP — à 4-6 % d'opacité, scalé en
CSS `background-size`, la perte de détail est invisible et le poids tient
sous la cible 100 Ko.

### 5.2 Effets code-only (pas d'asset bitmap)

| Effet | Implémentation | Pourquoi pas un asset |
|---|---|---|
| Halation 4 coins | SVG inline avec `<radialGradient>` × 4 dans `HaloCorners.tsx` | Couleur paramétrable via CSS variables, blend `mix-blend-mode: overlay`, 0 byte réseau |
| Flash frame optical printer | `<div>` plein écran `background: #f4ede4` dans `SubliminalInsert.tsx` (Phase 3) | 1 frame (16-24ms), inutile de charger un bitmap blanc cassé |

### 5.3 Blend modes attendus

- `multiply` : grain + dust
- `overlay` : halation, scratches (selon contexte)
- `screen` : flash frame
- **Interdits** : `difference`, `hue`, `color-burn` (instabilité visuelle,
  rendu différent Chrome/Firefox/Safari)

---

## 6. Inserts subliminaux

### Règle d'or
**1 insert subliminal max par session navigation, déclenché au plus tôt 8
secondes après le premier scroll, jamais au-dessus de la fold, jamais sur la
home, jamais sur les pages contact / pricing.**

### Catalogue d'inserts autorisés
1. **Flash blanc** : flash-frame.webp 100 % opacité pendant 1 frame (16-24 ms)
2. **Dot blanc** : un point 4×4 px au centre pendant 1 frame
3. **Tampon fantôme** : tampon FILE dégradé apparaît + disparaît en 80 ms,
   sans transition, position aléatoire dans une zone de safety
4. **Numéro séquence** : "FILE 04 — 09:34:12.045" en mono forensic, apparaît
   80 ms, disparaît instant. Position fixe en bas à droite

### Déclencheurs
- `IntersectionObserver` sur une section, threshold 0.5, debounce 4 s
- `requestIdleCallback` pour ne jamais bloquer
- Kill-switch via une seule constante `CONTAMINATION_ENABLED`
- Respect strict de `prefers-reduced-motion: reduce` → tous les inserts
  désactivés

### Interdits formels
- Jamais d'image reconnaissable d'œuvre existante
- Jamais de texte lisible en clair (mots, slogans, marques)
- Jamais de visage humain
- Jamais sur formulaires, CTA, footer, navigation
- Jamais de loop visible (fréquence < 1 par minute par utilisateur)

---

## 7. Système typographique

### Stack
| Rôle | Famille | Poids | Usage |
|---|---|---|---|
| Mono forensic principale | **DM Mono** (déjà dans le site) | 400 / 500 | labels, numéros, coordonnées |
| Mono dégradée accent | **JetBrains Mono** filtré CSS contrast/saturate | 400 | tampons, frappes typewriter |
| Annotation typewriter | **Special Elite** (Google Fonts) | 400 | manifeste uniquement, 2-3 occurrences max |

### Microtypo (label de laboratoire — gabarit)
```
FILE 04 / TAKE 12 / 09:34:12.045
JENIAL / DELIVERABLE 003 / REV B
35MM / 24FPS / NEG / 2026.05.17
LAT 43.7102 / LON 7.2620
```

**Règles** :
- Taille max 10 px desktop / 9 px mobile
- Letter-spacing 0.04 em
- Opacité 0.55-0.7 selon fond
- Toujours en uppercase
- Jamais centré, toujours alignement à un bord de section

### Frappe typewriter
- 1 occurrence max par page éditoriale
- Effet via animation `steps(N)` JS très court (visible 1 fois, pas en boucle)
- Texte de 30-60 caractères, citation ou marqueur de séquence, jamais slogan
  commercial

### Interdits typo
- Pas de Courier New
- Pas de Times Italic dégradé
- Pas de typo "horror" (Creepster, Nosifer, etc.)
- Pas de chiffres latins type "MDCCLXXVI"

---

## 8. Contamination lumière / projection

### Halation
Aux 4 coins des images hero uniquement. Couleur orange sodium (#9B5C2A) à
opacité 0.18 max, blend overlay, sur 8 % de la diagonale image. Pas sur
images de portrait.

### Edge fog
Bords haut et bas des images hero en gradient noir charbon 12 % → 0 % sur
40 px. Évite la sensation "bord net brut".

### Flash optical printer
Asset `flash-frame.webp` ou simple `background:#f4ede4` 100 % opacité, 1
frame (16 ms). Jamais consécutif. Toujours suivi d'un état stable d'au moins
15 secondes.

### Surexposition zonale
Effet sur images de section seulement : un halo blanc cassé (#f0e6d6) de
~15 % de la largeur image, fondu radial à 30 % opacité, position aléatoire
dans le tiers haut. Static, pas animé.

---

## 9. Texture analogique recommandée

### Grain
- Source : grain 35mm Kodak Vision 500T scanné (ou équivalent libre)
- Densité : ISO 500-800 équivalent
- Couleur : grain coloré ténu (R/G/B très légèrement décalés), pas pur N&B
- Cycle anti-pattern : 2 variantes alternées toutes les 2-4 s
- Opacité globale : 4-6 % desktop, 6-8 % mobile (compense bruit écran)

### Halation
Voir §8

### Gate weave
Translation X/Y de 0.5-1.5 px à 24 Hz simulé (via animation CSS keyframes
sur des conteneurs `<figure>` autorisés, ~200 ms cycle, steps(3))

### Registration error (chromatic)
Subtil split RGB sub-pixel de 0.5 px max sur titres H1 manifeste uniquement.
Filter CSS : `text-shadow: -0.5px 0 #ff003c, 0.5px 0 #00d4d4` à opacité 0.12.
Statique, pas animé.

### Tape / scotch
Asset SVG transparent jaunâtre (#e8dba0, opacité 0.4), bandeaux 60×24 px,
1-2 max par page éditoriale, en accent sur tampons ou photos. Subtle drop-
shadow papier.

---

## 10. Rythme motion recommandé

### Budget global
- 1 insert subliminal max / 60 s de navigation utilisateur
- 1 frame skip visible max / 30 s
- 1 gate weave actif max / page

### Timings
| Événement | Durée | Easing |
|---|---|---|
| Apparition tampon | 80 ms | `steps(3)` |
| Disparition tampon | 0 ms (cut sec) | — |
| Flash insert | 16-24 ms (1 frame à 60 Hz) | `steps(1)` |
| Gate weave cycle | 200 ms × ∞ | `steps(3)` |
| Frappe typewriter | 30-50 ms par char | `steps(1)` |
| Halation static | — (pas animé) | — |
| Grain cycle | 2-4 s entre variantes | `step-end` |

### Interdits motion
- `ease-in-out`, `ease-out-back`, `cubic-bezier()` modernes
- Durées > 400 ms
- Spring physics
- Parallax au scroll
- Fade in opacity 0 → 1
- Slide-up translateY 20 → 0
- Stagger groupé sur listes
- Loop visible (au-delà de 3 cycles évidents)

### Accessibilité (non négociable)
- `@media (prefers-reduced-motion: reduce)` → désactive **tout** motion, ne
  garde que les textures statiques (grain, dust, halation).
- Aucun scintillement > 3 Hz.
- Aucun pattern stroboscopique.
- Toutes les couches motion derrière une seule constante kill-switch.

---

## 11. Zones d'intégration autorisées

### Page `/manifeste` *(zone principale)*
- Sous le premier hero : bandeau perforation 35mm + halation aux 4 coins
- Entre sections éditoriales : 1 insert single-frame possible (8 s après
  scroll-into-view), 1 tampon FILE dégradé en bas de section
- Microtypo coordonnées sur la baseline mono déjà en place
- Gate weave subtil autorisé sur les `<figure>` du manifeste uniquement

### Page d'accueil `/`
- Grain permanent global opacité 4 % autorisé
- Halation coins images hero autorisée
- **Pas** d'insert subliminal
- **Pas** de tampon
- **Pas** de gate weave

### Sections Process / Capacités
- Numéros de séquence (01 / 04 / 07) sur les en-têtes
- Microtypo discrète en bas des cartes Capacités
- **Pas** d'insert subliminal
- **Pas** de flash

### Pages Pionniers / À propos / Héritage XR-ONE
- Direction A entière autorisée (grain + dust + scratches + halation)
- 1 tampon FILE par page max
- Frappe typewriter 1 occurrence max sur une citation

---

## 12. Zones où le système est INTERDIT

| Zone | Raison |
|---|---|
| Header / Navigation | Lisibilité, accessibilité, taux de clic |
| Footer | Mentions légales doivent rester lisibles |
| Formulaire contact / brief | Conversion |
| Page pricing / offres | Conversion + clarté commerciale |
| Pages produits Cinemia / Jenial app | Image produit pro, pas studio expérimental |
| Boutons CTA et tous états interactifs | Lisibilité, état focus, clic |
| Tableaux, listes de specs techniques | Lisibilité données |
| Confirmation de soumission de formulaire | Réassurance utilisateur |
| Pages 404 / erreurs | Pas d'ajout d'anxiété sur état d'erreur |
| Mode mobile portrait étroit (<375 px) | Surface trop limitée, devient parasite |

---

## 13. Règles anti-slop (les non-négociables)

1. **Un seul module source.** Toute la couche contamination vit dans
   `src/components/contamination/ContaminationLayer.tsx` + un fichier de
   réglages `contamination.config.ts`. Aucune duplication ailleurs dans le
   repo. Aucun grain CSS local dans une autre page.

2. **Une seule constante on/off.** `CONTAMINATION_ENABLED` (env var ou
   config). En cas de bug, retour à un site propre en 1 commit.

3. **Aucune génération runtime de grain.** Tous les grains sont des assets
   pré-rendus. Pas de Canvas, pas de WebGL, pas de shader.

4. **Aucun import de lib externe** pour le motion (pas de GSAP, pas de
   Framer Motion sur cette couche). Tout en CSS animations + 1 hook
   IntersectionObserver maison.

5. **Budget asset total ≤ 500 Ko** pour toutes les textures combinées,
   tous lazy-loaded en `loading="lazy"`.

6. **Lighthouse Performance ≥ 90 obligatoire** après intégration.
   Si chute > 5 points : retirer la couche.

7. **Tests A/B sur le tunnel de conversion obligatoires** avant déploiement
   au-delà du manifeste. Si baisse > 3 % du taux de prise de RDV : kill.

8. **Revue mensuelle**. Cette couche n'est pas une charte permanente. À
   réévaluer en mode "est-ce que ça nous sert encore ou est-ce qu'on s'y est
   habitué et donc plus personne ne la voit" toutes les 4 semaines pendant
   3 mois.

9. **Une seule personne valide les ajouts.** Charly. Pas de PR avec "j'ai
   rajouté un petit effet sur la page X" sans revue.

10. **Tester sur écran cinéma**. Toute la couche doit passer le test du
    moniteur 27" 4K calibré P3 — pas seulement le MacBook quotidien. Le grain
    qui se voit sur le MacBook devient agressif sur écran calibré.

---

## 14. Implémentation technique web

### Architecture
```
src/components/contamination/
  ├── ContaminationLayer.tsx         # composant racine, monté dans layout.tsx
  ├── GrainCycle.tsx                  # cycle 2 PNGs grain en CSS animation
  ├── HaloCorners.tsx                 # halation 4 coins via SVG + blend mode
  ├── SubliminalInsert.tsx            # insert single-frame contrôlé par IO
  ├── ForensicStamp.tsx               # tampon FILE statique
  ├── GateWeave.tsx                   # wrapper avec keyframes translate
  ├── TypewriterStroke.tsx            # frappe ponctuelle steps()
  ├── contamination.config.ts         # réglages globaux + zones autorisées
  └── useContaminationGate.ts         # hook anti-stroboscope + reduced-motion
```

### Stack technique
- **React 19 + Next.js 15** : composants client uniquement (pas SSR pour
  cette couche, sinon flash au mount)
- **CSS animations + `mix-blend-mode`** : tout le rendu visuel
- **SVG filters `feTurbulence + feDisplacementMap`** : gate weave et
  registration sub-pixel
- **IntersectionObserver natif** : déclencheurs scroll
- **`requestIdleCallback`** : tous les inserts non-prioritaires
- **CSS `@media (prefers-reduced-motion)`** : kill motion
- **Aucune lib externe** sur cette couche

### Performance — règles dures
- Toutes les textures en WebP (< 100 Ko chacune, lazy-loaded)
- `will-change: transform` uniquement sur le gate weave actif
- `content-visibility: auto` sur tout conteneur de la couche
- Composants client `"use client"` minimum, jamais d'effet bloquant
- Pas de re-render React au scroll : tout passe par CSS + refs

### Intégration Sanity (optionnel phase 2)
Un toggle `contaminationEnabled` dans le `siteSettings` Sanity permet à
Charly d'activer/désactiver la couche page par page sans déploiement code.

### Anti-stroboscope (obligatoire)
Le hook `useContaminationGate` garantit :
- Pas plus d'1 flash / 30 s
- Pas plus d'1 frame skip / 15 s
- Désactivation totale si `prefers-reduced-motion: reduce`
- Désactivation totale si l'utilisateur a déjà vu 3 inserts cumulés
  (stockage en `sessionStorage`)

---

## 15. Risques à éviter (récap final)

| Risque | Pourquoi c'est mortel | Comment l'éviter |
|---|---|---|
| Devient une intro YouTube horror | Tue le sérieux studio cinéma | Budget motion plafonné §10, jamais de typo horror |
| Devient un preset VHS | Lecture "agence 2018" | Pas de scanlines bleues, pas de RGB split flagrant |
| Devient un HUD sci-fi | Lecture "tech bro" | Pas de cercles concentriques, pas de barres LED |
| Devient un glitch TikTok | Lecture "ado 2024" | Pas de jump-cut, fréquence ≤ 1/min |
| Devient du true-crime | Lecture "podcast meurtre" | Pas de coordonnées GPS lisibles, pas de visages floutés |
| Devient parasite mobile | Tue UX mobile | Désactivation tampons / weave sous 768 px |
| Devient un portfolio d'effets | Tue le tunnel commercial | Zones autorisées §11 strictes |
| Devient invisible | Coût pour rien | Revue mensuelle §13 règle 8 |

---

## 16. Plan d'exécution recommandé

### Phase 0 — Validation (cette spec)
- [ ] Charly valide le verdict GO WITH LIMITS
- [ ] Charly valide la direction A en socle + B/C en accent
- [ ] Charly valide les zones §11 / §12

### Phase 1 — Assets (1-2 jours)
- [ ] Produire les 6 textures `public/textures/contamination/*.webp`
- [ ] Produire 3 SVG tampons `public/svg/contamination/stamps/*.svg`
- [ ] Importer Special Elite via `next/font/google`

### Phase 2 — Module socle (2-3 jours)
- [ ] Créer `src/components/contamination/` avec config + 3 sous-composants
  prioritaires : `GrainCycle`, `HaloCorners`, `ForensicStamp`
- [ ] Intégrer sur `/manifeste` uniquement (test)
- [ ] Audit Lighthouse + visual diff

### Phase 3 — Inserts subliminaux (1-2 jours)
- [ ] Ajouter `SubliminalInsert` + hook `useContaminationGate`
- [ ] Tester sur manifeste, mesurer perception sur 5 utilisateurs cinéma

### Phase 4 — Extension contrôlée
- [ ] Étendre à pages Pionniers + Process si Phase 2-3 valides
- [ ] Toggle Sanity par page

### Phase 5 — Revue à 4 semaines
- [ ] Mesure du delta conversion sur tunnel
- [ ] Décision keep / tone-down / kill

---

## Annexe — Mission Claude Code prête à coller (Phase 2)

```
Mission: Module contamination layer (socle)
Branche: feat/contamination-layer-base
Specs: docs/design/DESIGN-contamination-layer.md §14
Scope minimum:
  - src/components/contamination/ContaminationLayer.tsx
  - src/components/contamination/GrainCycle.tsx
  - src/components/contamination/HaloCorners.tsx
  - src/components/contamination/ForensicStamp.tsx
  - src/components/contamination/contamination.config.ts
  - src/components/contamination/useContaminationGate.ts
Intégration: monter dans src/app/manifeste/page.tsx uniquement
Contraintes:
  - Composants client uniquement
  - Aucune lib externe
  - Lighthouse Performance ≥ 90 maintenu
  - prefers-reduced-motion respecté
PROVE:
  - npm run build OK
  - Lighthouse local ≥ 90 sur /manifeste
  - Test manuel reduced-motion (DevTools rendering)
```
