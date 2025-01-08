import type { Config } from "tailwindcss";
const defaultColors = require("tailwindcss/colors");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBrown: "#4F3737",
        customTextGray: "#04070799",
        customPlaceHolderGray: "#04070799",
        cusomButtonColor: "#AE8566"
      },
      fontFamily: {
        freightNeoMedium: ['Freight Neo Pro Medium', 'sans-serif'],
        freightNeoSemibold: ['Freight Neo Pro Semibold', 'sans-serif'],
        FreightNeoProBold: ['Freight Neo Pro Bold', 'sans-serif'],
        CandideCondensedBold: ['Candide-CondensedBold', 'sans-serif'],
        CandideCondensedMedium: ['Candide-CondensedMedium', 'sans-serif']
      },      
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1000px",
        lg2 : "1200px",
        xl: "1580px",
        "2xl": "1500px",
      },
    },
  },
  plugins: [],
} satisfies Config;
