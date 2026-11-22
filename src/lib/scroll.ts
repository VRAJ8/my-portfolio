import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { CHAPTERS, setActiveChapter, story } from './story';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

let lenis: Lenis | null = null;

/** Smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock. */
export function startSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
  lenis.on('scroll', (e: Lenis) => {
    ScrollTrigger.update();
    story.velocity = e.velocity;
  });
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

/** Scroll to an element or id, smoothly when Lenis is running. */
export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === 'string' ? document.getElementById(target.replace('#', '')) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

/** Lock scrolling while a modal is open. */
export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
}

/**
 * Wires every chapter section to the story: how far it has scrolled in (which drives the
 * particle morphs), how far through it the reader is, and which one is active.
 */
export function bindChapters() {
  const triggers: ScrollTrigger[] = [];
  CHAPTERS.forEach((chapter, i) => {
    const el = document.getElementById(chapter.id);
    if (!el) return;
    if (i > 0) {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'top 30%',
          onUpdate: (self) => (story.approach[i] = self.progress),
          onRefresh: (self) => (story.approach[i] = self.progress),
        })
      );
    }
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        end: 'bottom 35%',
        onUpdate: (self) => (story.local[i] = self.progress),
        onRefresh: (self) => (story.local[i] = self.progress),
      }),
      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActiveChapter(i),
      })
    );
  });
  return () => triggers.forEach((t) => t.kill());
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
