/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        bg: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
        },
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        warm: 'var(--warm)',
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono Variable"', '"Geist Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
