/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'primary-green': '#00833E',
        'primary-red': '#CF1400',
        'light': '#F4F4F4',
        'dark': '#1C1C1C',
      },
      textColor: {
        'primary-green': '#00833E',
        'primary-red': '#CF1400',
        'accent-yellow': '#F2A900',
        'accent-gray': '#8F8F8F',
      },
    },
  },
  plugins: [],
});

