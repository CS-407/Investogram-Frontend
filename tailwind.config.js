/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        investogram_yellow: "#FDE698",
        investogram_navy: "#364F6B",
      }
    },
  },
  plugins: [],
}