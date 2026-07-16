/**
 * @fileoverview Utility for persisting the theme variant to local storage.
 */

import { ThemeVariant, ThemeVariantSchema } from "@/common/_schemas/enums/ThemeVariantSchema.ts";
import {buildStandardLog} from "@/common/_feat/logger-builders/buildStandardLog.ts";

/** Validates and saves the theme variant to the browser local storage. */
export function setLocalStorageThemeVariant(variant: ThemeVariant): ThemeVariant {
    const {success, data} = ThemeVariantSchema.safeParse(variant);
    const storeValue: ThemeVariant = success ? data : "light";

    if (!success) {
        buildStandardLog({
            level: "warn",
            type: "WARNING",
            msg: "Invalid theme variant provided.",
            context: {variant},
        });
    }

    localStorage.removeItem('themeVariant');
    localStorage.setItem('themeVariant', storeValue);

    return storeValue;
}
