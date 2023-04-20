import type { Translation } from "@typed-i18n/core";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $t: Translation;
    }
}
