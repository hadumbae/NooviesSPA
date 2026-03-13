/**
 * @file Shared CSS presets for rating star states.
 *
 * RatingStarCSS.ts
 */

import { cn } from "@/common/lib/utils.ts";

/**
 * Styles applied to active (filled) stars.
 */
export const ACTIVE_STAR_CSS = cn(
    "fill-yellow-500 stroke-yellow-500",
);

/**
 * Styles applied to inactive (unfilled) stars.
 */
export const INACTIVE_STAR_CSS = cn(
    "fill-gray-300 stroke-gray-300",
);