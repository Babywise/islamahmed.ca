/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        general: {
          0: "FFFFFF",
          10: "#F2F2F0",
          40: "#79818C",
          60: "#626973",
          80: "#00010D",
          90: "#0D0D0D",
          100: "#000000"
        }
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }]
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        ibm: ["IBM Plex Mono", "monospace"]
      }
    }
  },
  plugins: []
};
