# -*- coding: utf-8 -*-
"""生成 1200x630 PNG 分享图 + 多尺寸 favicon（PNG + ICO）。"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\scientific-calculator"
FONT_REG = r"C:\Windows\Fonts\msyh.ttc"
FONT_BOLD = r"C:\Windows\Fonts\msyhbd.ttc"
FONT_SERIF = r"C:\Windows\Fonts\simsun.ttc"

def font(path, size):
    return ImageFont.truetype(path, size)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

# ---------- OG 1200x630 ----------
W, H = 1200, 630
img = Image.new("RGB", (W, H))
px = img.load()
c1, c2, c3 = (30, 27, 75), (49, 46, 129), (30, 58, 138)
for y in range(H):
    for x in range(W):
        t = (x / W * 0.6 + y / H * 0.4)
        if t < 0.55:
            col = lerp(c1, c2, t / 0.55)
        else:
            col = lerp(c2, c3, (t - 0.55) / 0.45)
        px[x, y] = col

d = ImageDraw.Draw(img, "RGBA")
# 装饰圆
d.ellipse([900, -160, 1360, 300], fill=(255, 255, 255, 10))
d.ellipse([-180, 380, 340, 900], fill=(255, 255, 255, 8))
d.ellipse([980, 420, 1300, 740], outline=(165, 180, 252, 40), width=2)

# Logo 方块（圆角渐变近似：叠加两层）
d.rounded_rectangle([88, 176, 194, 282], radius=26, fill=(99, 102, 241, 255))
d.rounded_rectangle([88, 176, 194, 230], radius=26, fill=(129, 140, 248, 180))
f_logo = font(FONT_SERIF, 74)
d.text((141, 224), "Σ", font=f_logo, fill=(255, 255, 255, 255), anchor="mm")

# 主标题
f_title = font(FONT_BOLD, 60)
d.text((218, 226), "工程计算工具箱", font=f_title, fill=(255, 255, 255, 255), anchor="lm")
# 副标题
f_sub = font(FONT_REG, 30)
d.text((92, 330), "科学计算 · 工程计算 · 材料计算 · 几何计算", font=f_sub, fill=(199, 210, 254, 255))

# 标签胶囊
tags = [("29 项计算功能", 92, 250), ("21 种语言", 362, 190), ("免费 · 无需安装", 572, 260)]
f_tag = font(FONT_REG, 24)
for text, x, w in tags:
    d.rounded_rectangle([x, 398, x + w, 456], radius=29, fill=(255, 255, 255, 26))
    d.text((x + w / 2, 427), text, font=f_tag, fill=(224, 231, 255, 255), anchor="mm")

# 网址
f_url = font(FONT_REG, 24)
d.text((92, 536), "engcalculator.work", font=f_url, fill=(129, 140, 248, 255))

og_path = os.path.join(OUT, "og-image.png")
img.save(og_path, "PNG", optimize=True)
print("OG PNG:", og_path, img.size)

# ---------- Favicon ----------
def make_icon(size):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    dd = ImageDraw.Draw(im)
    r = int(size * 0.22)
    dd.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=(99, 102, 241, 255))
    # 顶部高光
    dd.rounded_rectangle([0, 0, size - 1, size // 2], radius=r, fill=(129, 140, 248, 120))
    fs = int(size * 0.68)
    ff = font(FONT_SERIF, fs)
    dd.text((size / 2, size / 2 + size * 0.04), "Σ", font=ff, fill=(255, 255, 255, 255), anchor="mm")
    return im

for s in (16, 32, 48, 64, 180):
    make_icon(s).save(os.path.join(OUT, "favicon-%d.png" % s), "PNG", optimize=True)
make_icon(32).save(os.path.join(OUT, "favicon.ico"), "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Favicon PNG(16/32/48/64/180) + ICO 生成完成")
