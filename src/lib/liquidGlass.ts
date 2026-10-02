/**
 * Liquid Glass refraction.
 *
 * Every glass element (see GLASS below) gets an SVG filter applied as its
 * `backdrop-filter`. The element is modelled as a thick piece of convex glass:
 * the backdrop is magnified across the surface and bent at the curved rim,
 * slightly brightened, and edged with a crisp specular highlight lit from above.
 *
 * SVG filters in `backdrop-filter` only work in Chromium browsers. Elsewhere
 * nothing here runs, and the CSS blur-based fallback in index.css is used.
 *
 * Chromium quirk: the filter's coordinate origin is shifted by the element's
 * painted overflow (its outer box-shadows, including those on ::before and
 * ::after). We measure that and offset the filter so the map lines up.
 */

type Variant = 'regular' | 'clear';

interface FilterEntry {
  id: string;
  node: SVGFilterElement;
  users: number;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const MAX_AREA = 700_000; // Skip refraction on anything larger than this (CSS px²) to keep scrolling smooth.

// `.lg` plus the component classes that @apply it (Tailwind's @apply doesn't add the class name itself).
const GLASS = '.lg, .btn-primary, .btn-glass, .eyebrow, .orb';
const CLEAR = '.lg-clear, .btn-glass, .eyebrow, .orb';

const filters = new Map<string, FilterEntry>();
let defs: SVGDefsElement | null = null;
let nextId = 0;

const supportsRefraction = () => {
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
  return !!brands?.some((b) => /Chromium|Google Chrome|Microsoft Edge|Opera/.test(b.brand));
};

const getDefs = () => {
  if (defs) return defs;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  defs = document.createElementNS(SVG_NS, 'defs');
  svg.appendChild(defs);
  document.body.appendChild(svg);
  return defs;
};

interface Optics {
  /** Width of the curved rim (px). For small controls it spans the whole surface: a glass pebble. */
  bezel: number;
  /** Whole-surface magnification, 0–1. */
  lens: number;
  /** Add a soft glossy sheen across the top half (pebble controls). */
  gloss: boolean;
}

// Light comes from above and slightly left, as in Apple's glass.
const LIGHT_X = -0.45;
const LIGHT_Y = -0.89;

/**
 * Models the element as a thick convex glass shape and renders three images:
 *  - map: displacement (R/G = x/y), strongest at the curved rim plus a gentle
 *    lens across the whole surface, so the backdrop is magnified and bent;
 *  - mask: where the rim is, used to keep the rim crisp on frosted panels;
 *  - spec: specular highlights computed from the surface normal and light
 *    direction — a bright rim on edges facing the light, a softer internal
 *    reflection on the opposite edges, and an optional top gloss.
 */
const buildMaps = (w: number, h: number, radius: number, { bezel, lens, gloss }: Optics) => {
  const res = w * h > 160_000 ? 0.5 : 1; // Half-resolution maps for big panels; the optics are smooth anyway.
  const cw = Math.max(2, Math.round(w * res));
  const ch = Math.max(2, Math.round(h * res));
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hw, hh);

  const canvases = [0, 1, 2].map(() => {
    const c = document.createElement('canvas');
    c.width = cw;
    c.height = ch;
    return c;
  });
  const [map, mask, spec] = canvases.map((c) => c.getContext('2d')!.createImageData(cw, ch));

  for (let y = 0; y < ch; y++) {
    const py = (y + 0.5) / res - hh;
    for (let x = 0; x < cw; x++) {
      const px = (x + 0.5) / res - hw;
      const i = (y * cw + x) * 4;

      // Signed distance to the rounded rectangle (positive inside) and the outward normal.
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const depth = -(Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r);

      map.data[i + 2] = 128;
      map.data[i + 3] = 255;
      mask.data[i] = mask.data[i + 1] = mask.data[i + 2] = 255;
      spec.data[i] = spec.data[i + 1] = spec.data[i + 2] = 255;

      if (depth < 0) {
        map.data[i] = map.data[i + 1] = 128;
        continue;
      }

      let nx: number;
      let ny: number;
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy) || 1;
        nx = qx / len;
        ny = qy / len;
      } else if (qx > qy) {
        nx = 1;
        ny = 0;
      } else {
        nx = 0;
        ny = 1;
      }
      nx *= Math.sign(px) || 1;
      ny *= Math.sign(py) || 1;

      // Rim: the surface curves down to the edge (squircle profile), bending light inward.
      const t = Math.min(1, depth / bezel); // 0 at the edge, 1 where the surface is flat
      const curve = Math.pow(1 - t, 2.4);
      let vx = -nx * curve;
      let vy = -ny * curve;

      // Lens: the whole surface magnifies slightly toward its centre.
      vx -= (px / hw) * lens;
      vy -= (py / hh) * lens;
      const len = Math.hypot(vx, vy);
      if (len > 1) {
        vx /= len;
        vy /= len;
      }
      map.data[i] = 128 + vx * 127;
      map.data[i + 1] = 128 + vy * 127;

