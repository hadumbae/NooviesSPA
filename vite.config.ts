import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
    }
})
