/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rob: ["Roboto", "sans-serif"],
        rale: ["Raleway", "sans-serif"],
      },
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
