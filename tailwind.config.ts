import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d6b26e",
        dark: "#0B0F19",
      },
    },
  },
  plugins: [],
} satisfies Config;