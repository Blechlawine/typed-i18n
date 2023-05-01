import type { ConvertStringValues } from "@typed-i18n/core";
import { ComputedRef, Ref } from "vue";

// declare type Translation = {};
declare module "vue" {
    interface ComponentCustomProperties {
        // $t: ComputedRef<ConvertStringValues<Translation>>;
        // $i18n: ComputedRef<ConvertStringValues<Translation>>;
        $locale: Ref<string>;
        $locales: string[];
    }
}
