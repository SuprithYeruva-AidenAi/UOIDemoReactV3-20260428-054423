import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Server-side proxy: /api/* forwarded to the public UOI BFF from Vite,
// so the browser sees same-origin and never triggers a CORS preflight.
// secure:false intentionally — the deploy box sits behind Trend Micro
// Secure Web Gateway which MITMs outbound HTTPS with its own cert.
const proxy = {
  "/api": {
    target: "https://agent.mck.aidendigital.com",
    changeOrigin: true,
    secure: false,
  },
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    host: "0.0.0.0",
    port: 6464,
    strictPort: true,
    proxy,
  },
  preview: {
    host: "0.0.0.0",
    port: 6464,
    strictPort: true,
    proxy,
  },
});
