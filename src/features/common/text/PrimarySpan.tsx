/**
 * @file PrimarySpan.tsx
 *
 * Inline text component for primary emphasis.
 *
 * @remarks
 * - Intended for short inline text, not block-level usage.
 * - Styling is applied via shared primary text CSS.
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactNode} from "react";

type SpanProps = {
    /** Inline content to render */
    children: ReactNode;

    /** Optional class name overrides */
    className?: string;
};

/**
 * Renders a primary-styled `<span>` element.
 */
const PrimarySpan = ({children, className}: SpanProps) => {
    return (
        <span className={cn(PrimarySpan, className)}>
            {children}
        </span>
    );
};

export default PrimarySpan;
