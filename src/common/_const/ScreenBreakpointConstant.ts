/**
 * @fileoverview Defines screen width breakpoints for responsive design.
 */

import {ScreenBreakpoint} from "@/common/type/ScreenBreakpoint.ts";

/** Mapping of breakpoint keys to their pixel values. */
export const ScreenBreakpointConstant: Record<ScreenBreakpoint, number> = {
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
} as const;