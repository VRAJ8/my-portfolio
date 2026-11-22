import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/scroll';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

interface SplitProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Split into lines (default), words or characters. */
  by?: 'lines' | 'words' | 'chars';
  delay?: number;
  stagger?: number;
  /** Where the reveal starts as you scroll; ignored when `play` is given. */
  start?: string;
  /** Reveal on cue instead of on scroll (false holds it hidden). */
  play?: boolean;
}

/**
 * Text that slides up into place from behind its own line masks (GSAP SplitText). It re-splits
 * when the layout changes, and shows plainly with reduced motion.
 */
export default function Split({ as: Tag = 'div', className = '', children, by = 'lines', delay = 0, stagger, start = 'top 86%', play }: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      if (play === false) return;
      const split = SplitText.create(el, {
        type: by === 'lines' ? 'lines' : `lines,${by}`,
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { autoAlpha: 1 });
          const targets = by === 'chars' ? self.chars : by === 'words' ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 115,
            rotate: by === 'chars' ? 6 : 2,
            duration: 1.15,
            ease: 'expo.out',
            stagger: stagger ?? (by === 'chars' ? 0.025 : by === 'words' ? 0.04 : 0.09),
            delay,
            scrollTrigger: play === undefined ? { trigger: el, start, once: true } : undefined,
          });
        },
      });
      return () => split.revert();
    },
    { dependencies: [play, reduced], scope: ref }
  );

  return (
    <Tag ref={ref} className={className} style={{ visibility: reduced ? 'visible' : 'hidden' }}>
      {children}
    </Tag>
  );
}
