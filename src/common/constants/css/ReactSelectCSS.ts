/**
 * @file ReactSelectCSS.ts
 * @description
 * Provides reusable `react-select` style configurations for both single-select
 * and multi-select components used across the application.
 *
 * These configs use:
 * - Tailwind classes
 * - The internal `cn()` class-merge utility
 * - `HookFormInputCSS` for consistent input styling
 * - Dark mode support
 *
 * Exported styles:
 * - `ReactSelectStyleConfig` — single-select styling
 * - `ReactSelectMultiStyleConfig` — multi-select styling, including tag chips
 *
 * Designed for use with `react-select`’s `classNames` property in **unstyled mode**.
 */

import {ClassNamesConfig, GroupBase} from "react-select";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {cn} from "@/common/lib/utils.ts";
import {HookFormInputCSS} from "@/common/constants/css/HookFormInputCSS.ts";

/**
 * Style configuration for **single-select** `react-select` components.
 *
 * Applies consistent:
 * - Input styling (via `HookFormInputCSS`)
 * - Focus borders
 * - Dropdown menu styling
 * - Option hover/selected styling
 *
 * Should be passed to the `classNames` prop of a single-select component.
 *
 * @example
 * <Select
 *    options={options}
 *    classNames={ReactSelectStyleConfig}
 *    unstyled={true}
 * />
 */
export const ReactSelectStyleConfig: ClassNamesConfig<
    ReactSelectOption,
    false,
    GroupBase<ReactSelectOption>
> = {
    control: ({isFocused}) =>
        cn(
            HookFormInputCSS,
            "dark:text-white",
            isFocused && "border-black dark:border-white",
        ),

    menu: () =>
        cn(
            "bg-white dark:bg-neutral-900",
            "rounded-lg",
            "border border-neutral-200 dark:border-neutral-500"
        ),

    option: ({isSelected}) =>
        cn(
            "px-3 py-1",
            !isSelected &&
            "hover:text-purple-800 dark:text-neutral-500 dark:hover:text-purple-500 hover:font-bold",
            isSelected && "bg-purple-800 text-white"
        ),
};

/**
 * Style configuration for **multi-select** `react-select` components.
 *
 * Extends the single-select config with:
 * - Tag (`multiValue`) styling
 * - Tag removal button styling
 * - Adjusted control height
 * - Value container spacing
 *
 * Should be passed to the `classNames` prop of a multi-select component.
 *
 * @example
 * <Select
 *    isMulti
 *    options={options}
 *    classNames={ReactSelectMultiStyleConfig}
 *    unstyled={true}
 * />
 */
export const ReactSelectMultiStyleConfig: ClassNamesConfig<
    ReactSelectOption,
    true,
    GroupBase<ReactSelectOption>
> = {
    control: ({isFocused}) =>
        cn(
            HookFormInputCSS,
            isFocused && "border-black dark:border-white",
            "h-fit dark:text-white"
        ),

    menu: () =>
        cn(
            "bg-white dark:bg-neutral-900",
            "rounded-lg",
            "border border-neutral-200 dark:border-neutral-500"
        ),

    option: ({isSelected}) =>
        cn(
            "px-3 py-1",
            !isSelected &&
            "hover:text-purple-800 dark:text-neutral-500 dark:hover:text-purple-500 hover:font-bold",
            isSelected && "bg-purple-800 text-white"
        ),

    valueContainer: () =>
        cn("gap-1"),

    multiValue: () =>
        cn(
            "px-2 py-1 space-x-1",
            "rounded-xl",
            "bg-gray-200 dark:bg-gray-600"
        ),

    multiValueRemove: () =>
        cn("hover:text-red-400 dark:hover:text-red-600"),
};
