import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Instagram } from 'lucide-react';

interface HeaderProps {
  scrollProgress: number;
}

const Header: React.FC<HeaderProps> = ({ scrollProgress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollProgress > 0.02);
  }, [scrollProgress]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/VRAJ8', icon: <Github size={20} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/vraj-patel-86338a25a/', icon: <Linkedin size={20} /> },
    { name: 'Instagram', href: 'https://www.instagram.com/vraj._.8/', icon: <Instagram size={20} /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-apple ${
        isScrolled 
          ? 'glass-panel dark:glass-panel py-3 backdrop-blur-md shadow-glass-light dark:shadow-glass' 
          : 'py-5 bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home" 
          className="text-xl font-bold tracking-tight flex items-center"
          aria-label="Home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-text-primary-light dark:text-white mr-0">V</span>
          <span className="text-accent">P.</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <motion.a 
                  href={item.href} 
                  className="text-text-primary-light dark:text-white hover:text-accent transition-colors duration-300 relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </motion.a>
              </li>
            ))}
          </ul>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary-light dark:text-white hover:text-accent transition-colors duration-300"
                aria-label={link.name}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-text-primary-light dark:text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden glass-panel dark:glass-panel mt-3 mx-4 rounded-card py-4 backdrop-blur-md shadow-glass-light dark:shadow-glass"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col px-6">
            <ul className="flex flex-col space-y-4 mb-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <motion.a 
                    href={item.href} 
                    className="text-text-primary-light dark:text-white text-lg hover:text-accent transition-colors duration-300 relative group"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="flex space-x-6 pt-4 border-t border-text-primary-light/10 dark:border-white/10">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary-light dark:text-white hover:text-accent transition-colors duration-300"
                  aria-label={link.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;