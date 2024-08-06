import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/plugin.ts"),
      name: "VitepressVersioningPlugin",
    },
    rollupOptions: {
      external: ["vue", "vite", "markdown-it", "fs/promises", "flexsearch"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  }
})