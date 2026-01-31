/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./themes/**/layouts/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        // Seattle-inspired color palette
        seattle: {
          blue: '#004C97',      // Deep Seattle blue
          teal: '#00A7A0',      // Puget Sound teal
          green: '#2E8B57',     // Evergreen
          gray: '#4A4A4A',      // Slate
          light: '#F5F7FA',     // Light background
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
