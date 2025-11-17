import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./resume/**/*.{js,ts,jsx,tsx}",  // ✅ add this so Tailwind reads resume folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
