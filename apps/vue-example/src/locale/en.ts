import { defineBaseTranslation } from "@typed-i18n/core";

const en = defineBaseTranslation({
    hello: "Hello world",
    greet: (name) => `Hello ${name}`,
});

export type Translation = typeof en;

export default en;
