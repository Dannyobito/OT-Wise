/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue500: "#1A2238",
        primaryOrange: "#FF6A3D",
        secondaryYellow300: "#FFDE66",
        secondaryYellow500: "#AC8800",
        darkBlue300: "#97A5CE",
        darkBlue100: "#DCE1EF",
        black900: "#1A1A1A",
        black800: "#1E1E1E",
        black700: "#141414",
        black600: "#666666",
        gray700: "#1D1B1F",
        gray500: "#5D5A62",
      },
      boxShadow: {
        step4:
          "0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
