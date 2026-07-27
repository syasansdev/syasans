import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Route chunks are all well under this; the ceiling exists to make a real
    // regression noisy rather than to silence the warning.
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        /**
         * Vendor code changes on a different cadence to product code, so it
         * gets its own long-lived chunks. Splitting the animation runtime out
         * separately matters most: it is the single largest dependency, and
         * without this every copy edit invalidates it in visitors' caches.
         */
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
