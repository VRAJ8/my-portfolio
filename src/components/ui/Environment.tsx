import React, { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * The "environment" the windows float in: slow-drifting coloured light,
 * film grain and a vignette, with a little parallax as the pointer moves.
 */
const Environment: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 30, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 30, damping: 20 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * -40);
      y.set((e.clientY / window.innerHeight - 0.5) * -40);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduceMotion, x, y]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--env-base)' }} aria-hidden="true">
      <motion.div className="absolute -inset-[8%]" style={{ x, y }}>
        <div className="env-blob env-blob-1" />
        <div className="env-blob env-blob-2" />
        <div className="env-blob env-blob-3" />
        <div className="env-blob env-blob-4" />
      </motion.div>
      <div className="env-grid" />
      <div className="env-noise" />
      <div className="env-vignette" />
    </div>
  );
};

export default Environment;
