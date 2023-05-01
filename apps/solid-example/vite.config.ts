import path from "node:path";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [solid()],
    resolve: {
        alias: {
            "@typed-i18n/core": path.resolve(__dirname, "../../packages/core/src"),
            "@typed-i18n/solid": path.resolve(__dirname, "../../packages/adapter-solid/src"),
        },
    },
});
