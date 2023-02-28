/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        landing: "linear-gradient(to bottom right, #7988D3, #34488B)",
        primary: "linear-gradient(to bottom right, #517BF2, #1D4ED8)",
      },
      fontSize: {
        headline1: "48px",
        headline2: "40px",
        headline3: "32px",
        headline4: "24px",
        headline5: "20px",
        body1: "16px",
        body2: "14px",
      },
      colors: {
        gray1: "#64748B",
      },
      borderColor: {
        default: "#A0ABBB",
        active: "#64748B",
      },
    },
  },
  plugins: [],
};
