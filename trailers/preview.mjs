// Usage: node trailer-preview.mjs <dir> <t1> <t2> ... → writes <dir>/prev-<t>.png
const { chromium } = await import('playwright');
const fs = await import('fs');
const dir = process.argv[2];
const times = process.argv.slice(3).map(Number);
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1600, height: 1000 } })).newPage();
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
await p.goto(`file://${dir}/scene.html`);
await p.evaluate(() => window.ready);
for (const t of times) {
  const data = await p.evaluate((tt) => { window.render(tt); return document.getElementById('c').toDataURL('image/png'); }, t);
  fs.writeFileSync(`${dir}/prev-${t.toFixed(2)}.png`, Buffer.from(data.split(',')[1], 'base64'));
}
await b.close();
console.log(errs.join('\n') || 'ok');
