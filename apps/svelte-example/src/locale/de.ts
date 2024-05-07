import { defineTranslation } from "@typed-i18n/core";
import type { Translation } from "./en";

const de = defineTranslation<Translation>({
    hello: "Hallo Welt",
    greet: (name) => `Hallo ${name}`,
});

export default de;
