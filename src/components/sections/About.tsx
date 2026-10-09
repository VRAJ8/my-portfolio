import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Server, Sparkles, User } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import SectionHeading from '../ui/SectionHeading';
import WindowBar from '../ui/WindowBar';

const focusAreas = [
  {
    title: 'Data engineering',
    detail: 'Pipelines, data modeling and warehousing that keep analysis honest.',
    Icon: Database,
    tint: 'from-sky-400 to-blue-600',
  },
  {
    title: 'Machine learning',
    detail: 'Building and evaluating models that make useful predictions.',
    Icon: Brain,
    tint: 'from-violet-400 to-purple-600',
  },
  {
    title: 'Applied AI & LLMs',
    detail: 'Putting LLMs to work inside real products, from code review to reading receipts.',
    Icon: Sparkles,
    tint: 'from-pink-400 to-orange-500',
  },
  {
    title: 'APIs & deployment',
    detail: 'Wrapping models and data in REST APIs and shipping them.',
    Icon: Server,
    tint: 'from-emerald-400 to-teal-600',
  },
];

const About: React.FC = () => (
  <section id="about" className="px-4 py-20 md:px-8 md:py-28">
    <div className="mx-auto max-w-5xl">
      <SectionHeading eyebrow="About" title="Who I am" icon={<User size={14} />} />

      <GlassPanel
        className="rounded-[36px] p-7 sm:p-10 md:rounded-window md:p-12"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative z-[2] grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="space-y-5 text-[17px] leading-relaxed text-label-secondary md:col-span-3">
            <p className="text-2xl font-semibold leading-snug tracking-tight text-label">
              👋 Hi, I'm Vraj — an MS student in Applied Data Intelligence at San Jose State, happiest when a messy
              dataset starts to make sense.
            </p>
            <p>
              I studied Computer Science and Engineering at CHARUSAT and spent three internships shipping full-stack
              products. Now my focus is data and machine learning: pipelines, models and the products around them — like
              Player Scout, which finds footballers who play alike from raw match event data.
            </p>
            <p>
              I like work that mixes logic with creativity, and I care about building things that are both useful and
              well made.
            </p>
            <p>
              When I'm not at my desk you'll probably find me following basketball, cricket or football — sports that
              fuel my competitive spirit and how I work in a team.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-3 px-1 text-[13px] font-semibold uppercase tracking-wider text-label-tertiary">What I focus on</h3>
            <ul className="overflow-hidden rounded-3xl fill-platter">
              {focusAreas.map(({ title, detail, Icon, tint }, i) => (
                <motion.li
                  key={title}
                  className="flex items-start gap-4 border-b border-hairline p-4 last:border-b-0"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br text-white shadow-sm ${tint}`}>
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block font-semibold text-label">{title}</span>
                    <span className="block text-sm text-label-secondary">{detail}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

      </GlassPanel>
      <WindowBar />
    </div>
  </section>
);

export default About;
