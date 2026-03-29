import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dcc8',
          300: '#d4c4a0',
          400: '#c9a962',
          500: '#b8944d',
          600: '#a17d3a',
          700: '#866530',
          800: '#6b5029',
          900: '#5c4033',
        },
        accent: {
          gold: '#c9a962',
          cream: '#f5f0e8',
          rose: '#d4a5a5',
          brown: '#5c4033',
        },
        dark: {
          primary: '#1a1a2e',
          secondary: '#16213e',
          accent: '#0f3460',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Amiri', 'serif'],
        body: ['Montserrat', 'Tajawal', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
