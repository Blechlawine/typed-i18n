import type * as H from "hotscript";

// Code from https://github.com/Blechlawine/typed-i18n/blob/main/packages/core/src/index.ts
export type BaseTranslation = Record<string, BaseTranslationValue>;

type BaseTranslationValue =
    | string
    | ((...args: (string | number | boolean)[]) => string)
    | { [key: string]: BaseTranslationValue };

export type I18nOptions<TTranslation extends BaseTranslation> = {
    translations: Record<string, TTranslation>;
    defaultLocale: string;
};

export type I18n<T extends BaseTranslation> = IndexFunction<ConvertStringValues<T>>;

export function defineBaseTranslation<T extends BaseTranslation>(translation: T) {
    return translation;
}

export function defineTranslation<T extends ReturnType<typeof defineBaseTranslation>>(translation: T) {
    return translation;
}

// biome-ignore lint/suspicious/noExplicitAny:
export type ConvertStringValues<T extends { [key: string]: any }> = {
    // biome-ignore lint/complexity/noBannedTypes:
    [K in keyof T]: T[K] extends string ? () => string : T[K] extends Function ? T[K] : ConvertStringValues<T[K]>;
};

export function convertToFunctions<T extends BaseTranslation>(input: T): ConvertStringValues<T> {
    const converted = Object.fromEntries(
        Object.entries(input).map(([key, value]) => {
            if (typeof value === "string") {
                return [key, () => value];
            }
            if (typeof value === "function") {
                return [key, value];
            }
            return [key, convertToFunctions(value)];
        }),
    );

    return converted;
}

// biome-ignore lint/suspicious/noExplicitAny: intentional
export type IndexFunction<T extends { [key: string]: any }> = <K extends string>(
    key?: K | undefined,
) => IndexedObject<T, K>;

type IndexedObject<T, K extends string> = H.Call<H.Objects.Get<K, T>>;
// biome-ignore lint/suspicious/noExplicitAny: intentional
export function indexed<T extends { [key: string]: any }>(input: T): IndexFunction<T> {
    return ((key?: string | undefined) => {
        if (!key) {
            return input;
        }
        let result = input;
        for (const part of key.split(".")) {
            result = result[part];
        }
        return result;
    }) as IndexFunction<T>;
}
