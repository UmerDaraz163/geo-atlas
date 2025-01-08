import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.first.org',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''), // Remove "/api" before forwarding
  //     },
  //   },
  // },
});
