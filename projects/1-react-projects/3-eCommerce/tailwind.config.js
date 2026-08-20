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
        primary: "#6366F1",
        secondary: "#F472B6",
        bg: {
          main: "#0F172A",
          card: "#1E293B"
        },
        text: {
          base: "#F1F5F9",
          muted: "#94A3B8"
        }
      }
    }
  },
  plugins: []
});
