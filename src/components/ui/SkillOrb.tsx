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
  const brand = `#${hex}`;
  // Keep the glyph readable on clear glass: lift very dark brand colours in dark mode, deepen very light ones in light mode.
  const vars = {
    '--orb': lum < 0.02 ? '#8a8aa0' : brand,
    '--glyph-dark': lum < 0.04 ? '#ffffff' : lum < 0.15 ? `color-mix(in srgb, ${brand} 45%, white)` : brand,
    '--glyph-light': lum > 0.5 ? `color-mix(in srgb, ${brand} 55%, black)` : lum < 0.02 ? '#111114' : brand,
  } as React.CSSProperties;

  return (
    <motion.li
      className="flex w-[84px] flex-col items-center gap-3 md:w-24"
      custom={index}
      variants={{
        hidden: { opacity: 0, scale: 0.6, y: 20 },
        show: (i: number) => ({
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 260, damping: 20, delay: i * 0.03 },
        }),
      }}
    >
      <div className="relative" style={vars}>
        <span className="orb-glow" aria-hidden="true" />
        <div className="orb">
          {skill.icon ? (
            <svg viewBox="0 0 24 24" className="relative h-8 w-8 md:h-9 md:w-9" aria-hidden="true">
              <path d={skill.icon.path} />
            </svg>
          ) : (
            <span className="monogram relative text-lg font-bold tracking-tight md:text-xl" aria-hidden="true">
              {skill.monogram?.text}
            </span>
          )}
        </div>
      </div>
      <span className="text-center text-[13px] font-medium leading-tight text-label-secondary">{skill.name}</span>
    </motion.li>
  );
};

export default SkillOrb;
