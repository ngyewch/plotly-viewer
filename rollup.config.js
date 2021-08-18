import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import {config} from 'dotenv';
import dev from 'rollup-plugin-dev';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        replace({
            preventAssignment: false,
            PROCESS_ENV: JSON.stringify({
                PRODUCTION: production,
                ...config().parsed
            })
        }),

        svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production
            }
        }),

        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({output: 'bundle.css'}),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        !production && dev({
            dirs: ['public'],
            spa: 'public/index.html',
            port: 5000,
            proxy: {
                '/service/*': 'http://localhost:8080/service/',
            },
        }),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};
