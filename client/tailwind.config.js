/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        black: {
          "base-100": "#000000",
          "base-content": "#e6e6e6",

          "primary": "#1d9bf0",
          "primary-content": "#ffffff",

          "secondary": "#181818",
          "secondary-content": "#ffffff",
        },
      },
    ],
  },
};
