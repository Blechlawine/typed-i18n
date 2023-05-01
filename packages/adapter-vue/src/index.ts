import { type BaseTranslation, ConvertStringValues, convertToFunctions } from "@typed-i18n/core";
import type { ComputedRef, InjectionKey, Plugin, Ref } from "vue";
import { computed, inject, ref } from "vue";
export type * from "./types";

type Options<T extends BaseTranslation> = {
    translations: Record<string, T>;
    defaultLocale: string;
};

type ProvidedI18n<T extends BaseTranslation> = {
    i18n: ConvertStringValues<T>;
    t: ComputedRef<ConvertStringValues<T>>;
    $t: ComputedRef<ConvertStringValues<T>>;
    $i18n: ComputedRef<ConvertStringValues<T>>;
    locale: Ref<string>;
    locales: string[];
};

const I18N_KEY = Symbol("i18n");

export default function createI18n<T extends BaseTranslation>(options: Options<T>): Plugin {
    const translations = Object.fromEntries(
        Object.entries(options.translations).map(([key, value]) => [
            key,
            convertToFunctions(value),
        ]),
    );
    return {
        install(app) {
            // TODO: check if defaultLocale key is in translations

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
                locales: Object.keys(options.translations),
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
