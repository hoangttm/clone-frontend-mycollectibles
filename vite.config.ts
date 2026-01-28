import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), '')
  // const apiTarget = env.VITE_API_BASE_URL || 'https://api-dev.mycollectibles.fund'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      allowedHosts: ["localhost", "quick-mighty-bream.ngrok-free.app"],
      // Proxy temporarily disabled for debugging
      // proxy: {
      //   '/api': {
      //     target: apiTarget,
      //     changeOrigin: true,
      //     secure: true,
      //     configure: (proxy) => {
      //       proxy.on('proxyReq', (proxyReq) => {
      //         // Remove or replace the Origin header to bypass backend origin check
      //         proxyReq.removeHeader('origin');
      //         proxyReq.setHeader('origin', apiTarget);
      //       });
      //     },
      //   },
      // },
    },
  };
});
