import de from "./de";
import en from "./en";
import { createI18n } from "@typed-i18n/svelte";

export const { i18n, locale, locales } = createI18n({
    translations: {
        de,
        en,
    },
    defaultLocale: "en",
});
