import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shapes } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import SkillOrb from '../ui/SkillOrb';
import { skillCategories, skills } from '../../data/skills';
import { SkillCategory } from '../../types';

const Skills: React.FC = () => {
  const [category, setCategory] = useState<SkillCategory>('ai');
  const visible = skills.filter((s) => s.category === category);

  return (
    <section id="skills" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="My toolkit"
          subtitle="The languages, frameworks, libraries and platforms I work with."
          icon={<Shapes size={14} />}
        />

        {/* Segmented control; scrolls sideways on narrow screens */}
        <div className="no-scrollbar -mx-4 mb-12 overflow-x-auto px-4 py-3">
          <div className="lg lg-clear mx-auto flex w-max gap-1 rounded-full p-1.5" role="tablist" aria-label="Skill categories">
            {skillCategories.map(({ id, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={category === id}
                onClick={() => setCategory(id)}
                className={`relative h-10 whitespace-nowrap rounded-full px-3.5 text-[13px] font-semibold transition-colors sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-5 ${
                  category === id ? 'text-label' : 'text-label-secondary hover:text-label'
                }`}
              >
                {category === id && (
                  <motion.span
                    layoutId="skill-tab"
                    className="lg-drop absolute inset-0 rounded-full"
                    initial={{ scaleX: 1.25, scaleY: 0.86 }}
                    animate={{ scaleX: 1, scaleY: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 26,
                      mass: 0.9,
                      scaleX: { type: 'spring', stiffness: 320, damping: 11 },
                      scaleY: { type: 'spring', stiffness: 320, damping: 11 },
                    }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Home View–style icon field */}
        <motion.ul
          key={category}
          className="mx-auto flex min-h-[380px] max-w-4xl flex-wrap content-start items-start justify-center gap-x-3 gap-y-8 md:gap-x-6"
          role="tabpanel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {visible.map((skill, i) => (
            <SkillOrb key={skill.name} skill={skill} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Skills;
