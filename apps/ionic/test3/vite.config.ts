// import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html'; // vite.config.js
import htmlPlugin from 'vite-plugin-html-config';
import Info from 'unplugin-info/vite';

const htmlPluginOpt = {
  title: 'Test 3',
  metas: [
    {
      name: 'theme-color',
      media: '(prefers-color-scheme: light)',
      content: '#f7f7f7',
    },
    {
      name: 'theme-color',
      media: '(prefers-color-scheme: dark)',
      content: '#0d0d0d',
    },
    {
      name: 'apple-mobile-web-app-title',
      media: '-',
      content: 'APPLE APP',
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    htmlPlugin(htmlPluginOpt),
    react(),
    nxViteTsPaths(),
    VitePWA({ registerType: 'autoUpdate' }),
    Info(),
    // createHtmlPlugin({
    //   minify: true,
    //   inject: {
    //     data: {
    //       title: '<title>test2</title>',
    //       all: `<meta
    //       name="theme-color"
    //       media="(prefers-color-scheme: light)"
    //       content="#fff"
    //     />
    //     <meta
    //       name="theme-color"
    //       media="(prefers-color-scheme: dark)"
    //       content="#0d0d0d"
    //     />`
    //     },
    //   },
    // }),
    // legacy()
  ],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: './src/setupTests.ts',
  // }
});
