import { Project, Writing } from '../types';

// Leave demoUrl / githubUrl out when there is nothing public to link to: the button is hidden.
export const projects: Project[] = [
  {
    id: 'player-scout',
    title: 'Player Scout',
    tagline: 'Finds the footballers who play like any player you name',
    description:
      "Give it a player and it finds the players who play like him: 1,865 players across Europe's top five leagues, compared on their last 15 matches using every pass, tackle, take-on and shot, with their pitch coordinates. Not who has similar goals and assists, but who does the same job on the pitch.",
    year: 2026,
    featured: true,
    accent: '#3cf0a0',
    image: '/images/player-scout.webp',
    video: {
      webm: '/videos/player-scout.webm',
      mp4: '/videos/player-scout.mp4',
      poster: '/videos/player-scout-poster.webp',
      aspect: 'square',
    },
    highlights: ['1,865 players · 5 leagues', '36 features in 9 trait groups', 'Search runs in the browser', '105 tests in CI'],
    tags: ['Python', 'pandas', 'scikit-learn', 'PyTorch', 'Dagster', 'DuckDB', 'FastAPI', 'React', 'TypeScript', 'D3'],
    demoUrl: 'https://playslike.vercel.app',
    caseStudy: {
      challenge:
        "When a starter leaves, a recruitment team needs to know who else does the same job: who touches the ball in the same places, passes, carries and defends the same way. Stat tables of goals and assists can't answer that.",
      solution:
        "Ingests Opta event streams from WhoScored and per-shot xG from Understat, joins the two sources (which share no ids) by squad overlap and match date, and builds per-90 features over each player's last 15 matches, with small samples shrunk toward the role using strengths estimated from split-half reliability. Players are compared within their role by cosine similarity on centred percentiles. A Dagster pipeline with quality gates refreshes the data, and the index is exported as static data and searched in the browser by a TypeScript port checked against Python on every answer.",
      impact:
        'A public site with a style map of every player, player pages with radars and touch heatmaps, and side-by-side comparisons. A season-to-season test shows style travels: players who changed club still pick out their old selves 33 times more often than chance.',
    },
  },
  {
    id: 'fair-shot',
    title: 'Fair Shot',
    tagline: "What every NBA player produces, what they're paid, and who keeps the difference",
    description:
      "NBA pay from the players' side. Sixteen seasons from two sources are reconciled in a tested DuckDB warehouse, a wins-based market model prices every player's production, a quantile model projects the next three seasons, and an AI analyst answers questions by writing SQL against the same warehouse.",
    year: 2026,
    featured: true,
    accent: '#ff7a2f',
    image: '/images/fair-shot.webp',
    highlights: ['16 seasons · 2 sources', '99.99% of player-seasons matched', '$2.0B of unpaid production found', 'AI analyst writes the SQL'],
    tags: ['Python', 'DuckDB', 'SQL', 'scikit-learn', 'lifelines', 'React', 'D3', 'Three.js', 'GSAP', 'Gemini / Claude'],
    demoUrl: 'https://fair-shot.vercel.app',
    githubUrl: 'https://github.com/VRAJ8/fair-shot',
    caseStudy: {
      challenge:
        'Pay debates run on salaries alone. Nobody prices what each player actually produces, so it is hard to say who is underpaid, by how much, and who keeps the difference.',
      solution:
        'A polite, cached scraper pulls about 1,800 pages from Basketball-Reference and ESPN into a layered DuckDB warehouse (raw → staging → marts) with 14 data-quality checks. Players are matched across sources that share no key by normalized names, team and games played, with fuzzy fallbacks and a vote across seasons. Fair value prices wins over replacement at the market rate, gradient-boosted quantile models with conformal intervals project three seasons ahead, and a difference-in-differences and Kaplan–Meier curves test the 2023 CBA rules and career length.',
      impact:
        "236 of 498 players produced $2.0B more than they were paid in 2025–26, and 12 were worth more than the max salary allows. The projections beat Marcel-style baselines (MAE 1.34 vs 1.44 WAR) with calibrated 80% intervals, and a scroll-driven site and 647 player pages tell the story, with a sandboxed AI analyst that shows the SQL behind every answer.",
    },
  },
  {
    id: 'codeguard-ai',
    title: 'CodeGuard AI',
    tagline: 'A DevSecOps scanner that grades your repo A–F',
    description:
      'Runs static analysis, secret detection, dependency CVE checks and code-health analysis in one pass, maps every finding to CWE and the OWASP Top 10, and uses an LLM to write the patches. It also runs as a GitHub Action, a CLI, and entirely in the browser.',
    year: 2026,
    featured: true,
    accent: '#ffe14d',
    image: '/images/codeguard.webp',
    video: {
      webm: '/videos/codeguard-ai.webm',
      mp4: '/videos/codeguard-ai.mp4',
      poster: '/videos/codeguard-ai-poster.webp',
      aspect: 'wide',
    },
    highlights: ['6 engines in one pass', 'CWE + OWASP Top 10 mapping', 'Runs as a GitHub Action', 'SARIF, SBOM & PDF reports'],
    tags: ['Python', 'FastAPI', 'Semgrep', 'Bandit', 'Radon', 'OSV.dev', 'Llama 3.3 (Groq)', 'React', 'MongoDB', 'Docker'],
    demoUrl: 'https://codevigil.netlify.app',
    githubUrl: 'https://github.com/VRAJ8/CodeGuardAI',
    caseStudy: {
      challenge:
        'Security checks are usually spread across separate tools with noisy, duplicated output, so teams skip them or miss what matters.',
      solution:
        'One engine combines Bandit and Semgrep taint rules, a secrets scanner with entropy checks, OSV.dev dependency lookups with CVSS scores computed from the vector, and Radon code-health metrics. Findings are deduplicated across engines, tagged with CWE and OWASP Top 10, scored with exponential decay so severity outweighs volume, and triaged by Llama 3.3 70B on Groq, which writes copy-paste patches.',
      impact:
        'Exports SARIF for GitHub Code Scanning, a CycloneDX SBOM and a PDF audit, tracks new and fixed findings between scans, and gates CI as a GitHub Action: the repo scans itself on every push. A browser mode runs the same rules in a Web Worker, parity-tested against the Python engine.',
    },
  },
  {
    id: 'beast-mode-motors',
    title: 'Beast Mode Motors',
    tagline: 'A verified, transferable history for every car',
    description:
      'A car passport and a safer way to sell privately: owners log work with evidence, the shop that did it confirms it in one click, and when the car is sold the whole history moves to the new owner.',
    year: 2026,
    featured: true,
    accent: '#ff5b14',
    image: '/images/beastmode.webp',
    video: {
      webm: '/videos/beast-mode-motors.webm',
      mp4: '/videos/beast-mode-motors.mp4',
      poster: '/videos/beast-mode-motors-poster.webp',
      aspect: 'wide',
    },
    highlights: ['Claude reads receipts', 'Shops verify without an account', 'Scam shield in every deal', '270 tests'],
    tags: ['Laravel 12', 'PHP 8.3', 'Livewire', 'Filament', 'Tailwind CSS', 'Claude API', 'PostgreSQL'],
    demoUrl: 'https://beast-mode-motors.onrender.com',
    githubUrl: 'https://github.com/VRAJ8/BeastModeMotors',
    caseStudy: {
      challenge:
        'Private used-car sales run on trust nobody can check: service history lives in glove boxes, odometer rollbacks go unnoticed, and scams follow the money.',
      solution:
        'Each car gets a passport: decoded from its VIN via NHTSA, with recalls pulled and a maintenance plan created. Service records carry receipts that Claude reads into structured data, and shops confirm work through signed, expiring links without an account. A marketplace adds deal rooms with offers, inspection and handover checklists, a generated bill of sale and odometer disclosure, and a scam shield that flags common fraud patterns.',
      impact:
        "A complete private sale that ends with the passport moving to the buyer's garage, a Passport Score that rewards evidence over spending, a trust & safety console for staff, and 270 Pest tests run in CI on PHP 8.3, 8.4 and PostgreSQL.",
    },
  },
  {
    id: 'smokestream',
    title: 'SmokeStream',
    tagline: 'How fast can a wildfire smoke alert be, and what does speed cost?',
    description:
      'A streaming and batch pipeline over crowdsourced PurpleAir sensors that measures the latency–accuracy trade-off of real-time smoke alerts. Both pipelines share every line of transformation code, and results are scored against regulatory monitors they never see.',
    year: 2026,
    context: 'SJSU DATA 226 · with Brandon Moriguchi',
    accent: '#ff8a3d',
    image: '/images/smokestream.webp',
    highlights: ['Kafka → Spark Structured Streaming', 'Watermark simulator, exact to the window', 'Snowflake star schema · Airflow DAGs', 'Held-out test against EPA monitors'],
    tags: ['PySpark', 'Kafka', 'Airflow', 'Snowflake', 'MongoDB', 'H3', 'Python'],
    githubUrl: 'https://github.com/VRAJ8/smokestream',
    caseStudy: {
      challenge:
        'Public smoke maps are real-time systems, but the methods that make low-cost sensor data trustworthy were validated in hindsight. Nobody reports how much accuracy a live alert gives up for its speed.',
      solution:
        'Historical PurpleAir readings are replayed with realistic arrival delays and dropouts measured from a week of live recording, through Kafka into Spark Structured Streaming and through a hindsight batch job. Readings are corrected with the EPA equation, checked against their neighbours on H3 hexagons, and labelled wildfire or local using NASA fire detections, NOAA smoke plumes and wind, counting context only once it had been published.',
      impact:
        'A latency–accuracy frontier across windows, watermarks, QC history and context freshness for three fire seasons, plus a simulator of Spark’s watermark semantics that reproduces the engine window for window in seconds instead of hours. Building it exposed two pitfalls that silently invalidate naive streaming experiments.',
    },
  },
  {
    id: 'study-spots-sj',
    title: 'Study Spots SJ',
    tagline: 'The student guide to the best places to study around San José State',
    description:
      'A custom WordPress block theme and plugin run like a university website: structured content, role-based permissions, a review-before-publish workflow, content audits, and WCAG 2.2 AA accessibility checked with axe-core and Lighthouse.',
    year: 2026,
    accent: '#c46bff',
    image: '/images/study-spots.webp',
    highlights: ['0 axe-core violations', 'Lighthouse accessibility 100', 'Live demo runs in the browser'],
    tags: ['WordPress', 'PHP', 'Block themes', 'JavaScript', 'Leaflet', 'Accessibility'],
    demoUrl: 'https://vraj8.github.io/study-spots-sj/',
    githubUrl: 'https://github.com/VRAJ8/study-spots-sj',
  },
  {
    id: 'enterprise-management-system',
    title: 'Enterprise Management System',
    tagline: 'Collaboration platform with a generative AI assistant',
    description:
      'An enterprise platform for multi-user workflows with role-based access and cross-team collaboration. A generative AI assistant uses natural language to surface tasks, deadlines and to-dos for admins, staff and project managers.',
    year: 2026,
    context: 'Built at Hunexture',
    accent: '#38bdf8',
    tags: ['MongoDB', 'REST APIs', 'React', 'Generative AI'],
  },
  {
    id: 'decntlib',
    title: 'DecntLIB',
    tagline: 'A decentralized library on the blockchain',
    description:
      'Book lending and management on the blockchain: smart contracts enforce data validation and keep an immutable transaction history, and users borrow, return and track books with MetaMask.',
    year: 2025,
    accent: '#a78bfa',
    image: '/images/decentlib.webp',
    tags: ['Solidity', 'TypeScript', 'React', 'MetaMask'],
    githubUrl: 'https://github.com/Vedant-2211/DecntLib',
  },
  {
    id: 'orion',
    title: 'Orion',
    tagline: 'Dental appointment booking system',
    description:
      'A web-based booking system for dental clinics, with appointment management, dentist profiles, clinic timings and an admin panel, built on a data model designed for scheduling and tracking.',
    year: 2024,
    accent: '#60a5fa',
    image: '/images/orion.webp',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
];

export const writing: Writing[] = [
  {
    title: 'Never Wait for Completeness',
    subtitle: "What Google's Dataflow Model taught me about real-time smoke alerts",
    venue: 'Paper review · SJSU DATA 226',
    date: 'November 2026',
    readTime: '14 min read',
    url: 'https://vraj8.github.io/dataflow-model-blog/',
    codeUrl: 'https://github.com/VRAJ8/dataflow-model-blog',
  },
];
