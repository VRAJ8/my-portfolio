import { useState } from 'react';
import { ArrowUpRight, Check, Copy, MapPin } from 'lucide-react';
import { siGithub, siInstagram } from 'simple-icons';
import ChapterTitle from '../components/ChapterTitle';
import ContactForm from '../components/ContactForm';
import BrandIcon from '../components/BrandIcon';
import Split from '../components/Split';
import { availability, socials } from '../data/socials';

// LinkedIn isn't in simple-icons (brand request), so it gets a drawn mark.
const LinkedInMark = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

/** Chapter 5: get in touch. The particles settle into a clean waveform. */
export default function Signal() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${socials.email}`;
    }
  };

  // Each link gets its brand colour so it reads at a glance.
  const links = [
    { name: 'LinkedIn', handle: 'Vraj Patel', href: socials.linkedin, badge: 'bg-[#0A66C2] text-white', Icon: () => <LinkedInMark size={20} /> },
    { name: 'GitHub', handle: socials.github.split('/').pop(), href: socials.github, badge: 'bg-ink text-[var(--bg)]', Icon: () => <BrandIcon icon={siGithub} size={20} /> },
    {
      name: 'Instagram',
      handle: `@${socials.instagram.replace(/\/$/, '').split('/').pop()}`,
      href: socials.instagram,
      badge: 'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white',
      Icon: () => <BrandIcon icon={siInstagram} size={20} />,
    },
  ];

  return (
    <section id="signal" className="relative px-5 pb-24 pt-32 sm:px-8 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <ChapterTitle index={5} label="Signal" className="max-w-3xl">
          Let's build
          <br />
          something that <span className="serif">ships.</span>
        </ChapterTitle>
        <Split as="p" className="lede mt-8 max-w-xl">
          {availability}, and to collaborations. Tell me what you're working on, or just say hi.
        </Split>

        <div className="mt-[28svh] grid gap-6 lg:grid-cols-12">
          <div className="panel flex flex-col justify-between gap-10 rounded-[32px] p-7 sm:p-10 lg:col-span-5">
            <div>
              <p className="kicker">Email</p>
              <a href={`mailto:${socials.email}`} className="mt-3 block break-all text-2xl font-semibold tracking-tight sm:text-3xl" data-cursor="Write">
                {socials.email}
              </a>
              <button onClick={copy} className="btn-ghost mt-5 h-10 px-4 text-sm" aria-live="polite">
                {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
            <div>
              <p className="kicker">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {links.map(({ name, handle, href, badge, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-[var(--line-strong)] p-2.5 pr-5 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--ink)_7%,transparent)]"
                    >
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${badge}`}>
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium leading-tight">{name}</span>
                        <span className="block truncate text-sm text-ink-2">{handle}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 text-ink-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-center gap-2 text-ink-2">
                <MapPin size={16} aria-hidden="true" /> {socials.location}
              </p>
            </div>
          </div>
          <div className="panel rounded-[32px] p-7 sm:p-10 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
