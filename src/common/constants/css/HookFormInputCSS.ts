/**
 * @file HookFormInputCSS.ts
 * @description
 * Provides the default Tailwind CSS classes for inputs used in `HookFormInput`
 * and related form components. Ensures consistent styling across the application,
 * including dark mode, disabled state, spacing, and typography.
 *
 * Uses the `cn` utility for class concatenation.
 *
 * @example
 * ```tsx
 * <Input className={HookFormInputCSS} placeholder="Enter your name" />
 * ```
 */

import {cn} from "@/common/lib/utils.ts";

/**
 * Default Tailwind CSS classes applied to form inputs.
 *
 * Features:
 * - Rounded corners and shadow
 * - Smooth color transition
 * - Responsive font sizing (`md:text-sm`)
 * - Disabled state styling
 * - Transparent background with neutral text color
 * - Placeholder text styling with dark mode support
 * - Border with light/dark variants
 * - Fixed height, full width, and padding
 */
export const HookFormInputCSS = cn(
    "flex rounded-md shadow-sm transition-colors md:text-sm",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "bg-transparent text-base",
    "placeholder:text-neutral-500 dark:placeholder:text-neutral-600",
    "border border-neutral-200 dark:border-neutral-500",
    "h-9 w-full px-3 py-1"
);
