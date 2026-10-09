import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import ProjectCover from './ProjectCover';
import { Project } from '../../types';

interface ProjectSheetProps {
  project: Project | null;
  onClose: () => void;
}

/** A visionOS-style sheet that presents a project's full case study over a dimmed backdrop. */
const ProjectSheet: React.FC<ProjectSheetProps> = ({ project, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-sheet-title"
            className="glass relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-[36px]"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="icon-btn glass absolute left-5 top-5 z-10"
              aria-label="Close case study"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto overscroll-contain p-3">
              <div className="aspect-[16/9] overflow-hidden rounded-[26px]">
                <ProjectCover project={project} />
              </div>

              <div className="p-4 sm:p-6">
                <h3 id="project-sheet-title" className="text-3xl font-bold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-3 leading-relaxed text-label-secondary">{project.description}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>

                {project.caseStudy && (
                  <dl className="mt-6 space-y-5 rounded-3xl p-5 recessed sm:p-6">
                    {(['challenge', 'solution', 'impact'] as const).map((key) => (
                      <div key={key}>
                        <dt className="text-[12px] font-semibold uppercase tracking-wider text-label-tertiary">{key}</dt>
                        <dd className="mt-1 leading-relaxed text-label-secondary">{project.caseStudy![key]}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {(project.demoUrl || project.githubUrl) && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        <ExternalLink size={17} />
                        Live demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-glass">
                        <Github size={17} />
                        View code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectSheet;
