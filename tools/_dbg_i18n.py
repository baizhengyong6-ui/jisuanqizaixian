# -*- coding: utf-8 -*-
"""验证：geo_data.json 的名称/字段/结果标签能否全部经 i18n zh→en 映射"""
import io, re, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
txt = io.open(os.path.join(HERE, "..", "i18n.js"), encoding="utf-8").read()

def block(name):
    m = re.search(r'(^|\n)\s*%s:\{(.*?)\n\s*\}' % re.escape(name), txt, re.S)
    return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]*)"', m.group(2))) if m else {}

zh, en = block("zh"), block("en")
zh2en = {}
for k in set(zh) & set(en):
    zh2en[zh[k]] = en[k]

geo = json.load(io.open(r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\geo_data.json", encoding="utf-8"))

zhval2key = {v: k for k, v in zh.items() if k.startswith("geo")}
miss = []
for g in geo:
    if g["name"] not in zhval2key:
        miss.append(("name", g["name"]))
    for f in g["fields"]:
        if f["label"] not in zhval2key:
            miss.append(("field", f["label"]))
    for r in g["results"]:
        if r["label"] not in zhval2key:
            miss.append(("res", r["label"]))
print("未映射：", miss if miss else "无，全覆盖")
# 抽样
for k in ["geo.cone_vol", "geo.r", "geo.res.slant", "geo.theta"]:
    print(k, "|", zh.get(k), "->", en.get(k))
