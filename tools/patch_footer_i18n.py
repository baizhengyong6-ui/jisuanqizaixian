# -*- coding: utf-8 -*-
"""首页页脚静态区（关于/四大模块/FAQ）加 data-zh/data-en 双语属性。幂等。"""
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
P = os.path.join(ROOT, "index.html")

with io.open(P, encoding="utf-8") as f:
    h = f.read()

if 'data-en="About Engineering Calculator Toolbox"' in h:
    print("已处理过，跳过")
    raise SystemExit

def wrap(tag, text, en):
    # tag 形如 '<h2>'：属性必须放在 '>' 之前，否则会生成 '<h2> data-zh=...>'，
    # 浏览器把属性当可见文本渲染（2026-11-27 乱码事故根因）
    name = tag[1:-1]        # 'h2' / 'h3' / 'p'
    open_tag = tag[:-1]     # '<h2'
    old = "%s%s</%s>" % (tag, text, name)
    new = '%s data-zh="%s" data-en="%s">%s</%s>' % (open_tag, text, en, text, name)
    return old, new

pairs = []
pairs.append(wrap("<h2>", "关于工程计算工具箱", "About Engineering Calculator Toolbox"))
pairs.append(wrap("<h2>", "四大计算模块", "Four Calculation Modules"))
pairs.append(wrap("<h2>", "常见问题", "FAQ"))

