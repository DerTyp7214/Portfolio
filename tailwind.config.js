/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: process.env.NEXT_PUBLIC_COLOR_BACKGROUND,
        secondaryBackground: process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND,
        accent: process.env.NEXT_PUBLIC_COLOR_ACCENT,
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
