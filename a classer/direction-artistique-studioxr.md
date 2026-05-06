# Studio XR-ONE — Direction artistique unifiée

**v2.0** · 5 mai 2026 · Sources : ADN Charles-Henri Marraud des Grottes (Martinique), audit studioxr.one, jenial.fr, jenial.app, jenial.app/cinemia, mizik.tech, référence narrativecoders.com, corrections client v2

---

## 0. CORRECTIONS v2 (à connaître avant de lire la suite)

- **Histoire** : XR-ONE est né en **2014 à CréaCannes** (pépinière d'entreprise audiovisuelle de Cannes), **pas en 2015 à l'ENSAM**. L'ENSAM était une étape ultérieure. *"Pionnier · depuis 2014"*.
- **Vocabulaire pro audiovisuel obligatoire** : on parle de **prépa prod / tournage hybride / post prod** (cible = régies pub, productions audiovisuelles, cinéma). Pas "Production / Logiciels / Workflow" en piliers — c'est trop generic agence digitale.
- **MIZIK = projet propriétaire XR-ONE** (pas une marque sœur). Inclus dans les études de cas + dans les logiciels.
- **Cas clients à mentionner uniquement** : BNP, ELLE Décor, INRA/CIRAD, fictions VR. **Declics 2 = projet** produit par **Inevitable** (la boîte de production, pas un projet en soi). Donc *"Declics 2 — production Inevitable"* dans les études de cas, et **Inevitable** apparaît dans la bande logos clients (en tant que producteur). Rien d'autre. Surtout pas Monaco Périgord, MIDEM, Le dernier Hero, etc. (mes anciennes mentions à supprimer).
- **Avant/après décors = UNE capacité parmi 8+** (pas la signature unique). On présente une **liste de capacités IA** structurée par phase de production : prépa prod (décors / storyboards / animatics / continuité / moodboards), tournage hybride (plans IA insérés / apps corps de métier), post prod (profondeur 8→32 bits HDR float). Le slider avant/après devient un *featured example*.
- **Avant-gardisme** = ton mot-clé. *"Conteurs de la XR depuis 2014. Pionniers de la production hybride."*

---

## 1. Positionnement (1 phrase, validé)

> **Studio XR-ONE — pionnier français du tournage hybride et de la production augmentée par IA. Conteur de la XR depuis 2014.**

3 mots-clés signature : **pionnier · hybride · workflow**.

C'est un studio qui *accompagne* productions, régies et cinéma, pas qui *vend de la techno*. Référence de ton : Narrative Coders, mais avec la profondeur de track record qu'eux n'ont pas.

---

## 2. ADN extrait (validé par toi)

| Trait | Implication design |
|---|---|
| Bleu océan, Martinique | Palette bleu lagon dominante, fond clair, lumineux |
| Paisible, zen, good vibe | Espaces blancs, animations douces, pas de surcharge |
| Pas de compétition | Ton chaleureux, pas de superlatifs agressifs |
| Pionnier (depuis 2015) | Mettre en avant l'antériorité, le track record |
| Cinéma, créatif, synergie | Showreel, photos coulisses, vocabulaire de plateau |
| Épuré, ergonomique, simple | Max 5 entrées de menu, hiérarchie claire, white space |

---

## 3. Architecture proposée (5 entrées max)

```
studioxr.one
│
├── /                     Studio (manifesto + showreel + héritage)
├── /production            Films IA, plans, prévisualisation, projets clients
│       (Declics, MIZIK, INRA/CIRAD, France 3, ELLE DECOR…)
├── /logiciels             Jenial.app · Cinemia · MIZIK
├── /workflow              Conseil + formation IA + savoir-faire (le différenciant)
└── /contact               Calendly intégré + formulaire court

Footer : mentions, RGPD, LinkedIn, presse, équipe, archive XR-ONE
```

**Décisions de simplification :**
- Tuer les routes éclatées de jenial.fr (`/blog`, `/tools`, `/ia-cinema`, `/case-studies`, `/workflows`, `/opinions`) → tout fusionne dans 4 sections claires.
- mizik.tech (Gamma violet) → 301 vers `studioxr.one/mizik`.
- jenial.fr → 301 vers studioxr.one (ou conservation comme alias).
- jenial.app reste l'app (ne pas y toucher), mais sa **landing** vit sur studioxr.one/logiciels.

---

## 4. Palette — "Caraïbes Workflow"

Couleurs **factuelles** pour copier-coller dans Tailwind/CSS vars.

| Token | Hex | Rôle | Usage |
|---|---|---|---|
| `--brand-lagon` | `#0E7C9B` | **Primaire** | Liens, boutons, headings forts |
| `--brand-anse` | `#5EC8D6` | Secondaire claire | Halos, gradients, hover |
| `--brand-abysse` | `#0A1F2C` | Sombre | Mode dark, footer, texte fort |
| `--brand-sable` | `#F2E6CF` | Chaude | Sections de respiration, icônes douces |
| `--brand-corail` | `#FF8A65` | Accent unique | CTA principal, signal énergie |
| `--bg-air` | `#F8FBFC` | Fond dominant | 80% du site (mode clair) |
| `--text-fg` | `#0A1F2C` | Texte principal | Body |
| `--text-muted` | `#3D5A6C` | Texte secondaire | Descriptions, captions |

**Règle d'or :** mode clair par défaut (comme Narrative Coders), **un seul accent vif** (corail) — on ne tombe pas dans la palette multi-pastels startup parisienne. Bleus + sable + corail. Point.

### Préview palette
```
████████  Lagon       #0E7C9B
████████  Anse        #5EC8D6
████████  Abysse      #0A1F2C
████████  Sable       #F2E6CF
████████  Corail      #FF8A65
████████  Air         #F8FBFC
```

---

## 5. Typographies

| Usage | Fonte | Poids | Pourquoi |
|---|---|---|---|
| Titres | **Fraunces** (variable, optical sizing) | 400 / 600 / 700 | Chaleur, caractère pionnier, signature douce mais affirmée |
| Body / UI | **Inter** | 400 / 500 / 600 | Déjà utilisé dans 3 de tes 4 sites, gratuit, lisible, neutre |
| Mono / tech | **JetBrains Mono** | 400 / 600 | Pour tags, snippets workflow, codes projets |

Toutes via `next/font/google` (chargées au build, pas de FOUT, RGPD-friendly).

**Hiérarchie type :**
- H1 : Fraunces 600, 56–72px, leading-tight
- H2 : Fraunces 500, 36–44px
- H3 : Inter 600, 22–24px
- Body : Inter 400, 17–18px, leading-relaxed
- Caption : Inter 500, 13–14px, uppercase tracking-wider

---

## 6. Vocabulaire visuel signature

Repris (intelligemment) de Narrative Coders + adapté à l'ADN océan-martiniquais :

- **Hero clair** avec une **vidéo de fond très subtile** (vagues, océan, plan d'un projet IA)
- **3 piliers** sur la home en cartes simples (Production / Logiciels / Workflow)
- **Cards à halo conic-gradient** mais en cyan/lagon uniquement (pas de pastels multicolores)
- **Bandeau cas clients** très en évidence (Declics au premier plan, puis France 3, INRA/CIRAD, ELLE DECOR, etc.) — c'est ton track record, on l'utilise
- **Section workflow expliqué simplement** : 3-6 étapes, pictos doux, pédagogie
- **Calendly inline** dans le footer/contact (friction zéro pour booker un appel)
- **Photos coulisses / plateau** : montrer l'humain, l'atelier, pas que des mockups
- **Touche caribéenne discrète** : pas de stéréotype, juste la palette + une photo paysage Martinique en respiration

À éviter : palettes multi-accents pastels, dark mode strict, copy "disruption", pas de dashboards techy en hero.

---

## 7. Copy / ton

Trois exemples de phrases-pilotes (à valider) :

**Hero**
> *L'atelier où l'IA, le cinéma et le réel fusionnent.*
> Studio pionnier de la création immersive depuis 2015 — production, logiciels, conseil.

**Pillier Production**
> *Des plans IA qui s'intègrent à vos rushes, sans rupture de ton.*

**Pillier Workflow**
> *On ne vend pas l'IA. On installe la méthode qui la rend utile sur votre plateau.*

**Cas clients (intro)**
> *Depuis 10 ans on accompagne des productions ambitieuses : Declics, France 3, INRA/CIRAD, ELLE DECOR, Monaco Périgord, MIDEM…*

**CTA**
> *Discutons de votre prochain projet — 30 minutes, sans engagement.*

Ton général : **affirmation calme, pas de superlatifs**. Pas "révolutionnaire", pas "next-gen". Plutôt : *"on l'a fait, on le refait avec vous"*.

---

## 8. Hiérarchie de la home (sections)

1. **Hero** — H1 + 3 puces colorées (Production / Logiciels / Workflow) + CTA Calendly + vidéo de fond océan/plan IA
2. **Bandeau cas clients** — logos en monochrome (Declics first, puis 7-10 autres), liens vers projets
3. **Manifesto court** — 2-3 paragraphes : qui on est, depuis quand, pourquoi (ancrage Martinique + 2015)
4. **🔥 Showcase signature "Avant / Après"** — comparateur slider draggable, 3 cas d'usage (décors naturels modifiés / prévisualisation scène / mood lighting). C'est la **section qui te différencie** — usage concret + IA + cinéma + équipe terrain.
5. **3 piliers détaillés** — cards halo, chaque carte mène vers /production, /logiciels, /workflow
6. **Cinemia détaillé** — bloc dédié avec capture interface + 6 features (découpage technique, continuité, prévisualisation, moodboards, export équipe, BYOK Gemini) + CTA "Tester Cinemia"
7. **Workflow expliqué** — 6 étapes pédago (cf. tes 6 étapes existantes : Brief → DA → Images clés → Animation → Post-prod → Livraison)
8. **Logiciels (bandeau sombre)** — Jenial · Cinemia · MIZIK avec CTAs distincts
9. **CTA final + Calendly inline**
10. **Footer** simple — mentions, RGPD, LinkedIn, équipe, archive XR-ONE
11. **Strip héritage** — petit bandeau sable avec citation : *"De la frontière XR à la frontière IA. Né à l'ENSAM, ancré en Martinique, présent au plateau."*

---

## 9. Stack technique (inchangée — solide)

Le scaffold Next.js déjà déployé est conservé en base technique. On le **refonte côté design** :

- `globals.css` → nouvelle palette + tokens
- `layout.tsx` → fontes Fraunces + Inter + JetBrains Mono
- Tous les composants → repris avec nouvelles classes / nouveaux blocs (Hero, Cards halo, etc.)
- `content.ts` → injecté avec les **vrais médias** récupérés via REST API studioxr.one (logos partenaires, photos équipe, vignettes projets MIZIK / Declics / etc.)

Aucune dette technique : on garde le build prêt à déployer.

---

## 10. Prochaines étapes (3 jalons)

**J1 (aujourd'hui)** — Tu valides cette DA + le mockup HTML que je te livre en parallèle. Tu corriges ce qui ne te ressemble pas.

**J2** — Je refonds le scaffold Next.js avec la palette/typos/architecture validées. Push Vercel preview.

**J3** — Migration des médias et cas clients réels (récupération via REST API studioxr.one : logos partenaires, photos équipe, vignettes projets), intégration Calendly, et bascule DNS de studioxr.one vers Vercel.

---

## 11. Ce qui reste à confirmer (questions ouvertes)

1. **Avant / Après décors IA (signature)** — c'est le morceau le plus impactant pour ta cible (réa / chef·fe déco / production). Envoie-moi 3 à 5 paires d'images (avant : décor naturel brut / après : projection IA finale) avec, idéalement, le contexte (nom du projet ou simplement "Production cinéma 2025"). Plus c'est cinéma / haut de gamme, plus ça fait mouche.
2. **Captures Cinemia** — 2-3 screenshots de l'interface en action (analyse de scénario, découpage, prévisualisation). Si tu n'en as pas, je dégrade en visuel placeholder élégant.
3. **Cas Declics** — nom du projet, type de prestation, 1-2 visuels exploitables, et droits de mention (logo + nom OK ou seulement description discrète ?).
4. **Logo XR-ONE / Jenial / Cinemia / MIZIK** — envoie ce que tu as en SVG/PNG. Sinon je fais un wordmark sobre avec la typo Fraunces en attendant.
5. **Showreel hero** — vidéo de quelques secondes pour la background du hero ? Sinon on génère un montage rapide à partir des YouTube projets (MIZIK / INRA / France 3 / ELLE Décor).
6. **Calendly link** — URL exacte de ton Calendly pour intégration inline dans /contact.
7. **Marque ombrelle** — on garde **STUDIO XR-ONE** comme marque mère (Jenial / Cinemia / MIZIK = produits) — c'est ma reco étant donné l'antériorité 2015 et le pedigree. Tu confirmes ou tu préfères Jenial en ombrelle ?
8. **Photos d'équipe / atelier / Martinique** — si tu as des photos perso (toi, équipe, plateau, Martinique) qui transmettent le ton "atelier paisible", envoie-les. Sinon on travaille avec des compositions abstraites.
