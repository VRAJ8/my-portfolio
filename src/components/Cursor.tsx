import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { story } from '../lib/story';

/**
 * A soft ring that trails the pointer and swells over anything clickable, showing the
 * element's data-cursor label if it has one. Mouse and pen only; touch keeps the default.
 * It also feeds the pointer to the particle field.
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const [hover, setHover] = useState<{ on: boolean; label: string }>({ on: false, label: '' });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setFine(mq.matches);
    const onMove = (e: PointerEvent) => {
      const mouse = e.pointerType !== 'touch';
      story.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      story.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      story.pointer.active = mouse;
      if (!mouse) return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest?.('a, button, [data-cursor], input, textarea, label');
      const label = target?.getAttribute('data-cursor') ?? '';
      setHover((h) => (h.on === !!target && h.label === label ? h : { on: !!target, label }));
    };
    const onLeave = () => (story.pointer.active = false);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!fine) return null;

  const size = hover.label ? 84 : hover.on ? 52 : 28;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] grid place-items-center rounded-full border border-[var(--ink)] text-[10px] font-medium uppercase tracking-[0.18em] mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', color: '#fff', borderColor: '#fff' }}
      animate={{ width: size, height: size, backgroundColor: hover.label ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {hover.label && <span className="font-mono text-black">{hover.label}</span>}
    </motion.div>
  );
}
