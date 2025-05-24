import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const delay = 0.2 + (index * 0.1);

  return (
    <motion.article
      className="relative rounded-[32px] shadow-xl bg-white dark:bg-[#18181b] overflow-hidden border border-text-primary-light/10 dark:border-white/10 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image with overlay */}
      <div className="relative aspect-[4/5] w-full">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Overlayed content */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-3 z-10">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white drop-shadow-lg flex items-center">{project.title}</h3>
            {project.verified && (
              <span className="ml-1 text-accent" title="Verified">✔️</span>
            )}
          </div>
          <p className="text-white/90 text-sm mb-2 drop-shadow-lg line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-xs px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Stats row (customize as needed) */}
          {project.stats && (
            <div className="flex gap-6 mb-2">
              {project.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-1 text-white/90 text-sm">
                  {stat.icon && <span>{stat.icon}</span>}
                  <span className="font-semibold">{stat.value}</span>
                  <span className="opacity-80 ml-1">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          {/* Action buttons */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="flex gap-4 mt-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/30 backdrop-blur-md text-white font-semibold shadow-lg hover:bg-accent hover:text-white transition-all duration-300 border border-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
                >
                  <ExternalLink size={18} />
                  <span className="hidden sm:inline">Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/30 backdrop-blur-md text-white font-semibold shadow-lg hover:bg-accent hover:text-white transition-all duration-300 border border-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
                >
                  <Github size={18} />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Case Study Section */}
      {project.caseStudy && (
        <div className="bg-white dark:bg-[#18181b] p-6 border-t border-text-primary-light/10 dark:border-white/10">
          <button
            onClick={() => setIsCaseStudyOpen(!isCaseStudyOpen)}
            className="flex items-center justify-between w-full text-accent hover:text-accent-light transition-colors"
            aria-expanded={isCaseStudyOpen}
          >
            <span className="font-medium">Case Study</span>
            {isCaseStudyOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {isCaseStudyOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <div>
                <h4 className="text-sm uppercase tracking-wider text-text-primary-light dark:text-white">Challenge</h4>
                <p className="mt-1 text-text-primary-light/80 dark:text-white/80">{project.caseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-text-primary-light dark:text-white">Solution</h4>
                <p className="mt-1 text-text-primary-light/80 dark:text-white/80">{project.caseStudy.solution}</p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-text-primary-light dark:text-white">Impact</h4>
                <p className="mt-1 text-text-primary-light/80 dark:text-white/80">{project.caseStudy.impact}</p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.article>
  );
};

export default ProjectCard;