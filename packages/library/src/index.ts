interface Translation {
    [key: string]: string | (() => string) | Translation;
}

type RemoveStringValues<T> = {
    [K in keyof T]: T[K] extends string ? () => string : T[K];
};

export function defineBaseTranslation<T extends Translation>(translation: T) {
    return convertToFunctions(translation);
}

function convertToFunctions<T extends Translation>(input: T): RemoveStringValues<T> {
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
