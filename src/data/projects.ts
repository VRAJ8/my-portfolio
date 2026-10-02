import { Project } from '../types';

// Leave demoUrl / githubUrl out when there is nothing public to link to — the card hides the button.
export const projects: Project[] = [
  {
    id: 1,
    title: "Code Guard AI",
    description: "An AI-powered security layer and autonomous code reviewer that finds vulnerabilities and improves code quality. Live as CodeVigil, it analyses code in real time to catch flaws like SQL injection and XSS before they reach production.",
    image: "/images/codeguard.webp",
    tags: ["Python", "FastAPI", "Gemini API", "Groq API", "React", "MongoDB", "Railway"],
    demoUrl: "https://codevigil.netlify.app",
    githubUrl: "https://github.com/VRAJ8/CodeGuardAI",
    featured: true,
    caseStudy: {
      challenge: "Reducing the manual overhead of peer reviews and ensuring security-first development by catching critical vulnerabilities early in the development lifecycle.",
      solution: "Developed an autonomous review system using LLMs to perform deep static analysis, integrated with a clean dashboard for developers to track and fix security risks.",
      impact: "Streamlined the code audit process, providing developers with instant, actionable feedback on security and performance optimizations."
    }
  },
  {
    id: 2,
    title: "DecntLIB",
    description: "A decentralized library system built on blockchain technology, enabling secure and transparent book lending and management. Users can borrow, return, and track books using MetaMask integration.",
    image: "/images/decentlib.webp",
    tags: ["TypeScript", "React", "Solidity", "MetaMask", "Blockchain"],
    githubUrl: "https://github.com/Vedant-2211/DecntLib",
    caseStudy: {
      challenge: "Creating a secure and user-friendly decentralized library system that leverages blockchain technology for transparent book management.",
      solution: "Implemented smart contracts for book management, integrated MetaMask for secure transactions, and built a responsive frontend with TypeScript and React.",
      impact: "Successfully demonstrated the potential of blockchain in library management, providing a secure and transparent way to track book lending and returns."
    }
  },
  {
    id: 3,
    title: "Orion",
    description: "A modern web-based dental appointment booking system that streamlines the process of scheduling dental visits. Features include appointment management, dentist profiles, clinic timings, and an admin panel for efficient clinic operations.",
    image: "/images/orion.webp",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    caseStudy: {
      challenge: "Creating an intuitive and efficient platform to enhance the appointment experience for both patients and clinic administrators while maintaining security and reliability.",
      solution: "Implemented a full-stack solution with React frontend, Node.js backend, and MongoDB database. Added features like real-time appointment booking, secure authentication, and responsive design for all devices.",
      impact: "Improved clinic workflow efficiency and patient satisfaction by providing a seamless digital solution for appointment management."
    }
  },
  {
    id: 4,
    title: "Beast Mode Motors",
    description: "A comprehensive vehicle inventory management system developed during my internship at Techomax Solutions. The platform streamlines car dealership operations with features like inventory management, image uploads, search functionality, and a booking inquiry system.",
    image: "/images/gwagon.webp",
    tags: ["PHP", "Laravel", "MySQL", "Blade", "HTML/CSS"],
    caseStudy: {
      challenge: "Creating an efficient inventory management system for a car dealership while learning and implementing Laravel framework under professional guidance.",
      solution: "Developed a full-stack solution using Laravel and MySQL, implementing features like vehicle management, image uploads, search functionality, and an admin dashboard. Created under mentorship at Techomax Solutions.",
      impact: "Successfully delivered a practical solution that improved the dealership's inventory management process while gaining valuable industry experience."
    }
  }
];
