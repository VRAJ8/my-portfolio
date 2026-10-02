import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import ContactForm from '../ui/ContactForm';
import GlassPanel from '../ui/GlassPanel';
import SectionHeading from '../ui/SectionHeading';
import WindowBar from '../ui/WindowBar';
import { socials } from '../../data/socials';

const contactRows = [
  { title: 'Email', value: socials.email, href: `mailto:${socials.email}`, Icon: Mail, tint: 'from-sky-400 to-blue-600' },
  { title: 'LinkedIn', value: 'vraj-patel', href: socials.linkedin, Icon: Linkedin, tint: 'from-blue-500 to-indigo-700' },
  { title: 'GitHub', value: 'VRAJ8', href: socials.github, Icon: Github, tint: 'from-zinc-500 to-zinc-800' },
  {
    title: 'Location',
    value: socials.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(socials.location)}`,
    Icon: MapPin,
    tint: 'from-rose-400 to-red-600',
  },
];

const Contact: React.FC = () => (
  <section id="contact" className="px-4 pb-16 pt-20 md:px-8 md:pt-28">
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something smart"
        subtitle="Open to conversations about data, AI and machine learning — or anything you think I'd enjoy working on."
        icon={<Send size={14} />}
      />

      <GlassPanel
        className="rounded-[36px] p-5 sm:p-8 md:rounded-window md:p-10"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative z-[2] grid gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <h3 className="mb-3 px-1 text-[13px] font-semibold uppercase tracking-wider text-label-tertiary">Reach me</h3>
            <ul className="overflow-hidden rounded-3xl fill-platter">
              {contactRows.map(({ title, value, href, Icon, tint }, i) => {
                const external = href.startsWith('http');
                return (
                  <motion.li
                    key={title}
                    className="border-b border-hairline last:border-b-0"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 p-4 transition-colors duration-300 hover:bg-[var(--fill-hover)] focus-visible:bg-[var(--fill-hover)] focus-visible:outline-none"
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br text-white shadow-sm ${tint}`}>
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-label-secondary">{title}</span>
                        <span className="block truncate font-medium text-label">{value}</span>
                      </span>
                      <ChevronRight size={18} className="shrink-0 text-label-tertiary transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <ContactForm />
        </div>
      </GlassPanel>
      <WindowBar />
    </div>
  </section>
);

export default Contact;
