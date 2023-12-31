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
        hero: " url('/img/hero.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "header-text": "#000000, #FFFFFF00",
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
      },
      colors: {
        primary: "#023F76",
        secondary: "#3E4958",
        light: "#474747",
        dark: "#333333",
      },
      fontSize: {
        header: "250px",
      },
      boxShadow: {
        activity: "0px 4px 16px 0px rgba(0, 0, 0, 0.13)",
      },
    },
  },
  plugins: [],
};
export default config;
