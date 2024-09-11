/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        innerShad : "' inset 0px 0px 77px 4px rgba(0,0,0,0.1),inset 4px -6px 76px -31px rgba(0,0,0,0.1)'"
      }
    },
  },
  plugins: [],
}

