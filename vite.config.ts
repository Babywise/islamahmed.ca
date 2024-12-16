import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/islamahmed.ca",
  build: {
    outDir: "./dist",
    target: ["chrome90", "edge90", "es2022", "firefox89", "safari15"]
  }
});
