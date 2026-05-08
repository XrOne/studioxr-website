# Validation manuelle — PR #6 Capacités interactives

> **Type** : checklist de validation manuelle, pas un test automatisé.
> **Statut** : à exécuter sur la preview Vercel avant merge de la PR #6.
> **Branche** : `feat/interactive-capabilities-comparator`.

## Liens

- **PR GitHub** : https://github.com/XrOne/studioxr-website/pull/6
- **Preview Vercel** : *(à coller ici à l'exécution — voir comment Vercel sur la PR)*

## Contexte

Le repo ne dispose **d'aucune infrastructure de test automatisée** au moment de la PR #6 :

- pas de script `test` dans `package.json`
- pas de configuration Vitest / Jest / Playwright
- pas de dossier `tests/` ni `__tests__`
- pas de dépendances `@testing-library/*`, `jsdom`

La PR #6 introduit une interaction UX (grille → comparateur). En l'absence de
tests, on documente une **checklist de validation manuelle traçable** à exécuter
avant merge. Un setup de test automatisé fera l'objet d'une **mission séparée
post-merge**.

---

## 1. Checklist desktop (≥ 1024 px)

- [ ] La section "Capacités" s'affiche sans écran blanc ni layout cassé.
- [ ] Au chargement, la capacité **featured** (Décors avant / après par défaut)
      est la carte active.
- [ ] Le chip corail affiche `FEATURED · PRÉPA PROD` (ou la phase de la featured).
- [ ] Le titre H3, le sous-titre, les labels avant/après et la caption
      correspondent à la capacité active.
- [ ] La carte active a un fond sombre (Abysse), une bordure corail à gauche,
      texte clair lisible.
- [ ] **Cliquer sur au moins 4 cartes différentes** (par ex. 1, 4, 7, 8) :
  - [ ] le chip phase change ;
  - [ ] le titre H3 change ;
  - [ ] le sous-titre change ;
  - [ ] les labels avant/après changent ;
  - [ ] la caption change ;
  - [ ] la carte cliquée devient active, l'ancienne redevient blanche ;
  - [ ] le slider avant/après revient à 50 % à chaque changement.
- [ ] Le slider reste manipulable (drag souris, flèches gauche/droite si focus
      sur le slider).
- [ ] Aucun saut visuel / scroll involontaire au clic carte sur desktop.

## 2. Checklist mobile (< 768 px)

- [ ] La grille passe en colonnes étroites (au moins 2 colonnes lisibles).
- [ ] Le comparateur s'affiche au-dessus de la grille.
- [ ] Au **clic sur une carte**, la page **scroll smooth** vers le comparateur
      (`scrollIntoView`).
- [ ] Le slider reste manipulable au touch (drag tactile).
- [ ] Aucun débordement horizontal de la section.

## 3. Checklist clavier / accessibilité

- [ ] **Tab** depuis le haut de la section atteint la grille (focus visible
      sur la carte active).
- [ ] **Flèche droite / bas** déplace le focus vers la carte suivante
      sans l'activer.
- [ ] **Flèche gauche / haut** déplace le focus vers la carte précédente.
- [ ] **Home** focus la première carte, **End** la dernière.
- [ ] **Enter** ou **Space** sur une carte focusée l'**active** (le contenu du
      comparateur change).
- [ ] Le slider avant/après reste **accessible au clavier** :
      ArrowLeft / ArrowRight pour le `pct`, Home/End pour les bornes.
- [ ] Lecteur d'écran (VoiceOver / NVDA si dispo) annonce :
  - [ ] le tablist et la position dans le tablist (ex. "tab 3 of 8") ;
  - [ ] le changement de panel à l'activation (`aria-live="polite"` sur titre
        et sous-titre) ;
  - [ ] le `role="slider"` du comparateur et sa valeur courante.

## 4. Checklist fallback (sans images Sanity)

> Vérification de la robustesse en l'absence de Sanity ou de médias renseignés.

- [ ] Sur la preview Vercel actuelle, sans avoir uploadé d'image dans Sanity,
      le comparateur affiche le **gradient fallback** (couleurs marron / sable
      du composant existant).
- [ ] Pas de zone blanche, pas d'icône image cassée, pas de console error type
      `Failed to load resource`.
- [ ] Le fallback s'applique aussi sur les capacités sans labels/captions
      enrichis (cas où Sanity vide et fallbacks utilisés).

## 5. Checklist console

- [ ] Aucun warning React critique (clés manquantes, hydration mismatch).
- [ ] Aucun error rouge dans la console DevTools.
- [ ] Pas de fetch en erreur 4xx/5xx visible dans Network.

---

## Critères BLOCKING (refus de merge)

Si **un seul** des points suivants est observé, la PR est **BLOCKED** :

- Écran blanc ou erreur runtime sur la section Capacités.
- Capacité active initiale incorrecte (pas la `featured`).
- Slider qui ne revient pas à 50 % au changement de carte.
- Carte `hidden: true` (si présente côté Sanity) qui s'affiche dans la grille.
- Plus de focus clavier accessible dans la grille (perte de Tab).
- Slider avant/après qui ne réagit plus aux flèches après changement de carte.
- Hydration mismatch ou key React warning rouge en console.
- Layout cassé en mobile portrait (débordement, scroll horizontal, slider
  inutilisable).

## Critères READY TO MERGE

La PR est **READY TO MERGE** si :

- Toutes les cases desktop, mobile et clavier sont cochées.
- Aucun critère BLOCKING n'est observé.
- La preview Vercel affiche la section attendue avec les 8 capacités fallback.
- L'expérience reste fluide sans Sanity configuré (gradient fallback OK).

---

## Note — mission test automatisé à créer après merge

Cette PR est validée **manuellement faute de mieux**. Une mission séparée
devra être créée après merge pour :

1. Choisir un framework (Vitest + @testing-library/react + jsdom recommandé,
   léger et standard React 19).
2. Ajouter `vitest.config.ts`, script `npm test`, dépendances dev.
3. Couvrir au minimum les 5 comportements critiques de la section Capacités :
   - état initial featured ;
   - clic carte → contenu mis à jour ;
   - filtrage `hidden` ;
   - navigation clavier flèches + Enter/Space ;
   - fallback sans `beforeImage`/`afterImage` (pas de crash).
4. Étendre ensuite la couverture sur les autres composants critiques au fur
   et à mesure.

Référence pour la mission test automatisé :
`docs/missions/MISSION-TEST-INFRA.md` *(à créer)*.
