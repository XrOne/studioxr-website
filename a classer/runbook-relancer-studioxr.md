# Runbook — Relancer studioxr.one rapidement

**Objectif :** site en ligne, propre et stable, sans casser à nouveau.
**Durée estimée :** 30 à 90 minutes selon le coupable.
**Prérequis minimum :** accès admin WordPress OU accès FTP/SFTP/SSH OU panneau hébergeur (cPanel/Plesk).

---

## ⚠️ Règles d'or avant de commencer

1. **Backup d'abord, action ensuite.** Pas de backup = pas de touch.
2. **Une seule modification à la fois.** Sinon tu ne sauras jamais ce qui a marché ou cassé.
3. **Garde un onglet "front" + "admin" ouverts** et recharge après chaque action.
4. **Si tu paniques :** rename `wp-content/plugins/` en `wp-content/plugins-OFF/` via FTP. Tous les plugins seront désactivés et le site repartira dans 99% des cas.

---

## PHASE 1 — Sécuriser (10 min, NON NÉGOCIABLE)

### 1.1 Backup complet
**Méthode A (la plus simple, via hébergeur) :**
- Connecte-toi à ton panneau hébergeur (OVH, o2switch, Hostinger, Hostpapa, etc.)
- Cherche "Sauvegarde" / "Backup" / "Snapshot"
- Lance un backup complet (fichiers + base de données). Note la date/heure.

**Méthode B (si tu as accès admin WP encore) :**
- Plugin gratuit : **UpdraftPlus** ou **All-in-One WP Migration**
- Backup complet vers Google Drive ou en local
- Vérifie que le fichier d'export est bien téléchargé

**Méthode C (via FTP + phpMyAdmin) :**
- FTP : télécharge tout `/wp-content/`
- phpMyAdmin : exporte la base (Format SQL, "Quick" ou "Custom" avec compression)

