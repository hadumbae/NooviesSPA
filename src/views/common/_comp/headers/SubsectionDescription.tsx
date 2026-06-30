/**
 * @fileoverview Renders a standardised description paragraph for subsection headers.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";

/** Props for the SubsectionDescription component. */
type DescProps = {
    children?: ReactNode;
    className?: string;
    text?: string;
};

/**
 * Renders a standardised description paragraph meant to accompany subsection titles.
 */
export function SubsectionDescription(
    {children, className, text}: DescProps
): ReactElement {
    return (
        <p className={cn("subsection-description", className)}>
            {children ?? text}
        </p>
    );
}