# 在线工程计算工具箱 · Engineering Calculator

> **🌐 在线使用：<https://engcalculator.work/>**
>
> 免费、免注册、打开即用 —— 面向建筑结构、工艺设计、机械与材料从业者的在线工程计算工具站。
> 全部计算在浏览器本地完成，不上传任何数据。

---

## 简介

**在线工程计算工具箱**（engcalculator.work）是一个纯静态、零依赖的网页版工程计算工具集合。
把日常设计里最常用的一大堆零散小工具——科学计算器、单位换算、截面特性、简支梁内力、
钢材理论重量、几何面积体积、型钢规格表——收进同一个站点，**一项功能一个独立网址**，
收藏夹、微信、图纸会审群里都能直接发链接。

针对国内工程习惯做了本地化：单位默认公制（mm / cm / m、kN、kg、MPa），
型钢规格严格对齐 **GB/T 11263—2024**，钢材密度按 **7.85 g/cm³** 计算，
界面支持中文 / English 切换。

| 项目 | 说明 |
| --- | --- |
| 在线地址 | <https://engcalculator.work/> |
| 站点规模 | 43 个页面（5 个栏目页 + 38 个功能页 + 首页） |
| 技术形态 | 纯静态 HTML / CSS / JavaScript，无框架、无构建、无后端 |
| 数据存储 | 无。所有计算在浏览器端实时完成 |
| 托管 | 腾讯云 EdgeOne Makers（全球边缘加速 + HTTPS） |
| 适配 | 桌面 / 平板 / 手机响应式，深色毛玻璃 UI |

---

## 功能一览

### 🧮 科学计算器 — [/scientific/](https://engcalculator.work/scientific/)
四则运算、括号、乘方、开方、阶乘、三角函数与反三角函数、自然对数与常用对数；
角度制 / 弧度制一键切换；支持键盘输入、回车自动补右括号、表达式历史。

### ⚙️ 工程计算器 — [/engineering/](https://engcalculator.work/engineering/)

| 工具 | 网址 | 说明 |
| --- | --- | --- |
| 单位换算 | `/engineering/unit-conversion/` | 长度、面积、体积、质量、力、压力、力矩等常用工程单位互转 |
| 截面几何特性 | `/engineering/section-properties/` | 矩形、圆形、圆环、工字形等截面的面积 A、惯性矩 I、抵抗矩 W、回转半径 i |
| 简支梁计算 | `/engineering/simply-supported-beam/` | 均布荷载下支座反力、剪力、弯矩、挠度 |
| 构件应力验算 | `/engineering/stress-check/` | 轴向应力、弯曲应力与强度校核 |

### 📐 几何计算器 — [/geometry/](https://engcalculator.work/geometry/)

29 项常用几何量计算，每项配**参数标注示意图**，看清哪个是 r、哪个是 h 再填数：

- **平面图形**：正方形、矩形、三角形、平行四边形、梯形、菱形、圆、圆环、扇形
  —— 各自的面积与周长分项计算
- **立体图形**：正方体、长方体、圆柱、圆锥、圆台
  —— 表面积（含侧面积）、体积分项计算

> 顶部为**横向平铺按钮导航**，29 项一键切换，不需要下拉菜单翻找。

### 🧱 型钢规格表（GB/T 11263—2024）— 几何计算器栏目下

工程上真正会天天翻的三张表，全部做成可搜索的网页表格：

| 规格表 | 网址 | 数据行数 |
| --- | --- | --- |
| H 型钢截面公称尺寸、截面面积、理论重量及截面特性 | `/geometry/h-beam-size-list/` | 431 行（含 113 个 △ 基准规格） |
| HK 型钢截面公称尺寸、截面面积、理论重量及截面特性 | `/geometry/hk-beam-size-list/` | 378 行 |
| 剖分 T 型钢截面公称尺寸、截面面积、理论重量及截面特性 | `/geometry/t-beam-size-list/` | 80 行 |

共 **889 行**规格数据，列含：截面公称尺寸（H×B、t₁、t₂、r）、截面面积 A、
理论重量、惯性矩 Ix/Iy、截面模数 Wx/Wy、回转半径 ix/iy。
支持**关键字筛选**与**「只看 △ 基准规格」**开关，表头滚动吸顶，长表也不迷路。

### 🧪 材料计算器 — [/materials/](https://engcalculator.work/materials/)

| 工具 | 网址 | 说明 |
| --- | --- | --- |
| 钢材理论重量 | `/materials/steel-weight/` | 按规格与长度算钢材理论重量（密度 7.85 g/cm³） |
| 密度重量体积换算 | `/materials/density-conversion/` | 已知密度，在质量 / 体积 / 尺寸之间互算，内置 12 种常用工程材料 |

