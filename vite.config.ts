import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [
        svelte(),
    ],
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            stream: 'stream-browserify',
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',
            },
        },
    },
});
