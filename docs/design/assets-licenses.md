# Licences assets — Studio Jenial

Tracking des licences pour les assets bitmap intégrés au site.
À mettre à jour à chaque ajout d'asset.

---

## Couche contamination (`public/textures/contamination/`)

| Fichier | Source | Licence | Date ajout |
|---|---|---|---|
| `grain-35mm-1.webp` | Génération interne (`scripts/generate-textures.py`, seed 35001) | **Propriété Studio Jenial** | 2026-05-17 |
| `grain-35mm-2.webp` | Génération interne (`scripts/generate-textures.py`, seed 35002) | **Propriété Studio Jenial** | 2026-05-17 |
| `dust-hair-1.webp` | Génération interne (`scripts/generate-textures.py`, seed 17042) | **Propriété Studio Jenial** | 2026-05-17 |
| `scratches-vertical.webp` | Génération interne (`scripts/generate-textures.py`, seed 24081) | **Propriété Studio Jenial** | 2026-05-17 |

### Pourquoi génération interne plutôt que packs tiers

- **Souveraineté** : licence pleine, pas de Non-Commercial, pas de
  ShareAlike, pas d'attribution requise tierce.
- **Reproductibilité** : un seul script versionné régénère exactement les
  mêmes textures.
- **Cohérence positionnement** : Studio Jenial est un studio de workflow IA.
  Fabriquer ses propres textures plutôt que les emprunter est cohérent.
- **Aucun risque cease & desist** : pas de pack tiers dans le pipeline.

### Procédure d'ajout d'une nouvelle texture

1. Ajouter la fonction de génération dans `scripts/generate-textures.py`
2. Ajouter un seed dans `RNG_SEEDS`
3. Régénérer : `python3 scripts/generate-textures.py`
4. Mettre à jour `public/textures/contamination/README.md` (tableau)
5. Mettre à jour ce fichier (ligne dans le tableau ci-dessus)
6. Commit dédié `chore(contamination): add texture {nom}`

---

## Sources tierces éventuelles — règles

Si dans le futur on intègre un asset externe (ce qui n'est pas le cas
aujourd'hui pour la couche contamination), licences acceptées :

- **CC0 / domaine public** : pas d'attribution requise
- **CC-BY 4.0** : avec attribution dans ce fichier
- **Licences commerciales royalty-free perpetual** (Cinegrain, Production
  Crate Free, etc.) : avec URL de la licence et date d'acquisition

### Licences REFUSÉES sur l'ensemble du site

| Licence | Pourquoi |
|---|---|
| CC-BY-NC (Non-Commercial) | Jenial est commercial, exclusion explicite |
| CC-BY-SA (ShareAlike) | Forcerait à ouvrir nos dérivés |
| "Personal use only" | Exclusion explicite |
| "Editorial use only" | Exclusion explicite |
| Toute licence sans page web vérifiable | Risque cease & desist |
| Scrapes Pinterest, Imgur, Behance | Pas de licence claire |

---

## Audit licences (à faire trimestriellement)

- [ ] Vérifier qu'aucun asset bitmap n'a été ajouté sans entrée dans ce fichier
- [ ] Vérifier que tous les liens de licence externe sont toujours valides
- [ ] Vérifier qu'aucun pack source n'a changé de licence depuis l'ajout

Dernier audit : 2026-05-17 (initial)
