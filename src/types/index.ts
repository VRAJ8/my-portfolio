import type { SimpleIcon } from 'simple-icons';

export interface Project {
  id: number;
  title: string;
  /** One line under the title, e.g. what it is in a few words. */
  tagline: string;
  description: string;
  year: number;
  /** hero: full-width headline project; major: large cards; minor: compact cards. */
  tier: 'hero' | 'major' | 'minor';
  /** Screenshot; projects without one get a generated cover. */
  image?: string;
  /** A short silent loop shown on the card instead of the screenshot. */
  /** A silent looping trailer; `aspect` is the shape it was rendered in. */
  video?: { webm: string; mp4: string; poster: string; aspect: 'square' | 'wide' };
  /** Short proof points shown as chips on the card. */
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

export type SkillCategory = 'ai' | 'data' | 'dev' | 'cloud' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Brand icon. Tools without one get a short monogram in their brand colour instead. */
  icon?: SimpleIcon;
  monogram?: { text: string; hex: string };
}
