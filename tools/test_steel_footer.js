// 验证三个型钢页页脚乱码修复 + 语言切换
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const slug of ['h-beam-size-list', 'hk-beam-size-list', 't-beam-size-list']) {
    await page.goto('http://127.0.0.1:8777/geometry/' + slug + '/', { waitUntil: 'networkidle' });
    const about = await page.evaluate(() => {
      const h = Array.from(document.querySelectorAll('h2')).find(e => e.textContent.indexOf('关于工程计算工具箱') >= 0);
      return h ? { outer: h.outerHTML.slice(0, 100), text: h.textContent.trim() } : null;
    });
    const footerVisible = await page.evaluate(() => {
      const sec = document.querySelector('.seo-content');
      return sec ? sec.innerText.includes('关于工程计算工具箱') && !sec.innerText.includes('data-zh=') : false;
    });
    console.log(slug, '| h2:', JSON.stringify(about), '| 页脚无乱码:', footerVisible);
    // 英文切换
    await page.selectOption('#langSelect', 'en');
    const en = await page.evaluate(() => {
      const h = Array.from(document.querySelectorAll('h2')).find(e => (e.getAttribute('data-en') || '').indexOf('About Engineering') >= 0);
      const sec = document.querySelector('.seo-content');
      return { h: h && h.textContent.trim(), noAttrs: !sec.innerText.includes('data-en='), note: (document.querySelector('.steel-note') || {}).innerText };
    });
    console.log('  EN:', JSON.stringify(en).slice(0, 280));
  }
  console.log('ERRORS:', errors.length ? errors.join(' | ') : 'none');
  await browser.close();
})();
