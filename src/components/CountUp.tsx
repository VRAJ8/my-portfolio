import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll';

/** A number that counts up when it scrolls into view. */
export default function CountUp({ value, decimals = 0, className = '' }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current!;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const state = { v: 0 };
      gsap.to(state, {
        v: value,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => (el.textContent = state.v.toFixed(decimals)),
      });
      el.textContent = (0).toFixed(decimals);
    },
    { scope: ref }
  );
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value.toFixed(decimals)}
    </span>
  );
}
