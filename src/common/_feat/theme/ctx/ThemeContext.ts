/**
 * @fileoverview Context definition for managing the application's theme variant.
 */

import { createContext } from "react";
import { ThemeVariant } from "@/common/_schemas/enums/ThemeVariantSchema.ts";

/** Values provided by the ThemeContext. */
export type ThemeContextValues = {
    themeVariant: ThemeVariant;
    updateThemeVariant: (themeVariant: ThemeVariant) => void;
};

/** Context for accessing and updating the current theme state. */
export const ThemeContext = createContext<ThemeContextValues | undefined>(undefined);
