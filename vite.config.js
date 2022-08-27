const path = require('path')
const root = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'dist')
export default {
  base: '/needles/',
  root,
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(root, 'index.html'),
        artists: path.resolve(root, 'artists.html'),
        gallery: path.resolve(root, 'gallery.html'),
        contact: path.resolve(root, 'contact.html'),
      },
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
}
