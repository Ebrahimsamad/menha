/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out both',
        'slide-bottom': 'slideBottom 1s ease-in-out reverse',
      },
      keyframes: {
        slideBottom: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(30px)' },
        },
      },
      fontFamily: {
        'brush': ["Brush Script MT", 'cursive']
      },
    },
  },
  plugins: [],
}

