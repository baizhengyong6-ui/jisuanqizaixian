# -*- coding: utf-8 -*-
"""生成三个型钢数据表页面（GB/T 11263—2024）：
/geometry/h-beam-size-list/  H型钢截面公称尺寸、截面面积、理论重量及截面特性
/geometry/hk-beam-size-list/ HK型钢截面公称尺寸、截面面积、理论重量及截面特性
/geometry/t-beam-size-list/  剖分T型钢截面公称尺寸、截面面积、理论重量及截面特性
复用 index.html 模板；body[data-steel] 隐藏四视图，注入数据表组件 + 文档区。
"""
import os, re, json, io

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
BASE = "https://engcalculator.work"

with io.open(os.path.join(ROOT, "index.html"), encoding="utf-8") as f:
    home = f.read()
with io.open(os.path.join(HERE, "steel_data.json"), encoding="utf-8") as f:
    steel = json.load(f)

def esc(x):
    return (x or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

# ---------- 列定义 ----------
# 数据列（steel_data.json cells 索引 → 显示列名），型号列为 model/mark 单独处理
COLS_H = [("H","mm",0),("B","mm",1),("t₁","mm",2),("t₂","mm",3),("r","mm",4),
          ("A","cm²",5),("理论重量","kg/m",6),("外表面积","m²/m",7),
          ("I_x","cm⁴",8),("I_y","cm⁴",9),("i_x","cm",10),("i_y","cm",11),
          ("W_x","cm³",12),("W_y","cm³",13)]
COLS_T = [("h","mm",0),("B","mm",1),("t₁","mm",2),("t₂","mm",3),("r","mm",4),
          ("A","cm²",5),("理论重量","kg/m",6),("外表面积","m²/m",7),
          ("I_x","cm⁴",8),("I_y","cm⁴",9),("i_x","cm",10),("i_y","cm",11),
          ("W_x","cm³",12),("W_y","cm³",13),("C_x","cm",14)]

def group_head(col_defs):
    """两行表头：行1组名，行2列名"""
    g = lambda name, span: '<th class="grp" colspan="%d">%s</th>' % (span, name)
    s = lambda name: '<th rowspan="2">%s</th>' % name
    row1 = (s("型号（高度×宽度）")
            + g("截面公称尺寸 mm", 5)
            + s("截面面积 cm²") + s("理论重量 kg/m") + s("外表面积 m²/m")
            + g("惯性矩 cm⁴", 2) + g("惯性半径 cm", 2) + g("截面模数 cm³", 2))
    row2 = "".join('<th>%s</th>' % esc(n) for n, u, i in col_defs[:14])
    if len(col_defs) == 15:  # 剖分T型钢附加列
        row1 += s("重心 C_x cm") + s("对应H型钢型号")
        row2 += ""
    return ("<thead><tr class='grp'>%s</tr><tr>%s</tr></thead>"
            % (row1, row2))

def table_body(key):
    d = steel[key]
    col_defs = COLS_T if key == "t" else COLS_H
    rows = []
    prev = None
    for r in d["rows"]:
        gs = ' class="group-start"' if (prev is not None and r["model"] != prev) else ""
        prev = r["model"]
        mark_html = '<span class="mark-tri">△</span>' if r["mark"] else ""
        tds = ['<td>%s%s</td>' % (mark_html, esc(r["model"]))]
        for n, u, i in col_defs:
            tds.append("<td>%s</td>" % esc(r["cells"][i]))
        if key == "t":
            tds.append("<td>%s</td>" % esc(r["cells"][15]))  # 对应H型钢型号
        attr = ' data-mark="1"' if r["mark"] else ""
        rows.append("<tr%s%s>%s</tr>" % (attr, gs, "".join(tds)))
    return "".join(rows)

def pick_example(key):
    """从数据中取一个代表行生成算例"""
    d = steel[key]
    rows = d["rows"]
    cand = next((r for r in rows if r["mark"]), rows[0])
    c = cand["cells"]
    if key == "t":
        return (cand["model"], c[0], c[1], c[5], c[6], c[15])
    return (cand["model"], c[0], c[1], c[5], c[6], None)

def build_page(key, path, title, desc, kw, h1, lead, formulas, example_rows, tip):
    canonical = BASE + "/" + path + "/"
    html = home
    # 移除模板自带 tool-doc
    html = re.sub(r"\n\s*<article class=\"tool-doc\">.*?</article>", "", html, count=1, flags=re.S)
    # SEO meta
    html = re.sub(r"<title>.*?</title>", "<title>%s</title>" % esc(title), html, count=1, flags=re.S)
    html = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="%s">' % esc(desc), html, count=1)
    html = re.sub(r'<meta name="keywords" content="[^"]*">', '<meta name="keywords" content="%s">' % esc(kw), html, count=1)
    html = html.replace('<link rel="canonical" href="https://engcalculator.work/">',
                        '<link rel="canonical" href="%s">' % canonical, 1)
    html = re.sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="%s">' % esc(title), html, count=1)
    html = re.sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="%s">' % esc(desc), html, count=1)
    html = re.sub(r'<meta property="og:url" content="[^"]*">', '<meta property="og:url" content="%s">' % canonical, html, count=1)
    html = re.sub(r'<meta name="twitter:title" content="[^"]*">', '<meta name="twitter:title" content="%s">' % esc(title), html, count=1)
    html = re.sub(r'<meta name="twitter:description" content="[^"]*">', '<meta property="og:description" content="%s">' % esc(desc), html, count=1)
    # JSON-LD
    crumbs = [("首页", "/"), ("几何计算器", "/geometry/"), (h1, "/" + path + "/")]
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "WebApplication", "name": h1, "url": canonical, "description": desc,
             "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any (Web Browser)",
             "inLanguage": ["zh-CN", "zh-TW", "en"], "isAccessibleForFree": True,
             "offers": {"@type": "Offer", "price": "0", "priceCurrency": "CNY"},
             "featureList": kw},
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": i + 1, "name": n, "item": BASE + u}
                for i, (n, u) in enumerate(crumbs)]},
        ],
    }
    ld_json = json.dumps(ld, ensure_ascii=False, indent=2)
    html = re.sub(r'<script type="application/ld\+json">.*?</script>',
                  '<script type="application/ld+json">\n%s\n</script>' % ld_json, html, count=1, flags=re.S)
    # 资源绝对路径
    html = html.replace('href="style.css"', 'href="/style.css"')
    html = html.replace('src="i18n.js"', 'src="/i18n.js"').replace('src="app.js"', 'src="/app.js"')
    # body 属性
    html = html.replace("<body>", '<body data-page="%s" data-steel="%s">' % (path.replace("/", "-"), key), 1)
    # 导航 active：steel 子项
    html = re.sub(r'class="nav-sub-item"(\s+href="/%s/")' % re.escape(path),
                  r'class="nav-sub-item active"\1', html, count=1)
    for other in ("sci", "eng", "mat", "geo"):
        html = re.sub(r'class="nav-item active nav-%s"' % other, 'class="nav-item nav-%s"' % other, html, count=1)
    # 隐藏语言选择器在 steel 页无词条冲突——保留（i18n 正常作用于导航）
    # 注入：数据表组件（main 顶部）+ tool-doc（main 底部）
    has_mark = key != "t"
    mark_toggle = ('<label class="steel-mark-toggle"><input type="checkbox" id="steelMarkOnly">'
                   '仅显示 △ 基准规格</label>') if has_mark else ""
    ex = example_rows
    ex_html = "".join("<tr><th>%s</th><td>%s</td></tr>" % (esc(k2), esc(v2)) for k2, v2 in ex)
    f_html = "".join("<li><b>%s</b><span>%s</span></li>" % (esc(k2), esc(v2)) for k2, v2 in formulas)
    crumb_html = " › ".join('<a href="%s">%s</a>' % (u, esc(n)) for n, u in crumbs)
    count_txt = steel[key]["count"]
    widget = """<article class="steel-doc">
  <div class="steel-toolbar">
    <input type="text" id="steelFilter" placeholder="筛选：输入型号 / 尺寸 / 参数，如 100×50、H400、t2=12" aria-label="筛选数据">
    %(mark)s
    <span class="steel-count" id="steelCount">共 %(count)d 行</span>
  </div>
  <div class="steel-scroller">
    <table class="steel-table">
%(head)s
      <tbody id="steelBody">
%(body)s
      </tbody>
    </table>
  </div>
  <p class="steel-note">数据来源：<b>GB/T 11263—2024《热轧H型钢和剖分T型钢》</b>附录规格表；%(markNote)s单击行内数据可直接阅读。筛选支持型号、任意尺寸与参数关键字。</p>
</article>""" % dict(
        mark=mark_toggle, count=count_txt,
        head=group_head(COLS_T if key == "t" else COLS_H),
        body=table_body(key),
        markNote=("带 <b>△</b> 标记的为标准推荐优先订货的基准规格。" if has_mark
                  else "剖分T型钢由对应 H 型钢于腹板中部剖分而成，C<sub>x</sub> 为截面重心至翼缘外侧距离。"))

    article = """<article class="tool-doc">
  <nav class="doc-crumb">%(crumb)s</nav>
  <h1>%(h1)s</h1>
  <p class="doc-lead">%(lead)s</p>
  <section class="doc-sec"><h2>计算公式</h2><ul class="doc-formulas">%(f)s</ul></section>
  <section class="doc-sec"><h2>计算示例</h2><table class="doc-example">%(e)s</table></section>
  <p class="doc-tip">%(tip)s</p>
</article>""" % dict(crumb=crumb_html, h1=esc(h1), lead=esc(lead), f=f_html, e=ex_html, tip=esc(tip))

    html = html.replace("<main class=\"main\">", "<main class=\"main\">\n    " + widget, 1)
    html = html.replace("  </main>", "    " + article + "\n  </main>", 1)
    html = html.replace('<script src="/app.js"></script>',
                        '<script src="/app.js"></script>\n<script src="/steel-table.js"></script>', 1)
    target = os.path.join(ROOT, path, "index.html")
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with io.open(target, "w", encoding="utf-8") as f:
        f.write(html)
    return target

