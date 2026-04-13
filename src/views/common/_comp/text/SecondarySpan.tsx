/**
 * @file Inline text component for secondary or de-emphasized metadata.
 * @filename SecondarySpan.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactNode} from "react";

/**
 * Props for the {@link SecondarySpan} component.
 */
type SpanProps = {
    /** The inline content to render with secondary/subtle styling. */
    children?: ReactNode;

    /** Optional CSS classes for additional formatting (e.g., margins, alignment). */
    className?: string;

    /** Optional fallback string to render if no children are provided. */
    text?: string;
};

/**
 * Renders a secondary-styled `<span>` element for supporting information.
 * ---
 */
const SecondarySpan = ({children, className, text}: SpanProps) => {
    return (
        <span className={cn("secondary-text text-sm", className)}>
            {children ?? text}
        </span>
    );
};

export default SecondarySpan;