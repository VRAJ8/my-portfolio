import React from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import GlassPanel from './GlassPanel';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpen }) => {
  const { featured } = project;

  return (
    <GlassPanel
      tilt={featured ? 2 : 3}
      className={`group flex h-full flex-col rounded-card p-3 ${featured ? 'md:col-span-2 md:flex-row lg:col-span-3' : ''}`}
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: featured ? 0 : (index % 3) * 0.08 }}
    >
      <div
        className={`relative z-[2] overflow-hidden rounded-[22px] ${
          featured ? 'aspect-[16/10] md:aspect-auto md:w-1/2 md:shrink-0' : 'aspect-[16/10]'
        }`}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
      </div>

      <div className={`relative z-[2] flex flex-1 flex-col p-4 ${featured ? 'md:p-8' : ''}`}>
        {featured && <span className="eyebrow mb-4 self-start">Featured · AI</span>}
        <h3 className={`font-bold tracking-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{project.title}</h3>
        <p className={`mt-3 leading-relaxed text-label-secondary ${featured ? '' : 'line-clamp-3'}`}>{project.description}</p>

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
