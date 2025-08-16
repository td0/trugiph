import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "single",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: "/trugiph/",
  build: {
    rollupOptions: {
      external: (id) => {
        // Exclude test files from build
        return (
          id.includes("__tests__") ||
          id.includes(".test.") ||
          id.includes(".spec.") ||
          id.includes("/test/")
        );
      },
    },
  },
});
