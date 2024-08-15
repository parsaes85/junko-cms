/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   textPrimary: "7b7b7b"
      // },
      fontFamily: {
        Yekan: ["Yekan"],
        IRANSans: ["IRANSans"],
      },
      backgroundColor: {
        primary: "#f3f3f3",
      },
      textColor: {
        primary: "#7b7b7b",
        secondary: "#0063d1"
      },
      screens: {
        xs: "560px",
      },
    },
  },
  plugins: [],
};
