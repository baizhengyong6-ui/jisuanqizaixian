/* 型钢数据表筛选：关键字过滤 + △基准规格过滤 + 计数 */
(function(){
  var input=document.getElementById('steelFilter');
  var mark=document.getElementById('steelMarkOnly');
  var count=document.getElementById('steelCount');
  var tbody=document.getElementById('steelBody');
  if(!input||!tbody) return;
  var rows=Array.prototype.slice.call(tbody.querySelectorAll('tr'));
  var total=rows.length;
  function update(){
    var q=(input.value||'').trim().toLowerCase();
    var mo=mark&&mark.checked;
    var n=0;
    rows.forEach(function(tr){
      var text=tr.textContent.toLowerCase();
      var hit=(!q||text.indexOf(q)>=0)&&(!mo||tr.getAttribute('data-mark')==='1');
      tr.style.display=hit?'':'none';
      if(hit)n++;
    });
    if(count)count.textContent='显示 '+n+' / '+total+' 行';
  }
  input.addEventListener('input',update);
  if(mark)mark.addEventListener('change',update);
})();
