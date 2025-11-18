import { ThemeVariantEnumSchema } from "@/common/schema/enums/ThemeVariantEnumSchema.ts";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";

/**
 * Determines whether the application should use dark mode.
 *
 * @remarks
 * - Checks `localStorage` for a stored theme variant.
 * - Validates the stored value against `ThemeVariantEnumSchema`.
 * - Returns `true` for `'dark'`, `false` for `'light'`, and matches
 *   system preference for `'system'` or invalid values.
 * - Logs a warning if the stored theme variant is invalid.
 *
 * @returns {boolean} `true` if dark mode should be applied, `false` otherwise.
 */
export default function getIsDarkTheme(): boolean {
    const storageValue = localStorage.getItem('themeVariant');
    const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const { data: variant, success } = ThemeVariantEnumSchema.safeParse(storageValue);

    if (!success) {
        buildStandardLog({
            level: "warn",
            type: "WARNING",
            msg: "Invalid theme variant in local storage.",
            context: { storageValue },
        });
    }

    switch (variant) {
        case "dark":
            return true;
        case "light":
            return false;
        case "system":
            return isDarkSystem;
        default:
            return isDarkSystem;
    }
}
