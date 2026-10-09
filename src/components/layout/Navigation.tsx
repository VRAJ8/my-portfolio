import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Home, LayoutGrid, Mail, Moon, Shapes, Sun, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useActiveSection } from '../../hooks/useActiveSection';
import avatar from '../../assets/avatar.webp';

const sections = [
  { id: 'home', label: 'Home', short: 'Home', Icon: Home },
  { id: 'about', label: 'About', short: 'About', Icon: User },
  { id: 'experience', label: 'Experience', short: 'Work', Icon: Briefcase },
  { id: 'skills', label: 'Skills', short: 'Skills', Icon: Shapes },
  { id: 'projects', label: 'Projects', short: 'Projects', Icon: LayoutGrid },
  { id: 'contact', label: 'Contact', short: 'Contact', Icon: Mail },
] as const;

const sectionIds = sections.map((s) => s.id);

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const label = `Switch to ${isDarkMode ? 'light' : 'dark'} mode`;

  return (
    <button onClick={toggleTheme} className="icon-btn glass" aria-label={label} title={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDarkMode ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const Navigation: React.FC = () => {
  const active = useActiveSection(sectionIds);

  return (
    <>
      {/* Top bar */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 md:px-6 md:pt-5"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <a
          href="#home"
          className="glass pointer-events-auto flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[15px] font-semibold tracking-tight"
          aria-label="VrajPatel, back to top"
        >
          <img src={avatar} alt="" className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400/40 to-orange-300/40" />
          VrajPatel
        </a>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Desktop: vertical tab bar ornament; hover to reveal labels, as in visionOS */}
      <motion.nav
        aria-label="Sections"
        className="pointer-events-none fixed inset-y-0 left-5 z-50 hidden items-center lg:flex"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <ul className="glass group pointer-events-auto flex flex-col gap-1 rounded-[30px] p-2">
          {sections.map(({ id, label, Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative flex h-11 items-center rounded-[22px] px-3 transition-colors duration-300 hover:bg-[var(--fill-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active === id ? 'text-label' : 'text-label-secondary'
                }`}
                aria-current={active === id ? 'true' : undefined}
              >
                {active === id && (
                  <motion.span
                    layoutId="tab-desktop"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--selected)', boxShadow: 'var(--selected-shadow)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <Icon size={20} className="relative shrink-0" />
                <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-medium opacity-0 transition-all duration-500 ease-apple group-hover:ml-3 group-hover:max-w-[96px] group-hover:opacity-100 group-focus-within:ml-3 group-focus-within:max-w-[96px] group-focus-within:opacity-100">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Mobile: floating bottom tab bar */}
      <motion.nav
        aria-label="Sections"
        className="fixed inset-x-0 z-50 flex justify-center px-4 lg:hidden"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 14px)' }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <ul className="glass flex gap-1 rounded-full p-1.5">
          {sections.map(({ id, short, Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative flex h-12 w-[52px] flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-16 ${
                  active === id ? 'text-label' : 'text-label-secondary'
                }`}
                aria-current={active === id ? 'true' : undefined}
              >
                {active === id && (
                  <motion.span
                    layoutId="tab-mobile"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--selected)', boxShadow: 'var(--selected-shadow)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <Icon size={19} className="relative" />
                <span className="relative">{short}</span>
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default Navigation;
