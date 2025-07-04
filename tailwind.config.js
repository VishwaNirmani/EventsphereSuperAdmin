/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#5A67BA",
        "custom-purple-lock": "#7984D0"
      }
    },
  },
  plugins: [],
}

