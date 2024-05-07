import { type BaseTranslation, type I18n, type I18nOptions, convertToFunctions, indexed } from "@typed-i18n/core";
import type { ComputedRef, Plugin, Ref } from "vue";
import { computed, inject, ref } from "vue";

type ProvidedI18n<T extends BaseTranslation> = {
    i18n: ComputedRef<I18n<T>>;
    t: ComputedRef<I18n<T>>;
    $t: ComputedRef<I18n<T>>;
    $i18n: ComputedRef<I18n<T>>;
    locale: Ref<string>;
    locales: string[];
    defaultLocale: string;
};

const I18N_KEY = Symbol("i18n");

export function createI18n<TTranslation extends BaseTranslation>(options: I18nOptions<TTranslation>): Plugin {
    const translations = Object.fromEntries(
        Object.entries<TTranslation>(options.translations).map(([key, value]) => [
            key,
            indexed(convertToFunctions(value)),
        ]),
    );

    // TODO: show this error on the type level, not just at runtime
    if (!(options.defaultLocale in translations)) {
        throw new Error(
            `Unknown locale: "${options.defaultLocale}". Defined locales are: "${Object.keys(translations).join(
                '", "',
            )}"`,
        );
    }
    return {
        install(app) {
            const locale = ref(options.defaultLocale);

            const i18n = computed(() => translations[locale.value]);

            // TODO: find a way to get the user defined Translation type onto these properties
            // app.config.globalProperties.$t = i18n;
            // app.config.globalProperties.$i18n = i18n;
            app.config.globalProperties.$locale = locale;
            app.config.globalProperties.$locales = Object.keys(translations);

            app.provide(I18N_KEY, {
                i18n,
                t: i18n,
                $t: i18n,
                $i18n: i18n,
                locale,
                locales: Object.keys(translations),
                defaultLocale: options.defaultLocale,
            });
        },
    };
}

export function useI18n<T extends BaseTranslation>() {
    const _i18n = inject<ProvidedI18n<T>>(I18N_KEY);
    if (!_i18n) {
        throw new Error("i18n not provided");
    }
    return _i18n;
}
