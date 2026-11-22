// Builds public/data/land.bin: points on a Fibonacci sphere that fall on land, for the globe chapter.
// Each point is two little-endian Int16s, latitude and longitude in hundredths of a degree.
// Run with `node scripts/build-land.mjs` (needs the world-atlas, topojson-client and d3-geo dev dependencies).
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';

const require = createRequire(import.meta.url);
const topology = JSON.parse(readFileSync(require.resolve('world-atlas/land-110m.json'), 'utf8'));
const land = feature(topology, topology.objects.land);

const SAMPLES = 26000;
const golden = Math.PI * (3 - Math.sqrt(5));
const out = [];
for (let i = 0; i < SAMPLES; i++) {
  const y = 1 - (i / (SAMPLES - 1)) * 2;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = ((((i * golden * 180) / Math.PI) % 360) + 540) % 360 - 180;
  if (geoContains(land, [lon, lat])) out.push(Math.round(lat * 100), Math.round(lon * 100));
}
writeFileSync(new URL('../public/data/land.bin', import.meta.url), Buffer.from(new Int16Array(out).buffer));
console.log(`${out.length / 2} land points`);
