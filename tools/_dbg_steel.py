# -*- coding: utf-8 -*-
"""插桩调试：打印 PAGES 各 dict 键（补 __file__ 环境）"""
import io

P = r"C:\Users\b\WorkBuddy\2026-11-23-20-52-24\scientific-calculator\tools\build_steel_pages.py"
src = io.open(P, encoding="utf-8").read()
src = src.replace('HERE = os.path.dirname(os.path.abspath(__file__))',
                  'HERE = r"C:\\Users\\b\\WorkBuddy\\2026-11-23-20-52-24\\scientific-calculator\\tools"', 1)
src = src.replace('for p in PAGES:\n    build_page(',
                  'for p in PAGES:\n    print("KEYS", p["key"], sorted(p.keys()))\n    build_page(', 1)
exec(compile(src, "x", "exec"))
