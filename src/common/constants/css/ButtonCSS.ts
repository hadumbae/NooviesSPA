/**
 * @file ButtonAndLinkCSS.ts
 * @description
 * Defines reusable Tailwind CSS class combinations for buttons, links, and dialog actions.
 * All styles include dark mode support and hover states.
 *
 * These constants are intended to be used with `className={...}` in React components
 * for consistent styling across the application.
 *
 * @example
 * ```tsx
 * <button className={PrimaryButtonCSS}>Submit</button>
 * <a href="#" className={HoverLinkCSS}>Read more</a>
 * <button className={IconTextButtonCSS}>
 *   <Icon /> Click me
 * </button>
 * ```
 */

import {cn} from "@/common/lib/utils.ts";
import {IconTextCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * @constant HoverLinkCSS
 * @description
 * Styles for a link with neutral text color that changes on hover.
 * Includes dark mode variants.
 */
export const HoverLinkCSS = cn(
    "text-neutral-400 hover:text-black",
    "dark:text-neutral-500 dark:hover:text-white"
);

/**
 * @constant IconTextButtonCSS
 * @description
 * Styles for a button containing an icon and text.
 * - Aligns items inline and centers vertically.
 * - Ensures SVG icons do not capture pointer events.
 * - Sets size and shrink behavior for icons.
 * - Small text size, medium font weight, underline hover offset.
 * - Inherits hover/link behavior from `HoverLinkCSS`.
 */
export const IconTextButtonCSS = cn(
    IconTextCSS,
    HoverLinkCSS,
    "text-sm font-medium",
    "underline-offset-4 hover:underline-offset-4",
);

/**
 * @constant PrimaryButtonCSS
 * @description
 * Styles for primary buttons with dark mode background and hover colors.
 * Includes dark text and hover text color.
 */
export const PrimaryButtonCSS = cn(
    "bg-purple-700 hover:bg-purple-500",
    "dark:bg-purple-800 dark:hover:bg-purple-500",
    "text-white dark:text-white dark:hover:text-black",
);

/**
 * @constant SecondaryButtonCSS
 * @description
 * Styles for secondary buttons with neutral dark mode background and hover colors.
 * Includes dark text and hover text color.
 */
export const SecondaryButtonCSS = cn(
    "shadow-sm",
    "text-neutral-900 bg-neutral-100 hover:bg-neutral-100/80",
    "dark:text-neutral-50 dark:hover:text-black dark:bg-neutral-700 dark:hover:bg-neutral-500",
);

/**
 * @constant DialogActionCSS
 * @description
 * Styles for dialog action buttons in dark mode.
 * Includes background, hover states, and text colors.
 */
export const DialogActionCSS = cn(
    "dark:bg-purple-800 dark:hover:bg-purple-400",
    "dark:text-white dark:hover:text-black"
);

/**
 * @constant DialogCloseCSS
 * @description
 * Styles for dialog close buttons in dark mode.
 * Includes border, transparent background, hover state, and neutral text color.
 */
export const DialogCloseCSS = cn(
    "dark:border dark:border-black",
    "dark:bg-transparent dark:hover:bg-black dark:text-neutral-500"
);
