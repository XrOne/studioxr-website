# Études de cas — assets

Dépose tes images avant/après ici si tu préfères les versionner avec Git plutôt que via Sanity.

## Convention de nommage

```
public/case-studies/
  declics-2/
    before-1.jpg
    after-1.jpg
    before-2.jpg
    after-2.jpg
  mizik/
    hero.jpg
    gallery-1.jpg
```

## Référencement dans le code

Les images dans `public/` sont accessibles à `/case-studies/<dossier>/<fichier>`.

Exemple dans un composant :

```tsx
<BeforeAfterSlider
  beforeImage="/case-studies/declics-2/before-1.jpg"
  afterImage="/case-studies/declics-2/after-1.jpg"
  caption="Declics 2 · production Inevitable"
/>
```

## Alternative recommandée : Sanity

Pour la plupart des images (galeries d'études de cas, hero, logos partenaires),
**privilégier Sanity Studio** (`/studio`) :
- Pas de redéploiement nécessaire pour ajouter une image
- Crop / hotspot / focal point en interface
- Variants automatiques (formats, tailles)

Garder ce dossier pour les assets statiques techniques (favicon, OG image
fixe, etc.) ou les démos quand Sanity n'est pas encore configuré.
