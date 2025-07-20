import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Ultra-clean SPA-only configuration
export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa",
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress chunk size warnings for production
        if (warning.code === "LARGE_BUNDLE") return;
        warn(warning);
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