### 1.2 Active WP_DEBUG (pour voir l'erreur réelle)
Édite `wp-config.php` (via FTP ou file manager hébergeur). Trouve la ligne `define( 'WP_DEBUG', false );` et remplace tout le bloc par :

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );
```

Sauvegarde. Tu auras désormais `/wp-content/debug.log` qui te dira **exactement** quel fichier crashe.

---

## PHASE 2 — Restaurer un état stable (15 min)

L'idée : on remet WordPress dans une configuration garantie de fonctionner, puis on reconstruit.

### 2.1 Désactive TOUS les plugins (via FTP)
- Connecte-toi en FTP/SFTP
- Va dans `/wp-content/plugins/`
- **Renomme** le dossier `plugins` en `plugins-OFF`
- Crée un dossier vide `plugins`
- Recharge la home → si elle s'affiche (même moche), tu sais : **un plugin cassait le site**.

### 2.2 Restaure un thème par défaut
Toujours en FTP, va dans `/wp-content/themes/`
- Si tu as `twentytwentyfour` ou `twentytwentyfive` → laisse-le
- Sinon télécharge `twentytwentyfour` depuis https://fr.wordpress.org/themes/twentytwentyfour/ et upload-le
- Renomme `wp-elementy-disabled` → `wp-elementy` (pour que WP le voie à nouveau, mais sans l'activer)
- Va dans WP-admin → Apparence → Thèmes → active `Twenty Twenty-Four`

À ce stade : **ton site doit s'afficher**. Probablement très basique, mais opérationnel.

### 2.3 Vérifie versions PHP / WP
- WP-admin → Outils → Santé du site
- Cible : PHP 8.1+ recommandé, WordPress dernière version
- Si PHP < 7.4 → demande à ton hébergeur de passer en 8.1 (souvent un clic dans le panneau)

---

## PHASE 3 — Réactiver intelligemment (15-60 min)

### 3.1 Réactive les plugins UN PAR UN

Via FTP :
- Va dans `/wp-content/plugins-OFF/`
- Déplace **un seul** dossier de plugin vers `/wp-content/plugins/`
- WP-admin → Extensions → active ce plugin
- Recharge la home + l'admin
  - ✅ Tout fonctionne → tu déplaces le suivant
  - ❌ Page blanche / erreur → c'est le coupable. Renomme son dossier en `nomplugin-DISABLED` et lis `/wp-content/debug.log` pour comprendre

**Ordre conseillé** (plugins critiques d'abord) :
1. WPML / Polylang (si présent)
2. Yoast SEO ou Rank Math
3. Contact Form 7 / WPForms
4. WooCommerce (si tu en as besoin)
5. Cache (WP Rocket, W3 Total Cache, LiteSpeed) — toujours en dernier
6. Tous les autres

### 3.2 Que faire avec les plugins coupables ?
Pour chaque plugin qui crashe :
- **Note son nom + version + l'erreur du debug.log**
- Vérifie sur https://wordpress.org/plugins/[nom-du-plugin] s'il est encore maintenu
- 3 options :
  - Mettre à jour vers la dernière version (souvent règle le problème)
  - Le remplacer par un équivalent maintenu (ex: Slider Revolution → Smart Slider 3, gratuit)
  - L'abandonner si plus utile

### 3.3 Pour le thème "Elementy"
Le suffixe `-disabled` indique que tu l'as désactivé pour une raison. Maintenant que les plugins coupables sont neutralisés :
- Tente de l'activer depuis WP-admin → Apparence → Thèmes
- S'il crashe : le thème lui-même est le problème (souvent : nulled / pirate / abandonné / incompatible PHP 8)
- Solution propre : passer sur un thème moderne **gratuit + maintenu** :
  - **Blocksy** (mon top reco, ultra léger, compatible Gutenberg)
  - **Kadence**
  - **Astra**
  - **GeneratePress**

---

## PHASE 4 — Stabiliser & sécuriser (15 min)

### 4.1 Désactive WP_DEBUG une fois la chasse terminée
Remets dans `wp-config.php` :
```php
define( 'WP_DEBUG', false );
```

### 4.2 Mets tout à jour
WP-admin → Tableau de bord → Mises à jour : core + thèmes + plugins. **Une fois que c'est stable**, ne saute pas cette étape.

### 4.3 Sécurise minimum vital
- Change le mot de passe admin (32 caractères, gestionnaire type Bitwarden/1Password)
- Plugin **Wordfence** ou **iThemes Security** (gratuit) → activé en mode "Recommandé"
- Désactive `xmlrpc.php` (Wordfence le fait, ou via .htaccess)
- Cache : **WP Super Cache** ou **LiteSpeed Cache** (selon hébergeur)

### 4.4 Vérifications finales
- [ ] Home charge en < 3s
- [ ] WP-admin accessible
- [ ] Aucune erreur dans la console navigateur
- [ ] HTTPS actif (cadenas vert)
- [ ] `/wp-content/debug.log` est vide ou supprimé
- [ ] `/wp-content/plugins-OFF/` peut être supprimé une fois tout clean

---

## 🆘 Plan B : si rien ne marche après 1h

Tu as un backup (Phase 1.1), donc tu n'as rien à perdre. 3 options dans cet ordre :

**B1. Restaurer le backup** auprès de ton hébergeur (état d'il y a quelques jours/semaines, peut-être avant que ça casse).

**B2. WP "fresh + import" — 45 min**
- Supprime tout via FTP (sauf `/wp-content/uploads/`)
- Réinstalle WP propre (1 clic chez l'hébergeur ou téléchargement manuel)
- Importe ta DB
- Réinstalle les plugins essentiels seulement, depuis le repo officiel
- Choisis un thème moderne (Blocksy)
- Reconstruis la home en Gutenberg ou Bricks/Elementor (version officielle)

**B3. On bascule sur le scaffold Next.js qu'on a déjà préparé**
Le repo `outputs/jenial-site/` est prêt. En 1 journée on peut être en prod sur Vercel avec studioxr.one en DNS.

---

## 📞 Si tu te retrouves bloqué

Reviens vers moi avec :
1. Le contenu de `/wp-content/debug.log` (les 30 dernières lignes)
2. La version PHP affichée dans Outils → Santé du site
3. La liste des plugins activés au moment du crash
4. Captures d'écran des erreurs visibles

Je te donne la solution chirurgicale en 5 min.
