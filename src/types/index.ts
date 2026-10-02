import type { SimpleIcon } from 'simple-icons';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  caseStudy?: {
    challenge: string;
    solution: string;
    impact: string;
  };
}

export type SkillCategory = 'ai' | 'dev' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: SimpleIcon;
}
