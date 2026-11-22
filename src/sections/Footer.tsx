import { useEffect, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { socials } from '../data/socials';
import { scrollToTarget } from '../lib/scroll';

const TIME_ZONE = 'America/Los_Angeles';

/** What Vraj is probably up to at a given hour in San José. */
const statusFor = (hour: number) => {
  if (hour < 6) return 'dreaming in tensors';
  if (hour < 9) return 'brewing coffee, reading papers';
  if (hour < 12) return 'deep in a notebook';
  if (hour < 14) return 'on a lunch break';
  if (hour < 18) return 'training models';
  if (hour < 21) return 'watching cricket or basketball';
  return 'late-night debugging';
};

function useSanJoseTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' }).format(now);
  const hour = Number(new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', hourCycle: 'h23' }).format(now));
  return { time, status: statusFor(hour) };
}

// Each log line "types" itself out, one after another.
const line: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  shown: (i: number) => ({ clipPath: 'inset(0 0% 0 0)', transition: { delay: 0.25 + i * 0.5, duration: 0.45, ease: 'linear' } }),
};
const bar: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { delay: 1.8, duration: 1.1, ease: [0.65, 0, 0.35, 1] } },
};

/** The page ends like a training run, with the time where Vraj is. */
export default function Footer() {
  const { time, status } = useSanJoseTime();
  return (
    <footer className="relative overflow-hidden px-5 pb-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="panel grid gap-10 rounded-[32px] p-7 sm:p-10 md:grid-cols-[1.35fr,1fr] md:gap-12">
          <div className="min-w-0">
            <span className="tag">train.log</span>
            <motion.ol className="mt-5 space-y-2.5 font-mono text-[13px] leading-relaxed text-ink-2 sm:text-sm" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.6 }} aria-label="Training log">
              <motion.li variants={line} custom={0} className="w-fit">
                <span className="text-accent">$</span> python portfolio.py --visitor you
              </motion.li>
              <motion.li variants={line} custom={1} className="w-fit">
                <span className="text-emerald-400">✓</span> loaded {projects.length} projects · {skills.length} tools
              </motion.li>
              <motion.li variants={line} custom={2} className="w-fit">
                <span className="text-emerald-400">✓</span> trained on curiosity, cricket and late nights
              </motion.li>
              <motion.li variants={line} custom={3} className="flex w-full max-w-sm items-center gap-3">
                <span className="shrink-0">Epoch 5/5</span>
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--line)]" aria-hidden="true">
                  <motion.span variants={bar} className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent to-accent-2" />
                </span>
                <span className="shrink-0 text-ink">100%</span>
              </motion.li>
              <motion.li variants={line} custom={4} className="w-fit text-ink">
                <span className="text-accent">→</span> prediction: <span className="font-semibold">we should talk</span>{' '}
                <span className="text-ink-3">(confidence 0.98)</span>
                <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-ink/70" aria-hidden="true" />
              </motion.li>
            </motion.ol>
          </div>
          <div className="flex flex-col justify-between gap-8 md:border-l md:border-[var(--line)] md:pl-10">
            <div>
              <p className="kicker">Local time</p>
              <p className="mt-2 text-5xl font-semibold tabular-nums tracking-[-0.04em] sm:text-6xl">{time}</p>
              <p className="mt-2 text-ink-2">{socials.location}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-2">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Probably {status}
              </p>
            </div>
            <button onClick={() => scrollToTarget('prologue')} className="btn-ghost w-fit">
              <ArrowUp size={16} /> Back to the beginning
            </button>
          </div>
        </div>

        <motion.p
          className="wordmark pointer-events-none mt-14 select-none text-center font-bold tracking-[-0.06em]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          VrajPatel
        </motion.p>
        <p className="mt-6 text-center text-sm text-ink-3">
          © {new Date().getFullYear()} Vraj Patel · Built with React, three.js, GSAP, Theatre.js, anime.js and Motion
        </p>
      </div>
    </footer>
  );
}
