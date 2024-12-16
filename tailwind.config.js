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
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        ibm: ["IBM Plex Mono", "monospace"]
      }
    }
  },
  plugins: []
};
