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
        primary: {
          DEFAULT: "#00C2CB",
          light: "#35D8DF",
          dark: "#009AA3",
        },
        secondary: {
          DEFAULT: "#A162F7",
          light: "#B78CFF",
          dark: "#7A3BD8",
        },
        background: {
          DEFAULT: "#0E111A",
        },
        surface: {
          DEFAULT: "#1e293b",
          light: "#273449",
          dark: "#16202A",
        },
        text: {
          base: "#E5E7EB",
          muted: "#9CA3AF",
          invert: "#FFFFFF",
        },
        accent: {
          info: "#3B82F6",
          success: "#10B981",
          warn: "#F59E0B",
          error: "#EF4444",
        },
      },
      backgroundImage: {
        "dark-radial":
          "radial-gradient(circle at bottom right, #0E111A 0%, #0f172a 80%)",
        "dark-angular":
          "conic-gradient(from 180deg at 50% 50%, #00C2CB, #A162F7)",
      },
      boxShadow: {
        glow: "0 4px 12px rgba(0, 194, 203, 0.3)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
});
