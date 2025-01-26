/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Pacifico : ["Pacifico", "serif"],
        roboto : ["Roboto", "serif"],
        handlee : ["Handlee", "serif"]
      }
    },
  },
  plugins: [],
}