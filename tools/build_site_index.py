# -*- coding: utf-8 -*-
"""生成全站静态工具索引（site index），写入 index.html 页脚（双语 data-zh/data-en）。
目的：让搜索引擎爬虫从任意页面都能顺着真实 <a href> 走遍全站 39 个功能页；
同时支持语言切换时索引文本随 data-en 切换。幂等：已有标记块则整体替换。
英文几何名 / 字段 / 结果标签从 i18n.js 的 en 段自动提取。
"""
import io, json, os, re

ROOT = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\scientific-calculator"
GEO_JSON = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\geo_data.json"


def load_i18n_blocks():
    """从 i18n.js 提取 zh / en 两个语言段的 "key":"value" 对"""
    with io.open(os.path.join(ROOT, "i18n.js"), encoding="utf-8") as f:
        txt = f.read()
    def block(name):
        m = re.search(r'(^|\n)\s*%s:\{(.*?)\n\s*\}' % re.escape(name), txt, re.S)
        if not m:
            return {}
        return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]*)"', m.group(2)))
    return block("zh"), block("en")


ZH_I18N, EN_I18N = load_i18n_blocks()


def en_of(zh_text):
    """中文文案 → 英文文案（直接映射；找不到返回 None）"""
    return EN_I18N.get(zh_text)


GEO_SLUG = {
    'cone_sa': 'cone-surface-area', 'frustum_sa': 'frustum-surface-area', 'cone_vol': 'cone-volume',
    'frustum_vol': 'frustum-volume', 'cyl_lateral': 'cylinder-lateral-area', 'cyl_sa': 'cylinder-surface-area',
    'cyl_vol': 'cylinder-volume', 'cuboid_vol': 'cuboid-volume', 'cuboid_sa': 'cuboid-surface-area',
    'cube_vol': 'cube-volume', 'cube_sa': 'cube-surface-area', 'sector_area': 'sector-area',
    'sector_perim': 'sector-perimeter', 'annulus_area': 'annulus-area', 'circle_area': 'circle-area',
    'circle_perim': 'circle-circumference', 'trapezoid_area': 'trapezoid-area',
    'trapezoid_perim': 'trapezoid-perimeter', 'rhombus_area': 'rhombus-area', 'rhombus_perim': 'rhombus-perimeter',
    'para_perim': 'parallelogram-perimeter', 'para_area': 'parallelogram-area', 'tri_area': 'triangle-area',
    'tri_perim': 'triangle-perimeter', 'square_perim': 'square-perimeter', 'square_area': 'square-area',
    'rect_calc': 'rectangle-calculator', 'rect_area': 'rectangle-area', 'rect_perim': 'rectangle-perimeter',
}

ENG = [("/engineering/unit-conversion/", "工程单位换算器（长度 / 力 / 应力 / 力矩）",
        "Engineering unit converter (length / force / stress / moment)"),
       ("/engineering/section-properties/", "截面几何特性计算（面积 / 惯性矩 / 截面模量 / 回转半径）",
        "Section properties (area / moment of inertia / modulus / radius of gyration)"),
       ("/engineering/simply-supported-beam/", "简支梁均布荷载计算（弯矩 / 剪力 / 挠度）",
        "Simply supported beam under uniform load (moment / shear / deflection)"),
       ("/engineering/stress-check/", "构件应力验算（轴心受力 / 受弯）",
        "Member stress check (axial force / bending)")]

MAT = [("/materials/steel-weight/", "钢材理论重量计算器（型钢 / 钢板 / 钢管）",
        "Steel theoretical weight calculator (sections / plates / pipes)"),
       ("/materials/density-conversion/", "密度重量体积换算（12 种工程材料）",
        "Density–weight–volume converter (12 engineering materials)")]

STEEL = [("/geometry/h-beam-size-list/", "H 型钢规格表 · 公称尺寸 / 截面面积 / 理论重量 / 截面特性（431 行）",
          "H-beam size list · dimensions / area / weight / properties (431 rows)"),
         ("/geometry/hk-beam-size-list/", "HK 型钢规格表 · 公称尺寸 / 截面面积 / 理论重量 / 截面特性（378 行）",
          "HK-beam size list · dimensions / area / weight / properties (378 rows)"),
         ("/geometry/t-beam-size-list/", "剖分 T 型钢规格表 · 公称尺寸 / 截面面积 / 理论重量 / 截面特性（80 行）",
          "Split T-section list · dimensions / area / weight / properties (80 rows)")]

