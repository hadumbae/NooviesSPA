/**
 * @file Shared CSS utilities for link-styled section headers.
 * @filename LinkCSS.ts
 */

import {cn} from "@/common/lib/utils.ts";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";

/** Composed styles for section headers rendered as interactive links */
export const SectionHeaderLinkCSS = cn(
    SectionHeaderCSS,
    "inline-flex items-center gap-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:hover:text-primary",
);