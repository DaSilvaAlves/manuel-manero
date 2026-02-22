import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './types.ts',
    './constants.tsx',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B38728',
          light:   '#FCF6BA',
          mid:     '#BF953F',
          dark:    '#AA771C',
        },
        brand: {
          dark:   '#0F172A',  // slate-950
          card:   '#1E293B',  // slate-900
          border: '#334155',  // slate-700
          muted:  '#64748B',  // slate-500
          text:   '#CBD5E1',  // slate-300
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
} satisfies Config;
