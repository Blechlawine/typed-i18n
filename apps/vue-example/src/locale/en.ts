import { defineBaseTranslation } from "i18n-library";

const en = defineBaseTranslation({
    hello: "Hello world",
    greet: (name) => `Hello ${name}`,
});

export type Translation = typeof en;

export default en;
