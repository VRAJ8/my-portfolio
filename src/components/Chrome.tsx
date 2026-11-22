import { motion } from 'motion/react';
import { Boxes, Clapperboard, Globe2, Moon, Network, Radio, Sparkles, Sun, type LucideIcon } from 'lucide-react';
import { siGithub } from 'simple-icons';
import { CHAPTERS, useActiveChapter } from '../lib/story';
import { scrollToTarget } from '../lib/scroll';
import { useTheme } from '../context/ThemeContext';
import { socials } from '../data/socials';
import BrandIcon from './BrandIcon';

const ICONS: Record<(typeof CHAPTERS)[number]['id'], LucideIcon> = {
  prologue: Sparkles,
  origin: Globe2,
  training: Network,
  work: Clapperboard,
  toolkit: Boxes,
  signal: Radio,
};

const go = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToTarget(id);
};

/** Top bar: name on the left, the current chapter and GitHub on the right. */
export function TopBar({ visible }: { visible: boolean }) {
  const active = useActiveChapter();
  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-[var(--bg)] via-[color-mix(in_srgb,var(--bg)_70%,transparent)] to-transparent px-5 pb-8 pt-4 sm:px-8 sm:pt-6"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#prologue" onClick={go('prologue')} className="pointer-events-auto flex items-center gap-3" aria-label="Back to the top">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line-strong)] font-mono text-[11px] font-semibold tracking-tight">
          VP
        </span>
        <span className="hidden text-sm font-medium tracking-tight sm:block">Vraj Patel</span>
      </a>
      <div className="pointer-events-auto flex items-center gap-4">
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 md:block" aria-live="polite">
          {String(active).padStart(2, '0')} · {CHAPTERS[active].label}
        </span>
        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="icon-btn h-9 w-9" aria-label="GitHub">
          <BrandIcon icon={siGithub} size={16} />
        </a>
      </div>
    </motion.header>
  );
}

/** The dock: one button per chapter, a capsule that slides to the active one, and the theme switch. */
export function Dock({ visible }: { visible: boolean }) {
  const active = useActiveChapter();
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <motion.nav
      aria-label="Chapters"
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-6"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="glass flex items-center gap-1 rounded-full p-1.5">
        {CHAPTERS.map((c, i) => {
          const Icon = ICONS[c.id];
          const on = i === active;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={go(c.id)}
              aria-current={on ? 'true' : undefined}
              className={`relative flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-medium transition-colors duration-300 ${
                on ? 'text-ink' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <Icon size={16} className="relative" aria-hidden="true" />
              <span className={`relative ${on ? 'hidden sm:inline' : 'sr-only'}`}>{c.label}</span>
            </a>
          );
        })}
        <span className="mx-1 h-6 w-px bg-[var(--line-strong)]" aria-hidden="true" />
        <button
          onClick={toggleTheme}
          className="relative grid h-10 w-10 place-items-center rounded-full text-ink-2 transition-colors hover:text-ink"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <motion.span key={isDarkMode ? 'moon' : 'sun'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
          </motion.span>
        </button>
      </div>
    </motion.nav>
  );
}
