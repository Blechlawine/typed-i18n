import { createI18n } from "@typed-i18n/svelte";
import de from "./de";
import en from "./en";

export const { i18n, locale, locales } = createI18n({
    translations: {
        de,
        en,
    },
    defaultLocale: "en",
});
