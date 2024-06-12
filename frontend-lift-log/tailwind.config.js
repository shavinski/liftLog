/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom": '0px 5px 10px 0px rgb(0 0 0 / 0.3)'
      }
    },
  },
  plugins: [],
}

