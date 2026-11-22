/**
 * Target layouts for the particle field, one per story shape. Every shape uses all N particles,
 * so a morph is just each particle travelling from its slot in one layout to its slot in the next.
 *
 * Static shapes store final positions. Animated shapes (tunnel, galaxy, wave) store parameters
 * that the vertex shader turns into positions over time.
 */

export const GLOBE_RADIUS = 2.05;
export const GLOBE_TILT = 0.45;
/** CHARUSAT, Changa (Anand, Gujarat) and San José State. */
export const CITY_A = { lat: 22.6, lon: 72.82 };
export const CITY_B = { lat: 37.335, lon: -121.881 };

export interface ShapeData {
  count: number;
  positions: Float32Array[]; // 7 × (count × 3)
  seed: Float32Array; // count × 4: morph delay, colour mix, size, twinkle
  globe: Float32Array; // count × 2: role (0 land, 1 ocean, 2 arc, 3 city A, 4 city B), arc position
  net: Float32Array; // count × 3: kind (0 node, 1 edge), position along edge, layer
  cityA: [number, number, number];
}

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const D2R = Math.PI / 180;
export function latLon(lat: number, lon: number, r: number): [number, number, number] {
  const phi = lat * D2R;
  const lam = lon * D2R;
  return [r * Math.cos(phi) * Math.sin(lam), r * Math.sin(phi), r * Math.cos(phi) * Math.cos(lam)];
}

function normalize(v: [number, number, number]): [number, number, number] {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
}

/** Spherical interpolation between two unit vectors. */
function slerp(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  const s = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / s;
  const wb = Math.sin(t * omega) / s;
  return [a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb, a[2] * wa + b[2] * wb];
}

