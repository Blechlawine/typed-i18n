export interface BaseTranslation {
    [key: string]: string | ((...args: string[]) => string) | BaseTranslation;
}

export type ConvertStringValues<T> = {
    [K in keyof T]: T[K] extends string ? () => string : T[K];
};

export type I18nOptions<TTranslation extends BaseTranslation> = {
    translations: Record<string, TTranslation>;
    defaultLocale: string;
};

export function defineBaseTranslation<T extends BaseTranslation>(translation: T) {
    return translation;
}

export function defineTranslation<T extends ReturnType<typeof defineBaseTranslation>>(
    translation: T,
) {
    return translation;
}

export function convertToFunctions<T extends BaseTranslation>(input: T): ConvertStringValues<T> {
    return Object.fromEntries(
        Object.entries(input).map(([key, value]) => {
            if (typeof value === "string") {
                return [key, () => value];
            } else if (typeof value === "function") {
                return [key, value];
            } else {
                return [key, convertToFunctions(value)];
            }
        }),
    );
}
