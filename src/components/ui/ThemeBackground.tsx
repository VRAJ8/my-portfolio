import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Import images
import darkBg from '../../assets/dark-bg.jpg';
import lightBg from '../../assets/light-bg.jpg';

const ThemeBackground: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark mode background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f172a 100%)'
        }}
      />

      {/* Light mode background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
        }}
      />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-accent/5 to-transparent dark:from-white/5 dark:via-accent/5" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent/10 animate-pulse-slow" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Additional light mode effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent dark:hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 dark:hidden" />
    </div>
  );
};

export default ThemeBackground; 