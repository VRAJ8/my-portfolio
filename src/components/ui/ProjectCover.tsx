import React from 'react';
import { Project } from '../../types';

interface ProjectCoverProps {
  project: Project;
  className?: string;
  /** Where to anchor a screenshot when the frame crops it (CSS object-position). */
  position?: string;
}

/** The project's screenshot, or a generated cover when there isn't one. */
const ProjectCover: React.FC<ProjectCoverProps> = ({ project, className = '', position = 'center' }) => {
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
