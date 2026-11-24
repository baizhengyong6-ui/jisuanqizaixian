const fs=require('fs');const vm=require('vm');
const base='C:/Users/b/WorkBuddy/2026-11-23-20-52-24/scientific-calculator/';
const app=fs.readFileSync(base+'app.js','utf8');
const i18n=fs.readFileSync(base+'i18n.js','utf8');
// 取 F / GEO_GROUPS
const fCode=app.slice(app.indexOf('  const P=Math.PI;'),app.indexOf('  const GEO_MAP={};'));
// 取中文词条
const ienv={window:{}};vm.createContext(ienv);vm.runInContext(i18n,ienv);
const zh=ienv.window.I18N_PATCH.zh;
const sb={Math,console};vm.createContext(sb);
vm.runInContext(fCode+'\nthis.F=F;this.G=GEO_GROUPS;',sb);
const out=[];
for(const grp of sb.G){
  for(const it of grp.items){
    const v={};it.f.forEach(f=>v[f.k]=f.d);
    const res=it.c(v);
    const defaults={};it.f.forEach(f=>defaults[f.k]=f.d);
    out.push({
      id:it.id,
      name:zh[it.n]||it.n,
      fx:it.fx,
      fields:it.f.map(f=>({key:f.k,label:zh[f.g]||f.g,value:f.d})),
      results:res.map(r=>({label:zh[r[0]]||r[0],value:Math.round(r[1]*1e6)/1e6,unit:r[2]}))
    });
  }
}
fs.writeFileSync('C:/Users/b/WorkBuddy/2026-11-23-20-52-24/geo_data.json',JSON.stringify(out,null,2));
console.log('导出几何项:',out.length);
console.log(out.slice(0,2).map(x=>x.id+' | '+x.name+' | '+x.fx).join('\n'));
