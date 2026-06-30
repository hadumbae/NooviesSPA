/**
 * @fileoverview A reusable component for rendering section descriptions with consistent styling.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";

/** Props for the SectionDescription component. */
type DescProps = {
    children?: ReactNode;
    className?: string;
    text?: string;
};

/** Renders a paragraph element styled as a section description. */
export function SectionDescription(
    {children, className, text}: DescProps
): ReactElement {
    return (
        <p className={cn("section-description", className)}>
            {children ?? text}
        </p>
    );
}