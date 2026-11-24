# -*- coding: utf-8 -*-
"""生成 sitemap.xml：收录全部工具独立页，去掉 ?lang= 参数网址。"""
import os, io

ROOT = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\scientific-calculator"
BASE = "https://engcalculator.work"
TODAY = "2026-11-24"

# 收集所有 index.html 的相对目录
urls = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    if ".edgeone" in dirpath:
        continue
    if "index.html" in filenames:
        rel = os.path.relpath(dirpath, ROOT).replace("\\", "/")
        if rel == ".":
            urls.append(("/" , "1.0", "daily"))
        else:
            urls.append(("/" + rel + "/", "0.8", "weekly"))

urls.sort(key=lambda x: (x[0].count("/"), x[0]))

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u, pri, freq in urls:
    lines.append("  <url>")
    lines.append("    <loc>%s%s</loc>" % (BASE, u))
    lines.append("    <lastmod>%s</lastmod>" % TODAY)
    lines.append("    <changefreq>%s</changefreq>" % freq)
    lines.append("    <priority>%s</priority>" % pri)
    lines.append("  </url>")
lines.append("</urlset>")

out = "\n".join(lines) + "\n"
with io.open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(out)
print("sitemap URL 数:", len(urls))
print("含 ?lang= :", "?lang=" in out)
print(("\n".join(u[0] for u in urls[:6])) + "\n  ...")
