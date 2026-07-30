import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Only the routes the be/ Express server owns are proxied. /api/visitors
    // is a Vercel serverless function and must not be forwarded here.
    proxy: {
      "/api/chat-bot": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/message": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    // host: "192.168.55.100"
    host: "localhost",
  },
});
