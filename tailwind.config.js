/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#121213',
        'custom-green-dark': '#538d4e',
        'custom-green': '#6aaa64',
        'custom-yellow-dark': '#b59f3b',
        'custom-yellow': '#c9b458',
        'custom-gray-dark': 'rgb(63 63 70)',
        'custom-gray': '#787c7e',
        'custom-orange': '#f5793a',
        'custom-blue': '#86c0f9',
        'custom-neutral-50': '#d3d6da',
        'custom-neutral-100': '#878a8c',
        'custom-neutral-dark-50': '#818384',
        'custom-neutral-dark-100': '#565758',
        'custom-neutral-dark-200': '#3a3a3c',
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
        flipIn: {
          '0%': {
            /* @apply bg-custom-black;
            @apply border-zinc-700; */
            transform: 'rotateX(0)',
          },
          '100%': {
            /* @apply bg-custom-black;
            @apply border-zinc-700; */
            transform: 'rotateX(-90deg)',
          },
        },
        flipOut: {
          '0%': {
            borderColor: 'var(--status)',
            background: 'var(--status)',
            transform: 'rotateX(-90deg)',
          },
          '100%': {
            borderColor: 'var(--status)',
            background: 'var(--status)',
            transform: 'rotateX(0)',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateY(30px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: 1,
          },
        },
        slideOut: {
          '0%': {
            transform: 'translateY(0px)',
            opacity: 1,
          },
          '90%': {
            opacity: 0,
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(60px)',
          },
        },
      },
      animation: {
        shake: 'shake 600ms',
        popIn: 'popIn 100ms ease-in forwards',
        flipIn: 'flipIn 250ms ease-in forwards',
        flipOut: 'flipOut 250ms ease-in forwards',
        slideIn: 'slideIn 200ms ease-in forwards',
        slideOut: 'slideOut 200ms ease-in forwards',
      },
    },
  },
  plugins: [],
};
