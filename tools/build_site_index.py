# -*- coding: utf-8 -*-
"""生成全站静态工具索引（site index），写入 index.html 页脚。
目的：让搜索引擎爬虫从任意页面都能顺着真实 <a href> 走遍全站 39 个功能页，
不依赖 JS 生成的导航按钮与 sitemap。幂等：已有标记块则整体替换。
"""
import io, json, os

ROOT = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\scientific-calculator"
GEO_JSON = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\geo_data.json"

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

ENG = [("/engineering/unit-conversion/", "工程单位换算器（长度 / 力 / 应力 / 力矩）"),
       ("/engineering/section-properties/", "截面几何特性计算（面积 / 惯性矩 / 截面模量 / 回转半径）"),
       ("/engineering/simply-supported-beam/", "简支梁均布荷载计算（弯矩 / 剪力 / 挠度）"),
       ("/engineering/stress-check/", "构件应力验算（轴心受力 / 受弯）")]

MAT = [("/materials/steel-weight/", "钢材理论重量计算器（型钢 / 钢板 / 钢管）"),
       ("/materials/density-conversion/", "密度重量体积换算（12 种工程材料）")]

STEEL = [("/geometry/h-beam-size-list/", "H 型钢规格表 · 公称尺寸 / 截面面积 / 理论重量 / 截面特性（431 行）"),
         ("/geometry/hk-beam-size-list/", "HK 型钢规格表 · 公称尺寸 / 截面面积 / 理论重量 / 截面特性（378 行）"),
         ("/geometry/t-beam-size-list/", "剖分 T 型钢规格表 · 公称尺寸 / 截面面积 / 理论重量 / 截面特性（80 行）")]


def li(items):
    return "\n".join('        <li><a href="%s">%s</a></li>' % (u, n) for u, n in items)


def build_block():
    with io.open(GEO_JSON, encoding="utf-8") as f:
        geo = json.load(f)
    geo_items = [("/geometry/%s/" % GEO_SLUG.get(g["id"], g["id"]), "%s在线计算" % g["name"]) for g in geo]
    total = 1 + len(ENG) + len(MAT) + len(geo_items) + len(STEEL)

    parts = []
    parts.append('<!-- site-index:start -->')
    parts.append('<section class="seo-sec site-index" id="site-index">')
    parts.append('  <h2>全部计算工具索引（共 %d 项）</h2>' % total)
    parts.append('  <p class="si-lead">本站每项工具都有独立网址，可直接收藏、分享或从搜索引擎进入；'
                 '点击下方任一名称即可打开对应计算器。型钢规格依据 GB/T 11263—2024 整理。</p>')
    parts.append('  <div class="si-groups">')

    parts.append('    <div class="si-group">')
    parts.append('      <h3><a href="/scientific/">科学计算器</a><span class="si-count">1</span></h3>')
    parts.append('      <ul>')
    parts.append(li([("/scientific/", "在线科学计算器（四则 / 幂 / 阶乘 / 三角与反三角函数 / 对数）")]))
    parts.append('      </ul>')
    parts.append('    </div>')

    parts.append('    <div class="si-group">')
    parts.append('      <h3><a href="/engineering/">工程计算器</a><span class="si-count">%d</span></h3>' % len(ENG))
    parts.append('      <ul>')
    parts.append(li(ENG))
    parts.append('      </ul>')
    parts.append('    </div>')

    parts.append('    <div class="si-group">')
    parts.append('      <h3><a href="/materials/">材料计算器</a><span class="si-count">%d</span></h3>' % len(MAT))
    parts.append('      <ul>')
    parts.append(li(MAT))
    parts.append('      </ul>')
    parts.append('    </div>')

    parts.append('    <div class="si-group si-group-wide">')
    parts.append('      <h3><a href="/geometry/">几何计算器</a><span class="si-count">%d</span></h3>' % len(geo_items))
    parts.append('      <ul class="si-cols">')
    parts.append(li(geo_items))
    parts.append('      </ul>')
    parts.append('    </div>')

    parts.append('    <div class="si-group si-group-wide">')
    parts.append('      <h3><a href="/geometry/">型钢规格表（GB/T 11263—2024）</a><span class="si-count">%d</span></h3>' % len(STEEL))
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
        import re
        html = re.sub(r'<!-- site-index:start -->.*?<!-- site-index:end -->', block, html, count=1, flags=re.S)
        action = "replaced"
    else:
        if '<p class="seo-copy">' not in html:
            raise SystemExit("未找到 seo-copy 锚点，无法插入")
        html = html.replace('<p class="seo-copy">', block + '\n  <p class="seo-copy">', 1)
        action = "inserted"
    with io.open(p, "w", encoding="utf-8") as f:
        f.write(html)
    print("%s site index -> index.html, links=%d" % (action, html.count('<li><a href="/')))


if __name__ == "__main__":
    main()
