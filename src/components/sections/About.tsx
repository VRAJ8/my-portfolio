import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Brain, Briefcase, Server, Sparkles, User } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import SectionHeading from '../ui/SectionHeading';
import WindowBar from '../ui/WindowBar';

const focusAreas = [
  {
    title: 'Data analysis',
    detail: 'Cleaning, exploring and visualising data to find the story in it.',
    Icon: BarChart3,
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
    detail: 'Putting models like Gemini to work inside real products.',
    Icon: Sparkles,
    tint: 'from-pink-400 to-orange-500',
  },
  {
    title: 'APIs & deployment',
    detail: 'Wrapping models in FastAPI services and shipping them.',
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
              👋 Hi, I'm Vraj — a Computer Science engineer who's happiest when a messy dataset starts to make sense.
            </p>
            <p>
              I started out building full-stack web apps, and these days my focus is data, AI and machine learning:
              analysing data, training models, and turning them into tools — like Code Guard AI, an LLM-powered code
              reviewer that flags security issues before they ship.
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
            <ul className="overflow-hidden rounded-3xl glass-well">
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

        {/* Experience */}
        <div className="relative z-[2] mt-10 border-t border-hairline pt-8">
          <h3 className="mb-4 px-1 text-[13px] font-semibold uppercase tracking-wider text-label-tertiary">Experience</h3>
          <div className="flex flex-col gap-4 rounded-3xl p-5 glass-well sm:flex-row sm:items-start">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-sm">
              <Briefcase size={20} />
            </span>
            <div className="flex-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h4 className="text-lg font-semibold text-label">Software Development Intern</h4>
                <span className="tag self-start">2024</span>
              </div>
              <p className="text-label-secondary">Techomax Solutions, Bharuch</p>
              <p className="mt-3 leading-relaxed text-label-secondary">
                Applied PHP and Laravel to real-world projects: built a luxury car rental platform with vehicle listings,
                booking management and authentication, and worked with the team on company tasks — hands-on experience
                with MVC architecture, full-stack development and agile workflows.
              </p>
            </div>
          </div>
        </div>
      </GlassPanel>
      <WindowBar />
    </div>
  </section>
);

export default About;
