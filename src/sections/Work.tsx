import { useCallback, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, Play } from 'lucide-react';
import { siGithub } from 'simple-icons';
import ChapterTitle from '../components/ChapterTitle';
import ProjectMedia from '../components/ProjectMedia';
import ProjectSheet from '../components/ProjectSheet';
import BrandIcon from '../components/BrandIcon';
import Magnetic from '../components/Magnetic';
import Split from '../components/Split';
import { gsap, ScrollTrigger, useGSAP } from '../lib/scroll';
import { projects, writing } from '../data/projects';
import type { Project } from '../types';

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

function Links({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.demoUrl && (
        <Magnetic>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary h-11 px-5 text-sm" data-cursor="Open">
            Live demo <ArrowUpRight size={15} />
          </a>
        </Magnetic>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost h-11 px-5 text-sm">
          <BrandIcon icon={siGithub} size={15} /> Code
        </a>
      )}
      {project.caseStudy && (
        <button onClick={() => onOpen(project)} className="btn-ghost h-11 px-5 text-sm" aria-haspopup="dialog" data-cursor={project.video ? 'Play' : 'Read'}>
          {project.video ? <Play size={14} /> : <BookOpen size={14} />} Case study
        </button>
      )}
    </div>
  );
}

/** One featured project: the trailer (or screenshot) on one side, the story on the other. */
function Panel({ project, index, onOpen, paused }: { project: Project; index: number; onOpen: (p: Project) => void; paused: boolean }) {
  const square = project.video?.aspect === 'square';
  return (
    <article data-panel className="relative flex w-full shrink-0 items-center lg:h-[100svh] lg:w-screen lg:px-[6vw]">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={`relative ${square ? 'lg:col-span-5 lg:col-start-2' : 'lg:col-span-7'}`}>
          {/* A soft glow in the project's colour behind the media */}
          <div
            className="pointer-events-none absolute -inset-10 -z-10 opacity-60 blur-3xl"
            style={{ background: `radial-gradient(50% 50% at 50% 50%, ${project.accent}55, transparent 70%)` }}
            aria-hidden="true"
          />
          <button
            data-media
            onClick={() => project.caseStudy && onOpen(project)}
            className={`group block w-full overflow-hidden rounded-[28px] border border-[var(--line-strong)] bg-black shadow-2xl ${
              square ? 'aspect-square' : 'aspect-[16/10]'
            }`}
            aria-label={`Open the ${project.title} case study`}
            data-cursor={project.video ? 'Play' : 'Open'}
          >
            <ProjectMedia project={project} paused={paused} className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]" />
          </button>
        </div>
        <div className={square ? 'lg:col-span-5' : 'lg:col-span-5'}>
          <p className="kicker flex items-center gap-3">
            <span style={{ color: project.accent }}>{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-[var(--line-strong)]" aria-hidden="true" />
            {project.year}
            {project.video ? ' · trailer' : ''}
          </p>
          <h3 className="display mt-5 text-[clamp(2.8rem,5.6vw,5.4rem)]">{project.title}</h3>
          <p className="mt-4 text-lg leading-snug text-ink sm:text-xl">{project.tagline}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{project.description}</p>
          {project.highlights && (
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2" aria-label="Highlights">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.slice(0, 8).map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Links project={project} onOpen={onOpen} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Card({ project, onOpen, paused }: { project: Project; onOpen: (p: Project) => void; paused: boolean }) {
  return (
    <motion.article
      className="panel group flex flex-col overflow-hidden rounded-[28px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--line)] bg-[var(--bg-2)]">
        <ProjectMedia project={project} paused={paused} className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="kicker">
          {project.year}
          {project.context ? ` · ${project.context}` : ''}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-1 text-ink">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-2">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.slice(0, 5).map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <Links project={project} onOpen={onOpen} />
        </div>
      </div>
    </motion.article>
  );
}

/** Chapter 3: the work. Featured projects scroll sideways like a film strip; the rest sit below. */
export default function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const pin = root.current!.querySelector<HTMLElement>('[data-pin]')!;
        const track = root.current!.querySelector<HTMLElement>('[data-track]')!;
        const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', track);
        const distance = () => track.scrollWidth - window.innerWidth;
        const film = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            // Settle on one project at a time.
            snap: { snapTo: 1 / Math.max(1, panels.length - 1), directional: false, duration: { min: 0.3, max: 0.8 }, delay: 0.08, ease: 'power2.inOut' },
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (counter.current) counter.current.textContent = String(Math.min(panels.length, Math.floor(self.progress * panels.length * 0.999) + 1)).padStart(2, '0');
              const bar = root.current?.querySelector<HTMLElement>('[data-film-bar]');
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // Each panel's media grows into place as it slides in.
        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelector('[data-media]'),
            { scale: 0.82, rotate: -2, opacity: 0.35 },
            { scale: 1, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: film, start: 'left 95%', end: 'left 35%', scrub: true } }
          );
        });
        ScrollTrigger.refresh();
      });
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterTitle index={3} label="The work">
          Trailers,
          <br />
          not <span className="serif">screenshots.</span>
        </ChapterTitle>
        <Split as="p" className="lede mt-8 max-w-xl">
          The projects I'm proudest of. Three come with a short trailer I made from their real data and screens. Open a case
          study to watch it large.
        </Split>
      </div>

      <div data-pin className="relative mt-16 lg:mt-0 lg:h-[100svh] lg:overflow-hidden">
        <div data-track className="flex flex-col gap-24 px-5 sm:px-8 lg:h-full lg:flex-row lg:items-center lg:gap-0 lg:px-0">
          {featured.map((p, i) => (
            <Panel key={p.id} project={p} index={i} onOpen={setOpen} paused={open !== null} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-24 hidden items-center gap-4 px-[6vw] lg:flex" aria-hidden="true">
          <span className="font-mono text-xs text-ink-2">
            <span ref={counter}>01</span> / {String(featured.length).padStart(2, '0')}
          </span>
          <span className="h-px flex-1 overflow-hidden bg-[var(--line-strong)]">
            <span data-film-bar className="block h-full origin-left bg-ink" style={{ transform: 'scaleX(0)' }} />
          </span>
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Split as="h3" className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">
            More from the lab
          </Split>
          <p className="kicker">{more.length} projects · 1 essay</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <Card key={p.id} project={p} onOpen={setOpen} paused={open !== null} />
          ))}
        </div>

        {writing.map((w) => (
          <motion.a
            key={w.url}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel group mt-6 flex flex-col gap-6 rounded-[28px] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="Read"
          >
            <div>
              <p className="kicker flex items-center gap-2">
                <BookOpen size={13} aria-hidden="true" /> Writing · {w.venue} · {w.date} · {w.readTime}
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {w.title}
              </h3>
              <p className="serif mt-2 text-2xl text-ink-2 sm:text-3xl">{w.subtitle}</p>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] transition-transform duration-500 ease-out-expo group-hover:rotate-45">
              <ArrowUpRight size={22} />
            </span>
          </motion.a>
        ))}
      </div>

      <ProjectSheet project={open} onClose={close} />
    </section>
  );
}
