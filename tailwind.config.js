/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F8FAFC',
          dark: '#000000'
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          lighter: 'rgba(255, 255, 255, 0.1)',
          darker: 'rgba(255, 255, 255, 0.03)',
          light: {
            DEFAULT: 'rgba(255, 255, 255, 0.8)',
            lighter: 'rgba(255, 255, 255, 0.9)',
            darker: 'rgba(255, 255, 255, 0.7)'
          }
        },
        accent: {
          DEFAULT: '#007AFF',
          light: '#3395FF',
          dark: '#0055CC'
        },
        text: {
          primary: {
            light: '#1E293B',
            dark: '#FFFFFF'
          },
          secondary: {
            light: '#475569',
            dark: '#8E8E8E'
          },
          tertiary: {
            light: '#64748B',
            dark: '#666666'
          }
        },
        success: {
          DEFAULT: '#34C759',
          light: '#4CD964',
          dark: '#2A9D46'
        },
        warning: {
          DEFAULT: '#FF9500',
          light: '#FFAA33',
          dark: '#CC7600'
        },
        error: {
          DEFAULT: '#FF3B30',
          light: '#FF6B5B',
          dark: '#CC2D25'
        }
      },
      borderRadius: {
        'card': '24px',
        'button': '16px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-light': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};