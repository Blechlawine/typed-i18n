import { BaseTranslation, I18nOptions, convertToFunctions } from "@typed-i18n/core";
import { derived, writable } from "svelte/store";

export function createI18n<TTranslation extends BaseTranslation>(
    options: I18nOptions<TTranslation>,
) {
    const translations = Object.fromEntries(
        Object.entries(options.translations).map(([key, value]) => [
            key,
            convertToFunctions(value),
        ]),
    );
    const locales = Object.keys(translations);

    if (!(options.defaultLocale in translations)) {
        throw new Error(
            `Unknown locale: "${options.defaultLocale}". Defined locales are: "${Object.keys(
                translations,
            ).join('", "')}"`,
        );
    }

    const locale = writable<typeof locales[number]>(options.defaultLocale);

    const i18n = derived(locale, ($locale) => {
        return translations[$locale];
    });

    return {
        locale,
        locales,
        i18n,
    };
}
