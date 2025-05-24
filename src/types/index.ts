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
  verified?: boolean;
  stats?: { icon?: React.ReactNode; value: string; label: string }[];
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  icon?: string;
  level?: number;
}

export interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  technologies: string[];
}