# ---------- 页面定义 ----------
ex_h = pick_example("h")
ex_t = pick_example("t")
# ex: (model, H, B, A, W, link)

PAGES = [
    dict(key="h", path="geometry/h-beam-size-list",
         title="H型钢截面公称尺寸、截面面积、理论重量及截面特性 - 工程计算工具箱",
         desc="GB/T 11263—2024 热轧H型钢截面公称尺寸、截面面积、理论重量及截面特性完整规格表，含 %d 行规格数据，覆盖 HW/HM/HN 系列，支持型号、尺寸、参数关键字筛选与△基准规格过滤，附截面特性计算公式与算例。" % steel["h"]["count"],
         kw="H型钢规格表,GB/T 11263,H型钢理论重量,H型钢截面特性,热轧H型钢,H型钢尺寸表,HW,HM,HN,型钢截面面积",
         h1="H型钢截面公称尺寸、截面面积、理论重量及截面特性",
         lead="按 GB/T 11263—2024 收录热轧 H 型钢全部 %d 个规格的公称尺寸、截面面积、理论重量与截面特性（惯性矩、惯性半径、截面模数），带 △ 标记的为基准规格，支持关键字即时筛选。" % steel["h"]["count"],
         formulas=[
             ("理论重量", "m = ρ·A = 0.785 × A（kg/m，A 单位 cm²，钢密度 7.85 g/cm³）"),
             ("惯性半径", "i = √(I / A)"),
             ("截面模数", "W = I / (H/2)"),
             ("截面面积", "A ≈ 2B·t₂ + (H − 2t₂)·t₁（含圆角修正以标准表为准）"),
         ],
         example=[
             ("型号", "H%s（△基准规格）" % ex_h[0] if ex_h[5] else "H%s" % ex_h[0]),
             ("公称尺寸", "H=%s mm，B=%s mm" % (ex_h[1], ex_h[2])),
             ("截面面积 / 重量", "A = %s cm² → 理论重量 %s kg/m" % (ex_h[3], ex_h[4])),
             ("说明", "10 m 长该规格理论重量约 %.0f kg" % (float(ex_h[4]) * 10)),
         ],
         tip="以上数据摘自 GB/T 11263—2024 附录，用于选型与工程量估算；实际下料重量以质保书或过磅为准。"),
    dict(key="hk", path="geometry/hk-beam-size-list",
         title="HK型钢截面公称尺寸、截面面积、理论重量及截面特性 - 工程计算工具箱",
         desc="热轧HK型钢（欧标宽翼缘H型钢，EN 10034 系列）截面公称尺寸、截面面积、理论重量及截面特性完整规格表，含 %d 行规格数据，覆盖 HK100×100 至 HK1200×400，支持关键字筛选，附计算公式与算例。" % steel["hk"]["count"],
         kw="HK型钢规格表,HK型钢理论重量,欧标H型钢,EN 10034,HK型钢截面特性,宽翼缘H型钢,HK型钢尺寸表",
         h1="HK型钢截面公称尺寸、截面面积、理论重量及截面特性",
         lead="收录热轧 HK 型钢（欧标宽翼缘系列）全部 %d 个规格的公称尺寸、截面面积、理论重量与截面特性，从 HK100×100 至 HK1200×400，支持型号、尺寸、参数关键字即时筛选。" % steel["hk"]["count"],
         formulas=[
             ("理论重量", "m = ρ·A = 0.785 × A（kg/m，A 单位 cm²）"),
             ("惯性半径", "i = √(I / A)"),
             ("截面模数", "W = I / (H/2)"),
             ("翼缘宽厚比", "HK 系列翼缘较宽，B 通常不小于 H 的 2/3，适合柱与重载梁"),
         ],
         example=None,  # 下方动态生成
         tip="HK 型钢按欧洲标准 EN 10034 组织生产，与国产 H 型钢（GB/T 11263）系列尺寸不同，选用时注意对应关系；重量为理论值，实际以质保书为准。"),
    dict(key="t", path="geometry/t-beam-size-list",
         title="剖分T型钢截面公称尺寸、截面面积、理论重量及截面特性 - 工程计算工具箱",
         desc="剖分T型钢（由热轧H型钢腹板剖分而成）截面公称尺寸、截面面积、理论重量及截面特性完整规格表，含 %d 行规格数据，附重心 Cx、对应H型钢系列型号，支持关键字筛选，附计算公式与算例。" % steel["t"]["count"],
         kw="剖分T型钢规格表,T型钢理论重量,剖分T型钢截面特性,GB/T 11263,T型钢尺寸表,TW,TM,TN",
         h1="剖分T型钢截面公称尺寸、截面面积、理论重量及截面特性",
         lead="收录剖分 T 型钢全部 %d 个规格的公称尺寸、截面面积、理论重量、截面特性及重心位置 Cx，并给出对应的 H 型钢系列型号，支持关键字即时筛选。" % steel["t"]["count"],
         formulas=[
             ("理论重量", "m = ρ·A = 0.785 × A（kg/m，A 单位 cm²）"),
             ("重心位置", "Cx 为截面重心至翼缘外侧的距离（cm）"),
             ("剖分关系", "T 型钢由对应 H 型钢沿腹板中部剖分而成，截面面积约为对应 H 型钢的 1/2"),
             ("截面模数", "W = I / Cx（对翼缘外侧纤维）"),
         ],
         example=[
             ("型号", "T%s" % ex_t[0]),
             ("公称尺寸", "h=%s mm，B=%s mm" % (ex_t[1], ex_t[2])),
             ("截面面积 / 重量", "A = %s cm² → 理论重量 %s kg/m" % (ex_t[3], ex_t[4])),
             ("对应H型钢", "%s（腹板剖分即得）" % ex_t[5]),
         ],
         tip="剖分 T 型钢常用于桁架弦杆、组合梁翼缘等场合；其截面对单边不对称，验算时应取 Cx 计算截面模数。"),
]

# HK 页算例动态生成（取首行规格）
rows_hk = steel["hk"]["rows"]
c0 = rows_hk[0]["cells"]
PAGES[1]["example"] = [
    ("型号", "HK%s" % rows_hk[0]["model"]),
    ("公称尺寸", "H=%s mm，B=%s mm" % (c0[0], c0[1])),
    ("截面面积 / 重量", "A = %s cm² → 理论重量 %s kg/m" % (c0[5], c0[6])),
    ("说明", "该系列翼缘较宽（B≈H），适合用作框架柱"),
]

count = 0
for p in PAGES:
    build_page(p["key"], p["path"], p["title"], p["desc"], p["kw"], p["h1"],
               p["lead"], p["formulas"], p["example"], p["tip"])
    count += 1
print("生成型钢页面数:", count)
