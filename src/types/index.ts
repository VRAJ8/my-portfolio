import type { SimpleIcon } from 'simple-icons';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: number;
  /** Featured projects get a full panel in the work chapter; the rest sit in the grid below it. */
  featured?: boolean;
  /** Who it was for or with, when it wasn't a solo project. */
  context?: string;
  /** Tint for the project's panel and glow. */
  accent: string;
  image?: string;
  /** A silent looping trailer; `aspect` is the shape it was rendered in. */
  video?: { webm: string; mp4: string; poster: string; aspect: 'square' | 'wide' };
  highlights?: string[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudy?: {
    challenge: string;
    solution: string;
    impact: string;
  };
}

export interface Writing {
  title: string;
  subtitle: string;
  venue: string;
  date: string;
  readTime: string;
  url: string;
  codeUrl?: string;
}

export type SkillCategory = 'ai' | 'data' | 'dev' | 'cloud' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Brand mark from simple-icons, when the tool has one. */
  icon?: SimpleIcon;
  /** Fallback lettermark for tools without a brand icon. */
  monogram?: { text: string; hex: string };
}
