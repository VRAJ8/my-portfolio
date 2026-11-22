import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { detectQuality, type Quality } from './lib/quality';
import { bindChapters, gsap, lockScroll, ScrollTrigger, startSmoothScroll, stopSmoothScroll } from './lib/scroll';
import { story } from './lib/story';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import { Dock, TopBar } from './components/Chrome';
import Prologue from './sections/Prologue';
import Origin from './sections/Origin';
import Training from './sections/Training';
import Work from './sections/Work';
import Toolkit from './sections/Toolkit';
import Signal from './sections/Signal';
import Footer from './sections/Footer';

// three.js, the shaders and Theatre.js load in their own chunk while the preloader runs.
const Field = lazy(() => import('./three/Field'));

function Scene({ quality, onReady }: { quality: Quality; onReady: () => void }) {
  const { isDarkMode } = useTheme();
  return (
    <Suspense fallback={null}>
      <Field quality={quality} light={!isDarkMode} onReady={onReady} />
    </Suspense>
  );
}

function Story() {
  const [quality] = useState(detectQuality);
  // Reduced motion gets a still page: no particle field, no smooth scrolling, no preloader.
  const field = quality.webgl && !quality.reducedMotion;
  const [ready, setReady] = useState(!field);
  const [started, setStarted] = useState(quality.reducedMotion);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (!quality.reducedMotion) {
      startSmoothScroll();
      if (!started) lockScroll(true);
    }
    const unbind = bindChapters();
    // Fonts change line lengths, so re-measure every trigger once they've loaded.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    // Never wait on the scene forever.
    const timeout = window.setTimeout(() => setReady(true), 6000);
    return () => {
      unbind();
      stopSmoothScroll();
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const begin = useCallback(() => {
    setStarted(true);
    lockScroll(false);
    gsap.to(story, { intro: 1, duration: 2.8, ease: 'power3.inOut' });
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (quality.reducedMotion) story.intro = 1;
  }, [quality.reducedMotion]);

  return (
    <>
      <a href="#origin" className="sr-only z-[200] rounded-full bg-ink px-4 py-2 text-[var(--bg)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <div className="backdrop" aria-hidden="true" />
      {field && <Scene quality={quality} onReady={onReady} />}
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Cursor />
      <TopBar visible={started} />
      <Dock visible={started} />
      <main className="relative z-10">
        <Prologue play={started} field={field} />
        {/* On phones the globe sits behind the text, so its labels would collide with it. */}
        <Origin labels={field && !quality.portrait} />
        <Training />
        <Work />
        <Toolkit />
        <Signal />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      {!quality.reducedMotion && <Preloader ready={ready} particles={field ? quality.particles : 0} onDone={begin} />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Story />
      </MotionConfig>
    </ThemeProvider>
  );
}
