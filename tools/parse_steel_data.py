# -*- coding: utf-8 -*-
"""从参考页 hbeam_ref.html 解析 GB/T 11263—2024 三张表 → steel_data.json
标准 HTML 网格展开算法：rowspan 提前占用后续行列；型号列补齐；△ 标记单独提取。
"""
import re, json, io, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))   # 工作区根（hbeam_ref.html 所在）
SRC = os.path.join(ROOT, "hbeam_ref.html")
OUT = os.path.join(HERE, "steel_data.json")

s = io.open(SRC, encoding="utf-8", errors="ignore").read()

def parse_grid(sec_id):
    i = s.find('id="%s"' % sec_id)
    j = s.find("</section>", i)
    seg = s[i:j]
    trs = re.findall(r"<tr[^>]*>(.*?)</tr>", seg, re.S)
    grid = []
    occupied = set()   # 由前几行 rowspan 预占的 (r,c)

    def ensure_row(r):
        while len(grid) <= r:
            grid.append([])

    for R, tr_html in enumerate(trs):
        ensure_row(R)
        col = 0
        for td in re.finditer(r"<(t[dh])((?:[^>]|\n)*?)>(.*?)</\1>", tr_html, re.S):
            attrs = td.group(2)
            txt = re.sub(r"<[^>]+>", "", td.group(3))
            txt = re.sub(r"\s+", " ", txt).strip()
            rs = re.search(r'rowspan="(\d+)"', attrs)
            rs = int(rs.group(1)) if rs else 1
            cs = re.search(r'colspan="(\d+)"', attrs)
            cs = int(cs.group(1)) if cs else 1
            # 跳过被占用或已填写的列
            while True:
                ensure_row(R)
                if col < len(grid[R]) and grid[R][col] is not None:
                    col += 1
                    continue
                if (R, col) in occupied:
                    col += 1
                    continue
                break
            # 写入并展开
            for r in range(R, R + rs):
                ensure_row(r)
                for c in range(col, col + cs):
                    while len(grid[r]) <= c:
                        grid[r].append(None)
                    grid[r][c] = txt
                    occupied.add((r, c))
            col += cs
    return grid

def clean(v):
    return ("" if v is None else v.strip())

result = {}
for tid, key in [("table-a1", "h"), ("table-b1", "hk"), ("table-c1", "t")]:
    grid = parse_grid(tid)
    grid = [[clean(v) for v in row] for row in grid]
    header1 = grid[0]
    header2 = grid[1]
    ncols = max(len(r) for r in grid[2:])
    data = []
    cur_model = ""
    for row in grid[2:]:
        row = (row + [""] * ncols)[:ncols]
        model = row[0]
        if model.startswith("△"):
            model = model[1:].strip()
        if model:
            cur_model = model
        # △ 基准规格标记在 H 列（第 1 数据列）前缀
        mark = ""
        h0 = row[1]
        if h0.startswith("△"):
            mark = "△"
            row[1] = h0[1:].strip()
        data.append({"model": cur_model, "mark": mark, "cells": row[1:]})
    result[key] = {
        "title1": header1,
        "title2": header2,
        "cols": ncols,
        "count": len(data),
        "rows": data,
    }

io.open(OUT, "w", encoding="utf-8").write(json.dumps(result, ensure_ascii=False))
for k, v in result.items():
    print(k, "列数:", v["cols"], "数据行:", v["count"], "△行:", sum(1 for r in v["rows"] if r["mark"]))
    print("  表头1:", v["title1"])
    print("  表头2:", v["title2"])
    print("  首2行:", [(r["model"], r["mark"], r["cells"]) for r in v["rows"][:2]])
    print("  末行:", [(r["model"], r["cells"]) for r in v["rows"][-1:]])
