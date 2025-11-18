import { z } from "zod";

/**
 * Zod schema representing the valid theme variants for the application.
 *
 * @remarks
 * - This schema validates that a string is either `'light'`, `'dark'`, or `'system'`.
 * - Use this schema whenever user input, persisted theme data, or context values
 *   need validation.
 * - The schema automatically infers the TypeScript type `ThemeVariant`.
 *
 * @example
 * ```ts
 * ThemeVariantEnumSchema.parse('light');  // ✅ passes
 * ThemeVariantEnumSchema.parse('dark');   // ✅ passes
 * ThemeVariantEnumSchema.parse('system'); // ✅ passes
 * ThemeVariantEnumSchema.parse('blue');   // ❌ throws error
 * ```
 */
export const ThemeVariantEnumSchema = z.enum(
    ["light", "dark", "system"] as const,
    { message: "Invalid theme. Must be 'light', 'dark' or 'system'." },
);

/**
 * Represents the theme variant type of the application.
 *
 * @remarks
 * - This type is inferred directly from `ThemeVariantEnumSchema`.
 * - Can be used for type-safe theme state in components, context, or hooks.
 * - Valid values are `'light'`, `'dark'`, or `'system'`.
 *
 * @typedef ThemeVariant
 */
export type ThemeVariant = z.infer<typeof ThemeVariantEnumSchema>;
