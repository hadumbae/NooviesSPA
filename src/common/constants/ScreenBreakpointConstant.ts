/**
 * @file Pixel-based threshold values for responsive design breakpoints.
 * @filename ScreenBreakpointConstant.ts
 */

import {ScreenBreakpoint} from "@/common/type/ScreenBreakpoint.ts";

/**
 * A record mapping Tailwind-standard breakpoint keys to their minimum width in pixels.
 * ---
 * ### Thresholds
 * * **sm (640px):** Small mobile devices and large phones.
 * * **md (768px):** Tablets and small laptops.
 * * **lg (1024px):** Standard desktop monitors and large tablets.
 * * **xl (1280px):** Large desktop monitors.
 * * **2xl (1536px):** Ultra-wide monitors and 4K displays.
 */
export const ScreenBreakpointConstant: Record<ScreenBreakpoint, number> = {
    /** Small breakpoint threshold (640px). */
    "sm": 640,
    /** Medium breakpoint threshold (768px). */
    "md": 768,
    /** Large breakpoint threshold (1024px). */
    "lg": 1024,
    /** Extra-large breakpoint threshold (1280px). */
    "xl": 1280,
    /** Double extra-large breakpoint threshold (1536px). */
    "2xl": 1536,
} as const;