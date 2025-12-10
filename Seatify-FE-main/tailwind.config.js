/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'rotate-gradient': 'rotation 5000ms infinite linear',
        'floating': 'floating 2600ms infinite linear',
        'floating-delay-1': 'floating 2600ms infinite linear -800ms',
        'floating-delay-2': 'floating 2600ms infinite linear -1800ms',
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce': 'bounce 1.5s infinite',
      },
      keyframes: {
        rotation: {
          '0%, 100%': { transform: 'rotateZ(360deg)' },
          '50%': { transform: 'rotateZ(0deg)' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

