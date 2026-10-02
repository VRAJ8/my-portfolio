import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

interface SkillOrbProps {
  skill: Skill;
  index: number;
}

const SkillOrb: React.FC<SkillOrbProps> = ({ skill, index }) => {
  const hex = skill.icon?.hex ?? skill.monogram?.hex ?? '888888';
  const lum = luminance(hex);
  // Near-black brand colours become graphite so the orb still reads against a dark environment.
  const orb = lum < 0.02 ? '#3a3a44' : `#${hex}`;
  const glyph = lum > 0.45 ? '#0b0b0f' : '#ffffff';

  return (
    <motion.li
      className="flex w-[88px] flex-col items-center gap-3 md:w-24"
      custom={index}
      variants={{
        hidden: { opacity: 0, scale: 0.6, y: 20 },
        show: (i: number) => ({
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 260, damping: 22, delay: i * 0.04 },
        }),
      }}
    >
      <motion.div
        className="orb"
        style={{ '--orb': orb } as React.CSSProperties}
        whileHover={{ scale: 1.12, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {skill.icon ? (
          <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" fill={glyph} aria-hidden="true">
            <path d={skill.icon.path} />
          </svg>
        ) : (
          <span className="text-lg font-bold tracking-tight md:text-xl" style={{ color: glyph }} aria-hidden="true">
            {skill.monogram?.text}
          </span>
        )}
      </motion.div>
      <span className="text-center text-[13px] font-medium leading-tight text-label-secondary">{skill.name}</span>
    </motion.li>
  );
};

export default SkillOrb;
