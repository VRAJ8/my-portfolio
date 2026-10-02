import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Github, GraduationCap, Instagram, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import WindowBar from '../ui/WindowBar';
import avatar from '../../assets/avatar.webp';
import { socials } from '../../data/socials';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const socialLinks = [
  { name: 'GitHub', href: socials.github, Icon: Github },
  { name: 'LinkedIn', href: socials.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: socials.instagram, Icon: Instagram },
  { name: 'Email', href: `mailto:${socials.email}`, Icon: Mail },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

const Hero: React.FC = () => (
  <section id="home" className="relative flex min-h-screen items-center justify-center px-4 pb-28 pt-28 md:px-8">
    <div className="w-full max-w-5xl">
      <GlassPanel
        tilt={3}
        className="rounded-[36px] p-7 sm:p-10 md:rounded-window md:p-14"
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.1 }}
      >
        <div className="relative z-[2] grid items-center gap-10 md:grid-cols-[auto,1fr] md:gap-14">
          {/* Persona-style avatar */}
          <motion.div className="mx-auto md:mx-0" {...rise(0.35)}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-indigo-500/40 via-sky-400/25 to-orange-400/35 blur-2xl" />
              <div className="relative rounded-full p-2 fill-platter">
                <img
                  src={avatar}
                  alt="Illustrated portrait of Vraj"
                  width={224}
                  height={224}
                  className="h-40 w-40 rounded-full bg-gradient-to-br from-indigo-300/50 via-sky-200/40 to-orange-200/50 object-cover sm:h-48 sm:w-48 md:h-56 md:w-56"
                />
              </div>
            </div>
          </motion.div>

          <div className="text-center md:text-left">
            <motion.span className="eyebrow" {...rise(0.45)}>
              <Sparkles size={14} />
              Data · AI · Machine Learning
            </motion.span>

            <motion.h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" {...rise(0.55)}>
              Hello, I'm Vraj.
            </motion.h1>

            <motion.p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-label-secondary md:mx-0 md:text-xl" {...rise(0.65)}>
              I work where data meets intelligence — exploring datasets, building machine learning models and shipping
              AI-powered tools people can actually use.
            </motion.p>

            <motion.div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start" {...rise(0.72)}>
              <span className="tag inline-flex items-center gap-1.5 text-[13px]">
                <GraduationCap size={14} /> Computer Science Engineering
              </span>
              <span className="tag inline-flex items-center gap-1.5 text-[13px]">
                <MapPin size={14} /> San Jose, California
              </span>
            </motion.div>

            <motion.div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start" {...rise(0.8)}>
              <a href="#projects" className="btn-primary group">
                View my work
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a href="#contact" className="btn-glass">
                Get in touch
              </a>
            </motion.div>
          </div>
        </div>
      </GlassPanel>

      {/* Bottom ornament, overlapping the window edge like visionOS toolbars */}
      <motion.div
        className="relative z-10 -mt-7 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.9 }}
      >
        <div className="glass flex gap-1 rounded-full p-1.5">
          {socialLinks.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="icon-btn"
              aria-label={name}
              title={name}
            >
              <Icon size={19} />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
        <WindowBar />
      </motion.div>
    </div>

    <motion.a
      href="#about"
      className="absolute inset-x-0 bottom-8 mx-auto hidden w-fit text-label-tertiary transition-colors hover:text-label md:block"
      aria-label="Scroll to About"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ChevronDown size={24} />
    </motion.a>
  </section>
);

export default Hero;
