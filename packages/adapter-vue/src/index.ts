import { ConvertStringValues, convertToFunctions, type Translation } from "@typed-i18n/core";
import type { ComputedRef, Plugin } from "vue";
import { computed, inject, ref } from "vue";

type Options<T extends Translation> = {
    translations: Record<string, T>;
    defaultLocale: string;
};

type ProvidedI18n<T> = {
    i18n: ConvertStringValues<T>;
    t: ComputedRef<ConvertStringValues<T>>;
    $t: ComputedRef<ConvertStringValues<T>>;
    $i18n: ComputedRef<ConvertStringValues<T>>;
    locale: ComputedRef<string>;
    locales: string[];
}

export default function createI18n<T extends Translation>(options: Options<T>): Plugin {
    return {
        install(app) {
            // TODO: check if defaultLocale key is in translations

            const locale = ref(options.defaultLocale);

            const i18n = computed(() => convertToFunctions(options.translations[locale.value]));

            app.config.globalProperties.$t = i18n;

            app.provide("i18n", {
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

export function useI18n<T extends Translation>() {
    const _i18n = inject<ProvidedI18n<T>>("i18n");
    if (!_i18n) {
        throw new Error("i18n not provided");
    }
    return _i18n;
}
