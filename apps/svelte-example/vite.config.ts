import path from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        alias: {
            "@typed-i18n/core": path.resolve(__dirname, "../../packages/core/src"),
            "@typed-i18n/svelte": path.resolve(__dirname, "../../packages/adapter-svelte/src"),
        },
    },
});
