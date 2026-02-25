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

// ここから下が設定ブロック（1つだけにまとめる）
export default defineConfig({
  base: '/', // ← これがGitHubPages用のURL設定
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