// Usage: node trailer-render.mjs <dir> → writes <dir>/frames/%04d.png at 30 fps
const { chromium } = await import('playwright');
const fs = await import('fs');
const dir = process.argv[2];
const FPS = 30;
fs.rmSync(`${dir}/frames`, { recursive: true, force: true });
fs.mkdirSync(`${dir}/frames`);
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1600, height: 1000 } })).newPage();
await p.goto(`file://${dir}/scene.html`);
await p.evaluate(() => window.ready);
const total = Math.round((await p.evaluate(() => window.DURATION)) * FPS);
for (let f = 0; f < total; f++) {
  const data = await p.evaluate((tt) => { window.render(tt); return document.getElementById('c').toDataURL('image/png'); }, f / FPS);
  fs.writeFileSync(`${dir}/frames/${String(f).padStart(4, '0')}.png`, Buffer.from(data.split(',')[1], 'base64'));
}
await b.close();
console.log(`rendered ${total} frames`);
