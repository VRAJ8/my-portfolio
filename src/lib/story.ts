import { useSyncExternalStore } from 'react';

/**
 * The story is told in chapters. Each one has a section on the page and a shape the particle
 * field takes while you read it. The field reads this module's mutable state every frame, so
 * scrolling never re-renders React; components that need the active chapter subscribe instead.
 */
export const CHAPTERS = [
  { id: 'prologue', label: 'Prologue', short: 'Intro' },
  { id: 'origin', label: 'Origin', short: 'About' },
  { id: 'training', label: 'Training', short: 'Path' },
  { id: 'work', label: 'The work', short: 'Work' },
  { id: 'toolkit', label: 'Toolkit', short: 'Tools' },
  { id: 'signal', label: 'Signal', short: 'Contact' },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]['id'];

/** Particle shapes, in story order. The field morphs from one to the next. */
export const SHAPES = ['noise', 'name', 'globe', 'network', 'tunnel', 'galaxy', 'wave'] as const;

export const story = {
  /** 0 → 1 as the particles assemble the name after the preloader. */
  intro: 0,
  /** How far each later chapter has scrolled into view (0 → 1), indexed like CHAPTERS. */
  approach: [0, 0, 0, 0, 0, 0],
  /** How far through each chapter's section the reader is (0 → 1). */
  local: [0, 0, 0, 0, 0, 0],
  /** Scroll speed in pixels per frame, smoothed. */
  velocity: 0,
  /** Pointer in normalized device coordinates (-1 → 1), and whether it's over the page. */
  pointer: { x: 0, y: 0, active: false },
  /** Screen positions of the globe's two cities, written by the field for the DOM labels. */
  cities: [
    { x: 0, y: 0, visible: 0 },
    { x: 0, y: 0, visible: 0 },
  ],
};

/** Continuous position along SHAPES: 0 = noise, 1 = the name, 2 = the globe, … */
export const shapeTime = () => story.intro + story.approach.slice(1).reduce((sum, a) => sum + a, 0);

// ---- active chapter, for the navigation ----
let active = 0;
const listeners = new Set<() => void>();

export function setActiveChapter(index: number) {
  if (index === active) return;
  active = index;
  listeners.forEach((l) => l());
}

export function useActiveChapter() {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    () => active
  );
}
