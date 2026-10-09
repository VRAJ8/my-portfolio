import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Project } from '../../types';

interface ProjectCoverProps {
  project: Project;
  className?: string;
  /** Where to anchor a screenshot when the frame crops it (CSS object-position). */
  position?: string;
  /** Show the screenshot even when the project has a video (e.g. in the case study sheet). */
  still?: boolean;
}

/** A silent looping trailer that only plays while it's on screen. */
const ProjectVideo: React.FC<{ project: Project; className: string }> = ({ project, className }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const video = project.video!;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={video.poster}
      muted
      loop
      playsInline
      preload={reduceMotion ? 'none' : 'metadata'}
      disablePictureInPicture
      aria-label={`${project.title} trailer`}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
};

/** The project's trailer or screenshot, or a generated cover when there's neither. */
const ProjectCover: React.FC<ProjectCoverProps> = ({ project, className = '', position = 'center', still = false }) => {
  if (project.video && !still) return <ProjectVideo project={project} className={className} />;

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: position }}
      />
    );
  }

  const initials = project.title
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 ${className}`}
      role="img"
      aria-label={`${project.title} cover`}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
      />
      <span className="relative text-6xl font-bold tracking-tighter text-white/90">{initials}</span>
    </div>
  );
};

export default ProjectCover;
