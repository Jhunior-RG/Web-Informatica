
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constant/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        satisfy: ["var(--font-satisfy)"],
        silkscreen: ["var(--font-silkscreen)"],
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 0px 5px rgba(0, 0, 0, 0.25)',
            '0 0px 5px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  plugins: [],
};
export default config;
