import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cibun': {
          green: {
            light: '#97BC62',
            DEFAULT: '#2C5F2D',
            dark: '#1E3A2F',
          },
          brown: {
            DEFAULT: '#8D6E63',
            dark: '#5D4037',
          },
          gold: '#D4AF37',
          sunset: '#F29C38',
          cream: '#F5F5DC',
        }
      },
      fontFamily: {
        heading: ['var(--font-outfit)'],
        body: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to right bottom, rgba(44, 95, 45, 0.9), rgba(30, 58, 47, 0.95))',
      }
    },
  },
  plugins: [],
};
export default config;
