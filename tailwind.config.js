/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        backgroundDark: process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK,
        secondaryBackgroundDark: process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK,
        background: process.env.NEXT_PUBLIC_COLOR_BACKGROUND,
        secondaryBackground: process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND,
        accent: process.env.NEXT_PUBLIC_COLOR_ACCENT,
        accentDark: process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK,
        tertiary: process.env.NEXT_PUBLIC_COLOR_TERTIARY,
        tertiaryDark: process.env.NEXT_PUBLIC_COLOR_TERTIARY_DARK,
      },
      fontFamily: {
        kulimPark: ['Kulim Park', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
