/**
 * @file Shared Tailwind CSS class compositions for standardized page headers.
 * @filename PageCSS.ts
 */

import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Styling for the primary title of a page.
 */
export const PageTitleCSS = cn(
    PrimaryTextBaseCSS,
    "text-xl font-bold",
);

/**
 * Styling for secondary headers or section titles.
 */
export const PageSubtitleCSS = cn(
    PrimaryTextBaseCSS,
    "text-lg",
);

/**
 * Styling for descriptive body text or introductory paragraphs.
 */
export const PageDescriptionCSS = cn(
    PrimaryTextBaseCSS,
    "text-lg",
);