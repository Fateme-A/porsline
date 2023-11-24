import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        flip: "flip 1s ease-in-out",
      },
      keyframes: {
        flip: {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "50%": {
            transform: "rotateY(180deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
      },
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      yellow: "#f7da21",
      green: "#6aaa64",
      gray: {
        100: "#d3d6da",
        200: "#787c7e",
      },
    },
  },
  plugins: [],
};
export default config;
