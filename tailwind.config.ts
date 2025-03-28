import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin"; 

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
        cusomButtonColor: "#AE8566",
        primaryBackgroundColor: "#F8F6F5",
        footerTextColor: "#EADFD1CC",
        primaryButtonTextColor: "#6F8AAF",
      },
      fontFamily: {
        freightNeoMedium: ["Freight Neo Pro Medium", "sans-serif"],
        freightNeoSemibold: ["Freight Neo Pro Semibold", "sans-serif"],
        FreightNeoProBold: ["Freight Neo Pro Bold", "sans-serif"],
        FreightNeoProBlack: ["Freight Neo Pro Black", "sans-serif"],
        CandideCondensedBold: ["Candide-CondensedBold", "sans-serif"],
        CandideCondensedMedium: ["Candide-CondensedMedium", "sans-serif"],
        CandideCondensedNormal: ["Candide-CondensedNormal", "sans-serif"],
        FreightNeoProLight: ["Freight Neo Pro Light", "sans-serif"],
        FreightNeoProNormal: ["Freight Neo Pro Normal", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        lg2: "1200px",
        xl: "1580px",
        "2xl": "2000px",
      },
      fontSize: {
        "56px": "56px",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // IE/Edge
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none", // Chrome/Safari
        },
      });
    }),
  ],

} satisfies Config;