para_map = [
    ("工程计算工具箱是一个免费在线计算平台，把工程设计与日常工作常用的计算工具整合在一个页面里，无需安装软件、无需注册，打开浏览器即可使用。工具箱支持简体中文、繁体中文、英文等 21 种语言，并可根据访问者 IP 自动切换；支持深色与浅色主题，适配电脑和手机屏幕。",
     "Engineering Calculator Toolbox is a free online calculation platform that brings the calculation tools used in engineering design and daily work together on one page — no software to install, no registration, just open your browser. It supports 21 languages including Simplified Chinese, Traditional Chinese and English, switches automatically by visitor IP, offers dark and light themes, and adapts to desktop and mobile screens."),
    ("所有计算均在本地浏览器中完成，输入数据不会上传到服务器，适合工程师、设计师、施工人员、学生以及需要在现场快速核算的工程人员使用。",
     "All calculations run locally in your browser; no input data is uploaded to any server. It is built for engineers, designers, site staff, students and anyone who needs quick verification on the job."),
    ("不需要。工程计算工具箱所有功能免费开放，无需注册账号，打开网页即可使用。",
     "No. Every tool is free and open — no account needed, just open the page."),
    ("不会。所有计算都在您的浏览器本地执行，输入的数据不会发送到服务器。仅语言与主题偏好会保存在本机浏览器中。",
     "No. All calculations run locally in your browser and inputs are never sent to a server. Only your language and theme preferences are saved on your device."),
    ("支持简体中文、繁体中文、英文、日语、韩语、德语、法语、西班牙语、葡萄牙语、俄语、印地语、阿拉伯语等 21 种语言，首次访问会根据 IP 自动选择，也可以手动切换。",
     "21 languages including Simplified Chinese, Traditional Chinese, English, Japanese, Korean, German, French, Spanish, Portuguese, Russian, Hindi and Arabic. The language is auto-selected by IP on first visit and can be switched manually."),
    ("长度单位统一为毫米（mm），面积结果为平方毫米（mm²），体积结果为立方毫米（mm³），周长结果为毫米（mm）。",
     "Lengths are in millimetres (mm), areas in square millimetres (mm²), volumes in cubic millimetres (mm³) and perimeters in millimetres (mm)."),
    ("可以。页面采用响应式设计，在手机、平板和电脑上都能正常使用，导航栏在窄屏下会自动调整为横向布局。",
     "Yes. The pages are responsive and work on phones, tablets and desktops; the side navigation collapses to a horizontal layout on narrow screens."),
    ("圆台体积公式为 V = ⅓πh(r² + rR + R²)，其中 r 为上底半径、R 为下底半径、h 为高。在几何计算器中选择\u201c圆台体积\u201d，输入这三个参数即可得到结果。",
     "The frustum volume formula is V = ⅓πh(r² + rR + R²), where r is the top radius, R the bottom radius and h the height. Pick \u201cFrustum volume\u201d in the geometry calculator and enter these three parameters."),
    ("支持四则运算、括号、幂运算、阶乘、百分号与隐式乘法，内置正弦、余弦、正切及反三角函数、对数、自然对数与平方根，可切换角度制 DEG 与弧度制 RAD，支持 π、e、ANS 常量、表达式历史记录与键盘输入。回车计算时自动补全未闭合的右括号。",
     "Arithmetic, brackets, powers, factorials, percent and implicit multiplication; built-in sine, cosine, tangent and inverse trigonometric functions, logarithms, natural log and square root; DEG/RAD switching; constants π, e and ANS; expression history and keyboard input. Pressing Enter auto-closes unbalanced brackets."),
    ("提供长度、力、应力、力矩、质量、功与功率等单位换算；矩形、圆形、环形截面的面积、惯性矩、截面模量与回转半径计算；简支梁均布荷载下的弯矩、剪力与挠度计算；以及轴心受力与受弯构件的应力验算。",
     "Unit conversion for length, force, stress, moment, mass, work and power; area, second moment, section modulus and radius of gyration for rectangular, circular and annular sections; bending moment, shear force and deflection of simply supported beams under uniform load; and axial/bending stress checks."),
    ("计算钢板、钢筋、钢管、角钢、槽钢、工字钢等常用钢材的理论重量；提供常见材料的密度查询，支持由体积计算重量、由重量反算体积，覆盖 12 种常用工程材料，密度单位为吨每立方米。",
     "Theoretical weight of steel plates, bars, pipes, angles, channels and I-beams; density lookup for common materials with weight-from-volume and volume-from-weight conversion across 12 engineering materials in t/m³."),
    ("包含 29 项常用几何计算：圆锥表面积、圆台表面积、圆锥体积、圆台体积、圆柱侧面积、圆柱表面积、圆柱体积、长方体体积与表面积、正方体体积与表面积、扇形面积与周长、环形面积、圆形面积与周长、梯形面积与周长、菱形面积与周长、平行四边形面积与周长、三角形面积与周长、正方形面积与周长、矩形与长方形面积及周长。每项均配有标注参数位置的几何示意图。",
     "29 common geometry calculations: cone and frustum surface area, cone and frustum volume, cylinder lateral/surface area and volume, cuboid and cube volume and surface area, sector area and perimeter, annulus area, circle area and circumference, trapezoid, rhombus, parallelogram, triangle, square and rectangle area and perimeter. Each comes with a diagram marking the required parameters."),
]
for zh, en in para_map:
    pairs.append(wrap("<p>", zh, en))

h3_map = [
    ("科学计算器", "Scientific Calculator"),
    ("工程计算器", "Engineering Calculator"),
    ("材料计算器", "Materials Calculator"),
    ("几何计算器", "Geometry Calculator"),
    ("这个在线计算器需要付费吗？", "Is this online calculator free to use?"),
    ("计算数据会上传或保存吗？", "Are my inputs uploaded or stored anywhere?"),
    ("支持哪些语言？", "Which languages are supported?"),
    ("几何计算的单位是什么？", "What units does the geometry calculator use?"),
    ("可以在手机上使用吗？", "Can I use it on a mobile phone?"),
    ("圆台体积如何计算？", "How do I calculate the volume of a frustum?"),
]
for zh, en in h3_map:
    pairs.append(wrap("<h3>", zh, en))

for old, new in pairs:
    assert old in h, old[:60]
    h = h.replace(old, new, 1)

with io.open(P, "w", encoding="utf-8") as f:
    f.write(h)
print("footer 双语化完成，处理 %d 处" % len(pairs))
