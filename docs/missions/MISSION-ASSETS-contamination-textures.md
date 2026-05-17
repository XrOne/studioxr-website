# MISSION — Infrastructure & assets contamination layer

> **Statut** : assets DÉJÀ PRODUITS par Cowork (génération in-house).
> Cette mission consiste désormais à **commiter + ouvrir la PR**, pas à
> télécharger.

**Branche** : `feat/contamination-assets-infra`
**Spec parente** : `docs/design/DESIGN-contamination-layer.md` §5 et §9
**Bloque** : `feat/contamination-layer-base` (mission code Phase 2)

---

## Contexte — pivot in-house

Initialement on imaginait télécharger des packs (Cinegrain Light, Production
Crate). Pivot validé : **génération en interne** via script Python +
Pillow + numpy.

Avantages :
- Licence pleine Studio Jenial (pas de CC-BY-NC, pas d'attribution requise)
- Reproductibilité totale via seed fixe
- Aucun pack tiers dans le pipeline (zéro risque cease & desist)
- Cohérent avec le positionnement Jenial (studio de workflow IA, fabrique
  ses propres outils)

Cowork a déjà :
- créé `scripts/generate-textures.py` (versionné, reproductible)
- généré les 3 textures dans `public/textures/contamination/`
- créé `public/textures/contamination/README.md`
- créé `docs/design/assets-licenses.md`

## Périmètre — 4 bitmaps + 2 code-only

**Alignement spec parente `DESIGN-contamination-layer.md` §5 :**

| Type | Asset | Statut |
|---|---|---|
| Bitmap | `grain-35mm-1.webp` | livré |
| Bitmap | `grain-35mm-2.webp` | livré |
| Bitmap | `dust-hair-1.webp` | livré |
| Bitmap | `scratches-vertical.webp` | livré |
| Code-only (SVG) | Halation 4 coins | implémenté dans `HaloCorners.tsx` (Phase 2) |
| Code-only (CSS) | Flash frame optical printer | implémenté dans `SubliminalInsert.tsx` (Phase 3) |

→ **Cette mission ne livre que les 4 bitmaps**. Halation et flash sont
hors scope ici — produits côté React par la mission code.

## Scope de la mission Claude Code

### Étapes
1. Créer la branche `feat/contamination-assets-infra` depuis `main`
2. Vérifier que les 7 fichiers suivants existent :
   - `scripts/generate-textures.py`
   - `public/textures/contamination/grain-35mm-1.webp`
   - `public/textures/contamination/grain-35mm-2.webp`
   - `public/textures/contamination/dust-hair-1.webp`
   - `public/textures/contamination/scratches-vertical.webp`
   - `public/textures/contamination/README.md`
   - `docs/design/assets-licenses.md`
3. Exécuter le script de régénération pour valider la reproductibilité :
   ```bash
   python3 scripts/generate-textures.py
   ```
   Vérifier qu'il n'y a **aucune différence binaire** après régénération
   (`git diff --stat` doit retourner vide sur les .webp).
4. `chmod +x scripts/generate-textures.py`
5. Vérifier que le `.gitignore` ne masque pas `public/textures/`
6. Commit + push + PR

### Diff attendu

```
A  scripts/generate-textures.py
A  public/textures/contamination/README.md
A  public/textures/contamination/grain-35mm-1.webp
A  public/textures/contamination/grain-35mm-2.webp
A  public/textures/contamination/dust-hair-1.webp
A  public/textures/contamination/scratches-vertical.webp
A  docs/design/assets-licenses.md
```

### Ne PAS faire
- Pas de modification du script de génération
- Pas de modification de `src/`
- Pas de modification de `next.config.ts`
- Pas de modification des `.webp` (régénération = doit être identique)
- Pas de mise à jour `package.json` (pas de dépendance Python à ajouter
  côté JS)

## Pré-requis système (à documenter dans la PR si manquant en CI)

```bash
# Python 3.10+ avec Pillow et numpy
python3 -m pip install Pillow numpy
```

Pas de dépendance npm. Le script est utilitaire, pas dans le build.

## PROVE

```bash
# 1. Présence des fichiers (4 bitmaps + script + README + licences)
test -f scripts/generate-textures.py && echo "OK script"
test -f public/textures/contamination/grain-35mm-1.webp && echo "OK grain1"
test -f public/textures/contamination/grain-35mm-2.webp && echo "OK grain2"
test -f public/textures/contamination/dust-hair-1.webp && echo "OK dust"
test -f public/textures/contamination/scratches-vertical.webp && echo "OK scratches"
test -f public/textures/contamination/README.md && echo "OK texture README"
test -f docs/design/assets-licenses.md && echo "OK licenses"

# 2. Permissions exécution script
test -x scripts/generate-textures.py && echo "OK script exec"

# 3. Poids sous cibles raisonnables
test "$(stat -c%s public/textures/contamination/grain-35mm-1.webp 2>/dev/null || \
        stat -f%z public/textures/contamination/grain-35mm-1.webp)" -lt 110000 && echo "OK grain1 < 110 Ko"
test "$(stat -c%s public/textures/contamination/grain-35mm-2.webp 2>/dev/null || \
        stat -f%z public/textures/contamination/grain-35mm-2.webp)" -lt 110000 && echo "OK grain2 < 110 Ko"
test "$(stat -c%s public/textures/contamination/dust-hair-1.webp 2>/dev/null || \
        stat -f%z public/textures/contamination/dust-hair-1.webp)" -lt 130000 && echo "OK dust < 130 Ko"

# 4. Reproductibilité — régénération doit être identique
sha1_before=$(sha1sum public/textures/contamination/*.webp 2>/dev/null || \
              shasum -a 1 public/textures/contamination/*.webp)
python3 scripts/generate-textures.py > /dev/null
sha1_after=$(sha1sum public/textures/contamination/*.webp 2>/dev/null || \
             shasum -a 1 public/textures/contamination/*.webp)
[[ "$sha1_before" == "$sha1_after" ]] && echo "OK reproductibilité" || \
  echo "FAIL — régénération produit des bytes différents"

# 5. Pas de modification src/
git diff --stat src/ | grep -q . && echo "FAIL src modifié" || echo "OK src intact"

# 6. Build production passe (rien ne casse côté Next.js)
npm run build
```

## Commit message

```
chore(contamination): infra assets + textures générées in-house

- scripts/generate-textures.py (Python + Pillow + numpy, reproductible)
- public/textures/contamination/{grain-35mm-1,grain-35mm-2,dust-hair-1}.webp
- public/textures/contamination/README.md (doc usage + régénération)
- docs/design/assets-licenses.md (tracking licences, in-house pour cette couche)

Phase 1 de la spec docs/design/DESIGN-contamination-layer.md.
Pivot stratégique : génération in-house plutôt que packs tiers → licence
pleine Studio Jenial, reproductibilité totale, zéro dépendance externe.

Bloque feat/contamination-layer-base.
```

## Hors scope
- L'intégration React/Next.js (mission séparée `feat/contamination-layer-base`)
- Le toggle Sanity par page (Phase 4)
- Toute optimisation `next/image` (Next gère via background-image CSS)

---

## Annexe — Prompt Claude Code prêt à coller

```
Lis docs/missions/MISSION-ASSETS-contamination-textures.md.

Vérifie que les 6 fichiers du scope existent déjà dans la working copy.
Si oui :
  1. Crée la branche feat/contamination-assets-infra depuis main
  2. chmod +x scripts/generate-textures.py
  3. Exécute le PROVE complet du fichier mission
  4. Si tout passe : git add + commit avec le message de la mission
  5. Push + ouvre la PR

Si l'un des fichiers manque, STOP et signale lequel.

Diff minimum. Aucune modif src/, aucune modif next.config.ts.
```
