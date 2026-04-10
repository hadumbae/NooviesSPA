/**
 * @file Inline text component for primary emphasis and high-visibility content.
 * @filename PrimarySpan.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactNode} from "react";

/**
 * Props for the {@link PrimarySpan} component.
 */
type SpanProps = {
    /** The inline text or elements to render with primary styling. */
    children?: ReactNode;

    /** Optional CSS classes for custom overrides (e.g., font weight, colors). */
    className?: string;

    /** Optional fallback string to render if no children are provided. */
    text?: string;
};

/**
 * Renders a primary-styled `<span>` element for emphasized data.
 * ---
 */
const PrimarySpan = ({children, className, text}: SpanProps) => {
    return (
        <span className={cn("primary-text", className)}>
            {children ?? text}
        </span>
    );
};

export default PrimarySpan;