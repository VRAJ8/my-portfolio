import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', delay = 0, children }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
      {children}
    </motion.div>
  );
};

export default AnimatedText;