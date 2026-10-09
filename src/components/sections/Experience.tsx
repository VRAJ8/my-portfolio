import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import SectionHeading from '../ui/SectionHeading';
import WindowBar from '../ui/WindowBar';
import { certifications, education, publication, roles } from '../../data/experience';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-3 px-1 text-[13px] font-semibold uppercase tracking-wider text-label-tertiary">{children}</h3>
);

const Experience: React.FC = () => (
  <section id="experience" className="px-4 py-20 md:px-8 md:py-28">
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="Three internships shipping full-stack products, now studying data at San Jose State."
        icon={<Briefcase size={14} />}
      />

      <GlassPanel
        className="rounded-[36px] p-6 sm:p-10 md:rounded-window md:p-12"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease }}
      >
        {/* Timeline of roles */}
        <ol className="relative z-[2] space-y-8">
          {roles.map((role, i) => (
            <motion.li
              key={role.company}
              className="relative flex gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              {i < roles.length - 1 && (
                <span className="absolute left-[21px] top-12 -bottom-8 w-px bg-hairline" aria-hidden="true" />
              )}
              <span
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-sm ${role.tint}`}
                aria-hidden="true"
              >
                {role.company[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h4 className="text-lg font-semibold text-label">{role.title}</h4>
                  <span className="tag self-start whitespace-nowrap">{role.period}</span>
                </div>
                <p className="text-label-secondary">{role.company}</p>
                <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-label-secondary">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-label-tertiary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {role.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="relative z-[2] mt-10 grid gap-8 border-t border-hairline pt-8 md:grid-cols-2">
          {/* Education */}
          <div>
            <Label>Education</Label>
            <ul className="overflow-hidden rounded-3xl fill-platter">
              {education.map((item) => (
                <li key={item.school} className="flex items-start gap-4 border-b border-hairline p-4 last:border-b-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-sm">
                    <GraduationCap size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="font-semibold text-label">{item.school}</span>
                      <span className="text-[13px] text-label-tertiary">{item.period}</span>
                    </span>
                    <span className="block text-[15px] text-label">{item.degree}</span>
                    <span className="mt-1 block text-sm text-label-secondary">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Publication and certifications */}
          <div className="space-y-6">
            <div>
              <Label>Publication</Label>
              <div className="flex items-start gap-4 rounded-3xl p-4 fill-platter">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-pink-400 to-rose-600 text-white shadow-sm">
                  <BookOpen size={18} />
                </span>
                <span>
                  <span className="block font-semibold leading-snug text-label">{publication.title}</span>
                  <span className="mt-1 block text-sm text-label-secondary">{publication.venue}</span>
                </span>
              </div>
            </div>
            <div>
              <Label>Certifications</Label>
              <ul className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <li key={cert} className="tag inline-flex items-center gap-1.5 text-[13px]">
                    <Award size={13} />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </GlassPanel>
      <WindowBar />
    </div>
  </section>
);

export default Experience;
