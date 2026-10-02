import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUp, Github, Instagram, Linkedin, Mail, Send } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import WindowBar from '../ui/WindowBar';
import { projects } from '../../data/projects';
import { skills } from '../../data/skills';
import { socials } from '../../data/socials';

const TIME_ZONE = 'America/Los_Angeles';

/** What Vraj is probably up to at a given hour in San Jose. */
const statusFor = (hour: number) => {
  if (hour < 6) return 'dreaming in tensors';
  if (hour < 9) return 'brewing coffee, reading papers';
  if (hour < 12) return 'deep in a notebook';
  if (hour < 14) return 'on a lunch break';
  if (hour < 18) return 'training models';
  if (hour < 21) return 'watching cricket or basketball';
  return 'late-night debugging';
};

const useSanJoseTime = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    // Minute precision is all the display needs, so wake up rarely.
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' }).format(now);
  const hour = Number(new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', hourCycle: 'h23' }).format(now));
  return { time, status: statusFor(hour) };
};

// Each log line "types" itself out (a left-to-right reveal), one after another.
const line: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  shown: (i: number) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { delay: 0.25 + i * 0.5, duration: 0.45, ease: 'linear' },
  }),
};

const bar: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { delay: 1.8, duration: 1.1, ease: [0.65, 0, 0.35, 1] } },
};

const socialLinks = [
  { name: 'GitHub', href: socials.github, Icon: Github },
  { name: 'LinkedIn', href: socials.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: socials.instagram, Icon: Instagram },
  { name: 'Email', href: `mailto:${socials.email}`, Icon: Mail },
];

const Footer: React.FC = () => {
  const { time, status } = useSanJoseTime();

  return (
    <footer className="overflow-hidden px-4 pb-28 pt-10 md:px-8 lg:pb-10">
      <div className="mx-auto max-w-5xl">
        <GlassPanel
          className="rounded-[32px] p-6 sm:p-8 md:rounded-[40px] md:p-10"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative z-[2] grid gap-10 md:grid-cols-[1.35fr,1fr] md:gap-12">
            {/* The page ends like a training run */}
            <div className="min-w-0">
              <span className="tag font-mono">train.log</span>
              <motion.ol
                className="mt-5 space-y-2.5 font-mono text-[13px] leading-relaxed text-label-secondary sm:text-sm"
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.6 }}
                aria-label="Training log"
              >
                <motion.li variants={line} custom={0} className="w-fit">
                  <span className="text-accent">$</span> python portfolio.py --visitor you
                </motion.li>
                <motion.li variants={line} custom={1} className="w-fit">
                  <span className="text-emerald-400">✓</span> loaded {projects.length} projects · {skills.length} tools
                </motion.li>
                <motion.li variants={line} custom={2} className="w-fit">
                  <span className="text-emerald-400">✓</span> trained on curiosity, cricket and late nights
                </motion.li>
                <motion.li variants={line} custom={3} className="flex w-full max-w-sm items-center gap-3">
                  <span className="shrink-0">Epoch 5/5</span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full glass-track" aria-hidden="true">
                    <motion.span
                      variants={bar}
                      className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent to-emerald-400"
                    />
                  </span>
                  <span className="shrink-0 text-label">100%</span>
                </motion.li>
                <motion.li variants={line} custom={4} className="w-fit text-label">
                  <span className="text-accent">→</span> prediction: <span className="font-semibold">we should talk</span>{' '}
                  <span className="text-label-tertiary">(confidence 0.98)</span>
                  <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-label/70" aria-hidden="true" />
                </motion.li>
              </motion.ol>
            </div>

            {/* A live, human touch: what time it is where Vraj is */}
            <div className="flex flex-col justify-between gap-8 md:border-l md:border-hairline md:pl-10">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-wider text-label-tertiary">Local time</p>
                <p className="mt-2 text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">{time}</p>
                <p className="mt-2 text-label-secondary">{socials.location}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-label-secondary">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Probably {status}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a href="#contact" className="btn-primary">
                  <Send size={16} />
                  Say hello
                </a>
                <a href="#home" className="btn-glass" aria-label="Back to top">
                  <ArrowUp size={16} />
                  Top
                </a>
              </div>
            </div>
          </div>
        </GlassPanel>
        <WindowBar />

        {/* Statement wordmark, fading into the environment */}
        <motion.p
          className="wordmark pointer-events-none mt-10 select-none text-center font-bold tracking-tighter"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          VrajPatel
        </motion.p>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-label-tertiary sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Vraj Patel · Built with React, Tailwind &amp; curiosity
          </p>
          <ul className="flex gap-1">
            {socialLinks.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="icon-btn h-9 w-9 text-label-secondary hover:text-label"
                  aria-label={name}
                  title={name}
                >
                  <Icon size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
