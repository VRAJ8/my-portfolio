import { useRef } from 'react';
import { Award, BookOpen, Briefcase, GraduationCap, type LucideIcon } from 'lucide-react';
import ChapterTitle from '../components/ChapterTitle';
import { gsap, useGSAP } from '../lib/scroll';
import { certifications, education, publication, roles } from '../data/experience';

interface Step {
  year: string;
  title: string;
  org: string;
  period: string;
  points: string[];
  tags?: string[];
  Icon: LucideIcon;
}

// The path in order, oldest first: each step lights the next layer of the network.
const steps: Step[] = [
  {
    year: '2022',
    title: education[1].degree,
    org: education[1].school,
    period: education[1].period,
    points: [education[1].detail],
    Icon: GraduationCap,
  },
  ...[...roles].reverse().slice(0, 2).map((r) => ({
    year: r.period.slice(-4),
    title: r.title,
    org: r.company,
    period: r.period,
    points: r.points,
    tags: r.tags,
    Icon: Briefcase,
  })),
  {
    year: '2025',
    title: 'Published at IEEE MoSICom 2025',
    org: publication.title,
    period: 'Conference paper',
    points: [publication.venue],
    Icon: BookOpen,
  },
  ...roles.slice(0, 1).map((r) => ({
    year: r.period.slice(-4),
    title: r.title,
    org: r.company,
    period: r.period,
    points: r.points,
    tags: r.tags,
    Icon: Briefcase,
  })),
  {
    year: '2026',
    title: education[0].degree,
    org: education[0].school,
    period: education[0].period,
    points: [education[0].detail],
    Icon: GraduationCap,
  },
];

/** Chapter 2: the path so far. A network lights up layer by layer behind it. */
export default function Training() {
  const list = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const el = list.current!;
      gsap.fromTo(
        el.querySelector('[data-progress]'),
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom 60%', scrub: true } }
      );
      el.querySelectorAll('[data-step]').forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -30,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        });
        gsap.to(step.querySelector('[data-dot]'), {
          scale: 1,
          backgroundColor: 'var(--accent)',
          ease: 'none',
          scrollTrigger: { trigger: step, start: 'top 60%', end: 'top 55%', scrub: true },
        });
      });
    },
    { scope: list }
  );

  return (
    <section id="training" className="relative px-5 py-32 sm:px-8 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          <ChapterTitle index={2} label="Training">
            Every role
            <br />
            added a <span className="serif">layer.</span>
          </ChapterTitle>
          <p className="lede mt-8">From a B.Tech in Gujarat to data science in San José, by way of three internships and a paper.</p>
        </div>

        <ol ref={list} className="relative mt-20 max-w-xl space-y-6 pl-10 sm:pl-14">
          <span className="absolute bottom-2 left-[11px] top-2 w-px bg-[var(--line-strong)] sm:left-[19px]" aria-hidden="true" />
          <span
            data-progress
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2 sm:left-[19px]"
            aria-hidden="true"
          />
          {steps.map((s) => (
            <li key={`${s.year}-${s.title}`} data-step className="relative">
              <span
                data-dot
                className="absolute -left-10 top-7 h-[9px] w-[9px] scale-75 rounded-full border border-[var(--line-strong)] bg-[var(--bg)] sm:-left-14 sm:ml-2"
                aria-hidden="true"
              />
              <article className="panel rounded-3xl p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-ink-3">{s.period}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1 text-ink-2">{s.org}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--line)] text-accent">
                    <s.Icon size={18} aria-hidden="true" />
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink-2">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {s.tags && (
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools">
                    {s.tags.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-16 max-w-xl">
          <h3 className="kicker flex items-center gap-2">
            <Award size={14} aria-hidden="true" /> Certifications
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {certifications.map((c) => (
              <li key={c} className="tag text-[12px]">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
