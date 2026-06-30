import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ডার্ক মোড ক্লাসের মাধ্যমে কন্ট্রোল হবে
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ৩টি মূল কালার টোন (Premium E-commerce Identity)
        brand: {
          primary: "#6366f1",   // Indigo (Main Call-to-Actions)
          secondary: "#0ea5e9", // Sky Blue (Accent, Highlights)
          dark: "#0f172a",      // Slate 900 (Premium Dark backgrounds)
        },
      },
    },
  },
  plugins: [],
};
export default config;