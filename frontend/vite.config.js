import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    chunkSizeWarningLimit: 1000, // size in KB
  },
});
