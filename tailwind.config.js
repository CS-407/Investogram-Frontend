/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        investogram_yellow: "#FDE698",
        investogram_dark_yellow: "#d4b848",
        investogram_navy: "#364F6B",
        investogram_lightblue: "#98dbfd",
        investogram_gray: "#ededeb"

      }
    },
  },
  plugins: [],
}