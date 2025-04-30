import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import liveReload from 'vite-plugin-live-reload'

// Define current directory for local development
const directory = 'http://localhost/development/boilerplates/boilerplate-grid/';

//

export default defineConfig({

   plugins: [
      liveReload([

         // update of php source will trigger browser reload ( other files types handled by vite )
         __dirname + '/**/*.php',

      ]),
      viteStaticCopy({

         // Copy all static files from src to dist on build ( excluding css/ js/ which are bundled )
         targets: [
            {
               src: './src/*.*',
               dest: './',
            },
            {
               src: './src/*[!scripts/][!assets/]',
               dest: './',
            },
            {
               src: './src/partials/',
               dest: './',
            },
            {
               src: './src/includes/',
               dest: './',
            },
         ]

      }),

   ],
   server: {

      proxy: {
         '/index.php': {

            // change the URL according to your local web server environment
            target: directory + 'src/',
            changeOrigin: true,
            secure: false,


         },

         // include other *.php sources called from your web app
         '/404.php': { target: directory + 'src/404.php' },
         // '/page.php': { target: directory + 'src/page.php' },

      }

   },

   publicDir: 'src/assets',

   base: "./",

   build: {
      manifest: true,
      rollupOptions: {
         input: {
            main: resolve(__dirname, 'src/scripts/js/main.js'),
            css: resolve(__dirname, 'src/scripts/css/main.scss'),
         },
         output: {
            dir: 'dist',
            entryFileNames: 'scripts/js/bundle-[hash].js',
            assetFileNames: 'scripts/css/bundle-[hash].css',
         },
      },
   },

})
