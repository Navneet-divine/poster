import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mantine/core/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        dancingScript: ["Dancing Script", "cursive"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        dark: {
          50: "#C1C2C5",
          100: "#A6A7AB",
          200: "#909296",
          300: "#5C5F66",
          400: "#373A40",
          500: "#2C2E33",
          600: "#25262B",
          700: "#1A1B1E",
          800: "#141517",
          900: "#101113",
        },
      },
      borderRadius: {
        blob: "36% 64% 57% 43% / 72% 43% 57% 28%",
        "blob-2": "54% 46% 61% 39% / 26% 41% 59% 74%",
        "blob-3": "73% 27% 71% 29% / 52% 71% 29% 48%",
        "blob-4": "51% 49% 64% 36% / 31% 33% 67% 69%",
      },
    },
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
} satisfies Config;

export default config;
