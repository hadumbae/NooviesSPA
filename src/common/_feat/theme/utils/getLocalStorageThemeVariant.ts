/**
 * @fileoverview Utility for retrieving and validating the theme variant from local storage.
 */

import { ThemeVariant, ThemeVariantSchema } from "@/common/_schemas/enums/ThemeVariantSchema.ts";
import {buildStandardLog} from "@/common/_feat/logger-builders/buildStandardLog.ts";

/** Retrieves the theme variant from local storage and falls back to system if invalid. */
export function getLocalStorageThemeVariant(): ThemeVariant {
    const variant = localStorage.getItem('themeVariant');

    const {data, success} = ThemeVariantSchema.safeParse(variant);

    const themeValue: ThemeVariant = success ? data : "system";

    if (!success) {
        buildStandardLog({
            level: "warn",
            type: "WARNING",
            msg: "Invalid theme variant in local storage.",
            context: {variant},
        });

        localStorage.removeItem('themeVariant');
        localStorage.setItem('themeVariant', themeValue);
    }

    return themeValue;
}
