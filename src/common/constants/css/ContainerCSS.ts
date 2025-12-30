import {cn} from "@/common/lib/utils.ts";

export const ContainerCSS = cn(
    "bg-gray-50 dark:bg-neutral-900"
);

export const RoundedBorderCSS = cn(
    "border border-neutral-200 dark:border-neutral-800",
    "rounded-xl",
);

export const CardCSS = cn(
    RoundedBorderCSS,
    "bg-white shadow",
)

export const PillCSS = cn(
    "py-1 px-2",
    "border rounded-lg",
    "hover:bg-gray-200 dark:hover:bg-gray-700"
);