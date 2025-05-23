import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeBackground: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark theme background */}
      <motion.div
        className="absolute inset-0 bg-[url('/src/assets/dark-bg.jpg')] bg-cover bg-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </motion.div>

      {/* Light theme background */}
      <motion.div
        className="absolute inset-0 bg-[url('/src/assets/light-bg.jpg')] bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDarkMode ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </motion.div>

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