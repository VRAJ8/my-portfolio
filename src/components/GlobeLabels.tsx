import { useEffect, useRef } from 'react';
import { gsap } from '../lib/scroll';
import { story } from '../lib/story';

const LABELS = [
  { place: 'Anand, Gujarat', note: 'B.Tech · CHARUSAT' },
  { place: 'San José, California', note: 'MS · San José State' },
];

/** Captions pinned to the two cities on the globe; the field writes their screen positions every frame. */
export default function GlobeLabels() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tick = () => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const c = story.cities[i];
        el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
        el.style.opacity = String(c.visible);
        el.style.visibility = c.visible > 0.01 ? 'visible' : 'hidden';
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
      {LABELS.map((l, i) => (
        <div key={l.place} ref={(el) => void (refs.current[i] = el)} className="absolute left-0 top-0" style={{ visibility: 'hidden' }}>
          <div className="flex -translate-y-1/2 items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-warm" />
            </span>
            <span className="glass whitespace-nowrap rounded-full px-3 py-1.5">
              <span className="block text-[13px] font-medium leading-tight">{l.place}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{l.note}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
