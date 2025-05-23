import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';

interface SkillPillProps {
  skill: Skill;
  index: number;
}

const SkillPill: React.FC<SkillPillProps> = ({ skill, index }) => {
  return (
    <motion.div
      className="glass-panel dark:glass-panel rounded-full px-4 py-2 flex items-center gap-2 border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src={skill.icon} 
        alt={skill.name} 
        className="w-6 h-6 object-contain filter dark:brightness-110 group-hover:scale-110 transition-transform duration-300"
      />
      <span className="text-sm font-medium text-text-primary-light dark:text-white group-hover:text-accent transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default SkillPill;