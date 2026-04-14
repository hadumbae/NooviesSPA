/**
 * @fileoverview Accessible component for screen-reader-only (SR) text.
 * Hides content visually while remaining accessible to assistive technologies.
 */

import {ReactElement, ReactNode} from "react";
import {HeaderTag} from "@/common/type/HeaderTag.ts";

/** Props for the {@link SROnly} component. */
type SRProps = {
    as?: HeaderTag;
    children?: ReactNode;
    text?: string;
}

/**
 * Renders a visually hidden element that is readable by screen readers.
 */
export function SROnly({children, text, as: Tag = "h2"}: SRProps): ReactElement {
    return (
        <Tag className="sr-only">
            {children ?? text}
        </Tag>
    );
}