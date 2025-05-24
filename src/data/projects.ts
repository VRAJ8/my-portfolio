import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "DecntLIB",
    description: "A decentralized library system built on blockchain technology, enabling secure and transparent book lending and management. Users can borrow, return, and track books using MetaMask integration.",
    image: "/images/decentlib.jpg",
    tags: ["TypeScript", "React", "Solidity", "MetaMask", "Blockchain"],
    demoUrl: "#",
    githubUrl: "#",
    caseStudy: {
      challenge: "Creating a secure and user-friendly decentralized library system that leverages blockchain technology for transparent book management.",
      solution: "Implemented smart contracts for book management, integrated MetaMask for secure transactions, and built a responsive frontend with TypeScript and React.",
      impact: "Successfully demonstrated the potential of blockchain in library management, providing a secure and transparent way to track book lending and returns."
    }
  },
  {
    id: 2,
    title: "Orion",
    description: "A modern web-based dental appointment booking system that streamlines the process of scheduling dental visits. Features include appointment management, dentist profiles, clinic timings, and an admin panel for efficient clinic operations.",
    image: "/images/orion.jpg",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    caseStudy: {
      challenge: "Creating an intuitive and efficient platform to enhance the appointment experience for both patients and clinic administrators while maintaining security and reliability.",
      solution: "Implemented a full-stack solution with React frontend, Node.js backend, and MongoDB database. Added features like real-time appointment booking, secure authentication, and responsive design for all devices.",
      impact: "Improved clinic workflow efficiency and patient satisfaction by providing a seamless digital solution for appointment management."
    }
  },
  {
    id: 3,
    title: "Beast Mode Motors",
    description: "A comprehensive vehicle inventory management system developed during my internship at Techomax Solutions. The platform streamlines car dealership operations with features like inventory management, image uploads, search functionality, and a booking inquiry system.",
    image: "/images/gwagon.jpg",
    tags: ["PHP", "Laravel", "MySQL", "Blade", "HTML/CSS"],
    demoUrl: "#",
    githubUrl: "#",
    caseStudy: {
      challenge: "Creating an efficient inventory management system for a car dealership while learning and implementing Laravel framework under professional guidance.",
      solution: "Developed a full-stack solution using Laravel and MySQL, implementing features like vehicle management, image uploads, search functionality, and an admin dashboard. Created under mentorship at Techomax Solutions.",
      impact: "Successfully delivered a practical solution that improved the dealership's inventory management process while gaining valuable industry experience."
    }
  },
  {
    id: 4,
    title: "Virtual Workspace",
    description: "A collaborative virtual workspace designed for remote teams to interact in a spatial environment.",
    image: "https://images.pexels.com/photos/7680208/pexels-photo-7680208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Socket.io", "WebRTC", "Supabase"],
    demoUrl: "#",
    githubUrl: "#"
  }
];