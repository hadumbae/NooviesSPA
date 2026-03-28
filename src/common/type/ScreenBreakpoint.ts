/**
 * @file Type definition for Tailwind-style responsive design breakpoints.
 * @filename ScreenBreakpoint.ts
 */

/**
 * Represents the standard viewport width thresholds used for responsive layouts.
 * ---
 * Breakpoint Mapping
 * * `sm`: Small screens (typically ≥ 640px)
 * * `md`: Medium screens / Tablets (typically ≥ 768px)
 * * `lg`: Large screens / Laptops (typically ≥ 1024px)
 * * `xl`: Extra large screens / Desktops (typically ≥ 1280px)
 * * `2xl`: Ultra-wide screens (typically ≥ 1536px)
 */
export type ScreenBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";