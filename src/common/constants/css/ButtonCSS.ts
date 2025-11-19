import {cn} from "@/common/lib/utils.ts";

export const HoverLinkCSS = cn(
    "text-neutral-400 hover:text-black",
    "dark:text-neutral-500 dark:hover:text-white"
);

export const ActiveHoverLinkCSS = "text-black dark:text-white";

export const PrimaryButtonCSS = cn(
    "dark:bg-purple-800 dark:hover:bg-purple-500",
    "dark:text-white dark:hover:text-black"
);

export const SecondaryButtonCSS = cn(
    "dark:bg-neutral-800 dark:hover:bg-neutral-500",
    "dark:text-white dark:hover:text-black"
);

export const DialogActionCSS = cn(
    "dark:bg-purple-800 dark:hover:bg-purple-400",
    "dark:text-white dark:hover:text-black"
);

export const DialogCloseCSS = cn(
    "dark:border dark:border-black",
    "dark:bg-transparent dark:hover:bg-black dark:text-neutral-500"
);
