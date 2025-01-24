// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'], 
        // Add your custom font
      },
      colors: {
        'custom-dark-blue': '#3A377E',
        'custom-deep-blue': '#28254D',
        'custom-midnight': '#080A40',
        'custom-gold': '#D9C58B',
        'custom-bronze': '#A67E4E',
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
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
