import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  progress: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ progress }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the indicator once the user has scrolled a bit
    if (progress > 0.05) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [progress]);

  // Progress bar animation
  const progressAnimation = {
    width: `${progress * 100}%`
  };

  return (
    <>
      {/* Scroll down indicator */}
      {isVisible && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <span className="text-text-secondary text-sm mb-2">Scroll to explore</span>
          <motion.div 
            className="glass-panel p-2 rounded-full"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-accent" />
          </motion.div>
        </motion.div>
      )}

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-glass z-40">
        <motion.div 
          className="h-full bg-accent"
          style={progressAnimation}
          transition={{ duration: 0.1 }}
        />
      </div>
    </>
  );
};

export default ScrollIndicator;