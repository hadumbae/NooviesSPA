import { ThemeVariant, ThemeVariantEnumSchema } from "@/common/schema/enums/ThemeVariantEnumSchema.ts";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";

/**
 * Retrieves the theme variant from localStorage.
 *
 * @remarks
 * - Validates the stored value using `ThemeVariantEnumSchema`.
 * - If the stored value is invalid or missing, logs a warning and defaults to `'system'`.
 * - Updates localStorage to ensure only valid values are persisted.
 * - Guarantees that the returned value is always a valid `ThemeVariant`.
 *
 * @returns {ThemeVariant} The theme variant (`'light' | 'dark' | 'system'`).
 *
 * @example
 * ```ts
 * const theme = getLocalStorageThemeVariant();
 * console.log(theme); // "light", "dark", or "system"
 * ```
 */
export default function getLocalStorageThemeVariant(): ThemeVariant {
    const variant = localStorage.getItem('themeVariant');

    const { data, success } = ThemeVariantEnumSchema.safeParse(variant);

    const themeValue: ThemeVariant = success ? data : "system";

    if (!success) {
        buildStandardLog({
            level: "warn",
            type: "WARNING",
            msg: "Invalid theme variant in local storage.",
            context: { variant },
        });

        localStorage.removeItem('themeVariant');
        localStorage.setItem('themeVariant', themeValue);
    }

    return themeValue;
}
