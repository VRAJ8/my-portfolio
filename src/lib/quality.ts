/**
 * How much the 3D scene can afford on this device. The particle count and pixel ratio scale
 * together, and the scene drops a tier on its own if frames run slow (see Field).
 */
export type Tier = 'high' | 'mid' | 'low';

export interface Quality {
  tier: Tier;
  particles: number;
  dpr: number;
  webgl: boolean;
  reducedMotion: boolean;
  /** Portrait screens get a stacked layout and a two-line name. */
  portrait: boolean;
}

const PARTICLES: Record<Tier, number> = { high: 26000, mid: 16000, low: 9000 };
const DPR: Record<Tier, number> = { high: 1.75, mid: 1.5, low: 1.25 };

function hasWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export function detectQuality(): Quality {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;

  let tier: Tier = 'high';
  if (coarse || small || cores <= 4 || memory <= 4) tier = 'mid';
  if ((coarse && cores <= 4) || memory <= 2) tier = 'low';

  return {
    tier,
    particles: PARTICLES[tier],
    dpr: Math.min(window.devicePixelRatio || 1, DPR[tier]),
    webgl: hasWebGL2(),
    reducedMotion,
    portrait: window.innerWidth / window.innerHeight < 0.85,
  };
}

export const downgrade = (tier: Tier): Tier => (tier === 'high' ? 'mid' : 'low');
export const particlesFor = (tier: Tier) => PARTICLES[tier];
export const dprFor = (tier: Tier) => Math.min(window.devicePixelRatio || 1, DPR[tier]);
