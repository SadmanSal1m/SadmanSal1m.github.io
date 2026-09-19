#!/usr/bin/env python3
"""Open Graph images (1200x630) + apple icon, drawn in the site's own design
language: porcelain field, ink Bricolage display, mono eyebrows, real device
screenshots, per-room accent. Deterministic — safe to re-run."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
F = "/home/claude/fonts"
OUT = os.path.join(ROOT, "public", "media", "og")
os.makedirs(OUT, exist_ok=True)

PORCELAIN = (243, 241, 235)
INK = (20, 24, 27)
INK_SOFT = (76, 82, 87)
INK_FAINT = (128, 133, 137)
LINE = (20, 24, 27, 46)

ACCENT = {
    "dentxpert": (31, 142, 134),
    "naqiverse": (226, 127, 166),
    "aimara": (200, 16, 46),
    "grocs": (51, 168, 96),
}

def brico(size, wght=700):
    f = ImageFont.truetype(f"{F}/Outfit-var.ttf", size)
    f.set_variation_by_axes([wght])
    return f

def mono(size, wght=500):
    f = ImageFont.truetype(f"{F}/Outfit-var.ttf", size)
    f.set_variation_by_axes([wght])
    return f

def hank(size, wght=450):
    f = ImageFont.truetype(f"{F}/Outfit-var.ttf", size)
    f.set_variation_by_axes([wght])
    return f

def rounded_shot(path, target_h, radius_ratio=0.075, shell=(16, 18, 20)):
    im = Image.open(path).convert("RGB")
    w = round(im.width * target_h / im.height)
    im = im.resize((w, target_h), Image.LANCZOS)
    pad = max(6, round(w * 0.028))
    shellim = Image.new("RGB", (w + pad * 2, target_h + pad * 2), shell)
    shellim.paste(im, (pad, pad))
    r = round((w + pad * 2) * radius_ratio)
    mask = Image.new("L", shellim.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *shellim.size), radius=r, fill=255)
    return shellim, mask

def base_card():
    im = Image.new("RGB", (1200, 630), PORCELAIN)
    d = ImageDraw.Draw(im, "RGBA")
    # hairline frame + rail tick motif
    d.rectangle((28, 28, 1172, 602), outline=LINE, width=1)
    d.line((28, 316, 46, 316), fill=(20, 24, 27, 120), width=2)
    return im, d

def footer(d, im):
    d.line((60, 540, 1140, 540), fill=LINE, width=1)
    d.text((60, 560), "SADMAN TASEEN", font=mono(20, 560), fill=INK)
    d.text((248, 560), "· SOFTWARE & APP DEVELOPER", font=mono(20), fill=INK_FAINT)
    d.text((1140, 560), "sadmantaseen1030@gmail.com", font=mono(19), fill=INK_FAINT, anchor="ra")

def wrap(d, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=font) <= maxw:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines

def project_card(slug, name, promise, shot, station, index):
    im, d = base_card()
    ac = ACCENT[slug]
    d.rectangle((28, 28, 36, 602), fill=ac)
    d.text((72, 78), f"{index} · {station.upper()} — CASE STUDY", font=mono(22, 520), fill=INK_SOFT)
    y = 128
    for line in wrap(d, name, brico(86), 640):
        d.text((70, y), line, font=brico(86), fill=INK)
        y += 96
    y += 14
    for line in wrap(d, promise, hank(30), 620)[:3]:
        d.text((72, y), line, font=hank(30), fill=INK_SOFT)
        y += 42
    sh, mask = rounded_shot(shot, 400)
    im.paste(sh, (1130 - sh.width, 96), mask)
    footer(d, im)
    im.save(f"{OUT}/{slug}.png")
    print(slug, "ok")

def home_card():
    im, d = base_card()
    d.text((72, 84), "MOBILE PRODUCTS · REAL-TIME SYSTEMS · APPLIED AI", font=mono(22, 520), fill=INK_SOFT)
    y = 148
    for line in ["Mobile products,", "real-time systems and", "applied AI — built", "end to end."]:
        d.text((70, y), line, font=brico(64), fill=INK)
        y += 76
    x = 688
    for slug, shot in [
        ("naqiverse", f"{ROOT}/public/media/textures/naqiverse.webp"),
        ("aimara", f"{ROOT}/public/media/textures/aimara.webp"),
        ("grocs", f"{ROOT}/public/media/textures/grocs.webp"),
    ]:
        sh, mask = rounded_shot(shot, 296)
        im.paste(sh, (x, 152), mask)
        ImageDraw.Draw(im).rectangle((x + 8, 464, x + 44, 472), fill=ACCENT[slug])
        x += sh.width + 24
    footer(d, im)
    im.save(f"{OUT}/home.png")
    print("home ok")

def simple_card(name, eyebrow, title, sub):
    im, d = base_card()
    d.text((72, 96), eyebrow, font=mono(22, 520), fill=INK_SOFT)
    y = 170
    for line in wrap(d, title, brico(92), 1000):
        d.text((70, y), line, font=brico(92), fill=INK)
        y += 102
    for line in wrap(d, sub, hank(30), 980)[:2]:
        d.text((72, y + 10), line, font=hank(30), fill=INK_SOFT)
        y += 42
    footer(d, im)
    im.save(f"{OUT}/{name}.png")
    print(name, "ok")

M = f"{ROOT}/public/media"
project_card("dentxpert", "DentXpert", "Dental care with computer vision. YOLOv8 detection, built with honesty.", f"{M}/dentxpert/02-model-selection.webp", "Detect", "01")
project_card("naqiverse", "NaqiVerse", "Five complete casual games in one playful, coherent mobile universe.", f"{M}/naqiverse/01-home.webp", "Play", "02")
project_card("aimara", "AIMARA", "A secure, AI assisted operations platform for realtime aftersales work.", f"{M}/aimara/05-chat-privacy.webp", "Operate", "03")
project_card("grocs", "Grocs", "A local first recipe and pantry companion, private by architecture.", f"{M}/grocs/08-recipes.webp", "Cook", "04")
home_card()
simple_card("about", "ABOUT", "Whole products, not isolated screens.", "Interface, systems and applied AI. The same hands, end to end.")
simple_card("resume", "RESUME", "Md Salim Sadman Taseen", "Software & app developer. Cross platform apps, realtime systems, applied AI.")

# apple icon 180x180
icon = Image.new("RGB", (180, 180), INK)
di = ImageDraw.Draw(icon)
di.text((90, 86), "ST", font=brico(84, 680), fill=PORCELAIN, anchor="mm")
di.ellipse((138, 26, 156, 44), fill=ACCENT["naqiverse"])
mask = Image.new("L", (180, 180), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, 180, 180), radius=32, fill=255)
out = Image.new("RGB", (180, 180), PORCELAIN)
out.paste(icon, (0, 0), mask)
out.save(os.path.join(ROOT, "src", "app", "apple-icon.png"))
print("apple-icon ok")
