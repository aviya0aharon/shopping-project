// File: vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    https: false,
    proxy: {
      // Proxy /shoppingProductsServer requests to backend at localhost:5109
      "/productsServer": {
        target: "http://localhost:5109",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/productsServer/, "/api"),
      },
      "/summariesServer": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/summariesServer/, "/api"),
      },
    },
  },
});
