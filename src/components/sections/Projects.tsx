import React, { useCallback, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';
import ProjectSheet from '../ui/ProjectSheet';
import SectionHeading from '../ui/SectionHeading';
import { projects } from '../../data/projects';
import { Project } from '../../types';

const Projects: React.FC = () => {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const closeSheet = useCallback(() => setOpenProject(null), []);

  return (
    <section id="projects" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="From LLM-powered security tooling to full-stack products."
          icon={<LayoutGrid size={14} />}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setOpenProject} />
          ))}
        </div>
      </div>
      <ProjectSheet project={openProject} onClose={closeSheet} />
    </section>
  );
};

export default Projects;
