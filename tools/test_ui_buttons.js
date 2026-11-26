// 全面验证（子页只测当前工具）
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  const clickIfVisible = async id => {
    const vis = await page.evaluate(id => {
      const el = document.getElementById(id);
      return el && el.getBoundingClientRect().width > 0;
    }, id);
    if (!vis) return null;
    await page.click('#' + id);
    return true;
  };
  const grab = async id => await page.evaluate(id => document.getElementById(id).innerText.replace(/\s+/g, ' ').trim(), id);

  const test = async (url, name, expectBtns) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    console.log('== ' + name);
    for (const [btn, box] of expectBtns) {
      const ok = await clickIfVisible(btn);
      if (!ok) { console.log('  ' + btn + ': hidden (expected on this page)'); continue; }
      console.log('  ' + btn + ' ->', (await grab(box)).slice(0, 100));
    }
  };

  await test('http://127.0.0.1:8777/engineering/', '栏目页（中文）', [
    ['beamCalc', 'beamResult'], ['stressAxialCalc', 'stressAxialResult'],
    ['stressBendCalc', 'stressBendResult'], ['secCalc', 'secResult'],
  ]);
  await test('http://127.0.0.1:8777/engineering/simply-supported-beam/', '子页·简支梁', [['beamCalc', 'beamResult']]);
  await test('http://127.0.0.1:8777/engineering/stress-check/', '子页·应力验算', [['stressAxialCalc', 'stressAxialResult'], ['stressBendCalc', 'stressBendResult']]);
  await test('http://127.0.0.1:8777/materials/', '材料栏目页', []);
  await page.goto('http://127.0.0.1:8777/materials/', { waitUntil: 'networkidle' });
  await page.click('#matCalc');
  console.log('== 材料栏目页 matCalc ->', (await grab('matResult')).slice(0, 100));

  await page.goto('http://127.0.0.1:8777/engineering/', { waitUntil: 'networkidle' });
  await page.selectOption('#langSelect', 'en');
  await page.click('#beamCalc');
  console.log('== 英文模式 q label:', await page.evaluate(() => document.querySelector('label[data-i18n="eng.beam.q"]').innerText.trim()));
  console.log('== 英文模式 BEAM:', (await grab('beamResult')).slice(0, 110));

  await page.goto('http://127.0.0.1:8777/', { waitUntil: 'networkidle' });
  await page.click('.nav-item.nav-eng');
  await page.click('#beamCalc');
  console.log('== 首页工程视图 BEAM:', (await grab('beamResult')).slice(0, 110));

  console.log('ERRORS:', errors.length ? errors.join(' | ') : 'none');
  await browser.close();
})();
