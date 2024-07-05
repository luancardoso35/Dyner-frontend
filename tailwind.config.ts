import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': { 'raw': '(min-height: 660px)' },
        'xs': { 'raw': '(min-height: 850px)' },
        's': { 'raw': '(min-height: 1025px)' },
        ...defaultTheme.screens,
      },
      fontFamily: {
        'espana': ['var(--font-espana)'],
        'josefin-sans': [
          "Josefin Sans", "sans-serif"
        ]
      }
    },
  },
  plugins: [],
};
export default config;
