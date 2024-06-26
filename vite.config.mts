/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), createBlockletPlugin(), svgr()],
    css: {
      modules: {
        // scopeBehaviour: "local",
        generateScopedName: "[name]_[local]__[hash:base64:5]",
      }, 
    },
    build: {
      // 禁止 preload 可以解决 js 的请求没有 referer 的问题
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
