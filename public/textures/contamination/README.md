# Textures contamination layer

Assets pré-rendus pour la couche analog thriller du site Studio Jenial.
Spec : `docs/design/DESIGN-contamination-layer.md`

## Origine

Textures **générées en interne** par Studio Jenial via
`scripts/generate-textures.py` (Python + Pillow + numpy).
Reproductibles via seed fixe (RNG_SEEDS dans le script).

**Pas de dépendance externe**. **Pas d'asset téléchargé** sous licence tierce.
Propriété pleine et entière de Studio Jenial / XR-ONE.

## Fichiers

| Fichier | Dimensions | Poids | Usage |
|---|---|---|---|
| `grain-35mm-1.webp` | 1280×720 tileable | ~87 Ko | grain permanent, cycle 1/2 |
| `grain-35mm-2.webp` | 1280×720 tileable | ~92 Ko | grain permanent, cycle 2/2 |
| `dust-hair-1.webp` | 1920×1080 | ~30 Ko | overlay statique zones éditoriales |
| `scratches-vertical.webp` | 1920×1080 | ~17 Ko | overlay rayures pellicule, ponctuel |

## Effets non-bitmap (référence)

Les effets suivants de la spec `docs/design/DESIGN-contamination-layer.md` §5
sont **code-only**, pas d'asset à stocker ici :

- **Halation 4 coins** → SVG inline `HaloCorners.tsx`
- **Flash frame optical printer** → `<div>` CSS dans `SubliminalInsert.tsx` (Phase 3)

## Régénération

```bash
python3 scripts/generate-textures.py
```

Modifier le script si :
- besoin d'une nouvelle variante (changer `RNG_SEEDS`)
- ajustement densité grain (paramètre `contrast` dans `generate_grain`)
- ajustement densité dust (paramètre `n_dust` dans `generate_dust_hair`)

## Convention naming

`{type}-{spec}-{variante}.webp` en kebab-case, ASCII pur.

Exemples futurs autorisés :
- `scratches-vertical-1.webp`
- `halation-edge-warm.webp`
- `gate-weave-mask.webp`

## Intégration

Spec d'usage dans `docs/design/DESIGN-contamination-layer.md` §5, §9, §11.
Le composant `<GrainCycle />` et `<HaloCorners />` consomment ces assets via
`background-image: url(...)` en CSS.

Tracking licences : `docs/design/assets-licenses.md`.
