import { Project } from '../types';

// Leave demoUrl / githubUrl out when there is nothing public to link to — the card hides the button.
export const projects: Project[] = [
  {
    id: 1,
    title: 'Player Scout',
    tagline: 'Finds the footballers who play like any player you name',
    description:
      "Give it a player and it finds the players who play like him — 1,865 players across Europe's top five leagues, compared on their last 15 matches using every pass, tackle, take-on and shot, with their pitch coordinates. Not who has similar goals and assists, but who does the same job on the pitch.",
    year: 2026,
    tier: 'hero',
    image: '/images/player-scout.webp',
    video: {
      webm: '/videos/player-scout.webm',
      mp4: '/videos/player-scout.mp4',
      poster: '/videos/player-scout-poster.webp',
    },
    highlights: ['1,865 players · 5 leagues', '36 features in 9 trait groups', 'Search runs in the browser', '105 tests in CI'],
    tags: ['Python', 'pandas', 'scikit-learn', 'PyTorch', 'Dagster', 'DuckDB', 'FastAPI', 'React', 'TypeScript', 'D3'],
    demoUrl: 'https://playslike.vercel.app',
    caseStudy: {
      challenge:
        "When a starter leaves, a recruitment team needs to know who else does the same job — who touches the ball in the same places, passes, carries and defends the same way. Stat tables of goals and assists can't answer that.",
      solution:
        'Ingests Opta event streams from WhoScored and per-shot xG from Understat, joins the two sources (which share no ids) by squad overlap and match date, and builds per-90 features over each player\'s last 15 matches, with small samples shrunk toward the role using strengths estimated from split-half reliability. Players are compared within their role by cosine similarity on centred percentiles. A Dagster pipeline with quality gates refreshes the data, and the index is exported as static data and searched in the browser by a TypeScript port checked against Python on every answer.',
      impact:
        'A public site with a style map of every player, player pages with radars and touch heatmaps, and side-by-side comparisons. A season-to-season test shows style travels: players who changed club still pick out their old selves 33 times more often than chance.',
    },
  },
  {
    id: 2,
    title: 'CodeGuard AI',
    tagline: 'A DevSecOps scanner that grades your repo A–F',
    description:
      'Runs static analysis, secret detection, dependency CVE checks and code-health analysis in one pass, maps every finding to CWE and the OWASP Top 10, and uses an LLM to write the patches.',
    year: 2026,
    tier: 'major',
    image: '/images/codeguard.webp',
    highlights: ['Runs as a GitHub Action', 'SARIF, SBOM & PDF reports'],
    tags: ['Python', 'FastAPI', 'Semgrep', 'Bandit', 'Llama 3.3 (Groq)', 'React', 'MongoDB'],
    demoUrl: 'https://codevigil.netlify.app',
    githubUrl: 'https://github.com/VRAJ8/CodeGuardAI',
    caseStudy: {
      challenge:
        'Security checks are usually spread across separate tools with noisy, duplicated output, so teams skip them or miss what matters.',
      solution:
        'One engine combines Bandit and Semgrep taint rules, a secrets scanner with entropy checks, OSV.dev dependency lookups with CVSS scores computed from the vector, and Radon code-health metrics. Findings are deduplicated across engines, tagged with CWE and OWASP Top 10, and triaged by Llama 3.3 70B on Groq, which writes copy-paste patches.',
      impact:
        'Exports SARIF for GitHub Code Scanning, a CycloneDX SBOM and a PDF audit, tracks new and fixed findings between scans, and gates CI as a GitHub Action — the repo scans itself on every push.',
    },
  },
  {
    id: 3,
    title: 'Beast Mode Motors',
    tagline: 'A verified, transferable history for every car',
    description:
      'A car passport and a safer way to sell privately: owners log work with evidence, the shop that did it confirms it in one click, and when the car is sold the whole history moves to the new owner.',
    year: 2026,
    tier: 'major',
    image: '/images/beastmode.webp',
    video: {
      webm: '/videos/beast-mode-motors.webm',
      mp4: '/videos/beast-mode-motors.mp4',
      poster: '/videos/beast-mode-motors-poster.webp',
    },
    highlights: ['270 tests', 'Claude reads receipts'],
    tags: ['Laravel 12', 'PHP 8.3', 'Livewire', 'Filament', 'Tailwind CSS', 'Claude API', 'PostgreSQL'],
    demoUrl: 'https://beast-mode-motors.onrender.com',
    githubUrl: 'https://github.com/VRAJ8/BeastModeMotors',
    caseStudy: {
      challenge:
        "Private used-car sales run on trust nobody can check: service history lives in glove boxes, odometer rollbacks go unnoticed, and scams follow the money.",
      solution:
        'Each car gets a passport: decoded from its VIN via NHTSA, with recalls pulled and a maintenance plan created. Service records carry receipts that Claude reads into structured data, and shops confirm work through signed, expiring links without an account. A marketplace adds deal rooms with offers, inspection and handover checklists, a generated bill of sale and odometer disclosure, and a scam shield that flags common fraud patterns.',
      impact:
        "A complete private sale that ends with the passport moving to the buyer's garage, a Passport Score that rewards evidence over spending, a trust & safety console for staff, and 270 Pest tests run in CI on PHP 8.3, 8.4 and PostgreSQL.",
    },
  },
  {
    id: 4,
    title: 'Enterprise Management System',
    tagline: 'Collaboration platform with a generative AI assistant',
    description:
      'An enterprise platform for multi-user workflows with role-based access and cross-team collaboration. A generative AI assistant uses natural language to surface tasks, deadlines and to-dos for admins, staff and project managers.',
    year: 2026,
    tier: 'minor',
    tags: ['MongoDB', 'REST APIs', 'React', 'Generative AI'],
  },
  {
    id: 5,
    title: 'DecntLIB',
    tagline: 'A decentralized library on the blockchain',
    description:
      'Book lending and management on the blockchain: smart contracts enforce data validation and keep an immutable transaction history, and users borrow, return and track books with MetaMask.',
    year: 2025,
    tier: 'minor',
    image: '/images/decentlib.webp',
    tags: ['Solidity', 'TypeScript', 'React', 'MetaMask'],
    githubUrl: 'https://github.com/Vedant-2211/DecntLib',
  },
  {
    id: 6,
    title: 'Orion',
    tagline: 'Dental appointment booking system',
    description:
      'A web-based booking system for dental clinics, with appointment management, dentist profiles, clinic timings and an admin panel, built on a data model designed for scheduling and tracking.',
    year: 2024,
    tier: 'minor',
    image: '/images/orion.webp',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
];
