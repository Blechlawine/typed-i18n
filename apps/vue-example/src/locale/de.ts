import { Translation } from "./en";
import { defineTranslation } from "i18n-library";

const de = defineTranslation<Translation>({
    hello: "Hallo Welt",
    greet: (name) => `Hallo ${name}`,
});

export default de;
