import {
    type BaseTranslation,
    type ConvertStringValues,
    type I18nOptions,
    convertToFunctions,
} from "@typed-i18n/core";
import {
    Accessor,
    type ParentComponent,
    createComponent,
    createContext,
    createMemo,
    createSignal,
    useContext,
} from "solid-js";

export function createI18n<TTranslation extends BaseTranslation>(
    options: I18nOptions<TTranslation>,
) {
    const I18nContext = createContext(
        {} as {
            locale: Accessor<string>;
            setLocale: (locale: string) => void;
            i18n: Accessor<ConvertStringValues<TTranslation>>;
            locales: string[];
        },
    );

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

    const TypedI18n: ParentComponent<{}> = (props) => {
        const [locale, setLocale] = createSignal(options.defaultLocale);

        const i18n = createMemo(() => {
            return translations[locale()];
        });

        return createComponent(I18nContext.Provider, {
            value: {
                locale,
                setLocale,
                i18n,
                locales,
            },
            get children() {
                return props.children;
            },
        });
    };

    const useI18n = () => {
        return useContext(I18nContext);
    };

    return {
        TypedI18n,
        useI18n,
    };
}