      mask.data[i + 3] = Math.min(1, (1 - t) * 1.6) * 255;

      // Specular: bright where the rim faces the light, a fainter reflection on the far side.
      // A crisp hairline of light, brightest on the edges facing the light and on the opposite
      // corner (light passing through the glass), with a faint halo just inside it.
      const facing = nx * LIGHT_X + ny * LIGHT_Y;
      const rim = Math.exp(-depth / 0.85) + 0.18 * Math.exp(-depth / 4);
      let alpha = rim * (0.22 + 0.78 * Math.pow(Math.max(0, facing), 2) + 0.55 * Math.pow(Math.max(0, -facing), 2.5));
      if (gloss) {
        const top = Math.max(0, 1 - (py + hh) / (h * 0.42));
        alpha += 0.07 * top * top * Math.min(1, depth / 4);
      }
      spec.data[i + 3] = Math.min(1, alpha) * 255;
    }
  }

  return canvases.map((c, k) => {
    c.getContext('2d')!.putImageData([map, mask, spec][k], 0, 0);
    return c.toDataURL();
  }) as [string, string, string];
};

const el = (tag: string, attrs: Record<string, string | number>) => {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
  return node;
};

const createFilter = (w: number, h: number, radius: number, variant: Variant, ox: number, oy: number): FilterEntry => {
  const id = `lg-${nextId++}`;
  const short = Math.min(w, h);
  const optics: Optics =
    variant === 'regular'
      ? { bezel: Math.min(36, Math.max(radius, 24), short / 2), lens: 0.04, gloss: false }
      : { bezel: Math.max(10, short * 0.4), lens: 0.2, gloss: true };
  // Maximum displacement is scale / 2 px; thicker glass bends more.
  const scale = variant === 'regular' ? 64 : Math.min(56, Math.max(24, short * 0.5));
  const [map, mask, spec] = buildMaps(w, h, radius, optics);

  const filter = el('filter', {
    id,
    x: -ox,
    y: -oy,
    width: w,
    height: h,
    filterUnits: 'userSpaceOnUse',
    primitiveUnits: 'userSpaceOnUse',
    'color-interpolation-filters': 'sRGB',
  }) as SVGFilterElement;

  const image = (href: string, result: string) =>
    el('feImage', { href, x: -ox, y: -oy, width: w, height: h, preserveAspectRatio: 'none', result });
  const displace = (amount: number, result: string) =>
    el('feDisplacementMap', { in: 'SourceGraphic', in2: 'map', scale: amount, xChannelSelector: 'R', yChannelSelector: 'G', result });

  filter.append(image(map, 'map'), image(spec, 'spec'));

  if (variant === 'regular') {
    // Big panels: frosted centre for legibility, crisp lensing at the thick rim.
    filter.append(
      displace(scale, 'refracted'),
      image(mask, 'mask'),
      el('feGaussianBlur', { in: 'refracted', stdDeviation: 7, result: 'frost' }),
      el('feComposite', { in: 'refracted', in2: 'mask', operator: 'in', result: 'rim' }),
      el('feComposite', { in: 'rim', in2: 'frost', operator: 'over', result: 'glass' })
    );
  } else {
    // Controls: clear glass, barely softened.
    filter.append(displace(scale, 'refracted'), el('feGaussianBlur', { in: 'refracted', stdDeviation: 0.5, result: 'glass' }));
  }

  // Glass lifts what's behind it: a touch brighter and more saturated, never muddier.
  const lift = el('feComponentTransfer', { in: 'vivid', result: 'lit' });
  lift.append(
    ...(['feFuncR', 'feFuncG', 'feFuncB'] as const).map((f) =>
      el(f, { type: 'linear', slope: variant === 'regular' ? 1.04 : 1.1, intercept: variant === 'regular' ? 0.02 : 0.05 })
    )
  );
  filter.append(
    el('feColorMatrix', { in: 'glass', type: 'saturate', values: 1.45, result: 'vivid' }),
    lift,
    el('feComposite', { in: 'spec', in2: 'lit', operator: 'over' })
  );

  getDefs().appendChild(filter);
  return { id, node: filter, users: 0 };
};

const acquire = (key: string, make: () => FilterEntry) => {
  let entry = filters.get(key);
  if (!entry) {
    entry = make();
    filters.set(key, entry);
  }
  entry.users++;
  return entry.id;
};

const release = (key: string | undefined) => {
  if (!key) return;
  const entry = filters.get(key);
  if (!entry) return;
  entry.users--;
  if (entry.users <= 0) {
    entry.node.remove();
    filters.delete(key);
  }
};

