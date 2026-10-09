export interface Role {
  company: string;
  title: string;
  period: string;
  points: string[];
  tags: string[];
  tint: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

export const roles: Role[] = [
  {
    company: 'Hunexture',
    title: 'Software Development Intern',
    period: 'Jan – Apr 2026',
    points: [
      'Built an end-to-end enterprise management and collaboration platform, from design and data modeling through development and deployment.',
      'Designed MongoDB schemas and RESTful APIs with Node.js and Express to support multi-user workflows and data processing across modules.',
    ],
    tags: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    tint: 'from-sky-400 to-blue-600',
  },
  {
    company: 'BrainyBeam Infotech',
    title: 'Full Stack Software Developer Intern',
    period: 'May – Jul 2025',
    points: [
      'Delivered full-stack MERN web modules as part of a team in a fast-paced environment.',
      'Coordinated frontend and backend integration across modules to meet delivery schedules.',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    tint: 'from-violet-400 to-purple-600',
  },
  {
    company: 'Techomax Solutions',
    title: 'PHP Laravel Developer Intern',
    period: 'May – Jul 2024',
    points: [
      'Developed backend systems in PHP and Laravel using object-oriented design and relational data models.',
      'Managed databases with phpMyAdmin, implementing CRUD operations, data validation and integrity checks.',
    ],
    tags: ['PHP', 'Laravel', 'MySQL'],
    tint: 'from-amber-400 to-orange-600',
  },
];

export const education: Education[] = [
  {
    school: 'San Jose State University',
    degree: 'MS, Applied Data Intelligence',
    period: '2026 – 2028',
    detail: 'Big Data & Data Warehousing · Database Management Systems · Data Structures & Algorithms · Software Engineering',
  },
  {
    school: 'CHARUSAT',
    degree: 'B.Tech, Computer Science and Engineering',
    period: '2022 – 2026',
    detail: 'Chandubhai S. Patel Institute of Technology · GPA 8.32',
  },
];

export const publication = {
  title: 'Blockchain in Education: Leveraging Blockchain for Immutable Certifications',
  venue: '4th IEEE International Conference on Modelling, Simulation & Intelligent Computing (MoSICom 2025)',
};

export const certifications = [
  'AWS Certified Developer – Associate',
  'Red Hat Enterprise Linux 9',
  'DSA with Java (NPTEL)',
  'Blockchain Certification Course',
];
