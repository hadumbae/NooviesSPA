/**
 * @file textStyles.ts
 * @description
 * Centralized Tailwind-based text style utilities used across the application.
 *
 * These exports provide consistent typography styling patterns for:
 * - Primary and secondary text
 * - Headers and subheaders
 * - Quotes
 * - Error labels and messages
 *
 * Each constant is a pre-computed className string produced by `cn()`.
 *
 * @example
 * ```tsx
 * <p className={PrimaryTextBaseCSS}>Hello</p>
 * <span className={ErrorMessageCSS}>Required field.</span>
 * ```
 */

import { cn } from "@/common/lib/utils.ts";

/**
 * Base styling for primary text.
 *
 * - Black text in light mode
 * - Gray-50 in dark mode
 */
export const PrimaryTextBaseCSS = cn(
    "text-black dark:text-gray-50"
);

/**
 * Base styling for secondary, de-emphasized text.
 *
 * - Neutral gray in light/dark modes
 */
export const SecondaryTextBaseCSS = cn(
    "text-neutral-400 dark:text-gray-500"
);

/**
 * Styling for quoted or supportive inline text.
 *
 * - Neutral gray
 * - Smaller font size
 */
export const QuoteTextCSS = cn(
    "text-neutral-500 dark:text-gray-500",
    "text-sm",
);

/**
 * Styling for header-level text.
 *
 * - Inherits `PrimaryTextBaseCSS`
 * - Large, bold text
 */
export const HeaderTextCSS = cn(
    PrimaryTextBaseCSS,
    "text-lg font-bold",
);

/**
 * Styling for subheader or section labels.
 *
 * - Inherits `SecondaryTextBaseCSS`
 * - Bold text
 */
export const SubheaderTextCSS = cn(
    SecondaryTextBaseCSS,
    "font-bold",
);

/**
 * Styling for form field error labels.
 *
 * - Red tone in both light and dark modes
 */
export const ErrorLabelCSS = cn(
    "text-red-500 dark:text-red-700"
);

/**
 * Styling for inline error messages (e.g. validation messages).
 *
 * - Small font size
 * - Medium weight
 * - Red color variants for light/dark themes
 */
export const ErrorMessageCSS = cn(
    "text-[0.8rem] font-medium text-red-500 dark:text-red-700"
);
