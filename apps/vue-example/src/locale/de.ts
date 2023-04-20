import { Translation } from "./en";
import { defineTranslation } from "@typed-i18n/core";

const de = defineTranslation<Translation>({
    hello: "Hallo Welt",
    greet: (name) => `Hallo ${name}`,
});

export default de;
