
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
      },
      scrollbar: {
        hide: {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
      colors: {
        'custom-dark-blue': '#3A377E',
        'custom-deep-blue': '#28254D',
        'custom-midnight': '#080A40',
        'custom-gold': '#D9C58B',
        'custom-bronze': '#A67E4E',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};