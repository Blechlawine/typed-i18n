import App from "./App.vue";
import de from "./locale/de";
import en from "./locale/en";
import "./style.css";
import { createI18n } from "@typed-i18n/vue";
import { createApp } from "vue";

const i18n = createI18n({
    translations: {
        en,
        de,
    },
    defaultLocale: "en",
});

createApp(App).use(i18n).mount("#app");
