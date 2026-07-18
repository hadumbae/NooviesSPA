/**
 * @fileoverview Reusable react-select style configurations for single and multi-select components.
 */

import {ClassNamesConfig, GroupBase} from "react-select";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {cn} from "@/common/_feat";

/** Style configuration for single-select components used with the unstyled prop. */
export const ReactSelectStyleConfig: ClassNamesConfig<ReactSelectOption, false, GroupBase<ReactSelectOption>> = {
    control: ({isFocused}) => cn("dark:text-white default-form-input", isFocused && "border-black dark:border-white"),
    menu: () => "bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-500",
    option: ({isSelected}) => cn(
        "px-3 py-1",
        !isSelected && "hover:text-purple-800 dark:text-neutral-500 dark:hover:text-purple-500 hover:font-bold",
        isSelected && "bg-purple-800 text-white"
    ),
};

/** Style configuration for multi-select components including tag and chip styling. */
export const ReactSelectMultiStyleConfig: ClassNamesConfig<ReactSelectOption, true, GroupBase<ReactSelectOption>> = {
    control: ({isFocused}) => cn("h-fit dark:text-white default-form-input", isFocused && "border-black dark:border-white"),
    menu: () => "bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-500",
    valueContainer: () => "gap-1",
    multiValue: () => "px-2 py-1 space-x-1 rounded-xl bg-gray-200 dark:bg-gray-600",
    multiValueRemove: () => "hover:text-red-400 dark:hover:text-red-600",
    option: ({isSelected}) => cn(
        "px-3 py-1",
        !isSelected && "hover:text-purple-800 dark:text-neutral-500 dark:hover:text-purple-500 hover:font-bold",
        isSelected && "bg-purple-800 text-white"
    ),
};
