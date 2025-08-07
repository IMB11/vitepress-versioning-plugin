import { defineConfig } from "vite";
import path from "node:path";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/plugin.ts"),
        components: path.resolve(__dirname, "src/components/index.ts"),
      },
      name: "VitepressVersioningPlugin",
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        "vue", 
        "vite", 
        "vitepress",
        "markdown-it", 
        "fs/promises", 
        "flexsearch",
        "node:fs",
        "node:path",
        "cli-color",
        "lodash"
      ],
      output: {
        globals: {
          vue: "Vue",
          vitepress: "VitePress",
        },
      },
    },
  }
})