---

## 站点特点

- **一项功能一个独立网址**：`/geometry/cone-volume/` 这样的干净路径，方便分享、收藏、被搜索引擎收录。
- **计算过程透明**：每个计算器下方给出所用公式与一组代入算例，结果可手工复核。
- **无需安装、无需登录**：没有 App、没有注册、没有广告弹窗，手机浏览器同样可用。
- **完全离线可用**：断网状态下已缓存的页面照样能算（计算全部由本地 JS 完成）。
- **SEO 友好**：`sitemap.xml`（43 条 URL）、`robots.txt`、canonical、JSON-LD 结构化数据、1200×630 OG 分享图俱全。
- **深色工业风 UI**：`#121622` 深色基底 + 蓝紫主色 + 毛玻璃面板，长时间盯屏幕不刺眼。

---

## 目录结构

```text
.
├── index.html                  # 首页（科学计算器 + 全站导航）
├── style.css                   # 全站样式（深色毛玻璃主题）
├── app.js                      # 计算逻辑、几何切换、多语言绑定
├── i18n.js                     # 中英文文案表
├── steel-table.js              # 型钢规格表筛选（关键字 / △ 基准规格）
│
├── scientific/index.html       # 科学计算器
├── engineering/                # 工程计算器（4 项）
├── geometry/                   # 几何计算器（29 项 + 3 张型钢规格表）
│   ├── index.html
│   ├── circle-area/            # 每项一个目录，内含 index.html
│   ├── h-beam-size-list/       # H 型钢规格表
│   ├── hk-beam-size-list/      # HK 型钢规格表
│   └── t-beam-size-list/       # 剖分 T 型钢规格表
├── materials/                  # 材料计算器（2 项）
│
├── tools/                      # 构建与数据脚本
│   ├── build_pages.py          # 由首页模板批量生成各功能页
│   ├── gen_sitemap.py          # 扫描目录自动生成 sitemap.xml
│   ├── parse_steel_data.py     # 解析型钢规格表源数据 → steel_data.json
│   ├── build_steel_pages.py    # 用 steel_data.json 生成 3 张规格表页面
│   ├── steel_data.json         # GB/T 11263—2024 规格数据（889 行）
│   └── sync_to_github.sh       # 一键提交并推送（自动走代理通道）
│
├── sitemap.xml / robots.txt
├── favicon.svg / favicon-*.png / og-image.png
└── google8f482ec99a122998.html # Google Search Console 验证文件
```

---

## 本地运行

不需要 Node、不需要构建，任意静态服务器即可：

```bash
git clone https://github.com/baizhengyong6-ui/jisuanqizaixian.git
cd jisuanqizaixian

# 任选其一
python -m http.server 8080
npx serve .
```

浏览器打开 <http://localhost:8080/>。

> 直接双击 `index.html` 也能用，但用本地服务器才与线上路径（`/geometry/...`）完全一致。

## 修改内容后重新生成页面

页面不是手写一堆重复 HTML，而是**模板 + 脚本生成**：

```bash
python tools/build_pages.py      # 重新生成各功能页（同步导航、头部、页脚）
python tools/gen_sitemap.py      # 重新生成 sitemap.xml
python tools/build_steel_pages.py  # 型钢表数据有更新时重新生成 3 张表
```

## 部署

站点托管在腾讯云 EdgeOne Makers（项目名 `jisuanqizaixian`）：

```bash
edgeone makers deploy -n jisuanqizaixian
```

> 若报 `SAFE_DELETE_BULK_CONFIRM_REQUIRED`，先清空本地部署缓存目录 `.edgeone/assets` 再部署。

---

## 数据来源与免责

- 型钢截面数据依据 **GB/T 11263—2024《热轧 H 型钢和剖分 T 型钢》**整理，共 889 行规格；已逐行校验物理一致性（`A × 0.785 ≈ 理论重量`、`i = √(I/A)`、`W = I/(H/2)`）。
- 钢材理论重量按密度 **7.85 g/cm³** 计算；其他材料密度取常用工程推荐值。
- 本站计算结果供方案比选、估算与校核参考。**正式设计文件、施工图与报审计算书，请以现行规范原文及注册工程师复核结果为准。**

---

## 许可

页面代码可自由参考学习；站点内容与型钢数据结构 © 聊城鑫垚建筑设计有限公司。
规范数据版权归国家标准发布机构所有，本站仅为工程查阅便利而整理。

---

<p align="center">
  <a href="https://engcalculator.work/"><b>🌐 立即使用 · engcalculator.work</b></a>
</p>
