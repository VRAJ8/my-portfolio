import { useEffect, useRef } from 'react';
import type { Project } from '../types';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

interface ProjectMediaProps {
  project: Project;
  className?: string;
  /** Play large with controls (the case study sheet) instead of as a silent loop. */
  expanded?: boolean;
  /** Hold the trailer still, e.g. while a sheet covers the page. */
  paused?: boolean;
}

/** A silent looping trailer that only plays while it's on screen. */
function Trailer({ project, className, expanded, paused }: Required<Omit<ProjectMediaProps, 'className'>> & { className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const video = project.video!;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (expanded) {
      el.play().catch(() => {});
      return;
    }
    if (paused) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, expanded, paused]);

  return (
    <video
      ref={ref}
      className={`h-full w-full ${expanded ? 'object-contain' : 'object-cover'} ${className}`}
      poster={video.poster}
      muted
      loop
      playsInline
      controls={expanded}
      preload={reduced ? 'none' : expanded ? 'auto' : 'metadata'}
      disablePictureInPicture
      aria-label={`${project.title} trailer`}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}

/** The project's trailer, screenshot, or a generated cover when there's neither. */
export default function ProjectMedia({ project, className = '', expanded = false, paused = false }: ProjectMediaProps) {
  if (project.video) return <Trailer project={project} className={className} expanded={expanded} paused={paused} />;
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }
  const initials = project.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <div
      className={`relative grid h-full w-full place-items-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 120% at 20% 10%, ${project.accent}55, transparent 60%), var(--bg-2)` }}
      role="img"
      aria-label={`${project.title} cover`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle, var(--ink-3) 1px, transparent 1.5px)', backgroundSize: '16px 16px' }}
      />
      <span className="relative text-6xl font-semibold tracking-[-0.06em] text-ink">{initials}</span>
    </div>
  );
}
