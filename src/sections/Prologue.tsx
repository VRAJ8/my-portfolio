import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import Split from '../components/Split';
import Magnetic from '../components/Magnetic';
import { scrollToTarget } from '../lib/scroll';
import { availability, socials } from '../data/socials';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

interface PrologueProps {
  /** The intro has started (the preloader has lifted). */
  play: boolean;
  /** The particle field is drawing the name; otherwise the name is set in type. */
  field: boolean;
}

export default function Prologue({ play, field }: PrologueProps) {
  const reduced = usePrefersReducedMotion();
  const fade = (delay: number, on: boolean) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: reduced ? 0 : 1.2, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  return (
    <section
      id="prologue"
      className={`relative flex min-h-[100svh] flex-col items-center px-5 pb-28 pt-[52svh] text-center sm:px-8 sm:pb-24 ${field ? 'justify-end' : 'justify-center'}`}
    >
      <motion.div className="absolute inset-x-0 top-20 flex flex-col items-center gap-4 px-5 sm:top-24" {...fade(0.2, play)}>
        {/* On short screens the availability line matters more than the kicker, so the kicker steps aside. */}
        <p className="kicker [@media(max-height:700px)]:hidden">
          <span className="sm:hidden">Data · AI · ML — San José</span>
          <span className="hidden sm:inline">Data · AI · Machine learning — San José, CA</span>
        </p>
        <p className="glass inline-flex max-w-md items-center gap-2.5 rounded-2xl px-4 py-2 text-left text-[13px] leading-snug sm:max-w-none sm:rounded-full sm:text-sm">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {availability}
        </p>
      </motion.div>

      {/* The particles spell the name above this block. The heading stays in the page for screen readers and search. */}
      <h1 className={field ? 'sr-only' : 'display absolute inset-x-0 top-[24svh] text-[clamp(3.5rem,14vw,12rem)]'}>Vraj Patel</h1>

      <div className="flex flex-col items-center">
        <Split as="p" by="words" play={play} delay={0.5} className="text-[clamp(1.6rem,4.2vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink-2">
          Every dataset starts as <span className="serif text-ink">noise.</span>
        </Split>
        <Split as="p" by="words" play={play} delay={1.6} className="mt-1 text-[clamp(1.6rem,4.2vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          I turn it into <span className="serif text-signal pr-1">signal.</span>
        </Split>
        <motion.p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-2 sm:text-base" {...fade(2.2, play)}>
          MS in Applied Data Intelligence at San José State. I build data pipelines, machine learning systems and the AI
          products around them, end to end.
        </motion.p>
        <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" {...fade(2.45, play)}>
          <Magnetic>
            <a href="#work" onClick={(e) => (e.preventDefault(), scrollToTarget('work'))} className="btn-primary" data-cursor="Watch">
              See the work <ArrowDown size={16} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={`mailto:${socials.email}`} className="btn-ghost">
              Say hello <ArrowUpRight size={16} />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToTarget('origin')}
        className="absolute bottom-10 right-8 hidden flex-col items-center gap-3 lg:flex"
        aria-label="Scroll to the next chapter"
        {...fade(3, play)}
      >
        <span className="kicker">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-[var(--line-strong)]">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
      </motion.button>
    </section>
  );
}
