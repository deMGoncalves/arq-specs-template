import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e3eaff",
          200: "#c3d2ff",
          300: "#9bb3ff",
          400: "#6f8bff",
          500: "#4a65ff",
          600: "#394de6",
          700: "#2d3ccc",
          800: "#202b99",
          900: "#161f73"
        }
      }
    }
  },
  plugins: []
};

