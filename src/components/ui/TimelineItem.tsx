import React from 'react';
import { motion } from 'framer-motion';
import { TimelineItem as TimelineItemType } from '../../types';

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-8 md:mb-0`}>
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0" />
      
      {/* Dot */}
      <motion.div 
        className="absolute left-1/2 top-0 w-4 h-4 rounded-full bg-accent -translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 15,
          delay: 0.2 + (index * 0.1)
        }}
      />
      
      {/* Timeline content */}
      <motion.div 
        className={`w-5/12 glass-panel rounded-card p-6 shadow-lg ${isEven ? 'mr-auto text-right' : 'ml-auto text-left'}`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5,
          delay: 0.3 + (index * 0.1)
        }}
      >
        <h3 className="font-bold text-xl">{item.title}</h3>
        <h4 className="font-medium text-text-secondary mb-2">{item.organization}</h4>
        <p className="text-sm text-accent mb-4">{item.period}</p>
        <p className="text-text-secondary mb-4">{item.description}</p>
        
        {item.technologies && (
          <div className="flex flex-wrap gap-2 justify-end">
            {item.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="text-xs px-2 py-1 bg-glass-darker rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TimelineItem;