const parseRadius = (el: HTMLElement, w: number, h: number) => {
  const raw = getComputedStyle(el).borderTopLeftRadius;
  const value = parseFloat(raw) || 0;
  const px = raw.endsWith('%') ? (value / 100) * Math.min(w, h) : value;
  return Math.min(px, w / 2, h / 2);
};

/** How far outer box-shadows paint beyond the left and top edges, as Chromium computes it (blur extent = 1.5 × blur). */
const shadowOverflow = (value: string) => {
  let left = 0;
  let top = 0;
  if (!value || value === 'none') return { left, top };
  value.split(/,(?![^(]*\))/).forEach((shadow) => {
    if (/\binset\b/.test(shadow)) return;
    const lengths = (shadow.replace(/[a-z-]+\([^)]*\)/gi, '').match(/-?[\d.]+px/g) ?? []).map(parseFloat);
    const [x = 0, y = 0, blur = 0, spread = 0] = lengths;
    const extent = Math.ceil(blur * 1.5) + spread;
    left = Math.max(left, extent - x);
    top = Math.max(top, extent - y);
  });
  return { left, top };
};

const paintOverflow = (node: HTMLElement) =>
  [null, '::before', '::after'].reduce(
    (acc, pseudo) => {
      const { left, top } = shadowOverflow(getComputedStyle(node, pseudo).boxShadow);
      return { left: Math.max(acc.left, left), top: Math.max(acc.top, top) };
    },
    { left: 0, top: 0 }
  );

/** Starts watching the document for `.lg` elements. Returns a cleanup function. */
export const initLiquidGlass = () => {
  if (!supportsRefraction()) return () => {};
  document.documentElement.classList.add('lg-refract');

  const keys = new WeakMap<HTMLElement, string>();
  const tracked = new Set<HTMLElement>();
  const pending = new Set<HTMLElement>();
  let frame = 0;

  const apply = (node: HTMLElement) => {
    const w = Math.round(node.offsetWidth);
    const h = Math.round(node.offsetHeight);
    const previous = keys.get(node);
    if (!w || !h || w * h > MAX_AREA) {
      release(previous);
      keys.delete(node);
      node.style.removeProperty('backdrop-filter');
      node.style.removeProperty('-webkit-backdrop-filter');
      return;
    }
    // Small controls always use the clear variant; big panels get a frosted centre for legibility.
    const variant: Variant = node.matches(CLEAR) || w * h < 60_000 ? 'clear' : 'regular';
    const radius = Math.round(parseRadius(node, w, h));
    const overflow = paintOverflow(node);
    // Overflow past the page's left edge is clipped away, which shrinks the shift by the same amount.
    const ox = Math.max(0, Math.min(overflow.left, Math.floor(node.getBoundingClientRect().left + window.scrollX)));
    const oy = overflow.top;
    const key = `${variant}:${w}x${h}:${radius}:${ox},${oy}`;
    if (key === previous) return;
    const id = acquire(key, () => createFilter(w, h, radius, variant, ox, oy));
    release(previous);
    keys.set(node, key);
    node.style.setProperty('backdrop-filter', `url(#${id})`);
    node.style.setProperty('-webkit-backdrop-filter', `url(#${id})`);
  };

  const flush = () => {
    frame = 0;
    pending.forEach((node) => tracked.has(node) && apply(node));
    pending.clear();
  };

  const schedule = (node: HTMLElement) => {
    pending.add(node);
    if (!frame) frame = requestAnimationFrame(flush);
  };

  const resizeObserver = new ResizeObserver((entries) => entries.forEach((e) => schedule(e.target as HTMLElement)));

  const track = (node: HTMLElement) => {
    // Glass nested in glass can only see its parent's own paint, so it gets the CSS look only.
    if (tracked.has(node) || node.parentElement?.closest(GLASS)) return;
    tracked.add(node);
    resizeObserver.observe(node);
    schedule(node);
  };

  const untrack = (node: HTMLElement) => {
    if (!tracked.delete(node)) return;
    resizeObserver.unobserve(node);
    release(keys.get(node));
    keys.delete(node);
  };

  const visit = (node: Node, fn: (el: HTMLElement) => void) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.matches(GLASS)) fn(node);
    node.querySelectorAll<HTMLElement>(GLASS).forEach(fn);
  };

  visit(document.body, track);
  const mutationObserver = new MutationObserver((records) => {
    records.forEach((record) => {
      record.removedNodes.forEach((node) => visit(node, untrack));
      record.addedNodes.forEach((node) => visit(node, track));
    });
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // Shadows differ between light and dark, which moves the filter origin; re-measure on theme change.
  const themeObserver = new MutationObserver(() => tracked.forEach(schedule));
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  return () => {
    mutationObserver.disconnect();
    themeObserver.disconnect();
    resizeObserver.disconnect();
    cancelAnimationFrame(frame);
    tracked.forEach(untrack);
    document.documentElement.classList.remove('lg-refract');
  };
};
