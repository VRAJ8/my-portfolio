import React from 'react';

/**
 * The "environment" the windows float in: coloured light, film grain and a vignette.
 * It is deliberately static: anything moving behind frosted glass forces every glass
 * surface to re-blur on each frame, which is what makes glass UIs stutter.
 */
const Environment: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--env-base)' }} aria-hidden="true">
    <div className="absolute -inset-[8%]">
      <div className="env-blob env-blob-1" />
      <div className="env-blob env-blob-2" />
      <div className="env-blob env-blob-3" />
      <div className="env-blob env-blob-4" />
    </div>
    <div className="env-noise" />
    <div className="env-vignette" />
  </div>
);

export default Environment;
