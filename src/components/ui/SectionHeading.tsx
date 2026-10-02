import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, subtitle, icon }) => (
  <motion.div
    className="mb-12 text-center md:mb-16"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    <span className="eyebrow">
      {icon}
      {eyebrow}
    </span>
    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{title}</h2>
    {subtitle && <p className="mx-auto mt-4 max-w-xl text-lg text-label-secondary">{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
