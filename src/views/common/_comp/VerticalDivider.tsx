/**
 * @file Simple UI component for rendering a vertical line to separate adjacent elements.
 * @filename VerticalDivider.tsx
 */

import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the VerticalDivider component.
 */
type DividerProps = {
    /** Optional CSS classes to override dimensions, colors, or visibility. */
    className?: string;
};

/**
 * A thin, vertical separator used to visually group inline content or grid items.
 * ---
 */
export const VerticalDivider = (
    {className}: DividerProps
) => {
    return (
        <div
            role="separator"
            aria-orientation="vertical"
            className={cn(
                "inline-block w-0.5 self-stretch bg-neutral-100 dark:bg-white/10",
                className
            )}
        />
    );
};