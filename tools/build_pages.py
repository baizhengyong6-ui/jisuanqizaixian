# -*- coding: utf-8 -*-
"""从 index.html 模板生成各工具的独立 URL 页面。
每个页面：独立 head meta、可见 H1、公式说明、算例；复用完整 app DOM 保证功能不破坏。
通过 body[data-sub] + CSS 只展示当前工具卡片；data-geo-item 用于几何子项预选。
"""
import os, re, json, io

ROOT = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\scientific-calculator"
BASE = "https://engcalculator.work"

with io.open(os.path.join(ROOT, "index.html"), encoding="utf-8") as f:
    home = f.read()

with io.open(r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\geo_data.json", encoding="utf-8") as f:
    geo = json.load(f)

# ---------- 工具定义 ----------
# view: 激活的视图; sub: 显示的卡片标识(相对视图内的卡片); path: URL 目录
TOOLS = [
    dict(path="scientific", view="view-sci", sub=None, nav="sci",
         name="科学计算器", kw="科学计算器,三角函数,反三角函数,对数计算,阶乘计算,DEG RAD",
         h1="在线科学计算器",
         desc="免费在线科学计算器，支持四则运算、括号、幂、阶乘、三角函数与反三角函数、对数、平方根，可切换角度制与弧度制，支持表达式历史与键盘输入，回车自动补全右括号。",
         lead="科学计算器支持完整表达式运算与常用科学函数，所有计算在本地浏览器完成，无需安装、无需注册。",
         formulas=[("四则与括号", "a + b、a − b、a × b、a ÷ b，支持括号优先级与隐式乘法，如 2(3+4)=14"),
                   ("幂与阶乘", "a^b 计算幂；n! 计算阶乘，如 5! = 120"),
                   ("三角函数", "sin、cos、tan 及反函数 arcsin、arccos、arctan，支持 DEG 角度制 / RAD 弧度制"),
                   ("对数与根式", "ln(x) 自然对数、log(x) 常用对数、√(x) 平方根，如 √(9) = 3")],
         example=[("输入表达式", "sin(30) + 2^3"), ("角度制", "DEG（30°）"),
                  ("计算", "sin(30°)=0.5，2^3=8"), ("结果", "0.5 + 8 = 8.5")]),

    dict(path="engineering/unit-conversion", view="view-eng", sub="eng-unit", nav="eng",
         name="单位换算", kw="单位换算,长度换算,力换算,应力换算,力矩换算,质量换算,功与功率换算",
         h1="在线工程单位换算器",
         desc="免费在线工程单位换算工具，覆盖长度、力、应力、力矩、质量、功与功率等常用工程单位，输入数值即时换算，可连续换算。",
         lead="工程单位换算器覆盖常用力学与几何单位，修改数值即时换算，切换目标单位可把结果回填继续换算。",
         formulas=[("长度", "1 in = 25.4 mm，1 ft = 0.3048 m，1 m = 1000 mm"),
                   ("力", "1 kN = 1000 N，1 kgf = 9.80665 N"),
                   ("应力", "1 MPa = 1 N/mm² = 10⁶ Pa"),
                   ("力矩", "1 kN·m = 10⁶ N·mm"),
                   ("功与功率", "1 kW·h = 3.6×10⁶ J，1 kW = 1000 W")],
         example=[("原式", "12 in"), ("目标单位", "mm"),
                  ("换算", "12 × 25.4"), ("结果", "304.8 mm")]),

    dict(path="engineering/section-properties", view="view-eng", sub="eng-sec", nav="eng",
         name="截面几何特性", kw="截面特性计算,惯性矩计算,截面模量,回转半径,矩形截面,圆形截面,环形截面",
         h1="截面几何特性计算器",
         desc="免费在线截面几何特性计算器，计算矩形、圆形、环形截面的面积、惯性矩、截面模量与回转半径，附计算公式与算例。",
         lead="截面几何特性计算器用于结构设计中常见截面的几何性质计算，结果可直接用于强度与刚度验算。",
         formulas=[("矩形截面", "A = b·h，I = b·h³/12，W = b·h²/6，i = √(I/A)"),
                   ("圆形截面", "A = πr²，I = πr⁴/4，W = πr³/4，i = r/2"),
                   ("环形截面", "A = π(R²−r²)，I = π(R⁴−r⁴)/4，W = I/R")],
         example=[("截面", "矩形 b=200 mm，h=400 mm"), ("面积 A", "200×400 = 80000 mm²"),
                  ("惯性矩 I", "200×400³/12 = 1.067×10⁹ mm⁴"),
                  ("截面模量 W", "200×400²/6 = 5.333×10⁶ mm³")]),

    dict(path="engineering/simply-supported-beam", view="view-eng", sub="eng-beam", nav="eng",
         name="简支梁均布荷载", kw="简支梁计算,均布荷载,弯矩计算,剪力计算,挠度计算,结构力学计算",
         h1="简支梁均布荷载计算器",
         desc="免费在线简支梁均布荷载计算器，输入均布荷载、跨度、弹性模量与惯性矩，即时计算最大弯矩、最大剪力与跨中挠度。",
         lead="简支梁均布荷载计算器用于快速估算梁在均布荷载作用下的内力与变形，挠度参考值按 L/400 估算。",
         formulas=[("最大弯矩", "M = q·L²/8"),
                   ("最大剪力", "V = q·L/2"),
                   ("跨中挠度", "f = 5q·L⁴/(384EI)"),
                   ("挠度限值", "[f] ≈ L/400（参考）")],
         example=[("输入", "q=10 kN/m，L=6 m，E=206 GPa，I=1×10⁸ mm⁴"),
                  ("最大弯矩", "10×6²/8 = 45 kN·m"),
                  ("最大剪力", "10×6/2 = 30 kN"),
                  ("跨中挠度", "约 8.8 mm（满足 L/400=15 mm）")]),

    dict(path="engineering/stress-check", view="view-eng", sub="eng-stress", nav="eng",
         name="应力验算", kw="应力验算,轴心受力,受弯应力,正应力计算,钢结构应力",
         h1="构件应力验算计算器",
         desc="免费在线应力验算工具，支持轴心受力 σ=N/A 与受弯 σ=M/W 两种工况，快速计算构件正应力，适用于钢结构与构件初步验算。",
         lead="应力验算器提供轴心受力与受弯两种基本工况的正应力计算，单位自动按 kN、mm 换算为 MPa。",
         formulas=[("轴心受力", "σ = N / A（N 为轴力，A 为截面积）"),
                   ("受弯应力", "σ = M / W（M 为弯矩，W 为截面模量）"),
                   ("单位换算", "1 kN = 1000 N，1 kN·m = 10⁶ N·mm，1 MPa = 1 N/mm²")],
         example=[("轴心受力", "N=100 kN，A=1000 mm²"),
                  ("轴心应力", "100000/1000 = 100 MPa"),
                  ("受弯应力", "M=50 kN·m，W=5×10⁵ mm³"),
                  ("受弯结果", "50×10⁶/5×10⁵ = 100 MPa")]),

    dict(path="materials/steel-weight", view="view-mat", sub="mat-steel", nav="mat",
         name="钢材理论重量", kw="钢材理论重量,钢板重量计算,钢筋重量,钢管重量,角钢重量,槽钢重量,工字钢重量",
         h1="钢材理论重量计算器",
         desc="免费在线钢材理论重量计算器，计算钢板、钢筋、钢管、角钢、槽钢、工字钢等常用钢材的理论重量，附计算公式与算例。",
         lead="钢材理论重量计算器按国家标准公称尺寸计算常用钢材每米或单件理论重量，适合材料计划与工程量估算。",
         formulas=[("钢板", "m = 7.85 × 厚度(mm) × 面积(m²) （kg）"),
                   ("钢筋", "m = 0.00617 × d² （kg/m，d 为直径 mm）"),
                   ("钢管", "m = 0.02466 × 壁厚 × (外径 − 壁厚) （kg/m）"),
                   ("钢材密度", "普通碳素钢取 7.85 g/cm³")],
         example=[("钢板", "厚 10 mm，面积 2 m²"),
                  ("计算", "7.85 × 10 × 2"),
                  ("结果", "157 kg"),
                  ("说明", "实际重量以质保书或过磅为准")]),

    dict(path="materials/density-conversion", view="view-mat", sub="mat-dens", nav="mat",
         name="密度重量体积换算", kw="密度换算,重量体积换算,密度计算器,吨立方米,材料密度",
         h1="密度重量体积换算器",
         desc="免费在线密度重量体积换算工具，覆盖 12 种常见工程材料密度，支持由体积计算重量、由重量反算体积。",
         lead="密度换算器提供常见材料的参考密度，支持体积 ↔ 重量双向换算，密度单位为吨每立方米（t/m³）。",
         formulas=[("由体积算重量", "m = ρ × V（重量 = 密度 × 体积）"),
                   ("由重量算体积", "V = m / ρ（体积 = 重量 ÷ 密度）"),
                   ("单位", "ρ 为 t/m³，V 为 m³，m 为 t")],
         example=[("材料", "普通钢材 ρ = 7.85 t/m³"),
                  ("体积", "V = 2 m³"),
                  ("计算", "7.85 × 2"),
                  ("结果", "15.7 t")]),

    dict(path="geometry", view="view-geo", sub=None, nav="geo",
         name="几何计算器", kw="几何计算器,面积计算,体积计算,周长计算,圆锥圆台圆柱计算",
         h1="在线几何计算器",
         desc="免费在线几何计算器，包含 29 项常用几何面积、体积与周长计算，每项配参数标注示意图，覆盖圆锥、圆台、圆柱、棱柱、扇形、梯形、菱形等。",
         lead="几何计算器收录 29 项常用几何计算，输入参数即时给出结果，并在图形上标注参数位置，便于理解与核对。",
         formulas=[("圆锥表面积", "S = πr² + πr·l，l = √(r²+h²)"),
                   ("圆台体积", "V = ⅓πh(r² + rR + R²)"),
                   ("圆柱体积", "V = πr²h"),
                   ("梯形面积", "S = (a + b)·h / 2"),
                   ("三角形面积", "S = a·h / 2")],
         example=[("圆台体积", "r=60 mm，R=100 mm，h=200 mm"),
                  ("公式", "⅓π×200×(60²+60×100+100²)"),
                  ("结果", "约 4.105×10⁶ mm³"),
                  ("单位", "长度 mm，体积 mm³")]),
]

# 几何 29 项 slug
GEO_SLUG = {
    "cone_sa":"cone-surface-area","frustum_sa":"frustum-surface-area","cone_vol":"cone-volume",
    "frustum_vol":"frustum-volume","cyl_lateral":"cylinder-lateral-area","cyl_sa":"cylinder-surface-area",
    "cyl_vol":"cylinder-volume","cuboid_vol":"cuboid-volume","cuboid_sa":"cuboid-surface-area",
    "cube_vol":"cube-volume","cube_sa":"cube-surface-area","sector_area":"sector-area",
    "sector_perim":"sector-perimeter","annulus_area":"annulus-area","circle_area":"circle-area",
    "circle_perim":"circle-circumference","trapezoid_area":"trapezoid-area","trapezoid_perim":"trapezoid-perimeter",
    "rhombus_area":"rhombus-area","rhombus_perim":"rhombus-perimeter","para_perim":"parallelogram-perimeter",
    "para_area":"parallelogram-area","tri_area":"triangle-area","tri_perim":"triangle-perimeter",
    "square_perim":"square-perimeter","square_area":"square-area","rect_calc":"rectangle-calculator",
    "rect_area":"rectangle-area","rect_perim":"rectangle-perimeter",
}

def esc(s):
    return (s or "").replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace('"',"&quot;")

def fmt_num(x):
    if isinstance(x, float):
        s = ("%.6f" % x).rstrip("0").rstrip(".")
        return s or "0"
    return str(x)

def build_article(h1, lead, formulas, example, crumbs):
    crumb_html = " › ".join('<a href="%s">%s</a>' % (u, esc(n)) for n, u in crumbs)
    frows = "".join("<li><b>%s</b><span>%s</span></li>" % (esc(k), esc(v)) for k, v in formulas)
    erows = "".join("<tr><th>%s</th><td>%s</td></tr>" % (esc(k), esc(v)) for k, v in example)
    return """<article class="tool-doc">
  <nav class="doc-crumb">%(crumb)s</nav>
  <h1>%(h1)s</h1>
  <p class="doc-lead">%(lead)s</p>
  <section class="doc-sec"><h2>计算公式</h2><ul class="doc-formulas">%(frows)s</ul></section>
  <section class="doc-sec"><h2>计算示例</h2><table class="doc-example">%(erows)s</table></section>
  <p class="doc-tip">以上结果由本页计算器实时生成，修改参数即可查看对应计算过程。所有计算均在浏览器本地完成，数据不上传服务器。</p>
</article>""" % dict(crumb=crumb_html, h1=esc(h1), lead=esc(lead), frows=frows, erows=erows)

def make_page(path, title, desc, keywords, h1, lead, formulas, example, active_view, sub, nav_active, crumbs, geo_item=None):
    canonical = BASE + "/" + path + "/"
    article = build_article(h1, lead, formulas, example, crumbs)
    # 替换 head 中的 SEO meta（用标记法）
    html = home
    # 先移除首页模板自带的说明文档区，避免与子页文档区重复
    html = re.sub(r'\n\s*<article class="tool-doc">.*?</article>', '', html, count=1, flags=re.S)
    html = re.sub(r"<title>.*?</title>", "<title>%s</title>" % esc(title), html, count=1, flags=re.S)
    html = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="%s">' % esc(desc), html, count=1)
    html = re.sub(r'<meta name="keywords" content="[^"]*">', '<meta name="keywords" content="%s">' % esc(keywords), html, count=1)
    html = html.replace('<link rel="canonical" href="https://engcalculator.work/">',
                        '<link rel="canonical" href="%s">' % canonical, 1)
    html = re.sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="%s">' % esc(title), html, count=1)
    html = re.sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="%s">' % esc(desc), html, count=1)
    html = re.sub(r'<meta property="og:url" content="[^"]*">', '<meta property="og:url" content="%s">' % canonical, html, count=1)
    html = re.sub(r'<meta name="twitter:title" content="[^"]*">', '<meta name="twitter:title" content="%s">' % esc(title), html, count=1)
    html = re.sub(r'<meta name="twitter:description" content="[^"]*">', '<meta name="twitter:description" content="%s">' % esc(desc), html, count=1)
    # JSON-LD：替换整个块
    ld = {
        "@context":"https://schema.org",
        "@graph":[
            {"@type":"WebApplication","name":h1,"url":canonical,"description":desc,
             "applicationCategory":"UtilitiesApplication","operatingSystem":"Any (Web Browser)",
             "inLanguage":["zh-CN","zh-TW","en"],"isAccessibleForFree":True,
             "offers":{"@type":"Offer","price":"0","priceCurrency":"CNY"},
             "featureList":keywords},
            {"@type":"BreadcrumbList","itemListElement":[
                {"@type":"ListItem","position":i+1,"name":n,"item":BASE+u} for i,(n,u) in enumerate(crumbs)]},
        ]
    }
    ld_json = json.dumps(ld, ensure_ascii=False, indent=2)
    html = re.sub(r'<script type="application/ld\+json">.*?</script>',
                  '<script type="application/ld+json">\n%s\n</script>' % ld_json, html, count=1, flags=re.S)
    # 资源路径改绝对（子目录页面）
    html = html.replace('href="style.css"', 'href="/style.css"')
    html = html.replace('src="i18n.js"', 'src="/i18n.js"').replace('src="app.js"', 'src="/app.js"')
    # body 属性
    attrs = 'data-page="%s"' % path.replace('/','-')
    if sub: attrs += ' data-sub="%s"' % sub
    if geo_item: attrs += ' data-geo-item="%s"' % geo_item
    html = html.replace("<body>", "<body %s>" % attrs, 1)
    # 导航 active
    html = re.sub(r'class="nav-item( active)? nav-%s"' % nav_active, 'class="nav-item active nav-%s"' % nav_active, html, count=1)
    for other in ("sci","eng","mat","geo"):
        if other != nav_active:
            html = re.sub(r'class="nav-item active nav-%s"' % other, 'class="nav-item nav-%s"' % other, html, count=1)
    # 视图 active
    for v in ("view-sci","view-eng","view-mat","view-geo"):
        want = 'class="view active" id="%s"' % v if v == active_view else 'class="view" id="%s"' % v
        html = re.sub(r'class="view(?: active)?" id="%s"' % v, want, html, count=1)
    # 注入 article 到 main 内最后（计算器视图下方），让计算器功能优先展示
    html = html.replace('  </main>', '    ' + article + '\n  </main>', 1)
    # 首页底部通用 SEO 区在子页简化掉（保留版权行）
    html = re.sub(r'<footer class="seo-content">.*?</footer>',
                  '<footer class="seo-content"><p class="seo-copy">© 工程计算工具箱 · 免费在线科学、工程、材料与几何计算工具 · <a href="/">返回首页</a></p></footer>',
                  html, count=1, flags=re.S)
    # sr-only h1 去掉，避免与可见 H1 重复
    html = re.sub(r'<h1 class="sr-only">.*?</h1>\s*', '', html, count=1, flags=re.S)
    # 写文件
    target = os.path.join(ROOT, path, "index.html")
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with io.open(target, "w", encoding="utf-8") as f:
        f.write(html)
    return target

count = 0
# 分类页：工程计算 / 材料计算
HUBS = [
    dict(path="engineering", view="view-eng", nav="eng", name="工程计算器",
         h1="工程计算器", desc="免费在线工程计算器，包含单位换算、截面几何特性、简支梁均布荷载与构件应力验算，附公式与算例。",
         kw="工程计算器,单位换算,截面特性,简支梁计算,应力验算",
         subs=[("单位换算","/engineering/unit-conversion/"),("截面几何特性","/engineering/section-properties/"),
               ("简支梁均布荷载","/engineering/simply-supported-beam/"),("应力验算","/engineering/stress-check/")]),
    dict(path="materials", view="view-mat", nav="mat", name="材料计算器",
         h1="材料计算器", desc="免费在线材料计算器，包含钢材理论重量计算与密度重量体积换算，覆盖常用钢材与 12 种工程材料。",
         kw="材料计算器,钢材理论重量,密度换算,重量体积换算",
         subs=[("钢材理论重量","/materials/steel-weight/"),("密度重量体积换算","/materials/density-conversion/")]),
]
for h in HUBS:
    links = "、".join('<a href="%s">%s</a>' % (u, esc(n)) for n, u in h["subs"])
    lead = "本分类包含 " + links + "，点击可进入对应工具页面。"
    formulas = [("分类工具", "、".join(n for n, u in h["subs"]))]
    example = [("使用说明", "选择上方任一工具进入独立页面"),("提示", "所有计算在本地浏览器完成，数据不上传")]
    make_page(h["path"], h["h1"] + " - 工程计算工具箱", h["desc"], h["kw"],
              h["h1"], lead, formulas, example, h["view"], None, h["nav"],
              [("首页","/"),(h["name"],"/"+h["path"]+"/")])
    count += 1

for t in TOOLS:
    crumbs = [("首页", "/")]
    if "/" in t["path"]:
        cat, leaf = t["path"].split("/", 1)
        cat_name = {"engineering":"工程计算器","materials":"材料计算器"}[cat]
        crumbs.append((cat_name, "/" + cat + "/"))
    crumbs.append((t["name"], "/" + t["path"] + "/"))
    make_page(t["path"], t["h1"] + " - 工程计算工具箱", t["desc"], t["kw"],
              t["h1"], t["lead"], t["formulas"], t["example"],
              t["view"], t["sub"], t["nav"], crumbs)
    count += 1

# 几何 29 子项页面
for g in geo:
    slug = GEO_SLUG[g["id"]]
    path = "geometry/" + slug
    fields_txt = "、".join("%s=%s" % (re.sub(r"\s*\(.*?\)", "", ff["label"]), fmt_num(ff["value"])) for ff in g["fields"])
    res_txt = "；".join("%s = %s %s" % (r["label"], fmt_num(r["value"]), r["unit"]) for r in g["results"])
    ex = [("输入参数", fields_txt)] + [(r["label"], "%s %s" % (fmt_num(r["value"]), r["unit"])) for r in g["results"]]
    ex.append(("说明", "结果由本页计算器按默认参数实时生成，可修改参数重新计算"))
    formulas = [("计算公式", g["fx"])]
    for ff in g["fields"]:
        formulas.append((re.sub(r"\s*\(.*?\)", "", ff["label"]), "输入值 %s（单位见输入框）" % fmt_num(ff["value"])))
    crumbs = [("首页","/"),("几何计算器","/geometry/"),(g["name"],"/"+path+"/")]
    kw = "%s,%s计算,几何计算,在线计算器,%s公式" % (g["name"], g["name"], g["name"])
    desc = "免费在线%s计算器。公式：%s。输入参数即时计算并给出结果，附参数标注示意图与计算示例。" % (g["name"], g["fx"])
    make_page(path, "%s计算器 - 在线%s计算 - 工程计算工具箱" % (g["name"], g["name"]),
              desc, kw, "%s计算器" % g["name"],
              "在线%s计算器，输入参数即时得到计算结果，并在图形上标注所需参数的位置。" % g["name"],
              formulas, ex, "view-geo", None, "geo", crumbs, geo_item=g["id"])
    count += 1

print("生成工具页面数:", count)
