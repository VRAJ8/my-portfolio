import { getProject, types, type ISheet, type ISheetObject } from '@theatre/core';

/**
 * The camera and the field's look, keyframed in Theatre.js at each story shape (0 = noise,
 * 1 = name, … 6 = signal). Scrolling sets the sequence position, so the camera glides between
 * these as the particles morph.
 *
 * The keyframes live in this table and are turned into Theatre's project state below. To tweak
 * them visually, run `npm run dev` and open http://localhost:5173/?studio: the Theatre studio
 * opens over the page, scrolling scrubs the sequence, and edits can be exported from there.
 */
//            camX   camY  camZ  lookX  lookY  lookZ  drift  size  dim
const KEYS = [
  /* 0 noise   */ [0, 0, 9.6, 0, 0, 0, 1, 1.0, 1],
  /* 1 name    */ [0, -0.85, 7.4, 0, -0.85, 0, 0.12, 0.9, 1],
  /* 2 globe   */ [-2.7, 0.35, 7.7, -2.7, 0.45, 0, 0.05, 1.05, 1],
  /* 3 network */ [-2.4, 1.0, 7.9, -2.3, 0.05, 0, 0.05, 1.05, 1],
  /* 4 tunnel  */ [0, 0, 8.2, 0, 0, -4, 0.2, 1.1, 0.75],
  /* 5 galaxy  */ [0, 3.9, 6.2, 0, -0.4, 0, 0.1, 1.0, 0.8],
  /* 6 wave    */ [0, 1.7, 8.6, 0, 1.7, 0, 0.1, 1.15, 1],
];
const CAMERA_PROPS = ['x', 'y', 'z', 'lookX', 'lookY', 'lookZ'] as const;
const FIELD_PROPS = ['drift', 'size', 'dim'] as const;

// An ease-in-out curve between keyframes.
const HANDLES: [number, number, number, number] = [0.5, 1, 0.5, 0];

function track(name: string, column: number) {
  return {
    type: 'BasicKeyframedTrack' as const,
    __debugName: name,
    keyframes: KEYS.map((row, position) => ({
      id: `${name}-${position}`,
      position,
      value: row[column],
      handles: HANDLES,
      connectedRight: true,
      type: 'bezier' as const,
    })),
  };
}

function objectTracks(object: string, props: readonly string[], offset: number) {
  const trackIdByPropPath: Record<string, string> = {};
  const trackData: Record<string, ReturnType<typeof track>> = {};
  props.forEach((prop, i) => {
    const id = `${object}-${prop}`;
    trackIdByPropPath[JSON.stringify([prop])] = id;
    trackData[id] = track(`${object}:${prop}`, offset + i);
  });
  return { trackIdByPropPath, trackData };
}

export function projectState() {
  return {
    sheetsById: {
      Story: {
        staticOverrides: { byObject: {} },
        sequence: {
          type: 'PositionalSequence',
          length: KEYS.length - 1,
          subUnitsPerUnit: 100,
          tracksByObject: {
            Camera: objectTracks('Camera', CAMERA_PROPS, 0),
            Field: objectTracks('Field', FIELD_PROPS, CAMERA_PROPS.length),
          },
        },
      },
    },
    definitionVersion: '0.4.0',
    revisionHistory: [],
  };
}

export interface Choreography {
  sheet: ISheet;
  camera: ISheetObject<{ x: number; y: number; z: number; lookX: number; lookY: number; lookZ: number }>;
  field: ISheetObject<{ drift: number; size: number; dim: number }>;
}

let instance: Choreography | null = null;

export async function createChoreography(): Promise<Choreography> {
  if (instance) return instance;
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('studio')) {
    const studio = (await import('@theatre/studio')).default;
    studio.initialize();
  }
  // Theatre's state type is internal; the shape above follows its on-disk format (definitionVersion 0.4.0).
  const project = getProject('VrajPatel', { state: projectState() as never });
  const sheet = project.sheet('Story');
  const [, , , , , , drift, size, dim] = KEYS[0];
  const [x, y, z, lookX, lookY, lookZ] = KEYS[0];
  instance = {
    sheet,
    camera: sheet.object('Camera', {
      x: types.number(x, { nudgeMultiplier: 0.05 }),
      y: types.number(y, { nudgeMultiplier: 0.05 }),
      z: types.number(z, { nudgeMultiplier: 0.05 }),
      lookX: types.number(lookX, { nudgeMultiplier: 0.05 }),
      lookY: types.number(lookY, { nudgeMultiplier: 0.05 }),
      lookZ: types.number(lookZ, { nudgeMultiplier: 0.05 }),
    }),
    field: sheet.object('Field', {
      drift: types.number(drift, { range: [0, 2] }),
      size: types.number(size, { range: [0.2, 3] }),
      dim: types.number(dim, { range: [0, 1] }),
    }),
  };
  await project.ready;
  return instance;
}
