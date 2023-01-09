/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '576px', // => @media (min-width: 576px) { ... }
      md: '800px', // => @media (min-width: 800px) { ... }
      lg: '1024px', // => @media (min-width: 1024px) { ... }
    },
    fontFamily: {
      serif: [
        '"Noto Serif TC"',
        '"Roboto Mono"',
        ...defaultTheme.fontFamily.serif,
      ],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              textAlign: 'justify',
            },
            img: {
              borderRadius: '8px',
              width: '100%',
              margin: '0 auto',
            },
            pre: {
              borderRadius: '8px',
            },
            code: {
              backgroundColor: '#269',
              color: '#fff',
              padding: '4px',
              borderRadius: '4px',
              fontWeight: '100',
              fontSize: '0.5rem',
            },
            th: {
              padding: '15px 0',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          },
        },
      },
      colors: {
        white: '#ffffff',
        primary: '#10172A',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
