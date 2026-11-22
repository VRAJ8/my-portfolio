import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shapeTime, story } from '../lib/story';
import { downgrade, dprFor, particlesFor, type Quality, type Tier } from '../lib/quality';
import { buildShapes, CITY_A, CITY_B, GLOBE_RADIUS, GLOBE_TILT, latLon, type ShapeData } from './shapes';
import { fragmentShader, vertexShader } from './shaders';
import { createChoreography, type Choreography } from './choreography';

interface FieldProps {
  quality: Quality;
  light: boolean;
  onReady: () => void;
}

// Per-shape colour pairs (each particle sits somewhere between A and B), for each theme.
const PALETTE = {
  dark: {
    a: ['#7d8db8', '#f6f7ff', '#6fe9ff', '#b9a2ff', '#8796ff', '#ffd59a', '#6ff0ff'],
    b: ['#3d4a73', '#9cb0ff', '#3b6cff', '#55dfff', '#e27cff', '#8a6bff', '#86f5c0'],
    arc: '#ffb347',
    city: '#fff1d6',
    hot: '#ffffff',
  },
  light: {
    a: ['#6a7390', '#0d1020', '#0f5ea8', '#5b3fd1', '#3346c8', '#b5651d', '#0b7fa6'],
    b: ['#a3abc4', '#3346c8', '#2a3fb0', '#0b7fa6', '#a034c8', '#5b3fd1', '#0d8a5f'],
    arc: '#d06a00',
    city: '#8a3b00',
    hot: '#0d1020',
  },
};

const D2R = Math.PI / 180;
const ROT_START = -CITY_A.lon * D2R;
// Head east across the Pacific to bring San Jose round to the front.
const ROT_END = -(CITY_B.lon + 360) * D2R;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));
const easeInOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

function rotate(p: [number, number, number], rotY: number, tilt: number): THREE.Vector3 {
  const [x, y, z] = p;
  const cy = Math.cos(rotY);
  const sy = Math.sin(rotY);
  const x1 = cy * x + sy * z;
  const z1 = -sy * x + cy * z;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  return new THREE.Vector3(x1, ct * y - st * z1, st * y + ct * z1);
}

