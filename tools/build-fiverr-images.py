#!/usr/bin/env python3
"""Nine Fiverr gallery images (1280x769, Fiverr's recommended gig size),
three per project, in the portfolio's own design language. Text kept minimal
(one short headline + one mono tag) per Fiverr's low-text guidance.
All screens are the site's already-redacted assets. Deterministic."""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = os.path.join(ROOT, "public", "media")
OUT = os.path.join(ROOT, "fiverr-assets", "gig-images")
os.makedirs(OUT, exist_ok=True)
F = "/home/claude/fonts"

PORCELAIN = (243, 241, 235)
INK = (20, 24, 27)
INK_SOFT = (76, 82, 87)
LINE = (20, 24, 27, 46)
ACCENT = {"naqiverse": (226, 127, 166), "aimara": (200, 16, 46), "grocs": (51, 168, 96)}
WASH = {"naqiverse": (247, 236, 240), "aimara": (243, 241, 235), "grocs": (244, 246, 242)}
SHELL = {"naqiverse": (42, 20, 16), "aimara": (12, 12, 13), "grocs": (12, 22, 32)}

def brico(size, wght=700):
    f = ImageFont.truetype(f"{F}/Outfit-var.ttf", size)
    f.set_variation_by_axes([96, 100, wght])
    return f

def mono(size, wght=500):
    f = ImageFont.truetype(f"{F}/Outfit-var.ttf", size)
    f.set_variation_by_axes([wght])
    return f

def device(path, h, shell):
    im = Image.open(path).convert("RGB")
    w = round(im.width * h / im.height)
    im = im.resize((w, h), Image.LANCZOS)
    pad = max(7, round(w * 0.03))
    sh = Image.new("RGB", (w + 2 * pad, h + 2 * pad), shell)
    sh.paste(im, (pad, pad))
    mask = Image.new("L", sh.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *sh.size), radius=round(sh.width * 0.09), fill=255)
    return sh, mask

def paste_rot(base, img, mask, center, deg):
    img = img.rotate(deg, expand=True, resample=Image.BICUBIC)
    mask = mask.rotate(deg, expand=True, resample=Image.BICUBIC)
    base.paste(img, (center[0] - img.width // 2, center[1] - img.height // 2), mask)

def card(slug, filename, headline, tag, shots):
    im = Image.new("RGB", (1280, 769), WASH[slug])
    d = ImageDraw.Draw(im, "RGBA")
    d.rectangle((26, 26, 1254, 743), outline=LINE, width=1)
    d.rectangle((26, 26, 34, 743), fill=ACCENT[slug])
    d.text((70, 70), tag.upper(), font=mono(23), fill=INK_SOFT)
    y = 128
    for line in headline:
        d.text((68, y), line, font=brico(76), fill=INK)
        y += 86
    d.text((70, 690), "SADMAN TASEEN · SOFTWARE & APP DEVELOPER", font=mono(21), fill=INK_SOFT)
    a, b = shots
    sa, ma = device(os.path.join(M, a), 520, SHELL[slug])
    sb, mb = device(os.path.join(M, b), 460, SHELL[slug])
    paste_rot(im, sb, mb, (1112, 430), -6)
    paste_rot(im, sa, ma, (912, 384), 4)
    im.save(os.path.join(OUT, filename), quality=95)
    print(filename)

card("naqiverse", "naqiverse-1-games.png", ["Cross-platform", "mobile games"], "React Native · Expo · Five games", ("naqiverse/01-home.webp", "naqiverse/03-leaderboard.webp"))
card("naqiverse", "naqiverse-2-progression.png", ["Progression that", "brings players back"], "XP · Streaks · 32 achievements", ("naqiverse/05-stats.webp", "naqiverse/07-badges.webp"))
card("naqiverse", "naqiverse-3-polish.png", ["Product polish,", "coin by coin"], "Theme economy · Haptics · Sound", ("naqiverse/08-theme-shop.webp", "naqiverse/02-profile.webp"))
card("aimara", "aimara-1-secure-chat.png", ["Secure enterprise", "messaging"], "Ionic Angular · FastAPI · Supabase RLS", ("aimara/05-chat-privacy.webp", "aimara/03-channels.webp"))
card("aimara", "aimara-2-operations.png", ["Real-time ops", "dashboards"], "Live metrics · Cases · Approvals", ("aimara/06-dashboard.webp", "aimara/07-starred.webp"))
card("aimara", "aimara-3-governance.png", ["Governed channels", "and workflows"], "Roles · Audit trails · Device security", ("aimara/04-new-channel.webp", "aimara/01-login.webp"))
card("grocs", "grocs-1-capture.png", ["AI recipe capture,", "any source"], "Link · Screenshot · Video · OCR", ("grocs/07-add.webp", "grocs/08-recipes.webp"))
card("grocs", "grocs-2-private.png", ["Local-first and", "private by design"], "On-device AI · No account needed", ("grocs/05-on-device-ai.webp", "grocs/04-privacy.webp"))
card("grocs", "grocs-3-pantry.png", ["Pantry to plate,", "automatically"], "Expiry tracking · Smart shopping list", ("grocs/09-pantry.webp", "grocs/10-shopping.webp"))
print("all gig images done ->", OUT)
