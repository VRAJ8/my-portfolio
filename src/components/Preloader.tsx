import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { projects } from '../data/projects';

interface PreloaderProps {
  /** True once the scene has drawn its first frame (or there is no scene to wait for). */
  ready: boolean;
  particles: number;
  onDone: () => void;
}

const LINES = (particles: number) => [
  ['init', 'vrajpatel.portfolio'],
  ['load', `weights · ${projects.length} projects · ${projects.filter((p) => p.video).length} trailers`],
  ['compile', 'particle shaders'],
  ['sample', `${particles.toLocaleString()} points of noise`],
];

/**
 * The page boots like a training run: log lines tick in and the epoch counter climbs. It holds
 * at 92% until the scene is ready, then lifts away.
 */
export default function Preloader({ ready, particles, onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const progress = useRef({ value: 0 });
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // Log lines and the climb to 92%.
  useEffect(() => {
    const el = root.current!;
    const lines = animate(el.querySelectorAll('[data-line]'), {
      opacity: [0, 1],
      translateX: [-12, 0],
      delay: stagger(180, { start: 150 }),
      duration: 500,
      ease: 'outExpo',
    });
    const climb = animate(progress.current, {
      value: 92,
      duration: 1400,
      ease: 'outCubic',
      onUpdate: () => render(),
    });
    return () => {
      lines.revert();
      climb.pause();
    };
  }, []);

  // Finish once the scene is ready, then lift the curtain.
  useEffect(() => {
    if (!ready) return;
    const el = root.current!;
    const finish = animate(progress.current, {
      value: 100,
      duration: 500,
      delay: 250,
      ease: 'inOutQuad',
      onUpdate: () => render(),
      onComplete: () => {
        doneRef.current();
        animate(el, {
          clipPath: ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'],
          duration: 1100,
          ease: 'inOutExpo',
          onComplete: () => setGone(true),
        });
      },
    });
    return () => {
      finish.pause();
    };
  }, [ready]);

  function render() {
    const v = progress.current.value;
    if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, '0');
    if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
  }

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 sm:p-10"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-label="Loading"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
        <span>Vraj Patel</span>
        <span>Data · AI · ML</span>
      </div>

      <ol className="space-y-2 font-mono text-[13px] text-ink-2 sm:text-sm" aria-hidden="true">
        {LINES(particles).map(([verb, what]) => (
          <li key={verb} data-line className="opacity-0">
            <span className="text-accent">$</span> {verb} <span className="text-ink">{what}</span>{' '}
            <span className="text-ink-3">… ok</span>
          </li>
        ))}
      </ol>

      <div>
        <div className="flex items-end justify-between gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">Training</span>
          <span className="font-sans text-[clamp(4rem,16vw,11rem)] font-semibold leading-[0.8] tracking-[-0.06em] tabular-nums">
            <span ref={count}>000</span>
            <span className="text-ink-3">%</span>
          </span>
        </div>
        <span className="mt-6 block h-px w-full overflow-hidden bg-[var(--line-strong)]">
          <span ref={bar} className="block h-full w-full origin-left bg-ink" style={{ transform: 'scaleX(0)' }} />
        </span>
      </div>
    </div>
  );
}
