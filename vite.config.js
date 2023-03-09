import path from 'path';
import { defineConfig } from 'vite';
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import dts from 'vite-plugin-dts';

function resolve(url) {
  return path.resolve(__dirname, url);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  envPrefix: 'APP_',
  server: {
    host: '0.0.0.0',
  },
  build: {
    outDir: 'example/dist',
    // rollupOptions: {
    //   input: {
    //     main: resolve('./example/index.html'),
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': resolve('./example/src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    legacy({
      polyfills: true,
    }),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
    }),
    dts({
      tsConfigFilePath: resolve('./tsconfig.json'),
    }),
  ],
});
