#!/usr/bin/env python3
"""
Génération des textures contamination layer — Studio Jenial
Spec : docs/design/DESIGN-contamination-layer.md §5 et §9

Sorties :
  - public/textures/contamination/grain-35mm-1.webp
  - public/textures/contamination/grain-35mm-2.webp
  - public/textures/contamination/dust-hair-1.webp

Reproductible. Licence : propriété Studio Jenial (générées en interne).
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "textures" / "contamination"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Dimensions :
# - Grain : 1280×720, tileable, scalé en CSS background-size (perte invisible à 4-6 % opacité)
# - Dust : 1920×1080, plein cadre, blend overlay
W_GRAIN, H_GRAIN = 1280, 720
W_DUST, H_DUST = 1920, 1080

RNG_SEEDS = {
    "grain1": 35001,
    "grain2": 35002,
    "dust": 17042,
    "scratches": 24081,
}

# Qualité WebP :
# - Grain : 40 (bruit aléatoire = WebP inefficace, qualité haute = poids x10 sans gain visuel)
# - Dust : 75 (formes plus structurées, WebP efficient)
QUALITY_GRAIN = 35
QUALITY_DUST = 75


# =============================================================================
# Helpers
# =============================================================================

def make_seamless(arr: np.ndarray, feather: int = 64) -> np.ndarray:
    """Rend un array 2D HxW tileable en wrappant les bords avec masque cosinus."""
    h, w = arr.shape
    out = arr.copy().astype(np.float32)

    # Horizontal seam : blend bord droit dans bord gauche
    x_mask = 0.5 * (1 + np.cos(np.linspace(0, np.pi, feather)))  # 1 → 0
    for i in range(feather):
        alpha = x_mask[i]
        out[:, i] = alpha * out[:, w - feather + i] + (1 - alpha) * out[:, i]

    # Vertical seam
    y_mask = 0.5 * (1 + np.cos(np.linspace(0, np.pi, feather)))
    for j in range(feather):
        alpha = y_mask[j]
        out[j, :] = alpha * out[h - feather + j, :] + (1 - alpha) * out[j, :]

    return out


def normalize_to_uint8(arr: np.ndarray, center: int = 128, contrast: float = 1.0) -> np.ndarray:
    """Normalise un array float vers uint8 centré sur `center`."""
    a = arr.astype(np.float32)
    a = (a - a.mean()) / (a.std() + 1e-8)  # z-score
    a = a * contrast * 24 + center  # spread autour de 128
    a = np.clip(a, 0, 255)
    return a.astype(np.uint8)


# =============================================================================
# Grain 35mm
# =============================================================================

def generate_grain(seed: int, output: Path, contrast: float = 1.0) -> None:
    """Grain 35mm coloré tileable, 1280×720.

    Bruit gaussien décorrélé sur R/G/B (filmique), légère désaturation,
    bords seamless via cosine feather. Compressé qualité 40 (haute frq = WebP inefficace).
    """
    rng = np.random.default_rng(seed)

    # Bruit monochrome de base (luminance grain)
    luma = rng.normal(0, 1, (H_GRAIN, W_GRAIN))
    luma = make_seamless(luma, feather=64)

    # Variations chromatiques décorrélées légères (filmique : grain coloré ténu)
    r_offset = rng.normal(0, 0.30, (H_GRAIN, W_GRAIN))
    g_offset = rng.normal(0, 0.30, (H_GRAIN, W_GRAIN))
    b_offset = rng.normal(0, 0.40, (H_GRAIN, W_GRAIN))  # blue layer = grain plus marqué (réalité 35mm)

    r_offset = make_seamless(r_offset, feather=64)
    g_offset = make_seamless(g_offset, feather=64)
    b_offset = make_seamless(b_offset, feather=64)

    r = normalize_to_uint8(luma + r_offset, contrast=contrast)
    g = normalize_to_uint8(luma + g_offset, contrast=contrast * 0.95)
    b = normalize_to_uint8(luma + b_offset, contrast=contrast * 1.05)

    rgb = np.dstack([r, g, b])
    img = Image.fromarray(rgb, mode="RGB")

    # Soft blur pour casser le côté "digital noise" et tirer vers le grain photo
    img = img.filter(ImageFilter.GaussianBlur(radius=0.6))

    # Save WebP : qualité 40 suffisante à 4-6 % opacité
    img.save(output, "WEBP", quality=QUALITY_GRAIN, method=6)
    size_kb = output.stat().st_size / 1024
    print(f"  ✓ {output.name} — {size_kb:.1f} Ko")


# =============================================================================
# Dust & hair-in-gate
# =============================================================================

def generate_dust_hair(seed: int, output: Path) -> None:
    """Particules de poussière + 2-4 cheveux verticaux fins, 1920×1080.

    Fond noir (sera utilisé en blend multiply ou screen).
    Particules : 250-350 points blanc cassé avec halo doux.
    Cheveux : courbes Bézier très fines, dégradés.
    """
    rng = np.random.default_rng(seed)

    img = Image.new("RGBA", (W_DUST, H_DUST), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Poussière : 280 points de tailles variables
    n_dust = 280
    for _ in range(n_dust):
        x = rng.integers(0, W_DUST)
        y = rng.integers(0, H_DUST)
        r = rng.choice([1, 1, 1, 2, 2, 3, 4], p=[0.35, 0.20, 0.15, 0.15, 0.08, 0.05, 0.02])
        # Couleur blanc cassé légèrement jaunâtre (chimie photo)
        brightness = rng.integers(180, 240)
        color = (brightness, brightness - rng.integers(0, 20), brightness - rng.integers(10, 35))
        alpha = rng.integers(140, 230)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(*color, alpha))

    # 2. Quelques particules plus grosses avec halo (chimie sèche)
    n_big = 12
    for _ in range(n_big):
        x = rng.integers(50, W_DUST - 50)
        y = rng.integers(50, H_DUST - 50)
        r = rng.integers(5, 9)
        halo = r + rng.integers(4, 10)
        # Halo doux
        for hr in range(halo, r, -1):
            a = int(40 * (1 - (hr - r) / (halo - r)))
            draw.ellipse([x - hr, y - hr, x + hr, y + hr], fill=(220, 210, 195, a))
        # Cœur
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(235, 225, 210, 200))

    # 3. Cheveux verticaux/diagonaux fins (3 cheveux)
    n_hairs = 3
    for _ in range(n_hairs):
        # Point de départ et fin
        x0 = rng.integers(100, W_DUST - 100)
        y0 = rng.integers(-50, 200)
        x1 = x0 + rng.integers(-30, 30)
        y1 = rng.integers(H_DUST - 200, H_DUST + 50)
        # Plusieurs segments avec léger jitter pour simuler la courbure
        n_seg = 24
        prev = (x0, y0)
        for i in range(1, n_seg + 1):
            t = i / n_seg
            jitter_x = rng.integers(-3, 4)
            x = int(x0 + (x1 - x0) * t + jitter_x)
            y = int(y0 + (y1 - y0) * t)
            # Couleur cheveu : gris-noir avec opacité variable
            alpha = rng.integers(120, 200)
            draw.line([prev, (x, y)], fill=(20, 20, 18, alpha), width=1)
            prev = (x, y)

    # 4. Soft blur global pour homogénéiser
    img = img.filter(ImageFilter.GaussianBlur(radius=0.6))

    img.save(output, "WEBP", quality=QUALITY_DUST, method=6, lossless=False)
    size_kb = output.stat().st_size / 1024
    print(f"  ✓ {output.name} — {size_kb:.1f} Ko")


# =============================================================================
# Scratches verticaux (pellicule rayée)
# =============================================================================

def generate_scratches(seed: int, output: Path) -> None:
    """Scratches verticaux fins style pellicule 35mm rayée, 1920×1080.

    25-40 traits verticaux d'épaisseur 1-2 px, fond transparent, opacité variable.
    Quelques traits plus visibles dans le tiers gauche (simulant le passage
    répété sur le projecteur).
    """
    rng = np.random.default_rng(seed)

    img = Image.new("RGBA", (W_DUST, H_DUST), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    n_scratches = int(rng.integers(28, 40))
    for _ in range(n_scratches):
        # Position : biais vers le tiers gauche (concentration plus forte)
        if rng.random() < 0.45:
            x = int(rng.integers(0, W_DUST // 3))
        else:
            x = int(rng.integers(0, W_DUST))

        # Longueur : la majorité = plein cadre, quelques courts
        if rng.random() < 0.75:
            y0, y1 = -10, H_DUST + 10
        else:
            y0 = int(rng.integers(0, H_DUST // 2))
            y1 = int(rng.integers(H_DUST // 2, H_DUST))

        # Épaisseur 1 ou 2 px
        width = int(rng.choice([1, 1, 1, 2]))

        # Couleur scratch : blanc cassé légèrement bleuté (révèle la base émulsion)
        # OU noir doux pour scratches en relief
        if rng.random() < 0.7:
            color = (240, 238, 230)  # scratch clair (révèle base film)
        else:
            color = (15, 15, 15)  # scratch sombre (relief)

        alpha = int(rng.integers(90, 200))

        # Trait avec jitter horizontal léger pour casser le côté parfait
        n_seg = 14
        prev = (x, y0)
        for i in range(1, n_seg + 1):
            t = i / n_seg
            jitter = int(rng.integers(-1, 2))
            cx = x + jitter
            cy = int(y0 + (y1 - y0) * t)
            draw.line([prev, (cx, cy)], fill=(*color, alpha), width=width)
            prev = (cx, cy)

    # 2-3 scratches "fauves" plus marqués au tiers gauche
    n_fauve = int(rng.integers(2, 4))
    for _ in range(n_fauve):
        x = int(rng.integers(0, W_DUST // 3))
        color = (245, 245, 240)
        alpha = int(rng.integers(170, 230))
        n_seg = 20
        prev = (x, -10)
        for i in range(1, n_seg + 1):
            t = i / n_seg
            jitter = int(rng.integers(-1, 2))
            cx = x + jitter
            cy = int(-10 + (H_DUST + 20) * t)
            draw.line([prev, (cx, cy)], fill=(*color, alpha), width=1)
            prev = (cx, cy)

    # Soft blur très léger pour éviter l'aliasing sec
    img = img.filter(ImageFilter.GaussianBlur(radius=0.35))

    img.save(output, "WEBP", quality=70, method=6, lossless=False)
    size_kb = output.stat().st_size / 1024
    print(f"  ✓ {output.name} — {size_kb:.1f} Ko")


# =============================================================================
# Main
# =============================================================================

def main() -> int:
    print(f"Output directory: {OUT_DIR}")
    print()

    print("→ Generating grain-35mm-1.webp (cycle variant 1/2)")
    generate_grain(RNG_SEEDS["grain1"], OUT_DIR / "grain-35mm-1.webp", contrast=1.0)

    print("→ Generating grain-35mm-2.webp (cycle variant 2/2)")
    generate_grain(RNG_SEEDS["grain2"], OUT_DIR / "grain-35mm-2.webp", contrast=1.05)

    print("→ Generating dust-hair-1.webp")
    generate_dust_hair(RNG_SEEDS["dust"], OUT_DIR / "dust-hair-1.webp")

    print("→ Generating scratches-vertical.webp")
    generate_scratches(RNG_SEEDS["scratches"], OUT_DIR / "scratches-vertical.webp")

    print()
    print("All textures generated. Reproducible via:")
    print("  python3 scripts/generate-textures.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
