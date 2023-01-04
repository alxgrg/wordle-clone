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
      animation: {
        popIn: 'popIn 100ms ease-in forwards',
      },
    },
  },
  plugins: [],
};
