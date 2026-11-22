import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import ChapterTitle from '../components/ChapterTitle';
import BrandIcon from '../components/BrandIcon';
import { skillCategories, skills } from '../data/skills';
import { useTheme } from '../context/ThemeContext';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import type { Skill, SkillCategory } from '../types';

type Filter = SkillCategory | 'all';

// Brand colours that would vanish against the page get the text colour instead.
function iconColor(hex: string, dark: boolean) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  if (dark && lum < 0.28) return 'var(--ink)';
  if (!dark && lum > 0.85) return 'var(--ink)';
  return `#${hex}`;
}

function Tile({ skill, dark }: { skill: Skill; dark: boolean }) {
  const color = skill.icon ? iconColor(skill.icon.hex, dark) : skill.monogram ? iconColor(skill.monogram.hex, dark) : 'var(--ink)';
  return (
    <li data-tile className="panel flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl p-3 text-center will-change-transform" style={{ boxShadow: 'none' }}>
      {skill.icon ? (
        <BrandIcon icon={skill.icon} size={28} color={color} />
      ) : (
        <span className="font-mono text-[15px] font-bold leading-7" style={{ color }}>
          {skill.monogram?.text}
        </span>
      )}
      <span className="text-[12px] leading-tight text-ink-2">{skill.name}</span>
    </li>
  );
}

/** Chapter 4: the toolkit. Tiles ripple outward from wherever you touch the grid. */
export default function Toolkit() {
  const [filter, setFilter] = useState<Filter>('all');
  const grid = useRef<HTMLUListElement>(null);
  const seen = useRef(false);
  const last = useRef(0);
  const reduced = usePrefersReducedMotion();
  const { isDarkMode } = useTheme();
  const shown = useMemo(() => (filter === 'all' ? skills : skills.filter((s) => s.category === filter)), [filter]);

  const columns = () => (grid.current ? getComputedStyle(grid.current).gridTemplateColumns.split(' ').length : 1);
  const tiles = () => grid.current!.querySelectorAll<HTMLElement>('[data-tile]');

  // Cascade in from the centre the first time the grid is seen, and again on each filter change.
  const cascade = () => {
    if (reduced || !grid.current) return;
    const items = tiles();
    const cols = columns();
    animate(items, {
      opacity: [0, 1],
      scale: [0.6, 1],
      translateY: [24, 0],
      duration: 900,
      ease: 'outExpo',
      delay: stagger(28, { grid: [cols, Math.ceil(items.length / cols)], from: 'center' }),
    });
  };

  useEffect(() => {
    const el = grid.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !seen.current) {
          seen.current = true;
          cascade();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seen.current) cascade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const ripple = (index: number, force = false) => {
    if (reduced) return;
    const now = performance.now();
    if (!force && now - last.current < 700) return;
    last.current = now;
    const items = tiles();
    const cols = columns();
    animate(items, {
      scale: [{ to: 1.1, duration: 220, ease: 'outQuad' }, { to: 1, duration: 650, ease: 'outElastic(1, .55)' }],
      translateY: [{ to: -6, duration: 220 }, { to: 0, duration: 650 }],
      delay: stagger(45, { grid: [cols, Math.ceil(items.length / cols)], from: index }),
    });
  };

  const indexOf = (target: EventTarget | null) => {
    const tile = (target as Element | null)?.closest('[data-tile]');
    return tile ? Array.prototype.indexOf.call(tiles(), tile) : -1;
  };

  return (
    <section id="toolkit" className="relative px-5 py-32 sm:px-8 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <ChapterTitle index={4} label="Toolkit">
              The tools
              <br />I reach <span className="serif">for.</span>
            </ChapterTitle>
            <p className="lede mt-8">{skills.length} of them, across models, data, products and the cloud. Touch the grid.</p>
          </div>
          <div className="no-scrollbar -mx-5 flex max-w-full gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter tools">
            {(['all', ...skillCategories.map((c) => c.id)] as Filter[]).map((id) => {
              const label = id === 'all' ? 'All' : skillCategories.find((c) => c.id === id)!.label;
              const on = filter === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(id)}
                  className={`relative h-10 shrink-0 rounded-full px-4 text-[13px] font-medium transition-colors ${on ? 'text-[var(--bg)]' : 'text-ink-2 hover:text-ink'}`}
                >
                  {on && <motion.span layoutId="tool-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul
          ref={grid}
          className="mt-14 grid grid-cols-3 gap-2.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
          onPointerOver={(e) => {
            const i = indexOf(e.target);
            if (i >= 0 && e.pointerType !== 'touch') ripple(i);
          }}
          onClick={(e) => {
            const i = indexOf(e.target);
            if (i >= 0) ripple(i, true);
          }}
        >
          {shown.map((s) => (
            <Tile key={s.name} skill={s} dark={isDarkMode} />
          ))}
        </ul>
      </div>
    </section>
  );
}
