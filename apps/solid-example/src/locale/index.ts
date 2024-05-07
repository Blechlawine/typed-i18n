import { createI18n } from "@typed-i18n/solid";
import de from "./de";
import en, { type Translation } from "./en";

const { useI18n, TypedI18n } = createI18n<Translation>({
    translations: {
        en,
        de,
    },
    defaultLocale: "en",
});

export { TypedI18n, useI18n };
