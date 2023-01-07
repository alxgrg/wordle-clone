/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#121213',
        'custom-green': '#538d4e',
        'custom-yellow': '#b59f3b',
        'custom-gray': 'rgb(63 63 70)',
      },
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
        bounce: {
          '0%, 20%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-30px)',
          },
          '50%': {
            transform: 'translateY(5px)',
          },
          '60%': {
            transform: 'translateY(-15px)',
          },
          '80%': {
            transform: 'translateY(2px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        shake: 'shake 600ms',
        popIn: 'popIn 100ms ease-in forwards',
      },
    },
  },
  plugins: [],
};
