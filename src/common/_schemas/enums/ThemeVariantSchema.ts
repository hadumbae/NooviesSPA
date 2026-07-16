/**
 * @fileoverview Zod schema and type definition for application theme variants.
 */

import { z } from "zod";

/** Zod schema for validating theme selection values. */
export const ThemeVariantSchema = z.enum(
    ["light", "dark", "system"] as const,
    { message: "Invalid theme. Must be 'light', 'dark' or 'system'." },
);

/** Type representing valid theme options. */
export type ThemeVariant = z.infer<typeof ThemeVariantSchema>;
