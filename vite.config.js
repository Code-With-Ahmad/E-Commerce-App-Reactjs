import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Ensures correct routing on Vercel
  server: {
    historyApiFallback: true, // Fixes 404 on refresh
  },
});
