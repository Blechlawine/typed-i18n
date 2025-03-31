import {
    type BaseTranslation,
    type I18nOptions,
    type ConvertStringValues,
    type IndexFunction,
    createTranslation,
} from "@typed-i18n/core";
import { derived, writable } from "svelte/store";

export function createI18n<TTranslation extends BaseTranslation>(options: I18nOptions<TTranslation>) {
    const translations = createTranslation<TTranslation>(options);
    const locales = Object.keys(translations);

    if (!(options.defaultLocale in translations)) {
        throw new Error(
            `Unknown locale: "${options.defaultLocale}". Defined locales are: "${Object.keys(translations).join(
                '", "',
            )}"`,
        );
    }

    const locale = writable<(typeof locales)[number]>(options.defaultLocale);

    const i18n = derived<typeof locale, IndexFunction<ConvertStringValues<TTranslation>>>(locale, ($locale) => {
        return translations[$locale];
    });

    return {
        locale,
        locales,
        i18n,
    };
}
