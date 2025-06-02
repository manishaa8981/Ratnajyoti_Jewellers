/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  plugins: [],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fffaf2",
          800: "#B38B59",
        },
        bronze: "#B68768",
      },
    },
  },
};
