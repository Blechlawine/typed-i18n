import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Inspect()],
    resolve: {
        alias: {
            "@typed-i18n/core": path.resolve(__dirname, "../../packages/core/src"),
            "@typed-i18n/vue": path.resolve(__dirname, "../../packages/adapter-vue/src"),
        },
    },
});
