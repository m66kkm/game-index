import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Tauri expects the dev server to run on a fixed port.
const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 5180,
    strictPort: true,
    host: host || "127.0.0.1",
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
