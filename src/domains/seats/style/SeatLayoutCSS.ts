import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS }
    from "@/common/constants/css/TextCSS.ts";

/**
 * @constant NON_SEAT_ELEMENT_CSS
 * @description
 * CSS utility class set for non-seat elements within seat-map layouts.
 *
 * Used for row labels, spacers, and other structural elements that are
 * not interactive seats.
 */
export const NON_SEAT_ELEMENT_CSS = cn(
    SecondaryTextBaseCSS,
    "flex justify-center items-center select-none"
);
