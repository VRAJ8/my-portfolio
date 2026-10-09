import React from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import GlassPanel from './GlassPanel';
import ProjectCover from './ProjectCover';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

// Six-column grid on large screens: the hero spans all of it, major projects half, minor a third.
const span: Record<Project['tier'], string> = {
  hero: 'md:col-span-2 lg:col-span-6 lg:flex-row',
  major: 'lg:col-span-3',
  minor: 'lg:col-span-2',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpen }) => {
  const { tier } = project;
  const hero = tier === 'hero';

  return (
    <GlassPanel
      tilt={hero ? 2 : 3}
      className={`group flex h-full flex-col rounded-card p-3 ${span[tier]}`}
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: hero ? 0 : (index % 3) * 0.08 }}
    >
      <div
        className={`relative z-[2] overflow-hidden rounded-[22px] ${
          hero
            ? project.video
              ? 'aspect-square lg:w-1/2 lg:shrink-0 lg:self-center'
              : 'aspect-[16/10] lg:aspect-auto lg:w-[55%] lg:shrink-0'
            : 'aspect-[16/10]'
        }`}
      >
        <ProjectCover
          project={project}
          // The hero frame is taller than the screenshot, so keep its top-left (the headline) in view.
          position={hero ? 'left top' : 'center'}
          className="transition-transform duration-700 ease-apple group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
      </div>

      <div className={`relative z-[2] flex flex-1 flex-col p-4 ${hero ? 'md:p-6 lg:p-8' : tier === 'major' ? 'sm:p-5' : ''}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {hero && <span className="eyebrow">Featured · Data & ML</span>}
          <span className="text-[13px] font-medium text-label-tertiary">{project.year}</span>
        </div>
        <h3 className={`font-bold tracking-tight ${hero ? 'text-3xl md:text-4xl' : tier === 'major' ? 'text-2xl md:text-[1.7rem]' : 'text-xl'}`}>
          {project.title}
        </h3>
        <p className={`mt-1 font-medium text-label ${hero ? 'text-lg' : 'text-[15px]'}`}>{project.tagline}</p>
        <p className={`mt-3 leading-relaxed text-label-secondary ${hero ? '' : tier === 'major' ? 'line-clamp-4' : 'line-clamp-3 text-[15px]'}`}>
          {project.description}
        </p>

        {project.highlights && (
          <ul className={`mt-5 grid gap-2 ${hero ? 'sm:grid-cols-2' : ''}`} aria-label="Highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-sm font-medium text-label">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary h-10 px-4 text-sm">
              <ExternalLink size={16} />
              Live demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-glass h-10 px-4 text-sm">
              <Github size={16} />
              Code
            </a>
          )}
          {project.caseStudy && (
            <button onClick={() => onOpen(project)} className="btn-glass ml-auto h-10 px-4 text-sm" aria-haspopup="dialog">
              Case study
              <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>
    </GlassPanel>
  );
};

export default ProjectCard;
