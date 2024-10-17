/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#0673e7',
        'main-text-color': '#100',
        'secondary-text-color': '#808080',
      },
    },
  },
  plugins: [],
}
