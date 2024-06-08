import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

function relative(path) {
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer, tailwindcss],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': relative('./src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
