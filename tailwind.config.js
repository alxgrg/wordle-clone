/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          from: {
            transform: 'scale(0.8)',
            opacity: '0',
          },
          '40%': {
            transform: 'scale(1.1)',
            opacity: '1',
          },
        },
      },
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translateX(-1px)',
          },
          '20%, 80%': {
            transform: 'translateX(2px)',
          },
          '30%, 50%, 70%': {
            transform: 'translateX(-4px)',
          },
          '40%, 60%': {
            transform: 'translateX(4px)',
          },
        },
      },
      animation: {
        shake: 'shake 600ms',
      },
    },
  },
  plugins: [],
};
