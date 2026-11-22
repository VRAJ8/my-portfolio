/**
 * One vertex shader draws every shape. Each particle reads its slot in the shape it is leaving
 * and the shape it is heading to, and travels between them on its own schedule (aSeed.x), so a
 * morph reads as a swarm rather than a crossfade.
 */
export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uShape;
uniform float uPixel;
uniform float uSize;
uniform float uDrift;
uniform float uGlobeRot;
uniform float uGlobeTilt;
uniform float uArc;
uniform float uTrain;
uniform float uFlow;
uniform float uSpin;
uniform float uWave;
uniform float uDim;
uniform vec3 uCityA;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform float uAspect;
uniform vec3 uColA[7];
uniform vec3 uColB[7];
uniform vec3 uArcCol;
uniform vec3 uCityCol;
uniform vec3 uHot;

attribute vec3 aP0;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute vec3 aP5;
attribute vec3 aP6;
attribute vec4 aSeed;
attribute vec2 aGlobe;
attribute vec3 aNet;

varying vec3 vColor;
varying float vAlpha;

const float R = 2.05;
const float PI = 3.14159265;

vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 rotX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }

// Position of this particle in shape i, its brightness, and an optional colour override (tint.a = strength).
vec3 shape(int i, out float bright, out vec4 tint) {
  bright = 1.0;
  tint = vec4(0.0);
  float t = uTime;

  if (i == 0) {
    vec3 d = vec3(sin(t * 0.31 + aSeed.x * 40.0), cos(t * 0.27 + aSeed.y * 37.0), sin(t * 0.23 + aSeed.z * 29.0));
    bright = 0.45 + 0.55 * aSeed.w;
    return aP0 + d * 0.38 * uDrift;
  }

  if (i == 1) {
    vec3 d = vec3(sin(t * 0.9 + aSeed.x * 30.0), cos(t * 0.8 + aSeed.y * 30.0), sin(t * 0.7 + aSeed.z * 30.0));
    bright = 1.5 + 0.5 * aSeed.w;
    return aP1 + d * (0.01 + uDrift * 0.08);
  }

  if (i == 2) {
    vec3 p = aP2;
    float role = aGlobe.x;
    if (role > 1.5 && role < 2.5) {
      // The arc draws itself from Gujarat to San Jose as you read.
      float shown = step(aGlobe.y, uArc);
      p = mix(uCityA, p, shown);
      float head = smoothstep(0.06, 0.0, abs(aGlobe.y - uArc)) * shown;
      bright = shown * (1.2 + head * 3.0);
      tint = vec4(uArcCol, 1.0);
    } else if (role > 2.5) {
      bright = 1.7 + 0.9 * sin(t * 3.0 + aSeed.x * 6.0);
      tint = vec4(uCityCol, 1.0);
    } else if (role > 0.5) {
      bright = 0.22;
    }
    p = rotX(rotY(p, uGlobeRot), uGlobeTilt);
    bright *= mix(0.1, 1.0, smoothstep(-0.6, 0.75, p.z / R));
    return p;
  }

  if (i == 3) {
    vec3 p = rotY(aP3, sin(t * 0.22) * 0.32 - 0.25);
    float pos = aNet.z + aNet.y * aNet.x;
    float lit = smoothstep(pos - 0.4, pos + 0.05, uTrain * 4.8);
    float front = mod(t * 1.1, 6.5) - 1.0;
    float pulse = exp(-pow((pos - front) * 2.6, 2.0)) * lit;
    bright = (mix(0.2, 1.0, lit) + pulse * 2.2) * (aNet.x < 0.5 ? 1.5 : 0.75);
    tint = vec4(uHot, pulse * 0.8);
    return p;
  }

  if (i == 4) {
    float depth = fract(aP4.z + uFlow * 0.05);
    float z = mix(-16.0, 5.0, depth);
    float a = aP4.x + uFlow * 0.12 + z * 0.045;
    bright = smoothstep(-16.0, -9.0, z) * smoothstep(5.0, 1.0, z) * 1.15;
    return vec3(cos(a) * aP4.y, sin(a) * aP4.y * 0.85, z);
  }

  if (i == 5) {
    float rad = aP5.x;
    float a = aP5.y + uSpin / (rad * 0.55 + 0.6);
    bright = 0.55 + 1.6 * exp(-rad * 1.3);
    return vec3(cos(a) * rad, aP5.z, sin(a) * rad);
  }

  // i == 6: the signal.
  float x = aP6.x;
  float k = aP6.y;
  float env = exp(-x * x / 20.0);
  float y = sin(x * 0.85 + uWave + k * 0.32) * 0.95 * env + sin(x * 2.4 - uWave * 1.4 + k) * 0.14 * env;
  bright = 0.45 + 0.9 * env;
  return vec3(x, y + aP6.z, (k - 2.0) * 0.16);
}

void main() {
  float s = clamp(uShape, 0.0, 6.0);
  float base = min(floor(s), 5.0);
  float f = s - base;
  float local = smoothstep(0.0, 1.0, clamp((f - aSeed.x * 0.4) / 0.6, 0.0, 1.0));
  int iA = int(base);
  int iB = iA + 1;

  float bA;
  float bB;
  vec4 tA;
  vec4 tB;
  vec3 pA = shape(iA, bA, tA);
  vec3 pB = shape(iB, bB, tB);
  vec3 p = mix(pA, pB, local);
  // Mid-flight, particles loosen into a swirl before settling into the next shape.
  float mid = sin(local * PI);
  p += (aSeed.yzw - 0.5) * mid * 1.1;

  vec3 colA = mix(mix(uColA[iA], uColB[iA], aSeed.y), tA.rgb, tA.a);
  vec3 colB = mix(mix(uColA[iB], uColB[iB], aSeed.y), tB.rgb, tB.a);
  vec3 col = mix(colA, colB, local);
  float bright = mix(bA, bB, local) * (0.8 + 0.2 * sin(uTime * (0.8 + aSeed.w * 2.4) + aSeed.x * 50.0));

  vec4 mv = modelViewMatrix * vec4(p, 1.0);

  // The cursor parts the particles around it.
  vec4 clip = projectionMatrix * mv;
  vec2 d = clip.xy / clip.w - uPointer;
  d.x *= uAspect;
  float force = uPointerOn * smoothstep(0.26, 0.0, length(d));
  mv.xy += normalize(d + vec2(0.0001)) * force * 0.07 * -mv.z;
  bright += force * 0.8;
  col = mix(col, uHot, force * 0.4);

  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uSize * (0.5 + aSeed.z * 0.9) * uPixel * (7.0 / -mv.z), 1.0, 26.0);
  vColor = col;
  vAlpha = bright * uDim;
}
`;

export const fragmentShader = /* glsl */ `
uniform float uLight;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  // A bright core with a soft halo.
  float core = smoothstep(0.22, 0.0, d);
  float halo = smoothstep(0.5, 0.0, d);
  float a = core * 0.75 + halo * halo * 0.45;
  if (a < 0.01) discard;
  // Dark: additive glow. Light: ink dots blended normally.
  gl_FragColor = uLight > 0.5 ? vec4(vColor, a * min(vAlpha, 1.3) * 0.85) : vec4(vColor * vAlpha * 0.95, a);
}
`;