SCI_ITEM = ("/scientific/", "在线科学计算器（四则 / 幂 / 阶乘 / 三角与反三角函数 / 对数）",
            "Online scientific calculator (arithmetic / powers / factorial / trig & inverse trig / logarithms)")

GROUPS = [
    ("/scientific/", "科学计算器", "Scientific Calculator", 1),
    ("/engineering/", "工程计算器", "Engineering Calculator", len(ENG)),
    ("/materials/", "材料计算器", "Materials Calculator", len(MAT)),
    ("/geometry/", "几何计算器", "Geometry Calculator", 29),
    ("/geometry/", "型钢规格表（GB/T 11263—2024）", "Steel Section Tables (GB/T 11263—2024)", 3),
]


def bi_attr(zh, en):
    return 'data-zh="%s" data-en="%s"' % (zh, en)


def li(items):
    out = []
    for u, zh, en in items:
        out.append('        <li><a href="%s" data-zh="%s" data-en="%s">%s</a></li>' % (u, zh, en, zh))
    return "\n".join(out)


def build_block():
    with io.open(GEO_JSON, encoding="utf-8") as f:
        geo = json.load(f)
    geo_items = []
    for g in geo:
        en_name = EN_I18N.get("geo." + g["id"], g["name"])
        geo_items.append(("/geometry/%s/" % GEO_SLUG.get(g["id"], g["id"]),
                          "%s在线计算" % g["name"], "%s calculator" % en_name))
    total = 1 + len(ENG) + len(MAT) + len(geo_items) + len(STEEL)

    parts = []
    parts.append('<!-- site-index:start -->')
    parts.append('<section class="seo-sec site-index" id="site-index">')
    parts.append('  <h2 %s>全部计算工具索引（共 %d 项）</h2>'
                 % (bi_attr("全部计算工具索引（共 %d 项）" % total,
                            "All calculators &amp; steel tables (%d tools)" % total), total))
    parts.append('  <p class="si-lead" data-zh="本站每项工具都有独立网址，可直接收藏、分享或从搜索引擎进入；点击下方任一名称即可打开对应计算器。型钢规格依据 GB/T 11263—2024 整理。" '
                 'data-en="Every tool on this site has its own URL — bookmark, share or find it via search. Click any name below to open the calculator. Steel section data follows GB/T 11263—2024.">'
                 '本站每项工具都有独立网址，可直接收藏、分享或从搜索引擎进入；点击下方任一名称即可打开对应计算器。型钢规格依据 GB/T 11263—2024 整理。</p>')
    parts.append('  <div class="si-groups">')

    for href, zh, en, cnt in GROUPS:
        cls = "si-group si-group-wide" if href == "/geometry/" and zh != "几何计算器" else "si-group"
        if zh == "几何计算器":
            cls = "si-group si-group-wide"
        parts.append('    <div class="%s">' % cls)
        parts.append('      <h3><a href="%s" %s>%s</a><span class="si-count">%d</span></h3>'
                     % (href, bi_attr(zh, en), zh, cnt))
        if zh == "科学计算器":
            parts.append('      <ul>')
            parts.append(li([SCI_ITEM]))
        elif zh == "工程计算器":
            parts.append('      <ul>')
            parts.append(li(ENG))
        elif zh == "材料计算器":
            parts.append('      <ul>')
            parts.append(li(MAT))
        elif zh == "几何计算器":
            parts.append('      <ul class="si-cols">')
            parts.append(li(geo_items))
        else:
            parts.append('      <ul>')
            parts.append(li(STEEL))
        parts.append('      </ul>')
        parts.append('    </div>')

    parts.append('  </div>')
    parts.append('</section>')
    parts.append('<!-- site-index:end -->')
    return "\n".join(parts)


def main():
    block = build_block()
    p = os.path.join(ROOT, "index.html")
    with io.open(p, encoding="utf-8") as f:
        html = f.read()
    if "<!-- site-index:start -->" in html:
        html = re.sub(r'<!-- site-index:start -->.*?<!-- site-index:end -->', block, html, count=1, flags=re.S)
        action = "replaced"
    else:
        if '<p class="seo-copy">' not in html:
            raise SystemExit("未找到 seo-copy 锚点，无法插入")
        html = html.replace('<p class="seo-copy">', block + '\n  <p class="seo-copy">', 1)
        action = "inserted"
    with io.open(p, "w", encoding="utf-8") as f:
        f.write(html)
    print("%s site index -> index.html, links=%d, data-en=%d"
          % (action, html.count('<li><a href="/'), html.count('data-en')))


if __name__ == "__main__":
    main()
