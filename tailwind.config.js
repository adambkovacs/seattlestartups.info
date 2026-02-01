/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./themes/**/layouts/**/*.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Seattle-authentic palette - embrace the gray
        'overcast': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        // Deep Sound blue - Elliott Bay at dusk
        'sound': {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8ce6',
          600: '#006fc4',
          700: '#01599f',
          800: '#064b83',
          900: '#0b3f6c',
        },
        // Evergreen - real Douglas fir, not mint
        'fir': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22543d',
          600: '#1a4330',
          700: '#15372a',
          800: '#0f2920',
          900: '#0a1f17',
        },
        // Rainier - snow cap whites and rock grays
        'rainier': {
          snow: '#f8fafc',
          cloud: '#e2e8f0',
          rock: '#64748b',
          shadow: '#334155',
        },
        // Coffee - Pike Place roast undertones
        'roast': {
          light: '#d2b48c',
          medium: '#8b6914',
          dark: '#3d2314',
          espresso: '#1a0f0a',
        },
        // Legacy Seattle-inspired color palette
        seattle: {
          blue: '#004C97',
          teal: '#00A7A0',
          green: '#2E8B57',
          gray: '#4A4A4A',
          light: '#F5F7FA',
        },
      },
      fontFamily: {
        // Bold display - Montserrat for headlines
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
        // Friendly body - Poppins for everything else
        'body': ['Poppins', 'system-ui', 'sans-serif'],
        // Monospace for that dev/tech vibe
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
        // Legacy
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'jelly': 'jelly 0.5s',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        jelly: {
          '0%': { transform: 'scale(1, 1)' },
          '25%': { transform: 'scale(0.9, 1.1)' },
          '50%': { transform: 'scale(1.1, 0.9)' },
          '75%': { transform: 'scale(0.95, 1.05)' },
          '100%': { transform: 'scale(1, 1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // Safelist dynamically generated gradient classes for cities page
  safelist: [
    // Sound gradients (Seattle)
    'from-sound-500', 'to-sound-600', 'from-sound-600', 'to-sound-700',
    // Fir gradients (Tacoma)
    'from-fir-500', 'to-fir-600', 'from-fir-600', 'to-fir-700',
    // Standard Tailwind gradients for cities
    'from-cyan-500', 'to-cyan-600',
    'from-indigo-500', 'to-indigo-600',
    'from-emerald-500', 'to-emerald-600',
    'from-blue-500', 'to-blue-600',
    'from-purple-500', 'to-purple-600',
    'from-teal-500', 'to-teal-600',
    'from-rose-500', 'to-rose-600',
    'from-amber-500', 'to-amber-600',
    // Custom shadow colors for hover effects
    'hover:shadow-sound-500/10', 'hover:shadow-sound-500/20',
    'dark:hover:shadow-sound-500/20', 'dark:hover:shadow-sound-500/30',
    'hover:shadow-fir-500/10', 'hover:shadow-fir-500/20',
    'dark:hover:shadow-fir-500/20',
  ],
}
