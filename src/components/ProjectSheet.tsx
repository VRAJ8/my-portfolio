import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { siGithub } from 'simple-icons';
import ProjectMedia from './ProjectMedia';
import BrandIcon from './BrandIcon';
import { lockScroll } from '../lib/scroll';
import type { Project } from '../types';

interface ProjectSheetProps {
  project: Project | null;
  onClose: () => void;
}

/** A sheet that presents a project's case study, with its trailer playing large, over a dimmed page. */
export default function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    lockScroll(true);
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      lockScroll(false);
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  // Portalled to <body> so it sits above the dock and top bar, outside the page's stacking context.
  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            className={`relative flex max-h-[90svh] w-full flex-col overflow-hidden rounded-[32px] border border-[var(--line-strong)] bg-[var(--bg-2)] shadow-2xl ${
              project.video ? 'max-w-4xl' : 'max-w-3xl'
            }`}
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button ref={closeRef} onClick={onClose} className="glass absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full" aria-label="Close case study">
              <X size={18} />
            </button>
            <div className="overflow-y-auto overscroll-contain" data-lenis-prevent>
              <div
                className={`overflow-hidden bg-black ${
                  project.video?.aspect === 'square' ? 'mx-auto aspect-square w-full max-w-[64svh]' : project.video ? 'aspect-[16/10]' : 'aspect-[16/9]'
                }`}
              >
                <ProjectMedia project={project} expanded />
              </div>
              <div className="p-6 sm:p-10">
                <p className="kicker">
                  {project.year}
                  {project.context ? ` · ${project.context}` : ''}
                </p>
                <h3 id="sheet-title" className="display mt-3 text-[clamp(2.4rem,6vw,4rem)]">
                  {project.title}
                </h3>
                <p className="mt-3 text-lg text-ink-2">{project.tagline}</p>
                <p className="mt-6 leading-relaxed text-ink-2">{project.description}</p>
                {project.caseStudy && (
                  <dl className="mt-10 grid gap-8 md:grid-cols-3">
                    {(['challenge', 'solution', 'impact'] as const).map((key, i) => (
                      <div key={key}>
                        <dt className="kicker flex items-center gap-2">
                          <span className="text-accent">0{i + 1}</span> {key}
                        </dt>
                        <dd className="mt-3 text-[15px] leading-relaxed text-ink-2">{project.caseStudy![key]}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className="mt-10 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {project.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
                {(project.demoUrl || project.githubUrl) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Live demo <ArrowUpRight size={16} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                        <BrandIcon icon={siGithub} size={16} /> View code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
