import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { mainData } from './src/data/mainData';
import { globSync } from 'glob';
import path from 'path';

const root = 'src/pages/';

const inputFiles = globSync(`${root}/**/*.html`).reduce((entries, file) => {
  const fileNameWithoutExt = path.relative(root, file).replace(path.extname(file), '');
  entries[fileNameWithoutExt] = file;
  return entries;
}, {});

export default defineConfig({
  root: root,
  publicDir: '../../public',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: inputFiles,
    },
  },
  plugins: [
    ViteEjsPlugin(mainData, {
      ejs: {
        beautify: true,
      },
    }),
  ],
});
// vite.config.js
export default defineConfig({
  base: '/gen-mori/', // あなたのリポジトリ名（gen-mori）を / で囲んで記述
  root: root,
  // ...他の設定
});
