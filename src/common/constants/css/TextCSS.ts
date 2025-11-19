import {cn} from "@/common/lib/utils.ts";

export const PrimaryTextBaseCSS = cn(
    "text-black dark:text-gray-50"
);

export const SecondaryTextBaseCSS = cn(
    "text-neutral-400 dark:text-gray-500"
);

export const QuoteTextCSS = cn(
    "text-neutral-500 dark:text-gray-500",
    "text-sm",
);

export const HeaderTextCSS = cn(
    PrimaryTextBaseCSS,
    "text-lg font-bold",
);

export const SubheaderTextCSS = cn(
    SecondaryTextBaseCSS,
    "font-bold",
);