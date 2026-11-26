(function(){
  "use strict";

  /* ==================== 多语言词条 ==================== */
  const I18N={
    zh:{
      'app.name':'工程计算工具箱','lang.label':'语言',
      'nav.sci':'科学计算器','nav.eng':'工程计算器','nav.mat':'材料计算器',
      'theme.dark':'深色','theme.light':'浅色',
      'common.clear':'清空','common.calc':'计算','common.history':'历史',
      'sci.history':'历史','sci.histTitle':'计算历史','sci.empty':'暂无计算记录',
      'sci.foot':'支持键盘输入 · Enter 计算 · Esc 清空 · ↑↓ 翻历史',
      'err.bracket':'括号不匹配','err.funcParen':'函数缺少括号',
      'eng.title':'工程计算器','eng.subtitle':'单位换算 · 截面几何特性 · 简支梁 · 应力验算',
      'eng.unit.title':'单位换算','eng.unit.note':'修改数值即时换算；切换“目标单位”会把结果回填并作为新的原单位，可连续换算。',
      'g.length':'长度','g.force':'力','g.stress':'应力/压强','g.moment':'力矩','g.mass':'质量','g.energy':'功/能','g.area':'面积',
      'u.in':'in（英寸）','u.ft':'ft（英尺）','u.tf':'tf（吨力）','u.kgf':'kgf（千克力）','u.t':'t（吨）',
      'eng.sec.title':'截面几何特性','eng.sec.rect':'矩形','eng.sec.circle':'圆形','eng.sec.ring':'环形',
      'eng.sec.calc':'计算截面特性',
      'eng.sec.b':'宽度 b (mm)','eng.sec.h':'高度 h (mm)','eng.sec.d':'直径 d (mm)','eng.sec.D':'外径 D (mm)','eng.sec.di':'内径 d (mm)',
      'eng.sec.A':'面积 A','eng.sec.Ix':'惯性矩 Iₓ','eng.sec.Wx':'截面模量 Wₓ','eng.sec.ix':'回转半径 iₓ',
      'eng.sec.I':'惯性矩 I','eng.sec.W':'截面模量 W','eng.sec.i':'回转半径 i',
      'eng.sec.errSize':'请输入有效尺寸','eng.sec.errRing':'外径须大于内径',
      'eng.beam.title':'简支梁 · 均布荷载',
      'eng.beam.q':'均布荷载 q (kN/m)','eng.beam.L':'跨度 L (m)','eng.beam.E':'弹性模量 E (GPa)','eng.beam.I':'惯性矩 I (mm⁴)',
      'eng.beam.calc':'计算内力与挠度',
      'eng.beam.M':'最大弯矩 Mmax','eng.beam.V':'最大剪力 Vmax','eng.beam.f':'跨中挠度 f','eng.beam.ratio':'挠度参考',
      'eng.beam.needEI':'填 E、I 可算','eng.beam.err':'请输入有效荷载与跨度',
      'eng.beam.note':'M=qL²/8，V=qL/2，f=5qL⁴/(384EI)；挠度参考按 L/400 估算。',
      'eng.stress.title':'应力验算','eng.stress.axial':'轴心受力 σ = N / A','eng.stress.bend':'受弯 σ = M / W',
      'eng.stress.N':'轴力 N (kN)','eng.stress.A':'面积 A (mm²)','eng.stress.M':'弯矩 M (kN·m)','eng.stress.W':'截面模量 W (mm³)',
      'eng.stress.sigmaAxial':'轴心应力 σ','eng.stress.sigmaBend':'弯曲应力 σ','eng.stress.err':'请输入有效数值',
      'mat.title':'材料计算器','mat.subtitle':'钢材理论重量 · 密度与重量换算','mat.steel.title':'钢材理论重量',
      'mat.steel.calc':'计算重量','mat.steel.one':'单件重量','mat.steel.total':'合计重量','mat.steel.ton':'合计吨数',
      'mat.steel.err':'请输入有效数值','mat.steel.errN':'数量须大于 0',
      'st.plate':'钢板','st.rebar':'钢筋/圆钢','st.pipe':'钢管','st.angle':'角钢','st.channel':'槽钢','st.i_beam':'工字钢',
      'mf.L':'长度 L (m)','mf.B':'宽度 B (mm)','mf.T':'厚度 t (mm)','mf.N':'数量','mf.root':'根数',
      'mf.D':'直径 d (mm)','mf.Do':'外径 D (mm)','mf.wall':'壁厚 t (mm)','mf.H':'高度 h (mm)','mf.leg':'腿宽 b (mm)','mf.web':'腰厚 d (mm)',
      'note.plate':'理论重量 = 长(m) × 宽(mm) × 厚(mm) × 0.00785 （kg）。',
      'note.rebar':'理论重量 = 0.00617 × d² （kg/m），d 单位 mm。',
      'note.pipe':'理论重量 = 0.02466 × t × (D − t) （kg/m）。',
      'note.angle':'理论重量 ≈ (2b − t) × t × 0.00785 （kg/m），不含圆角修正。',
      'note.channel':'按常见规格近似估算（默认 6m 定尺），精确值请查型钢表。',
      'note.i_beam':'按常见规格近似估算（默认 6m 定尺），精确值请查型钢表。',
      'mat.dens.title':'密度 / 重量 / 体积换算','mat.dens.vol':'体积 (m³)','mat.dens.weight':'重量 (t)',
      'mat.dens.weightPh':'填重量反算体积','mat.dens.byVol':'由体积算重量','mat.dens.byWeight':'由重量算体积',
      'mat.dens.tip':'密度为常见参考值（t/m³），实际以材料质保书为准。',
      'mat.dens.material':'材料','mat.dens.density':'密度','mat.dens.errVol':'请输入有效体积','mat.dens.errW':'请输入有效重量',
      'dn.steel':'钢','dn.castiron':'铸铁','dn.aluminum':'铝','dn.copper':'铜','dn.stainless':'不锈钢',
      'dn.concrete':'混凝土','dn.cement':'水泥','dn.sand':'砂','dn.gravel':'碎石','dn.wood':'木材','dn.water':'水','dn.asphalt':'沥青',
      'err.empty':'空表达式','err.numfmt':'数字格式错误','err.unknown':'未知标识','err.unrec':'无法识别',
      'err.incomplete':'表达式不完整','err.extra':'表达式有多余内容','err.invalid':'结果无效','err.range':'结果超出范围',
      'err.divzero':'不能除以 0','err.pow':'幂运算错误','err.factneg':'负数没有阶乘','err.domain':'超出定义域',
      'err.pos':'必须大于 0','err.sqrtneg':'负数不能开方','err.unknownFunc':'未知函数','err.syntax':'语法错误',
      'sci.result.err':'错误'
    },
    'zh-TW':{
      'app.name':'工程計算工具箱','lang.label':'語言',
      'nav.sci':'科學計算器','nav.eng':'工程計算器','nav.mat':'材料計算器',
      'theme.dark':'深色','theme.light':'淺色',
      'common.clear':'清空','common.calc':'計算','common.history':'歷史',
      'sci.history':'歷史','sci.histTitle':'計算歷史','sci.empty':'暫無計算記錄',
      'sci.foot':'支援鍵盤輸入 · Enter 計算 · Esc 清空 · ↑↓ 翻歷史',
      'eng.title':'工程計算器','eng.subtitle':'單位換算 · 截面幾何特性 · 簡支梁 · 應力驗算',
      'eng.unit.title':'單位換算','eng.unit.note':'修改數值即時換算；切換「目標單位」會把結果回填並作為新的原單位，可連續換算。',
      'g.length':'長度','g.force':'力','g.stress':'應力/壓強','g.moment':'力矩','g.mass':'質量','g.energy':'功/能','g.area':'面積',
      'u.in':'in（英吋）','u.ft':'ft（英尺）','u.tf':'tf（噸力）','u.kgf':'kgf（千克力）','u.t':'t（噸）',
      'eng.sec.title':'截面幾何特性','eng.sec.rect':'矩形','eng.sec.circle':'圓形','eng.sec.ring':'環形',
      'eng.sec.calc':'計算截面特性',
      'eng.sec.b':'寬度 b (mm)','eng.sec.h':'高度 h (mm)','eng.sec.d':'直徑 d (mm)','eng.sec.D':'外徑 D (mm)','eng.sec.di':'內徑 d (mm)',
      'eng.sec.A':'面積 A','eng.sec.Ix':'慣性矩 Iₓ','eng.sec.Wx':'截面模數 Wₓ','eng.sec.ix':'迴轉半徑 iₓ',
      'eng.sec.I':'慣性矩 I','eng.sec.W':'截面模數 W','eng.sec.i':'迴轉半徑 i',
      'eng.sec.errSize':'請輸入有效尺寸','eng.sec.errRing':'外徑須大於內徑',
      'eng.beam.title':'簡支梁 · 均布荷載',
      'eng.beam.q':'均布荷載 q (kN/m)','eng.beam.L':'跨度 L (m)','eng.beam.E':'彈性模數 E (GPa)','eng.beam.I':'慣性矩 I (mm⁴)',
      'eng.beam.calc':'計算內力與撓度',
      'eng.beam.M':'最大彎矩 Mmax','eng.beam.V':'最大剪力 Vmax','eng.beam.f':'跨中撓度 f','eng.beam.ratio':'撓度參考',
      'eng.beam.needEI':'填 E、I 可算','eng.beam.err':'請輸入有效荷載與跨度',
      'eng.beam.note':'M=qL²/8，V=qL/2，f=5qL⁴/(384EI)；撓度參考按 L/400 估算。',
      'eng.stress.title':'應力驗算','eng.stress.axial':'軸心受力 σ = N / A','eng.stress.bend':'受彎 σ = M / W',
      'eng.stress.N':'軸力 N (kN)','eng.stress.A':'面積 A (mm²)','eng.stress.M':'彎矩 M (kN·m)','eng.stress.W':'截面模數 W (mm³)',
      'eng.stress.sigmaAxial':'軸心應力 σ','eng.stress.sigmaBend':'彎曲應力 σ','eng.stress.err':'請輸入有效數值',
      'mat.title':'材料計算器','mat.subtitle':'鋼材理論重量 · 密度與重量換算','mat.steel.title':'鋼材理論重量',
      'mat.steel.calc':'計算重量','mat.steel.one':'單件重量','mat.steel.total':'合計重量','mat.steel.ton':'合計噸數',
      'mat.steel.err':'請輸入有效數值','mat.steel.errN':'數量須大於 0',
      'st.plate':'鋼板','st.rebar':'鋼筋/圓鋼','st.pipe':'鋼管','st.angle':'角鋼','st.channel':'槽鋼','st.i_beam':'工字鋼',
      'mf.L':'長度 L (m)','mf.B':'寬度 B (mm)','mf.T':'厚度 t (mm)','mf.N':'數量','mf.root':'根數',
      'mf.D':'直徑 d (mm)','mf.Do':'外徑 D (mm)','mf.wall':'壁厚 t (mm)','mf.H':'高度 h (mm)','mf.leg':'腿寬 b (mm)','mf.web':'腰厚 d (mm)',
      'note.plate':'理論重量 = 長(m) × 寬(mm) × 厚(mm) × 0.00785 （kg）。',
      'note.rebar':'理論重量 = 0.00617 × d² （kg/m），d 單位 mm。',
      'note.pipe':'理論重量 = 0.02466 × t × (D − t) （kg/m）。',
      'note.angle':'理論重量 ≈ (2b − t) × t × 0.00785 （kg/m），不含圓角修正。',
      'note.channel':'按常見規格近似估算（預設 6m 定尺），精確值請查型鋼表。',
      'note.i_beam':'按常見規格近似估算（預設 6m 定尺），精確值請查型鋼表。',
      'mat.dens.title':'密度 / 重量 / 體積換算','mat.dens.vol':'體積 (m³)','mat.dens.weight':'重量 (t)',
      'mat.dens.weightPh':'填重量反算體積','mat.dens.byVol':'由體積算重量','mat.dens.byWeight':'由重量算體積',
      'mat.dens.tip':'密度為常見參考值（t/m³），實際以材料質保書為準。',
      'mat.dens.material':'材料','mat.dens.density':'密度','mat.dens.errVol':'請輸入有效體積','mat.dens.errW':'請輸入有效重量',
      'dn.steel':'鋼','dn.castiron':'鑄鐵','dn.aluminum':'鋁','dn.copper':'銅','dn.stainless':'不鏽鋼',
      'dn.concrete':'混凝土','dn.cement':'水泥','dn.sand':'砂','dn.gravel':'碎石','dn.wood':'木材','dn.water':'水','dn.asphalt':'瀝青',
      'err.bracket':'括號不匹配','err.funcParen':'函式缺少括號',
      'err.empty':'空運算式','err.numfmt':'數字格式錯誤','err.unknown':'未知標識','err.unrec':'無法識別',
      'err.incomplete':'運算式不完整','err.extra':'運算式有多餘內容','err.invalid':'結果無效','err.range':'結果超出範圍',
      'err.divzero':'不能除以 0','err.pow':'冪運算錯誤','err.factneg':'負數沒有階乘','err.domain':'超出定義域',
      'err.pos':'必須大於 0','err.sqrtneg':'負數不能開方','err.unknownFunc':'未知函數','err.syntax':'語法錯誤',
      'sci.result.err':'錯誤'
    },
    en:{
      'app.name':'Engineering Toolbox','lang.label':'Language',
      'nav.sci':'Scientific','nav.eng':'Engineering','nav.mat':'Materials',
      'theme.dark':'Dark','theme.light':'Light',
      'common.clear':'Clear','common.calc':'Calculate','common.history':'History',
      'sci.history':'History','sci.histTitle':'Calculation History','sci.empty':'No records yet',
      'sci.foot':'Keyboard supported · Enter = calculate · Esc = clear · ↑↓ = history',
      'eng.title':'Engineering Calculator','eng.subtitle':'Unit conversion · Section properties · Simply supported beam · Stress check',
      'eng.unit.title':'Unit Conversion','eng.unit.note':'Values convert instantly; switching the target unit writes the result back as the new source unit for chained conversion.',
      'g.length':'Length','g.force':'Force','g.stress':'Stress / Pressure','g.moment':'Moment','g.mass':'Mass','g.energy':'Energy','g.area':'Area',
      'u.in':'in (inch)','u.ft':'ft (foot)','u.tf':'tf (ton-force)','u.kgf':'kgf (kilogram-force)','u.t':'t (tonne)',
      'eng.sec.title':'Section Properties','eng.sec.rect':'Rectangle','eng.sec.circle':'Circle','eng.sec.ring':'Ring',
      'eng.sec.calc':'Calculate Properties',
      'eng.sec.b':'Width b (mm)','eng.sec.h':'Height h (mm)','eng.sec.d':'Diameter d (mm)','eng.sec.D':'Outer D (mm)','eng.sec.di':'Inner d (mm)',
      'eng.sec.A':'Area A','eng.sec.Ix':'Moment of inertia Iₓ','eng.sec.Wx':'Section modulus Wₓ','eng.sec.ix':'Radius of gyration iₓ',
      'eng.sec.I':'Moment of inertia I','eng.sec.W':'Section modulus W','eng.sec.i':'Radius of gyration i',
      'eng.sec.errSize':'Enter valid dimensions','eng.sec.errRing':'Outer diameter must exceed inner',
      'eng.beam.title':'Simply Supported Beam · UDL',
      'eng.beam.q':'Uniform load q (kN/m)','eng.beam.L':'Span L (m)','eng.beam.E':'Elastic modulus E (GPa)','eng.beam.I':'Inertia I (mm⁴)',
      'eng.beam.calc':'Calculate Forces & Deflection',
      'eng.beam.M':'Max moment Mmax','eng.beam.V':'Max shear Vmax','eng.beam.f':'Midspan deflection f','eng.beam.ratio':'Deflection ref.',
      'eng.beam.needEI':'enter E, I','eng.beam.err':'Enter valid load and span',
      'eng.beam.note':'M=qL²/8, V=qL/2, f=5qL⁴/(384EI); deflection reference uses L/400.',
      'eng.stress.title':'Stress Check','eng.stress.axial':'Axial stress σ = N / A','eng.stress.bend':'Bending stress σ = M / W',
      'eng.stress.N':'Axial force N (kN)','eng.stress.A':'Area A (mm²)','eng.stress.M':'Moment M (kN·m)','eng.stress.W':'Section modulus W (mm³)',
      'eng.stress.sigmaAxial':'Axial stress σ','eng.stress.sigmaBend':'Bending stress σ','eng.stress.err':'Enter valid values',
      'mat.title':'Material Calculator','mat.subtitle':'Steel theoretical weight · Density & weight conversion','mat.steel.title':'Steel Theoretical Weight',
      'mat.steel.calc':'Calculate Weight','mat.steel.one':'Unit weight','mat.steel.total':'Total weight','mat.steel.ton':'Total tonnage',
      'mat.steel.err':'Enter valid values','mat.steel.errN':'Quantity must be greater than 0',
      'st.plate':'Steel Plate','st.rebar':'Rebar / Round Bar','st.pipe':'Steel Pipe','st.angle':'Angle Steel','st.channel':'Channel Steel','st.i_beam':'I-Beam',
      'mf.L':'Length L (m)','mf.B':'Width B (mm)','mf.T':'Thickness t (mm)','mf.N':'Quantity','mf.root':'Pieces',
      'mf.D':'Diameter d (mm)','mf.Do':'Outer D (mm)','mf.wall':'Wall t (mm)','mf.H':'Height h (mm)','mf.leg':'Leg b (mm)','mf.web':'Web d (mm)',
      'note.plate':'Weight = length(m) × width(mm) × thickness(mm) × 0.00785 (kg).',
      'note.rebar':'Weight = 0.00617 × d² (kg/m), d in mm.',
      'note.pipe':'Weight = 0.02466 × t × (D − t) (kg/m).',
      'note.angle':'Weight ≈ (2b − t) × t × 0.00785 (kg/m), fillets excluded.',
      'note.channel':'Approximate estimate for common sizes (6 m length); consult steel tables for exact values.',
      'note.i_beam':'Approximate estimate for common sizes (6 m length); consult steel tables for exact values.',
      'mat.dens.title':'Density / Weight / Volume','mat.dens.vol':'Volume (m³)','mat.dens.weight':'Weight (t)',
      'mat.dens.weightPh':'enter weight for reverse calc','mat.dens.byVol':'Volume → Weight','mat.dens.byWeight':'Weight → Volume',
      'mat.dens.tip':'Densities are typical references (t/m³); refer to the material certificate for actual values.',
      'mat.dens.material':'Material','mat.dens.density':'Density','mat.dens.errVol':'Enter valid volume','mat.dens.errW':'Enter valid weight',
      'dn.steel':'Steel','dn.castiron':'Cast iron','dn.aluminum':'Aluminum','dn.copper':'Copper','dn.stainless':'Stainless steel',
      'dn.concrete':'Concrete','dn.cement':'Cement','dn.sand':'Sand','dn.gravel':'Gravel','dn.wood':'Wood','dn.water':'Water','dn.asphalt':'Asphalt',
      'err.bracket':'Unmatched bracket','err.funcParen':'Function missing parenthesis',
      'err.empty':'Empty expression','err.numfmt':'Invalid number','err.unknown':'Unknown identifier','err.unrec':'Unrecognized character',
      'err.incomplete':'Incomplete expression','err.extra':'Extra content','err.invalid':'Invalid result','err.range':'Result out of range',
      'err.divzero':'Division by zero','err.pow':'Power error','err.factneg':'No factorial for negatives','err.domain':'Out of domain',
      'err.pos':'Must be greater than 0','err.sqrtneg':'Square root of negative','err.unknownFunc':'Unknown function','err.syntax':'Syntax error',
      'sci.result.err':'Error'
    }
  };
  // 合并外部语言包（新增 17 种语言）+ 补齐中/繁/英的新键
  const EXTRA=(typeof window!=='undefined'&&window.I18N_EXTRA)||{};
  Object.keys(EXTRA).forEach(k=>{ if(!I18N[k]) I18N[k]=EXTRA[k]; });
  const PATCH=(typeof window!=='undefined'&&window.I18N_PATCH)||{};
  Object.keys(PATCH).forEach(k=>{ if(I18N[k]) Object.assign(I18N[k],PATCH[k]); });
  const META=(typeof window!=='undefined'&&window.LANG_META)||[{code:'zh',native:'简体中文',rtl:false}];
  const CLANG=(typeof window!=='undefined'&&window.COUNTRY_LANG)||{};
  const LPREFIX=(typeof window!=='undefined'&&window.LANG_PREFIX)||{};
  let lang='zh';
  // SEO/分享链接：?lang=zh|zh-TW|en 指定语言，优先于 IP 自动检测
  let urlLangLocked=false;
  try{
    const qLang=new URLSearchParams(window.location.search).get('lang');
    if(qLang&&I18N[qLang]){ lang=qLang; urlLangLocked=true; }
  }catch(e){}
  // 回退链：当前语言 → 英文 → 中文 → 键名（工程术语用通用符号，缺失项以英文兜底）
  function t(key){ return (I18N[lang]&&I18N[lang][key])||(I18N.en&&I18N.en[key])||I18N.zh[key]||key; }
  function setText(selector,key){ const el=typeof selector==='string'?document.querySelector(selector):selector; if(el) el.textContent=t(key); }

  /* ---------- 语言切换 / IP 自动检测 ---------- */
  const langSelect=document.getElementById('langSelect');
  // 动态生成语言下拉，显示各语言原生名称
  (function fillLangOptions(){
    langSelect.innerHTML='';
    META.forEach(m=>{
      const o=document.createElement('option');o.value=m.code;o.textContent=m.native;langSelect.appendChild(o);
    });
  })();
  function applyLang(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent=t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{ el.placeholder=t(el.dataset.i18nPh); });
    document.documentElement.lang=lang;
    const meta=META.find(m=>m.code===lang);
    document.documentElement.dir=(meta&&meta.rtl)?'rtl':'ltr';
    // 动态文案区
    fillUnitSelects();convertUnits();
    const secType=document.querySelector('#secTabs .tab.active')?document.querySelector('#secTabs .tab.active').dataset.sec:'rect';
    renderSecFields(secType);
    document.getElementById('secResult').innerHTML='';
    document.getElementById('beamResult').innerHTML='';
    document.getElementById('stressAxialResult').innerHTML='';
    document.getElementById('stressBendResult').innerHTML='';
    renderMatFields(matType.value);
    fillDensSelect();
    document.getElementById('densResult').innerHTML='';
    themeBtn.textContent=(document.body.getAttribute('data-theme')==='dark')?('☀️ '+t('theme.light')):('🌙 '+t('theme.dark'));
  }
  function setLang(l){ if(!I18N[l]) l='zh'; lang=l; langSelect.value=l; try{localStorage.setItem('sci-calc-lang',l);}catch(e){} applyLang(); }
  langSelect.addEventListener('change',()=>setLang(langSelect.value));

  async function detectLangByIP(){
    let saved=null;try{ saved=localStorage.getItem('sci-calc-lang'); }catch(e){}
    if(saved&&I18N[saved]) return saved; // 尊重用户上次手动选择
    const apis=[
      {url:'https://ipwho.is/',get:d=>d&&d.country_code},
      {url:'https://ipapi.co/json/',get:d=>d&&d.country_code},
      {url:'https://ipinfo.io/json',get:d=>d&&d.country}
    ];
    for(const api of apis){
      try{
        const ctl=new AbortController();
        const timer=setTimeout(()=>ctl.abort(),2500);
        const res=await fetch(api.url,{signal:ctl.signal,cache:'no-store'});
        clearTimeout(timer);
        if(!res.ok) continue;
        const data=await res.json();
        const cc=String(api.get(data)||'').toUpperCase();
        if(!cc) continue;
        if(CLANG[cc]) return CLANG[cc];
        return 'en';
      }catch(e){ /* 尝试下一个接口 */ }
    }
    // 回退：按浏览器语言前缀
    const nav=(navigator.language||'').toLowerCase();
    const prefix=nav.split('-')[0];
    if(prefix==='zh') return /(tw|hk|mo|hant)/.test(nav)?'zh-TW':'zh';
    if(LPREFIX[prefix]) return LPREFIX[prefix];
    return 'en';
  }

  /* ==================== 视图切换 ==================== */
  const views=document.querySelectorAll('.view');
  const navItems=document.querySelectorAll('.nav-item');
  function switchView(id){
    views.forEach(v=>v.classList.toggle('active',v.id===id));
    navItems.forEach(n=>n.classList.toggle('active',n.dataset.target===id));
  }
  // 导航为真实链接（<a href>）时由浏览器跳转；仅保留对按钮型导航的 SPA 切换兼容
  navItems.forEach(n=>{ if(n.tagName==='A' && n.getAttribute('href')) return; n.addEventListener('click',()=>switchView(n.dataset.target)); });

  /* ---------- 主题（全局） ---------- */
  const themeBtn=document.getElementById('themeBtn');
  try{
    const th=localStorage.getItem('sci-calc-theme');
    // 默认深色；仅当用户明确切换过浅色时才用浅色
    if(th==='light') document.body.removeAttribute('data-theme');
    else document.body.setAttribute('data-theme','dark');
  }catch(e){
    document.body.setAttribute('data-theme','dark');
  }
  themeBtn.addEventListener('click',function(){
    const dark=document.body.getAttribute('data-theme')==='dark';
    if(dark) document.body.removeAttribute('data-theme');
    else document.body.setAttribute('data-theme','dark');
    this.textContent=(!dark)?('☀️ '+t('theme.light')):('🌙 '+t('theme.dark'));
    try{ localStorage.setItem('sci-calc-theme',dark?'light':'dark'); }catch(e){}
  });

  /* ==================== 模块一：科学计算器 ==================== */
  const sciKeys=[
    {t:'sin',v:'sin(',c:'sci'},{t:'cos',v:'cos(',c:'sci'},{t:'tan',v:'tan(',c:'sci'},
    {t:'sin⁻¹',v:'asin(',c:'sci'},{t:'cos⁻¹',v:'acos(',c:'sci'},{t:'tan⁻¹',v:'atan(',c:'sci'},
    {t:'ln',v:'ln(',c:'sci'},{t:'log',v:'log(',c:'sci'},{t:'√',v:'sqrt(',c:'sci'},
    {t:'x²',v:'^2',c:'sci'},{t:'xʸ',v:'^',c:'sci'},{t:'n!',v:'!',c:'sci'},
    {t:'π',v:'π',c:'sci'},{t:'e',v:'e',c:'sci'},{t:'%',v:'%',c:'sci'},
    {t:'(',v:'(',c:'sci'},{t:')',v:')',c:'sci'},{t:'ANS',v:'ANS',c:'sci'}
  ];
  const baseKeys=[
    {t:'C',a:'clear',c:'clr'},{t:'⌫',a:'back'},{t:'±',a:'neg'},{t:'÷',v:'/',c:'op'},
    {t:'7',v:'7'},{t:'8',v:'8'},{t:'9',v:'9'},{t:'×',v:'*',c:'op'},
    {t:'4',v:'4'},{t:'5',v:'5'},{t:'6',v:'6'},{t:'−',v:'-',c:'op'},
    {t:'1',v:'1'},{t:'2',v:'2'},{t:'3',v:'3'},{t:'+',v:'+',c:'op'},
    {t:'0',v:'0'},{t:'.',v:'.'},{t:'=',a:'calc',c:'eq'}
  ];
  function buildKeys(container,keys){
    keys.forEach(k=>{
      const b=document.createElement('button');
      b.className='key'+(k.c?' '+k.c:'');b.innerHTML=k.t;
      if(k.a) b.dataset.act=k.a;
      if(k.v!==undefined) b.dataset.val=k.v;
      container.appendChild(b);
    });
  }
  buildKeys(document.getElementById('sciPanel'),sciKeys);
  buildKeys(document.getElementById('basePanel'),baseKeys);

  let expr='',lastResult=0,lastExpression='',justCalculated=false,angleMode='DEG',history=[];
  const exprEl=document.getElementById('expr'),resultEl=document.getElementById('result');
  try{ history=JSON.parse(localStorage.getItem('sci-calc-history')||'[]')||[]; }catch(e){ history=[]; }

  function gamma(z){
    const g=7,c=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
    if(z<0.5) return Math.PI/(Math.sin(Math.PI*z)*gamma(1-z));
    z-=1;let x=c[0];
    for(let i=1;i<g+2;i++) x+=c[i]/(z+i);
    const tt=z+g+0.5;
    return Math.sqrt(2*Math.PI)*Math.pow(tt,z+0.5)*Math.exp(-tt)*x;
  }
  function factorial(n){
    if(n<0&&Math.abs(n-Math.round(n))<1e-12) throw new Error(t('err.factneg'));
    return gamma(n+1);
  }
  function applyFunc(name,x){
    const toRad=d=>angleMode==='DEG'?d*Math.PI/180:d;
    const fromRad=r=>angleMode==='DEG'?r*180/Math.PI:r;
    switch(name){
      case 'sin': return Math.sin(toRad(x));
      case 'cos': return Math.cos(toRad(x));
      case 'tan': return Math.tan(toRad(x));
      case 'asin': if(x<-1||x>1) throw new Error(t('err.domain')); return fromRad(Math.asin(x));
      case 'acos': if(x<-1||x>1) throw new Error(t('err.domain')); return fromRad(Math.acos(x));
      case 'atan': return fromRad(Math.atan(x));
      case 'ln': if(x<=0) throw new Error(t('err.pos')); return Math.log(x);
      case 'log': if(x<=0) throw new Error(t('err.pos')); return Math.log10(x);
      case 'sqrt': if(x<0) throw new Error(t('err.sqrtneg')); return Math.sqrt(x);
      default: throw new Error(t('err.unknownFunc'));
    }
  }
  const FUNC_NAMES=['asin','acos','atan','sin','cos','tan','ln','log','sqrt'];
  function tokenize(s){
    const tokens=[];let i=0;
    while(i<s.length){
      const c=s[i];
      if(c===' '||c==='\t'){ i++;continue; }
      if((c>='0'&&c<='9')||c==='.'){
        let num='';
        while(i<s.length&&((s[i]>='0'&&s[i]<='9')||s[i]==='.')) num+=s[i++];
        if((num.match(/\./g)||[]).length>1) throw new Error(t('err.numfmt'));
        tokens.push({type:'NUM',v:num});continue;
      }
      if((c>='a'&&c<='z')||(c>='A'&&c<='Z')){
        let name='';
        while(i<s.length&&((s[i]>='a'&&s[i]<='z')||(s[i]>='A'&&s[i]<='Z'))) name+=s[i++];
        name=name.toLowerCase();
        if(name==='e'){ tokens.push({type:'CONST',v:'e'});continue; }
        if(FUNC_NAMES.indexOf(name)>=0){ tokens.push({type:'FUNC',v:name});continue; }
        throw new Error(t('err.unknown')+' '+name);
      }
      if(c==='π'){ tokens.push({type:'CONST',v:'π'});i++;continue; }
      if('+-*/^'.indexOf(c)>=0){ tokens.push({type:'OP',v:c});i++;continue; }
      if(c==='×'){ tokens.push({type:'OP',v:'*'});i++;continue; }
      if(c==='÷'){ tokens.push({type:'OP',v:'/'});i++;continue; }
      if(c==='('){ tokens.push({type:'LPAREN',v:c});i++;continue; }
      if(c===')'){ tokens.push({type:'RPAREN',v:c});i++;continue; }
      if(c==='!'){ tokens.push({type:'FACT',v:c});i++;continue; }
      if(c==='%'){ tokens.push({type:'PCT',v:c});i++;continue; }
      throw new Error(t('err.unrec')+' '+c);
    }
    return tokens;
  }
  function addImplicitMul(tokens){
    const out=[];
    const valEnd=x=>x&&(x.type==='NUM'||x.type==='CONST'||x.type==='RPAREN'||x.type==='FACT'||x.type==='PCT');
    const valStart=x=>x&&(x.type==='NUM'||x.type==='CONST'||x.type==='FUNC'||x.type==='LPAREN');
    for(let i=0;i<tokens.length;i++){
      if(i>0&&valEnd(tokens[i-1])&&valStart(tokens[i])) out.push({type:'OP',v:'*'});
      out.push(tokens[i]);
    }
    return out;
  }
  function evaluate(input){
    if(!input||!input.trim()) throw new Error(t('err.empty'));
    const tokens=addImplicitMul(tokenize(input));let pos=0;
    const peek=()=>tokens[pos],eat=()=>tokens[pos++];
    function parseExpr(){
      let v=parseTerm();
      while(peek()&&peek().type==='OP'&&(peek().v==='+'||peek().v==='-')){
        const op=eat().v,r=parseTerm();v=op==='+'?v+r:v-r;
      }
      return v;
    }
    function parseTerm(){
      let v=parseUnary();
      while(peek()&&peek().type==='OP'&&(peek().v==='*'||peek().v==='/')){
        const op=eat().v,r=parseUnary();
        if(op==='*') v*=r; else { if(Math.abs(r)<1e-15) throw new Error(t('err.divzero')); v/=r; }
      }
      return v;
    }
    function parseUnary(){
      if(peek()&&peek().type==='OP'&&(peek().v==='+'||peek().v==='-')){
        const op=eat().v,v=parseUnary();return op==='-'?-v:v;
      }
      return parsePower();
    }
    function parsePower(){
      const base=parsePostfix();
      if(peek()&&peek().type==='OP'&&peek().v==='^'){
        eat();const exp=parseUnary();const r=Math.pow(base,exp);
        if(isNaN(r)) throw new Error(t('err.pow'));return r;
      }
      return base;
    }
    function parsePostfix(){
      let v=parseAtom();
      while(peek()&&peek().type==='FACT'){ eat();v=factorial(v); }
      if(peek()&&peek().type==='PCT'){ eat();v=v/100; }
      return v;
    }
    function parseAtom(){
      const tk=eat();
      if(!tk) throw new Error(t('err.incomplete'));
      if(tk.type==='NUM') return parseFloat(tk.v);
      if(tk.type==='CONST') return tk.v==='π'?Math.PI:Math.E;
      if(tk.type==='LPAREN'){
        const v=parseExpr();
        if(!peek()||peek().type!=='RPAREN') throw new Error(t('err.bracket'));
        eat();return v;
      }
      if(tk.type==='FUNC'){
        if(!peek()||peek().type!=='LPAREN') throw new Error(t('err.funcParen'));
        eat();const arg=parseExpr();
        if(!peek()||peek().type!=='RPAREN') throw new Error(t('err.bracket'));
        eat();return applyFunc(tk.v,arg);
      }
      throw new Error(t('err.syntax'));
    }
    const result=parseExpr();
    if(pos<tokens.length) throw new Error(t('err.extra'));
    if(typeof result!=='number'||isNaN(result)) throw new Error(t('err.invalid'));
    if(!isFinite(result)) throw new Error(t('err.range'));
    return result;
  }
  function formatResult(n){
    if(Math.abs(n)<1e-12) n=0;
    if(Number.isInteger(n)&&Math.abs(n)<1e15) return String(n);
    return String(parseFloat(n.toPrecision(12)));
  }
  function pretty(s){ return s.replace(/\*/g,'×').replace(/\//g,'÷'); }
  function render(){
    if(expr===''&&!justCalculated){ exprEl.textContent='0';resultEl.textContent='0';resultEl.classList.remove('err');return; }
    if(justCalculated){
      exprEl.textContent=lastExpression?pretty(lastExpression)+' =':'';
      resultEl.textContent=formatResult(lastResult);resultEl.classList.remove('err');return;
    }
    exprEl.textContent=pretty(expr);
    try{ const r=evaluate(expr);resultEl.textContent=formatResult(r);resultEl.classList.remove('err'); }
    catch(e){ resultEl.textContent='—';resultEl.classList.add('err'); }
  }
  function insertValue(raw){
    let v=raw;
    if(v==='ANS') v=formatResult(lastResult);
    if(justCalculated){
      const startsNew=/^[0-9.πe]$/.test(v)||/^(sin|cos|tan|asin|acos|atan|ln|log|sqrt)\($/.test(v)||v==='(';
      if(startsNew) expr='';
      justCalculated=false;
    }
    expr+=v;render();
  }
  function backspace(){ if(justCalculated){ expr='';justCalculated=false; } else expr=expr.slice(0,-1); render(); }
  function negate(){
    if(justCalculated){ expr=formatResult(lastResult);justCalculated=false; }
    if(expr===''){ expr='-'; }
    else if(/[+\-*/^(]$/.test(expr)){ expr+='-'; }
    else { expr='-('+expr+')'; }
    render();
  }
  function clearAll(){ expr='';lastExpression='';justCalculated=false;resultEl.classList.remove('err');render(); }
  function autoCloseParens(){
    let open=0;
    for(let i=0;i<expr.length;i++){
      const ch=expr[i];
      if(ch==='(') open++; else if(ch===')'&&open>0) open--;
    }
    if(open>0) expr+=')'.repeat(open);
  }
  function calculate(){
    if(!expr.trim()) return;
    autoCloseParens();
    try{
      const r=evaluate(expr);
      lastExpression=expr;lastResult=r;
      pushHistory(pretty(expr),formatResult(r));
      expr=formatResult(r);justCalculated=true;render();
    }catch(e){ exprEl.textContent=e.message;resultEl.textContent=t('sci.result.err');resultEl.classList.add('err'); }
  }
  function saveHistory(){ try{ localStorage.setItem('sci-calc-history',JSON.stringify(history)); }catch(e){} }
  function renderHistory(){
    const list=document.getElementById('histList');
    if(!history.length){ list.innerHTML='<div class="hist-empty">'+t('sci.empty')+'</div>';return; }
    list.innerHTML=history.map((h,i)=>'<div class="hist-item" data-i="'+i+'"><span class="he">'+escapeHtml(h.e)+'</span><span class="hr">= '+escapeHtml(h.r)+'</span></div>').join('');
  }
  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function pushHistory(e,r){ history.unshift({e:e,r:r});if(history.length>50) history.pop();saveHistory();renderHistory(); }
  renderHistory();

  document.getElementById('view-sci').querySelector('.keyboard').addEventListener('click',function(e){
    const btn=e.target.closest('.key');if(!btn) return;
    const act=btn.dataset.act;
    if(act==='clear') return clearAll();
    if(act==='back') return backspace();
    if(act==='neg') return negate();
    if(act==='calc') return calculate();
    if(btn.dataset.val!==undefined) return insertValue(btn.dataset.val);
  });
  document.getElementById('angleBtn').addEventListener('click',function(){
    angleMode=angleMode==='DEG'?'RAD':'DEG';
    this.textContent=angleMode;this.classList.toggle('active',angleMode==='DEG');render();
  });
  document.getElementById('histBtn').addEventListener('click',function(){
    const h=document.getElementById('history');
    h.classList.toggle('open');this.classList.toggle('active',h.classList.contains('open'));
  });
  document.getElementById('histClear').addEventListener('click',function(){ history=[];saveHistory();renderHistory(); });
  document.getElementById('histList').addEventListener('click',function(e){
    const item=e.target.closest('.hist-item');if(!item) return;
    const h=history[+item.dataset.i];if(!h) return;
    expr=h.r;justCalculated=false;render();
    document.getElementById('history').classList.remove('open');
    document.getElementById('histBtn').classList.remove('active');
  });
  let histNav=-1;
  document.addEventListener('keydown',function(e){
    if(!document.getElementById('view-sci').classList.contains('active')) return;
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT') return;
    const k=e.key;
    if((k>='0'&&k<='9')||k==='.'){ insertValue(k);e.preventDefault(); }
    else if(['+','-','*','/','(',')','^','!','%'].indexOf(k)>=0){ insertValue(k);e.preventDefault(); }
    else if(k==='Enter'||k==='='){ calculate();e.preventDefault(); }
    else if(k==='Backspace'){ backspace();e.preventDefault(); }
    else if(k==='Escape'||k==='Delete'){ clearAll();e.preventDefault(); }
    else if(k==='ArrowUp'||k==='ArrowDown'){
      if(!history.length) return;
      histNav=k==='ArrowUp'?Math.min(histNav+1,history.length-1):Math.max(histNav-1,-1);
      if(histNav<0){ expr='';justCalculated=false; } else { expr=history[histNav].r;justCalculated=false; }
      render();e.preventDefault();
    }
  });

  /* ==================== 模块二：工程计算器 ==================== */
  function rowsHTML(rows){ return rows.map(r=>'<div class="res-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>').join(''); }
  function errHTML(msg){ return '<div class="res-err">'+msg+'</div>'; }
  const nfmt=(x,d)=>{ if(!isFinite(x)) return '—'; if(d===undefined) return String(parseFloat(x.toPrecision(10))); return x.toFixed(d); };

  // 单位换算：单位项 [显示名, 每基准单位换算系数(换算为基准需除以它), i18n键]
  const UNIT_GROUPS={
    length:{name:'g.length',units:[['mm',1000],['cm',100],['m',1],['km',0.001],['in',39.3701,'u.in'],['ft',3.28084,'u.ft']]},
    force:{name:'g.force',units:[['N',1],['kN',0.001],['kgf',0.101972,'u.kgf'],['tf',0.000101972,'u.tf']]},
    stress:{name:'g.stress',units:[['Pa',1],['kPa',0.001],['MPa',0.000001],['N/mm²',0.000001],['kgf/cm²',0.0000101972],['bar',0.00001]]},
    moment:{name:'g.moment',units:[['N·m',1],['kN·m',0.001],['N·mm',1000],['kN·mm',1]]},
    mass:{name:'g.mass',units:[['g',1000],['kg',1],['t',0.001,'u.t']]},
    energy:{name:'g.energy',units:[['J',1],['kJ',0.001],['kcal',0.000239],['kW·h',0.000000278]]}
  };
  const uGroup=document.getElementById('uGroup');
  Object.keys(UNIT_GROUPS).forEach(k=>{
    const o=document.createElement('option');o.value=k;o.textContent=t(UNIT_GROUPS[k].name);uGroup.appendChild(o);
  });
  function unitLabel(u){ return u[2]?t(u[2]):u[0]; }
  function fillUnitSelects(){
    Array.from(uGroup.options).forEach(o=>{ o.textContent=t(UNIT_GROUPS[o.value].name); });
    const units=UNIT_GROUPS[uGroup.value].units;
    const f=document.getElementById('uFrom'),to=document.getElementById('uTo');
    f.innerHTML='';to.innerHTML='';
    units.forEach((u,i)=>{
      const a=document.createElement('option');a.value=i;a.textContent=unitLabel(u);f.appendChild(a);
      const b=document.createElement('option');b.value=i;b.textContent=unitLabel(u);to.appendChild(b);
    });
    to.value=String(units.length>1?1:0);
  }
  function convertUnits(){
    const g=UNIT_GROUPS[uGroup.value];
    const v=parseFloat(document.getElementById('uValue').value);
    const box=document.getElementById('uResults');
    if(isNaN(v)){ box.innerHTML=errHTML(t('eng.sec.errSize'));return; }
    const fi=+document.getElementById('uFrom').value;
    const base=v/g.units[fi][1];
    box.innerHTML='<div class="conv-list">'+g.units.map((u,i)=>
      '<div class="conv-row"><span>'+u[0]+'</span><b>'+nfmt(base*u[1],6)+'</b></div>'
    ).join('')+'</div>';
  }
  fillUnitSelects();
  uGroup.addEventListener('change',()=>{ fillUnitSelects();convertUnits(); });
  document.getElementById('uFrom').addEventListener('change',convertUnits);
  document.getElementById('uTo').addEventListener('change',function(){
    const g=UNIT_GROUPS[uGroup.value];
    const v=parseFloat(document.getElementById('uValue').value);
    if(isNaN(v)) return;
    const base=v/g.units[+document.getElementById('uFrom').value][1];
    document.getElementById('uValue').value=nfmt(base*g.units[+this.value][1],6);
    document.getElementById('uFrom').value=this.value;
    convertUnits();
  });
  document.getElementById('uValue').addEventListener('input',convertUnits);
  convertUnits();

  // 截面几何特性
  const SEC_FIELDS={
    rect:[['b','eng.sec.b',200],['h','eng.sec.h',400]],
    circle:[['d','eng.sec.d',200]],
    ring:[['D','eng.sec.D',219],['di','eng.sec.di',200]]
  };
  function renderSecFields(type){
    document.getElementById('secFields').innerHTML=SEC_FIELDS[type].map(f=>
      '<label>'+t(f[1])+'<input type="number" id="sec_'+f[0]+'" value="'+f[2]+'" step="any"></label>'
    ).join('');
  }
  document.querySelectorAll('#secTabs .tab').forEach(btn=>btn.addEventListener('click',function(){
    document.querySelectorAll('#secTabs .tab').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');renderSecFields(this.dataset.sec);
    document.getElementById('secResult').innerHTML='';
  }));
  function calcSection(){
    const type=document.querySelector('#secTabs .tab.active').dataset.sec;
    const val=id=>parseFloat(document.getElementById('sec_'+id).value);
    const box=document.getElementById('secResult');
    if(type==='rect'){
      const b=val('b'),h=val('h');
      if(!(b>0&&h>0)){ box.innerHTML=errHTML(t('eng.sec.errSize'));return; }
      const A=b*h,Ix=b*Math.pow(h,3)/12,Wx=Ix/(h/2),ix=Math.sqrt(Ix/A);
      box.innerHTML=rowsHTML([[t('eng.sec.A'),nfmt(A,2)+' mm²'],[t('eng.sec.Ix'),nfmt(Ix,2)+' mm⁴'],[t('eng.sec.Wx'),nfmt(Wx,2)+' mm³'],[t('eng.sec.ix'),nfmt(ix,3)+' mm']]);
    }else if(type==='circle'){
      const d=val('d');
      if(!(d>0)){ box.innerHTML=errHTML(t('eng.sec.errSize'));return; }
      const A=Math.PI*d*d/4,Ix=Math.PI*Math.pow(d,4)/64,Wx=Ix/(d/2),ix=Math.sqrt(Ix/A);
      box.innerHTML=rowsHTML([[t('eng.sec.A'),nfmt(A,2)+' mm²'],[t('eng.sec.I'),nfmt(Ix,2)+' mm⁴'],[t('eng.sec.W'),nfmt(Wx,2)+' mm³'],[t('eng.sec.i'),nfmt(ix,3)+' mm']]);
    }else{
      const D=val('D'),di=val('di');
      if(!(D>0&&di>0&&D>di)){ box.innerHTML=errHTML(t('eng.sec.errRing'));return; }
      const A=Math.PI*(D*D-di*di)/4,Ix=Math.PI*(Math.pow(D,4)-Math.pow(di,4))/64,Wx=Ix/(D/2),ix=Math.sqrt(Ix/A);
      box.innerHTML=rowsHTML([[t('eng.sec.A'),nfmt(A,2)+' mm²'],[t('eng.sec.I'),nfmt(Ix,2)+' mm⁴'],[t('eng.sec.W'),nfmt(Wx,2)+' mm³'],[t('eng.sec.i'),nfmt(ix,3)+' mm']]);
    }
  }
  renderSecFields('rect');
  document.getElementById('secCalc').addEventListener('click',calcSection);

  // 简支梁
  function calcBeam(){
    const q=parseFloat(document.getElementById('beamQ').value);
    const L=parseFloat(document.getElementById('beamL').value);
    const E=parseFloat(document.getElementById('beamE').value);
    const Ix=parseFloat(document.getElementById('beamI').value);
    const box=document.getElementById('beamResult');
    if(isNaN(q)||isNaN(L)||L<=0){ box.innerHTML=errHTML(t('eng.beam.err'));return; }
    const M=q*L*L/8,V=q*L/2;
    let f='—';
    if(!isNaN(E)&&E>0&&!isNaN(Ix)&&Ix>0){
      const fmm=5*q*Math.pow(L*1000,4)/(384*(E*1000)*Ix);
      f=nfmt(fmm,3)+' mm';
    }
    let ratio='—';
    const fv=parseFloat(f);
    if(!isNaN(fv)) ratio='L/'+nfmt(4000/fv,0);
    else ratio=t('eng.beam.needEI');
    box.innerHTML=rowsHTML([[t('eng.beam.M'),nfmt(M,3)+' kN·m'],[t('eng.beam.V'),nfmt(V,3)+' kN'],[t('eng.beam.f'),f],[t('eng.beam.ratio'),ratio]]);
  }
  document.getElementById('beamCalc').addEventListener('click',calcBeam);

  // 应力验算
  function calcStress(kind){
    const box=document.getElementById(kind==='axial'?'stressAxialResult':'stressBendResult');
    if(kind==='axial'){
      const N=parseFloat(document.getElementById('stressN').value);
      const A=parseFloat(document.getElementById('stressA').value);
      if(isNaN(N)||isNaN(A)||A<=0){ box.innerHTML=errHTML(t('eng.stress.err'));return; }
      const sigma=N*1000/A;
      box.innerHTML=rowsHTML([[t('eng.stress.sigmaAxial'),nfmt(sigma,3)+' MPa'],['= ',nfmt(sigma,3)+' N/mm²']]);
    }else{
      const M=parseFloat(document.getElementById('stressM').value);
      const W=parseFloat(document.getElementById('stressW').value);
      if(isNaN(M)||isNaN(W)||W<=0){ box.innerHTML=errHTML(t('eng.stress.err'));return; }
      const sigma=M*1e6/W;
      box.innerHTML=rowsHTML([[t('eng.stress.sigmaBend'),nfmt(sigma,3)+' MPa'],['= ',nfmt(sigma,3)+' N/mm²']]);
    }
  }
  document.getElementById('stressAxialCalc').addEventListener('click',()=>calcStress('axial'));
  document.getElementById('stressBendCalc').addEventListener('click',()=>calcStress('bend'));

  /* ==================== 模块三：材料计算器 ==================== */
  const STEEL={
    plate:{name:'st.plate',note:'note.plate',fields:[['L','mf.L',1],['B','mf.B',1500],['T','mf.T',10],['N','mf.N',1]],calc:v=>v.L*v.B*v.T*0.00785*v.N},
    rebar:{name:'st.rebar',note:'note.rebar',fields:[['D','mf.D',20],['L','mf.L',9],['N','mf.root',1]],calc:v=>0.00617*v.D*v.D*v.L*v.N},
    pipe:{name:'st.pipe',note:'note.pipe',fields:[['D','mf.Do',108],['T','mf.wall',4],['L','mf.L',6],['N','mf.root',1]],calc:v=>0.02466*v.T*(v.D-v.T)*v.L*v.N},
    angle:{name:'st.angle',note:'note.angle',fields:[['B','mf.B',50],['T','mf.T',5],['L','mf.L',6],['N','mf.root',1]],calc:v=>(2*v.B-v.T)*v.T*0.00785*v.L*v.N},
    channel:{name:'st.channel',note:'note.channel',fields:[['H','mf.H',100],['B','mf.leg',48],['T','mf.web',5.3],['N','mf.root',1]],calc:v=>(v.H*v.T+2*(v.B-v.T)*8)*0.00785*6*v.N},
    i_beam:{name:'st.i_beam',note:'note.i_beam',fields:[['H','mf.H',200],['B','mf.leg',100],['T','mf.web',7],['N','mf.root',1]],calc:v=>(v.H*v.T+2*(v.B-v.T)*11.4)*0.00785*6*v.N}
  };
  const matType=document.getElementById('matType');
  Object.keys(STEEL).forEach(k=>{
    const o=document.createElement('option');o.value=k;o.textContent=t(STEEL[k].name);matType.appendChild(o);
  });
  function renderMatFields(key){
    const s=STEEL[key];
    Array.from(matType.options).forEach(o=>{ o.textContent=t(STEEL[o.value].name); });
    document.getElementById('matFields').innerHTML=s.fields.map(f=>
      '<label>'+t(f[1])+'<input type="number" id="mat_'+f[0]+'" value="'+f[2]+'" step="any"></label>'
    ).join('');
    document.getElementById('matNote').textContent=t(s.note);
    document.getElementById('matResult').innerHTML='';
  }
  function calcMaterial(){
    const s=STEEL[matType.value];
    const box=document.getElementById('matResult');
    const v={};
    for(const f of s.fields){
      const x=parseFloat(document.getElementById('mat_'+f[0]).value);
      if(isNaN(x)||x<0){ box.innerHTML=errHTML(t('mat.steel.err'));return; }
      v[f[0]]=x;
    }
    if(v.N<=0){ box.innerHTML=errHTML(t('mat.steel.errN'));return; }
    const total=s.calc(v),one=total/v.N;
    box.innerHTML=rowsHTML([
      [t('mat.steel.one'),nfmt(one,3)+' kg'],
      [t('mat.steel.total'),nfmt(total,3)+' kg'],
      [t('mat.steel.ton'),nfmt(total/1000,4)+' t']
    ]);
  }
  matType.addEventListener('change',()=>renderMatFields(matType.value));
  document.getElementById('matCalc').addEventListener('click',calcMaterial);
  renderMatFields(matType.value);

  // 密度换算
  const DENSITY={steel:[7.85,'dn.steel'],castiron:[7.2,'dn.castiron'],aluminum:[2.7,'dn.aluminum'],copper:[8.96,'dn.copper'],stainless:[7.93,'dn.stainless'],concrete:[2.4,'dn.concrete'],cement:[1.3,'dn.cement'],sand:[1.5,'dn.sand'],gravel:[1.6,'dn.gravel'],wood:[0.6,'dn.wood'],water:[1.0,'dn.water'],asphalt:[2.3,'dn.asphalt']};
  const densMat=document.getElementById('densMat');
  function fillDensSelect(){
    Array.from(densMat.options).forEach(o=>{ o.textContent=t(DENSITY[o.value][1])+'（'+DENSITY[o.value][0]+' t/m³）'; });
  }
  Object.keys(DENSITY).forEach(k=>{
    const o=document.createElement('option');o.value=k;densMat.appendChild(o);
  });
  function densityByVolume(){
    const rho=DENSITY[densMat.value][0];
    const vol=parseFloat(document.getElementById('densVol').value);
    const box=document.getElementById('densResult');
    if(isNaN(vol)||vol<0){ box.innerHTML=errHTML(t('mat.dens.errVol'));return; }
    box.innerHTML=rowsHTML([[t('mat.dens.material'),t(DENSITY[densMat.value][1])],[t('mat.dens.density'),rho+' t/m³'],[t('mat.dens.vol'),nfmt(vol,4)+' m³'],[t('mat.dens.weight'),nfmt(rho*vol,4)+' t']]);
  }
  function densityByWeight(){
    const rho=DENSITY[densMat.value][0];
    const w=parseFloat(document.getElementById('densWeight').value);
    const box=document.getElementById('densResult');
    if(isNaN(w)||w<0){ box.innerHTML=errHTML(t('mat.dens.errW'));return; }
    box.innerHTML=rowsHTML([[t('mat.dens.material'),t(DENSITY[densMat.value][1])],[t('mat.dens.density'),rho+' t/m³'],[t('mat.dens.weight'),nfmt(w,4)+' t'],[t('mat.dens.vol'),nfmt(w/rho,4)+' m³']]);
  }
  document.getElementById('densVolBtn').addEventListener('click',densityByVolume);
  document.getElementById('densWeightBtn').addEventListener('click',densityByWeight);
  densMat.addEventListener('change',()=>{ document.getElementById('densResult').innerHTML=''; });

  /* ==================== 模块四：几何计算器（29 项） ==================== */
  const P=Math.PI;
  // 字段定义：k=键, g=词条, d=默认值
  const F={
    r:{k:'r',g:'geo.r',d:100}, R:{k:'R',g:'geo.R',d:150}, rin:{k:'rin',g:'geo.rin',d:100},
    rTop:{k:'rTop',g:'geo.rTop',d:60}, rBot:{k:'rBot',g:'geo.rBot',d:100},
    h:{k:'h',g:'geo.h',d:200}, th:{k:'th',g:'geo.theta',d:90},
    a:{k:'a',g:'geo.a',d:100}, b:{k:'b',g:'geo.b',d:80}, c:{k:'c',g:'geo.c',d:60}, d:{k:'d',g:'geo.d',d:60},
    d1:{k:'d1',g:'geo.d1',d:100}, d2:{k:'d2',g:'geo.d2',d:80}
  };
  // 每项：id, nameKey, fields, formula, calc(v)->[[labelKey, value, unit],...]
  const GEO_GROUPS=[
    {g:'geo.g.solid',items:[
      {id:'cone_sa',n:'geo.cone_sa',f:[F.r,F.h],fx:'S = πr² + πrl,  l = √(r²+h²)',
        c:v=>{const l=Math.sqrt(v.r*v.r+v.h*v.h);return [['geo.res.slant',l,'mm'],['geo.res.base',P*v.r*v.r,'mm²'],['geo.res.lateral',P*v.r*l,'mm²'],['geo.res.surface',P*v.r*v.r+P*v.r*l,'mm²']];}},
      {id:'frustum_sa',n:'geo.frustum_sa',f:[F.rTop,F.rBot,F.h],fx:'S = π(r²+R²) + π(r+R)l,  l = √((R−r)²+h²)',
        c:v=>{const l=Math.sqrt((v.rBot-v.rTop)*(v.rBot-v.rTop)+v.h*v.h);return [['geo.res.slant',l,'mm'],['geo.res.topArea',P*v.rTop*v.rTop,'mm²'],['geo.res.base',P*v.rBot*v.rBot,'mm²'],['geo.res.lateral',P*(v.rTop+v.rBot)*l,'mm²'],['geo.res.surface',P*(v.rTop*v.rTop+v.rBot*v.rBot+(v.rTop+v.rBot)*l),'mm²']];}},
      {id:'cone_vol',n:'geo.cone_vol',f:[F.r,F.h],fx:'V = ⅓ πr²h',
        c:v=>[['geo.res.volume',P*v.r*v.r*v.h/3,'mm³']]},
      {id:'frustum_vol',n:'geo.frustum_vol',f:[F.rTop,F.rBot,F.h],fx:'V = ⅓ πh(r² + rR + R²)',
        c:v=>[['geo.res.volume',P*v.h*(v.rTop*v.rTop+v.rTop*v.rBot+v.rBot*v.rBot)/3,'mm³']]},
      {id:'cyl_lateral',n:'geo.cyl_lateral',f:[F.r,F.h],fx:'S = 2πrh',
        c:v=>[['geo.res.lateral',2*P*v.r*v.h,'mm²']]},
      {id:'cyl_sa',n:'geo.cyl_sa',f:[F.r,F.h],fx:'S = 2πrh + 2πr²',
        c:v=>[['geo.res.lateral',2*P*v.r*v.h,'mm²'],['geo.res.base',P*v.r*v.r,'mm²'],['geo.res.surface',2*P*v.r*v.h+2*P*v.r*v.r,'mm²']]},
      {id:'cyl_vol',n:'geo.cyl_vol',f:[F.r,F.h],fx:'V = πr²h',
        c:v=>[['geo.res.volume',P*v.r*v.r*v.h,'mm³']]},
      {id:'cuboid_vol',n:'geo.cuboid_vol',f:[F.a,F.b,F.h],fx:'V = a·b·c',
        c:v=>[['geo.res.volume',v.a*v.b*v.h,'mm³']]},
      {id:'cuboid_sa',n:'geo.cuboid_sa',f:[F.a,F.b,F.h],fx:'S = 2(ab + bc + ac)',
        c:v=>[['geo.res.surface',2*(v.a*v.b+v.b*v.h+v.a*v.h),'mm²']]},
      {id:'cube_vol',n:'geo.cube_vol',f:[F.a],fx:'V = a³',
        c:v=>[['geo.res.volume',v.a*v.a*v.a,'mm³']]},
      {id:'cube_sa',n:'geo.cube_sa',f:[F.a],fx:'S = 6a²',
        c:v=>[['geo.res.surface',6*v.a*v.a,'mm²']]}
    ]},
    {g:'geo.g.circle',items:[
      {id:'sector_area',n:'geo.sector_area',f:[F.r,F.th],fx:'S = (θ/360)·πr²',
        c:v=>[['geo.res.arc',2*P*v.r*v.th/360,'mm'],['geo.res.area',P*v.r*v.r*v.th/360,'mm²']]},
      {id:'sector_perim',n:'geo.sector_perim',f:[F.r,F.th],fx:'C = 2r + (θ/360)·2πr',
        c:v=>[['geo.res.arc',2*P*v.r*v.th/360,'mm'],['geo.res.perimeter',2*v.r+2*P*v.r*v.th/360,'mm']]},
      {id:'annulus_area',n:'geo.annulus_area',f:[F.R,F.rin],fx:'S = π(R² − r²)',
        c:v=>[['geo.res.area',P*(v.R*v.R-v.rin*v.rin),'mm²']]},
      {id:'circle_area',n:'geo.circle_area',f:[F.r],fx:'S = πr²',
        c:v=>[['geo.res.area',P*v.r*v.r,'mm²']]},
      {id:'circle_perim',n:'geo.circle_perim',f:[F.r],fx:'C = 2πr',
        c:v=>[['geo.res.perimeter',2*P*v.r,'mm']]}
    ]},
    {g:'geo.g.quad',items:[
      {id:'trapezoid_area',n:'geo.trapezoid_area',f:[F.a,F.b,F.h],fx:'S = (a + b)·h / 2',
        c:v=>[['geo.res.area',(v.a+v.b)*v.h/2,'mm²']]},
      {id:'trapezoid_perim',n:'geo.trapezoid_perim',f:[F.a,F.b,F.c,F.d],fx:'C = a + b + c + d',
        c:v=>[['geo.res.perimeter',v.a+v.b+v.c+v.d,'mm']]},
      {id:'rhombus_area',n:'geo.rhombus_area',f:[F.d1,F.d2],fx:'S = d₁·d₂ / 2',
        c:v=>[['geo.res.area',v.d1*v.d2/2,'mm²']]},
      {id:'rhombus_perim',n:'geo.rhombus_perim',f:[F.a],fx:'C = 4a',
        c:v=>[['geo.res.perimeter',4*v.a,'mm']]},
      {id:'para_perim',n:'geo.para_perim',f:[F.a,F.b],fx:'C = 2(a + b)',
        c:v=>[['geo.res.perimeter',2*(v.a+v.b),'mm']]},
      {id:'para_area',n:'geo.para_area',f:[F.a,F.h],fx:'S = a·h',
        c:v=>[['geo.res.area',v.a*v.h,'mm²']]}
    ]},
    {g:'geo.g.triangle',items:[
      {id:'tri_area',n:'geo.tri_area',f:[F.a,F.h],fx:'S = a·h / 2  （底 × 高 ÷ 2）',
        c:v=>[['geo.res.area',v.a*v.h/2,'mm²']]},
      {id:'tri_perim',n:'geo.tri_perim',f:[F.a,F.b,F.c],fx:'C = a + b + c',
        c:v=>[['geo.res.perimeter',v.a+v.b+v.c,'mm']]}
    ]},
    {g:'geo.g.square',items:[
      {id:'square_perim',n:'geo.square_perim',f:[F.a],fx:'C = 4a',
        c:v=>[['geo.res.perimeter',4*v.a,'mm']]},
      {id:'square_area',n:'geo.square_area',f:[F.a],fx:'S = a²',
        c:v=>[['geo.res.area',v.a*v.a,'mm²']]},
      {id:'rect_calc',n:'geo.rect_calc',f:[F.a,F.b],fx:'S = a·b,  C = 2(a + b)',
        c:v=>[['geo.res.area',v.a*v.b,'mm²'],['geo.res.perimeter',2*(v.a+v.b),'mm']]},
      {id:'rect_area',n:'geo.rect_area',f:[F.a,F.b],fx:'S = a·b',
        c:v=>[['geo.res.area',v.a*v.b,'mm²']]},
      {id:'rect_perim',n:'geo.rect_perim',f:[F.a,F.b],fx:'C = 2(a + b)',
        c:v=>[['geo.res.perimeter',2*(v.a+v.b),'mm']]}
    ]}
  ];
  const GEO_MAP={};
  GEO_GROUPS.forEach(grp=>grp.items.forEach(it=>{GEO_MAP[it.id]=it;}));
  // 几何项 id → 独立页面 slug（与 build_pages.py 的 GEO_SLUG 保持一致）
  const GEO_SLUG={
    cone_sa:'cone-surface-area',frustum_sa:'frustum-surface-area',cone_vol:'cone-volume',
    frustum_vol:'frustum-volume',cyl_lateral:'cylinder-lateral-area',cyl_sa:'cylinder-surface-area',
    cyl_vol:'cylinder-volume',cuboid_vol:'cuboid-volume',cuboid_sa:'cuboid-surface-area',
    cube_vol:'cube-volume',cube_sa:'cube-surface-area',sector_area:'sector-area',
    sector_perim:'sector-perimeter',annulus_area:'annulus-area',circle_area:'circle-area',
    circle_perim:'circle-circumference',trapezoid_area:'trapezoid-area',trapezoid_perim:'trapezoid-perimeter',
    rhombus_area:'rhombus-area',rhombus_perim:'rhombus-perimeter',para_perim:'parallelogram-perimeter',
    para_area:'parallelogram-area',tri_area:'triangle-area',tri_perim:'triangle-perimeter',
    square_perim:'square-perimeter',square_area:'square-area',rect_calc:'rectangle-calculator',
    rect_area:'rectangle-area',rect_perim:'rectangle-perimeter'
  };

  /* ---------- 几何简图（SVG，参数标注在真实位置） ---------- */
  const svgWrap=inner=>'<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img">'+inner+'</svg>';
  const fmtNum=x=>(Math.round(x*1000)/1000);
  // 带数值的标签
  function L(x,y,sym,value,anchor){
    const num=(value===undefined||value===null||isNaN(value))?'':('='+fmtNum(value));
    return '<text class="gs-lbl" x="'+x+'" y="'+y+'" text-anchor="'+(anchor||'middle')+'">'+sym+' <tspan class="gs-val">'+num+'</tspan></text>';
  }
  function dimV(x,y1,y2,sym,value){
    return '<line class="gs-dim" x1="'+x+'" y1="'+y1+'" x2="'+x+'" y2="'+y2+'"/>'
      +'<line class="gs-tick" x1="'+(x-5)+'" y1="'+y1+'" x2="'+(x+5)+'" y2="'+y1+'"/>'
      +'<line class="gs-tick" x1="'+(x-5)+'" y1="'+y2+'" x2="'+(x+5)+'" y2="'+y2+'"/>'
      +L(x-10,(y1+y2)/2+4,sym,value,'end');
  }
  function dimH(x1,x2,y,sym,value){
    return '<line class="gs-dim" x1="'+x1+'" y1="'+y+'" x2="'+x2+'" y2="'+y+'"/>'
      +'<line class="gs-tick" x1="'+x1+'" y1="'+(y-5)+'" x2="'+x1+'" y2="'+(y+5)+'"/>'
      +'<line class="gs-tick" x1="'+x2+'" y1="'+(y-5)+'" x2="'+x2+'" y2="'+(y+5)+'"/>'
      +L((x1+x2)/2,y-9,sym,value,'middle');
  }
  function arcPts(cx,cy,r,a0,a1,steps){
    const p=[];
    for(let i=0;i<=steps;i++){
      const a=(a0+(a1-a0)*i/steps)*Math.PI/180;
      p.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1));
    }
    return p.join(' ');
  }
  // 圆锥（slant=是否标母线 l）
  function figCone(v,slant){
    let s='<ellipse class="gs-line" cx="160" cy="158" rx="62" ry="16"/>'
      +'<path class="gs-line nofill" d="M160 28 L98 158 M160 28 L222 158"/>'
      +'<line class="gs-dim-dash" x1="160" y1="28" x2="160" y2="158"/>'
      +L(150,96,'h',v.h,'end')
      +'<line class="gs-dim" x1="160" y1="158" x2="222" y2="158"/>'
      +L(191,176,'r',v.r,'middle');
    if(slant) s+='<line class="gs-line nofill" style="stroke-width:2.6" d="M160 28 L222 158"/>'+L(205,86,'l',Math.sqrt(v.r*v.r+v.h*v.h),'start');
    return svgWrap(s);
  }
  // 圆台（上底 rTop / 下底 rBot / 高 h，slant=是否标母线 l）
  function figFrustum(v,slant){
    const topY=58,botY=158,cx=160;
    const rt=34,rb=64; // 绘图用上/下底半宽（示意，不按真实比例）
    const l=Math.sqrt((v.rBot-v.rTop)*(v.rBot-v.rTop)+v.h*v.h);
    let s='<ellipse class="gs-line" cx="'+cx+'" cy="'+botY+'" rx="'+rb+'" ry="14"/>'
      +'<path class="gs-line nofill" d="M'+(cx-rt)+' '+topY+' L'+(cx-rb)+' '+botY+' M'+(cx+rt)+' '+topY+' L'+(cx+rb)+' '+botY+'"/>'
      +'<ellipse class="gs-line" cx="'+cx+'" cy="'+topY+'" rx="'+rt+'" ry="9"/>'
      +'<line class="gs-dim-dash" x1="'+cx+'" y1="'+topY+'" x2="'+cx+'" y2="'+botY+'"/>'
      +L(cx-10,(topY+botY)/2+4,'h',v.h,'end')
      +'<line class="gs-dim" x1="'+cx+'" y1="'+topY+'" x2="'+(cx+rt)+'" y2="'+topY+'"/>'+L(cx+rt/2,topY-8,'r',v.rTop,'middle')
      +'<line class="gs-dim" x1="'+cx+'" y1="'+botY+'" x2="'+(cx+rb)+'" y2="'+botY+'"/>'+L(cx+rb/2,botY+18,'R',v.rBot,'middle');
    if(slant) s+='<line class="gs-line nofill" style="stroke-width:2.6" d="M'+(cx+rt)+' '+topY+' L'+(cx+rb)+' '+botY+'"/>'+L(cx+rb+4,(topY+botY)/2,'l',l,'start');
    return svgWrap(s);
  }
  // 圆柱
  function figCyl(v){
    return svgWrap(
      '<path class="gs-line nofill" d="M102 52 L102 152 M218 52 L218 152"/>'
      +'<ellipse class="gs-line" cx="160" cy="152" rx="58" ry="15"/>'
      +'<ellipse class="gs-line" cx="160" cy="52" rx="58" ry="15"/>'
      +'<line class="gs-dim" x1="160" y1="52" x2="218" y2="52"/>'+L(189,46,'r',v.r,'middle')
      +dimV(242,52,152,'h',v.h)
    );
  }
  // 长方体 / 正方体
  function figBox(v,isCube){
    let s;
    if(isCube){
      s='<polygon class="gs-line" points="80,55 180,55 180,155 80,155"/>'
       +'<polygon class="gs-line" points="80,55 108,31 208,31 180,55"/>'
       +'<polygon class="gs-line" points="180,55 208,31 208,131 180,155"/>'
       +dimH(80,180,171,'a',v.a)
       +dimV(64,55,155,'a',v.a);
    }else{
      s='<polygon class="gs-line" points="70,85 205,85 205,155 70,155"/>'
       +'<polygon class="gs-line" points="70,85 102,53 237,53 205,85"/>'
       +'<polygon class="gs-line" points="205,85 237,53 237,123 205,155"/>'
       +dimH(70,205,171,'a',v.a)
       +dimV(54,85,155,'h',v.h)
       +L(224,144,'b',v.b,'start');
    }
    return svgWrap(s);
  }
  // 扇形
  function figSector(v){
    const cx=120,cy=162,r=106,a0=0,a1=Math.max(-150,Math.min(-10,-v.th));
    return svgWrap(
      '<polygon class="gs-line" points="'+arcPts(cx,cy,r,a0,a1,24)+' '+cx+','+cy+'"/>'
      +'<polyline class="gs-dim-dash" points="'+arcPts(cx+0,cy+0,30,a0,a1,12)+'"/>'
      +'<line class="gs-dim" x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'"/>'
      +L(cx+r/2,cy-10,'r',v.r,'middle')
      +L(cx+34,cy-20,'θ',v.th,'start')
    );
  }
  // 圆环
  function figAnnulus(v){
    return svgWrap(
      '<circle class="gs-line" cx="160" cy="100" r="72"/>'
      +'<circle class="gs-line" cx="160" cy="100" r="40"/>'
      +'<line class="gs-dim" x1="160" y1="100" x2="232" y2="100"/>'+L(196,92,'R',v.R,'middle')
      +'<line class="gs-dim" x1="160" y1="100" x2="194.6" y2="80"/>'+L(183,72,'r',v.rin,'middle')
    );
  }
  // 圆
  function figCircle(v){
    return svgWrap(
      '<circle class="gs-line" cx="160" cy="100" r="70"/>'
      +'<line class="gs-dim" x1="160" y1="100" x2="230" y2="100"/>'
      +'<circle class="gs-pt" cx="160" cy="100" r="2.5"/>'
      +L(195,92,'r',v.r,'middle')
    );
  }
  // 梯形
  function figTrap(v,perim){
    let s='<polygon class="gs-line" points="60,150 260,150 210,70 110,70"/>'
      +dimH(60,260,166,'a',v.a)
      +dimH(110,210,58,'b',v.b);
    if(perim){
      s+=L(238,110,'c',v.c,'start')+L(78,110,'d',v.d,'end');
    }else{
      s+='<line class="gs-dim-dash" x1="110" y1="70" x2="110" y2="150"/>'+L(100,114,'h',v.h,'end');
    }
    return svgWrap(s);
  }
  // 菱形
  function figRhombus(v,diag){
    let s='<polygon class="gs-line" points="160,42 246,100 160,158 74,100"/>';
    if(diag){
      s+='<line class="gs-dim-dash" x1="74" y1="100" x2="246" y2="100"/>'+L(160,94,'d₁',v.d1,'middle')
        +'<line class="gs-dim-dash" x1="160" y1="42" x2="160" y2="158"/>'+L(170,72,'d₂',v.d2,'start');
    }else{
      s+=L(108,60,'a',v.a,'middle');
    }
    return svgWrap(s);
  }
  // 平行四边形
  function figPara(v,areaMode){
    let s='<polygon class="gs-line" points="75,155 215,155 255,70 115,70"/>'
      +dimH(75,215,171,'a',v.a);
    if(areaMode){
      s+='<line class="gs-dim-dash" x1="115" y1="70" x2="115" y2="155"/>'+L(105,114,'h',v.h,'end');
    }else{
      s+=L(244,108,'b',v.b,'start');
    }
    return svgWrap(s);
  }
  // 三角形
  function figTri(v,perim){
    let s='<polygon class="gs-line" points="70,150 250,150 160,50"/>'
      +dimH(70,250,166,'a',v.a);
    if(perim){
      s+=L(214,94,'b',v.b,'start')+L(106,94,'c',v.c,'end');
    }else{
      s+='<line class="gs-dim-dash" x1="160" y1="50" x2="160" y2="150"/>'+L(150,104,'h',v.h,'end');
    }
    return svgWrap(s);
  }
  // 正方形 / 矩形
  function figSquare(v){
    return svgWrap(
      '<rect class="gs-line" x="95" y="48" width="104" height="104"/>'
      +dimH(95,199,168,'a',v.a)
      +dimV(219,48,152,'a',v.a)
    );
  }
  function figRect(v){
    return svgWrap(
      '<rect class="gs-line" x="66" y="58" width="188" height="92"/>'
      +dimH(66,254,168,'a',v.a)
      +dimV(272,58,150,'b',v.b)
    );
  }
  // 29 项 → 简图生成函数
  const GEO_FIG={
    cone_sa:v=>figCone(v,true), frustum_sa:v=>figFrustum(v,true), cone_vol:v=>figCone(v,false), frustum_vol:v=>figFrustum(v,false),
    cyl_lateral:v=>figCyl(v), cyl_sa:v=>figCyl(v), cyl_vol:v=>figCyl(v),
    cuboid_vol:v=>figBox(v,false), cuboid_sa:v=>figBox(v,false),
    cube_vol:v=>figBox(v,true), cube_sa:v=>figBox(v,true),
    sector_area:v=>figSector(v), sector_perim:v=>figSector(v),
    annulus_area:v=>figAnnulus(v),
    circle_area:v=>figCircle(v), circle_perim:v=>figCircle(v),
    trapezoid_area:v=>figTrap(v,false), trapezoid_perim:v=>figTrap(v,true),
    rhombus_area:v=>figRhombus(v,true), rhombus_perim:v=>figRhombus(v,false),
    para_perim:v=>figPara(v,false), para_area:v=>figPara(v,true),
    tri_area:v=>figTri(v,false), tri_perim:v=>figTri(v,true),
    square_perim:v=>figSquare(v), square_area:v=>figSquare(v),
    rect_calc:v=>figRect(v), rect_area:v=>figRect(v), rect_perim:v=>figRect(v)
  };

  const geoItemSel=document.getElementById('geoItem');
  // 动态填充分组下拉
  function fillGeoItems(){
    const prev=geoItemSel.value;
    geoItemSel.innerHTML='';
    GEO_GROUPS.forEach(grp=>{
      const og=document.createElement('optgroup');og.label=t(grp.g);
      grp.items.forEach(it=>{const o=document.createElement('option');o.value=it.id;o.textContent=t(it.n);og.appendChild(o);});
      geoItemSel.appendChild(og);
    });
    if(prev&&GEO_MAP[prev]) geoItemSel.value=prev;
  }
  // 渲染当前项的简图（参数值随输入实时更新到图上）
  function renderGeoFigure(){
    const it=GEO_MAP[geoItemSel.value]||GEO_GROUPS[0].items[0];
    const v={};
    it.f.forEach(fld=>{
      const el=document.getElementById('geo_f_'+fld.k);
      v[fld.k]=(el&&el.value!=='')?parseFloat(el.value):fld.d;
    });
    const fn=GEO_FIG[it.id];
    document.getElementById('geoFigure').innerHTML=fn?fn(v):'';
  }
  // 渲染当前项的输入字段与公式
  function renderGeoFields(){
    const it=GEO_MAP[geoItemSel.value]||GEO_GROUPS[0].items[0];
    document.getElementById('geoFields').innerHTML=it.f.map(fld=>
      '<label>'+t(fld.g)+'<input type="number" id="geo_f_'+fld.k+'" value="'+fld.d+'" step="any"></label>'
    ).join('');
    it.f.forEach(fld=>{
      const el=document.getElementById('geo_f_'+fld.k);
      if(el) el.addEventListener('input',renderGeoFigure);
    });
    document.getElementById('geoFormula').innerHTML='<b>'+t('geo.formulaLabel')+':</b> '+it.fx;
    document.getElementById('geoResult').innerHTML='';
    renderGeoFigure();
  }
  function calcGeo(){
    const it=GEO_MAP[geoItemSel.value];if(!it) return;
    const v={};
    for(const fld of it.f){
      const x=parseFloat(document.getElementById('geo_f_'+fld.k).value);
      if(isNaN(x)||x<0){ document.getElementById('geoResult').innerHTML=errHTML(t('mat.steel.err'));return; }
      v[fld.k]=x;
    }
    const rows=it.c(v).map(r=>[t(r[0]),nfmt(r[1],4)+' '+r[2]]);
    document.getElementById('geoResult').innerHTML=rowsHTML(rows);
  }
  function clearGeo(){
    const it=GEO_MAP[geoItemSel.value];
    if(it) it.f.forEach(fld=>{const el=document.getElementById('geo_f_'+fld.k);if(el) el.value=fld.d;});
    document.getElementById('geoResult').innerHTML='';
  }
  // 构建几何顶部横向平铺按钮导航：29 项圆角按钮，各自链接到独立 URL
  function buildGeoChips(){
    const bar=document.getElementById('geoChipbar');
    if(!bar) return;
    const cur=geoItemSel.value;
    let html='';
    GEO_GROUPS.forEach(grp=>{
      grp.items.forEach(it=>{
        const slug=GEO_SLUG[it.id]||it.id;
        const active=it.id===cur?' active':'';
        html+='<a class="geo-chip'+active+'" href="/geometry/'+slug+'/"'
          +(it.id===cur?' aria-current="page"':'')+'>'+t(it.n)+'</a>';
      });
    });
    bar.innerHTML=html;
  }
  fillGeoItems();
  // 几何子项独立页：按 body[data-geo-item] 预选对应计算项
  const presetGeo=(document.body&&document.body.dataset&&document.body.dataset.geoItem)||'';
  if(presetGeo&&GEO_MAP[presetGeo]){
    geoItemSel.value=presetGeo;
    try{ localStorage.setItem('sci-calc-geo',presetGeo); }catch(e){}
  }else if(!geoItemSel.value){
    let last=null;try{ last=localStorage.getItem('sci-calc-geo'); }catch(e){}
    if(last&&GEO_MAP[last]) geoItemSel.value=last;
  }
  renderGeoFields();
  buildGeoChips();
  geoItemSel.addEventListener('change',function(){
    try{ localStorage.setItem('sci-calc-geo',geoItemSel.value); }catch(e){}
    renderGeoFields();
    buildGeoChips();
  });
  document.getElementById('geoCalc').addEventListener('click',calcGeo);
  document.getElementById('geoClear').addEventListener('click',clearGeo);
  // 语言切换时重建几何下拉、字段与按钮导航：并入 applyLang
  const _applyLang=applyLang;
  applyLang=function(){ _applyLang();
    // 静态双语内容（data-zh / data-en）随语言切换：中文系语言显示中文，其余显示英文
    const isZh=((lang||'zh').indexOf('zh')===0);
    document.querySelectorAll('[data-en]').forEach(el=>{
      el.textContent = isZh ? (el.getAttribute('data-zh')||el.textContent) : el.getAttribute('data-en');
    });
    document.querySelectorAll('[data-en-ph]').forEach(el=>{
      el.placeholder = isZh ? (el.getAttribute('data-zh-ph')||el.placeholder) : el.getAttribute('data-en-ph');
    });
    fillGeoItems(); renderGeoFields(); buildGeoChips(); };

  /* ==================== 启动 ==================== */
  render();
  applyLang();
  if(!urlLangLocked) detectLangByIP().then(l=>{ if(l!==lang) setLang(l); }).catch(()=>{});
})();
