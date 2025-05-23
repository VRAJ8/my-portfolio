import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: <Github size={20} /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin size={20} /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter size={20} /> },
  ];

  return (
    <footer className="py-8 relative">
      <div className="container mx-auto px-6">
        <div className="glass-panel dark:glass-panel rounded-card p-6 text-center border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass">
          <p className="text-text-secondary-light dark:text-text-secondary flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-accent" /> in {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;