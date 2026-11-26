# -*- coding: utf-8 -*-
"""修复 dict 条目：en 字段插入位置前多余的 ) 闭合"""
import io, os

P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "build_steel_pages.py")
with io.open(P, encoding="utf-8") as f:
    lines = f.read().split("\n")

EN_KEYS = ("nameen=", "h1en=", "leaden=", "formulassen=", "exampleen=", "tipen=")
out = []
n = 0
for i, ln in enumerate(lines):
    nxt = lines[i + 1] if i + 1 < len(lines) else ""
    r = ln.rstrip()
    if any(nxt.lstrip().startswith(k) for k in EN_KEYS):
        if r.endswith("]),"):
            out.append(r[:-3] + "],")
            n += 1
            continue
        if r.endswith('"),'):
            out.append(r[:-2] + ",")
            n += 1
            continue
        if r.endswith("]),") is False and r.endswith("],") is False:
            pass
    out.append(ln)

with io.open(P, "w", encoding="utf-8") as f:
    f.write("\n".join(out))
print("fixed", n, "lines")
