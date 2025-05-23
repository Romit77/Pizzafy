import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "70": "17.5rem",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      backdropBlur: {
        md: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
