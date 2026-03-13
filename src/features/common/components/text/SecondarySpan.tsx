/**
 * @file SecondarySpan.tsx
 *
 * Inline text component for secondary or de-emphasised content.
 *
 * @remarks
 * - Typically used for metadata, helper text, or subtle labels.
 * - Applies shared secondary text styling with a smaller font size.
 */

import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {ReactNode} from "react";

type SpanProps = {
    /** Inline content to render */
    children: ReactNode;

    /** Optional class name overrides */
    className?: string;
};

/**
 * Renders a secondary-styled `<span>` element.
 */
const SecondarySpan = ({children, className}: SpanProps) => {
    return (
        <span className={cn(SecondaryTextBaseCSS, "text-sm", className)}>
            {children}
        </span>
    );
};

export default SecondarySpan;
