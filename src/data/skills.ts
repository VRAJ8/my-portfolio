import {
  siExpress,
  siFastapi,
  siFirebase,
  siGit,
  siGithub,
  siGooglegemini,
  siJupyter,
  siLaravel,
  siMongodb,
  siMysql,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPhp,
  siPython,
  siRailway,
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTypescript,
} from 'simple-icons';
import { Skill, SkillCategory } from '../types';

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: 'ai', label: 'AI & Data' },
  { id: 'dev', label: 'Development' },
  { id: 'tools', label: 'Tools & Cloud' },
];

export const skills: Skill[] = [
  // AI & Data
  { name: 'Python', category: 'ai', icon: siPython },
  { name: 'pandas', category: 'ai', icon: siPandas },
  { name: 'NumPy', category: 'ai', icon: siNumpy },
  { name: 'scikit-learn', category: 'ai', icon: siScikitlearn },
  { name: 'Jupyter', category: 'ai', icon: siJupyter },
  { name: 'Gemini API', category: 'ai', icon: siGooglegemini },
  { name: 'SQL', category: 'ai', icon: siMysql },
  { name: 'MongoDB', category: 'ai', icon: siMongodb },

  // Development
  { name: 'FastAPI', category: 'dev', icon: siFastapi },
  { name: 'React', category: 'dev', icon: siReact },
  { name: 'Next.js', category: 'dev', icon: siNextdotjs },
  { name: 'TypeScript', category: 'dev', icon: siTypescript },
  { name: 'Tailwind CSS', category: 'dev', icon: siTailwindcss },
  { name: 'Node.js', category: 'dev', icon: siNodedotjs },
  { name: 'Express', category: 'dev', icon: siExpress },
  { name: 'Laravel', category: 'dev', icon: siLaravel },
  { name: 'PHP', category: 'dev', icon: siPhp },
  { name: 'Java', category: 'dev', icon: siOpenjdk },

  // Tools & Cloud
  { name: 'Git', category: 'tools', icon: siGit },
  { name: 'GitHub', category: 'tools', icon: siGithub },
  { name: 'Firebase', category: 'tools', icon: siFirebase },
  { name: 'Netlify', category: 'tools', icon: siNetlify },
  { name: 'Railway', category: 'tools', icon: siRailway },
];