function Particles({ quality, light, onReady }: FieldProps) {
  const { camera, size, gl, setDpr } = useThree();
  const [data, setData] = useState<ShapeData | null>(null);
  const [choreo, setChoreo] = useState<Choreography | null>(null);
  const readyRef = useRef(false);
  const tierRef = useRef<Tier>(quality.tier);
  const perf = useRef({ frames: 0, time: 0 });
  const s = useRef({ shape: 0, px: 0, py: 0, on: 0, vel: 0, flow: 0, spin: 0, wave: 0, rot: ROT_START, arc: 0, train: 0 });
  const look = useMemo(() => new THREE.Vector3(), []);
  const cities = useMemo(
    () => [latLon(CITY_A.lat, CITY_A.lon, GLOBE_RADIUS * 1.01), latLon(CITY_B.lat, CITY_B.lon, GLOBE_RADIUS * 1.01)],
    []
  );

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch('/data/land.bin').then((r) => r.arrayBuffer()),
      document.fonts.load('800 100px "Geist Variable"'),
      createChoreography(),
    ]).then(([land, , c]) => {
      if (!alive) return;
      setData(buildShapes(quality.particles, new Int16Array(land), quality.portrait));
      setChoreo(c);
    });
    return () => {
      alive = false;
    };
  }, [quality.particles, quality.portrait]);

  const geometry = useMemo(() => {
    if (!data) return null;
    const g = new THREE.BufferGeometry();
    data.positions.forEach((p, i) => g.setAttribute(`aP${i}`, new THREE.BufferAttribute(p, 3)));
    // three needs a `position` attribute to know the vertex count; the shader ignores it.
    g.setAttribute('position', new THREE.BufferAttribute(data.positions[0], 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(data.seed, 4));
    g.setAttribute('aGlobe', new THREE.BufferAttribute(data.globe, 2));
    g.setAttribute('aNet', new THREE.BufferAttribute(data.net, 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);
    return g;
  }, [data]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uShape: { value: 0 },
          uPixel: { value: 1 },
          uSize: { value: 2.2 },
          uDrift: { value: 1 },
          uGlobeRot: { value: ROT_START },
          uGlobeTilt: { value: GLOBE_TILT },
          uArc: { value: 0 },
          uTrain: { value: 0 },
          uFlow: { value: 0 },
          uSpin: { value: 0 },
          uWave: { value: 0 },
          uDim: { value: 1 },
          uLight: { value: 0 },
          uCityA: { value: new THREE.Vector3() },
          uPointer: { value: new THREE.Vector2() },
          uPointerOn: { value: 0 },
          uAspect: { value: 1 },
          uColA: { value: PALETTE.dark.a.map((c) => new THREE.Color(c)) },
          uColB: { value: PALETTE.dark.b.map((c) => new THREE.Color(c)) },
          uArcCol: { value: new THREE.Color(PALETTE.dark.arc) },
          uCityCol: { value: new THREE.Color(PALETTE.dark.city) },
          uHot: { value: new THREE.Color(PALETTE.dark.hot) },
        },
      }),
    []
  );

  useEffect(() => {
    if (data) material.uniforms.uCityA.value.set(...data.cityA);
  }, [data, material]);

  useEffect(() => {
    const p = light ? PALETTE.light : PALETTE.dark;
    const u = material.uniforms;
    u.uColA.value.forEach((c: THREE.Color, i: number) => c.set(p.a[i]));
    u.uColB.value.forEach((c: THREE.Color, i: number) => c.set(p.b[i]));
    u.uArcCol.value.set(p.arc);
    u.uCityCol.value.set(p.city);
    u.uHot.value.set(p.hot);
    u.uLight.value = light ? 1 : 0;
    material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    material.needsUpdate = true;
  }, [light, material]);

  useEffect(() => () => {
    geometry?.dispose();
  }, [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  // ?debug exposes the scene's live state for inspection.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('debug')) {
      (window as unknown as Record<string, unknown>).__field = { camera, state: s.current, choreo, story };
    }
  }, [camera, choreo]);

  useFrame((_, delta) => {
    if (!choreo || !geometry) return;
    const dt = Math.min(delta, 0.05);
    const st = s.current;
    const u = material.uniforms;

    // Where we are in the story, eased so the morphs glide even on a stepped scroll.
    st.shape = damp(st.shape, shapeTime(), 4.5, dt);
    choreo.sheet.sequence.position = clamp(st.shape, 0, 6);
    const cam = choreo.camera.value;
    const fv = choreo.field.value;

    // Pointer, scroll speed, and the per-chapter details.
    st.px = damp(st.px, story.pointer.x, 5, dt);
    st.py = damp(st.py, story.pointer.y, 5, dt);
    st.on = damp(st.on, story.pointer.active ? 1 : 0, 3, dt);
    st.vel = damp(st.vel, Math.min(Math.abs(story.velocity), 60), 3, dt);
    st.flow += dt * (0.5 + st.vel * 0.09);
    st.spin += dt * (0.07 + st.vel * 0.004);
    st.wave += dt * (0.9 + st.vel * 0.03);
    // The journey finishes by about two-thirds of the chapter, so San José is in front while you're still reading.
    st.rot = damp(st.rot, ROT_START + (ROT_END - ROT_START) * easeInOut(clamp(story.local[1] * 1.6 - 0.05)), 3, dt);
    st.arc = damp(st.arc, clamp(story.local[1] * 1.75 - 0.1), 3, dt);
    st.train = damp(st.train, story.local[2], 3, dt);

    // Camera from the choreography. Portrait screens centre everything and pull back to fit.
    const aspect = size.width / size.height;
    const wide = !quality.portrait;
    const fit = clamp((wide ? 1.55 : 0.62) / aspect, 1, 1.9);
    camera.position.set(cam.x * (wide ? 1 : 0) + st.px * 0.22, cam.y + st.py * 0.16, cam.z * fit);
    look.set(cam.lookX * (wide ? 1 : 0), cam.lookY, cam.lookZ);
    camera.lookAt(look);

    u.uTime.value += dt;
    u.uShape.value = st.shape;
    u.uPixel.value = gl.getPixelRatio();
    u.uSize.value = 3.1 * fv.size * (light ? 1.1 : 1);
    u.uDrift.value = fv.drift;
    // Behind stacked text on phones, keep the field quieter.
    u.uDim.value = fv.dim * (wide ? 1 : 0.7);
    u.uGlobeRot.value = st.rot;
    u.uArc.value = st.arc;
    u.uTrain.value = st.train;
    u.uFlow.value = st.flow;
    u.uSpin.value = st.spin;
    u.uWave.value = st.wave;
    u.uPointer.value.set(st.px, st.py);
    u.uPointerOn.value = st.on;
    u.uAspect.value = aspect;

    // Screen positions of the two cities, for the DOM labels on the globe.
    const globeVisible = clamp(1 - Math.abs(st.shape - 2) * 3);
    cities.forEach((c, i) => {
      const v = rotate(c, st.rot, GLOBE_TILT);
      const facing = clamp((v.z / GLOBE_RADIUS - 0.15) * 3);
      v.project(camera);
      const out = story.cities[i];
      out.x = ((v.x + 1) / 2) * size.width;
      out.y = ((1 - v.y) / 2) * size.height;
      out.visible = globeVisible * facing * (i === 1 ? clamp((st.arc - 0.85) * 8) : 1);
    });

    if (!readyRef.current) {
      readyRef.current = true;
      onReady();
    }

    // If frames run slow for two seconds, drop a quality tier: fewer particles, fewer pixels.
    const p = perf.current;
    p.frames += 1;
    p.time += delta;
    if (p.frames === 120) {
      if (p.time / p.frames > 1 / 40 && tierRef.current !== 'low') {
        tierRef.current = downgrade(tierRef.current);
        setDpr(dprFor(tierRef.current));
        geometry.setDrawRange(0, Math.min(particlesFor(tierRef.current), data!.count));
      }
      p.frames = 0;
      p.time = 0;
    }
  });

  return geometry ? <points geometry={geometry} material={material} frustumCulled={false} /> : null;
}

export default function Field(props: FieldProps) {
  return (
    <Canvas
      className="field-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={props.quality.dpr}
      gl={{ antialias: false, alpha: true, depth: false, stencil: false, powerPreference: 'high-performance' }}
      camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 9.6] }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      aria-hidden="true"
    >
      <Particles {...props} />
    </Canvas>
  );
}
