/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#2f373f',
        secondaryBackground: '#434d57',
        accent: '#ff7ef9',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
