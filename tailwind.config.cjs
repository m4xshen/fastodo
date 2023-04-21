/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Inter, sans-serif",
      ]
    },
    extend: {
      colors: {
        yellow: "#f2c86b"
      }
    },
  },
  plugins: [],
}
