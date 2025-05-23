import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  
  // Staggered animation based on index
  const delay = 0.2 + (index * 0.1);

  return (
    <motion.article
      className="group relative h-full glass-panel rounded-[32px] overflow-hidden border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass hover:shadow-glass-hover dark:hover:shadow-glass-hover transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Image container with enhanced hover effect */}
      <div className="relative overflow-hidden aspect-video">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform-gpu group-hover:scale-110 transition-transform duration-700 ease-apple"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="text-xs px-3 py-1 bg-glass-darker dark:bg-glass-darker rounded-full text-text-primary-light dark:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-text-primary-light dark:text-white">{project.title}</h3>
        <p className="text-text-primary-light/80 dark:text-white/80 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-lg bg-glass-darker dark:bg-glass-darker text-text-primary-light dark:text-white hover:bg-accent hover:text-white transition-all duration-300"
            >
              <span>Live Demo</span>
              <ExternalLink size={16} className="ml-2" />
            </a>
          )}
          
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-lg bg-glass-darker dark:bg-glass-darker text-text-primary-light dark:text-white hover:bg-accent hover:text-white transition-all duration-300"
            >
              <span>GitHub</span>
              <Github size={16} className="ml-2" />
            </a>
          )}
        </div>
        
        {/* Case Study Section */}
        {project.caseStudy && (
          <div className="mt-4 pt-4 border-t border-text-primary-light/10 dark:border-white/10">
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
      </div>
    </motion.article>
  );
};

export default ProjectCard;