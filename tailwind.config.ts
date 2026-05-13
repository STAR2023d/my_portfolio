import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        dark: "#0B0F19",
        light: "#F8FAFC",
        muted: "#94A3B8",
      },
    },
  },
  plugins: [],
} satisfies Config;
