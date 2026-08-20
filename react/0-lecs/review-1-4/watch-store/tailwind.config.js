const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "havelock-blue": {
          50: "#f2f7fd",
          100: "#e4eefa",
          200: "#c4dcf3",
          300: "#90bee9",
          400: "#3d90d7",
          500: "#2e81c9", // Main
          600: "#1f66aa",
          700: "#1a518a", // Dark
          800: "#1a4572",
          900: "#1a3b60",
          950: "#12263f",
          DEFAULT: "#2e81c9",
          main: "#2e81c9",
          dark: "#1a518a",
        },
      },
    },
  },
  plugins: [],
});
