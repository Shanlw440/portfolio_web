/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0a0f2c",
        teal: "#06b6d4",
        ink:  "#1a1f3c",
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
      },
    },
  },
  plugins: [],
};