/** Pixels of the name rendered in the display font, as world-space points. */
function sampleName(portrait: boolean): { points: Float32Array; n: number } {
  const lines = portrait ? ['VRAJ', 'PATEL'] : ['VRAJ PATEL'];
  const worldWidth = portrait ? 3.1 : 7.4;
  const W = portrait ? 900 : 1800;
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
  let size = 400;
  ctx.font = `800 ${size}px "Geist Variable", Geist, sans-serif`;
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  size = Math.floor((size * W * 0.96) / widest);
  const lineH = size * 0.92;
  const H = Math.ceil(lineH * lines.length + size * 0.3);
  ctx.canvas.width = W;
  ctx.canvas.height = H;
  ctx.font = `800 ${size}px "Geist Variable", Geist, sans-serif`;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${-size * 0.04}px`;
  lines.forEach((l, i) => ctx.fillText(l, W / 2, H / 2 + (i - (lines.length - 1) / 2) * lineH));
  const data = ctx.getImageData(0, 0, W, H).data;
  const filled: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 140) filled.push(x, y);
    }
  }
  const n = filled.length / 2;
  const points = new Float32Array(n * 3);
  const scale = worldWidth / W;
  for (let i = 0; i < n; i++) {
    points[i * 3] = (filled[i * 2] - W / 2) * scale;
    points[i * 3 + 1] = -(filled[i * 2 + 1] - H / 2) * scale;
    points[i * 3 + 2] = 0;
  }
  return { points, n };
}

export function buildShapes(count: number, land: Int16Array, portrait: boolean): ShapeData {
  const r = rng(20260601);
  const gauss = () => {
    let u = 0;
    let v = 0;
    while (!u) u = r();
    while (!v) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  const positions = Array.from({ length: 7 }, () => new Float32Array(count * 3));
  const seed = new Float32Array(count * 4);
  const globe = new Float32Array(count * 2);
  const net = new Float32Array(count * 3);
  const set = (arr: Float32Array, i: number, x: number, y: number, z: number) => {
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  };

  for (let i = 0; i < count; i++) {
    seed[i * 4] = r();
    seed[i * 4 + 1] = r();
    seed[i * 4 + 2] = r();
    seed[i * 4 + 3] = r();
  }

  // 0 · Noise: an uneven cloud, wider than it is tall, with a few strays far out for depth.
  for (let i = 0; i < count; i++) {
    const far = r() < 0.1 ? 2.4 : 1;
    set(positions[0], i, gauss() * 3.3 * far, gauss() * 1.9 * far, gauss() * 2.2 * far - 0.5);
  }

  // 1 · The name.
  const name = sampleName(portrait);
  for (let i = 0; i < count; i++) {
    const k = Math.floor(r() * name.n);
    set(positions[1], i, name.points[k * 3] + (r() - 0.5) * 0.02, name.points[k * 3 + 1] + (r() - 0.5) * 0.02, (r() - 0.5) * 0.12);
  }

  // 2 · Globe: dotted land, a faint ocean shell, the arc between the two cities, and the cities.
  const R = GLOBE_RADIUS;
  const landCount = land.length / 2;
  const a = normalize(latLon(CITY_A.lat, CITY_A.lon, 1));
  const b = normalize(latLon(CITY_B.lat, CITY_B.lon, 1));
  for (let i = 0; i < count; i++) {
    const p = r();
    let role = 0;
    let u = 0;
    let pos: [number, number, number];
    if (p < 0.64) {
      const k = Math.floor(r() * landCount);
      pos = latLon(land[k * 2] / 100 + (r() - 0.5) * 1.2, land[k * 2 + 1] / 100 + (r() - 0.5) * 1.2, R);
    } else if (p < 0.82) {
      role = 1;
      const y = r() * 2 - 1;
      const t = r() * Math.PI * 2;
      const rr = Math.sqrt(1 - y * y);
      pos = [Math.cos(t) * rr * R, y * R, Math.sin(t) * rr * R];
    } else if (p < 0.95) {
      role = 2;
      u = r();
      const dir = slerp(a, b, u);
      const lift = R + Math.sin(Math.PI * u) * 0.95;
      pos = [dir[0] * lift + gauss() * 0.01, dir[1] * lift + gauss() * 0.01, dir[2] * lift + gauss() * 0.01];
    } else {
      role = p < 0.975 ? 3 : 4;
      const c = role === 3 ? a : b;
      const s = R * 1.01;
      pos = [c[0] * s + gauss() * 0.035, c[1] * s + gauss() * 0.035, c[2] * s + gauss() * 0.035];
    }
    set(positions[2], i, pos[0], pos[1], pos[2]);
    globe[i * 2] = role;
    globe[i * 2 + 1] = u;
  }

  // 3 · Network: five layers of neurons and the connections between them.
  const layers = [4, 7, 9, 7, 4];
  const spacingX = 1.15;
  const spacingY = 0.56;
  const nodes: { x: number; y: number; z: number; l: number }[] = [];
  layers.forEach((n, l) => {
    for (let j = 0; j < n; j++) {
      nodes.push({ x: (l - 2) * spacingX, y: (j - (n - 1) / 2) * spacingY, z: Math.sin(j * 1.7 + l) * 0.25, l });
    }
  });
  const edges: [number, number][] = [];
  nodes.forEach((na, ia) => nodes.forEach((nb, ib) => nb.l === na.l + 1 && edges.push([ia, ib])));
  for (let i = 0; i < count; i++) {
    if (r() < 0.3) {
      const n = nodes[Math.floor(r() * nodes.length)];
      set(positions[3], i, n.x + gauss() * 0.045, n.y + gauss() * 0.045, n.z + gauss() * 0.045);
      net[i * 3] = 0;
      net[i * 3 + 1] = 0;
      net[i * 3 + 2] = n.l;
    } else {
      const [ia, ib] = edges[Math.floor(r() * edges.length)];
      const u = r();
      const na = nodes[ia];
      const nb = nodes[ib];
      set(positions[3], i, na.x + (nb.x - na.x) * u + gauss() * 0.006, na.y + (nb.y - na.y) * u + gauss() * 0.006, na.z + (nb.z - na.z) * u);
      net[i * 3] = 1;
      net[i * 3 + 1] = u;
      net[i * 3 + 2] = na.l;
    }
  }

  // 4 · Tunnel (animated): angle, radius, depth phase.
  for (let i = 0; i < count; i++) {
    const ring = r() < 0.7 ? 2.7 : 4.2;
    set(positions[4], i, r() * Math.PI * 2, ring + gauss() * 0.3, r());
  }

  // 5 · Galaxy (animated): radius, start angle, height. Three arms and a bright core.
  for (let i = 0; i < count; i++) {
    if (r() < 0.16) {
      const rad = Math.abs(gauss()) * 0.45;
      set(positions[5], i, rad, r() * Math.PI * 2, gauss() * 0.16);
    } else {
      const arm = Math.floor(r() * 3);
      const rad = 0.3 + Math.pow(r(), 0.75) * 3.6;
      const angle = (arm * Math.PI * 2) / 3 + rad * 1.55 + (gauss() * 0.32) / (rad * 0.6 + 0.4);
      set(positions[5], i, rad, angle, gauss() * 0.09 * (1.2 - rad / 4.2));
    }
  }

  // 6 · Wave (animated): x, strand, thickness.
  for (let i = 0; i < count; i++) {
    set(positions[6], i, (r() * 2 - 1) * 6.8, Math.floor(r() * 5), gauss() * 0.025);
  }

  const cityA = latLon(CITY_A.lat, CITY_A.lon, R * 1.01);
  return { count, positions, seed, globe, net, cityA };
}
