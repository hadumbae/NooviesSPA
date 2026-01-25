/**
 * @file textStyles.ts
 *
 * @summary
 * Centralized Tailwind-based text style utilities for consistent typography across the app.
 *
 * @description
 * Provides pre-computed className strings for common text patterns, including:
 * - Primary and secondary text
 * - Headers and subheaders
 * - Quotes and supportive inline text
 * - Error labels and messages
 * - Icon-aligned text
 *
 * All constants leverage the `cn()` utility to merge class strings consistently.
 *
 * @example
 * ```tsx
 * <p className={PrimaryTextBaseCSS}>Primary text example</p>
 * <span className={ErrorMessageCSS}>Validation error message</span>
 * <h2 className={HeaderTextCSS}>Section Header</h2>
 * <span className={IconTextCSS}><Icon /> Label</span>
 * ```
 */

import { cn } from "@/common/lib/utils.ts";

/**
 * Base styling for primary text.
 *
 * - Black in light mode
 * - Gray-50 in dark mode
 */
export const PrimaryTextBaseCSS = cn(
    "text-black dark:text-gray-50"
);

/**
 * Base styling for secondary, de-emphasized text.
 *
 * - Neutral gray in both light and dark modes
 */
export const SecondaryTextBaseCSS = cn(
    "text-neutral-400 dark:text-gray-500"
);

/**
 * Styling for quoted or supportive inline text.
 *
 * - Neutral gray color
 * - Smaller font size
 */
export const QuoteTextCSS = cn(
    "text-neutral-500 dark:text-gray-500",
    "text-sm",
);

/**
 * Styling for header-level text.
 *
 * - Inherits PrimaryTextBaseCSS
 * - Large, bold font
 */
export const HeaderTextCSS = cn(
    PrimaryTextBaseCSS,
    "text-lg font-bold",
);

/**
 * Styling for subheader or section labels.
 *
 * - Inherits SecondaryTextBaseCSS
 * - Bold font weight
 */
export const SubheaderTextCSS = cn(
    SecondaryTextBaseCSS,
    "font-bold",
);

/**
 * Styling for form field error labels.
 *
 * - Red tone for light and dark themes
 */
export const ErrorLabelCSS = cn(
    "text-red-500 dark:text-red-700"
);

/**
 * Styling for inline error messages (e.g., validation feedback).
 *
 * - Small font size
 * - Medium weight
 * - Red variants for light/dark themes
 */
export const ErrorMessageCSS = cn(
    "text-[0.8rem] font-medium text-red-500 dark:text-red-700"
);

/**
 * Utility styling for text with icons.
 *
 * - Aligns text and inline SVG icons
 * - Ensures icons do not capture pointer events
 * - Maintains icon size and prevents shrinking
 */
export const IconTextCSS = cn(
    "inline-flex items-center gap-2",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
);

/**
 * Styling for section headers with a visual accent.
 *
 * - Left border highlight
 * - Horizontal padding
 */
export const SectionHeaderCSS = cn(
    "border-l-4 px-2",
    "border-primary",
);

export const HoverUnderlineCSS = cn(
    "hover:underline underline-offset-4",
);