/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
      function ({ addBase }) {
        addBase({
          '::selection': {
            backgroundColor: '#22c55e', // verde Tailwind (green-500)
            color: '#ffffff',           // texto blanco al seleccionar
          },
        });
      }
    ],
};
