import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        host: true,
        proxy: {
            // API routes
            "/url": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
            "/health": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: "dist",
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                    utils: ["axios", "react-query"],
                },
            },
        },
    },
    define: {
        global: "globalThis",
    },
});
