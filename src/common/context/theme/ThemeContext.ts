import { createContext } from "react";
import { ThemeVariant } from "@/common/schema/enums/ThemeVariantEnumSchema.ts";

/**
 * Represents the shape of the theme context used throughout the application.
 *
 * @remarks
 * - Provides the current theme variant (`light`, `dark`, or `system`).
 * - Exposes a setter function to update the theme variant in a type-safe manner.
 * - Typically used via `useContext(ThemeContext)` within components.
 *
 * @property themeVariant — The active theme mode for the application.
 * @property updateThemeVariant — Function to update the current theme variant.
 *
 * @example
 * ```tsx
 * const { themeVariant, updateThemeVariant } = useContext(ThemeContext)!;
 *
 * // Switch to dark mode
 * updateThemeVariant("dark");
 * ```
 */
export type ThemeContextValues = {
    /** The currently selected theme variant. */
    themeVariant: ThemeVariant;

    /** Updates the application’s theme variant. */
    updateThemeVariant: (themeVariant: ThemeVariant) => void;
};

/**
 * React context that provides theme management functionality.
 *
 * @remarks
 * - The context is initialized as `undefined` to ensure consumers must be wrapped
 *   in a proper provider (e.g., `ThemeContextProvider`).
 * - Accessing the context without a provider should be treated as a programmer error.
 */
export const ThemeContext = createContext<ThemeContextValues | undefined>(undefined);
