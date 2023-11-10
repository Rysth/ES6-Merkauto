/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
        // Means => @media  print { ... }
      },
    },
  },
  plugins: [],
};
