/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      fredoka: ["Fredoka", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      airstrike: ["Airstrike"],
    },
    colors: {
      transparent: "transparent",
      gray: {
        1: "#141414",
        2: "#3E3E3E",
        3: "#AFAFAF",
        4: "#828282",
        5: "#383838",
        6: "#494949",
      },
      white: "#ffffff",
      mage: {
        orange: "#FF9437",
        blue: "#132777",
        pink: "#E14CB3",
      },
      purple: {
        1: "#493187",
        2: "#6F56B4",
        3: "#713E79",
        4: "#1B181F",
      },
      pink: {
        1: "#E553A8",
      },
      orange: {
        primary: {
          1: "#D79273",
          2: "#F77F5A",
          3: "#FE874F",
          4: "#FFC291",
          5: "#FFE1C9",
          6: "#EC8562",
          7: "#CA4F14",
        },
        hover: {
          1: "#AD755C",
          2: "#C76142",
          3: "#CC6C3F",
          4: "#CD9B73",
          5: "#C9AF9A",
        },
        pressed: {
          1: "#815846",
          2: "#9C4B32",
          3: "#7C3F22",
        },
      },
      red: {
        1: "#FF4646",
        2: "#FF4F4F",
      },
      dark: "#1E1E1E",
      light: "#FFFFFF",
      black: "#000000",
      transparent_black: "rgba(0, 0, 0, 0.8)",
      light_blue: "#2d8cfe",
    },
    },
  },
  plugins: [],
}

